import { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart";
import { LineChart, Line, XAxis, YAxis, ResponsiveContainer, Legend } from "recharts";
import { Calculator, Search, TrendingUp } from "lucide-react";
import { StockDataService } from "@/services/stockDataService";

interface StockData {
  symbol: string;
  price: number;
  dividendYield: number;
  annualDividend: number;
}

interface ProjectionData {
  year: number;
  sharesOwned: number;
  annualDividend: number;
  annualDividendAfterTax: number;
  yearEndSharesOwned: number;
  newBalance: number;
  totalDividends: number;
  portfolioValue: number;
  portfolioValueWithReinvestment: number;
  annualDividendIncome: number;
}

const DividendCalculator = () => {
  const [symbol, setSymbol] = useState("");
  const [investmentAmount, setInvestmentAmount] = useState(10000);
  const [dividendReinvestment, setDividendReinvestment] = useState(true);
  const [taxRate, setTaxRate] = useState(15); // Default 15% tax rate for qualified dividends
  const [stockData, setStockData] = useState<StockData | null>(null);
  const [projections, setProjections] = useState<ProjectionData[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const fetchStockData = async () => {
    if (!symbol.trim()) {
      setError("Please enter a stock symbol");
      return;
    }

    setLoading(true);
    setError("");
    
    try {
      const [quote, dividend] = await Promise.all([
        StockDataService.fetchStockQuote(symbol.toUpperCase()),
        StockDataService.fetchDividendData(symbol.toUpperCase())
      ]);

      const data: StockData = {
        symbol: quote.symbol,
        price: quote.price,
        dividendYield: dividend.dividendYield,
        annualDividend: dividend.annualDividend
      };

      console.log('Setting stock data:', data);
      setStockData(data);
    } catch (err) {
      console.error('Error fetching stock data:', err);
      setError("Failed to fetch stock data. Please try again.");
      setStockData(null);
      setProjections([]);
    } finally {
      setLoading(false);
    }
  };

  const calculateProjections = (data: StockData) => {
    console.log('Calculating projections with data:', data);
    
    if (!data || data.price <= 0 || data.annualDividend <= 0) {
      console.log('Invalid data for calculations:', data);
      setProjections([]);
      return;
    }

    const years = [1, 3, 5, 7, 10, 20];
    const initialShares = investmentAmount / data.price;
    
    console.log(`Initial shares: ${initialShares.toFixed(2)} shares`);
    console.log(`Annual dividend per share: $${data.annualDividend.toFixed(2)}`);
    
    // Assume 3% annual dividend growth rate (conservative estimate)
    const dividendGrowthRate = 0.03;
    // Assume 7% annual stock price appreciation
    const stockGrowthRate = 0.07;

    const newProjections: ProjectionData[] = years.map(year => {
      let totalDividends = 0;
      let currentShares = initialShares;
      let yearEndShares = initialShares;
      
      // Calculate year by year for accurate reinvestment
      for (let y = 1; y <= year; y++) {
        const dividendPerShare = data.annualDividend * Math.pow(1 + dividendGrowthRate, y - 1);
        const yearlyDividends = currentShares * dividendPerShare;
        const yearlyDividendsAfterTax = yearlyDividends * (1 - taxRate / 100);
        totalDividends += yearlyDividends;

        if (dividendReinvestment) {
          // Reinvest dividends to buy more shares (using after-tax dividends)
          const stockPriceThisYear = data.price * Math.pow(1 + stockGrowthRate, y);
          const additionalShares = yearlyDividendsAfterTax / stockPriceThisYear;
          currentShares += additionalShares;
        }
        
        yearEndShares = currentShares;
      }

      const finalStockPrice = data.price * Math.pow(1 + stockGrowthRate, year);
      const portfolioValue = initialShares * finalStockPrice;
      const portfolioValueWithReinvestmentFinal = yearEndShares * finalStockPrice;
      const finalAnnualDividendIncome = yearEndShares * data.annualDividend * Math.pow(1 + dividendGrowthRate, year);
      const finalAnnualDividendIncomeAfterTax = finalAnnualDividendIncome * (1 - taxRate / 100);

      console.log(`Year ${year}: Total Dividends: $${totalDividends.toFixed(2)}, Portfolio Value: $${portfolioValue.toFixed(2)}, Value with Reinvestment: $${portfolioValueWithReinvestmentFinal.toFixed(2)}`);

      return {
        year,
        sharesOwned: initialShares,
        annualDividend: finalAnnualDividendIncome,
        annualDividendAfterTax: finalAnnualDividendIncomeAfterTax,
        yearEndSharesOwned: yearEndShares,
        newBalance: portfolioValueWithReinvestmentFinal,
        totalDividends,
        portfolioValue,
        portfolioValueWithReinvestment: portfolioValueWithReinvestmentFinal,
        annualDividendIncome: finalAnnualDividendIncome
      };
    });

    console.log('Setting new projections:', newProjections);
    setProjections(newProjections);
  };

  // Recalculate projections whenever stockData, investmentAmount, dividendReinvestment, or taxRate changes
  useEffect(() => {
    console.log('useEffect triggered - stockData changed:', stockData);
    if (stockData) {
      calculateProjections(stockData);
    }
  }, [stockData, investmentAmount, dividendReinvestment, taxRate]);

  const chartData = projections.map(p => ({
    year: p.year,
    "Cumulative Dividends": Math.round(p.totalDividends),
    "Portfolio Value": Math.round(p.portfolioValue),
    "Portfolio Value (Reinvestment)": dividendReinvestment ? Math.round(p.portfolioValueWithReinvestment) : Math.round(p.portfolioValue)
  }));

  console.log('Chart data:', chartData);

  const chartConfig = {
    "Cumulative Dividends": {
      label: "Cumulative Dividends",
      color: "#10b981"
    },
    "Portfolio Value": {
      label: "Portfolio Value (No Reinvestment)",
      color: "#3b82f6"
    },
    "Portfolio Value (Reinvestment)": {
      label: "Portfolio Value (With Reinvestment)",
      color: "#8b5cf6"
    }
  };

  return (
    <div className="space-y-6">
      {/* Calculator Input */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Calculator size={20} />
            Dividend Projection Calculator
          </CardTitle>
          <CardDescription>
            Calculate future dividend income and portfolio growth for any stock
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="space-y-2">
              <Label htmlFor="symbol">Stock Symbol</Label>
              <div className="flex gap-2">
                <Input
                  id="symbol"
                  value={symbol}
                  onChange={(e) => setSymbol(e.target.value.toUpperCase())}
                  placeholder="e.g., AAPL, KO, JNJ"
                  className="uppercase"
                />
                <Button onClick={fetchStockData} disabled={loading}>
                  <Search size={16} />
                </Button>
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="investment">Investment Amount ($)</Label>
              <Input
                id="investment"
                type="number"
                value={investmentAmount}
                onChange={(e) => setInvestmentAmount(Number(e.target.value))}
                min="100"
                step="100"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="taxRate">Tax Rate (%)</Label>
              <Input
                id="taxRate"
                type="number"
                value={taxRate}
                onChange={(e) => setTaxRate(Number(e.target.value))}
                min="0"
                max="50"
                step="1"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="reinvestment">Dividend Reinvestment</Label>
              <div className="flex items-center space-x-2 pt-2">
                <Switch
                  id="reinvestment"
                  checked={dividendReinvestment}
                  onCheckedChange={setDividendReinvestment}
                />
                <span className="text-sm text-gray-600">
                  {dividendReinvestment ? "Enabled" : "Disabled"}
                </span>
              </div>
            </div>
          </div>

          {error && (
            <div className="text-red-600 text-sm bg-red-50 p-3 rounded-md">
              {error}
            </div>
          )}

          {loading && (
            <div className="text-center py-4">
              <p className="text-gray-600">Fetching stock data...</p>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Stock Info */}
      {stockData && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <TrendingUp size={20} />
              {stockData.symbol} - Stock Information
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div>
                <p className="text-sm text-gray-600">Current Price</p>
                <p className="text-xl font-bold">${stockData.price.toFixed(2)}</p>
              </div>
              <div>
                <p className="text-sm text-gray-600">Dividend Yield</p>
                <p className="text-xl font-bold text-green-600">{stockData.dividendYield.toFixed(2)}%</p>
              </div>
              <div>
                <p className="text-sm text-gray-600">Annual Dividend</p>
                <p className="text-xl font-bold">${stockData.annualDividend.toFixed(2)}</p>
              </div>
              <div>
                <p className="text-sm text-gray-600">Initial Shares Owned</p>
                <p className="text-xl font-bold">{(investmentAmount / stockData.price).toFixed(0)}</p>
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Projections Chart */}
      {projections.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle>Investment Growth Projections</CardTitle>
            <CardDescription>
              Projected growth over 1, 3, 5, 7, 10, and 20 years
            </CardDescription>
          </CardHeader>
          <CardContent>
            <ChartContainer config={chartConfig} className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={chartData}>
                  <XAxis dataKey="year" />
                  <YAxis />
                  <ChartTooltip
                    content={<ChartTooltipContent />}
                    formatter={(value: any) => [
                      `$${Number(value).toLocaleString()}`,
                      ""
                    ]}
                  />
                  <Legend />
                  <Line 
                    type="monotone" 
                    dataKey="Cumulative Dividends" 
                    stroke={chartConfig["Cumulative Dividends"].color} 
                    strokeWidth={2}
                  />
                  <Line 
                    type="monotone" 
                    dataKey="Portfolio Value" 
                    stroke={chartConfig["Portfolio Value"].color} 
                    strokeWidth={2}
                  />
                  {dividendReinvestment && (
                    <Line 
                      type="monotone" 
                      dataKey="Portfolio Value (Reinvestment)" 
                      stroke={chartConfig["Portfolio Value (Reinvestment)"].color} 
                      strokeWidth={2}
                    />
                  )}
                </LineChart>
              </ResponsiveContainer>
            </ChartContainer>
          </CardContent>
        </Card>
      )}

      {/* Updated Projections Table */}
      {projections.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle>Detailed Projections</CardTitle>
            <CardDescription>
              Year-by-year breakdown of shares, dividends, and portfolio value
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Year</TableHead>
                    <TableHead className="text-right">Shares Owned</TableHead>
                    <TableHead className="text-right">Annual Dividend</TableHead>
                    <TableHead className="text-right">Annual Dividend After Tax</TableHead>
                    <TableHead className="text-right">Year End Shares Owned</TableHead>
                    <TableHead className="text-right">New Balance</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {projections.map((projection) => (
                    <TableRow key={projection.year}>
                      <TableCell className="font-medium">{projection.year}</TableCell>
                      <TableCell className="text-right">
                        {projection.sharesOwned.toLocaleString(undefined, { minimumFractionDigits: 0, maximumFractionDigits: 0 })}
                      </TableCell>
                      <TableCell className="text-right font-bold text-green-600">
                        ${projection.annualDividend.toLocaleString(undefined, { minimumFractionDigits: 0, maximumFractionDigits: 0 })}
                      </TableCell>
                      <TableCell className="text-right font-bold text-blue-600">
                        ${projection.annualDividendAfterTax.toLocaleString(undefined, { minimumFractionDigits: 0, maximumFractionDigits: 0 })}
                      </TableCell>
                      <TableCell className="text-right">
                        {projection.yearEndSharesOwned.toLocaleString(undefined, { minimumFractionDigits: 0, maximumFractionDigits: 0 })}
                      </TableCell>
                      <TableCell className="text-right font-bold text-purple-600">
                        ${projection.newBalance.toLocaleString(undefined, { minimumFractionDigits: 0, maximumFractionDigits: 0 })}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default DividendCalculator;
