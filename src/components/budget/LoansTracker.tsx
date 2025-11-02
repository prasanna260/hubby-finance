import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Progress } from "@/components/ui/progress";
import { useBudgetData } from "@/hooks/useBudgetData";
import { Plus } from "lucide-react";

const LOAN_TYPES = [
  "Mortgage",
  "Auto Loan",
  "Personal Loan",
  "Student Loan",
  "Credit Card",
  "Business Loan",
  "Other"
];

const LoansTracker = () => {
  const { loans, addLoan } = useBudgetData();
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({
    loan_name: "",
    original_amount: "",
    current_balance: "",
    interest_rate: "",
    monthly_payment: "",
    start_date: new Date().toISOString().split('T')[0],
    end_date: "",
    loan_type: "",
    description: "",
  });

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 2,
    }).format(value);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.loan_name || !formData.original_amount || !formData.current_balance || !formData.interest_rate || !formData.monthly_payment) {
      return;
    }

    await addLoan.mutateAsync({
      loan_name: formData.loan_name,
      original_amount: parseFloat(formData.original_amount),
      current_balance: parseFloat(formData.current_balance),
      interest_rate: parseFloat(formData.interest_rate),
      monthly_payment: parseFloat(formData.monthly_payment),
      start_date: formData.start_date,
      end_date: formData.end_date || undefined,
      loan_type: formData.loan_type || undefined,
      description: formData.description || undefined,
    });

    setFormData({
      loan_name: "",
      original_amount: "",
      current_balance: "",
      interest_rate: "",
      monthly_payment: "",
      start_date: new Date().toISOString().split('T')[0],
      end_date: "",
      loan_type: "",
      description: "",
    });
    setShowForm(false);
  };

  const totalLoansBalance = loans.reduce((sum, loan) => sum + loan.current_balance, 0);
  const totalMonthlyPayments = loans.reduce((sum, loan) => sum + loan.monthly_payment, 0);
  const totalOriginalAmount = loans.reduce((sum, loan) => sum + loan.original_amount, 0);

  const calculatePayoffProgress = (loan: any) => {
    const paidAmount = loan.original_amount - loan.current_balance;
    return (paidAmount / loan.original_amount) * 100;
  };

  const calculateMonthsRemaining = (loan: any) => {
    if (loan.monthly_payment <= 0) return 0;
    return Math.ceil(loan.current_balance / loan.monthly_payment);
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold">Loans Tracker</h2>
          <div className="flex gap-4 mt-2 text-sm text-gray-600">
            <span>Total Balance: <strong className="text-red-600">{formatCurrency(totalLoansBalance)}</strong></span>
            <span>Monthly Payments: <strong className="text-orange-600">{formatCurrency(totalMonthlyPayments)}</strong></span>
          </div>
        </div>
        <Button onClick={() => setShowForm(!showForm)} className="gap-2">
          <Plus className="h-4 w-4" />
          Add Loan
        </Button>
      </div>

      {showForm && (
        <Card>
          <CardHeader>
            <CardTitle>Add Loan</CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="loan_name">Loan Name</Label>
                  <Input
                    id="loan_name"
                    value={formData.loan_name}
                    onChange={(e) => setFormData({...formData, loan_name: e.target.value})}
                    placeholder="e.g., Home Mortgage"
                    required
                  />
                </div>

                <div>
                  <Label htmlFor="loan_type">Loan Type</Label>
                  <Select value={formData.loan_type} onValueChange={(value) => setFormData({...formData, loan_type: value})}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select loan type" />
                    </SelectTrigger>
                    <SelectContent>
                      {LOAN_TYPES.map((type) => (
                        <SelectItem key={type} value={type}>{type}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <Label htmlFor="original_amount">Original Amount</Label>
                  <Input
                    id="original_amount"
                    type="number"
                    step="0.01"
                    value={formData.original_amount}
                    onChange={(e) => setFormData({...formData, original_amount: e.target.value})}
                    placeholder="0.00"
                    required
                  />
                </div>

                <div>
                  <Label htmlFor="current_balance">Current Balance</Label>
                  <Input
                    id="current_balance"
                    type="number"
                    step="0.01"
                    value={formData.current_balance}
                    onChange={(e) => setFormData({...formData, current_balance: e.target.value})}
                    placeholder="0.00"
                    required
                  />
                </div>

                <div>
                  <Label htmlFor="interest_rate">Interest Rate (%)</Label>
                  <Input
                    id="interest_rate"
                    type="number"
                    step="0.01"
                    value={formData.interest_rate}
                    onChange={(e) => setFormData({...formData, interest_rate: e.target.value})}
                    placeholder="0.00"
                    required
                  />
                </div>

                <div>
                  <Label htmlFor="monthly_payment">Monthly Payment</Label>
                  <Input
                    id="monthly_payment"
                    type="number"
                    step="0.01"
                    value={formData.monthly_payment}
                    onChange={(e) => setFormData({...formData, monthly_payment: e.target.value})}
                    placeholder="0.00"
                    required
                  />
                </div>

                <div>
                  <Label htmlFor="start_date">Start Date</Label>
                  <Input
                    id="start_date"
                    type="date"
                    value={formData.start_date}
                    onChange={(e) => setFormData({...formData, start_date: e.target.value})}
                    required
                  />
                </div>

                <div>
                  <Label htmlFor="end_date">End Date (Optional)</Label>
                  <Input
                    id="end_date"
                    type="date"
                    value={formData.end_date}
                    onChange={(e) => setFormData({...formData, end_date: e.target.value})}
                  />
                </div>
              </div>

              <div>
                <Label htmlFor="description">Description (Optional)</Label>
                <Textarea
                  id="description"
                  value={formData.description}
                  onChange={(e) => setFormData({...formData, description: e.target.value})}
                  placeholder="Additional details about the loan..."
                />
              </div>

              <div className="flex gap-2">
                <Button type="submit" disabled={addLoan.isPending}>
                  {addLoan.isPending ? "Adding..." : "Add Loan"}
                </Button>
                <Button type="button" variant="outline" onClick={() => setShowForm(false)}>
                  Cancel
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      )}

      {/* Loan Summary Cards */}
      {loans.length > 0 && (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-gray-600">Total Debt</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-red-600">{formatCurrency(totalLoansBalance)}</div>
              <p className="text-xs text-gray-500 mt-1">Remaining balance</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-gray-600">Monthly Payments</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-orange-600">{formatCurrency(totalMonthlyPayments)}</div>
              <p className="text-xs text-gray-500 mt-1">Total per month</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-gray-600">Total Paid</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-green-600">
                {formatCurrency(totalOriginalAmount - totalLoansBalance)}
              </div>
              <p className="text-xs text-gray-500 mt-1">Amount paid off</p>
            </CardContent>
          </Card>
        </div>
      )}

      <Card>
        <CardHeader>
          <CardTitle>Loan Details</CardTitle>
        </CardHeader>
        <CardContent>
          {loans.length === 0 ? (
            <p className="text-center text-gray-500 py-8">No loans recorded yet. Add your first loan above.</p>
          ) : (
            <div className="space-y-4">
              {loans.map((loan) => (
                <Card key={loan.id} className="p-4">
                  <div className="flex justify-between items-start mb-3">
                    <div>
                      <h3 className="font-semibold text-lg">{loan.loan_name}</h3>
                      <p className="text-sm text-gray-600">{loan.loan_type}</p>
                    </div>
                    <div className="text-right">
                      <div className="text-lg font-bold text-red-600">{formatCurrency(loan.current_balance)}</div>
                      <div className="text-sm text-gray-500">of {formatCurrency(loan.original_amount)}</div>
                    </div>
                  </div>
                  
                  <div className="mb-3">
                    <div className="flex justify-between text-sm text-gray-600 mb-1">
                      <span>Progress</span>
                      <span>{calculatePayoffProgress(loan).toFixed(1)}% paid off</span>
                    </div>
                    <Progress value={calculatePayoffProgress(loan)} className="h-2" />
                  </div>

                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                    <div>
                      <span className="text-gray-600">Interest Rate</span>
                      <div className="font-semibold">{loan.interest_rate}%</div>
                    </div>
                    <div>
                      <span className="text-gray-600">Monthly Payment</span>
                      <div className="font-semibold">{formatCurrency(loan.monthly_payment)}</div>
                    </div>
                    <div>
                      <span className="text-gray-600">Est. Months Left</span>
                      <div className="font-semibold">{calculateMonthsRemaining(loan)}</div>
                    </div>
                    <div>
                      <span className="text-gray-600">Start Date</span>
                      <div className="font-semibold">{new Date(loan.start_date).toLocaleDateString()}</div>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default LoansTracker;