
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Textarea } from "@/components/ui/textarea";
import { Plus } from "lucide-react";
import { NetWorthLiability } from "@/hooks/useNetWorthData";

const LIABILITY_CATEGORIES = [
  { value: 'student_loans', label: 'Student Loans' },
  { value: 'personal_loans', label: 'Personal Loans' },
  { value: 'mortgages', label: 'Mortgages' },
  { value: 'car_loans', label: 'Car Loans' },
  { value: 'credit_cards', label: 'Credit Cards' },
  { value: 'other_debts', label: 'Other Debts' },
];

interface LiabilityFormProps {
  onAdd: (liability: Omit<NetWorthLiability, 'id' | 'created_at' | 'updated_at'>) => void;
  editLiability?: NetWorthLiability;
  onEdit?: (id: string, updates: Partial<NetWorthLiability>) => void;
  onClose?: () => void;
}

const LiabilityForm = ({ onAdd, editLiability, onEdit, onClose }: LiabilityFormProps) => {
  const [open, setOpen] = useState(false);
  const [category, setCategory] = useState(editLiability?.category || '');
  const [name, setName] = useState(editLiability?.name || '');
  const [description, setDescription] = useState(editLiability?.description || '');
  const [value, setValue] = useState(editLiability?.value?.toString() || '');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!category || !name || !value) return;

    const liabilityData = {
      category,
      name,
      description: description || undefined,
      value: parseFloat(value),
    };

    if (editLiability && onEdit) {
      onEdit(editLiability.id, liabilityData);
      onClose?.();
    } else {
      onAdd(liabilityData);
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
    <Dialog open={editLiability ? true : open} onOpenChange={editLiability ? handleClose : setOpen}>
      {!editLiability && (
        <DialogTrigger asChild>
          <Button variant="outline">
            <Plus className="w-4 h-4 mr-2" />
            Add Liability
          </Button>
        </DialogTrigger>
      )}
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{editLiability ? 'Edit Liability' : 'Add New Liability'}</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <Label htmlFor="category">Category</Label>
            <Select value={category} onValueChange={setCategory} required>
              <SelectTrigger>
                <SelectValue placeholder="Select category" />
              </SelectTrigger>
              <SelectContent>
                {LIABILITY_CATEGORIES.map((cat) => (
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
              placeholder="e.g., Chase Credit Card"
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
              {editLiability ? 'Update' : 'Add'} Liability
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default LiabilityForm;
