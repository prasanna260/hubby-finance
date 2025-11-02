import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Switch } from '@/components/ui/switch';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Badge } from '@/components/ui/badge';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import { 
  Bell, 
  Mail, 
  Phone, 
  Calendar, 
  Trash2, 
  Edit2, 
  Save,
  X,
  Clock,
  DollarSign,
  AlertCircle,
  CheckCircle2,
  Send
} from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';
import { useAuth } from '@/hooks/useAuth';
import { format } from 'date-fns';

interface Reminder {
  id: string;
  name: string;
  category: string;
  reminder_type: string;
  amount: number;
  next_due_date: string;
  frequency: string;
  notification_days_before: number;
  email_notifications: boolean;
  phone_notifications: boolean;
  phone_number?: string;
  is_active: boolean;
  description?: string;
}

const Reminders = () => {
  const navigate = useNavigate();
  const { user, loading: authLoading } = useAuth();
  const [reminders, setReminders] = useState<Reminder[]>([]);
  const [loading, setLoading] = useState(true);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [formData, setFormData] = useState<Partial<Reminder>>({
    email_notifications: true,
    phone_notifications: false,
    notification_days_before: 1,
    is_active: true
  });
  const [showNewForm, setShowNewForm] = useState(false);
  const [sendingTestNotification, setSendingTestNotification] = useState<string | null>(null);

  useEffect(() => {
    if (!authLoading && !user) {
      navigate('/login');
    } else if (user) {
      fetchReminders();
      checkAndSendTodayReminders();
    }
  }, [user, authLoading, navigate]);

  const fetchReminders = async () => {
    try {
      setLoading(true);
      const { data, error } = await supabase
        .from('budget_reminders')
        .select('*')
        .eq('user_id', user?.id)
        .order('next_due_date', { ascending: true });

      if (error) throw error;
      setReminders(data || []);
    } catch (error: any) {
      toast.error('Failed to fetch reminders: ' + error.message);
    } finally {
      setLoading(false);
    }
  };

  const checkAndSendTodayReminders = async () => {
    try {
      const today = new Date();
      const { data: todayReminders, error } = await supabase
        .from('budget_reminders')
        .select('*')
        .eq('user_id', user?.id)
        .eq('is_active', true)
        .lte('next_due_date', today.toISOString().split('T')[0]);

      if (error) throw error;

      if (todayReminders && todayReminders.length > 0) {
        for (const reminder of todayReminders) {
          await sendNotification(reminder, true);
        }
        toast.success(`Sent ${todayReminders.length} reminder(s) for today`);
      }
    } catch (error: any) {
      console.error('Error checking today reminders:', error);
    }
  };

  const sendNotification = async (reminder: Reminder, isAutomatic = false) => {
    try {
      const { data: { session } } = await supabase.auth.getSession();
      
      const response = await supabase.functions.invoke('send-reminder-notifications', {
        body: {
          reminderName: reminder.name,
          amount: reminder.amount,
          dueDate: reminder.next_due_date,
          email: session?.user?.email,
          phoneNumber: reminder.phone_number,
          sendEmail: reminder.email_notifications,
          sendSMS: reminder.phone_notifications
        }
      });

      if (response.error) throw response.error;
      
      if (!isAutomatic) {
        toast.success('Test notification sent successfully!');
      }

      // Update next due date if it's a recurring reminder
      if (reminder.frequency !== 'once') {
        await updateNextDueDate(reminder);
      }
    } catch (error: any) {
      if (!isAutomatic) {
        toast.error('Failed to send notification: ' + error.message);
      }
      console.error('Notification error:', error);
    }
  };

  const updateNextDueDate = async (reminder: Reminder) => {
    const currentDate = new Date(reminder.next_due_date);
    let nextDate = new Date(currentDate);

    switch (reminder.frequency) {
      case 'daily':
        nextDate.setDate(nextDate.getDate() + 1);
        break;
      case 'weekly':
        nextDate.setDate(nextDate.getDate() + 7);
        break;
      case 'monthly':
        nextDate.setMonth(nextDate.getMonth() + 1);
        break;
      case 'yearly':
        nextDate.setFullYear(nextDate.getFullYear() + 1);
        break;
    }

    await supabase
      .from('budget_reminders')
      .update({ next_due_date: nextDate.toISOString().split('T')[0] })
      .eq('id', reminder.id);
  };

  const handleSave = async () => {
    try {
      if (editingId) {
        const { error } = await supabase
          .from('budget_reminders')
          .update(formData)
          .eq('id', editingId);
        
        if (error) throw error;
        toast.success('Reminder updated successfully');
        setEditingId(null);
      } else {
        const { error } = await supabase
          .from('budget_reminders')
          .insert({
            ...formData,
            user_id: user?.id,
            name: formData.name || '',
            category: formData.category || '',
            reminder_type: formData.reminder_type || 'payment',
            frequency: formData.frequency || 'monthly',
            next_due_date: formData.next_due_date || new Date().toISOString().split('T')[0],
            amount: formData.amount || 0
          } as any);
        
        if (error) throw error;
        toast.success('Reminder created successfully');
        setShowNewForm(false);
      }
      
      setFormData({
        email_notifications: true,
        phone_notifications: false,
        notification_days_before: 1,
        is_active: true
      });
      fetchReminders();
    } catch (error: any) {
      toast.error('Failed to save reminder: ' + error.message);
    }
  };

  const handleDelete = async (id: string) => {
    try {
      const { error } = await supabase
        .from('budget_reminders')
        .delete()
        .eq('id', id);
      
      if (error) throw error;
      toast.success('Reminder deleted successfully');
      fetchReminders();
    } catch (error: any) {
      toast.error('Failed to delete reminder: ' + error.message);
    }
  };

  const handleEdit = (reminder: Reminder) => {
    setFormData(reminder);
    setEditingId(reminder.id);
    setShowNewForm(false);
  };

  const handleSendTestNotification = async (reminder: Reminder) => {
    setSendingTestNotification(reminder.id);
    await sendNotification(reminder);
    setSendingTestNotification(null);
  };

  const getDaysUntilDue = (dueDate: string) => {
    const today = new Date();
    const due = new Date(dueDate);
    const diffTime = due.getTime() - today.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays;
  };

  const getStatusBadge = (reminder: Reminder) => {
    const daysUntil = getDaysUntilDue(reminder.next_due_date);
    
    if (!reminder.is_active) {
      return <Badge variant="secondary">Inactive</Badge>;
    }
    if (daysUntil < 0) {
      return <Badge variant="destructive">Overdue</Badge>;
    }
    if (daysUntil === 0) {
      return <Badge className="bg-orange-500">Due Today</Badge>;
    }
    if (daysUntil <= 3) {
      return <Badge className="bg-yellow-500 text-white">Due Soon</Badge>;
    }
    return <Badge className="bg-green-500 text-white">Active</Badge>;
  };

  if (authLoading || loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-pulse">Loading reminders...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8 max-w-6xl">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Payment Reminders</h1>
        <p className="text-gray-600">Manage your automatic email and SMS payment reminders</p>
      </div>

      {/* Quick Actions */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
        <Card>
          <CardContent className="flex items-center justify-between p-6">
            <div>
              <p className="text-sm text-gray-600">Active Reminders</p>
              <p className="text-2xl font-bold">{reminders.filter(r => r.is_active).length}</p>
            </div>
            <Bell className="h-8 w-8 text-blue-500" />
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="flex items-center justify-between p-6">
            <div>
              <p className="text-sm text-gray-600">Due Today</p>
              <p className="text-2xl font-bold">
                {reminders.filter(r => getDaysUntilDue(r.next_due_date) === 0).length}
              </p>
            </div>
            <Calendar className="h-8 w-8 text-orange-500" />
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="flex items-center justify-between p-6">
            <div>
              <p className="text-sm text-gray-600">Overdue</p>
              <p className="text-2xl font-bold">
                {reminders.filter(r => getDaysUntilDue(r.next_due_date) < 0).length}
              </p>
            </div>
            <AlertCircle className="h-8 w-8 text-red-500" />
          </CardContent>
        </Card>
      </div>

      {/* Tabs */}
      <Tabs defaultValue="all" className="mb-8">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="all">All Reminders</TabsTrigger>
          <TabsTrigger value="upcoming">Upcoming</TabsTrigger>
          <TabsTrigger value="overdue">Overdue</TabsTrigger>
        </TabsList>

        <TabsContent value="all">
          <RemindersList 
            reminders={reminders}
            onEdit={handleEdit}
            onDelete={handleDelete}
            onSendTest={handleSendTestNotification}
            sendingTestNotification={sendingTestNotification}
            getStatusBadge={getStatusBadge}
          />
        </TabsContent>

        <TabsContent value="upcoming">
          <RemindersList 
            reminders={reminders.filter(r => getDaysUntilDue(r.next_due_date) >= 0)}
            onEdit={handleEdit}
            onDelete={handleDelete}
            onSendTest={handleSendTestNotification}
            sendingTestNotification={sendingTestNotification}
            getStatusBadge={getStatusBadge}
          />
        </TabsContent>

        <TabsContent value="overdue">
          <RemindersList 
            reminders={reminders.filter(r => getDaysUntilDue(r.next_due_date) < 0)}
            onEdit={handleEdit}
            onDelete={handleDelete}
            onSendTest={handleSendTestNotification}
            sendingTestNotification={sendingTestNotification}
            getStatusBadge={getStatusBadge}
          />
        </TabsContent>
      </Tabs>

      {/* Add/Edit Form */}
      {(showNewForm || editingId) && (
        <Card className="mb-8">
          <CardHeader>
            <CardTitle>{editingId ? 'Edit Reminder' : 'Create New Reminder'}</CardTitle>
          </CardHeader>
          <CardContent>
            <ReminderForm
              formData={formData}
              setFormData={setFormData}
              onSave={handleSave}
              onCancel={() => {
                setShowNewForm(false);
                setEditingId(null);
                setFormData({
                  email_notifications: true,
                  phone_notifications: false,
                  notification_days_before: 1,
                  is_active: true
                });
              }}
            />
          </CardContent>
        </Card>
      )}

      {/* Add Button */}
      {!showNewForm && !editingId && (
        <Button 
          onClick={() => setShowNewForm(true)}
          size="lg"
          className="fixed bottom-8 right-8 shadow-lg"
        >
          <Bell className="mr-2 h-5 w-5" />
          Add Reminder
        </Button>
      )}
      </div>
    </div>
  );
};

// Reminders List Component
const RemindersList = ({ 
  reminders, 
  onEdit, 
  onDelete, 
  onSendTest,
  sendingTestNotification,
  getStatusBadge 
}: any) => {
  if (reminders.length === 0) {
    return (
      <Alert>
        <AlertCircle className="h-4 w-4" />
        <AlertDescription>
          No reminders found. Create your first reminder to get started.
        </AlertDescription>
      </Alert>
    );
  }

  return (
    <div className="grid gap-4">
      {reminders.map((reminder: Reminder) => (
        <Card key={reminder.id}>
          <CardContent className="p-6">
            <div className="flex items-start justify-between">
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-2">
                  <h3 className="text-lg font-semibold">{reminder.name}</h3>
                  {getStatusBadge(reminder)}
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm text-gray-600">
                  <div className="flex items-center gap-2">
                    <DollarSign className="h-4 w-4" />
                    <span>${reminder.amount.toFixed(2)}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Calendar className="h-4 w-4" />
                    <span>Due: {format(new Date(reminder.next_due_date), 'MMM dd, yyyy')}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Clock className="h-4 w-4" />
                    <span className="capitalize">{reminder.frequency}</span>
                  </div>
                </div>

                <div className="flex items-center gap-4 mt-3">
                  {reminder.email_notifications && (
                    <Badge variant="outline" className="text-xs">
                      <Mail className="h-3 w-3 mr-1" />
                      Email
                    </Badge>
                  )}
                  {reminder.phone_notifications && (
                    <Badge variant="outline" className="text-xs">
                      <Phone className="h-3 w-3 mr-1" />
                      SMS
                    </Badge>
                  )}
                </div>

                {reminder.description && (
                  <p className="text-sm text-gray-500 mt-2">{reminder.description}</p>
                )}
              </div>

              <div className="flex items-center gap-2">
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => onSendTest(reminder)}
                        disabled={sendingTestNotification === reminder.id}
                      >
                        <Send className="h-4 w-4" />
                      </Button>
                    </TooltipTrigger>
                    <TooltipContent>
                      <p>Send test notification</p>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
                
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => onEdit(reminder)}
                      >
                        <Edit2 className="h-4 w-4" />
                      </Button>
                    </TooltipTrigger>
                    <TooltipContent>
                      <p>Edit reminder</p>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
                
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => onDelete(reminder.id)}
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </TooltipTrigger>
                    <TooltipContent>
                      <p>Delete reminder</p>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
              </div>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};

// Reminder Form Component
const ReminderForm = ({ formData, setFormData, onSave, onCancel }: any) => {
  return (
    <div className="space-y-4">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <Label htmlFor="name">Reminder Name</Label>
          <Input
            id="name"
            value={formData.name || ''}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            placeholder="e.g., Rent Payment"
          />
        </div>
        
        <div>
          <Label htmlFor="category">Category</Label>
          <Select
            value={formData.category || ''}
            onValueChange={(value) => setFormData({ ...formData, category: value })}
          >
            <SelectTrigger>
              <SelectValue placeholder="Select category" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="rent">Rent</SelectItem>
              <SelectItem value="utilities">Utilities</SelectItem>
              <SelectItem value="insurance">Insurance</SelectItem>
              <SelectItem value="loan">Loan</SelectItem>
              <SelectItem value="subscription">Subscription</SelectItem>
              <SelectItem value="other">Other</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <Label htmlFor="amount">Amount</Label>
          <Input
            id="amount"
            type="number"
            value={formData.amount || ''}
            onChange={(e) => setFormData({ ...formData, amount: parseFloat(e.target.value) })}
            placeholder="0.00"
          />
        </div>
        
        <div>
          <Label htmlFor="next_due_date">Next Due Date</Label>
          <Input
            id="next_due_date"
            type="date"
            value={formData.next_due_date || ''}
            onChange={(e) => setFormData({ ...formData, next_due_date: e.target.value })}
          />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <Label htmlFor="frequency">Frequency</Label>
          <Select
            value={formData.frequency || ''}
            onValueChange={(value) => setFormData({ ...formData, frequency: value })}
          >
            <SelectTrigger>
              <SelectValue placeholder="Select frequency" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="once">Once</SelectItem>
              <SelectItem value="daily">Daily</SelectItem>
              <SelectItem value="weekly">Weekly</SelectItem>
              <SelectItem value="monthly">Monthly</SelectItem>
              <SelectItem value="yearly">Yearly</SelectItem>
            </SelectContent>
          </Select>
        </div>
        
        <div>
          <Label htmlFor="reminder_type">Reminder Type</Label>
          <Select
            value={formData.reminder_type || ''}
            onValueChange={(value) => setFormData({ ...formData, reminder_type: value })}
          >
            <SelectTrigger>
              <SelectValue placeholder="Select type" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="payment">Payment</SelectItem>
              <SelectItem value="bill">Bill</SelectItem>
              <SelectItem value="subscription">Subscription</SelectItem>
              <SelectItem value="deadline">Deadline</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      <div>
        <Label htmlFor="notification_days_before">Notify Days Before Due</Label>
        <Input
          id="notification_days_before"
          type="number"
          value={formData.notification_days_before || 1}
          onChange={(e) => setFormData({ ...formData, notification_days_before: parseInt(e.target.value) })}
          min="0"
          max="30"
        />
      </div>

      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <Label htmlFor="email_notifications" className="flex items-center gap-2">
            <Mail className="h-4 w-4" />
            Email Notifications
          </Label>
          <Switch
            id="email_notifications"
            checked={formData.email_notifications || false}
            onCheckedChange={(checked) => setFormData({ ...formData, email_notifications: checked })}
          />
        </div>

        <div className="flex items-center justify-between">
          <Label htmlFor="phone_notifications" className="flex items-center gap-2">
            <Phone className="h-4 w-4" />
            SMS Notifications
          </Label>
          <Switch
            id="phone_notifications"
            checked={formData.phone_notifications || false}
            onCheckedChange={(checked) => setFormData({ ...formData, phone_notifications: checked })}
          />
        </div>

        {formData.phone_notifications && (
          <div>
            <Label htmlFor="phone_number">Phone Number</Label>
            <Input
              id="phone_number"
              type="tel"
              value={formData.phone_number || ''}
              onChange={(e) => setFormData({ ...formData, phone_number: e.target.value })}
              placeholder="+1234567890"
            />
          </div>
        )}

        <div className="flex items-center justify-between">
          <Label htmlFor="is_active" className="flex items-center gap-2">
            <CheckCircle2 className="h-4 w-4" />
            Active
          </Label>
          <Switch
            id="is_active"
            checked={formData.is_active !== false}
            onCheckedChange={(checked) => setFormData({ ...formData, is_active: checked })}
          />
        </div>
      </div>

      <div>
        <Label htmlFor="description">Description (Optional)</Label>
        <Input
          id="description"
          value={formData.description || ''}
          onChange={(e) => setFormData({ ...formData, description: e.target.value })}
          placeholder="Additional notes..."
        />
      </div>

      <div className="flex justify-end gap-2 pt-4">
        <Button variant="outline" onClick={onCancel}>
          <X className="h-4 w-4 mr-2" />
          Cancel
        </Button>
        <Button onClick={onSave}>
          <Save className="h-4 w-4 mr-2" />
          Save Reminder
        </Button>
      </div>
    </div>
  );
};

export default Reminders;