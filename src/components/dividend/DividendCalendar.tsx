import { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Calendar, DollarSign, ArrowLeft, ArrowRight } from "lucide-react";
import { useAuth } from "@/hooks/useAuth";
import { useDividendHoldings } from "@/hooks/useDividendHoldings";

interface DividendEvent {
  id: string;
  symbol: string;
  companyName: string;
  exDate: string;
  payDate: string;
  amount: number;
  shares: number;
  totalAmount: number;
  status: "upcoming" | "received" | "announced";
}

const DividendCalendar = () => {
  const { user } = useAuth();
  const { holdings, loading } = useDividendHoldings(user);
  const [currentMonth, setCurrentMonth] = useState(new Date());
  const [dividendEvents, setDividendEvents] = useState<DividendEvent[]>([]);

  // Generate dividend events based on current holdings
  useEffect(() => {
    if (holdings.length === 0) {
      setDividendEvents([]);
      return;
    }

    const events: DividendEvent[] = [];
    const currentDate = new Date();
    
    holdings.forEach((holding) => {
      if (holding.annual_dividend > 0) {
        // Determine frequency and calculate payment amount
        let paymentsPerYear = 4; // Default to quarterly
        let frequencyText = holding.frequency.toLowerCase();
        
        if (frequencyText.includes('monthly')) {
          paymentsPerYear = 12;
        } else if (frequencyText.includes('semi') || frequencyText.includes('twice')) {
          paymentsPerYear = 2;
        } else if (frequencyText.includes('annual') || frequencyText.includes('yearly')) {
          paymentsPerYear = 1;
        }
        
        const paymentAmount = holding.annual_dividend / paymentsPerYear;
        
        // Generate only the next payment for each stock to avoid duplicates
        const nextPaymentDate = new Date(currentDate);
        nextPaymentDate.setMonth(currentDate.getMonth() + 1);
        nextPaymentDate.setDate(15); // Assume payment is 15th of next month
        
        const exDate = new Date(nextPaymentDate);
        exDate.setDate(exDate.getDate() - 14); // Ex-date is typically 2 weeks before pay date
        
        const totalAmount = paymentAmount * holding.shares;
        
        events.push({
          id: `${holding.id}-next`,
          symbol: holding.symbol,
          companyName: holding.company_name,
          exDate: exDate.toISOString().split('T')[0],
          payDate: nextPaymentDate.toISOString().split('T')[0],
          amount: paymentAmount,
          shares: holding.shares,
          totalAmount: totalAmount,
          status: nextPaymentDate > currentDate ? "upcoming" : "announced"
        });
      }
    });

    // Sort events by pay date
    events.sort((a, b) => new Date(a.payDate).getTime() - new Date(b.payDate).getTime());
    setDividendEvents(events);
  }, [holdings]);

  const getStatusColor = (status: string) => {
    switch (status) {
      case "upcoming": return "bg-blue-100 text-blue-800";
      case "received": return "bg-green-100 text-green-800";
      case "announced": return "bg-yellow-100 text-yellow-800";
      default: return "bg-gray-100 text-gray-800";
    }
  };

  const monthNames = [
    "January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"
  ];

  const navigateMonth = (direction: number) => {
    const newDate = new Date(currentMonth);
    newDate.setMonth(newDate.getMonth() + direction);
    setCurrentMonth(newDate);
  };

  const totalUpcoming = dividendEvents
    .filter(event => event.status === "upcoming")
    .reduce((sum, event) => sum + event.totalAmount, 0);

  const thisMonthCount = dividendEvents.filter(e => 
    new Date(e.payDate).getMonth() === new Date().getMonth() &&
    new Date(e.payDate).getFullYear() === new Date().getFullYear()
  ).length;

  const nextPayment = dividendEvents.find(e => 
    new Date(e.payDate) > new Date()
  );

  if (!user) {
    return (
      <div className="text-center py-12">
        <h2 className="text-2xl font-bold mb-4">Please log in to view your dividend calendar</h2>
        <p className="text-gray-600">You need to be authenticated to see your dividend schedule.</p>
      </div>
    );
  }

  if (loading) {
    return (
      <div className="text-center py-12">
        <p>Loading your dividend calendar...</p>
      </div>
    );
  }

  if (holdings.length === 0) {
    return (
      <div className="text-center py-12">
        <h2 className="text-2xl font-bold mb-4">No Holdings Found</h2>
        <p className="text-gray-600">Add some dividend holdings to see your payment calendar.</p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-gray-600">Upcoming Dividends</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-blue-600">${totalUpcoming.toFixed(2)}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-gray-600">This Month</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-600">{thisMonthCount}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-gray-600">Next Payment</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-lg font-bold text-purple-600">
              {nextPayment ? new Date(nextPayment.payDate).toLocaleDateString() : "N/A"}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Calendar View */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="flex items-center gap-2">
                <Calendar size={20} />
                Dividend Calendar
              </CardTitle>
              <CardDescription>Upcoming dividend payments from your holdings</CardDescription>
            </div>
            <div className="flex items-center gap-2">
              <Button variant="outline" size="sm" onClick={() => navigateMonth(-1)}>
                <ArrowLeft size={16} />
              </Button>
              <span className="font-medium px-4">
                {monthNames[currentMonth.getMonth()]} {currentMonth.getFullYear()}
              </span>
              <Button variant="outline" size="sm" onClick={() => navigateMonth(1)}>
                <ArrowRight size={16} />
              </Button>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {dividendEvents.length === 0 ? (
              <div className="text-center py-8">
                <p className="text-gray-500">No dividend payments scheduled for your current holdings.</p>
              </div>
            ) : (
              dividendEvents.map((event) => (
                <div key={event.id} className="border rounded-lg p-4 hover:bg-gray-50 transition-colors">
                  <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        <span className="font-bold text-lg">{event.symbol}</span>
                        <Badge className={getStatusColor(event.status)}>
                          {event.status}
                        </Badge>
                      </div>
                      <p className="text-gray-600 mb-2">{event.companyName}</p>
                      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 text-sm">
                        <div>
                          <span className="text-gray-500">Ex-Date:</span>
                          <p className="font-medium">{new Date(event.exDate).toLocaleDateString()}</p>
                        </div>
                        <div>
                          <span className="text-gray-500">Pay Date:</span>
                          <p className="font-medium">{new Date(event.payDate).toLocaleDateString()}</p>
                        </div>
                        <div>
                          <span className="text-gray-500">Per Share:</span>
                          <p className="font-medium">${event.amount.toFixed(2)}</p>
                        </div>
                        <div>
                          <span className="text-gray-500">Shares:</span>
                          <p className="font-medium">{event.shares}</p>
                        </div>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="flex items-center gap-1 text-green-600 font-bold text-xl">
                        <DollarSign size={20} />
                        {event.totalAmount.toFixed(2)}
                      </div>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default DividendCalendar;
