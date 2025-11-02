import { useAuth } from "@/hooks/useAuth";
import { useDividendHoldings } from "@/hooks/useDividendHoldings";
import { StockDataService } from "@/services/stockDataService";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from "@/components/ui/alert-dialog";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import { Search, Plus, Edit, Trash2, TrendingUp, TrendingDown } from "lucide-react";
import { useState, useMemo, useEffect } from "react";
import { debounce } from "lodash";
import { useToast } from "@/hooks/use-toast";
import DividendHoldingForm from "@/components/dividend/DividendHoldingForm";

interface NewDividendHolding {
  symbol: string;
  company_name: string;
  shares: number;
  avg_price: number;
  current_price: number;
  dividend_yield: number;
  annual_dividend: number;
  frequency: string;
  sector: string;
}

const InvestmentHoldings = () => {
  const { user } = useAuth();
  const { 
    holdings, 
    loading, 
    updatingPrices,
    addHolding, 
    updateHolding, 
    deleteHolding,
    updateStockData 
  } = useDividendHoldings(user);
  const { toast } = useToast();
  
  const [searchTerm, setSearchTerm] = useState("");
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingHolding, setEditingHolding] = useState<any>(null);
  const [newHolding, setNewHolding] = useState<NewDividendHolding>({
    symbol: "",
    company_name: "",
    shares: 0,
    avg_price: 0,
    current_price: 0,
    dividend_yield: 0,
    annual_dividend: 0,
    frequency: "",
    sector: ""
  });
  const [fetchingStockData, setFetchingStockData] = useState(false);

  // Auto-refresh stock prices every 30 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      if (holdings.length > 0 && !updatingPrices) {
        updateStockData();
        console.log('Auto-refreshing stock prices...');
      }
    }, 30000); // Update every 30 seconds

    return () => clearInterval(interval);
  }, [holdings.length, updatingPrices, updateStockData]);

  const filteredHoldings = useMemo(() => {
    if (!searchTerm) return holdings;
    return holdings.filter(holding => 
      holding.symbol.toLowerCase().includes(searchTerm.toLowerCase()) ||
      holding.company_name.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }, [holdings, searchTerm]);

  const debouncedFetchStockData = useMemo(
    () => debounce(async (symbol: string) => {
      if (!symbol || symbol.length < 1) return;
      
      setFetchingStockData(true);
      try {
        const stockData = await StockDataService.fetchStockQuote(symbol.toUpperCase());
        const dividendData = await StockDataService.fetchDividendData(symbol.toUpperCase());
        
        setNewHolding(prev => ({
          ...prev,
          symbol: stockData.symbol,
          company_name: stockData.symbol, // You might want to fetch company name from another API
          current_price: stockData.price,
          dividend_yield: dividendData.dividendYield,
          annual_dividend: dividendData.annualDividend,
          frequency: dividendData.frequency
        }));
      } catch (error) {
        console.error('Error fetching stock data:', error);
        toast({
          title: "Error",
          description: "Failed to fetch stock data. Please try again.",
          variant: "destructive",
        });
      } finally {
        setFetchingStockData(false);
      }
    }, 500),
    [toast]
  );

  const handleSymbolChange = (symbol: string) => {
    setNewHolding(prev => ({ ...prev, symbol: symbol.toUpperCase() }));
    debouncedFetchStockData(symbol);
  };

  const handleDelete = async (id: string) => {
    const success = await deleteHolding(id);
    if (success) {
      toast({
        title: "Success",
        description: "Investment holding deleted successfully.",
      });
    }
  };

  const handleEdit = (holding: any) => {
    setEditingHolding(holding);
    setNewHolding({
      symbol: holding.symbol,
      company_name: holding.company_name,
      shares: holding.shares,
      avg_price: holding.avg_price,
      current_price: holding.current_price,
      dividend_yield: holding.dividend_yield,
      annual_dividend: holding.annual_dividend,
      frequency: holding.frequency,
      sector: holding.sector
    });
    setIsDialogOpen(true);
  };

  const handleAddHolding = async () => {
    if (!newHolding.symbol || newHolding.shares <= 0 || newHolding.avg_price <= 0) {
      toast({
        title: "Error",
        description: "Please fill in all required fields.",
        variant: "destructive",
      });
      return;
    }

    const success = await addHolding(newHolding);
    if (success) {
      toast({
        title: "Success",
        description: "Investment holding added successfully.",
      });
      setIsDialogOpen(false);
      setNewHolding({
        symbol: "",
        company_name: "",
        shares: 0,
        avg_price: 0,
        current_price: 0,
        dividend_yield: 0,
        annual_dividend: 0,
        frequency: "",
        sector: ""
      });
    }
  };

  const handleEditHolding = async () => {
    if (!editingHolding || !newHolding.symbol || newHolding.shares <= 0 || newHolding.avg_price <= 0) {
      toast({
        title: "Error",
        description: "Please fill in all required fields.",
        variant: "destructive",
      });
      return;
    }

    const success = await updateHolding(editingHolding.id, newHolding);
    if (success) {
      toast({
        title: "Success",
        description: "Investment holding updated successfully.",
      });
      setIsDialogOpen(false);
      setEditingHolding(null);
      setNewHolding({
        symbol: "",
        company_name: "",
        shares: 0,
        avg_price: 0,
        current_price: 0,
        dividend_yield: 0,
        annual_dividend: 0,
        frequency: "",
        sector: ""
      });
    }
  };

  const handleAddDialogChange = (open: boolean) => {
    setIsDialogOpen(open);
    if (!open) {
      setEditingHolding(null);
      setNewHolding({
        symbol: "",
        company_name: "",
        shares: 0,
        avg_price: 0,
        current_price: 0,
        dividend_yield: 0,
        annual_dividend: 0,
        frequency: "",
        sector: ""
      });
    }
  };

  if (loading) {
    return <Skeleton className="h-64" />;
  }

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <div className="relative flex-1 max-w-sm">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
          <Input
            placeholder="Search stocks..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10"
          />
        </div>
        
        <Dialog open={isDialogOpen} onOpenChange={handleAddDialogChange}>
          <DialogTrigger asChild>
            <Button>
              <Plus className="mr-2 h-4 w-4" />
              Add Stock
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-2xl">
            <DialogHeader>
              <DialogTitle>
                {editingHolding ? 'Edit Investment Holding' : 'Add New Investment Holding'}
              </DialogTitle>
            </DialogHeader>
            <div className="space-y-4">
              <DividendHoldingForm
                holding={newHolding}
                setHolding={setNewHolding}
                isEdit={!!editingHolding}
                onSymbolChange={handleSymbolChange}
              />
              <div className="flex justify-end space-x-2">
                <Button
                  variant="outline"
                  onClick={() => handleAddDialogChange(false)}
                >
                  Cancel
                </Button>
                <Button
                  onClick={editingHolding ? handleEditHolding : handleAddHolding}
                  disabled={fetchingStockData}
                >
                  {fetchingStockData ? 'Loading...' : (editingHolding ? 'Update' : 'Add')} Holding
                </Button>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      <div className="border rounded-lg">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Symbol</TableHead>
              <TableHead>Company</TableHead>
              <TableHead>Shares</TableHead>
              <TableHead>Avg Price</TableHead>
              <TableHead>Current Price</TableHead>
              <TableHead>Market Value</TableHead>
              <TableHead>Gain/Loss</TableHead>
              <TableHead>Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredHoldings.length === 0 ? (
              <TableRow>
                <TableCell colSpan={8} className="text-center py-8 text-muted-foreground">
                  No investment holdings found. Add your first stock to get started.
                </TableCell>
              </TableRow>
            ) : (
              filteredHoldings.map((holding) => {
                const marketValue = holding.current_price * holding.shares;
                const totalCost = holding.avg_price * holding.shares;
                const gainLoss = marketValue - totalCost;
                const gainLossPercentage = totalCost > 0 ? (gainLoss / totalCost) * 100 : 0;
                const isPositive = gainLoss >= 0;

                return (
                  <TableRow key={holding.id}>
                    <TableCell className="font-medium">{holding.symbol}</TableCell>
                    <TableCell>{holding.company_name}</TableCell>
                    <TableCell>{holding.shares.toLocaleString()}</TableCell>
                    <TableCell>${holding.avg_price.toFixed(2)}</TableCell>
                    <TableCell>${holding.current_price.toFixed(2)}</TableCell>
                    <TableCell>${marketValue.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</TableCell>
                    <TableCell>
                      <div className="flex items-center space-x-2">
                        <span className={isPositive ? 'text-green-600' : 'text-red-600'}>
                          ${Math.abs(gainLoss).toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                        </span>
                        <Badge variant={isPositive ? "default" : "destructive"} className="flex items-center space-x-1">
                          {isPositive ? <TrendingUp className="w-3 h-3" /> : <TrendingDown className="w-3 h-3" />}
                          <span>{isPositive ? '+' : ''}{gainLossPercentage.toFixed(2)}%</span>
                        </Badge>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="flex space-x-2">
                        <Button 
                          variant="outline" 
                          size="sm"
                          onClick={() => handleEdit(holding)}
                        >
                          <Edit className="h-3 w-3" />
                        </Button>
                        <AlertDialog>
                          <AlertDialogTrigger asChild>
                            <Button variant="outline" size="sm">
                              <Trash2 className="h-3 w-3" />
                            </Button>
                          </AlertDialogTrigger>
                          <AlertDialogContent>
                            <AlertDialogHeader>
                              <AlertDialogTitle>Are you sure?</AlertDialogTitle>
                              <AlertDialogDescription>
                                This will permanently delete the holding for {holding.symbol}. This action cannot be undone.
                              </AlertDialogDescription>
                            </AlertDialogHeader>
                            <AlertDialogFooter>
                              <AlertDialogCancel>Cancel</AlertDialogCancel>
                              <AlertDialogAction onClick={() => handleDelete(holding.id)}>
                                Delete
                              </AlertDialogAction>
                            </AlertDialogFooter>
                          </AlertDialogContent>
                        </AlertDialog>
                      </div>
                    </TableCell>
                  </TableRow>
                );
              })
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  );
};

export default InvestmentHoldings;