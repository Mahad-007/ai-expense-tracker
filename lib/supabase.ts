import { createClient } from '@supabase/supabase-js'
import { Database } from './database.types'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_OR_ANON_KEY!

export const supabase = createClient<Database>(supabaseUrl, supabaseAnonKey)

// Helper functions for type-safe database operations

// Expense Categories
export const expenseCategories = {
  getAll: () => supabase.from('expense_categories').select('*'),
  getById: (id: string) => supabase.from('expense_categories').select('*').eq('id', id).single(),
  create: (data: Database['public']['Tables']['expense_categories']['Insert']) => 
    supabase.from('expense_categories').insert(data).select().single(),
  update: (id: string, data: Database['public']['Tables']['expense_categories']['Update']) =>
    supabase.from('expense_categories').update(data).eq('id', id).select().single(),
  delete: (id: string) => supabase.from('expense_categories').delete().eq('id', id)
}

// Expenses
export const expenses = {
  getAll: () => supabase.from('expenses').select(`
    *,
    expense_categories (
      id,
      name,
      description
    )
  `),
  getById: (id: string) => supabase.from('expenses').select(`
    *,
    expense_categories (
      id,
      name,
      description
    )
  `).eq('id', id).single(),
  getByCategory: (categoryId: string) => supabase.from('expenses').select(`
    *,
    expense_categories (
      id,
      name,
      description
    )
  `).eq('category_id', categoryId),
  create: (data: Database['public']['Tables']['expenses']['Insert']) => 
    supabase.from('expenses').insert(data).select(`
      *,
      expense_categories (
        id,
        name,
        description
      )
    `).single(),
  update: (id: string, data: Database['public']['Tables']['expenses']['Update']) =>
    supabase.from('expenses').update(data).eq('id', id).select(`
      *,
      expense_categories (
        id,
        name,
        description
      )
    `).single(),
  delete: (id: string) => supabase.from('expenses').delete().eq('id', id)
}

// Income
export const income = {
  getAll: () => supabase.from('income').select('*'),
  getById: (id: string) => supabase.from('income').select('*').eq('id', id).single(),
  create: (data: Database['public']['Tables']['income']['Insert']) => 
    supabase.from('income').insert(data).select().single(),
  update: (id: string, data: Database['public']['Tables']['income']['Update']) =>
    supabase.from('income').update(data).eq('id', id).select().single(),
  delete: (id: string) => supabase.from('income').delete().eq('id', id)
}

// Transactions
export const transactions = {
  getAll: () => supabase.from('transactions').select('*'),
  getById: (id: string) => supabase.from('transactions').select('*').eq('id', id).single(),
  getByType: (type: 'debit' | 'credit') => supabase.from('transactions').select('*').eq('transaction_type', type),
  getByDateRange: (startDate: string, endDate: string) => 
    supabase.from('transactions').select('*').gte('trans_date', startDate).lte('trans_date', endDate),
  create: (data: Database['public']['Tables']['transactions']['Insert']) => 
    supabase.from('transactions').insert(data).select().single(),
  update: (id: string, data: Database['public']['Tables']['transactions']['Update']) =>
    supabase.from('transactions').update(data).eq('id', id).select().single(),
  delete: (id: string) => supabase.from('transactions').delete().eq('id', id)
}

// Views
export const views = {
  expenseSummaryByCategory: () => supabase.from('expense_summary_by_category').select('*'),
  monthlyFinancialSummary: () => supabase.from('monthly_financial_summary').select('*'),
  recentTransactionsDetailed: (limit = 10) => 
    supabase.from('recent_transactions_detailed').select('*').limit(limit)
}

// Functions
export const functions = {
  getSpendingSummary: (startDate?: string, endDate?: string) => 
    supabase.rpc('get_spending_summary', { start_date: startDate, end_date: endDate })
}