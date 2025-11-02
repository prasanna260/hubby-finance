-- Create reminders/subscriptions table
CREATE TABLE public.budget_reminders (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID NOT NULL,
  name TEXT NOT NULL,
  amount NUMERIC NOT NULL DEFAULT 0,
  category TEXT NOT NULL,
  reminder_type TEXT NOT NULL CHECK (reminder_type IN ('subscription', 'bill', 'payment', 'other')),
  frequency TEXT NOT NULL CHECK (frequency IN ('daily', 'weekly', 'monthly', 'yearly')),
  next_due_date DATE NOT NULL,
  notification_days_before INTEGER NOT NULL DEFAULT 1,
  email_notifications BOOLEAN DEFAULT true,
  phone_notifications BOOLEAN DEFAULT false,
  phone_number TEXT,
  description TEXT,
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable Row Level Security
ALTER TABLE public.budget_reminders ENABLE ROW LEVEL SECURITY;

-- Create RLS policies for budget_reminders
CREATE POLICY "Users can view their own reminders" 
ON public.budget_reminders FOR SELECT 
USING (auth.uid() = user_id);

CREATE POLICY "Users can create their own reminders" 
ON public.budget_reminders FOR INSERT 
WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own reminders" 
ON public.budget_reminders FOR UPDATE 
USING (auth.uid() = user_id);

CREATE POLICY "Users can delete their own reminders" 
ON public.budget_reminders FOR DELETE 
USING (auth.uid() = user_id);

-- Create trigger for automatic timestamp updates
CREATE TRIGGER update_budget_reminders_updated_at
BEFORE UPDATE ON public.budget_reminders
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();