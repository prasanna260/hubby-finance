import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/hooks/useAuth';

export interface RealEstateProperty {
  id: string;
  user_id: string;
  // Property Information
  address: string;
  purchase_price: number;
  current_price: number;
  county?: string;
  county_website?: string;
  // Mortgage Details
  loan_company?: string;
  loan_number?: string;
  loan_company_website?: string;
  interest_rate?: number;
  monthly_pmi?: number;
  property_tax_yearly?: number;
  // HOA Details
  hoa_amount?: number;
  hoa_frequency?: 'monthly' | '3 months' | '4 months' | 'yearly';
  hoa_phone?: string;
  hoa_website?: string;
  // Insurance Details
  insurance_yearly?: number;
  insurance_company?: string;
  insurance_website?: string;
  // Rental Details
  rental_monthly?: number;
  lease_term?: string;
  property_mgmt_name?: string;
  property_mgmt_phone?: string;
  property_mgmt_email?: string;
  created_at: string;
  updated_at: string;
}

export const useRealEstateData = () => {
  const { user } = useAuth();
  const [properties, setProperties] = useState<RealEstateProperty[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchProperties = async () => {
    if (!user) return;

    try {
      const { data, error } = await supabase
        .from('real_estate_properties')
        .select('*')
        .eq('user_id', user.id)
        .order('created_at', { ascending: false });

      if (error) throw error;
      setProperties((data || []) as RealEstateProperty[]);
    } catch (error) {
      console.error('Error fetching properties:', error);
    } finally {
      setLoading(false);
    }
  };

  const addProperty = async (property: Omit<RealEstateProperty, 'id' | 'user_id' | 'created_at' | 'updated_at'>) => {
    if (!user) return;

    try {
      const { data, error } = await supabase
        .from('real_estate_properties')
        .insert({
          ...property,
          user_id: user.id,
        })
        .select()
        .single();

      if (error) throw error;
      setProperties(prev => [data as RealEstateProperty, ...prev]);
    } catch (error) {
      console.error('Error adding property:', error);
      throw error;
    }
  };

  const updateProperty = async (id: string, updates: Partial<RealEstateProperty>) => {
    if (!user) return;

    try {
      const { data, error } = await supabase
        .from('real_estate_properties')
        .update(updates)
        .eq('id', id)
        .eq('user_id', user.id)
        .select()
        .single();

      if (error) throw error;
      setProperties(prev => prev.map(p => p.id === id ? data as RealEstateProperty : p));
    } catch (error) {
      console.error('Error updating property:', error);
      throw error;
    }
  };

  const deleteProperty = async (id: string) => {
    if (!user) return;

    try {
      const { error } = await supabase
        .from('real_estate_properties')
        .delete()
        .eq('id', id)
        .eq('user_id', user.id);

      if (error) throw error;
      setProperties(prev => prev.filter(p => p.id !== id));
    } catch (error) {
      console.error('Error deleting property:', error);
      throw error;
    }
  };

  useEffect(() => {
    fetchProperties();
  }, [user]);

  // Calculate totals
  const totalPortfolioValue = properties.reduce((sum, prop) => sum + prop.current_price, 0);
  const totalPurchasePrice = properties.reduce((sum, prop) => sum + prop.purchase_price, 0);
  const totalMonthlyRental = properties.reduce((sum, prop) => sum + (prop.rental_monthly || 0), 0);
  const totalYearlyExpenses = properties.reduce((sum, prop) => {
    const monthlyPMI = prop.monthly_pmi || 0;
    const yearlyTax = prop.property_tax_yearly || 0;
    const yearlyInsurance = prop.insurance_yearly || 0;
    const yearlyHOA = prop.hoa_frequency === 'yearly' 
      ? (prop.hoa_amount || 0)
      : prop.hoa_frequency === '3 months'
      ? (prop.hoa_amount || 0) * 4
      : prop.hoa_frequency === '4 months'
      ? (prop.hoa_amount || 0) * 3
      : (prop.hoa_amount || 0) * 12; // monthly
    return sum + (monthlyPMI * 12) + yearlyTax + yearlyInsurance + yearlyHOA;
  }, 0);

  return {
    properties,
    loading,
    addProperty,
    updateProperty,
    deleteProperty,
    refetch: fetchProperties,
    totalPortfolioValue,
    totalPurchasePrice,
    totalMonthlyRental,
    totalYearlyExpenses
  };
};