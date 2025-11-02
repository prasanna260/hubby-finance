
-- Create dividend_holdings table to store user's dividend stock information
CREATE TABLE public.dividend_holdings (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES auth.users NOT NULL,
  symbol TEXT NOT NULL,
  company_name TEXT NOT NULL,
  shares INTEGER NOT NULL DEFAULT 0,
  avg_price DECIMAL(10,2) DEFAULT 0,
  current_price DECIMAL(10,2) DEFAULT 0,
  dividend_yield DECIMAL(5,2) DEFAULT 0,
  annual_dividend DECIMAL(8,2) DEFAULT 0,
  frequency TEXT DEFAULT '',
  sector TEXT DEFAULT '',
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Add Row Level Security (RLS) to ensure users can only see their own holdings
ALTER TABLE public.dividend_holdings ENABLE ROW LEVEL SECURITY;

-- Create policy that allows users to SELECT their own holdings
CREATE POLICY "Users can view their own dividend holdings" 
  ON public.dividend_holdings 
  FOR SELECT 
  USING (auth.uid() = user_id);

-- Create policy that allows users to INSERT their own holdings
CREATE POLICY "Users can create their own dividend holdings" 
  ON public.dividend_holdings 
  FOR INSERT 
  WITH CHECK (auth.uid() = user_id);

-- Create policy that allows users to UPDATE their own holdings
CREATE POLICY "Users can update their own dividend holdings" 
  ON public.dividend_holdings 
  FOR UPDATE 
  USING (auth.uid() = user_id);

-- Create policy that allows users to DELETE their own holdings
CREATE POLICY "Users can delete their own dividend holdings" 
  ON public.dividend_holdings 
  FOR DELETE 
  USING (auth.uid() = user_id);

-- Create an updated_at trigger
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ language 'plpgsql';

CREATE TRIGGER update_dividend_holdings_updated_at 
  BEFORE UPDATE ON public.dividend_holdings 
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
