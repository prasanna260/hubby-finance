
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Edit, Trash2, Banknote, TrendingUp, Home, Car, Coins, Bitcoin, Building, Gem } from "lucide-react";
import { NetWorthAsset } from "@/hooks/useNetWorthData";
import AssetForm from "./AssetForm";

const ASSET_ICONS = {
  bank_accounts: Banknote,
  stocks: TrendingUp,
  '401k': Building,
  rental_properties: Home,
  real_estate: Home,
  gold_precious_metals: Gem,
  cryptocurrency: Bitcoin,
  cars_vehicles: Car,
};

const ASSET_LABELS = {
  bank_accounts: 'Bank Accounts',
  stocks: 'Stocks',
  '401k': '401(k)',
  rental_properties: 'Rental Properties',
  real_estate: 'Real Estate',
  gold_precious_metals: 'Gold & Precious Metals',
  cryptocurrency: 'Cryptocurrency',
  cars_vehicles: 'Cars & Vehicles',
};

interface AssetsListProps {
  assets: NetWorthAsset[];
  onUpdate: (id: string, updates: Partial<NetWorthAsset>) => void;
  onDelete: (id: string) => void;
}

const AssetsList = ({ assets, onUpdate, onDelete }: AssetsListProps) => {
  const [editingAsset, setEditingAsset] = useState<NetWorthAsset | null>(null);

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(amount);
  };

  const groupedAssets = assets.reduce((acc, asset) => {
    if (!acc[asset.category]) {
      acc[asset.category] = [];
    }
    acc[asset.category].push(asset);
    return acc;
  }, {} as Record<string, NetWorthAsset[]>);

  return (
    <div className="space-y-6">
      {Object.entries(groupedAssets).map(([category, categoryAssets]) => {
        const IconComponent = ASSET_ICONS[category as keyof typeof ASSET_ICONS];
        const categoryTotal = categoryAssets.reduce((sum, asset) => sum + asset.value, 0);

        return (
          <Card key={category}>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <IconComponent className="w-5 h-5 text-green-600" />
                {ASSET_LABELS[category as keyof typeof ASSET_LABELS]}
                <Badge variant="secondary" className="ml-auto">
                  {formatCurrency(categoryTotal)}
                </Badge>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {categoryAssets.map((asset) => (
                  <div key={asset.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                    <div className="flex-1">
                      <div className="font-medium">{asset.name}</div>
                      {asset.description && (
                        <div className="text-sm text-gray-600">{asset.description}</div>
                      )}
                    </div>
                    <div className="flex items-center gap-3">
                      <div className="font-bold text-green-600">
                        {formatCurrency(asset.value)}
                      </div>
                      <div className="flex gap-1">
                        <Button
                          size="sm"
                          variant="ghost"
                          onClick={() => setEditingAsset(asset)}
                        >
                          <Edit className="w-4 h-4" />
                        </Button>
                        <Button
                          size="sm"
                          variant="ghost"
                          onClick={() => onDelete(asset.id)}
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

      {editingAsset && (
        <AssetForm
          editAsset={editingAsset}
          onEdit={onUpdate}
          onClose={() => setEditingAsset(null)}
          onAdd={() => {}} // Not used in edit mode
        />
      )}
    </div>
  );
};

export default AssetsList;
