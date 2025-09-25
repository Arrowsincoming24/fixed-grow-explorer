import React, { useState, useEffect } from 'react';
import { Calculator, TrendingUp, Globe, Calendar, Banknote, Shield, Award, Star, Zap, Crown, Users, Heart, Leaf, CreditCard } from 'lucide-react';
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
  const [selectedProduct, setSelectedProduct] = useState<string>('cashcached-platinum-fd');
  const [result, setResult] = useState<CalculationResult | null>(null);

  const productTypes: ProductType[] = [
    {
      id: 'senior-citizen-fd',
      name: { en: '5-YEAR SENIOR CITIZEN FD', ja: '5年シニア市民定期預金' },
      baseRate: 6.4,
      isFloating: false,
      periods: [60],
      icon: Shield,
      tier: 'premium',
      minAmount: 1000
    },
    {
      id: 'retail-fd',
      name: { en: 'FIXED DEPOSIT (RETAIL)', ja: '定期預金（個人向け）' },
      baseRate: 7.2,
      isFloating: false,
      periods: [1, 3, 6, 12, 24, 36, 60, 120],
      icon: Banknote,
      tier: 'basic',
      minAmount: 1000
    },
    {
      id: 'wellness-fd',
      name: { en: 'WELLNESS FIXED DEPOSIT', ja: 'ウェルネス定期預金' },
      baseRate: 6.5,
      isFloating: false,
      periods: [12],
      icon: Award,
      tier: 'premium',
      minAmount: 50000
    },
    {
      id: 'green-rupee-fd',
      name: { en: 'GREEN RUPEE TERM DEPOSIT', ja: 'グリーンルピー定期預金' },
      baseRate: 6.4,
      isFloating: false,
      periods: [36, 48, 60],
      icon: TrendingUp,
      tier: 'premium',
      minAmount: 1000
    },
    {
      id: 'fcnr-deposits',
      name: { en: 'FCNR DEPOSITS', ja: 'FCNR預金' },
      baseRate: 3.0,
      isFloating: true,
      periods: [12, 24, 36, 48, 60],
      icon: Globe,
      tier: 'premium',
      minAmount: 1000
    },
    {
      id: 'cashcached-platinum-fd',
      name: { en: 'CASHCACHED PLATINUM FD', ja: 'キャッシュキャッシュド・プラチナ定期' },
      baseRate: 7.75,
      isFloating: false,
      periods: [12, 24, 36, 48, 60],
      icon: Star,
      tier: 'platinum',
      minAmount: 50000
    },
    {
      id: 'cashcached-womens-fd',
      name: { en: "CASHCACHED WOMEN'S FD", ja: 'キャッシュキャッシュド・女性向け定期' },
      baseRate: 7.85,
      isFloating: false,
      periods: [12, 24, 36, 48, 60, 84],
      icon: Award,
      tier: 'premium',
      minAmount: 10000
    },
    {
      id: 'cashcached-tax-saver-fd',
      name: { en: 'CASHCACHED TAX SAVER FD', ja: 'キャッシュキャッシュド・税制優遇定期' },
      baseRate: 7.20,
      isFloating: false,
      periods: [60],
      icon: Shield,
      tier: 'premium',
      minAmount: 10000
    },
    {
      id: 'cashcached-senior-plus-fd',
      name: { en: 'CASHCACHED SENIOR PLUS FD', ja: 'キャッシュキャッシュド・シニアプラス定期' },
      baseRate: 8.10,
      isFloating: false,
      periods: [12, 24, 36, 48, 60, 120],
      icon: Crown,
      tier: 'elite',
      minAmount: 25000
    },
    {
      id: 'cashcached-green-growth-fd',
      name: { en: 'CASHCACHED GREEN GROWTH FD', ja: 'キャッシュキャッシュド・グリーン成長定期' },
      baseRate: 7.50,
      isFloating: false,
      periods: [36, 48, 60, 72],
      icon: Zap,
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
      subtitle: 'Maximize your savings with Cashcached competitive rates',
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
      subtitle: 'キャッシュキャッシュドの競争力のある金利で貯蓄を最大化',
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
                
              </div>
            </Card>
          </div>
        </div>
      </div>

      {/* Products Section */}
      <div className="max-w-7xl mx-auto p-6 mt-16">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold mb-4">Our Fixed Deposit Products</h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Choose from our comprehensive range of fixed deposit options, each designed 
            to meet different investment goals and risk profiles.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[
            {
              id: 1,
              title: "5-YEAR SENIOR CITIZEN FD",
              icon: Users,
              range: "₹1,000 - ₹10,000",
              tenure: "5 years (Fixed)",
              interestRate: "Up to 6.90% p.a.",
              payout: "Cumulative or non-cumulative",
              penalty: "Premature withdrawal allowed",
              perks: "Priority banking, health check-up discounts",
              color: "bg-purple-600"
            },
            {
              id: 2,
              title: "FIXED DEPOSIT (RETAIL)",
              icon: CreditCard,
              range: "Up to ₹3 crore",
              tenure: "7 days - 10 years",
              interestRate: "Up to 7.95% p.a.",
              payout: "Flexible options available",
              penalty: "Small penalty on early withdrawal",
              perks: "UPI integration, sweep features",
              color: "bg-blue-600"
            },
            {
              id: 3,
              title: "WELLNESS FIXED DEPOSIT",
              icon: Heart,
              range: "₹50,000+",
              tenure: "375 days",
              interestRate: "6.5% - 7%",
              payout: "At maturity",
              penalty: "Premature withdrawal cancels insurance",
              perks: "Free health insurance bundled",
              color: "bg-pink-600"
            },
            {
              id: 4,
              title: "GREEN RUPEE TERM DEPOSIT",
              icon: Leaf,
              range: "Min ₹1,000",
              tenure: "1111, 1777, 2222 days",
              interestRate: "6.4% - 7.4%",
              payout: "At maturity",
              penalty: "Premature withdrawal allowed",
              perks: "Funds invested in eco-friendly projects",
              color: "bg-green-600"
            },
            {
              id: 5,
              title: "FCNR DEPOSITS",
              icon: Globe,
              range: "NRIs only",
              tenure: "1-5 years",
              interestRate: "3% - 6%",
              payout: "At maturity",
              penalty: "Currency exchange risk",
              perks: "Tax-free, forex safe",
              color: "bg-indigo-600"
            },
            {
              id: 6,
              title: "CASHCACHED PLATINUM FD",
              icon: Crown,
              range: "₹50,000 - ₹5 crore",
              tenure: "1 - 5 years",
              interestRate: "Up to 7.75% p.a.",
              payout: "Monthly or at maturity",
              penalty: "Nominal penalty for early withdrawal",
              perks: "Wealth advisory for deposits above ₹1 crore",
              color: "bg-purple-800"
            },
            {
              id: 7,
              title: "CASHCACHED WOMEN'S FD",
              icon: Users,
              range: "₹10,000 - ₹2 crore",
              tenure: "1 - 7 years",
              interestRate: "Up to 7.85% p.a.",
              payout: "Cumulative or quarterly",
              penalty: "Reduced benefits on early withdrawal",
              perks: "Insurance & wellness programs for women",
              color: "bg-pink-700"
            },
            {
              id: 8,
              title: "CASHCACHED TAX SAVER FD",
              icon: CreditCard,
              range: "₹10,000 - ₹1.5 crore",
              tenure: "5 years (lock-in)",
              interestRate: "7.20% p.a.",
              payout: "At maturity",
              penalty: "No premature withdrawal allowed",
              perks: "Tax benefit under Section 80C",
              color: "bg-blue-700"
            },
            {
              id: 9,
              title: "CASHCACHED SENIOR PLUS FD",
              icon: Users,
              range: "₹25,000 - ₹2 crore",
              tenure: "1 - 10 years",
              interestRate: "Up to 8.10% p.a.",
              payout: "Monthly or at maturity",
              penalty: "Allowed with penalty",
              perks: "Free health screenings & counseling",
              color: "bg-purple-700"
            },
            {
              id: 10,
              title: "CASHCACHED GREEN GROWTH FD",
              icon: Leaf,
              range: "₹5,000 - ₹3 crore",
              tenure: "3 - 6 years",
              interestRate: "Up to 7.50% p.a.",
              payout: "Quarterly or at maturity",
              penalty: "Premature withdrawal allowed",
              perks: "Eco-friendly investment opportunities",
              color: "bg-green-700"
            }
          ].map((product) => {
            const IconComponent = product.icon;
            
            return (
              <Card key={product.id} className="p-6 shadow-card hover:shadow-button transition-all duration-300 bg-card border-2 hover:border-primary/30">
                <div className="space-y-4">
                  {/* Product Header */}
                  <div className="flex items-start gap-4">
                    <div className={`p-3 rounded-xl ${product.color} text-white`}>
                      <IconComponent className="w-6 h-6" />
                    </div>
                    <div className="flex-1">
                      <h3 className="font-bold text-lg leading-tight mb-2">{product.title}</h3>
                    </div>
                  </div>

                  {/* Product Details */}
                  <div className="space-y-3">
                    <div className="flex justify-between items-center">
                      <span className="text-sm font-medium text-muted-foreground">RANGE:</span>
                      <span className="text-sm font-semibold">{product.range}</span>
                    </div>
                    
                    <div className="flex justify-between items-center">
                      <span className="text-sm font-medium text-muted-foreground">TENURE:</span>
                      <span className="text-sm font-semibold">{product.tenure}</span>
                    </div>
                    
                    <div className="flex justify-between items-center">
                      <span className="text-sm font-medium text-muted-foreground">INTEREST RATE:</span>
                      <Badge className="gradient-primary text-white font-bold">
                        {product.interestRate}
                      </Badge>
                    </div>
                    
                    <div className="flex justify-between items-center">
                      <span className="text-sm font-medium text-muted-foreground">PAYOUT:</span>
                      <span className="text-sm font-semibold">{product.payout}</span>
                    </div>
                    
                    <div className="flex justify-between items-center">
                      <span className="text-sm font-medium text-muted-foreground">PENALTY:</span>
                      <span className="text-sm">{product.penalty}</span>
                    </div>
                  </div>

                  {/* Perks */}
                  <div className="pt-3 border-t border-border">
                    <span className="text-sm font-medium text-muted-foreground">EXTRA VALUE:</span>
                    <p className="text-sm text-foreground mt-1">{product.perks}</p>
                  </div>

                  {/* Action Button */}
                  <Button className="w-full gradient-primary text-white hover:shadow-button">
                    Learn More
                  </Button>
                </div>
              </Card>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default FixedDepositCalculator;