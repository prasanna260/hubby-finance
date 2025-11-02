import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { useMemo } from 'react';

interface InvestmentChartProps {
  holdings: any[];
  period: '1W' | '1M' | '3M' | '1Y' | 'ALL';
}

const InvestmentChart = ({ holdings, period }: InvestmentChartProps) => {
  const chartData = useMemo(() => {
    // Generate mock data based on period for demonstration
    // In a real app, you'd fetch historical price data
    const generateData = () => {
      const days = period === '1W' ? 7 : period === '1M' ? 30 : period === '3M' ? 90 : period === '1Y' ? 365 : 730;
      const data = [];
      const startDate = new Date();
      startDate.setDate(startDate.getDate() - days);
      
      // Calculate current portfolio value
      const currentValue = holdings.reduce((sum, holding) => sum + (holding.current_price * holding.shares), 0);
      const investedValue = holdings.reduce((sum, holding) => sum + (holding.avg_price * holding.shares), 0);
      
      for (let i = 0; i <= days; i++) {
        const date = new Date(startDate);
        date.setDate(date.getDate() + i);
        
        // Simulate portfolio growth with some volatility
        const progress = i / days;
        const volatility = (Math.random() - 0.5) * 0.1; // 10% volatility
        const baseGrowth = progress * (currentValue - investedValue) / investedValue;
        const value = investedValue * (1 + baseGrowth + volatility);
        
        data.push({
          date: date.toISOString().split('T')[0],
          value: Math.max(value, investedValue * 0.8), // Don't go below 80% of invested
          invested: investedValue
        });
      }
      
      return data;
    };

    return generateData();
  }, [holdings, period]);

  if (holdings.length === 0) {
    return (
      <div className="h-64 flex items-center justify-center text-muted-foreground">
        <p>Add some stocks to see your portfolio performance</p>
      </div>
    );
  }

  return (
    <div className="h-64">
      <ResponsiveContainer width="100%" height="100%">
        <LineChart data={chartData} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
          <CartesianGrid strokeDasharray="3 3" className="stroke-muted" />
          <XAxis 
            dataKey="date" 
            className="text-muted-foreground text-xs"
            tickFormatter={(value) => {
              const date = new Date(value);
              return period === '1W' ? date.toLocaleDateString('en-US', { weekday: 'short' })
                : period === '1M' ? date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' })
                : date.toLocaleDateString('en-US', { month: 'short', year: '2-digit' });
            }}
          />
          <YAxis 
            className="text-muted-foreground text-xs"
            tickFormatter={(value) => `$${(value / 1000).toFixed(0)}k`}
          />
          <Tooltip 
            formatter={(value: any) => [`$${Number(value).toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`, 'Portfolio Value']}
            labelFormatter={(label) => `Date: ${label}`}
            contentStyle={{
              backgroundColor: 'hsl(var(--card))',
              border: '1px solid hsl(var(--border))',
              borderRadius: '8px'
            }}
          />
          <Line 
            type="monotone" 
            dataKey="value" 
            stroke="hsl(var(--primary))" 
            strokeWidth={2}
            dot={false}
            activeDot={{ r: 4, fill: 'hsl(var(--primary))' }}
          />
          <Line 
            type="monotone" 
            dataKey="invested" 
            stroke="hsl(var(--muted-foreground))" 
            strokeWidth={1}
            strokeDasharray="5 5"
            dot={false}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};

export default InvestmentChart;