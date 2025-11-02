
import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Building, MapPin, Receipt, TrendingUp, Wallet, Edit2, Trash2, ExternalLink } from "lucide-react";
import { Separator } from "@/components/ui/separator";
import { useRealEstateData } from "@/hooks/useRealEstateData";
import PropertyForm from "@/components/realestate/PropertyForm";
import { useToast } from "@/hooks/use-toast";

const RealEstate = () => {
  const { 
    properties, 
    loading, 
    addProperty, 
    updateProperty, 
    deleteProperty,
    totalPortfolioValue,
    totalMonthlyRental,
    totalYearlyExpenses
  } = useRealEstateData();
  
  const [showForm, setShowForm] = useState(false);
  const [editingProperty, setEditingProperty] = useState(null);
  const { toast } = useToast();

  const handleAddProperty = async (propertyData) => {
    try {
      await addProperty(propertyData);
      toast({ title: "Property added successfully!" });
      setShowForm(false);
    } catch (error) {
      toast({ 
        title: "Error adding property", 
        description: "Please try again.",
        variant: "destructive" 
      });
    }
  };

  const handleEditProperty = async (id, updates) => {
    try {
      await updateProperty(id, updates);
      toast({ title: "Property updated successfully!" });
      setEditingProperty(null);
      setShowForm(false);
    } catch (error) {
      toast({ 
        title: "Error updating property", 
        description: "Please try again.",
        variant: "destructive" 
      });
    }
  };

  const handleDeleteProperty = async (id) => {
    if (window.confirm("Are you sure you want to delete this property?")) {
      try {
        await deleteProperty(id);
        toast({ title: "Property deleted successfully!" });
      } catch (error) {
        toast({ 
          title: "Error deleting property", 
          description: "Please try again.",
          variant: "destructive" 
        });
      }
    }
  };

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(amount);
  };

  const cashOnCashReturn = totalPortfolioValue > 0 
    ? ((totalMonthlyRental * 12 - totalYearlyExpenses) / totalPortfolioValue * 100).toFixed(1)
    : 0;

  // Portfolio metrics
  const metrics = [
    {
      title: "Total Portfolio Value",
      value: formatCurrency(totalPortfolioValue),
      icon: <Building className="h-6 w-6 text-primary" />,
      change: `${properties.length} properties`
    },
    {
      title: "Monthly Rental Income",
      value: formatCurrency(totalMonthlyRental),
      icon: <Receipt className="h-6 w-6 text-emerald-600" />,
      change: `${formatCurrency(totalMonthlyRental * 12)} annually`
    },
    {
      title: "Cash on Cash Return",
      value: `${cashOnCashReturn}%`,
      icon: <TrendingUp className="h-6 w-6 text-blue-600" />,
      change: "Based on net income"
    },
    {
      title: "Annual Expenses",
      value: formatCurrency(totalYearlyExpenses),
      icon: <Wallet className="h-6 w-6 text-red-600" />,
      change: `${formatCurrency(totalYearlyExpenses / 12)} monthly`
    }
  ];

  if (loading) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="animate-pulse space-y-4">
          <div className="h-8 bg-gray-200 rounded w-1/4"></div>
          <div className="h-4 bg-gray-200 rounded w-1/2"></div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {[...Array(4)].map((_, i) => (
              <div key={i} className="h-32 bg-gray-200 rounded"></div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Hero section */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-foreground mb-2">
          Real Estate Portfolio
        </h1>
        <p className="text-muted-foreground max-w-3xl mb-6">
          Track and manage your property investments, analyze performance, and optimize your real estate strategy.
        </p>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {metrics.map((metric, index) => (
            <Card key={index} className="border">
              <CardHeader className="pb-2">
                <div className="flex justify-between items-center">
                  <h3 className="text-sm font-medium text-muted-foreground">{metric.title}</h3>
                  {metric.icon}
                </div>
              </CardHeader>
              <CardContent>
                <div className="flex flex-col">
                  <span className="text-2xl font-bold text-foreground">{metric.value}</span>
                  <span className="text-sm text-muted-foreground">{metric.change}</span>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      {/* Properties section */}
      <div className="mb-8">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold text-foreground">Your Properties</h2>
          <Button onClick={() => setShowForm(true)}>
            <MapPin className="mr-2 h-4 w-4" />
            Add Property
          </Button>
        </div>
        
        {properties.length === 0 ? (
          <Card className="text-center py-8">
            <CardContent>
              <Building className="mx-auto h-12 w-12 text-muted-foreground mb-4" />
              <h3 className="text-lg font-medium text-foreground mb-2">No Properties Yet</h3>
              <p className="text-muted-foreground mb-4">
                Start building your real estate portfolio by adding your first property.
              </p>
              <Button onClick={() => setShowForm(true)}>
                <MapPin className="mr-2 h-4 w-4" />
                Add Your First Property
              </Button>
            </CardContent>
          </Card>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {properties.map((property) => (
              <Card key={property.id} className="overflow-hidden hover:shadow-lg transition-shadow duration-300 bg-accent/50">
                <CardHeader className="pb-2">
                  <CardTitle className="text-lg">{property.address}</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Purchase Price:</span>
                      <span className="font-medium">{formatCurrency(property.purchase_price)}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Current Value:</span>
                      <span className="font-medium">{formatCurrency(property.current_price)}</span>
                    </div>
                    {property.rental_monthly > 0 && (
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Monthly Rent:</span>
                        <span className="font-medium">{formatCurrency(property.rental_monthly)}</span>
                      </div>
                    )}
                    {property.county && (
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">County:</span>
                        <span className="font-medium">{property.county}</span>
                      </div>
                    )}
                    
                    <Separator className="my-3" />
                    
                    <div className="flex space-x-2 pt-2">
                      <Button 
                        variant="outline" 
                        size="sm" 
                        className="flex-1"
                        onClick={() => {
                          setEditingProperty(property);
                          setShowForm(true);
                        }}
                      >
                        <Edit2 className="mr-1 h-3 w-3" />
                        Edit
                      </Button>
                      <Button 
                        variant="outline" 
                        size="sm" 
                        className="flex-1"
                        onClick={() => handleDeleteProperty(property.id)}
                      >
                        <Trash2 className="mr-1 h-3 w-3" />
                        Delete
                      </Button>
                    </div>
                    
                    {/* Quick links */}
                    <div className="flex flex-wrap gap-2 pt-2">
                      {property.county_website && (
                        <Button 
                          variant="external" 
                          size="sm" 
                          onClick={() => window.open(property.county_website, '_blank')}
                        >
                          <ExternalLink className="mr-1 h-3 w-3" />
                          County
                        </Button>
                      )}
                      {property.hoa_website && (
                        <Button 
                          variant="external" 
                          size="sm" 
                          onClick={() => window.open(property.hoa_website, '_blank')}
                        >
                          <ExternalLink className="mr-1 h-3 w-3" />
                          HOA
                        </Button>
                      )}
                      {property.insurance_website && (
                        <Button 
                          variant="external" 
                          size="sm" 
                          onClick={() => window.open(property.insurance_website, '_blank')}
                        >
                          <ExternalLink className="mr-1 h-3 w-3" />
                          Insurance
                        </Button>
                      )}
                      {property.loan_company_website && (
                        <Button 
                          variant="external" 
                          size="sm" 
                          onClick={() => window.open(property.loan_company_website, '_blank')}
                        >
                          <ExternalLink className="mr-1 h-3 w-3" />
                          Mortgage
                        </Button>
                      )}
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </div>

      <PropertyForm
        open={showForm}
        onClose={() => {
          setShowForm(false);
          setEditingProperty(null);
        }}
        onSubmit={handleAddProperty}
        editProperty={editingProperty}
        onEdit={handleEditProperty}
      />
    </div>
  );
};

export default RealEstate;
