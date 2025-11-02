-- Add loan_company_website column to real_estate_properties table
ALTER TABLE public.real_estate_properties
ADD COLUMN loan_company_website TEXT;