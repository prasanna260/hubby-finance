
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Textarea } from "@/components/ui/textarea";
import { Plus } from "lucide-react";
import { NetWorthAsset } from "@/hooks/useNetWorthData";

const ASSET_CATEGORIES = [
  { value: 'bank_accounts', label: 'Bank Accounts' },
  { value: 'stocks', label: 'Stocks' },
  { value: '401k', label: '401(k)' },
  { value: 'rental_properties', label: 'Rental Properties' },
  { value: 'real_estate', label: 'Real Estate' },
  { value: 'gold_precious_metals', label: 'Gold & Precious Metals' },
  { value: 'cryptocurrency', label: 'Cryptocurrency' },
  { value: 'cars_vehicles', label: 'Cars & Vehicles' },
];

interface AssetFormProps {
  onAdd: (asset: Omit<NetWorthAsset, 'id' | 'created_at' | 'updated_at'>) => void;
  editAsset?: NetWorthAsset;
  onEdit?: (id: string, updates: Partial<NetWorthAsset>) => void;
  onClose?: () => void;
}

const AssetForm = ({ onAdd, editAsset, onEdit, onClose }: AssetFormProps) => {
  const [open, setOpen] = useState(false);
  const [category, setCategory] = useState(editAsset?.category || '');
  const [name, setName] = useState(editAsset?.name || '');
  const [description, setDescription] = useState(editAsset?.description || '');
  const [value, setValue] = useState(editAsset?.value?.toString() || '');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!category || !name || !value) return;

    const assetData = {
      category,
      name,
      description: description || undefined,
      value: parseFloat(value),
    };

    if (editAsset && onEdit) {
      onEdit(editAsset.id, assetData);
      onClose?.();
    } else {
      onAdd(assetData);
      setOpen(false);
    }

    // Reset form
    setCategory('');
    setName('');
    setDescription('');
    setValue('');
  };

  const handleClose = () => {
    setOpen(false);
    onClose?.();
    // Reset form
    setCategory('');
    setName('');
    setDescription('');
    setValue('');
  };

  return (
    <Dialog open={editAsset ? true : open} onOpenChange={editAsset ? handleClose : setOpen}>
      {!editAsset && (
        <DialogTrigger asChild>
          <Button>
            <Plus className="w-4 h-4 mr-2" />
            Add Asset
          </Button>
        </DialogTrigger>
      )}
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{editAsset ? 'Edit Asset' : 'Add New Asset'}</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <Label htmlFor="category">Category</Label>
            <Select value={category} onValueChange={setCategory} required>
              <SelectTrigger>
                <SelectValue placeholder="Select category" />
              </SelectTrigger>
              <SelectContent>
                {ASSET_CATEGORIES.map((cat) => (
                  <SelectItem key={cat.value} value={cat.value}>
                    {cat.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          
          <div>
            <Label htmlFor="name">Name</Label>
            <Input
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
              placeholder="e.g., Chase Checking Account"
            />
          </div>

          <div>
            <Label htmlFor="description">Description (Optional)</Label>
            <Textarea
              id="description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Additional details..."
            />
          </div>

          <div>
            <Label htmlFor="value">Value ($)</Label>
            <Input
              id="value"
              type="number"
              step="0.01"
              value={value}
              onChange={(e) => setValue(e.target.value)}
              required
              placeholder="0.00"
            />
          </div>

          <div className="flex justify-end space-x-2">
            <Button type="button" variant="outline" onClick={handleClose}>
              Cancel
            </Button>
            <Button type="submit">
              {editAsset ? 'Update' : 'Add'} Asset
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default AssetForm;
