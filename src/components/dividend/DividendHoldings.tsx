import { useState, useCallback } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { PlusCircle, Search, RefreshCw } from "lucide-react";
import { useAuth } from "@/hooks/useAuth";
import { useDividendHoldings, NewDividendHolding } from "@/hooks/useDividendHoldings";
import { StockDataService } from "@/services/stockDataService";
import { toast } from "sonner";
import DividendSummaryCards from "./DividendSummaryCards";
import DividendPortfolioChart from "./DividendPortfolioChart";
import DividendHoldingsTable from "./DividendHoldingsTable";
import DividendHoldingForm from "./DividendHoldingForm";
import DividendPortfolioHorizon from "./DividendPortfolioHorizon";

const DividendHoldings = () => {
  const { user } = useAuth();
  const { holdings, loading, updatingPrices, addHolding, updateHolding, deleteHolding, updateStockData } = useDividendHoldings(user);
  
  const [searchTerm, setSearchTerm] = useState("");
  const [showAddDialog, setShowAddDialog] = useState(false);
  const [showEditDialog, setShowEditDialog] = useState(false);
  const [editingHolding, setEditingHolding] = useState<any>(null);
  const [fetchingStockData, setFetchingStockData] = useState(false);
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

  const filteredHoldings = holdings.filter(holding =>
    holding.symbol.toLowerCase().includes(searchTerm.toLowerCase()) ||
    holding.company_name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Debounced function to fetch stock data
  const debouncedFetchStockData = useCallback(
    (() => {
      let timeoutId: NodeJS.Timeout;
      return (symbol: string) => {
        clearTimeout(timeoutId);
        timeoutId = setTimeout(async () => {
          if (symbol.length >= 2) {
            setFetchingStockData(true);
            try {
              console.log('Fetching stock data for symbol:', symbol);
              const stockData = await StockDataService.fetchBulkStockData([symbol]);
              
              if (stockData.quotes.length > 0) {
                const quote = stockData.quotes[0];
                const dividend = stockData.dividends[0];

                console.log('Received stock data:', { quote, dividend });

                setNewHolding(prev => ({
                  ...prev,
                  current_price: quote.price || 0,
                  dividend_yield: dividend.dividendYield || 0,
                  annual_dividend: dividend.annualDividend || 0,
                  frequency: dividend.frequency || 'Quarterly'
                }));

                toast.success("Stock data fetched successfully!");
              } else {
                toast.error("No data found for this symbol");
              }
            } catch (error) {
              console.error("Error fetching stock data:", error);
              toast.error("Failed to fetch stock data. Using default values.");
              
              // Set some default values so the form isn't completely empty
              setNewHolding(prev => ({
                ...prev,
                current_price: 0,
                dividend_yield: 0,
                annual_dividend: 0,
                frequency: 'Quarterly'
              }));
            } finally {
              setFetchingStockData(false);
            }
          }
        }, 1000); // Wait 1 second after user stops typing
      };
    })(),
    []
  );

  const handleSymbolChange = async (symbol: string) => {
    setNewHolding(prev => ({ ...prev, symbol: symbol }));
    
    if (symbol.length >= 2) {
      debouncedFetchStockData(symbol);
    }
  };

  const handleDelete = async (id: string) => {
    await deleteHolding(id);
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
    setShowEditDialog(true);
  };

  const handleAddHolding = async () => {
    if (!newHolding.symbol || !newHolding.company_name || newHolding.shares <= 0) {
      toast.error("Please fill in all required fields");
      return;
    }

    const success = await addHolding(newHolding);
    if (success) {
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
      setShowAddDialog(false);
    }
  };

  const handleEditHolding = async () => {
    if (!newHolding.symbol || !newHolding.company_name || newHolding.shares <= 0 || !editingHolding) {
      toast.error("Please fill in all required fields");
      return;
    }

    const success = await updateHolding(editingHolding.id, newHolding);
    if (success) {
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
      setShowEditDialog(false);
      setEditingHolding(null);
    }
  };

  const handleAddDialogChange = (open: boolean) => {
    setShowAddDialog(open);
    if (!open) {
      // Reset form when dialog closes
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

  if (!user) {
    return (
      <div className="text-center py-12">
        <h2 className="text-2xl font-bold mb-4">Please log in to view your dividend holdings</h2>
        <p className="text-gray-600">You need to be authenticated to manage your dividend portfolio.</p>
      </div>
    );
  }

  if (loading) {
    return (
      <div className="text-center py-12">
        <p>Loading your dividend holdings...</p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Summary Cards */}
      <DividendSummaryCards holdings={holdings} />

      {/* Portfolio Allocation Pie Chart */}
      <DividendPortfolioChart holdings={holdings} />

      {/* Holdings Table */}
      <Card>
        <CardHeader>
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div>
              <CardTitle>Dividend Holdings</CardTitle>
              <CardDescription>Manage your dividend-paying stocks</CardDescription>
            </div>
            <div className="flex gap-2">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={16} />
                <Input
                  placeholder="Search holdings..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10 w-full sm:w-64"
                />
              </div>
              <Button 
                variant="outline" 
                onClick={updateStockData}
                disabled={updatingPrices}
                className="flex items-center gap-2"
              >
                <RefreshCw size={16} className={updatingPrices ? "animate-spin" : ""} />
                {updatingPrices ? "Updating..." : "Refresh Prices"}
              </Button>
              <Dialog open={showAddDialog} onOpenChange={handleAddDialogChange}>
                <DialogTrigger asChild>
                  <Button className="bg-blue-600 hover:bg-blue-700">
                    <PlusCircle size={16} className="mr-2" />
                    Add Holding
                  </Button>
                </DialogTrigger>
                <DialogContent className="sm:max-w-[500px]">
                  <DialogHeader>
                    <DialogTitle>Add New Holding</DialogTitle>
                    <DialogDescription>
                      Enter the stock symbol and other details. Market data will be fetched automatically when you stop typing the symbol.
                      {fetchingStockData && " Fetching stock data..."}
                    </DialogDescription>
                  </DialogHeader>
                  <DividendHoldingForm 
                    holding={newHolding}
                    setHolding={setNewHolding}
                    isEdit={false}
                    onSymbolChange={handleSymbolChange}
                  />
                  <div className="flex justify-end gap-2">
                    <Button variant="outline" onClick={() => handleAddDialogChange(false)}>
                      Cancel
                    </Button>
                    <Button 
                      onClick={handleAddHolding} 
                      className="bg-blue-600 hover:bg-blue-700"
                      disabled={fetchingStockData}
                    >
                      {fetchingStockData ? "Fetching Data..." : "Add Holding"}
                    </Button>
                  </div>
                </DialogContent>
              </Dialog>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <DividendHoldingsTable 
            holdings={filteredHoldings}
            onEdit={handleEdit}
            onDelete={handleDelete}
          />
        </CardContent>
      </Card>

      {/* Portfolio Horizon */}
      <DividendPortfolioHorizon holdings={holdings} />

      {/* Edit Dialog */}
      <Dialog open={showEditDialog} onOpenChange={setShowEditDialog}>
        <DialogContent className="sm:max-w-[500px]">
          <DialogHeader>
            <DialogTitle>Edit Holding</DialogTitle>
            <DialogDescription>
              Update the details for your dividend holding.
            </DialogDescription>
          </DialogHeader>
          <DividendHoldingForm 
            holding={newHolding}
            setHolding={setNewHolding}
            isEdit={true}
          />
          <div className="flex justify-end gap-2">
            <Button variant="outline" onClick={() => setShowEditDialog(false)}>
              Cancel
            </Button>
            <Button onClick={handleEditHolding} className="bg-blue-600 hover:bg-blue-700">
              Update Holding
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default DividendHoldings;
