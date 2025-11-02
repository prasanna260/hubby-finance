
import { useState, useEffect } from 'react';
import { User } from '@supabase/supabase-js';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';

export interface DividendGoal {
  id: string;
  user_id: string;
  annual_goal: number;
  created_at: string;
  updated_at: string;
}

export const useDividendGoals = (user: User | null) => {
  const [goal, setGoal] = useState<DividendGoal | null>(null);
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();

  // Fetch user's dividend goal
  const fetchGoal = async () => {
    if (!user) {
      setLoading(false);
      return;
    }

    try {
      const { data, error } = await supabase
        .from('user_dividend_goals')
        .select('*')
        .eq('user_id', user.id)
        .maybeSingle();

      if (error) {
        console.error('Error fetching dividend goal:', error);
        toast({
          title: "Error",
          description: "Failed to load your dividend goal",
          variant: "destructive",
        });
        return;
      }

      setGoal(data);
    } catch (error) {
      console.error('Error fetching dividend goal:', error);
    } finally {
      setLoading(false);
    }
  };

  // Save or update user's dividend goal
  const saveGoal = async (annualGoal: number) => {
    if (!user) return false;

    try {
      if (goal) {
        // Update existing goal
        const { data, error } = await supabase
          .from('user_dividend_goals')
          .update({ annual_goal: annualGoal })
          .eq('id', goal.id)
          .select()
          .single();

        if (error) {
          console.error('Error updating dividend goal:', error);
          toast({
            title: "Error",
            description: "Failed to update your dividend goal",
            variant: "destructive",
          });
          return false;
        }

        setGoal(data);
      } else {
        // Create new goal
        const { data, error } = await supabase
          .from('user_dividend_goals')
          .insert({
            user_id: user.id,
            annual_goal: annualGoal
          })
          .select()
          .single();

        if (error) {
          console.error('Error creating dividend goal:', error);
          toast({
            title: "Error",
            description: "Failed to save your dividend goal",
            variant: "destructive",
          });
          return false;
        }

        setGoal(data);
      }

      toast({
        title: "Success",
        description: "Your dividend goal has been saved",
      });
      return true;
    } catch (error) {
      console.error('Error saving dividend goal:', error);
      toast({
        title: "Error",
        description: "Failed to save your dividend goal",
        variant: "destructive",
      });
      return false;
    }
  };

  useEffect(() => {
    fetchGoal();
  }, [user]);

  return {
    goal,
    loading,
    saveGoal,
    annualGoal: goal?.annual_goal || 2000
  };
};
