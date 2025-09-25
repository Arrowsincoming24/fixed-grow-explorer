import React from 'react';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { ArrowLeft, Users, Heart, Leaf, Globe, CreditCard, Crown } from 'lucide-react';
import { Link } from 'react-router-dom';

const Products = () => {
  const products = [
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
  ];

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="gradient-hero text-white py-12 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="flex items-center gap-4 mb-6">
            <Link to="/">
              <Button variant="ghost" className="text-white hover:bg-white/20">
                <ArrowLeft className="w-5 h-5 mr-2" />
                Back to Calculator
              </Button>
            </Link>
          </div>
          <div className="text-center">
            <h1 className="text-5xl font-bold mb-4">Cashcached Products</h1>
            <p className="text-xl opacity-90 max-w-3xl mx-auto">
              Choose from our comprehensive range of fixed deposit options, each designed 
              to meet different investment goals and risk profiles.
            </p>
          </div>
        </div>
      </div>

      {/* Products Grid */}
      <div className="max-w-7xl mx-auto p-6 -mt-8 relative">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {products.map((product) => {
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

export default Products;