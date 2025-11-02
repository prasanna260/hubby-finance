import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useBudgetData } from "@/hooks/useBudgetData";
import { Plus, Check } from "lucide-react";

const PAYMENT_CATEGORIES = [
  "Recurring Payments",
  "One-time Payments",
  "Subscriptions",
  "Memberships",
  "Auto-pay Bills",
  "Large Purchases",
  "Repairs",
  "Gifts"
];

const PaymentsTracker = () => {
  const { payments, addPayment } = useBudgetData();
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    amount: "",
    due_date: new Date().toISOString().split('T')[0],
    category: "",
    is_recurring: false,
    is_paid: false,
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
    
    if (!formData.name || !formData.amount || !formData.category || !formData.due_date) {
      return;
    }

    await addPayment.mutateAsync({
      name: formData.name,
      amount: parseFloat(formData.amount),
      due_date: formData.due_date,
      category: formData.category,
      is_recurring: formData.is_recurring,
      is_paid: formData.is_paid,
      description: formData.description || undefined,
    });

    setFormData({
      name: "",
      amount: "",
      due_date: new Date().toISOString().split('T')[0],
      category: "",
      is_recurring: false,
      is_paid: false,
      description: "",
    });
    setShowForm(false);
  };

  const upcomingPayments = payments.filter(p => !p.is_paid && new Date(p.due_date) >= new Date());
  const pastPayments = payments.filter(p => p.is_paid || new Date(p.due_date) < new Date());
  
  const totalUpcoming = upcomingPayments.reduce((sum, item) => sum + item.amount, 0);
  const totalPaid = payments.filter(p => p.is_paid).reduce((sum, item) => sum + item.amount, 0);

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold">Payments Tracker</h2>
          <div className="flex gap-4 mt-2 text-sm text-gray-600">
            <span>Upcoming: <strong className="text-orange-600">{formatCurrency(totalUpcoming)}</strong></span>
            <span>Paid: <strong className="text-green-600">{formatCurrency(totalPaid)}</strong></span>
          </div>
        </div>
        <Button onClick={() => setShowForm(!showForm)} className="gap-2">
          <Plus className="h-4 w-4" />
          Add Payment
        </Button>
      </div>

      {showForm && (
        <Card>
          <CardHeader>
            <CardTitle>Add Payment</CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="name">Payment Name</Label>
                  <Input
                    id="name"
                    value={formData.name}
                    onChange={(e) => setFormData({...formData, name: e.target.value})}
                    placeholder="e.g., Netflix Subscription"
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
                  <Label htmlFor="due_date">Due Date</Label>
                  <Input
                    id="due_date"
                    type="date"
                    value={formData.due_date}
                    onChange={(e) => setFormData({...formData, due_date: e.target.value})}
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
                      {PAYMENT_CATEGORIES.map((category) => (
                        <SelectItem key={category} value={category}>{category}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
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

              <div className="flex items-center space-x-4">
                <div className="flex items-center space-x-2">
                  <Switch
                    id="is_recurring"
                    checked={formData.is_recurring}
                    onCheckedChange={(checked) => setFormData({...formData, is_recurring: checked})}
                  />
                  <Label htmlFor="is_recurring">Recurring Payment</Label>
                </div>

                <div className="flex items-center space-x-2">
                  <Switch
                    id="is_paid"
                    checked={formData.is_paid}
                    onCheckedChange={(checked) => setFormData({...formData, is_paid: checked})}
                  />
                  <Label htmlFor="is_paid">Already Paid</Label>
                </div>
              </div>

              <div className="flex gap-2">
                <Button type="submit" disabled={addPayment.isPending}>
                  {addPayment.isPending ? "Adding..." : "Add Payment"}
                </Button>
                <Button type="button" variant="outline" onClick={() => setShowForm(false)}>
                  Cancel
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      )}

      <Tabs defaultValue="upcoming" className="w-full">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="upcoming">Upcoming ({upcomingPayments.length})</TabsTrigger>
          <TabsTrigger value="past">Past/Paid ({pastPayments.length})</TabsTrigger>
        </TabsList>
        
        <TabsContent value="upcoming">
          <Card>
            <CardHeader>
              <CardTitle>Upcoming Payments</CardTitle>
            </CardHeader>
            <CardContent>
              {upcomingPayments.length === 0 ? (
                <p className="text-center text-gray-500 py-8">No upcoming payments scheduled.</p>
              ) : (
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Name</TableHead>
                      <TableHead>Category</TableHead>
                      <TableHead>Amount</TableHead>
                      <TableHead>Due Date</TableHead>
                      <TableHead>Type</TableHead>
                      <TableHead>Action</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {upcomingPayments.map((payment) => (
                      <TableRow key={payment.id}>
                        <TableCell className="font-medium">{payment.name}</TableCell>
                        <TableCell>{payment.category}</TableCell>
                        <TableCell className="text-orange-600 font-semibold">{formatCurrency(payment.amount)}</TableCell>
                        <TableCell>{new Date(payment.due_date).toLocaleDateString()}</TableCell>
                        <TableCell>
                          <span className={`px-2 py-1 rounded-full text-xs ${
                            payment.is_recurring ? 'bg-blue-100 text-blue-800' : 'bg-gray-100 text-gray-800'
                          }`}>
                            {payment.is_recurring ? 'Recurring' : 'One-time'}
                          </span>
                        </TableCell>
                        <TableCell>
                          <Button size="sm" variant="outline" className="gap-1">
                            <Check className="h-3 w-3" />
                            Mark Paid
                          </Button>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              )}
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="past">
          <Card>
            <CardHeader>
              <CardTitle>Past & Paid Payments</CardTitle>
            </CardHeader>
            <CardContent>
              {pastPayments.length === 0 ? (
                <p className="text-center text-gray-500 py-8">No past payments recorded.</p>
              ) : (
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Name</TableHead>
                      <TableHead>Category</TableHead>
                      <TableHead>Amount</TableHead>
                      <TableHead>Due Date</TableHead>
                      <TableHead>Status</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {pastPayments.map((payment) => (
                      <TableRow key={payment.id}>
                        <TableCell className="font-medium">{payment.name}</TableCell>
                        <TableCell>{payment.category}</TableCell>
                        <TableCell className="font-semibold">{formatCurrency(payment.amount)}</TableCell>
                        <TableCell>{new Date(payment.due_date).toLocaleDateString()}</TableCell>
                        <TableCell>
                          <span className={`px-2 py-1 rounded-full text-xs ${
                            payment.is_paid ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                          }`}>
                            {payment.is_paid ? 'Paid' : 'Overdue'}
                          </span>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              )}
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default PaymentsTracker;