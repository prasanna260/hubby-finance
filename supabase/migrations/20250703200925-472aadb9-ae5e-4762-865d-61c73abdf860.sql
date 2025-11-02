
-- Create table for net worth assets
CREATE TABLE public.net_worth_assets (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID NOT NULL,
  category TEXT NOT NULL CHECK (category IN ('bank_accounts', 'stocks', '401k', 'rental_properties', 'real_estate', 'gold_precious_metals', 'cryptocurrency', 'cars_vehicles')),
  name TEXT NOT NULL,
  description TEXT,
  value NUMERIC NOT NULL DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create table for net worth liabilities
CREATE TABLE public.net_worth_liabilities (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID NOT NULL,
  category TEXT NOT NULL CHECK (category IN ('student_loans', 'personal_loans', 'mortgages', 'car_loans', 'credit_cards', 'other_debts')),
  name TEXT NOT NULL,
  description TEXT,
  value NUMERIC NOT NULL DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create table for net worth snapshots (for tracking history)
CREATE TABLE public.net_worth_snapshots (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID NOT NULL,
  total_assets NUMERIC NOT NULL DEFAULT 0,
  total_liabilities NUMERIC NOT NULL DEFAULT 0,
  net_worth NUMERIC NOT NULL DEFAULT 0,
  snapshot_date DATE NOT NULL DEFAULT CURRENT_DATE,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create table for net worth goals
CREATE TABLE public.net_worth_goals (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID NOT NULL,
  target_amount NUMERIC NOT NULL,
  target_date DATE,
  description TEXT,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Add Row Level Security (RLS) policies for assets
ALTER TABLE public.net_worth_assets ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view their own assets" 
  ON public.net_worth_assets 
  FOR SELECT 
  USING (auth.uid() = user_id);

CREATE POLICY "Users can create their own assets" 
  ON public.net_worth_assets 
  FOR INSERT 
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own assets" 
  ON public.net_worth_assets 
  FOR UPDATE 
  USING (auth.uid() = user_id);

CREATE POLICY "Users can delete their own assets" 
  ON public.net_worth_assets 
  FOR DELETE 
  USING (auth.uid() = user_id);

-- Add Row Level Security (RLS) policies for liabilities
ALTER TABLE public.net_worth_liabilities ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view their own liabilities" 
  ON public.net_worth_liabilities 
  FOR SELECT 
  USING (auth.uid() = user_id);

CREATE POLICY "Users can create their own liabilities" 
  ON public.net_worth_liabilities 
  FOR INSERT 
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own liabilities" 
  ON public.net_worth_liabilities 
  FOR UPDATE 
  USING (auth.uid() = user_id);

CREATE POLICY "Users can delete their own liabilities" 
  ON public.net_worth_liabilities 
  FOR DELETE 
  USING (auth.uid() = user_id);

-- Add Row Level Security (RLS) policies for snapshots
ALTER TABLE public.net_worth_snapshots ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view their own snapshots" 
  ON public.net_worth_snapshots 
  FOR SELECT 
  USING (auth.uid() = user_id);

CREATE POLICY "Users can create their own snapshots" 
  ON public.net_worth_snapshots 
  FOR INSERT 
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own snapshots" 
  ON public.net_worth_snapshots 
  FOR UPDATE 
  USING (auth.uid() = user_id);

CREATE POLICY "Users can delete their own snapshots" 
  ON public.net_worth_snapshots 
  FOR DELETE 
  USING (auth.uid() = user_id);

-- Add Row Level Security (RLS) policies for goals
ALTER TABLE public.net_worth_goals ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view their own goals" 
  ON public.net_worth_goals 
  FOR SELECT 
  USING (auth.uid() = user_id);

CREATE POLICY "Users can create their own goals" 
  ON public.net_worth_goals 
  FOR INSERT 
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own goals" 
  ON public.net_worth_goals 
  FOR UPDATE 
  USING (auth.uid() = user_id);

CREATE POLICY "Users can delete their own goals" 
  ON public.net_worth_goals 
  FOR DELETE 
  USING (auth.uid() = user_id);

-- Create triggers to update updated_at timestamps
CREATE OR REPLACE TRIGGER update_net_worth_assets_updated_at
  BEFORE UPDATE ON public.net_worth_assets
  FOR EACH ROW
  EXECUTE FUNCTION public.update_updated_at_column();

CREATE OR REPLACE TRIGGER update_net_worth_liabilities_updated_at
  BEFORE UPDATE ON public.net_worth_liabilities
  FOR EACH ROW
  EXECUTE FUNCTION public.update_updated_at_column();

CREATE OR REPLACE TRIGGER update_net_worth_goals_updated_at
  BEFORE UPDATE ON public.net_worth_goals
  FOR EACH ROW
  EXECUTE FUNCTION public.update_updated_at_column();

-- Create unique constraint for daily snapshots
ALTER TABLE public.net_worth_snapshots 
ADD CONSTRAINT unique_user_snapshot_date 
UNIQUE (user_id, snapshot_date);
