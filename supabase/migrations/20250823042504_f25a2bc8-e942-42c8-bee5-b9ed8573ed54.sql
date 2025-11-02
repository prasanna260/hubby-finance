-- Create real estate properties table
CREATE TABLE public.real_estate_properties (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID NOT NULL,
  
  -- Property Information
  address TEXT NOT NULL,
  purchase_price NUMERIC NOT NULL DEFAULT 0,
  current_price NUMERIC NOT NULL DEFAULT 0,
  county TEXT,
  county_website TEXT,
  
  -- Mortgage Details
  loan_company TEXT,
  loan_number TEXT,
  interest_rate NUMERIC DEFAULT 0,
  monthly_pmi NUMERIC DEFAULT 0,
  property_tax_yearly NUMERIC DEFAULT 0,
  
  -- HOA Details
  hoa_amount NUMERIC DEFAULT 0,
  hoa_frequency TEXT DEFAULT 'monthly', -- 'monthly' or 'yearly'
  hoa_phone TEXT,
  hoa_website TEXT,
  
  -- Insurance Details
  insurance_yearly NUMERIC DEFAULT 0,
  insurance_company TEXT,
  insurance_website TEXT,
  
  -- Rental Details (optional)
  rental_monthly NUMERIC DEFAULT 0,
  lease_term TEXT,
  property_mgmt_name TEXT,
  property_mgmt_phone TEXT,
  property_mgmt_email TEXT,
  
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable Row Level Security
ALTER TABLE public.real_estate_properties ENABLE ROW LEVEL SECURITY;

-- Create policies for user access
CREATE POLICY "Users can view their own properties" 
ON public.real_estate_properties 
FOR SELECT 
USING (auth.uid() = user_id);

CREATE POLICY "Users can create their own properties" 
ON public.real_estate_properties 
FOR INSERT 
WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own properties" 
ON public.real_estate_properties 
FOR UPDATE 
USING (auth.uid() = user_id);

CREATE POLICY "Users can delete their own properties" 
ON public.real_estate_properties 
FOR DELETE 
USING (auth.uid() = user_id);

-- Create trigger for automatic timestamp updates
CREATE TRIGGER update_real_estate_properties_updated_at
BEFORE UPDATE ON public.real_estate_properties
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();