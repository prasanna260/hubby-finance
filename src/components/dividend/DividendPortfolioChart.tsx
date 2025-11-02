
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip, Legend } from "recharts";
import { DividendHolding } from "@/hooks/useDividendHoldings";

interface DividendPortfolioChartProps {
  holdings: DividendHolding[];
}

const DividendPortfolioChart = ({ holdings }: DividendPortfolioChartProps) => {
  if (holdings.length === 0) return null;

  const totalValue = holdings.reduce((sum, holding) => sum + (holding.shares * holding.current_price), 0);
  
  // Better color palette for the pie chart
  const colors = [
    '#3B82F6', // Blue
    '#10B981', // Emerald
    '#F59E0B', // Amber
    '#EF4444', // Red
    '#8B5CF6', // Violet
    '#F97316', // Orange
    '#06B6D4', // Cyan
    '#84CC16', // Lime
    '#EC4899', // Pink
    '#6366F1', // Indigo
    '#14B8A6', // Teal
    '#F472B6', // Hot Pink
  ];
  
  const pieChartData = holdings.map((holding, index) => ({
    name: holding.symbol,
    value: holding.shares * holding.current_price,
    percentage: ((holding.shares * holding.current_price) / totalValue * 100).toFixed(1),
    color: colors[index % colors.length]
  }));

  return (
    <Card>
      <CardHeader>
        <CardTitle>Portfolio Allocation</CardTitle>
        <CardDescription>Distribution of holdings by value</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Pie Chart */}
          <div className="h-80 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={pieChartData}
                  cx="50%"
                  cy="50%"
                  outerRadius={100}
                  dataKey="value"
                  label={({ percentage }) => `${percentage}%`}
                >
                  {pieChartData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip 
                  formatter={(value: number) => [
                    `$${value.toLocaleString()}`, 
                    'Value'
                  ]}
                />
                <Legend />
              </PieChart>
            </ResponsiveContainer>
          </div>

          {/* Holdings Summary */}
          <div className="space-y-3">
            <h3 className="text-lg font-semibold mb-4">Total Invested by Holding</h3>
            <div className="space-y-2 max-h-72 overflow-y-auto">
              {holdings.map((holding, index) => {
                const currentValue = holding.shares * holding.current_price;
                const color = colors[index % colors.length];

                return (
                  <div key={holding.id} className="p-3 bg-gray-50 rounded-lg">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <div 
                          className="w-3 h-3 rounded-full" 
                          style={{ backgroundColor: color }}
                        />
                        <span className="font-medium">{holding.symbol}</span>
                      </div>
                      <span className="font-semibold">${currentValue.toLocaleString()}</span>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default DividendPortfolioChart;
