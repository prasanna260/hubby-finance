
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Edit, Trash2, GraduationCap, User, Home, Car, CreditCard, AlertTriangle } from "lucide-react";
import { NetWorthLiability } from "@/hooks/useNetWorthData";
import LiabilityForm from "./LiabilityForm";

const LIABILITY_ICONS = {
  student_loans: GraduationCap,
  personal_loans: User,
  mortgages: Home,
  car_loans: Car,
  credit_cards: CreditCard,
  other_debts: AlertTriangle,
};

const LIABILITY_LABELS = {
  student_loans: 'Student Loans',
  personal_loans: 'Personal Loans',
  mortgages: 'Mortgages',
  car_loans: 'Car Loans',
  credit_cards: 'Credit Cards',
  other_debts: 'Other Debts',
};

interface LiabilitiesListProps {
  liabilities: NetWorthLiability[];
  onUpdate: (id: string, updates: Partial<NetWorthLiability>) => void;
  onDelete: (id: string) => void;
}

const LiabilitiesList = ({ liabilities, onUpdate, onDelete }: LiabilitiesListProps) => {
  const [editingLiability, setEditingLiability] = useState<NetWorthLiability | null>(null);

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(amount);
  };

  const groupedLiabilities = liabilities.reduce((acc, liability) => {
    if (!acc[liability.category]) {
      acc[liability.category] = [];
    }
    acc[liability.category].push(liability);
    return acc;
  }, {} as Record<string, NetWorthLiability[]>);

  return (
    <div className="space-y-6">
      {Object.entries(groupedLiabilities).map(([category, categoryLiabilities]) => {
        const IconComponent = LIABILITY_ICONS[category as keyof typeof LIABILITY_ICONS];
        const categoryTotal = categoryLiabilities.reduce((sum, liability) => sum + liability.value, 0);

        return (
          <Card key={category}>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <IconComponent className="w-5 h-5 text-red-600" />
                {LIABILITY_LABELS[category as keyof typeof LIABILITY_LABELS]}
                <Badge variant="destructive" className="ml-auto">
                  -{formatCurrency(categoryTotal)}
                </Badge>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {categoryLiabilities.map((liability) => (
                  <div key={liability.id} className="flex items-center justify-between p-3 bg-red-50 rounded-lg">
                    <div className="flex-1">
                      <div className="font-medium">{liability.name}</div>
                      {liability.description && (
                        <div className="text-sm text-gray-600">{liability.description}</div>
                      )}
                    </div>
                    <div className="flex items-center gap-3">
                      <div className="font-bold text-red-600">
                        -{formatCurrency(liability.value)}
                      </div>
                      <div className="flex gap-1">
                        <Button
                          size="sm"
                          variant="ghost"
                          onClick={() => setEditingLiability(liability)}
                        >
                          <Edit className="w-4 h-4" />
                        </Button>
                        <Button
                          size="sm"
                          variant="ghost"
                          onClick={() => onDelete(liability.id)}
                        >
                          <Trash2 className="w-4 h-4" />
                        </Button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        );
      })}

      {editingLiability && (
        <LiabilityForm
          editLiability={editingLiability}
          onEdit={onUpdate}
          onClose={() => setEditingLiability(null)}
          onAdd={() => {}} // Not used in edit mode
        />
      )}
    </div>
  );
};

export default LiabilitiesList;
