
import { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart";
import { BarChart, Bar, XAxis, YAxis, ResponsiveContainer } from "recharts";
import { DollarSign, TrendingUp, Calendar, Filter } from "lucide-react";
import { useAuth } from "@/hooks/useAuth";
import { useDividendHoldings } from "@/hooks/useDividendHoldings";

interface IncomeRecord {
  id: string;
  symbol: string;
  companyName: string;
  date: string;
  amount: number;
  shares: number;
  totalAmount: number;
  quarter: string;
}

const DividendIncome = () => {
  const [selectedYear, setSelectedYear] = useState("2025");
  const [selectedQuarter, setSelectedQuarter] = useState("all");
  const [incomeRecords, setIncomeRecords] = useState<IncomeRecord[]>([]);
  const { user } = useAuth();
  const { holdings } = useDividendHoldings(user);

  // Generate available years dynamically
  const currentYear = new Date().getFullYear();
  const availableYears = Array.from({ length: 5 }, (_, i) => currentYear - i + 1).sort((a, b) => b - a);

  // Generate income records based on actual holdings
  useEffect(() => {
    if (holdings.length === 0) {
      setIncomeRecords([]);
      return;
    }

    const generatedRecords: IncomeRecord[] = [];
    
    holdings.forEach((holding) => {
      if (holding.annual_dividend > 0) {
        // Determine payment frequency
        let paymentsPerYear = 4; // Default quarterly
        const frequency = holding.frequency.toLowerCase();
        
        if (frequency.includes('monthly')) {
          paymentsPerYear = 12;
        } else if (frequency.includes('semi') || frequency.includes('twice')) {
          paymentsPerYear = 2;
        } else if (frequency.includes('annual') || frequency.includes('yearly')) {
          paymentsPerYear = 1;
        }

        const paymentAmount = holding.annual_dividend / paymentsPerYear;
        
        // Generate records for 2024 and 2025
        [2024, 2025].forEach(year => {
          for (let payment = 0; payment < paymentsPerYear; payment++) {
            let paymentDate: Date;
            let quarter: string;
            
            if (frequency.includes('monthly')) {
              // Monthly payments - generate for each month
              const month = payment;
              paymentDate = new Date(year, month, 15); // 15th of each month
              quarter = `Q${Math.ceil((month + 1) / 3)}`;
            } else if (frequency.includes('quarterly')) {
              // Quarterly payments - March, June, September, December
              const quarterMonth = [2, 5, 8, 11][payment]; // March, June, Sep, Dec
              paymentDate = new Date(year, quarterMonth, 15);
              quarter = `Q${payment + 1}`;
            } else if (frequency.includes('semi')) {
              // Semi-annual - June and December
              const semiMonth = payment === 0 ? 5 : 11; // June or December
              paymentDate = new Date(year, semiMonth, 15);
              quarter = payment === 0 ? "Q2" : "Q4";
            } else {
              // Annual - December
              paymentDate = new Date(year, 11, 15); // December
              quarter = "Q4";
            }

            // Only include past and current month payments for current year
            const now = new Date();
            if (year === now.getFullYear() && paymentDate > now) {
              return; // Skip future payments for current year
            }

            const totalAmount = paymentAmount * holding.shares;
            
            generatedRecords.push({
              id: `${holding.id}-${year}-${payment}`,
              symbol: holding.symbol,
              companyName: holding.company_name,
              date: paymentDate.toISOString().split('T')[0],
              amount: paymentAmount,
              shares: holding.shares,
              totalAmount: totalAmount,
              quarter: quarter
            });
          }
        });
      }
    });

    // Sort by date (most recent first)
    generatedRecords.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
    setIncomeRecords(generatedRecords);
  }, [holdings]);

  // Filter income records by selected year
  const filteredIncomeRecords = incomeRecords.filter(record => {
    const recordYear = new Date(record.date).getFullYear().toString();
    return recordYear === selectedYear;
  });

  const chartData = [
    { month: "Jan", income: filteredIncomeRecords.filter(r => new Date(r.date).getMonth() === 0).reduce((sum, r) => sum + r.totalAmount, 0) },
    { month: "Feb", income: filteredIncomeRecords.filter(r => new Date(r.date).getMonth() === 1).reduce((sum, r) => sum + r.totalAmount, 0) },
    { month: "Mar", income: filteredIncomeRecords.filter(r => new Date(r.date).getMonth() === 2).reduce((sum, r) => sum + r.totalAmount, 0) },
    { month: "Apr", income: filteredIncomeRecords.filter(r => new Date(r.date).getMonth() === 3).reduce((sum, r) => sum + r.totalAmount, 0) },
    { month: "May", income: filteredIncomeRecords.filter(r => new Date(r.date).getMonth() === 4).reduce((sum, r) => sum + r.totalAmount, 0) },
    { month: "Jun", income: filteredIncomeRecords.filter(r => new Date(r.date).getMonth() === 5).reduce((sum, r) => sum + r.totalAmount, 0) },
    { month: "Jul", income: filteredIncomeRecords.filter(r => new Date(r.date).getMonth() === 6).reduce((sum, r) => sum + r.totalAmount, 0) },
    { month: "Aug", income: filteredIncomeRecords.filter(r => new Date(r.date).getMonth() === 7).reduce((sum, r) => sum + r.totalAmount, 0) },
    { month: "Sep", income: filteredIncomeRecords.filter(r => new Date(r.date).getMonth() === 8).reduce((sum, r) => sum + r.totalAmount, 0) },
    { month: "Oct", income: filteredIncomeRecords.filter(r => new Date(r.date).getMonth() === 9).reduce((sum, r) => sum + r.totalAmount, 0) },
    { month: "Nov", income: filteredIncomeRecords.filter(r => new Date(r.date).getMonth() === 10).reduce((sum, r) => sum + r.totalAmount, 0) },
    { month: "Dec", income: filteredIncomeRecords.filter(r => new Date(r.date).getMonth() === 11).reduce((sum, r) => sum + r.totalAmount, 0) }
  ];

  const chartConfig = {
    income: {
      label: "Dividend Income",
      color: "#3b82f6"
    }
  };

  const totalIncome = filteredIncomeRecords.reduce((sum, record) => sum + record.totalAmount, 0);
  const averageMonthly = totalIncome / 12;
  const lastYearIncome = incomeRecords.filter(r => new Date(r.date).getFullYear() === parseInt(selectedYear) - 1).reduce((sum, r) => sum + r.totalAmount, 0);
  const growthRate = lastYearIncome > 0 ? ((totalIncome - lastYearIncome) / lastYearIncome) * 100 : 0;

  const finalFilteredRecords = filteredIncomeRecords.filter(record => {
    if (selectedQuarter === "all") return true;
    return record.quarter === selectedQuarter;
  });

  return (
    <div className="space-y-6">
      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-gray-600">
              {selectedYear} Total Income
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-600">${totalIncome.toFixed(2)}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-gray-600">Monthly Average</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-blue-600">${averageMonthly.toFixed(2)}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-gray-600">Growth Rate</CardTitle>
          </CardHeader>
          <CardContent>
            <div className={`text-2xl font-bold ${growthRate >= 0 ? 'text-green-600' : 'text-red-600'}`}>
              {growthRate >= 0 ? '+' : ''}{growthRate.toFixed(1)}%
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-gray-600">Total Payments</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-orange-600">{filteredIncomeRecords.length}</div>
          </CardContent>
        </Card>
      </div>

      {/* Income Chart */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <TrendingUp size={20} />
            Monthly Dividend Income {selectedYear}
          </CardTitle>
          <CardDescription>Your calculated dividend income based on current holdings for {selectedYear}</CardDescription>
        </CardHeader>
        <CardContent>
          <ChartContainer config={chartConfig} className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={chartData}>
                <XAxis dataKey="month" />
                <YAxis />
                <ChartTooltip content={<ChartTooltipContent />} />
                <Bar dataKey="income" fill="var(--color-income)" radius={4} />
              </BarChart>
            </ResponsiveContainer>
          </ChartContainer>
        </CardContent>
      </Card>

      {/* Income Records */}
      <Card>
        <CardHeader>
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div>
              <CardTitle className="flex items-center gap-2">
                <DollarSign size={20} />
                Dividend Income Records {selectedYear}
              </CardTitle>
              <CardDescription>
                Calculated dividend payments based on your current holdings for {selectedYear}
              </CardDescription>
            </div>
            <div className="flex gap-2">
              <select 
                value={selectedQuarter} 
                onChange={(e) => setSelectedQuarter(e.target.value)}
                className="border rounded-md px-3 py-2"
              >
                <option value="all">All Quarters</option>
                <option value="Q1">Q1</option>
                <option value="Q2">Q2</option>
                <option value="Q3">Q3</option>
                <option value="Q4">Q4</option>
              </select>
              <select 
                value={selectedYear} 
                onChange={(e) => setSelectedYear(e.target.value)}
                className="border rounded-md px-3 py-2"
              >
                {availableYears.map(year => (
                  <option key={year} value={year.toString()}>{year}</option>
                ))}
              </select>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          {finalFilteredRecords.length === 0 ? (
            <div className="text-center py-8">
              <p className="text-gray-500 mb-2">
                No dividend income records found for {selectedYear}.
              </p>
              <p className="text-sm text-gray-400">
                {holdings.length === 0 
                  ? "Add some dividend-paying stocks to your portfolio to see income records here."
                  : `Income records are calculated based on your current holdings.`
                }
              </p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Date</TableHead>
                    <TableHead>Symbol</TableHead>
                    <TableHead>Company</TableHead>
                    <TableHead className="text-right">Shares</TableHead>
                    <TableHead className="text-right">Per Share</TableHead>
                    <TableHead className="text-right">Total Amount</TableHead>
                    <TableHead>Quarter</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {finalFilteredRecords.map((record) => (
                    <TableRow key={record.id}>
                      <TableCell>{new Date(record.date).toLocaleDateString()}</TableCell>
                      <TableCell className="font-medium">{record.symbol}</TableCell>
                      <TableCell>{record.companyName}</TableCell>
                      <TableCell className="text-right">{record.shares}</TableCell>
                      <TableCell className="text-right">${record.amount.toFixed(2)}</TableCell>
                      <TableCell className="text-right font-bold text-green-600">
                        ${record.totalAmount.toFixed(2)}
                      </TableCell>
                      <TableCell>
                        <Badge variant="outline">{record.quarter}</Badge>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default DividendIncome;
