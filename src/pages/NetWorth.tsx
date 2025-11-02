
import { useState } from "react";

import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useNetWorthData } from "@/hooks/useNetWorthData";
import { useAuth } from "@/hooks/useAuth";
import NetWorthSummary from "@/components/networth/NetWorthSummary";
import AssetForm from "@/components/networth/AssetForm";
import LiabilityForm from "@/components/networth/LiabilityForm";
import AssetsList from "@/components/networth/AssetsList";
import LiabilitiesList from "@/components/networth/LiabilitiesList";
import NetWorthCharts from "@/components/networth/NetWorthCharts";
import { Camera, Download } from "lucide-react";
import { toast } from "@/hooks/use-toast";

const NetWorth = () => {
  const { user, loading: authLoading } = useAuth();
  const {
    assets,
    liabilities,
    snapshots,
    loading,
    totalAssets,
    totalLiabilities,
    netWorth,
    addAsset,
    updateAsset,
    deleteAsset,
    addLiability,
    updateLiability,
    deleteLiability,
    createSnapshot,
    refetch,
  } = useNetWorthData();

  if (authLoading || loading) {
    return (
      <div className="min-h-screen bg-background">
        <div className="flex items-center justify-center h-64">
          <div className="text-center">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-navy-600 mx-auto mb-4"></div>
            <p>Loading your net worth data...</p>
          </div>
        </div>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="min-h-screen bg-background">
        <div className="container mx-auto px-4 py-8">
          <div className="text-center">
            <h1 className="text-3xl font-bold text-navy-900 mb-4">Net Worth Tracker</h1>
            <p className="text-lg text-gray-600 mb-8">Please log in to track your net worth.</p>
          </div>
        </div>
      </div>
    );
  }

  const handleExport = () => {
    // Simple CSV export functionality
    const csvData = [
      ['Type', 'Category', 'Name', 'Value', 'Description'],
      ...assets.map(asset => ['Asset', asset.category, asset.name, asset.value, asset.description || '']),
      ...liabilities.map(liability => ['Liability', liability.category, liability.name, liability.value, liability.description || '']),
    ];
    
    const csvContent = csvData.map(row => row.join(',')).join('\n');
    const blob = new Blob([csvContent], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `net-worth-${new Date().toISOString().split('T')[0]}.csv`;
    a.click();
    window.URL.revokeObjectURL(url);
    
    toast({
      title: "Export successful",
      description: "Your net worth data has been exported to CSV.",
    });
  };

  return (
    <div className="min-h-screen bg-background">
      
      
      <div className="container mx-auto px-4 py-8">
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold text-navy-900 mb-2">Net Worth Tracker</h1>
            <p className="text-lg text-gray-600">Track and visualize your financial health</p>
          </div>
          
          <div className="flex gap-3">
            <Button onClick={createSnapshot} variant="outline">
              <Camera className="w-4 h-4 mr-2" />
              Take Snapshot
            </Button>
            <Button onClick={handleExport} variant="outline">
              <Download className="w-4 h-4 mr-2" />
              Export Data
            </Button>
          </div>
        </div>

        <NetWorthSummary 
          totalAssets={totalAssets}
          totalLiabilities={totalLiabilities}
          netWorth={netWorth}
        />

        <div className="mb-8">
          <NetWorthCharts 
            snapshots={snapshots}
            assets={assets}
            liabilities={liabilities}
          />
        </div>

        <Tabs defaultValue="overview" className="w-full">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="assets">Assets</TabsTrigger>
            <TabsTrigger value="liabilities">Liabilities</TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <div>
                <div className="flex justify-between items-center mb-4">
                  <h2 className="text-xl font-semibold">Recent Assets</h2>
                  <AssetForm onAdd={addAsset} />
                </div>
                {assets.length > 0 ? (
                  <div className="space-y-3">
                    {assets.slice(0, 5).map((asset) => (
                      <div key={asset.id} className="flex justify-between items-center p-3 bg-green-50 rounded-lg">
                        <div>
                          <div className="font-medium">{asset.name}</div>
                          <div className="text-sm text-gray-600">{asset.category.replace('_', ' ')}</div>
                        </div>
                        <div className="font-bold text-green-600">
                          ${asset.value.toLocaleString()}
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-8 text-gray-500">
                    <p>No assets added yet</p>
                    <p className="text-sm">Click "Add Asset" to get started</p>
                  </div>
                )}
              </div>

              <div>
                <div className="flex justify-between items-center mb-4">
                  <h2 className="text-xl font-semibold">Recent Liabilities</h2>
                  <LiabilityForm onAdd={addLiability} />
                </div>
                {liabilities.length > 0 ? (
                  <div className="space-y-3">
                    {liabilities.slice(0, 5).map((liability) => (
                      <div key={liability.id} className="flex justify-between items-center p-3 bg-red-50 rounded-lg">
                        <div>
                          <div className="font-medium">{liability.name}</div>
                          <div className="text-sm text-gray-600">{liability.category.replace('_', ' ')}</div>
                        </div>
                        <div className="font-bold text-red-600">
                          -${liability.value.toLocaleString()}
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-8 text-gray-500">
                    <p>No liabilities added yet</p>
                    <p className="text-sm">Click "Add Liability" to get started</p>
                  </div>
                )}
              </div>
            </div>

            {/* Top Assets and Top Liabilities */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <div>
                <h2 className="text-xl font-semibold mb-4">Top Assets</h2>
                {assets.length > 0 ? (
                  <div className="space-y-3">
                    {assets
                      .sort((a, b) => b.value - a.value)
                      .slice(0, 5)
                      .map((asset) => (
                        <div key={asset.id} className="flex justify-between items-center p-3 bg-green-50 rounded-lg">
                          <div>
                            <div className="font-medium">{asset.name}</div>
                            <div className="text-sm text-gray-600">{asset.category.replace('_', ' ')}</div>
                          </div>
                          <div className="font-bold text-green-600">
                            ${asset.value.toLocaleString()}
                          </div>
                        </div>
                      ))}
                  </div>
                ) : (
                  <div className="text-center py-8 text-gray-500">
                    <p>No assets to display</p>
                  </div>
                )}
              </div>

              <div>
                <h2 className="text-xl font-semibold mb-4">Top Liabilities</h2>
                {liabilities.length > 0 ? (
                  <div className="space-y-3">
                    {liabilities
                      .sort((a, b) => b.value - a.value)
                      .slice(0, 5)
                      .map((liability) => (
                        <div key={liability.id} className="flex justify-between items-center p-3 bg-red-50 rounded-lg">
                          <div>
                            <div className="font-medium">{liability.name}</div>
                            <div className="text-sm text-gray-600">{liability.category.replace('_', ' ')}</div>
                          </div>
                          <div className="font-bold text-red-600">
                            -${liability.value.toLocaleString()}
                          </div>
                        </div>
                      ))}
                  </div>
                ) : (
                  <div className="text-center py-8 text-gray-500">
                    <p>No liabilities to display</p>
                  </div>
                )}
              </div>
            </div>
          </TabsContent>

          <TabsContent value="assets" className="space-y-6">
            <div className="flex justify-between items-center">
              <h2 className="text-2xl font-semibold">Assets</h2>
              <AssetForm onAdd={addAsset} />
            </div>
            {assets.length > 0 ? (
              <AssetsList 
                assets={assets}
                onUpdate={updateAsset}
                onDelete={deleteAsset}
              />
            ) : (
              <div className="text-center py-12">
                <p className="text-lg text-gray-500 mb-4">No assets added yet</p>
                <AssetForm onAdd={addAsset} />
              </div>
            )}
          </TabsContent>

          <TabsContent value="liabilities" className="space-y-6">
            <div className="flex justify-between items-center">
              <h2 className="text-2xl font-semibold">Liabilities</h2>
              <LiabilityForm onAdd={addLiability} />
            </div>
            {liabilities.length > 0 ? (
              <LiabilitiesList 
                liabilities={liabilities}
                onUpdate={updateLiability}
                onDelete={deleteLiability}
              />
            ) : (
              <div className="text-center py-12">
                <p className="text-lg text-gray-500 mb-4">No liabilities added yet</p>
                <LiabilityForm onAdd={addLiability} />
              </div>
            )}
          </TabsContent>

        </Tabs>
      </div>
    </div>
  );
};

export default NetWorth;
