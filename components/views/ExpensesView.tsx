"use client";

import { useState, useEffect } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { 
  CreditCard, 
  Plus, 
  Search, 
  Filter,
  Calendar,
  TrendingDown,
  Edit,
  Trash2
} from "lucide-react";
import { expenses, expenseCategories } from '@/lib/supabase';
import { format } from 'date-fns';
import toast from 'react-hot-toast';
import { AddExpenseModal } from '@/components/forms/AddExpenseModal';

const categoryEmojis: Record<string, string> = {
  'Food & Dining': '🍽️',
  'Transportation': '🚗',
  'Entertainment': '🎬',
  'Shopping': '🛍️',
  'Bills & Utilities': '💡',
  'Healthcare': '🏥',
  'Education': '📚',
  'Travel': '✈️',
  'Personal Care': '💅',
  'Others': '📦'
};

export function ExpensesView() {
  const [expenseList, setExpenseList] = useState<any[]>([]);
  const [categories, setCategories] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [showAddModal, setShowAddModal] = useState(false);

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    try {
      setLoading(true);
      
      // Load expenses with categories
      const { data: expensesData, error: expensesError } = await expenses.getAll();
      if (expensesError) throw expensesError;
      
      // Load categories
      const { data: categoriesData, error: categoriesError } = await expenseCategories.getAll();
      if (categoriesError) throw categoriesError;

      setExpenseList(expensesData || []);
      setCategories(categoriesData || []);
      
    } catch (error: any) {
      console.error('Error loading expenses:', error);
      toast.error('Failed to load expenses');
    } finally {
      setLoading(false);
    }
  };

  const filteredExpenses = expenseList.filter((expense) => {
    const matchesSearch = expense.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         expense.description?.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'all' || expense.category_id === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const totalExpenses = filteredExpenses.reduce((sum, expense) => sum + Number(expense.price), 0);

  if (loading) {
    return (
      <div className="p-6 space-y-8 max-w-7xl mx-auto">
        <div className="flex items-center justify-center h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
        </div>
      </div>
    );
  }

  return (
    <div className="p-6 space-y-8 max-w-7xl mx-auto">
      {/* Header */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
        <div className="flex items-center space-x-3">
          <div className="p-3 rounded-xl bg-red-50 dark:bg-red-950/20">
            <CreditCard className="w-8 h-8 text-red-500" />
          </div>
          <div>
            <h1 className="text-3xl font-bold bg-gradient-to-r from-red-600 to-orange-600 bg-clip-text text-transparent">
              💸 Expenses
            </h1>
            <p className="text-muted-foreground mt-1">
              Track and manage your spending
            </p>
          </div>
        </div>
        
        <div className="flex items-center gap-3">
          <Button
            onClick={() => setShowAddModal(true)}
            className="bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700"
          >
            <Plus className="w-4 h-4 mr-2" />
            Add Expense
          </Button>
        </div>
      </div>

      {/* Summary Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-muted-foreground">Total Expenses</p>
              <p className="text-2xl font-bold text-red-500">
                ${totalExpenses.toFixed(2)}
              </p>
            </div>
            <div className="p-3 rounded-full bg-red-50 dark:bg-red-950/20">
              <TrendingDown className="w-6 h-6 text-red-500" />
            </div>
          </div>
        </Card>

        <Card className="p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-muted-foreground">Total Items</p>
              <p className="text-2xl font-bold">
                {filteredExpenses.length}
              </p>
            </div>
            <div className="p-3 rounded-full bg-blue-50 dark:bg-blue-950/20">
              <CreditCard className="w-6 h-6 text-blue-500" />
            </div>
          </div>
        </Card>

        <Card className="p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-muted-foreground">Average Expense</p>
              <p className="text-2xl font-bold">
                ${filteredExpenses.length > 0 ? (totalExpenses / filteredExpenses.length).toFixed(2) : '0.00'}
              </p>
            </div>
            <div className="p-3 rounded-full bg-purple-50 dark:bg-purple-950/20">
              <Calendar className="w-6 h-6 text-purple-500" />
            </div>
          </div>
        </Card>
      </div>

      {/* Filters */}
      <Card className="p-6">
        <div className="flex flex-col lg:flex-row gap-4">
          <div className="flex-1">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
              <Input
                placeholder="Search expenses..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
          </div>
          
          <div className="flex items-center space-x-2">
            <Button
              variant={selectedCategory === 'all' ? 'default' : 'outline'}
              size="sm"
              onClick={() => setSelectedCategory('all')}
            >
              All Categories
            </Button>
            {categories.slice(0, 4).map((category) => (
              <Button
                key={category.id}
                variant={selectedCategory === category.id ? 'default' : 'outline'}
                size="sm"
                onClick={() => setSelectedCategory(category.id)}
                className="hidden md:flex"
              >
                <span className="mr-1">
                  {categoryEmojis[category.name] || '📦'}
                </span>
                {category.name}
              </Button>
            ))}
          </div>
        </div>
      </Card>

      {/* Expenses List */}
      <Card className="p-6">
        <div className="space-y-4">
          {filteredExpenses.length > 0 ? (
            filteredExpenses.map((expense) => (
              <div
                key={expense.id}
                className="flex items-center justify-between p-4 rounded-lg bg-muted/30 hover:bg-muted/50 transition-all duration-200 group"
              >
                <div className="flex items-center space-x-4">
                  <div className="p-3 rounded-full bg-red-50 dark:bg-red-950/20">
                    <span className="text-lg">
                      {categoryEmojis[expense.expense_categories?.name] || '📦'}
                    </span>
                  </div>
                  <div>
                    <h3 className="font-medium group-hover:text-primary transition-colors">
                      {expense.name}
                    </h3>
                    <div className="flex items-center space-x-4 text-sm text-muted-foreground">
                      <span>{expense.expense_categories?.name}</span>
                      <span>•</span>
                      <span>{format(new Date(expense.expense_date), 'MMM dd, yyyy')}</span>
                      {expense.description && (
                        <>
                          <span>•</span>
                          <span className="max-w-xs truncate">{expense.description}</span>
                        </>
                      )}
                    </div>
                  </div>
                </div>
                
                <div className="flex items-center space-x-4">
                  <div className="text-right">
                    <p className="font-semibold text-red-500 text-lg">
                      -${Number(expense.price).toFixed(2)}
                    </p>
                  </div>
                  
                  <div className="flex items-center space-x-2 opacity-0 group-hover:opacity-100 transition-opacity">
                    <Button variant="ghost" size="sm">
                      <Edit className="w-4 h-4" />
                    </Button>
                    <Button variant="ghost" size="sm">
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <div className="text-center py-12">
              <CreditCard className="w-16 h-16 mx-auto mb-4 text-muted-foreground opacity-50" />
              <h3 className="text-lg font-medium mb-2">No expenses found</h3>
              <p className="text-muted-foreground mb-4">
                {searchTerm || selectedCategory !== 'all' 
                  ? 'Try adjusting your filters or search terms'
                  : 'Start tracking your expenses by adding your first expense'
                }
              </p>
              <Button
                onClick={() => setShowAddModal(true)}
                className="bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700"
              >
                <Plus className="w-4 h-4 mr-2" />
                Add Your First Expense
              </Button>
            </div>
          )}
        </div>
      </Card>

      {/* Add Expense Modal */}
      <AddExpenseModal
        isOpen={showAddModal}
        onClose={() => setShowAddModal(false)}
        onExpenseAdded={loadData}
      />
    </div>
  );
}