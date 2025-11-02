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

const INCOME_CATEGORIES = [
  "Salary",
  "Side Jobs",
  "Rental Income",
  "Passive Income",
  "Dividends",
  "Interest",
  "Business",
  "Other"
];

const IncomeTracker = () => {
  const { income, addIncome } = useBudgetData();
  const { assets } = useNetWorthData();
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({
    source_name: "",
    amount: "",
    category: "",
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
    
    if (!formData.source_name || !formData.amount || !formData.category) {
      return;
    }

    await addIncome.mutateAsync({
      source_name: formData.source_name,
      amount: parseFloat(formData.amount),
      category: formData.category,
      date: formData.date,
      description: formData.description || undefined,
      is_recurring: formData.is_recurring,
      account_id: formData.account_id || undefined,
    });

    setFormData({
      source_name: "",
      amount: "",
      category: "",
      date: new Date().toISOString().split('T')[0],
      description: "",
      is_recurring: false,
      account_id: "",
    });
    setShowForm(false);
  };

  const totalMonthlyIncome = income.reduce((sum, item) => sum + item.amount, 0);
  const recurringIncome = income.filter(item => item.is_recurring).reduce((sum, item) => sum + item.amount, 0);

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold">Income Tracker</h2>
          <div className="flex gap-4 mt-2 text-sm text-gray-600">
            <span>Total Income: <strong className="text-green-600">{formatCurrency(totalMonthlyIncome)}</strong></span>
            <span>Recurring: <strong className="text-blue-600">{formatCurrency(recurringIncome)}</strong></span>
          </div>
        </div>
        <Button onClick={() => setShowForm(!showForm)} className="gap-2">
          <Plus className="h-4 w-4" />
          Add Income
        </Button>
      </div>

      {showForm && (
        <Card>
          <CardHeader>
            <CardTitle>Add Income Source</CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="source_name">Income Source</Label>
                  <Input
                    id="source_name"
                    value={formData.source_name}
                    onChange={(e) => setFormData({...formData, source_name: e.target.value})}
                    placeholder="e.g., Full-time Salary"
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
                      {INCOME_CATEGORIES.map((category) => (
                        <SelectItem key={category} value={category}>{category}</SelectItem>
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
                <Label htmlFor="is_recurring">Recurring Income</Label>
              </div>

              <div className="flex gap-2">
                <Button type="submit" disabled={addIncome.isPending}>
                  {addIncome.isPending ? "Adding..." : "Add Income"}
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
          <CardTitle>Income History</CardTitle>
        </CardHeader>
        <CardContent>
          {income.length === 0 ? (
            <p className="text-center text-gray-500 py-8">No income entries yet. Add your first income source above.</p>
          ) : (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Source</TableHead>
                  <TableHead>Category</TableHead>
                  <TableHead>Account</TableHead>
                  <TableHead>Amount</TableHead>
                  <TableHead>Date</TableHead>
                  <TableHead>Type</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {income.map((item) => {
                  const linkedAccount = assets.find(asset => asset.id === item.account_id);
                  return (
                    <TableRow key={item.id}>
                      <TableCell className="font-medium">{item.source_name}</TableCell>
                      <TableCell>{item.category}</TableCell>
                      <TableCell>{linkedAccount ? linkedAccount.name : '-'}</TableCell>
                      <TableCell className="text-green-600 font-semibold">{formatCurrency(item.amount)}</TableCell>
                      <TableCell>{new Date(item.date).toLocaleDateString()}</TableCell>
                      <TableCell>
                        <span className={`px-2 py-1 rounded-full text-xs ${
                          item.is_recurring ? 'bg-blue-100 text-blue-800' : 'bg-gray-100 text-gray-800'
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

export default IncomeTracker;