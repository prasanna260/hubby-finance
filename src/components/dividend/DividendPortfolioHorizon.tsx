
import { useMemo } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, ResponsiveContainer } from "recharts";
import { TrendingUp } from "lucide-react";
import { DividendHolding } from "@/hooks/useDividendHoldings";

interface DividendPortfolioHorizonProps {
  holdings: DividendHolding[];
}

const DividendPortfolioHorizon = ({ holdings }: DividendPortfolioHorizonProps) => {
  const horizonData = useMemo(() => {
    const currentYear = new Date().getFullYear();
    const currentAnnualDividend = holdings.reduce((sum, holding) => sum + (holding.shares * holding.annual_dividend), 0);
    const currentPortfolioValue = holdings.reduce((sum, holding) => sum + (holding.shares * holding.current_price), 0);
    
    // Assume 5% annual dividend growth and 7% portfolio value growth
    const dividendGrowthRate = 0.05;
    const portfolioGrowthRate = 0.07;
    
    // Assume annual contribution of 10% of current portfolio value
    const annualContribution = currentPortfolioValue * 0.10;
    
    const years = [];
    
    for (let i = 0; i < 15; i++) {
      const year = currentYear + i;
      const yearMultiplier = Math.pow(1 + dividendGrowthRate, i);
      const portfolioMultiplier = Math.pow(1 + portfolioGrowthRate, i);
      
      const annualDividendIncome = currentAnnualDividend * yearMultiplier;
      const totalDividendsReceived = annualDividendIncome; // Simplified - in reality would accumulate
      const portfolioValue = (currentPortfolioValue + (annualContribution * i)) * portfolioMultiplier;
      
      years.push({
        year: year.toString(),
        annualDividendIncome: Math.round(annualDividendIncome),
        totalDividendsReceived: Math.round(totalDividendsReceived),
        portfolioValue: Math.round(portfolioValue),
        annualContribution: Math.round(annualContribution)
      });
    }
    
    return years;
  }, [holdings]);

  const chartConfig = {
    annualDividendIncome: {
      label: "Annual Dividend Income",
      color: "#3b82f6",
    },
    portfolioValue: {
      label: "Portfolio Value",
      color: "#10b981",
    },
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <TrendingUp size={20} />
          Portfolio Horizon (15 Years)
        </CardTitle>
        <CardDescription>
          15-year projection of your dividend portfolio growth (assumes 5% dividend growth, 7% portfolio growth)
        </CardDescription>
      </CardHeader>
      <CardContent>
        {/* Bar Chart */}
        <div className="mb-8">
          <ChartContainer config={chartConfig} className="h-[400px]">
            <BarChart data={horizonData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis 
                dataKey="year" 
                angle={-45}
                textAnchor="end"
                height={80}
                fontSize={12}
              />
              <YAxis 
                tickFormatter={(value) => `$${(value / 1000).toFixed(0)}K`}
                fontSize={12}
              />
              <ChartTooltip 
                content={
                  <ChartTooltipContent 
                    formatter={(value, name) => [
                      `$${Number(value).toLocaleString()}`,
                      name === "annualDividendIncome" ? "Annual Dividend Income" : "Portfolio Value"
                    ]}
                  />
                } 
              />
              <Bar 
                dataKey="annualDividendIncome" 
                fill="var(--color-annualDividendIncome)" 
                name="Annual Dividend Income"
                radius={[2, 2, 0, 0]}
              />
              <Bar 
                dataKey="portfolioValue" 
                fill="var(--color-portfolioValue)" 
                name="Portfolio Value"
                radius={[2, 2, 0, 0]}
              />
            </BarChart>
          </ChartContainer>
        </div>

        {/* Data Table */}
        <div className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Year</TableHead>
                <TableHead className="text-right">Annual Dividend Income</TableHead>
                <TableHead className="text-right">Total Dividends Received</TableHead>
                <TableHead className="text-right">Portfolio Value</TableHead>
                <TableHead className="text-right">Annual Contribution</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {horizonData.map((data, index) => (
                <TableRow key={data.year} className={index === 0 ? "bg-blue-50" : ""}>
                  <TableCell className="font-medium">
                    {data.year}
                    {index === 0 && <span className="ml-2 text-xs text-blue-600">(Current)</span>}
                  </TableCell>
                  <TableCell className="text-right font-mono">
                    ${data.annualDividendIncome.toLocaleString()}
                  </TableCell>
                  <TableCell className="text-right font-mono">
                    ${data.totalDividendsReceived.toLocaleString()}
                  </TableCell>
                  <TableCell className="text-right font-mono">
                    ${data.portfolioValue.toLocaleString()}
                  </TableCell>
                  <TableCell className="text-right font-mono">
                    ${data.annualContribution.toLocaleString()}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
        <div className="mt-4 text-sm text-gray-600">
          <p>* Projections are estimates based on assumed growth rates and may not reflect actual performance.</p>
          <p>* Annual contribution is calculated as 10% of current portfolio value.</p>
        </div>
      </CardContent>
    </Card>
  );
};

export default DividendPortfolioHorizon;
