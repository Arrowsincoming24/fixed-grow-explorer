import React, { useState, useEffect } from 'react';
import { Calculator, TrendingUp, Globe, Calendar } from 'lucide-react';
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
}

const FixedDepositCalculator: React.FC = () => {
  const [language, setLanguage] = useState<'en' | 'ja'>('en');
  const [currency, setCurrency] = useState<'USD' | 'KWD' | 'INR'>('USD');
  const [amount, setAmount] = useState<string>('10000');
  const [period, setPeriod] = useState<number>(12);
  const [age, setAge] = useState<string>('35');
  const [interestType, setInterestType] = useState<'simple' | 'compound'>('compound');
  const [selectedProduct, setSelectedProduct] = useState<string>('fixed-premium');
  const [result, setResult] = useState<CalculationResult | null>(null);

  const productTypes: ProductType[] = [
    {
      id: 'fixed-premium',
      name: { en: 'Premium Fixed Deposit', ja: 'プレミアム定期預金' },
      baseRate: 4.5,
      isFloating: false,
      periods: [6, 12, 24, 36, 60]
    },
    {
      id: 'fixed-standard',
      name: { en: 'Standard Fixed Deposit', ja: 'スタンダード定期預金' },
      baseRate: 3.8,
      isFloating: false,
      periods: [3, 6, 12, 18, 24]
    },
    {
      id: 'floating-dynamic',
      name: { en: 'Dynamic Floating Rate', ja: 'ダイナミック変動金利' },
      baseRate: 4.2,
      isFloating: true,
      periods: [6, 12, 24, 36]
    },
    {
      id: 'floating-market',
      name: { en: 'Market Linked Floating', ja: 'マーケット連動変動金利' },
      baseRate: 4.8,
      isFloating: true,
      periods: [12, 24, 36, 48]
    }
  ];

  const currencySymbols = {
    USD: '$',
    KWD: 'د.ك',
    INR: '₹'
  };

  const translations = {
    en: {
      title: 'Fixed Deposit Calculator',
      subtitle: 'Calculate your returns with precision',
      amount: 'Deposit Amount',
      period: 'Investment Period',
      months: 'months',
      age: 'Your Age',
      years: 'years',
      productType: 'Product Type',
      interestType: 'Interest Type',
      simple: 'Simple Interest',
      compound: 'Compound Interest',
      calculate: 'Calculate Returns',
      results: 'Calculation Results',
      principal: 'Principal Amount',
      interest: 'Interest Earned',
      maturity: 'Maturity Amount',
      effectiveRate: 'Effective Rate',
      seniorDiscount: 'Senior Citizen Bonus',
      youthDiscount: 'Youth Advantage',
      floatingRate: 'Floating Rate',
      fixedRate: 'Fixed Rate'
    },
    ja: {
      title: '定期預金計算機',
      subtitle: '正確な収益計算',
      amount: '預金額',
      period: '投資期間',
      months: 'ヶ月',
      age: '年齢',
      years: '歳',
      productType: '商品タイプ',
      interestType: '利息タイプ',
      simple: '単利',
      compound: '複利',
      calculate: '収益計算',
      results: '計算結果',
      principal: '元本',
      interest: '利息収入',
      maturity: '満期金額',
      effectiveRate: '実効金利',
      seniorDiscount: 'シニア特典',
      youthDiscount: 'ユース特典',
      floatingRate: '変動金利',
      fixedRate: '固定金利'
    }
  };

  const t = translations[language];

  const calculateReturns = () => {
    const principal = parseFloat(amount);
    const ageNum = parseInt(age);
    const product = productTypes.find(p => p.id === selectedProduct);
    
    if (!principal || !product) return;

    let rate = product.baseRate;
    
    // Age-based discounts
    if (ageNum >= 60) {
      rate += 0.5; // Senior citizen bonus
    } else if (ageNum <= 25) {
      rate += 0.25; // Youth advantage
    }

    // Period-based rate adjustment
    if (period >= 36) {
      rate += 0.2;
    } else if (period >= 24) {
      rate += 0.1;
    }

    // Floating rate variation
    if (product.isFloating) {
      rate += (Math.random() - 0.5) * 0.3; // ±0.15% variation
    }

    const annualRate = rate / 100;
    const timeInYears = period / 12;

    let interestEarned: number;
    
    if (interestType === 'simple') {
      interestEarned = principal * annualRate * timeInYears;
    } else {
      // Compound interest (monthly compounding)
      const monthlyRate = annualRate / 12;
      const compoundAmount = principal * Math.pow(1 + monthlyRate, period);
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
    <div className="min-h-screen bg-background p-4 md:p-8">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="flex items-center justify-center gap-3 mb-4">
            <div className="p-3 rounded-lg gradient-primary">
              <Calculator className="w-8 h-8 text-white" />
            </div>
            <h1 className="text-4xl font-bold text-foreground">{t.title}</h1>
          </div>
          <p className="text-muted-foreground text-lg">{t.subtitle}</p>
          
          {/* Language and Currency Toggle */}
          <div className="flex justify-center gap-4 mt-6">
            <div className="flex items-center gap-2">
              <Globe className="w-4 h-4 text-muted" />
              <Button
                variant={language === 'en' ? 'default' : 'outline'}
                size="sm"
                onClick={() => setLanguage('en')}
                className="font-medium"
              >
                EN
              </Button>
              <Button
                variant={language === 'ja' ? 'default' : 'outline'}
                size="sm"
                onClick={() => setLanguage('ja')}
                className="font-medium"
              >
                日本語
              </Button>
            </div>
            
            <div className="flex gap-1">
              {(['USD', 'KWD', 'INR'] as const).map((curr) => (
                <Button
                  key={curr}
                  variant={currency === curr ? 'default' : 'outline'}
                  size="sm"
                  onClick={() => setCurrency(curr)}
                  className="font-mono font-medium"
                >
                  {curr}
                </Button>
              ))}
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Input Form */}
          <Card className="p-6 shadow-card">
            <div className="space-y-6">
              {/* Amount Input */}
              <div className="space-y-2">
                <Label htmlFor="amount" className="text-sm font-medium">
                  {t.amount}
                </Label>
                <div className="relative">
                  <span className="absolute left-3 top-1/2 transform -translate-y-1/2 font-mono text-muted">
                    {currencySymbols[currency]}
                  </span>
                  <Input
                    id="amount"
                    type="number"
                    value={amount}
                    onChange={(e) => setAmount(e.target.value)}
                    className="pl-8 font-mono text-lg"
                    placeholder="10000"
                  />
                </div>
              </div>

              {/* Product Type */}
              <div className="space-y-2">
                <Label className="text-sm font-medium">{t.productType}</Label>
                <Select value={selectedProduct} onValueChange={setSelectedProduct}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {productTypes.map((product) => (
                      <SelectItem key={product.id} value={product.id}>
                        <div className="flex items-center gap-2">
                          <span>{product.name[language]}</span>
                          <Badge variant={product.isFloating ? 'secondary' : 'outline'} className="text-xs">
                            {product.isFloating ? t.floatingRate : t.fixedRate}
                          </Badge>
                        </div>
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              {/* Period */}
              <div className="space-y-2">
                <Label className="text-sm font-medium">{t.period}</Label>
                <Select value={period.toString()} onValueChange={(value) => setPeriod(parseInt(value))}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {selectedProductData?.periods.map((p) => (
                      <SelectItem key={p} value={p.toString()}>
                        {p} {t.months}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              {/* Age */}
              <div className="space-y-2">
                <Label htmlFor="age" className="text-sm font-medium">
                  {t.age}
                </Label>
                <Input
                  id="age"
                  type="number"
                  value={age}
                  onChange={(e) => setAge(e.target.value)}
                  className="font-mono"
                  placeholder="35"
                />
                <div className="flex gap-2 text-xs">
                  {parseInt(age) >= 60 && (
                    <Badge variant="secondary" className="text-xs">
                      <TrendingUp className="w-3 h-3 mr-1" />
                      {t.seniorDiscount} +0.5%
                    </Badge>
                  )}
                  {parseInt(age) <= 25 && (
                    <Badge variant="secondary" className="text-xs">
                      <TrendingUp className="w-3 h-3 mr-1" />
                      {t.youthDiscount} +0.25%
                    </Badge>
                  )}
                </div>
              </div>

              {/* Interest Type */}
              <div className="space-y-2">
                <Label className="text-sm font-medium">{t.interestType}</Label>
                <div className="flex gap-4">
                  <div className="flex items-center space-x-2">
                    <Switch
                      checked={interestType === 'compound'}
                      onCheckedChange={(checked) => 
                        setInterestType(checked ? 'compound' : 'simple')
                      }
                    />
                    <Label className="text-sm">
                      {interestType === 'compound' ? t.compound : t.simple}
                    </Label>
                  </div>
                </div>
              </div>
            </div>
          </Card>

          {/* Results */}
          <Card className="p-6 shadow-card">
            <div className="space-y-6">
              <div className="flex items-center gap-2 mb-4">
                <Calendar className="w-5 h-5 text-primary" />
                <h3 className="text-xl font-bold">{t.results}</h3>
              </div>
              
              {result && (
                <div className="space-y-4">
                  {/* Principal */}
                  <div className="flex justify-between items-center p-4 bg-gradient-card rounded-lg">
                    <span className="font-medium">{t.principal}</span>
                    <span className="font-mono text-lg font-bold">
                      {formatCurrency(result.principalAmount)}
                    </span>
                  </div>

                  {/* Interest */}
                  <div className="flex justify-between items-center p-4 bg-gradient-card rounded-lg">
                    <span className="font-medium text-success">{t.interest}</span>
                    <span className="font-mono text-lg font-bold text-success">
                      {formatCurrency(result.interestEarned)}
                    </span>
                  </div>

                  {/* Maturity */}
                  <div className="flex justify-between items-center p-4 gradient-primary rounded-lg text-white">
                    <span className="font-medium">{t.maturity}</span>
                    <span className="font-mono text-xl font-bold">
                      {formatCurrency(result.maturityAmount)}
                    </span>
                  </div>

                  {/* Rate */}
                  <div className="flex justify-between items-center p-4 bg-gradient-card rounded-lg">
                    <span className="font-medium">{t.effectiveRate}</span>
                    <div className="flex items-center gap-2">
                      <span className="font-mono text-lg font-bold">
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
              )}
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default FixedDepositCalculator;