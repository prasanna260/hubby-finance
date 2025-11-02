export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  // Allows to automatically instantiate createClient with right options
  // instead of createClient<Database, { PostgrestVersion: 'XX' }>(URL, KEY)
  __InternalSupabase: {
    PostgrestVersion: "12.2.12 (cd3cf9e)"
  }
  public: {
    Tables: {
      budget_expenses: {
        Row: {
          account_id: string | null
          amount: number
          category: string
          created_at: string
          date: string
          description: string | null
          id: string
          is_recurring: boolean | null
          name: string
          sub_category: string | null
          updated_at: string
          user_id: string
        }
        Insert: {
          account_id?: string | null
          amount?: number
          category: string
          created_at?: string
          date?: string
          description?: string | null
          id?: string
          is_recurring?: boolean | null
          name: string
          sub_category?: string | null
          updated_at?: string
          user_id: string
        }
        Update: {
          account_id?: string | null
          amount?: number
          category?: string
          created_at?: string
          date?: string
          description?: string | null
          id?: string
          is_recurring?: boolean | null
          name?: string
          sub_category?: string | null
          updated_at?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "budget_expenses_account_id_fkey"
            columns: ["account_id"]
            isOneToOne: false
            referencedRelation: "net_worth_assets"
            referencedColumns: ["id"]
          },
        ]
      }
      budget_income: {
        Row: {
          account_id: string | null
          amount: number
          category: string
          created_at: string
          date: string
          description: string | null
          id: string
          is_recurring: boolean | null
          source_name: string
          updated_at: string
          user_id: string
        }
        Insert: {
          account_id?: string | null
          amount?: number
          category: string
          created_at?: string
          date?: string
          description?: string | null
          id?: string
          is_recurring?: boolean | null
          source_name: string
          updated_at?: string
          user_id: string
        }
        Update: {
          account_id?: string | null
          amount?: number
          category?: string
          created_at?: string
          date?: string
          description?: string | null
          id?: string
          is_recurring?: boolean | null
          source_name?: string
          updated_at?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "budget_income_account_id_fkey"
            columns: ["account_id"]
            isOneToOne: false
            referencedRelation: "net_worth_assets"
            referencedColumns: ["id"]
          },
        ]
      }
      budget_loans: {
        Row: {
          created_at: string
          current_balance: number
          description: string | null
          end_date: string | null
          id: string
          interest_rate: number
          loan_name: string
          loan_type: string | null
          monthly_payment: number
          original_amount: number
          start_date: string
          updated_at: string
          user_id: string
        }
        Insert: {
          created_at?: string
          current_balance: number
          description?: string | null
          end_date?: string | null
          id?: string
          interest_rate?: number
          loan_name: string
          loan_type?: string | null
          monthly_payment?: number
          original_amount: number
          start_date: string
          updated_at?: string
          user_id: string
        }
        Update: {
          created_at?: string
          current_balance?: number
          description?: string | null
          end_date?: string | null
          id?: string
          interest_rate?: number
          loan_name?: string
          loan_type?: string | null
          monthly_payment?: number
          original_amount?: number
          start_date?: string
          updated_at?: string
          user_id?: string
        }
        Relationships: []
      }
      budget_payments: {
        Row: {
          amount: number
          category: string
          created_at: string
          description: string | null
          due_date: string
          id: string
          is_paid: boolean | null
          is_recurring: boolean | null
          name: string
          updated_at: string
          user_id: string
        }
        Insert: {
          amount?: number
          category: string
          created_at?: string
          description?: string | null
          due_date: string
          id?: string
          is_paid?: boolean | null
          is_recurring?: boolean | null
          name: string
          updated_at?: string
          user_id: string
        }
        Update: {
          amount?: number
          category?: string
          created_at?: string
          description?: string | null
          due_date?: string
          id?: string
          is_paid?: boolean | null
          is_recurring?: boolean | null
          name?: string
          updated_at?: string
          user_id?: string
        }
        Relationships: []
      }
      budget_reminders: {
        Row: {
          amount: number
          category: string
          created_at: string
          description: string | null
          email_notifications: boolean | null
          frequency: string
          id: string
          is_active: boolean | null
          name: string
          next_due_date: string
          notification_days_before: number
          phone_notifications: boolean | null
          phone_number: string | null
          reminder_type: string
          updated_at: string
          user_id: string
        }
        Insert: {
          amount?: number
          category: string
          created_at?: string
          description?: string | null
          email_notifications?: boolean | null
          frequency: string
          id?: string
          is_active?: boolean | null
          name: string
          next_due_date: string
          notification_days_before?: number
          phone_notifications?: boolean | null
          phone_number?: string | null
          reminder_type: string
          updated_at?: string
          user_id: string
        }
        Update: {
          amount?: number
          category?: string
          created_at?: string
          description?: string | null
          email_notifications?: boolean | null
          frequency?: string
          id?: string
          is_active?: boolean | null
          name?: string
          next_due_date?: string
          notification_days_before?: number
          phone_notifications?: boolean | null
          phone_number?: string | null
          reminder_type?: string
          updated_at?: string
          user_id?: string
        }
        Relationships: []
      }
      dividend_holdings: {
        Row: {
          annual_dividend: number | null
          avg_price: number | null
          company_name: string
          created_at: string
          current_price: number | null
          dividend_yield: number | null
          frequency: string | null
          id: string
          sector: string | null
          shares: number
          symbol: string
          updated_at: string
          user_id: string
        }
        Insert: {
          annual_dividend?: number | null
          avg_price?: number | null
          company_name: string
          created_at?: string
          current_price?: number | null
          dividend_yield?: number | null
          frequency?: string | null
          id?: string
          sector?: string | null
          shares?: number
          symbol: string
          updated_at?: string
          user_id: string
        }
        Update: {
          annual_dividend?: number | null
          avg_price?: number | null
          company_name?: string
          created_at?: string
          current_price?: number | null
          dividend_yield?: number | null
          frequency?: string | null
          id?: string
          sector?: string | null
          shares?: number
          symbol?: string
          updated_at?: string
          user_id?: string
        }
        Relationships: []
      }
      net_worth_assets: {
        Row: {
          category: string
          created_at: string
          description: string | null
          id: string
          name: string
          updated_at: string
          user_id: string
          value: number
        }
        Insert: {
          category: string
          created_at?: string
          description?: string | null
          id?: string
          name: string
          updated_at?: string
          user_id: string
          value?: number
        }
        Update: {
          category?: string
          created_at?: string
          description?: string | null
          id?: string
          name?: string
          updated_at?: string
          user_id?: string
          value?: number
        }
        Relationships: []
      }
      net_worth_goals: {
        Row: {
          created_at: string
          description: string | null
          id: string
          target_amount: number
          target_date: string | null
          updated_at: string
          user_id: string
        }
        Insert: {
          created_at?: string
          description?: string | null
          id?: string
          target_amount: number
          target_date?: string | null
          updated_at?: string
          user_id: string
        }
        Update: {
          created_at?: string
          description?: string | null
          id?: string
          target_amount?: number
          target_date?: string | null
          updated_at?: string
          user_id?: string
        }
        Relationships: []
      }
      net_worth_liabilities: {
        Row: {
          category: string
          created_at: string
          description: string | null
          id: string
          name: string
          updated_at: string
          user_id: string
          value: number
        }
        Insert: {
          category: string
          created_at?: string
          description?: string | null
          id?: string
          name: string
          updated_at?: string
          user_id: string
          value?: number
        }
        Update: {
          category?: string
          created_at?: string
          description?: string | null
          id?: string
          name?: string
          updated_at?: string
          user_id?: string
          value?: number
        }
        Relationships: []
      }
      net_worth_snapshots: {
        Row: {
          created_at: string
          id: string
          net_worth: number
          snapshot_date: string
          total_assets: number
          total_liabilities: number
          user_id: string
        }
        Insert: {
          created_at?: string
          id?: string
          net_worth?: number
          snapshot_date?: string
          total_assets?: number
          total_liabilities?: number
          user_id: string
        }
        Update: {
          created_at?: string
          id?: string
          net_worth?: number
          snapshot_date?: string
          total_assets?: number
          total_liabilities?: number
          user_id?: string
        }
        Relationships: []
      }
      newsletter_logs: {
        Row: {
          created_at: string
          error_message: string | null
          id: string
          recipients_count: number | null
          sent_at: string
          status: string
        }
        Insert: {
          created_at?: string
          error_message?: string | null
          id?: string
          recipients_count?: number | null
          sent_at?: string
          status: string
        }
        Update: {
          created_at?: string
          error_message?: string | null
          id?: string
          recipients_count?: number | null
          sent_at?: string
          status?: string
        }
        Relationships: []
      }
      newsletter_subscribers: {
        Row: {
          created_at: string
          email: string
          id: string
          subscribed: boolean | null
          updated_at: string
        }
        Insert: {
          created_at?: string
          email: string
          id?: string
          subscribed?: boolean | null
          updated_at?: string
        }
        Update: {
          created_at?: string
          email?: string
          id?: string
          subscribed?: boolean | null
          updated_at?: string
        }
        Relationships: []
      }
      real_estate_properties: {
        Row: {
          address: string
          county: string | null
          county_website: string | null
          created_at: string
          current_price: number
          hoa_amount: number | null
          hoa_frequency: string | null
          hoa_phone: string | null
          hoa_website: string | null
          id: string
          insurance_company: string | null
          insurance_website: string | null
          insurance_yearly: number | null
          interest_rate: number | null
          lease_term: string | null
          loan_company: string | null
          loan_company_website: string | null
          loan_number: string | null
          monthly_pmi: number | null
          property_mgmt_email: string | null
          property_mgmt_name: string | null
          property_mgmt_phone: string | null
          property_tax_yearly: number | null
          purchase_price: number
          rental_monthly: number | null
          updated_at: string
          user_id: string
        }
        Insert: {
          address: string
          county?: string | null
          county_website?: string | null
          created_at?: string
          current_price?: number
          hoa_amount?: number | null
          hoa_frequency?: string | null
          hoa_phone?: string | null
          hoa_website?: string | null
          id?: string
          insurance_company?: string | null
          insurance_website?: string | null
          insurance_yearly?: number | null
          interest_rate?: number | null
          lease_term?: string | null
          loan_company?: string | null
          loan_company_website?: string | null
          loan_number?: string | null
          monthly_pmi?: number | null
          property_mgmt_email?: string | null
          property_mgmt_name?: string | null
          property_mgmt_phone?: string | null
          property_tax_yearly?: number | null
          purchase_price?: number
          rental_monthly?: number | null
          updated_at?: string
          user_id: string
        }
        Update: {
          address?: string
          county?: string | null
          county_website?: string | null
          created_at?: string
          current_price?: number
          hoa_amount?: number | null
          hoa_frequency?: string | null
          hoa_phone?: string | null
          hoa_website?: string | null
          id?: string
          insurance_company?: string | null
          insurance_website?: string | null
          insurance_yearly?: number | null
          interest_rate?: number | null
          lease_term?: string | null
          loan_company?: string | null
          loan_company_website?: string | null
          loan_number?: string | null
          monthly_pmi?: number | null
          property_mgmt_email?: string | null
          property_mgmt_name?: string | null
          property_mgmt_phone?: string | null
          property_tax_yearly?: number | null
          purchase_price?: number
          rental_monthly?: number | null
          updated_at?: string
          user_id?: string
        }
        Relationships: []
      }
      subscriptions: {
        Row: {
          amount: number
          auto_renew: boolean | null
          billing_frequency: string
          category: string
          created_at: string
          description: string | null
          end_date: string | null
          id: string
          name: string
          payment_method: string | null
          start_date: string
          status: string
          updated_at: string
          user_id: string
        }
        Insert: {
          amount?: number
          auto_renew?: boolean | null
          billing_frequency: string
          category: string
          created_at?: string
          description?: string | null
          end_date?: string | null
          id?: string
          name: string
          payment_method?: string | null
          start_date?: string
          status?: string
          updated_at?: string
          user_id: string
        }
        Update: {
          amount?: number
          auto_renew?: boolean | null
          billing_frequency?: string
          category?: string
          created_at?: string
          description?: string | null
          end_date?: string | null
          id?: string
          name?: string
          payment_method?: string | null
          start_date?: string
          status?: string
          updated_at?: string
          user_id?: string
        }
        Relationships: []
      }
      user_dividend_goals: {
        Row: {
          annual_goal: number
          created_at: string
          id: string
          updated_at: string
          user_id: string
        }
        Insert: {
          annual_goal?: number
          created_at?: string
          id?: string
          updated_at?: string
          user_id: string
        }
        Update: {
          annual_goal?: number
          created_at?: string
          id?: string
          updated_at?: string
          user_id?: string
        }
        Relationships: []
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type DatabaseWithoutInternals = Omit<Database, "__InternalSupabase">

type DefaultSchema = DatabaseWithoutInternals[Extract<keyof Database, "public">]

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : DefaultSchemaTableNameOrOptions extends keyof (DefaultSchema["Tables"] &
        DefaultSchema["Views"])
    ? (DefaultSchema["Tables"] &
        DefaultSchema["Views"])[DefaultSchemaTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  DefaultSchemaEnumNameOrOptions extends
    | keyof DefaultSchema["Enums"]
    | { schema: keyof DatabaseWithoutInternals },
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = DefaultSchemaEnumNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof DatabaseWithoutInternals },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

export const Constants = {
  public: {
    Enums: {},
  },
} as const
