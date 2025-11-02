
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { TrendingUp, TrendingDown, DollarSign, Target } from "lucide-react";

interface NetWorthSummaryProps {
  totalAssets: number;
  totalLiabilities: number;
  netWorth: number;
}

const NetWorthSummary = ({ totalAssets, totalLiabilities, netWorth }: NetWorthSummaryProps) => {
  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(amount);
  };

  return (
    <div className="text-center space-y-8 mb-12">
      {/* Main Title */}
      <div>
        <h2 className="text-sm font-medium text-gray-500 uppercase tracking-wider mb-4">
          FAMILY NET WORTH
        </h2>
        <div className="text-6xl font-bold text-gray-900 mb-8">
          {formatCurrency(netWorth)}
        </div>
      </div>

      {/* Assets and Liabilities */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-2xl mx-auto">
        <div className="text-center">
          <div className="text-sm font-medium text-gray-500 uppercase tracking-wider mb-2">
            Assets
          </div>
          <div className="text-3xl font-bold text-green-600">
            {formatCurrency(totalAssets)}
          </div>
        </div>
        
        <div className="text-center">
          <div className="text-sm font-medium text-gray-500 uppercase tracking-wider mb-2">
            Liabilities
          </div>
          <div className="text-3xl font-bold text-red-600">
            -{formatCurrency(totalLiabilities)}
          </div>
        </div>
      </div>
    </div>
  );
};

export default NetWorthSummary;
