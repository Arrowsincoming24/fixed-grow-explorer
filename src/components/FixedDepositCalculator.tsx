import React, { useState, useEffect } from 'react';
import { Calculator, TrendingUp, Globe, Calendar, Banknote, Shield, Award, Star, Zap } from 'lucide-react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Switch } from '@/components/ui/switch';
import { Badge } from '@/components/ui/badge';

interface CalculationResult {
  principalAmount: number;
  interestEarned: number;
  maturityAmount: number;
  effectiveRate: number;
}

interface ProductType {
  id: string;
  name: { en: string; ja: string };
  baseRate: number;
  isFloating: boolean;
  periods: number[];
  icon: React.ComponentType<any>;
  tier: 'basic' | 'premium' | 'platinum' | 'elite';
  minAmount: number;
}

const FixedDepositCalculator: React.FC = () => {
  const [language, setLanguage] = useState<'en' | 'ja'>('en');
  const [currency, setCurrency] = useState<'USD' | 'KWD' | 'INR'>('USD');
  const [amount, setAmount] = useState<string>('25000');
  const [period, setPeriod] = useState<number>(12);
  const [age, setAge] = useState<string>('35');
  const [interestType, setInterestType] = useState<'simple' | 'compound'>('simple');
  const [selectedProduct, setSelectedProduct] = useState<string>('zenith-premium');
  const [result, setResult] = useState<CalculationResult | null>(null);

  const productTypes: ProductType[] = [
    {
      id: 'zenith-starter',
      name: { en: 'Zenith Starter Deposit', ja: 'ゼニス・スターター預金' },
      baseRate: 3.2,
      isFloating: false,
      periods: [3, 6, 12, 18],
      icon: Banknote,
      tier: 'basic',
      minAmount: 1000
    },
    {
      id: 'zenith-classic',
      name: { en: 'Zenith Classic Fixed', ja: 'ゼニス・クラシック定期' },
      baseRate: 3.8,
      isFloating: false,
      periods: [6, 12, 18, 24, 36],
      icon: Shield,
      tier: 'basic',
      minAmount: 5000
    },
    {
      id: 'zenith-premium',
      name: { en: 'Zenith Premium Growth', ja: 'ゼニス・プレミアム成長' },
      baseRate: 4.5,
      isFloating: false,
      periods: [6, 12, 24, 36, 48],
      icon: Award,
      tier: 'premium',
      minAmount: 15000
    },
    {
      id: 'zenith-platinum',
      name: { en: 'Zenith Platinum Elite', ja: 'ゼニス・プラチナエリート' },
      baseRate: 5.2,
      isFloating: false,
      periods: [12, 24, 36, 48, 60],
      icon: Star,
      tier: 'platinum',
      minAmount: 50000
    },
    {
      id: 'zenith-flexible',
      name: { en: 'Zenith Flexible Rate', ja: 'ゼニス・フレキシブル金利' },
      baseRate: 4.2,
      isFloating: true,
      periods: [6, 12, 24, 36],
      icon: TrendingUp,
      tier: 'premium',
      minAmount: 10000
    },
    {
      id: 'zenith-dynamic',
      name: { en: 'Zenith Dynamic Yield', ja: 'ゼニス・ダイナミック利回り' },
      baseRate: 4.8,
      isFloating: true,
      periods: [12, 24, 36, 48],
      icon: Zap,
      tier: 'platinum',
      minAmount: 25000
    },
    {
      id: 'zenith-elite',
      name: { en: 'Zenith Elite Privilege', ja: 'ゼニス・エリート特権' },
      baseRate: 5.8,
      isFloating: false,
      periods: [24, 36, 48, 60, 84],
      icon: Award,
      tier: 'elite',
      minAmount: 100000
    },
    {
      id: 'zenith-senior',
      name: { en: 'Zenith Senior Advantage', ja: 'ゼニス・シニア特典' },
      baseRate: 4.0,
      isFloating: false,
      periods: [6, 12, 18, 24, 36],
      icon: Shield,
      tier: 'premium',
      minAmount: 5000
    }
  ];

  const currencySymbols = {
    USD: '$',
    KWD: 'د.ك',
    INR: '₹'
  };

  const translations = {
    en: {
      bankName: 'Cashcached',
      title: 'Fixed Deposit Calculator',
      subtitle: 'Maximize your savings with Zenith\'s competitive rates',
      amount: 'Deposit Amount',
      period: 'Investment Period',
      months: 'months',
      age: 'Your Age',
      years: 'years',
      productType: 'Deposit Product',
      interestType: 'Interest Calculation',
      simple: 'Simple Interest',
      compound: 'Compound Interest',
      calculate: 'Calculate Returns',
      results: 'Your Investment Summary',
      principal: 'Initial Deposit',
      interest: 'Interest Earned',
      maturity: 'Maturity Amount',
      effectiveRate: 'Effective Annual Rate',
      seniorDiscount: 'Senior Citizen Bonus',
      youthDiscount: 'Youth Advantage',
      floatingRate: 'Variable Rate',
      fixedRate: 'Fixed Rate',
      minAmount: 'Minimum',
      tier: {
        basic: 'Basic',
        premium: 'Premium',
        platinum: 'Platinum',
        elite: 'Elite'
      }
    },
    ja: {
      bankName: 'キャッシュキャッシュド',
      title: '定期預金計算機',
      subtitle: 'ゼニスの競争力のある金利で貯蓄を最大化',
      amount: '預金額',
      period: '投資期間',
      months: 'ヶ月',
      age: '年齢',
      years: '歳',
      productType: '預金商品',
      interestType: '利息計算方法',
      simple: '単利',
      compound: '複利',
      calculate: '収益計算',
      results: '投資概要',
      principal: '元本',
      interest: '利息収入',
      maturity: '満期金額',
      effectiveRate: '実効年利',
      seniorDiscount: 'シニア特典',
      youthDiscount: 'ユース特典',
      floatingRate: '変動金利',
      fixedRate: '固定金利',
      minAmount: '最低額',
      tier: {
        basic: 'ベーシック',
        premium: 'プレミアム',
        platinum: 'プラチナ',
        elite: 'エリート'
      }
    }
  };

  const t = translations[language];

  const getTierColor = (tier: string) => {
    switch (tier) {
      case 'basic': return 'bg-muted text-muted-foreground';
      case 'premium': return 'gradient-secondary text-white';
      case 'platinum': return 'gradient-primary text-white';
      case 'elite': return 'gradient-hero text-white';
      default: return 'bg-muted text-muted-foreground';
    }
  };

  const calculateReturns = () => {
    const principal = parseFloat(amount);
    const ageNum = parseInt(age);
    const product = productTypes.find(p => p.id === selectedProduct);
    
    if (!principal || !product) return;

    let rate = product.baseRate;
    
    // Age-based bonuses
    if (ageNum >= 60) {
      rate += 0.5; // Senior citizen bonus
    } else if (ageNum <= 25) {
      rate += 0.25; // Youth advantage
    }

    // Period-based rate adjustment
    if (period >= 48) {
      rate += 0.3;
    } else if (period >= 36) {
      rate += 0.2;
    } else if (period >= 24) {
      rate += 0.15;
    } else if (period >= 12) {
      rate += 0.1;
    }

    // Amount-based premium
    if (principal >= 100000) {
      rate += 0.25;
    } else if (principal >= 50000) {
      rate += 0.15;
    } else if (principal >= 25000) {
      rate += 0.1;
    }

    // Product tier bonus
    switch (product.tier) {
      case 'premium': rate += 0.1; break;
      case 'platinum': rate += 0.2; break;
      case 'elite': rate += 0.3; break;
    }

    // Floating rate variation
    if (product.isFloating) {
      rate += (Math.random() - 0.5) * 0.4; // ±0.2% variation
    }

    const annualRate = rate / 100;
    const timeInYears = period / 12;

    let interestEarned: number;
    
    if (interestType === 'simple') {
      interestEarned = principal * annualRate * timeInYears;
    } else {
      // Compound interest (quarterly compounding)
      const quarterlyRate = annualRate / 4;
      const compoundAmount = principal * Math.pow(1 + quarterlyRate, period / 3);
      interestEarned = compoundAmount - principal;
    }

    setResult({
      principalAmount: principal,
      interestEarned,
      maturityAmount: principal + interestEarned,
      effectiveRate: rate
    });
  };

  useEffect(() => {
    if (amount && period && age) {
      calculateReturns();
    }
  }, [amount, period, age, selectedProduct, interestType]);

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat(language === 'ja' ? 'ja-JP' : 'en-US', {
      style: 'currency',
      currency: currency,
      minimumFractionDigits: 2,
      maximumFractionDigits: 2
    }).format(value);
  };

  const selectedProductData = productTypes.find(p => p.id === selectedProduct);

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Header */}
      <div className="gradient-hero text-white py-12 px-4 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-white/10 to-transparent"></div>
        <div className="max-w-6xl mx-auto relative">
          <div className="text-center">
            <div className="flex items-center justify-center gap-4 mb-6">
              <div className="p-4 bg-white/20 backdrop-blur-sm rounded-2xl animate-float">
                <Calculator className="w-10 h-10 text-white" />
              </div>
              <div>
                <h1 className="text-5xl font-bold mb-2">{t.bankName}</h1>
                <h2 className="text-2xl font-semibold opacity-90">{t.title}</h2>
              </div>
            </div>
            <p className="text-xl opacity-90 max-w-2xl mx-auto">{t.subtitle}</p>
            
            {/* Language and Currency Controls */}
            <div className="flex justify-center gap-6 mt-8">
              <div className="flex items-center gap-3 bg-white/20 backdrop-blur-sm rounded-xl p-3">
                <Globe className="w-5 h-5" />
                <Button
                  variant={language === 'en' ? 'default' : 'ghost'}
                  size="sm"
                  onClick={() => setLanguage('en')}
                  className="text-white border-white/30"
                >
                  EN
                </Button>
                <Button
                  variant={language === 'ja' ? 'default' : 'ghost'}
                  size="sm"
                  onClick={() => setLanguage('ja')}
                  className="text-white border-white/30"
                >
                  日本語
                </Button>
              </div>
              
              <div className="flex gap-2 bg-white/20 backdrop-blur-sm rounded-xl p-3">
                {(['USD', 'KWD', 'INR'] as const).map((curr) => (
                  <Button
                    key={curr}
                    variant={currency === curr ? 'default' : 'ghost'}
                    size="sm"
                    onClick={() => setCurrency(curr)}
                    className="font-mono font-semibold text-white border-white/30"
                  >
                    {curr}
                  </Button>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto p-6 -mt-8 relative">
        <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">
          {/* Input Form */}
          <div className="xl:col-span-2 space-y-6">
            <Card className="p-8 shadow-hero bg-card">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {/* Amount Input */}
                <div className="space-y-3">
                  <Label htmlFor="amount" className="text-lg font-semibold flex items-center gap-2">
                    <Banknote className="w-5 h-5 text-primary" />
                    {t.amount}
                  </Label>
                  <div className="relative">
                    <span className="absolute left-4 top-1/2 transform -translate-y-1/2 font-mono text-xl text-muted-foreground">
                      {currencySymbols[currency]}
                    </span>
                    <Input
                      id="amount"
                      type="number"
                      value={amount}
                      onChange={(e) => setAmount(e.target.value)}
                      className="pl-12 font-mono text-xl h-14 text-lg border-2 focus:border-primary/50 rounded-xl"
                      placeholder="25000"
                    />
                  </div>
                  {selectedProductData && (
                    <p className="text-sm text-muted-foreground">
                      {t.minAmount}: {formatCurrency(selectedProductData.minAmount)}
                    </p>
                  )}
                </div>

                {/* Age Input */}
                <div className="space-y-3">
                  <Label htmlFor="age" className="text-lg font-semibold flex items-center gap-2">
                    <Calendar className="w-5 h-5 text-primary" />
                    {t.age}
                  </Label>
                  <Input
                    id="age"
                    type="number"
                    value={age}
                    onChange={(e) => setAge(e.target.value)}
                    className="font-mono text-xl h-14 border-2 focus:border-primary/50 rounded-xl"
                    placeholder="35"
                  />
                  <div className="flex gap-2">
                    {parseInt(age) >= 60 && (
                      <Badge className="gradient-primary text-white">
                        <Award className="w-3 h-3 mr-1" />
                        {t.seniorDiscount} +0.5%
                      </Badge>
                    )}
                    {parseInt(age) <= 25 && (
                      <Badge className="gradient-secondary text-white">
                        <Star className="w-3 h-3 mr-1" />
                        {t.youthDiscount} +0.25%
                      </Badge>
                    )}
                  </div>
                </div>
              </div>

              {/* Product Selection */}
              <div className="mt-8 space-y-4">
                <Label className="text-lg font-semibold">{t.productType}</Label>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {productTypes.map((product) => {
                    const IconComponent = product.icon;
                    const isSelected = selectedProduct === product.id;
                    return (
                      <div
                        key={product.id}
                        onClick={() => setSelectedProduct(product.id)}
                        className={`p-4 rounded-xl border-2 cursor-pointer transition-all duration-300 ${
                          isSelected 
                            ? 'border-primary shadow-button bg-card-secondary' 
                            : 'border-border hover:border-primary/30 bg-card hover:shadow-soft'
                        }`}
                      >
                        <div className="flex items-start gap-3">
                          <div className={`p-2 rounded-lg ${isSelected ? 'gradient-primary' : 'bg-muted'}`}>
                            <IconComponent className={`w-5 h-5 ${isSelected ? 'text-white' : 'text-muted-foreground'}`} />
                          </div>
                          <div className="flex-1">
                            <h4 className="font-semibold text-sm mb-1">{product.name[language]}</h4>
                            <div className="flex items-center gap-2 mb-2">
                              <Badge className={`text-xs ${getTierColor(product.tier)}`}>
                                {t.tier[product.tier as keyof typeof t.tier]}
                              </Badge>
                              <Badge variant="outline" className="text-xs">
                                {product.isFloating ? t.floatingRate : t.fixedRate}
                              </Badge>
                            </div>
                            <p className="font-mono font-bold text-primary">{product.baseRate}% APR</p>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Period and Interest Type */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-8">
                <div className="space-y-3">
                  <Label className="text-lg font-semibold">{t.period}</Label>
                  <Select value={period.toString()} onValueChange={(value) => setPeriod(parseInt(value))}>
                    <SelectTrigger className="h-14 text-lg border-2 focus:border-primary/50 rounded-xl">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {selectedProductData?.periods.map((p) => (
                        <SelectItem key={p} value={p.toString()}>
                          <span className="font-semibold">{p} {t.months}</span>
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-3">
                  <Label className="text-lg font-semibold">{t.interestType}</Label>
                  <div className="flex gap-4 p-4 bg-card-secondary rounded-xl">
                    <div className="flex items-center space-x-3">
                      <Switch
                        checked={interestType === 'compound'}
                        onCheckedChange={(checked) => 
                          setInterestType(checked ? 'compound' : 'simple')
                        }
                      />
                      <Label className="font-semibold">
                        {interestType === 'compound' ? t.compound : t.simple}
                      </Label>
                    </div>
                  </div>
                </div>
              </div>
            </Card>
          </div>

          {/* Results Panel */}
          <div className="space-y-6">
            <Card className="p-6 shadow-hero bg-card">
              <div className="text-center mb-6">
                <h3 className="text-2xl font-bold text-primary mb-2">{t.results}</h3>
                <div className="w-16 h-1 gradient-primary mx-auto rounded-full"></div>
              </div>
              
              {result && (
                <div className="space-y-4">
                  {/* Principal */}
                  <div className="p-4 gradient-card rounded-xl border border-border">
                    <div className="flex justify-between items-center">
                      <span className="font-semibold text-muted-foreground">{t.principal}</span>
                      <span className="font-mono text-xl font-bold">
                        {formatCurrency(result.principalAmount)}
                      </span>
                    </div>
                  </div>

                  {/* Interest */}
                  <div className="p-4 bg-success/10 border border-success/20 rounded-xl">
                    <div className="flex justify-between items-center">
                      <span className="font-semibold text-success">{t.interest}</span>
                      <span className="font-mono text-xl font-bold text-success">
                        {formatCurrency(result.interestEarned)}
                      </span>
                    </div>
                  </div>

                  {/* Maturity Amount */}
                  <div className="p-6 gradient-hero rounded-xl text-white animate-glow">
                    <div className="flex justify-between items-center">
                      <span className="font-semibold text-lg">{t.maturity}</span>
                      <span className="font-mono text-2xl font-bold">
                        {formatCurrency(result.maturityAmount)}
                      </span>
                    </div>
                  </div>

                  {/* Effective Rate */}
                  <div className="p-4 gradient-card rounded-xl border border-primary/20">
                    <div className="flex justify-between items-center">
                      <span className="font-semibold">{t.effectiveRate}</span>
                      <div className="flex items-center gap-2">
                        <span className="font-mono text-xl font-bold text-primary">
                          {result.effectiveRate.toFixed(2)}%
                        </span>
                        {selectedProductData?.isFloating && (
                          <Badge variant="outline" className="text-xs">
                            {t.floatingRate}
                          </Badge>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              )}

              <div className="space-y-3">
                <Button 
                  variant="premium" 
                  size="lg" 
                  className="w-full text-lg font-bold"
                  onClick={calculateReturns}
                >
                  <Calculator className="w-5 h-5 mr-2" />
                  {t.calculate}
                </Button>
                
                <Button 
                  variant="outline" 
                  size="lg" 
                  className="w-full text-lg font-bold border-primary text-primary hover:bg-primary hover:text-white"
                  onClick={() => window.open('https://lovable.dev/projects/be9406ba-6840-4c94-9cb9-4fe6f45f4a74', '_blank')}
                >
                  View All Products
                </Button>
              </div>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FixedDepositCalculator;