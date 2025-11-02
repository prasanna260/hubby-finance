import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { useNetWorthData } from "@/hooks/useNetWorthData";
import { Plus } from "lucide-react";

interface AccountSelectorProps {
  value?: string;
  onValueChange: (accountId?: string) => void;
  label?: string;
}

const ACCOUNT_CATEGORIES = [
  "bank_accounts",
  "credit_cards", 
  "401k",
  "investment_accounts",
  "real_estate",
  "vehicles",
  "other_assets"
];

const AccountSelector = ({ value, onValueChange, label = "Account" }: AccountSelectorProps) => {
  const { assets, addAsset } = useNetWorthData();
  const [showCreateDialog, setShowCreateDialog] = useState(false);
  const [newAccount, setNewAccount] = useState({
    name: "",
    category: "",
    value: ""
  });

  const handleCreateAccount = async () => {
    if (!newAccount.name || !newAccount.category || !newAccount.value) return;

    await addAsset({
      name: newAccount.name,
      category: newAccount.category,
      value: parseFloat(newAccount.value),
      description: "Created from budget tracker"
    });

    setNewAccount({ name: "", category: "", value: "" });
    setShowCreateDialog(false);
  };

  return (
    <div>
      <Label htmlFor="account">{label}</Label>
      <div className="flex gap-2">
        <Select value={value || undefined} onValueChange={onValueChange}>
          <SelectTrigger className="flex-1">
            <SelectValue placeholder="Select account (optional)" />
          </SelectTrigger>
          <SelectContent>
            {assets.map((asset) => (
              <SelectItem key={asset.id} value={asset.id}>
                {asset.name} ({asset.category})
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        
        <Dialog open={showCreateDialog} onOpenChange={setShowCreateDialog}>
          <DialogTrigger asChild>
            <Button type="button" variant="outline" size="icon">
              <Plus className="h-4 w-4" />
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Create New Account</DialogTitle>
            </DialogHeader>
            <div className="space-y-4">
              <div>
                <Label htmlFor="new-account-name">Account Name</Label>
                <Input
                  id="new-account-name"
                  value={newAccount.name}
                  onChange={(e) => setNewAccount({...newAccount, name: e.target.value})}
                  placeholder="e.g., Chase Checking"
                />
              </div>
              
              <div>
                <Label htmlFor="new-account-category">Category</Label>
                <Select 
                  value={newAccount.category} 
                  onValueChange={(value) => setNewAccount({...newAccount, category: value})}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select category" />
                  </SelectTrigger>
                  <SelectContent>
                    {ACCOUNT_CATEGORIES.map((category) => (
                      <SelectItem key={category} value={category}>
                        {category.replace(/_/g, ' ').replace(/\b\w/g, l => l.toUpperCase())}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              
              <div>
                <Label htmlFor="new-account-value">Current Balance</Label>
                <Input
                  id="new-account-value"
                  type="number"
                  step="0.01"
                  value={newAccount.value}
                  onChange={(e) => setNewAccount({...newAccount, value: e.target.value})}
                  placeholder="0.00"
                />
              </div>
              
              <div className="flex gap-2">
                <Button onClick={handleCreateAccount} className="flex-1">
                  Create Account
                </Button>
                <Button 
                  type="button" 
                  variant="outline" 
                  onClick={() => setShowCreateDialog(false)}
                >
                  Cancel
                </Button>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      </div>
    </div>
  );
};

export default AccountSelector;