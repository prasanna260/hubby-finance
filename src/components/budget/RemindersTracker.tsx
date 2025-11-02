import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import { Badge } from "@/components/ui/badge";
import { useBudgetData } from "@/hooks/useBudgetData";
import { Plus, Bell, BellOff, Mail, Phone, Send } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";

const REMINDER_TYPES = [
  "subscription",
  "bill",
  "payment", 
  "other"
];

const FREQUENCIES = [
  "daily",
  "weekly", 
  "monthly",
  "yearly"
];

const CATEGORIES = [
  "Utilities",
  "Entertainment",
  "Insurance",
  "Subscriptions",
  "Healthcare",
  "Transportation",
  "Other"
];

const RemindersTracker = () => {
  const { reminders, addReminder } = useBudgetData();
  const { toast } = useToast();
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    amount: "",
    category: "",
    reminder_type: "",
    frequency: "monthly",
    next_due_date: new Date().toISOString().split('T')[0],
    notification_days_before: "1",
    email_notifications: true,
    phone_notifications: false,
    phone_number: "",
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
    
    if (!formData.name || !formData.amount || !formData.category || !formData.reminder_type) {
      return;
    }

    await addReminder.mutateAsync({
      name: formData.name,
      amount: parseFloat(formData.amount),
      category: formData.category,
      reminder_type: formData.reminder_type,
      frequency: formData.frequency,
      next_due_date: formData.next_due_date,
      notification_days_before: parseInt(formData.notification_days_before),
      email_notifications: formData.email_notifications,
      phone_notifications: formData.phone_notifications,
      phone_number: formData.phone_number || undefined,
      description: formData.description || undefined,
    });

    setFormData({
      name: "",
      amount: "",
      category: "",
      reminder_type: "",
      frequency: "monthly",
      next_due_date: new Date().toISOString().split('T')[0],
      notification_days_before: "1",
      email_notifications: true,
      phone_notifications: false,
      phone_number: "",
      description: "",
    });
    setShowForm(false);
  };

  const getDaysUntilDue = (dueDate: string) => {
    const today = new Date();
    const due = new Date(dueDate);
    const diffTime = due.getTime() - today.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays;
  };

  const activeReminders = reminders.filter(r => r.is_active);
  const totalMonthlyReminders = activeReminders
    .filter(r => r.frequency === 'monthly')
    .reduce((sum, r) => sum + r.amount, 0);

  const sendTestNotification = async (reminder: any) => {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user?.email) {
        toast({
          title: "Authentication Required",
          description: "Please sign in to send notifications",
          variant: "destructive",
        });
        return;
      }

      const { data, error } = await supabase.functions.invoke('send-reminder-notifications', {
        body: {
          reminderName: reminder.name,
          amount: reminder.amount,
          dueDate: reminder.next_due_date,
          email: user.email,
          phoneNumber: reminder.phone_number,
          sendEmail: reminder.email_notifications,
          sendSMS: reminder.phone_notifications,
        },
      });

      if (error) throw error;

      toast({
        title: "Test Notification Sent",
        description: `Notification sent for ${reminder.name}`,
      });
    } catch (error: any) {
      toast({
        title: "Failed to Send Notification",
        description: error.message,
        variant: "destructive",
      });
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold">Reminders & Subscriptions</h2>
          <div className="flex gap-4 mt-2 text-sm text-gray-600">
            <span>Active Reminders: <strong className="text-blue-600">{activeReminders.length}</strong></span>
            <span>Monthly Total: <strong className="text-orange-600">{formatCurrency(totalMonthlyReminders)}</strong></span>
          </div>
        </div>
        <Button onClick={() => setShowForm(!showForm)} className="gap-2">
          <Plus className="h-4 w-4" />
          Add Reminder
        </Button>
      </div>

      {showForm && (
        <Card>
          <CardHeader>
            <CardTitle>Add Reminder</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="mb-4 p-3 bg-blue-50 border border-blue-200 rounded-lg">
              <p className="text-sm text-blue-800">
                <strong>📧 Email Notifications:</strong> Requires RESEND_API_KEY to be configured in Supabase secrets.
                <br />
                <strong>📱 SMS Notifications:</strong> Requires Twilio integration (not yet implemented - currently logged only).
              </p>
            </div>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="name">Name</Label>
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
                  <Label htmlFor="category">Category</Label>
                  <Select value={formData.category} onValueChange={(value) => setFormData({...formData, category: value})}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select category" />
                    </SelectTrigger>
                    <SelectContent>
                      {CATEGORIES.map((category) => (
                        <SelectItem key={category} value={category}>{category}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <Label htmlFor="reminder_type">Type</Label>
                  <Select value={formData.reminder_type} onValueChange={(value) => setFormData({...formData, reminder_type: value})}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select type" />
                    </SelectTrigger>
                    <SelectContent>
                      {REMINDER_TYPES.map((type) => (
                        <SelectItem key={type} value={type}>{type.charAt(0).toUpperCase() + type.slice(1)}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <Label htmlFor="frequency">Frequency</Label>
                  <Select value={formData.frequency} onValueChange={(value) => setFormData({...formData, frequency: value})}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {FREQUENCIES.map((freq) => (
                        <SelectItem key={freq} value={freq}>{freq.charAt(0).toUpperCase() + freq.slice(1)}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <Label htmlFor="next_due_date">Next Due Date</Label>
                  <Input
                    id="next_due_date"
                    type="date"
                    value={formData.next_due_date}
                    onChange={(e) => setFormData({...formData, next_due_date: e.target.value})}
                    required
                  />
                </div>

                <div>
                  <Label htmlFor="notification_days_before">Notify Days Before</Label>
                  <Input
                    id="notification_days_before"
                    type="number"
                    min="0"
                    max="30"
                    value={formData.notification_days_before}
                    onChange={(e) => setFormData({...formData, notification_days_before: e.target.value})}
                    required
                  />
                </div>

                <div>
                  <Label htmlFor="phone_number">Phone Number (optional)</Label>
                  <Input
                    id="phone_number"
                    type="tel"
                    value={formData.phone_number}
                    onChange={(e) => setFormData({...formData, phone_number: e.target.value})}
                    placeholder="+1234567890"
                  />
                </div>
              </div>

              <div className="space-y-3">
                <Label>Notification Preferences</Label>
                <div className="flex items-center space-x-4">
                  <div className="flex items-center space-x-2">
                    <Checkbox
                      id="email_notifications"
                      checked={formData.email_notifications}
                      onCheckedChange={(checked) => setFormData({...formData, email_notifications: checked === true})}
                    />
                    <Label htmlFor="email_notifications" className="flex items-center gap-2">
                      <Mail className="h-4 w-4" />
                      Email Notifications
                    </Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Checkbox
                      id="phone_notifications"
                      checked={formData.phone_notifications}
                      onCheckedChange={(checked) => setFormData({...formData, phone_notifications: checked === true})}
                    />
                    <Label htmlFor="phone_notifications" className="flex items-center gap-2">
                      <Phone className="h-4 w-4" />
                      SMS Notifications
                    </Label>
                  </div>
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

              <div className="flex gap-2">
                <Button type="submit" disabled={addReminder.isPending}>
                  {addReminder.isPending ? "Adding..." : "Add Reminder"}
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
          <CardTitle>Your Reminders</CardTitle>
        </CardHeader>
        <CardContent>
          {activeReminders.length === 0 ? (
            <p className="text-center text-gray-500 py-8">No reminders set up yet. Add your first reminder above.</p>
          ) : (
            <div className="space-y-4">
              {activeReminders.map((reminder) => {
                const daysUntil = getDaysUntilDue(reminder.next_due_date);
                const isOverdue = daysUntil < 0;
                const isDueSoon = daysUntil <= reminder.notification_days_before && daysUntil >= 0;
                
                return (
                  <Card key={reminder.id} className={`p-4 ${isOverdue ? 'border-red-200 bg-red-50' : isDueSoon ? 'border-yellow-200 bg-yellow-50' : ''}`}>
                    <div className="flex justify-between items-start">
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-2">
                          <h3 className="font-semibold text-lg">{reminder.name}</h3>
                          <Badge variant={isOverdue ? "destructive" : isDueSoon ? "default" : "secondary"}>
                            {reminder.reminder_type}
                          </Badge>
                          <Badge variant="outline">
                            {reminder.frequency}
                          </Badge>
                        </div>
                        
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                          <div>
                            <span className="text-gray-600">Amount</span>
                            <div className="font-semibold">{formatCurrency(reminder.amount)}</div>
                          </div>
                          <div>
                            <span className="text-gray-600">Category</span>
                            <div className="font-semibold">{reminder.category}</div>
                          </div>
                          <div>
                            <span className="text-gray-600">Next Due</span>
                            <div className="font-semibold">{new Date(reminder.next_due_date).toLocaleDateString()}</div>
                          </div>
                          <div>
                            <span className="text-gray-600">Status</span>
                            <div className={`font-semibold ${isOverdue ? 'text-red-600' : isDueSoon ? 'text-yellow-600' : 'text-green-600'}`}>
                              {isOverdue ? `${Math.abs(daysUntil)} days overdue` : 
                               isDueSoon ? `Due in ${daysUntil} days` : 
                               `${daysUntil} days remaining`}
                            </div>
                          </div>
                        </div>

                        {reminder.description && (
                          <p className="text-sm text-gray-600 mt-2">{reminder.description}</p>
                        )}
                      </div>
                      
                      <div className="flex items-center gap-2 ml-4">
                        {reminder.email_notifications && <Mail className="h-4 w-4 text-blue-500" />}
                        {reminder.phone_notifications && <Phone className="h-4 w-4 text-green-500" />}
                        {reminder.is_active ? 
                          <Bell className="h-4 w-4 text-orange-500" /> : 
                          <BellOff className="h-4 w-4 text-gray-400" />
                        }
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => sendTestNotification(reminder)}
                          className="gap-1"
                        >
                          <Send className="h-3 w-3" />
                          Test
                        </Button>
                      </div>
                    </div>
                  </Card>
                );
              })}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default RemindersTracker;