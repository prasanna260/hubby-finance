import React, { useState, useEffect } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { RealEstateProperty } from "@/hooks/useRealEstateData";

interface PropertyFormProps {
  open: boolean;
  onClose: () => void;
  onSubmit: (property: Omit<RealEstateProperty, 'id' | 'user_id' | 'created_at' | 'updated_at'>) => Promise<void>;
  editProperty?: RealEstateProperty;
  onEdit?: (id: string, updates: Partial<RealEstateProperty>) => Promise<void>;
}

const PropertyForm: React.FC<PropertyFormProps> = ({ 
  open, 
  onClose, 
  onSubmit, 
  editProperty, 
  onEdit 
}) => {
  const [formData, setFormData] = useState({
    // Property Information
    address: '',
    purchase_price: 0,
    current_price: 0,
    county: '',
    county_website: '',
    // Mortgage Details
    loan_company: '',
    loan_number: '',
    loan_company_website: '',
    interest_rate: 0,
    monthly_pmi: 0,
    property_tax_yearly: 0,
    // HOA Details
    hoa_amount: 0,
    hoa_frequency: 'monthly' as 'monthly' | '3 months' | '4 months' | 'yearly',
    hoa_phone: '',
    hoa_website: '',
    // Insurance Details
    insurance_yearly: 0,
    insurance_company: '',
    insurance_website: '',
    // Rental Details
    rental_monthly: 0,
    lease_term: '',
    property_mgmt_name: '',
    property_mgmt_phone: '',
    property_mgmt_email: '',
  });

  useEffect(() => {
    if (editProperty) {
      setFormData({
        address: editProperty.address,
        purchase_price: editProperty.purchase_price,
        current_price: editProperty.current_price,
        county: editProperty.county || '',
        county_website: editProperty.county_website || '',
        loan_company: editProperty.loan_company || '',
        loan_number: editProperty.loan_number || '',
        loan_company_website: editProperty.loan_company_website || '',
        interest_rate: editProperty.interest_rate || 0,
        monthly_pmi: editProperty.monthly_pmi || 0,
        property_tax_yearly: editProperty.property_tax_yearly || 0,
        hoa_amount: editProperty.hoa_amount || 0,
        hoa_frequency: editProperty.hoa_frequency || 'monthly',
        hoa_phone: editProperty.hoa_phone || '',
        hoa_website: editProperty.hoa_website || '',
        insurance_yearly: editProperty.insurance_yearly || 0,
        insurance_company: editProperty.insurance_company || '',
        insurance_website: editProperty.insurance_website || '',
        rental_monthly: editProperty.rental_monthly || 0,
        lease_term: editProperty.lease_term || '',
        property_mgmt_name: editProperty.property_mgmt_name || '',
        property_mgmt_phone: editProperty.property_mgmt_phone || '',
        property_mgmt_email: editProperty.property_mgmt_email || '',
      });
    } else {
      setFormData({
        address: '',
        purchase_price: 0,
        current_price: 0,
        county: '',
        county_website: '',
        loan_company: '',
        loan_number: '',
        loan_company_website: '',
        interest_rate: 0,
        monthly_pmi: 0,
        property_tax_yearly: 0,
        hoa_amount: 0,
        hoa_frequency: 'monthly',
        hoa_phone: '',
        hoa_website: '',
        insurance_yearly: 0,
        insurance_company: '',
        insurance_website: '',
        rental_monthly: 0,
        lease_term: '',
        property_mgmt_name: '',
        property_mgmt_phone: '',
        property_mgmt_email: '',
      });
    }
  }, [editProperty, open]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    try {
      if (editProperty && onEdit) {
        await onEdit(editProperty.id, formData);
      } else {
        await onSubmit(formData);
      }
      onClose();
    } catch (error) {
      console.error('Error saving property:', error);
    }
  };

  const handleChange = (field: string, value: any) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>
            {editProperty ? 'Edit Property' : 'Add New Property'}
          </DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit}>
          <Tabs defaultValue="property" className="w-full">
            <TabsList className="grid w-full grid-cols-5">
              <TabsTrigger value="property">Property</TabsTrigger>
              <TabsTrigger value="mortgage">Mortgage</TabsTrigger>
              <TabsTrigger value="hoa">HOA</TabsTrigger>
              <TabsTrigger value="insurance">Insurance</TabsTrigger>
              <TabsTrigger value="rental">Rental</TabsTrigger>
            </TabsList>

            <TabsContent value="property" className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle>Property Information</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <Label htmlFor="address">Home Address *</Label>
                    <Input
                      id="address"
                      value={formData.address}
                      onChange={(e) => handleChange('address', e.target.value)}
                      required
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="purchase_price">Purchase Price *</Label>
                      <Input
                        id="purchase_price"
                        type="number"
                        step="0.01"
                        value={formData.purchase_price}
                        onChange={(e) => handleChange('purchase_price', parseFloat(e.target.value) || 0)}
                        required
                      />
                    </div>
                    <div>
                      <Label htmlFor="current_price">Current Price *</Label>
                      <Input
                        id="current_price"
                        type="number"
                        step="0.01"
                        value={formData.current_price}
                        onChange={(e) => handleChange('current_price', parseFloat(e.target.value) || 0)}
                        required
                      />
                    </div>
                  </div>
                  <div>
                    <Label htmlFor="county">County</Label>
                    <Input
                      id="county"
                      value={formData.county}
                      onChange={(e) => handleChange('county', e.target.value)}
                    />
                  </div>
                  <div>
                    <Label htmlFor="county_website">County Website</Label>
                    <Input
                      id="county_website"
                      type="url"
                      value={formData.county_website}
                      onChange={(e) => handleChange('county_website', e.target.value)}
                    />
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="mortgage" className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle>Mortgage Details (Optional)</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <Label htmlFor="loan_company">Mortgage Company</Label>
                    <Input
                      id="loan_company"
                      value={formData.loan_company}
                      onChange={(e) => handleChange('loan_company', e.target.value)}
                    />
                  </div>
                  <div>
                    <Label htmlFor="loan_company_website">Mortgage Company Website</Label>
                    <Input
                      id="loan_company_website"
                      type="url"
                      value={formData.loan_company_website}
                      onChange={(e) => handleChange('loan_company_website', e.target.value)}
                    />
                  </div>
                  <div>
                    <Label htmlFor="loan_number">Loan Number</Label>
                    <Input
                      id="loan_number"
                      value={formData.loan_number}
                      onChange={(e) => handleChange('loan_number', e.target.value)}
                    />
                  </div>
                  <div className="grid grid-cols-3 gap-4">
                    <div>
                      <Label htmlFor="interest_rate">Interest Rate (%)</Label>
                      <Input
                        id="interest_rate"
                        type="number"
                        step="0.01"
                        value={formData.interest_rate}
                        onChange={(e) => handleChange('interest_rate', parseFloat(e.target.value) || 0)}
                      />
                    </div>
                    <div>
                      <Label htmlFor="monthly_pmi">Monthly PMI</Label>
                      <Input
                        id="monthly_pmi"
                        type="number"
                        step="0.01"
                        value={formData.monthly_pmi}
                        onChange={(e) => handleChange('monthly_pmi', parseFloat(e.target.value) || 0)}
                      />
                    </div>
                    <div>
                      <Label htmlFor="property_tax_yearly">Property Tax (Yearly)</Label>
                      <Input
                        id="property_tax_yearly"
                        type="number"
                        step="0.01"
                        value={formData.property_tax_yearly}
                        onChange={(e) => handleChange('property_tax_yearly', parseFloat(e.target.value) || 0)}
                      />
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="hoa" className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle>HOA Details (Optional)</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="hoa_amount">HOA Amount</Label>
                      <Input
                        id="hoa_amount"
                        type="number"
                        step="0.01"
                        value={formData.hoa_amount}
                        onChange={(e) => handleChange('hoa_amount', parseFloat(e.target.value) || 0)}
                      />
                    </div>
                    <div>
                      <Label htmlFor="hoa_frequency">HOA Frequency</Label>
                      <Select 
                        value={formData.hoa_frequency} 
                        onValueChange={(value) => handleChange('hoa_frequency', value)}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Select frequency" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="monthly">Monthly</SelectItem>
                          <SelectItem value="3 months">Every 3 Months</SelectItem>
                          <SelectItem value="4 months">Every 4 Months</SelectItem>
                          <SelectItem value="yearly">Yearly</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                  <div>
                    <Label htmlFor="hoa_phone">HOA Contact Phone</Label>
                    <Input
                      id="hoa_phone"
                      type="tel"
                      value={formData.hoa_phone}
                      onChange={(e) => handleChange('hoa_phone', e.target.value)}
                    />
                  </div>
                  <div>
                    <Label htmlFor="hoa_website">HOA Website</Label>
                    <Input
                      id="hoa_website"
                      type="url"
                      value={formData.hoa_website}
                      onChange={(e) => handleChange('hoa_website', e.target.value)}
                    />
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="insurance" className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle>Insurance Details (Optional)</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <Label htmlFor="insurance_yearly">Insurance Amount (Yearly)</Label>
                    <Input
                      id="insurance_yearly"
                      type="number"
                      step="0.01"
                      value={formData.insurance_yearly}
                      onChange={(e) => handleChange('insurance_yearly', parseFloat(e.target.value) || 0)}
                    />
                  </div>
                  <div>
                    <Label htmlFor="insurance_company">Insurance Company Name</Label>
                    <Input
                      id="insurance_company"
                      value={formData.insurance_company}
                      onChange={(e) => handleChange('insurance_company', e.target.value)}
                    />
                  </div>
                  <div>
                    <Label htmlFor="insurance_website">Insurance Website</Label>
                    <Input
                      id="insurance_website"
                      type="url"
                      value={formData.insurance_website}
                      onChange={(e) => handleChange('insurance_website', e.target.value)}
                    />
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="rental" className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle>Rental Details (Optional)</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <Label htmlFor="rental_monthly">Rental Amount per Month</Label>
                    <Input
                      id="rental_monthly"
                      type="number"
                      step="0.01"
                      value={formData.rental_monthly}
                      onChange={(e) => handleChange('rental_monthly', parseFloat(e.target.value) || 0)}
                    />
                  </div>
                  <div>
                    <Label htmlFor="lease_term">Lease Term</Label>
                    <Input
                      id="lease_term"
                      value={formData.lease_term}
                      onChange={(e) => handleChange('lease_term', e.target.value)}
                      placeholder="e.g., 12 months, Jan 2024 - Dec 2024"
                    />
                  </div>
                  <div>
                    <Label htmlFor="property_mgmt_name">Property Management Name</Label>
                    <Input
                      id="property_mgmt_name"
                      value={formData.property_mgmt_name}
                      onChange={(e) => handleChange('property_mgmt_name', e.target.value)}
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="property_mgmt_phone">Management Phone</Label>
                      <Input
                        id="property_mgmt_phone"
                        type="tel"
                        value={formData.property_mgmt_phone}
                        onChange={(e) => handleChange('property_mgmt_phone', e.target.value)}
                      />
                    </div>
                    <div>
                      <Label htmlFor="property_mgmt_email">Management Email</Label>
                      <Input
                        id="property_mgmt_email"
                        type="email"
                        value={formData.property_mgmt_email}
                        onChange={(e) => handleChange('property_mgmt_email', e.target.value)}
                      />
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>

          <div className="flex justify-end gap-2 mt-6">
            <Button type="button" variant="outline" onClick={onClose}>
              Cancel
            </Button>
            <Button type="submit">
              {editProperty ? 'Update Property' : 'Add Property'}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default PropertyForm;