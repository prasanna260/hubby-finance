import { useMemo, useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { BarChart, Bar, XAxis, YAxis, ResponsiveContainer, PieChart, Pie, Cell } from "recharts";
import { TrendingUp, TrendingDown, Calendar, DollarSign, Target, ArrowUp, ArrowDown, Edit, Check, X } from "lucide-react";
import { DividendHolding } from "@/hooks/useDividendHoldings";
import { useDividendGoals } from "@/hooks/useDividendGoals";
import { useAuth } from "@/hooks/useAuth";

interface DividendDashboardProps {
  holdings: DividendHolding[];
}

const DividendDashboard = ({ holdings }: DividendDashboardProps) => {
  const { user } = useAuth();
  const { annualGoal, loading: goalsLoading, saveGoal } = useDividendGoals(user);
  const [isEditingGoal, setIsEditingGoal] = useState(false);
  const [tempGoal, setTempGoal] = useState(annualGoal);

  // Update tempGoal when annualGoal changes
  useMemo(() => {
    setTempGoal(annualGoal);
  }, [annualGoal]);

  // Calculate portfolio metrics based on actual holdings
  const portfolioMetrics = useMemo(() => {
    const totalHoldingsValue = holdings.reduce((sum, holding) => sum + (holding.shares * holding.current_price), 0);
    const totalInvestedCapital = holdings.reduce((sum, holding) => sum + (holding.shares * holding.avg_price), 0);
    const netProfitLoss = totalHoldingsValue - totalInvestedCapital;
    
    // Calculate annual dividend income based on holdings
    const annualDividendIncome = holdings.reduce((sum, holding) => {
      return sum + (holding.shares * holding.annual_dividend);
    }, 0);
    
    const monthlyDividendIncome = annualDividendIncome / 12;
    const weeklyDividendIncome = annualDividendIncome / 52;
    const dailyDividendIncome = annualDividendIncome / 365;
    const hourlyDividendIncome = dailyDividendIncome / 24;
    
    // Calculate dividend yield
    const dividendYield = totalHoldingsValue > 0 ? (annualDividendIncome / totalHoldingsValue) * 100 : 0;

    return {
      totalHoldingsValue,
      totalInvestedCapital,
      netProfitLoss,
      annualDividendIncome,
      monthlyDividendIncome,
      weeklyDividendIncome,
      dailyDividendIncome,
      hourlyDividendIncome,
      dividendYield
    };
  }, [holdings]);

  // Mock data for today's dividend payments (in real app, this would come from API)
  const todaysDividends = [
    { company: "Apple Inc", symbol: "AAPL", amount: 24.50, shares: 50, yield: 0.5, date: new Date().toISOString() },
    { company: "Microsoft Corp", symbol: "MSFT", amount: 18.75, shares: 25, yield: 0.75, date: new Date().toISOString() },
  ];

  // Recent dividend changes - only show holdings from portfolio
  const recentDividendChanges = useMemo(() => {
    return holdings.slice(0, 3).map(holding => {
      // Simulate dividend changes with some mock data
      const changePercent = (Math.random() - 0.5) * 20; // Random change between -10% and +10%
      const oldPayout = holding.annual_dividend / (1 + changePercent / 100);
      
      return {
        company: holding.company_name,
        symbol: holding.symbol,
        oldPayout: oldPayout,
        newPayout: holding.annual_dividend,
        change: changePercent
      };
    });
  }, [holdings]);

  // Generate 12-month dividend forecast
  const monthlyForecast = useMemo(() => {
    const months = [];
    const currentDate = new Date();
    
    for (let i = 0; i < 12; i++) {
      const date = new Date(currentDate.getFullYear(), currentDate.getMonth() + i, 1);
      const monthName = date.toLocaleDateString('en-US', { month: 'short' });
      
      // Simulate monthly dividend income with some variation
      const baseIncome = portfolioMetrics.monthlyDividendIncome;
      const variation = (Math.random() - 0.5) * 0.2; // ±10% variation
      const income = baseIncome * (1 + variation);
      
      months.push({
        month: monthName,
        income: Math.max(0, income),
        year: date.getFullYear()
      });
    }
    
    return months;
  }, [portfolioMetrics.monthlyDividendIncome]);

  const goalProgress = Math.min((portfolioMetrics.annualDividendIncome / annualGoal) * 100, 100);

  // Top gainers and losers - only show holdings from portfolio
  const topGainersLosers = useMemo(() => {
    if (holdings.length === 0) {
      return { gainers: [], losers: [] };
    }

    const holdingsWithChanges = holdings.map(holding => ({
      ...holding,
      change: Math.random() * 10 - 2, // Mock change between -2% and 8%
      valueChange: (holding.shares * holding.current_price) - (holding.shares * holding.avg_price)
    }));

    const gainers = holdingsWithChanges
      .filter(h => h.change > 0)
      .sort((a, b) => b.change - a.change)
      .slice(0, 5);

    const losers = holdingsWithChanges
      .filter(h => h.change < 0)
      .sort((a, b) => a.change - b.change)
      .slice(0, 5);

    return { gainers, losers };
  }, [holdings]);

  const handleSaveGoal = async () => {
    if (tempGoal > 0) {
      const success = await saveGoal(tempGoal);
      if (success) {
        setIsEditingGoal(false);
      }
    }
  };

  const handleCancelEdit = () => {
    setTempGoal(annualGoal);
    setIsEditingGoal(false);
  };

  return (
    <div className="space-y-6">
      {/* Annual Dividend Income Overview */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-gray-600">Annual Dividend Income</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-600">
              ${portfolioMetrics.annualDividendIncome.toLocaleString()}
            </div>
            <div className="text-xs text-gray-500 mt-1">
              Yield: {portfolioMetrics.dividendYield.toFixed(2)}%
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-gray-600">Monthly</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-blue-600">
              ${portfolioMetrics.monthlyDividendIncome.toLocaleString()}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-gray-600">Weekly</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-purple-600">
              ${portfolioMetrics.weeklyDividendIncome.toLocaleString()}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-gray-600">Daily</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-orange-600">
              ${portfolioMetrics.dailyDividendIncome.toFixed(2)}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-gray-600">Hourly</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-indigo-600">
              ${portfolioMetrics.hourlyDividendIncome.toFixed(2)}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Secondary metrics row */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-gray-600">Total Holdings Value</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-blue-600">
              ${portfolioMetrics.totalHoldingsValue.toLocaleString()}
            </div>
            <div className="text-xs text-gray-500 mt-1">
              Invested: ${portfolioMetrics.totalInvestedCapital.toLocaleString()}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-gray-600">Net Profit/Loss</CardTitle>
          </CardHeader>
          <CardContent>
            <div className={`text-2xl font-bold ${portfolioMetrics.netProfitLoss >= 0 ? 'text-green-600' : 'text-red-600'}`}>
              {portfolioMetrics.netProfitLoss >= 0 ? '+' : ''}${portfolioMetrics.netProfitLoss.toLocaleString()}
            </div>
            <div className="text-xs text-gray-500 mt-1">
              {((portfolioMetrics.netProfitLoss / portfolioMetrics.totalInvestedCapital) * 100).toFixed(1)}% return
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-gray-600">Portfolio Yield</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-600">
              {portfolioMetrics.dividendYield.toFixed(2)}%
            </div>
            <div className="text-xs text-gray-500 mt-1">
              Annual dividend yield
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Today's Dividend Payments */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Calendar size={20} />
              Today's Dividend Payments
            </CardTitle>
            <CardDescription>Dividends received today</CardDescription>
          </CardHeader>
          <CardContent>
            {todaysDividends.length > 0 ? (
              <div className="space-y-3">
                {todaysDividends.map((dividend, index) => (
                  <div key={index} className="flex items-center justify-between p-3 bg-green-50 rounded-lg">
                    <div>
                      <div className="font-medium">{dividend.company}</div>
                      <div className="text-sm text-gray-600">
                        {dividend.shares} shares • {dividend.yield}% yield
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="font-bold text-green-600">${dividend.amount}</div>
                      <div className="text-xs text-gray-500">{dividend.symbol}</div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-6 text-gray-500">
                No dividend payments received today
              </div>
            )}
          </CardContent>
        </Card>

        {/* Recent Dividend Changes */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <TrendingUp size={20} />
              Recent Dividend Changes
            </CardTitle>
            <CardDescription>Portfolio companies with updated dividend payouts</CardDescription>
          </CardHeader>
          <CardContent>
            {recentDividendChanges.length > 0 ? (
              <div className="space-y-3">
                {recentDividendChanges.map((change, index) => (
                  <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                    <div>
                      <div className="font-medium">{change.symbol}</div>
                      <div className="text-sm text-gray-600">
                        ${change.oldPayout.toFixed(2)} → ${change.newPayout.toFixed(2)}
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      {change.change > 0 ? (
                        <ArrowUp size={16} className="text-green-600" />
                      ) : (
                        <ArrowDown size={16} className="text-red-600" />
                      )}
                      <Badge variant={change.change > 0 ? "default" : "destructive"}>
                        {change.change > 0 ? '+' : ''}{change.change.toFixed(1)}%
                      </Badge>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-6 text-gray-500">
                No recent dividend changes in your portfolio
              </div>
            )}
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* 12-Month Dividend Forecast */}
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <DollarSign size={20} />
              12-Month Dividend Forecast
            </CardTitle>
            <CardDescription>Projected monthly dividend income</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={monthlyForecast}>
                  <XAxis dataKey="month" />
                  <YAxis />
                  <Bar dataKey="income" fill="#3B82F6" radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        {/* Annual Dividend Goal Tracker */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Target size={20} />
                Annual Goal Tracker
              </div>
              {!isEditingGoal && !goalsLoading && (
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setIsEditingGoal(true)}
                  className="h-8 w-8 p-0"
                >
                  <Edit size={16} />
                </Button>
              )}
            </CardTitle>
            <CardDescription>Progress toward dividend goal</CardDescription>
          </CardHeader>
          <CardContent className="text-center">
            <div className="relative w-32 h-32 mx-auto mb-4">
              <div className="w-32 h-32 rounded-full border-8 border-gray-200"></div>
              <div 
                className="absolute top-0 left-0 w-32 h-32 rounded-full border-8 border-green-500 transform -rotate-90"
                style={{
                  borderRightColor: 'transparent',
                  borderBottomColor: 'transparent',
                  borderLeftColor: goalProgress > 50 ? '#10B981' : 'transparent',
                  borderTopColor: '#10B981',
                  clipPath: `polygon(50% 50%, 50% 0%, ${50 + Math.min(goalProgress, 50)}% 0%, ${goalProgress > 50 ? '100%' : '50%'} ${goalProgress > 50 ? '0%' : '50%'}, ${goalProgress > 50 ? '100%' : '50%'} ${goalProgress > 50 ? Math.min(goalProgress - 50, 50) + '%' : '50%'}, 50% 50%)`
                }}
              ></div>
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="text-center">
                  <div className="text-2xl font-bold">{goalProgress.toFixed(0)}%</div>
                </div>
              </div>
            </div>
            <div className="space-y-2">
              {isEditingGoal ? (
                <div className="space-y-3">
                  <div className="flex items-center gap-2">
                    <span className="text-sm text-gray-600">Annual Goal: $</span>
                    <Input
                      type="number"
                      value={tempGoal}
                      onChange={(e) => setTempGoal(Number(e.target.value))}
                      className="h-8 text-center"
                      min="1"
                      step="100"
                    />
                  </div>
                  <div className="flex gap-2 justify-center">
                    <Button size="sm" onClick={handleSaveGoal}>
                      <Check size={14} className="mr-1" />
                      Save
                    </Button>
                    <Button size="sm" variant="outline" onClick={handleCancelEdit}>
                      <X size={14} className="mr-1" />
                      Cancel
                    </Button>
                  </div>
                </div>
              ) : (
                <>
                  <div className="text-sm text-gray-600">Annual Goal: ${annualGoal.toLocaleString()}</div>
                  <div className="text-lg font-semibold">
                    ${portfolioMetrics.annualDividendIncome.toFixed(2)} / ${annualGoal.toLocaleString()}
                  </div>
                  <Progress value={goalProgress} className="h-2" />
                </>
              )}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Top Gainers & Losers */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-green-600">
              <TrendingUp size={20} />
              Top 5 Dividend Gainers
            </CardTitle>
            <CardDescription>Best performing dividend stocks in your portfolio</CardDescription>
          </CardHeader>
          <CardContent>
            {topGainersLosers.gainers.length > 0 ? (
              <div className="space-y-3">
                {topGainersLosers.gainers.map((gainer, index) => (
                  <div key={gainer.id} className="flex items-center justify-between p-3 bg-green-50 rounded-lg">
                    <div>
                      <div className="font-medium">{gainer.symbol}</div>
                      <div className="text-sm text-gray-600">
                        Yield: {gainer.dividend_yield.toFixed(2)}%
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="flex items-center gap-1 text-green-600">
                        <ArrowUp size={16} />
                        <span className="font-bold">+{gainer.change.toFixed(1)}%</span>
                      </div>
                      <div className="text-sm text-gray-600">
                        ${gainer.valueChange.toFixed(2)}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-6 text-gray-500">
                No gainers in your portfolio
              </div>
            )}
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-red-600">
              <TrendingDown size={20} />
              Top 5 Dividend Losers
            </CardTitle>
            <CardDescription>Underperforming dividend stocks in your portfolio</CardDescription>
          </CardHeader>
          <CardContent>
            {topGainersLosers.losers.length > 0 ? (
              <div className="space-y-3">
                {topGainersLosers.losers.map((loser, index) => (
                  <div key={loser.id} className="flex items-center justify-between p-3 bg-red-50 rounded-lg">
                    <div>
                      <div className="font-medium">{loser.symbol}</div>
                      <div className="text-sm text-gray-600">
                        Yield: {loser.dividend_yield.toFixed(2)}%
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="flex items-center gap-1 text-red-600">
                        <ArrowDown size={16} />
                        <span className="font-bold">{loser.change.toFixed(1)}%</span>
                      </div>
                      <div className="text-sm text-gray-600">
                        ${loser.valueChange.toFixed(2)}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-6 text-gray-500">
                No losers in your portfolio
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default DividendDashboard;
