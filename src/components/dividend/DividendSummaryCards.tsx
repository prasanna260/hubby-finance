
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { DividendHolding } from "@/hooks/useDividendHoldings";

interface DividendSummaryCardsProps {
  holdings: DividendHolding[];
}

const DividendSummaryCards = ({ holdings }: DividendSummaryCardsProps) => {
  const totalValue = holdings.reduce((sum, holding) => sum + (holding.shares * holding.current_price), 0);
  const totalAnnualIncome = holdings.reduce((sum, holding) => sum + (holding.shares * holding.annual_dividend), 0);

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="text-sm font-medium text-gray-600">Total Portfolio Value</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold text-green-600">${totalValue.toLocaleString()}</div>
        </CardContent>
      </Card>
      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="text-sm font-medium text-gray-600">Annual Dividend Income</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold text-blue-600">${totalAnnualIncome.toFixed(2)}</div>
        </CardContent>
      </Card>
      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="text-sm font-medium text-gray-600">Total Holdings</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold text-purple-600">{holdings.length}</div>
        </CardContent>
      </Card>
    </div>
  );
};

export default DividendSummaryCards;
