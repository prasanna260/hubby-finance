
import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/hooks/useAuth';
import { toast } from '@/hooks/use-toast';

export interface NetWorthAsset {
  id: string;
  category: string;
  name: string;
  description?: string;
  value: number;
  created_at: string;
  updated_at: string;
}

export interface NetWorthLiability {
  id: string;
  category: string;
  name: string;
  description?: string;
  value: number;
  created_at: string;
  updated_at: string;
}

export interface NetWorthSnapshot {
  id: string;
  total_assets: number;
  total_liabilities: number;
  net_worth: number;
  snapshot_date: string;
  created_at: string;
}

export interface NetWorthGoal {
  id: string;
  target_amount: number;
  target_date?: string;
  description?: string;
  created_at: string;
  updated_at: string;
}

export const useNetWorthData = () => {
  const { user } = useAuth();
  const [assets, setAssets] = useState<NetWorthAsset[]>([]);
  const [liabilities, setLiabilities] = useState<NetWorthLiability[]>([]);
  const [snapshots, setSnapshots] = useState<NetWorthSnapshot[]>([]);
  const [goals, setGoals] = useState<NetWorthGoal[]>([]);
  const [loading, setLoading] = useState(true);

  console.log('useNetWorthData - user:', user, 'loading:', loading);

  const fetchAssets = async () => {
    if (!user) return;
    
    const { data, error } = await supabase
      .from('net_worth_assets')
      .select('*')
      .order('created_at', { ascending: false });

    if (error) {
      console.error('Error fetching assets:', error);
      toast({ title: 'Error fetching assets', variant: 'destructive' });
    } else {
      setAssets(data || []);
    }
  };

  const fetchLiabilities = async () => {
    if (!user) return;
    
    const { data, error } = await supabase
      .from('net_worth_liabilities')
      .select('*')
      .order('created_at', { ascending: false });

    if (error) {
      console.error('Error fetching liabilities:', error);
      toast({ title: 'Error fetching liabilities', variant: 'destructive' });
    } else {
      setLiabilities(data || []);
    }
  };

  const fetchSnapshots = async () => {
    if (!user) return;
    
    const { data, error } = await supabase
      .from('net_worth_snapshots')
      .select('*')
      .order('snapshot_date', { ascending: true });

    if (error) {
      console.error('Error fetching snapshots:', error);
    } else {
      setSnapshots(data || []);
    }
  };

  const fetchGoals = async () => {
    if (!user) return;
    
    const { data, error } = await supabase
      .from('net_worth_goals')
      .select('*')
      .order('created_at', { ascending: false });

    if (error) {
      console.error('Error fetching goals:', error);
    } else {
      setGoals(data || []);
    }
  };

  const addAsset = async (asset: Omit<NetWorthAsset, 'id' | 'created_at' | 'updated_at'>) => {
    if (!user) return;

    const { data, error } = await supabase
      .from('net_worth_assets')
      .insert([{ ...asset, user_id: user.id }])
      .select()
      .single();

    if (error) {
      console.error('Error adding asset:', error);
      toast({ title: 'Error adding asset', variant: 'destructive' });
    } else {
      setAssets(prev => [data, ...prev]);
      toast({ title: 'Asset added successfully' });
    }
  };

  const updateAsset = async (id: string, updates: Partial<NetWorthAsset>) => {
    const { error } = await supabase
      .from('net_worth_assets')
      .update(updates)
      .eq('id', id);

    if (error) {
      console.error('Error updating asset:', error);
      toast({ title: 'Error updating asset', variant: 'destructive' });
    } else {
      setAssets(prev => prev.map(asset => asset.id === id ? { ...asset, ...updates } : asset));
      toast({ title: 'Asset updated successfully' });
    }
  };

  const deleteAsset = async (id: string) => {
    const { error } = await supabase
      .from('net_worth_assets')
      .delete()
      .eq('id', id);

    if (error) {
      console.error('Error deleting asset:', error);
      toast({ title: 'Error deleting asset', variant: 'destructive' });
    } else {
      setAssets(prev => prev.filter(asset => asset.id !== id));
      toast({ title: 'Asset deleted successfully' });
    }
  };

  const addLiability = async (liability: Omit<NetWorthLiability, 'id' | 'created_at' | 'updated_at'>) => {
    if (!user) return;

    const { data, error } = await supabase
      .from('net_worth_liabilities')
      .insert([{ ...liability, user_id: user.id }])
      .select()
      .single();

    if (error) {
      console.error('Error adding liability:', error);
      toast({ title: 'Error adding liability', variant: 'destructive' });
    } else {
      setLiabilities(prev => [data, ...prev]);
      toast({ title: 'Liability added successfully' });
    }
  };

  const updateLiability = async (id: string, updates: Partial<NetWorthLiability>) => {
    const { error } = await supabase
      .from('net_worth_liabilities')
      .update(updates)
      .eq('id', id);

    if (error) {
      console.error('Error updating liability:', error);
      toast({ title: 'Error updating liability', variant: 'destructive' });
    } else {
      setLiabilities(prev => prev.map(liability => liability.id === id ? { ...liability, ...updates } : liability));
      toast({ title: 'Liability updated successfully' });
    }
  };

  const deleteLiability = async (id: string) => {
    const { error } = await supabase
      .from('net_worth_liabilities')
      .delete()
      .eq('id', id);

    if (error) {
      console.error('Error deleting liability:', error);
      toast({ title: 'Error deleting liability', variant: 'destructive' });
    } else {
      setLiabilities(prev => prev.filter(liability => liability.id !== id));
      toast({ title: 'Liability deleted successfully' });
    }
  };

  const createSnapshot = async () => {
    if (!user) return;

    const totalAssets = assets.reduce((sum, asset) => sum + asset.value, 0);
    const totalLiabilities = liabilities.reduce((sum, liability) => sum + liability.value, 0);
    const netWorth = totalAssets - totalLiabilities;

    const { data, error } = await supabase
      .from('net_worth_snapshots')
      .insert([{
        user_id: user.id,
        total_assets: totalAssets,
        total_liabilities: totalLiabilities,
        net_worth: netWorth,
        snapshot_date: new Date().toISOString().split('T')[0]
      }])
      .select()
      .single();

    if (error) {
      console.error('Error creating snapshot:', error);
      toast({ title: 'Error creating snapshot', variant: 'destructive' });
    } else {
      setSnapshots(prev => [...prev, data]);
      toast({ title: 'Snapshot created successfully' });
    }
  };

  useEffect(() => {
    console.log('useNetWorthData useEffect - user:', user);
    if (user) {
      console.log('Fetching net worth data for user:', user.id);
      Promise.all([
        fetchAssets(),
        fetchLiabilities(),
        fetchSnapshots(),
        fetchGoals()
      ]).finally(() => {
        console.log('Net worth data fetch completed');
        setLoading(false);
      });
    } else {
      console.log('No user found, setting loading to false');
      setLoading(false);
    }
  }, [user]);

  const totalAssets = assets.reduce((sum, asset) => sum + asset.value, 0);
  const totalLiabilities = liabilities.reduce((sum, liability) => sum + liability.value, 0);
  const netWorth = totalAssets - totalLiabilities;

  return {
    assets,
    liabilities,
    snapshots,
    goals,
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
    refetch: () => {
      fetchAssets();
      fetchLiabilities();
      fetchSnapshots();
      fetchGoals();
    }
  };
};
