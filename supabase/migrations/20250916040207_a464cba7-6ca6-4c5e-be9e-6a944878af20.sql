-- Create newsletter_subscribers table
CREATE TABLE IF NOT EXISTS public.newsletter_subscribers (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  email TEXT NOT NULL UNIQUE,
  subscribed BOOLEAN DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable RLS
ALTER TABLE public.newsletter_subscribers ENABLE ROW LEVEL SECURITY;

-- Create policies
CREATE POLICY "Admin users can manage subscribers" 
ON public.newsletter_subscribers 
FOR ALL 
USING (auth.jwt() ->> 'email' = 'palemraj@hotmail.com');

-- Create newsletter_logs table
CREATE TABLE IF NOT EXISTS public.newsletter_logs (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  sent_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  recipients_count INTEGER DEFAULT 0,
  status TEXT NOT NULL,
  error_message TEXT,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable RLS
ALTER TABLE public.newsletter_logs ENABLE ROW LEVEL SECURITY;

-- Create policies for logs
CREATE POLICY "Admin users can view logs" 
ON public.newsletter_logs 
FOR SELECT 
USING (auth.jwt() ->> 'email' = 'palemraj@hotmail.com');

-- Insert the logged-in user as a subscriber (if they're authenticated)
INSERT INTO public.newsletter_subscribers (email)
VALUES ('palemraj@hotmail.com')
ON CONFLICT (email) DO NOTHING;