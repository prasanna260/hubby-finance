-- Add account_id column to budget_income table to link with net_worth_assets
ALTER TABLE budget_income ADD COLUMN account_id uuid REFERENCES net_worth_assets(id) ON DELETE SET NULL;

-- Add account_id column to budget_expenses table to link with net_worth_assets  
ALTER TABLE budget_expenses ADD COLUMN account_id uuid REFERENCES net_worth_assets(id) ON DELETE SET NULL;