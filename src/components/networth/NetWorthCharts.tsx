
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ChartContainer, ChartTooltip, ChartTooltipContent, ChartLegend, ChartLegendContent } from "@/components/ui/chart";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, ResponsiveContainer, Legend } from "recharts";
import { NetWorthSnapshot, NetWorthAsset, NetWorthLiability } from "@/hooks/useNetWorthData";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useState } from "react";

interface NetWorthChartsProps {
  snapshots: NetWorthSnapshot[];
  assets: NetWorthAsset[];
  liabilities: NetWorthLiability[];
}

const NetWorthCharts = ({ snapshots, assets, liabilities }: NetWorthChartsProps) => {
  const [timePeriod, setTimePeriod] = useState<'weekly' | 'monthly' | 'quarterly' | 'yearly'>('monthly');
  
  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(value);
  };

  // Calculate current totals
  const currentAssets = assets.reduce((sum, asset) => sum + asset.value, 0);
  const currentLiabilities = liabilities.reduce((sum, liability) => sum + liability.value, 0);
  const currentNetWorth = currentAssets - currentLiabilities;

  // Prepare data for net worth over time chart
  const netWorthTimeData = snapshots.map(snapshot => ({
    date: new Date(snapshot.snapshot_date).toLocaleDateString('en-US', { 
      month: 'short', 
      day: 'numeric',
      year: '2-digit'
    }),
    netWorth: snapshot.net_worth,
    assets: snapshot.total_assets,
    liabilities: snapshot.total_liabilities,
  }));

  // Create historical data from assets and liabilities created_at dates
  const assetsByDate = new Map();
  const liabilitiesByDate = new Map();

  // Group assets by creation date
  assets.forEach(asset => {
    const date = new Date(asset.created_at).toLocaleDateString('en-US', { 
      month: 'short', 
      day: 'numeric',
      year: '2-digit'
    });
    if (!assetsByDate.has(date)) {
      assetsByDate.set(date, []);
    }
    assetsByDate.get(date).push(asset);
  });

  // Group liabilities by creation date
  liabilities.forEach(liability => {
    const date = new Date(liability.created_at).toLocaleDateString('en-US', { 
      month: 'short', 
      day: 'numeric',
      year: '2-digit'
    });
    if (!liabilitiesByDate.has(date)) {
      liabilitiesByDate.set(date, []);
    }
    liabilitiesByDate.get(date).push(liability);
  });

  // Get all unique dates and sort them
  const allDates = new Set([
    ...assetsByDate.keys(),
    ...liabilitiesByDate.keys(),
    ...netWorthTimeData.map(d => d.date)
  ]);

  const sortedDates = Array.from(allDates).sort((a, b) => {
    return new Date(a).getTime() - new Date(b).getTime();
  });

  // Build cumulative data for each date
  let cumulativeAssets = 0;
  let cumulativeLiabilities = 0;
  
  const historicalData = sortedDates.map(date => {
    // Add assets for this date
    if (assetsByDate.has(date)) {
      cumulativeAssets += assetsByDate.get(date).reduce((sum, asset) => sum + asset.value, 0);
    }
    
    // Add liabilities for this date
    if (liabilitiesByDate.has(date)) {
      cumulativeLiabilities += liabilitiesByDate.get(date).reduce((sum, liability) => sum + liability.value, 0);
    }

    // Check if there's a snapshot for this date
    const snapshot = netWorthTimeData.find(s => s.date === date);
    
    return {
      date,
      netWorth: snapshot ? snapshot.netWorth : cumulativeAssets - cumulativeLiabilities,
      assets: snapshot ? snapshot.assets : cumulativeAssets,
      liabilities: snapshot ? snapshot.liabilities : cumulativeLiabilities,
    };
  });

  // Include current data if it's different from the last historical point
  const currentDate = new Date().toLocaleDateString('en-US', { 
    month: 'short', 
    day: 'numeric',
    year: '2-digit'
  });
  
  const lastHistoricalDate = historicalData.length > 0 ? historicalData[historicalData.length - 1].date : null;
  
  const chartData = lastHistoricalDate === currentDate ? historicalData : [
    ...historicalData,
    {
      date: currentDate,
      netWorth: currentNetWorth,
      assets: currentAssets,
      liabilities: currentLiabilities,
    }
  ];

  const chartConfig = {
    assets: {
      label: "Assets",
      color: "hsl(142, 76%, 36%)",
    },
    liabilities: {
      label: "Liabilities", 
      color: "hsl(0, 84%, 60%)",
    },
    netWorth: {
      label: "Net Worth",
      color: "hsl(var(--primary))",
    },
  };

  // Calculate growth percentage and amount
  const calculateGrowth = () => {
    if (snapshots.length < 2) return { percentage: 0, amount: 0 };
    
    const latestSnapshot = snapshots[snapshots.length - 1];
    const previousSnapshot = snapshots[snapshots.length - 2];
    
    if (!latestSnapshot || !previousSnapshot) return { percentage: 0, amount: 0 };
    
    const amount = latestSnapshot.net_worth - previousSnapshot.net_worth;
    const percentage = previousSnapshot.net_worth !== 0 
      ? ((amount / previousSnapshot.net_worth) * 100) 
      : 0;
    
    return { percentage, amount };
  };

  const growth = calculateGrowth();

  // Filter data based on selected time period
  const filterDataByPeriod = (data: any[]) => {
    if (data.length === 0) return data;
    
    const now = new Date();
    const filtered: any[] = [];
    
    data.forEach((item, index) => {
      const itemDate = new Date(item.date);
      
      if (timePeriod === 'weekly') {
        // Show last 12 weeks of data
        const weeksAgo = Math.floor((now.getTime() - itemDate.getTime()) / (7 * 24 * 60 * 60 * 1000));
        if (weeksAgo <= 12) filtered.push(item);
      } else if (timePeriod === 'monthly') {
        // Show last 12 months of data
        const monthsAgo = (now.getFullYear() - itemDate.getFullYear()) * 12 + (now.getMonth() - itemDate.getMonth());
        if (monthsAgo <= 12) filtered.push(item);
      } else if (timePeriod === 'quarterly') {
        // Show last 8 quarters (2 years) of data
        const monthsAgo = (now.getFullYear() - itemDate.getFullYear()) * 12 + (now.getMonth() - itemDate.getMonth());
        if (monthsAgo <= 24) filtered.push(item);
      } else if (timePeriod === 'yearly') {
        // Show last 5 years of data
        const yearsAgo = now.getFullYear() - itemDate.getFullYear();
        if (yearsAgo <= 5) filtered.push(item);
      }
    });
    
    // Group data points based on period
    if (timePeriod === 'weekly') {
      return filtered;
    } else if (timePeriod === 'monthly') {
      // Group by month
      const grouped = new Map();
      filtered.forEach(item => {
        const date = new Date(item.date);
        const key = `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}`;
        if (!grouped.has(key) || new Date(item.date) > new Date(grouped.get(key).date)) {
          grouped.set(key, item);
        }
      });
      return Array.from(grouped.values());
    } else if (timePeriod === 'quarterly') {
      // Group by quarter
      const grouped = new Map();
      filtered.forEach(item => {
        const date = new Date(item.date);
        const quarter = Math.floor(date.getMonth() / 3) + 1;
        const key = `${date.getFullYear()}-Q${quarter}`;
        if (!grouped.has(key) || new Date(item.date) > new Date(grouped.get(key).date)) {
          grouped.set(key, item);
        }
      });
      return Array.from(grouped.values());
    } else if (timePeriod === 'yearly') {
      // Group by year
      const grouped = new Map();
      filtered.forEach(item => {
        const date = new Date(item.date);
        const key = `${date.getFullYear()}`;
        if (!grouped.has(key) || new Date(item.date) > new Date(grouped.get(key).date)) {
          grouped.set(key, item);
        }
      });
      return Array.from(grouped.values());
    }
    
    return filtered;
  };

  const filteredChartData = filterDataByPeriod(chartData);

  return (
    <div className="space-y-8">
      {/* Net Worth Bar Chart */}
      {(chartData.length > 0 && (currentAssets > 0 || currentLiabilities > 0)) && (
        <Card>
          <CardHeader>
            <div className="flex justify-between items-start">
              <CardTitle className="text-xl font-semibold">
                Net Worth Overview
              </CardTitle>
              {netWorthTimeData.length > 0 && (
                <div className="text-right">
                  <div className="text-sm text-gray-500 mb-1">
                    Net Worth Growth {Math.abs(growth.percentage).toFixed(1)}%
                  </div>
                  <div className={`text-lg font-semibold ${growth.amount >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                    {growth.amount >= 0 ? '+' : ''}{formatCurrency(growth.amount)}
                  </div>
                </div>
              )}
            </div>
            <div className="mt-4">
              <Tabs value={timePeriod} onValueChange={(value) => setTimePeriod(value as any)}>
                <TabsList>
                  <TabsTrigger value="weekly">Weekly</TabsTrigger>
                  <TabsTrigger value="monthly">Monthly</TabsTrigger>
                  <TabsTrigger value="quarterly">Quarterly</TabsTrigger>
                  <TabsTrigger value="yearly">Yearly</TabsTrigger>
                </TabsList>
              </Tabs>
            </div>
          </CardHeader>
          <CardContent>
            <ChartContainer config={chartConfig} className="h-[400px]">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={filteredChartData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
                  <CartesianGrid strokeDasharray="3 3" className="opacity-30" />
                  <XAxis 
                    dataKey="date" 
                    axisLine={false}
                    tickLine={false}
                    className="text-gray-500"
                  />
                  <YAxis 
                    tickFormatter={(value) => `$${(value / 1000).toFixed(0)}k`}
                    axisLine={false}
                    tickLine={false}
                    className="text-gray-500"
                  />
                  <ChartTooltip 
                    content={
                      <ChartTooltipContent 
                        formatter={(value, name) => [formatCurrency(Number(value)), name]}
                      />
                    } 
                  />
                  <ChartLegend content={<ChartLegendContent />} />
                  <Line 
                    type="monotone" 
                    dataKey="assets" 
                    stroke="hsl(142, 76%, 36%)" 
                    strokeWidth={3}
                    dot={{ fill: "hsl(142, 76%, 36%)", strokeWidth: 2, r: 4 }}
                    name="Assets" 
                  />
                  <Line 
                    type="monotone" 
                    dataKey="liabilities" 
                    stroke="hsl(0, 84%, 60%)" 
                    strokeWidth={3}
                    dot={{ fill: "hsl(0, 84%, 60%)", strokeWidth: 2, r: 4 }}
                    name="Liabilities" 
                  />
                  <Line 
                    type="monotone" 
                    dataKey="netWorth" 
                    stroke="hsl(var(--primary))" 
                    strokeWidth={3}
                    dot={{ fill: "hsl(var(--primary))", strokeWidth: 2, r: 4 }}
                    name="Net Worth" 
                  />
                </LineChart>
              </ResponsiveContainer>
            </ChartContainer>
          </CardContent>
        </Card>
      )}

      {/* Empty state when no data */}
      {(currentAssets === 0 && currentLiabilities === 0) && (
        <Card>
          <CardContent className="p-8 text-center">
            <div className="text-gray-500">
              <p className="text-lg font-medium mb-2">No data to display</p>
              <p>Add some assets and liabilities to see your net worth visualizations.</p>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default NetWorthCharts;
