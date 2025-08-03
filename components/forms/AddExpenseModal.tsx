"use client";

import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from "@/components/ui/label";
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { expenses, expenseCategories } from '@/lib/supabase';
import { X, Plus, CreditCard, Calendar, DollarSign, FileText } from 'lucide-react';
import toast from 'react-hot-toast';
import { format } from 'date-fns';

interface AddExpenseModalProps {
  isOpen: boolean;
  onClose: () => void;
  onExpenseAdded: () => void;
}

interface ExpenseCategory {
  id: string;
  name: string;
  description: string;
}

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

export function AddExpenseModal({ isOpen, onClose, onExpenseAdded }: AddExpenseModalProps) {
  const [formData, setFormData] = useState({
    name: '',
    price: '',
    description: '',
    expense_date: format(new Date(), 'yyyy-MM-dd'),
    category_id: ''
  });
  const [categories, setCategories] = useState<ExpenseCategory[]>([]);
  const [loading, setLoading] = useState(false);
  const [loadingCategories, setLoadingCategories] = useState(true);

  useEffect(() => {
    if (isOpen) {
      loadCategories();
    }
  }, [isOpen]);

  const loadCategories = async () => {
    try {
      setLoadingCategories(true);
      const { data, error } = await expenseCategories.getAll();
      if (error) throw error;
      setCategories(data || []);
    } catch (error: any) {
      console.error('Error loading categories:', error);
      toast.error('Failed to load categories');
    } finally {
      setLoadingCategories(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.name.trim() || !formData.price.trim() || !formData.category_id) {
      toast.error('Please fill in all required fields');
      return;
    }

    const price = parseFloat(formData.price);
    if (isNaN(price) || price <= 0) {
      toast.error('Please enter a valid price');
      return;
    }

    try {
      setLoading(true);
      
      const { data, error } = await expenses.create({
        name: formData.name.trim(),
        price: price,
        description: formData.description.trim() || null,
        expense_date: formData.expense_date,
        category_id: formData.category_id
      });

      if (error) throw error;

      toast.success('Expense added successfully!');
      onExpenseAdded();
      handleClose();
      
    } catch (error: any) {
      console.error('Error adding expense:', error);
      toast.error(error.message || 'Failed to add expense');
    } finally {
      setLoading(false);
    }
  };

  const handleClose = () => {
    setFormData({
      name: '',
      price: '',
      description: '',
      expense_date: format(new Date(), 'yyyy-MM-dd'),
      category_id: ''
    });
    onClose();
  };

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <Card className="w-full max-w-md bg-background border shadow-xl">
        <div className="p-6">
          {/* Header */}
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center space-x-3">
              <div className="p-2 rounded-lg bg-red-50 dark:bg-red-950/20">
                <CreditCard className="w-6 h-6 text-red-500" />
              </div>
              <div>
                <h2 className="text-xl font-semibold">Add Expense</h2>
                <p className="text-sm text-muted-foreground">Track your spending</p>
              </div>
            </div>
            <Button variant="ghost" size="sm" onClick={handleClose}>
              <X className="w-4 h-4" />
            </Button>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Expense Name */}
            <div className="space-y-2">
              <Label htmlFor="name" className="flex items-center space-x-2">
                <FileText className="w-4 h-4" />
                <span>Expense Name *</span>
              </Label>
              <Input
                id="name"
                placeholder="e.g., Grocery shopping, Coffee, Gas"
                value={formData.name}
                onChange={(e) => handleInputChange('name', e.target.value)}
                className="transition-all duration-200 focus:ring-2 focus:ring-red-500/20"
              />
            </div>

            {/* Price */}
            <div className="space-y-2">
              <Label htmlFor="price" className="flex items-center space-x-2">
                <DollarSign className="w-4 h-4" />
                <span>Amount *</span>
              </Label>
              <Input
                id="price"
                type="number"
                step="0.01"
                min="0"
                placeholder="0.00"
                value={formData.price}
                onChange={(e) => handleInputChange('price', e.target.value)}
                className="transition-all duration-200 focus:ring-2 focus:ring-red-500/20"
              />
            </div>

            {/* Date */}
            <div className="space-y-2">
              <Label htmlFor="expense_date" className="flex items-center space-x-2">
                <Calendar className="w-4 h-4" />
                <span>Date</span>
              </Label>
              <Input
                id="expense_date"
                type="date"
                value={formData.expense_date}
                onChange={(e) => handleInputChange('expense_date', e.target.value)}
                className="transition-all duration-200 focus:ring-2 focus:ring-red-500/20"
              />
            </div>

            {/* Category */}
            <div className="space-y-2">
              <Label className="flex items-center space-x-2">
                <span>Category *</span>
              </Label>
              {loadingCategories ? (
                <div className="flex items-center justify-center py-4">
                  <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-primary"></div>
                </div>
              ) : (
                <div className="grid grid-cols-2 gap-2 max-h-32 overflow-y-auto">
                  {categories.map((category) => (
                    <Button
                      key={category.id}
                      type="button"
                      variant={formData.category_id === category.id ? "default" : "outline"}
                      size="sm"
                      onClick={() => handleInputChange('category_id', category.id)}
                      className="justify-start text-left h-auto p-3 transition-all duration-200 hover:scale-105"
                    >
                      <span className="mr-2 text-lg">
                        {categoryEmojis[category.name] || '📦'}
                      </span>
                      <div className="text-left">
                        <div className="font-medium text-xs">{category.name}</div>
                      </div>
                    </Button>
                  ))}
                </div>
              )}
            </div>

            {/* Description */}
            <div className="space-y-2">
              <Label htmlFor="description">Description (Optional)</Label>
              <Input
                id="description"
                placeholder="Additional notes..."
                value={formData.description}
                onChange={(e) => handleInputChange('description', e.target.value)}
                className="transition-all duration-200 focus:ring-2 focus:ring-red-500/20"
              />
            </div>

            {/* Preview */}
            {formData.name && formData.price && formData.category_id && (
              <div className="p-3 rounded-lg bg-red-50 dark:bg-red-950/20 border border-red-200 dark:border-red-800">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <span className="text-lg">
                      {categoryEmojis[categories.find(c => c.id === formData.category_id)?.name || ''] || '📦'}
                    </span>
                    <div>
                      <p className="font-medium text-sm">{formData.name}</p>
                      <p className="text-xs text-muted-foreground">
                        {categories.find(c => c.id === formData.category_id)?.name}
                      </p>
                    </div>
                  </div>
                  <p className="font-semibold text-red-500">
                    -${parseFloat(formData.price || '0').toFixed(2)}
                  </p>
                </div>
              </div>
            )}

            {/* Buttons */}
            <div className="flex space-x-3 pt-4">
              <Button
                type="button"
                variant="outline"
                onClick={handleClose}
                className="flex-1"
                disabled={loading}
              >
                Cancel
              </Button>
              <Button
                type="submit"
                className="flex-1 bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700"
                disabled={loading}
              >
                {loading ? (
                  <div className="flex items-center space-x-2">
                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                    <span>Adding...</span>
                  </div>
                ) : (
                  <div className="flex items-center space-x-2">
                    <Plus className="w-4 h-4" />
                    <span>Add Expense</span>
                  </div>
                )}
              </Button>
            </div>
          </form>
        </div>
      </Card>
    </div>
  );
}