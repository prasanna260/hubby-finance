import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import BudgetSummary from "@/components/budget/BudgetSummary";
import IncomeTracker from "@/components/budget/IncomeTracker";
import ExpenseTracker from "@/components/budget/ExpenseTracker";
import PaymentsTracker from "@/components/budget/PaymentsTracker";
import LoansTracker from "@/components/budget/LoansTracker";
import RemindersTracker from "@/components/budget/RemindersTracker";

const Budget = () => {
  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Budget Tracker</h1>
        <p className="text-gray-600">Track your income, expenses, payments, and loans all in one place</p>
      </div>

      <BudgetSummary />

      <Tabs defaultValue="income" className="mt-8">
        <TabsList className="grid w-full grid-cols-5">
          <TabsTrigger value="income">Income</TabsTrigger>
          <TabsTrigger value="expenses">Expenses</TabsTrigger>
          <TabsTrigger value="payments">Payments</TabsTrigger>
          <TabsTrigger value="loans">Loans</TabsTrigger>
          <TabsTrigger value="reminders">Reminders</TabsTrigger>
        </TabsList>
        
        <TabsContent value="income" className="mt-6">
          <IncomeTracker />
        </TabsContent>
        
        <TabsContent value="expenses" className="mt-6">
          <ExpenseTracker />
        </TabsContent>
        
        <TabsContent value="payments" className="mt-6">
          <PaymentsTracker />
        </TabsContent>
        
        <TabsContent value="loans" className="mt-6">
          <LoansTracker />
        </TabsContent>
        
        <TabsContent value="reminders" className="mt-6">
          <RemindersTracker />
        </TabsContent>
      </Tabs>
      </div>
    </div>
  );
};

export default Budget;