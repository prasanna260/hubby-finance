import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";

export interface BudgetIncome {
  id: string;
  user_id: string;
  source_name: string;
  amount: number;
  category: string;
  date: string;
  description?: string;
  is_recurring: boolean;
  account_id?: string;
  created_at: string;
  updated_at: string;
}

export interface BudgetExpense {
  id: string;
  user_id: string;
  name: string;
  amount: number;
  category: string;
  sub_category?: string;
  date: string;
  description?: string;
  is_recurring: boolean;
  account_id?: string;
  created_at: string;
  updated_at: string;
}

export interface BudgetPayment {
  id: string;
  user_id: string;
  name: string;
  amount: number;
  due_date: string;
  category: string;
  is_recurring: boolean;
  is_paid: boolean;
  description?: string;
  created_at: string;
  updated_at: string;
}

export interface BudgetLoan {
  id: string;
  user_id: string;
  loan_name: string;
  original_amount: number;
  current_balance: number;
  interest_rate: number;
  monthly_payment: number;
  start_date: string;
  end_date?: string;
  loan_type?: string;
  description?: string;
  created_at: string;
  updated_at: string;
}

export interface BudgetReminder {
  id: string;
  user_id: string;
  name: string;
  amount: number;
  category: string;
  reminder_type: string;
  frequency: string;
  next_due_date: string;
  notification_days_before: number;
  email_notifications: boolean;
  phone_notifications: boolean;
  phone_number?: string;
  description?: string;
  is_active: boolean;
  created_at: string;
  updated_at: string;
}

export const useBudgetData = () => {
  const { toast } = useToast();
  const queryClient = useQueryClient();

  // Income queries
  const { data: income = [], isLoading: incomeLoading } = useQuery({
    queryKey: ['budget-income'],
    queryFn: async () => {
      console.log('Fetching budget income...');
      const { data, error } = await supabase
        .from('budget_income')
        .select('*')
        .order('date', { ascending: false });
      
      console.log('Budget income fetch result:', { data, error });
      if (error) throw error;
      return data as BudgetIncome[];
    },
  });

  // Expenses queries
  const { data: expenses = [], isLoading: expensesLoading } = useQuery({
    queryKey: ['budget-expenses'],
    queryFn: async () => {
      console.log('Fetching budget expenses...');
      const { data, error } = await supabase
        .from('budget_expenses')
        .select('*')
        .order('date', { ascending: false });
      
      console.log('Budget expenses fetch result:', { data, error });
      if (error) throw error;
      return data as BudgetExpense[];
    },
  });

  // Payments queries
  const { data: payments = [], isLoading: paymentsLoading } = useQuery({
    queryKey: ['budget-payments'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('budget_payments')
        .select('*')
        .order('due_date', { ascending: true });
      
      if (error) throw error;
      return data as BudgetPayment[];
    },
  });

  // Loans queries
  const { data: loans = [], isLoading: loansLoading } = useQuery({
    queryKey: ['budget-loans'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('budget_loans')
        .select('*')
        .order('created_at', { ascending: false });
      
      if (error) throw error;
      return data as BudgetLoan[];
    },
  });

  // Reminders queries
  const { data: reminders = [], isLoading: remindersLoading } = useQuery({
    queryKey: ['budget-reminders'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('budget_reminders')
        .select('*')
        .order('next_due_date', { ascending: true });
      
      if (error) throw error;
      return data as BudgetReminder[];
    },
  });

  // Mutations
  const addIncome = useMutation({
    mutationFn: async (newIncome: Omit<BudgetIncome, 'id' | 'user_id' | 'created_at' | 'updated_at'>) => {
      console.log('Adding income:', newIncome);
      const { data: { user } } = await supabase.auth.getUser();
      console.log('Current user for income insert:', user);
      if (!user) throw new Error('User not authenticated');

      const insertData = { ...newIncome, user_id: user.id };
      console.log('Inserting income data:', insertData);
      
      const { data, error } = await supabase
        .from('budget_income')
        .insert(insertData)
        .select()
        .single();

      console.log('Income insert result:', { data, error });
      if (error) throw error;
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['budget-income'] });
      toast({ title: "Income added successfully" });
    },
    onError: (error) => {
      toast({ title: "Failed to add income", description: error.message, variant: "destructive" });
    },
  });

  const addExpense = useMutation({
    mutationFn: async (newExpense: Omit<BudgetExpense, 'id' | 'user_id' | 'created_at' | 'updated_at'>) => {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) throw new Error('User not authenticated');

      const { data, error } = await supabase
        .from('budget_expenses')
        .insert({ ...newExpense, user_id: user.id })
        .select()
        .single();

      if (error) throw error;
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['budget-expenses'] });
      toast({ title: "Expense added successfully" });
    },
    onError: (error) => {
      toast({ title: "Failed to add expense", description: error.message, variant: "destructive" });
    },
  });

  const addPayment = useMutation({
    mutationFn: async (newPayment: Omit<BudgetPayment, 'id' | 'user_id' | 'created_at' | 'updated_at'>) => {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) throw new Error('User not authenticated');

      const { data, error } = await supabase
        .from('budget_payments')
        .insert({ ...newPayment, user_id: user.id })
        .select()
        .single();

      if (error) throw error;
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['budget-payments'] });
      toast({ title: "Payment added successfully" });
    },
    onError: (error) => {
      toast({ title: "Failed to add payment", description: error.message, variant: "destructive" });
    },
  });

  const addLoan = useMutation({
    mutationFn: async (newLoan: Omit<BudgetLoan, 'id' | 'user_id' | 'created_at' | 'updated_at'>) => {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) throw new Error('User not authenticated');

      const { data, error } = await supabase
        .from('budget_loans')
        .insert({ ...newLoan, user_id: user.id })
        .select()
        .single();

      if (error) throw error;
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['budget-loans'] });
      toast({ title: "Loan added successfully" });
    },
    onError: (error) => {
      toast({ title: "Failed to add loan", description: error.message, variant: "destructive" });
    },
  });

  const addReminder = useMutation({
    mutationFn: async (newReminder: Omit<BudgetReminder, 'id' | 'user_id' | 'created_at' | 'updated_at' | 'is_active'>) => {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) throw new Error('User not authenticated');

      const { data, error } = await supabase
        .from('budget_reminders')
        .insert({ ...newReminder, user_id: user.id, is_active: true })
        .select()
        .single();

      if (error) throw error;
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['budget-reminders'] });
      toast({ title: "Reminder added successfully" });
    },
    onError: (error) => {
      toast({ title: "Failed to add reminder", description: error.message, variant: "destructive" });
    },
  });

  return {
    income,
    expenses,
    payments,
    loans,
    reminders,
    isLoading: incomeLoading || expensesLoading || paymentsLoading || loansLoading || remindersLoading,
    addIncome,
    addExpense,
    addPayment,
    addLoan,
    addReminder,
  };
};