
import { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { PlusCircle, TrendingUp, Calendar, DollarSign, PieChart, LogOut, BarChart3 } from "lucide-react";
import DividendHoldings from "@/components/dividend/DividendHoldings";
import DividendCalendar from "@/components/dividend/DividendCalendar";
import DividendIncome from "@/components/dividend/DividendIncome";
import DividendAnalytics from "@/components/dividend/DividendAnalytics";
import DividendGoals from "@/components/dividend/DividendGoals";
import DividendDashboard from "@/components/dividend/DividendDashboard";
import LoginForm from "@/components/auth/LoginForm";
import { useAuth } from "@/hooks/useAuth";
import { useDividendHoldings } from "@/hooks/useDividendHoldings";

const DividendTracker = () => {
  const [activeTab, setActiveTab] = useState("dashboard");
  const { user, loading, signOut } = useAuth();
  const { holdings } = useDividendHoldings(user);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p>Loading...</p>
      </div>
    );
  }

  if (!user) {
    return <LoginForm />;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-50">
      
      <div className="container mx-auto px-4 py-8">
        <div className="mb-8 flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 mb-2">Dividend Tracker</h1>
            <p className="text-gray-600">Track your dividend investments and income</p>
          </div>
          <Button variant="outline" onClick={signOut}>
            <LogOut size={16} className="mr-2" />
            Sign Out
          </Button>
        </div>

        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <TabsList className="grid w-full grid-cols-6 lg:w-auto lg:grid-cols-6">
            <TabsTrigger value="dashboard" className="flex items-center gap-2">
              <BarChart3 size={16} />
              <span className="hidden sm:inline">Dashboard</span>
            </TabsTrigger>
            <TabsTrigger value="holdings" className="flex items-center gap-2">
              <TrendingUp size={16} />
              <span className="hidden sm:inline">Holdings</span>
            </TabsTrigger>
            <TabsTrigger value="calendar" className="flex items-center gap-2">
              <Calendar size={16} />
              <span className="hidden sm:inline">Calendar</span>
            </TabsTrigger>
            <TabsTrigger value="income" className="flex items-center gap-2">
              <DollarSign size={16} />
              <span className="hidden sm:inline">Income</span>
            </TabsTrigger>
            <TabsTrigger value="analytics" className="flex items-center gap-2">
              <PieChart size={16} />
              <span className="hidden sm:inline">Analytics</span>
            </TabsTrigger>
            <TabsTrigger value="goals" className="flex items-center gap-2">
              <PlusCircle size={16} />
              <span className="hidden sm:inline">Goals</span>
            </TabsTrigger>
          </TabsList>

          <TabsContent value="dashboard">
            <DividendDashboard holdings={holdings} />
          </TabsContent>

          <TabsContent value="holdings">
            <DividendHoldings />
          </TabsContent>

          <TabsContent value="calendar">
            <DividendCalendar />
          </TabsContent>

          <TabsContent value="income">
            <DividendIncome />
          </TabsContent>

          <TabsContent value="analytics">
            <DividendAnalytics />
          </TabsContent>

          <TabsContent value="goals">
            <DividendGoals />
          </TabsContent>
        </Tabs>
      </div>
      
    </div>
  );
};

export default DividendTracker;
