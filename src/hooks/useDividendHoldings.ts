
import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { User } from '@supabase/supabase-js';
import { toast } from 'sonner';

export interface DividendHolding {
  id: string;
  symbol: string;
  company_name: string;
  shares: number;
  avg_price: number;
  current_price: number;
  dividend_yield: number;
  annual_dividend: number;
  frequency: string;
  sector: string;
  created_at?: string;
  updated_at?: string;
}

export interface NewDividendHolding {
  symbol: string;
  company_name: string;
  shares: number;
  avg_price: number;
  current_price: number;
  dividend_yield: number;
  annual_dividend: number;
  frequency: string;
  sector: string;
}

export const useDividendHoldings = (user: User | null) => {
  const [holdings, setHoldings] = useState<DividendHolding[]>([]);
  const [loading, setLoading] = useState(true);
  const [updatingPrices, setUpdatingPrices] = useState(false);

  // Fetch holdings from database
  const fetchHoldings = async () => {
    if (!user) {
      setHoldings([]);
      setLoading(false);
      return;
    }

    try {
      const { data, error } = await supabase
        .from('dividend_holdings')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) {
        console.error('Error fetching holdings:', error);
        toast.error('Failed to fetch holdings');
      } else {
        setHoldings(data || []);
      }
    } catch (error) {
      console.error('Error fetching holdings:', error);
      toast.error('Failed to fetch holdings');
    } finally {
      setLoading(false);
    }
  };

  // Update stock prices and dividend data
  const updateStockData = async () => {
    if (!user || holdings.length === 0) return;

    setUpdatingPrices(true);
    try {
      const symbols = holdings.map(h => h.symbol);
      const { data, error } = await supabase.functions.invoke('fetch-stock-data', {
        body: { symbols }
      });

      if (error) {
        console.error('Error fetching bulk stock data:', error);
        toast.error('Failed to update stock data');
        return;
      }

      const stockData = data.stockData;
      
      // Update holdings with new data
      const updatedHoldings = holdings.map(holding => {
        const stock = stockData.find((s: any) => s.symbol === holding.symbol);
        
        if (stock) {
          return {
            ...holding,
            current_price: stock.price || holding.current_price,
            dividend_yield: stock.dividendYield || holding.dividend_yield,
            annual_dividend: stock.annualDividend || holding.annual_dividend,
            frequency: stock.frequency || holding.frequency
          };
        }
        return holding;
      });

      // Update database with new prices
      const updatePromises = updatedHoldings.map(async (holding) => {
        const { error } = await supabase
          .from('dividend_holdings')
          .update({
            current_price: holding.current_price,
            dividend_yield: holding.dividend_yield,
            annual_dividend: holding.annual_dividend,
            frequency: holding.frequency
          })
          .eq('id', holding.id);

        if (error) {
          console.error('Error updating holding:', error);
        }
      });

      await Promise.all(updatePromises);
      setHoldings(updatedHoldings);
      toast.success('Stock data updated successfully');
    } catch (error) {
      console.error('Error updating stock data:', error);
      toast.error('Failed to update stock data');
    } finally {
      setUpdatingPrices(false);
    }
  };

  // Add new holding (data is already fetched in the form)
  const addHolding = async (newHolding: NewDividendHolding) => {
    if (!user) {
      toast.error('Please log in to add holdings');
      return false;
    }

    try {
      const { data, error } = await supabase
        .from('dividend_holdings')
        .insert([{
          ...newHolding,
          user_id: user.id,
        }])
        .select()
        .single();

      if (error) {
        console.error('Error adding holding:', error);
        toast.error('Failed to add holding');
        return false;
      }

      setHoldings(prev => [data, ...prev]);
      toast.success('Holding added successfully');
      return true;
    } catch (error) {
      console.error('Error adding holding:', error);
      toast.error('Failed to add holding');
      return false;
    }
  };

  // Update holding
  const updateHolding = async (id: string, updatedHolding: NewDividendHolding) => {
    if (!user) {
      toast.error('Please log in to update holdings');
      return false;
    }

    try {
      const { data, error } = await supabase
        .from('dividend_holdings')
        .update(updatedHolding)
        .eq('id', id)
        .select()
        .single();

      if (error) {
        console.error('Error updating holding:', error);
        toast.error('Failed to update holding');
        return false;
      }

      setHoldings(prev => prev.map(holding => 
        holding.id === id ? data : holding
      ));
      toast.success('Holding updated successfully');
      return true;
    } catch (error) {
      console.error('Error updating holding:', error);
      toast.error('Failed to update holding');
      return false;
    }
  };

  // Delete holding
  const deleteHolding = async (id: string) => {
    if (!user) {
      toast.error('Please log in to delete holdings');
      return false;
    }

    try {
      const { error } = await supabase
        .from('dividend_holdings')
        .delete()
        .eq('id', id);

      if (error) {
        console.error('Error deleting holding:', error);
        toast.error('Failed to delete holding');
        return false;
      }

      setHoldings(prev => prev.filter(holding => holding.id !== id));
      toast.success('Holding deleted successfully');
      return true;
    } catch (error) {
      console.error('Error deleting holding:', error);
      toast.error('Failed to delete holding');
      return false;
    }
  };

  useEffect(() => {
    fetchHoldings();
  }, [user]);

  return {
    holdings,
    loading,
    updatingPrices,
    addHolding,
    updateHolding,
    deleteHolding,
    updateStockData,
    refetch: fetchHoldings,
  };
};
