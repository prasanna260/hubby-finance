
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { NewDividendHolding } from "@/hooks/useDividendHoldings";

interface DividendHoldingFormProps {
  holding: NewDividendHolding;
  setHolding: (holding: NewDividendHolding) => void;
  isEdit: boolean;
  onSymbolChange?: (symbol: string) => void;
}

const DividendHoldingForm = ({ holding, setHolding, isEdit, onSymbolChange }: DividendHoldingFormProps) => {
  const sectors = [
    "Technology",
    "Healthcare",
    "Financial Services",
    "Consumer Staples",
    "Consumer Discretionary",
    "Industrials",
    "Energy",
    "Materials",
    "Real Estate",
    "Utilities",
    "Telecommunications"
  ];

  const frequencies = ["Monthly", "Quarterly", "Semi-Annual", "Annual"];

  const handleSymbolChange = (value: string) => {
    const upperValue = value.toUpperCase();
    setHolding({...holding, symbol: upperValue});
    if (onSymbolChange) {
      onSymbolChange(upperValue);
    }
  };

  return (
    <div className="grid gap-4 py-4">
      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="symbol">Symbol *</Label>
          <Input
            id="symbol"
            placeholder="AAPL"
            value={holding.symbol}
            onChange={(e) => handleSymbolChange(e.target.value)}
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="shares">Shares *</Label>
          <Input
            id="shares"
            type="number"
            placeholder="100"
            value={holding.shares || ""}
            onChange={(e) => setHolding({...holding, shares: Number(e.target.value)})}
          />
        </div>
      </div>
      <div className="space-y-2">
        <Label htmlFor="companyName">Company Name *</Label>
        <Input
          id="companyName"
          placeholder="Apple Inc."
          value={holding.company_name}
          onChange={(e) => setHolding({...holding, company_name: e.target.value})}
        />
      </div>
      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="avgPrice">Average Price</Label>
          <Input
            id="avgPrice"
            type="number"
            step="0.01"
            placeholder="150.25"
            value={holding.avg_price || ""}
            onChange={(e) => setHolding({...holding, avg_price: Number(e.target.value)})}
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="currentPrice">Current Price {!isEdit && "(Auto-filled)"}</Label>
          <Input
            id="currentPrice"
            type="number"
            step="0.01"
            placeholder="175.80"
            value={holding.current_price || ""}
            onChange={(e) => setHolding({...holding, current_price: Number(e.target.value)})}
            readOnly={!isEdit}
            className={!isEdit ? "bg-gray-50" : ""}
          />
        </div>
      </div>
      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="dividendYield">Dividend Yield (%) {!isEdit && "(Auto-filled)"}</Label>
          <Input
            id="dividendYield"
            type="number"
            step="0.1"
            placeholder="2.5"
            value={holding.dividend_yield || ""}
            onChange={(e) => setHolding({...holding, dividend_yield: Number(e.target.value)})}
            readOnly={!isEdit}
            className={!isEdit ? "bg-gray-50" : ""}
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="annualDividend">Annual Dividend {!isEdit && "(Auto-filled)"}</Label>
          <Input
            id="annualDividend"
            type="number"
            step="0.01"
            placeholder="1.84"
            value={holding.annual_dividend || ""}
            onChange={(e) => setHolding({...holding, annual_dividend: Number(e.target.value)})}
            readOnly={!isEdit}
            className={!isEdit ? "bg-gray-50" : ""}
          />
        </div>
      </div>
      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="frequency">Frequency {!isEdit && "(Auto-filled)"}</Label>
          <Select 
            value={holding.frequency} 
            onValueChange={(value) => setHolding({...holding, frequency: value})}
            disabled={!isEdit}
          >
            <SelectTrigger className={!isEdit ? "bg-gray-50" : ""}>
              <SelectValue placeholder="Select frequency" />
            </SelectTrigger>
            <SelectContent>
              {frequencies.map((freq) => (
                <SelectItem key={freq} value={freq}>{freq}</SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        <div className="space-y-2">
          <Label htmlFor="sector">Sector</Label>
          <Select value={holding.sector} onValueChange={(value) => setHolding({...holding, sector: value})}>
            <SelectTrigger>
              <SelectValue placeholder="Select sector" />
            </SelectTrigger>
            <SelectContent>
              {sectors.map((sector) => (
                <SelectItem key={sector} value={sector}>{sector}</SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>
    </div>
  );
};

export default DividendHoldingForm;
