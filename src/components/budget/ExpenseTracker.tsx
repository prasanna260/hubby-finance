import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { useBudgetData } from "@/hooks/useBudgetData";
import { useNetWorthData } from "@/hooks/useNetWorthData";
import AccountSelector from "./AccountSelector";
import { Plus } from "lucide-react";

const EXPENSE_CATEGORIES = {
  "Fixed Expenses": ["Mortgage", "Rent", "Insurance", "Car Payment"],
  "Variable Expenses": ["Groceries", "Utilities", "Transportation", "Gas"],
  "Discretionary Expenses": ["Entertainment", "Dining Out", "Travel", "Shopping"]
};

const EXPENSE_TAGS = [
  "Shopping",
  "Eating", 
  "Entertainment",
  "Self-improvement",
  "Miscellaneous"
];

const ExpenseTracker = () => {
  const { expenses, addExpense } = useBudgetData();
  const { assets } = useNetWorthData();
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    amount: "",
    category: "",
    sub_category: "",
    date: new Date().toISOString().split('T')[0],
    description: "",
    is_recurring: false,
    account_id: "",
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
    
    if (!formData.name || !formData.amount || !formData.category) {
      return;
    }

    await addExpense.mutateAsync({
      name: formData.name,
      amount: parseFloat(formData.amount),
      category: formData.category,
      sub_category: formData.sub_category || undefined,
      date: formData.date,
      description: formData.description || undefined,
      is_recurring: formData.is_recurring,
      account_id: formData.account_id || undefined,
    });

    setFormData({
      name: "",
      amount: "",
      category: "",
      sub_category: "",
      date: new Date().toISOString().split('T')[0],
      description: "",
      is_recurring: false,
      account_id: "",
    });
    setShowForm(false);
  };

  const totalExpenses = expenses.reduce((sum, item) => sum + item.amount, 0);
  const recurringExpenses = expenses.filter(item => item.is_recurring).reduce((sum, item) => sum + item.amount, 0);

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold">Expense Tracker</h2>
          <div className="flex gap-4 mt-2 text-sm text-gray-600">
            <span>Total Expenses: <strong className="text-red-600">{formatCurrency(totalExpenses)}</strong></span>
            <span>Recurring: <strong className="text-orange-600">{formatCurrency(recurringExpenses)}</strong></span>
          </div>
        </div>
        <Button onClick={() => setShowForm(!showForm)} className="gap-2">
          <Plus className="h-4 w-4" />
          Add Expense
        </Button>
      </div>

      {showForm && (
        <Card>
          <CardHeader>
            <CardTitle>Add Expense</CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="name">Expense Name</Label>
                  <Input
                    id="name"
                    value={formData.name}
                    onChange={(e) => setFormData({...formData, name: e.target.value})}
                    placeholder="e.g., Grocery Shopping"
                    required
                  />
                </div>

                <div>
                  <Label htmlFor="amount">Amount</Label>
                  <Input
                    id="amount"
                    type="number"
                    step="0.01"
                    value={formData.amount}
                    onChange={(e) => setFormData({...formData, amount: e.target.value})}
                    placeholder="0.00"
                    required
                  />
                </div>

                <div>
                  <Label htmlFor="category">Category</Label>
                  <Select value={formData.category} onValueChange={(value) => setFormData({...formData, category: value})}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select category" />
                    </SelectTrigger>
                    <SelectContent>
                      {Object.keys(EXPENSE_CATEGORIES).map((category) => (
                        <SelectItem key={category} value={category}>{category}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <Label htmlFor="sub_category">Sub-Category (Tag)</Label>
                  <Select value={formData.sub_category} onValueChange={(value) => setFormData({...formData, sub_category: value})}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select tag" />
                    </SelectTrigger>
                    <SelectContent>
                      {EXPENSE_TAGS.map((tag) => (
                        <SelectItem key={tag} value={tag}>{tag}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <Label htmlFor="date">Date</Label>
                  <Input
                    id="date"
                    type="date"
                    value={formData.date}
                    onChange={(e) => setFormData({...formData, date: e.target.value})}
                    required
                  />
                </div>

                <div className="md:col-span-2">
                  <AccountSelector
                    value={formData.account_id}
                    onValueChange={(accountId) => setFormData({...formData, account_id: accountId || ""})}
                    label="Link to Account (Optional)"
                  />
                </div>
              </div>

              <div>
                <Label htmlFor="description">Description (Optional)</Label>
                <Textarea
                  id="description"
                  value={formData.description}
                  onChange={(e) => setFormData({...formData, description: e.target.value})}
                  placeholder="Additional details..."
                />
              </div>

              <div className="flex items-center space-x-2">
                <Switch
                  id="is_recurring"
                  checked={formData.is_recurring}
                  onCheckedChange={(checked) => setFormData({...formData, is_recurring: checked})}
                />
                <Label htmlFor="is_recurring">Recurring Expense</Label>
              </div>

              <div className="flex gap-2">
                <Button type="submit" disabled={addExpense.isPending}>
                  {addExpense.isPending ? "Adding..." : "Add Expense"}
                </Button>
                <Button type="button" variant="outline" onClick={() => setShowForm(false)}>
                  Cancel
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      )}

      <Card>
        <CardHeader>
          <CardTitle>Expense History</CardTitle>
        </CardHeader>
        <CardContent>
          {expenses.length === 0 ? (
            <p className="text-center text-gray-500 py-8">No expenses recorded yet. Add your first expense above.</p>
          ) : (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Name</TableHead>
                  <TableHead>Category</TableHead>
                  <TableHead>Tag</TableHead>
                  <TableHead>Account</TableHead>
                  <TableHead>Amount</TableHead>
                  <TableHead>Date</TableHead>
                  <TableHead>Type</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {expenses.map((item) => {
                  const linkedAccount = assets.find(asset => asset.id === item.account_id);
                  return (
                    <TableRow key={item.id}>
                      <TableCell className="font-medium">{item.name}</TableCell>
                      <TableCell>{item.category}</TableCell>
                      <TableCell>{item.sub_category || '-'}</TableCell>
                      <TableCell>{linkedAccount ? linkedAccount.name : '-'}</TableCell>
                      <TableCell className="text-red-600 font-semibold">{formatCurrency(item.amount)}</TableCell>
                      <TableCell>{new Date(item.date).toLocaleDateString()}</TableCell>
                      <TableCell>
                        <span className={`px-2 py-1 rounded-full text-xs ${
                          item.is_recurring ? 'bg-orange-100 text-orange-800' : 'bg-gray-100 text-gray-800'
                        }`}>
                          {item.is_recurring ? 'Recurring' : 'One-time'}
                        </span>
                      </TableCell>
                    </TableRow>
                  );
                })}
              </TableBody>
            </Table>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default ExpenseTracker;