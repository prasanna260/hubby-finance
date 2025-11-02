import { useState, useEffect } from "react";
import { useAuth } from "@/hooks/useAuth";
import { useNetWorthData } from "@/hooks/useNetWorthData";
import { useBudgetData } from "@/hooks/useBudgetData";
import { useDividendHoldings } from "@/hooks/useDividendHoldings";
import { useRealEstateData } from "@/hooks/useRealEstateData";
import NetWorthSummary from "@/components/networth/NetWorthSummary";
import NetWorthCharts from "@/components/networth/NetWorthCharts";
import BudgetSummary from "@/components/budget/BudgetSummary";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import { Button } from "@/components/ui/button";
import { TrendingUp, TrendingDown, BarChart3, Home, ExternalLink, MapPin, Building, Mail } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import { TwoFactorPromptDialog } from "@/components/auth/TwoFactorPromptDialog";

const Dashboard = () => {
  const { user, loading: authLoading, hasMfaEnabled } = useAuth();
  const navigate = useNavigate();
  const [showTwoFactorPrompt, setShowTwoFactorPrompt] = useState(false);

  const {
    assets,
    liabilities,
    snapshots,
    loading: netWorthLoading,
    totalAssets,
    totalLiabilities,
    netWorth
  } = useNetWorthData();

  const { holdings, loading: investmentLoading } = useDividendHoldings(user);
  const { properties, loading: realEstateLoading } = useRealEstateData();

  useEffect(() => {
    if (!authLoading && user && !hasMfaEnabled) {
      const timer = setTimeout(() => {
        setShowTwoFactorPrompt(true);
      }, 2000);
      return () => clearTimeout(timer);
    }
  }, [authLoading, user, hasMfaEnabled]);

  const sendTestNewsletter = async () => {
    try {
      toast.info("Sending test newsletter...");
      
      const { data, error } = await supabase.functions.invoke('send-weekly-newsletter', {
        body: { testMode: true }
      });

      if (error) {
        console.error('Newsletter error:', error);
        toast.error(`Failed to send newsletter: ${error.message}`);
      } else {
        toast.success("Test newsletter sent successfully! Check your email.");
      }
    } catch (err) {
      console.error('Error sending newsletter:', err);
      toast.error("Failed to send test newsletter");
    }
  };

  if (authLoading || netWorthLoading || investmentLoading || realEstateLoading) {
    return (
      <div className="space-y-6">
        <Skeleton className="h-8 w-48" />
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <Skeleton className="h-64" />
          <Skeleton className="h-64" />
        </div>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="text-center py-12">
        <p className="text-muted-foreground">Please log in to view your dashboard.</p>
      </div>
    );
  }

  // Calculate investment metrics
  const totalInvested = holdings.reduce((sum, holding) => sum + (holding.avg_price * holding.shares), 0);
  const currentValue = holdings.reduce((sum, holding) => sum + (holding.current_price * holding.shares), 0);
  const totalGainLoss = currentValue - totalInvested;
  const gainLossPercentage = totalInvested > 0 ? (totalGainLoss / totalInvested) * 100 : 0;
  const isPositive = totalGainLoss >= 0;

  return (
    <div className="min-h-screen bg-background">
      <TwoFactorPromptDialog
        open={showTwoFactorPrompt}
        onOpenChange={setShowTwoFactorPrompt}
        hasMfaEnabled={hasMfaEnabled}
      />
      <div className="space-y-8 pb-8">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Dashboard</h1>
          <p className="text-muted-foreground mt-1">
            Welcome back, {user.user_metadata?.full_name || user.email?.split('@')[0]}! Here's your financial overview
          </p>
        </div>
        <Button
          onClick={sendTestNewsletter}
          className="bg-primary hover:bg-primary/90 text-primary-foreground shadow-sm"
          size="sm"
        >
          <Mail className="mr-2 h-4 w-4" />
          Send Newsletter
        </Button>
      </div>

      {/* Net Worth Section */}
      <div className="space-y-6">
        <h2 className="text-2xl font-bold text-foreground flex items-center">
          <div className="h-1 w-12 bg-primary rounded mr-3"></div>
          Net Worth Overview
        </h2>
        <NetWorthSummary 
          totalAssets={totalAssets}
          totalLiabilities={totalLiabilities}
          netWorth={netWorth}
        />
        
        <Card className="bg-card border border-border shadow-sm rounded-xl">
          <CardContent className="p-6">
            <NetWorthCharts
              snapshots={snapshots}
              assets={assets}
              liabilities={liabilities}
            />
          </CardContent>
        </Card>
      </div>

      {/* Investment Overview Section */}
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <h2 className="text-2xl font-bold text-foreground flex items-center">
            <div className="h-1 w-12 bg-primary rounded mr-3"></div>
            Investment Portfolio
          </h2>
          <Button className="bg-primary hover:bg-primary/90 text-primary-foreground shadow-sm" size="sm" onClick={() => navigate('/investment')}>
            <BarChart3 className="mr-2 h-4 w-4" />
            View Details
          </Button>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {/* Holdings Card */}
          <div className="bg-gradient-to-br from-blue-600 to-blue-700 rounded-xl p-6 text-white shadow-lg">
            <div className="flex items-center justify-between mb-4">
              <div className="w-12 h-12 rounded-lg bg-white/20 flex items-center justify-center">
                <BarChart3 className="w-6 h-6" />
              </div>
            </div>
            <div>
              <p className="text-white/80 text-sm mb-1">Holdings</p>
              <h3 className="text-3xl font-bold text-white">{holdings.length}</h3>
              <p className="text-white/70 text-xs mt-2">Active positions</p>
            </div>
          </div>

          {/* Invested Card */}
          <div className="bg-gradient-to-br from-emerald-600 to-emerald-700 rounded-xl p-6 text-white shadow-lg">
            <div className="flex items-center justify-between mb-4">
              <div className="w-12 h-12 rounded-lg bg-white/20 flex items-center justify-center">
                <TrendingUp className="w-6 h-6" />
              </div>
            </div>
            <div>
              <p className="text-white/80 text-sm mb-1">Invested</p>
              <h3 className="text-3xl font-bold text-white">${totalInvested.toLocaleString('en-US', { minimumFractionDigits: 0, maximumFractionDigits: 0 })}</h3>
              <p className="text-white/70 text-xs mt-2">Total cost basis</p>
            </div>
          </div>

          {/* Current Value Card */}
          <div className="bg-gradient-to-br from-amber-600 to-amber-700 rounded-xl p-6 text-white shadow-lg">
            <div className="flex items-center justify-between mb-4">
              <div className="w-12 h-12 rounded-lg bg-white/20 flex items-center justify-center">
                <BarChart3 className="w-6 h-6" />
              </div>
            </div>
            <div>
              <p className="text-white/80 text-sm mb-1">Current Value</p>
              <h3 className="text-3xl font-bold text-white">${currentValue.toLocaleString('en-US', { minimumFractionDigits: 0, maximumFractionDigits: 0 })}</h3>
              <p className="text-white/70 text-xs mt-2">Market value</p>
            </div>
          </div>

          {/* Total Return Card */}
          <div className={isPositive ? "bg-gradient-to-br from-emerald-600 to-emerald-700 rounded-xl p-6 text-white shadow-lg" : "bg-gradient-to-br from-rose-600 to-rose-700 rounded-xl p-6 text-white shadow-lg"}>
            <div className="flex items-center justify-between mb-4">
              <div className="w-12 h-12 rounded-lg bg-white/20 flex items-center justify-center">
                {isPositive ? <TrendingUp className="w-6 h-6" /> : <TrendingDown className="w-6 h-6" />}
              </div>
            </div>
            <div>
              <p className="text-white/80 text-sm mb-1">Total Return</p>
              <h3 className="text-3xl font-bold text-white">
                {isPositive ? '+' : '-'}${Math.abs(totalGainLoss).toLocaleString('en-US', { minimumFractionDigits: 0, maximumFractionDigits: 0 })}
              </h3>
              <p className="text-white/70 text-xs mt-2">
                {isPositive ? '+' : ''}{gainLossPercentage.toFixed(2)}% from invested
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Real Estate Section */}
      {properties.length > 0 && (
        <div className="space-y-6">
          <div className="flex justify-between items-center">
            <h2 className="text-2xl font-bold text-slate-900 flex items-center">
              <div className="h-1 w-12 bg-gradient-to-r from-emerald-600 to-emerald-400 rounded mr-3"></div>
              Real Estate Portfolio
            </h2>
            <Button className="bg-emerald-600 hover:bg-emerald-700 text-white shadow-sm" size="sm" onClick={() => navigate('/real-estate')}>
              <Home className="mr-2 h-4 w-4" />
              View All
            </Button>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {properties.slice(0, 3).map((property) => (
              <Card key={property.id} className="bg-white border-slate-200 shadow-sm rounded-xl hover:shadow-md transition-shadow">
                <CardHeader className="pb-3">
                  <div className="flex items-start justify-between">
                    <div className="flex items-center space-x-2">
                      <Building className="h-4 w-4 text-muted-foreground" />
                      <CardTitle className="text-sm font-medium line-clamp-1">
                        {property.address}
                      </CardTitle>
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="grid grid-cols-2 gap-2 text-sm">
                    <div>
                      <p className="text-muted-foreground">Purchase</p>
                      <p className="font-medium">${property.purchase_price.toLocaleString()}</p>
                    </div>
                    <div>
                      <p className="text-muted-foreground">Current</p>
                      <p className="font-medium">${property.current_price.toLocaleString()}</p>
                    </div>
                  </div>
                  
                  {property.rental_monthly && (
                    <div>
                      <p className="text-xs text-muted-foreground">Monthly Rental</p>
                      <p className="text-sm font-medium">${property.rental_monthly.toLocaleString()}</p>
                    </div>
                  )}
                  
                  <div className="flex flex-wrap gap-1">
                    {property.county_website && (
                      <Button 
                        variant="external" 
                        size="sm" 
                        className="h-7 px-2"
                        onClick={() => window.open(property.county_website, '_blank')}
                      >
                        <MapPin className="mr-1 h-3 w-3" />
                        County
                      </Button>
                    )}
                    {property.loan_company_website && (
                      <Button 
                        variant="external" 
                        size="sm" 
                        className="h-7 px-2"
                        onClick={() => window.open(property.loan_company_website, '_blank')}
                      >
                        <ExternalLink className="mr-1 h-3 w-3" />
                        Mortgage
                      </Button>
                    )}
                    {property.hoa_website && (
                      <Button 
                        variant="external" 
                        size="sm" 
                        className="h-7 px-2"
                        onClick={() => window.open(property.hoa_website, '_blank')}
                      >
                        <ExternalLink className="mr-1 h-3 w-3" />
                        HOA
                      </Button>
                    )}
                    {property.insurance_website && (
                      <Button 
                        variant="external" 
                        size="sm" 
                        className="h-7 px-2"
                        onClick={() => window.open(property.insurance_website, '_blank')}
                      >
                        <ExternalLink className="mr-1 h-3 w-3" />
                        Insurance
                      </Button>
                    )}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      )}

      {/* Budget Overview Section */}
      <div className="space-y-6">
        <h2 className="text-2xl font-bold text-foreground flex items-center">
          <div className="h-1 w-12 bg-primary rounded mr-3"></div>
          Budget Overview
        </h2>
        <Card className="bg-card border border-border shadow-sm rounded-xl">
          <CardContent className="p-6">
            <BudgetSummary />
          </CardContent>
        </Card>
      </div>
    </div>
    </div>
  );
};

export default Dashboard;