import { useAuth } from "@/hooks/useAuth";
import { useDividendHoldings } from "@/hooks/useDividendHoldings";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { RefreshCw, Plus, TrendingUp, TrendingDown } from "lucide-react";
import { useState } from "react";
import InvestmentChart from "@/components/investment/InvestmentChart";
import InvestmentHoldings from "@/components/investment/InvestmentHoldings";
import { Skeleton } from "@/components/ui/skeleton";

const Investment = () => {
  const { user, loading: authLoading } = useAuth();
  const { holdings, loading, updatingPrices, updateStockData, refetch } = useDividendHoldings(user);
  const [chartPeriod, setChartPeriod] = useState<'1W' | '1M' | '3M' | '1Y' | 'ALL'>('1M');

  if (authLoading) {
    return (
      <div className="space-y-6">
        <Skeleton className="h-8 w-48" />
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <Skeleton className="h-32" />
          <Skeleton className="h-32" />
          <Skeleton className="h-32" />
        </div>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="text-center py-12">
        <p className="text-muted-foreground">Please log in to view your investments.</p>
      </div>
    );
  }

  // Calculate portfolio metrics
  const totalInvested = holdings.reduce((sum, holding) => sum + (holding.avg_price * holding.shares), 0);
  const currentValue = holdings.reduce((sum, holding) => sum + (holding.current_price * holding.shares), 0);
  const totalGainLoss = currentValue - totalInvested;
  const gainLossPercentage = totalInvested > 0 ? (totalGainLoss / totalInvested) * 100 : 0;

  const isPositive = totalGainLoss >= 0;

  return (
    <div className="space-y-8">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Investment Portfolio</h1>
          <p className="text-muted-foreground mt-2">
            Track your stock investments and performance
          </p>
        </div>
        <Button 
          onClick={updateStockData} 
          disabled={updatingPrices}
          variant="outline"
          size="sm"
        >
          <RefreshCw className={`mr-2 h-4 w-4 ${updatingPrices ? 'animate-spin' : ''}`} />
          Refresh Prices
        </Button>
      </div>

      {/* Portfolio Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Total Invested</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">${totalInvested.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Current Value</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">${currentValue.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Total Gain/Loss</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center space-x-2">
              <div className={`text-2xl font-bold ${isPositive ? 'text-green-600' : 'text-red-600'}`}>
                ${Math.abs(totalGainLoss).toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
              </div>
              <Badge variant={isPositive ? "default" : "destructive"} className="flex items-center space-x-1">
                {isPositive ? <TrendingUp className="w-3 h-3" /> : <TrendingDown className="w-3 h-3" />}
                <span>{isPositive ? '+' : ''}{gainLossPercentage.toFixed(2)}%</span>
              </Badge>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Chart Section */}
      <Card>
        <CardHeader>
          <div className="flex justify-between items-center">
            <CardTitle>Portfolio Performance</CardTitle>
            <div className="flex space-x-1">
              {(['1W', '1M', '3M', '1Y', 'ALL'] as const).map((period) => (
                <Button
                  key={period}
                  variant={chartPeriod === period ? "default" : "outline"}
                  size="sm"
                  onClick={() => setChartPeriod(period)}
                >
                  {period}
                </Button>
              ))}
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <InvestmentChart holdings={holdings} period={chartPeriod} />
        </CardContent>
      </Card>

      {/* Holdings Section */}
      <Card>
        <CardHeader>
          <CardTitle>Investment Holdings</CardTitle>
        </CardHeader>
        <CardContent>
          <InvestmentHoldings />
        </CardContent>
      </Card>
    </div>
  );
};

export default Investment;