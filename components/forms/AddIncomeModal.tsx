"use client";

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from "@/components/ui/label";
import { Card } from '@/components/ui/card';
import { income } from '@/lib/supabase';
import { X, Plus, TrendingUp, Calendar, DollarSign, FileText } from 'lucide-react';
import toast from 'react-hot-toast';
import { format } from 'date-fns';

interface AddIncomeModalProps {
  isOpen: boolean;
  onClose: () => void;
  onIncomeAdded: () => void;
}

const incomeTypes = [
  { id: 'salary', name: 'Salary', emoji: '💼', description: 'Regular employment income' },
  { id: 'freelance', name: 'Freelance', emoji: '💻', description: 'Project-based work' },
  { id: 'business', name: 'Business', emoji: '🏢', description: 'Business revenue' },
  { id: 'investment', name: 'Investment', emoji: '📈', description: 'Returns and dividends' },
  { id: 'rental', name: 'Rental', emoji: '🏠', description: 'Property rental income' },
  { id: 'bonus', name: 'Bonus', emoji: '🎁', description: 'Performance bonus' },
  { id: 'gift', name: 'Gift', emoji: '🎉', description: 'Monetary gifts' },
  { id: 'refund', name: 'Refund', emoji: '↩️', description: 'Product/service refunds' },
  { id: 'other', name: 'Other', emoji: '💰', description: 'Other income sources' }
];

export function AddIncomeModal({ isOpen, onClose, onIncomeAdded }: AddIncomeModalProps) {
  const [formData, setFormData] = useState({
    name: '',
    price: '',
    description: '',
    income_date: format(new Date(), 'yyyy-MM-dd'),
    type: ''
  });
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.name.trim() || !formData.price.trim()) {
      toast.error('Please fill in the required fields');
      return;
    }

    const price = parseFloat(formData.price);
    if (isNaN(price) || price <= 0) {
      toast.error('Please enter a valid amount');
      return;
    }

    try {
      setLoading(true);
      
      const { data, error } = await income.create({
        name: formData.name.trim(),
        price: price,
        description: formData.description.trim() || null,
        income_date: formData.income_date
      });

      if (error) throw error;

      toast.success('Income added successfully!');
      onIncomeAdded();
      handleClose();
      
    } catch (error: any) {
      console.error('Error adding income:', error);
      toast.error(error.message || 'Failed to add income');
    } finally {
      setLoading(false);
    }
  };

  const handleClose = () => {
    setFormData({
      name: '',
      price: '',
      description: '',
      income_date: format(new Date(), 'yyyy-MM-dd'),
      type: ''
    });
    onClose();
  };

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleTypeSelect = (type: typeof incomeTypes[0]) => {
    setFormData(prev => ({ 
      ...prev, 
      type: type.id,
      name: prev.name || type.name,
      description: prev.description || type.description
    }));
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <Card className="w-full max-w-md bg-background border shadow-xl">
        <div className="p-6">
          {/* Header */}
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center space-x-3">
              <div className="p-2 rounded-lg bg-green-50 dark:bg-green-950/20">
                <TrendingUp className="w-6 h-6 text-green-500" />
              </div>
              <div>
                <h2 className="text-xl font-semibold">Add Income</h2>
                <p className="text-sm text-muted-foreground">Track your earnings</p>
              </div>
            </div>
            <Button variant="ghost" size="sm" onClick={handleClose}>
              <X className="w-4 h-4" />
            </Button>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Income Type Selection */}
            <div className="space-y-2">
              <Label>Income Type</Label>
              <div className="grid grid-cols-3 gap-2 max-h-32 overflow-y-auto">
                {incomeTypes.map((type) => (
                  <Button
                    key={type.id}
                    type="button"
                    variant={formData.type === type.id ? "default" : "outline"}
                    size="sm"
                    onClick={() => handleTypeSelect(type)}
                    className="h-auto p-2 flex-col space-y-1 transition-all duration-200 hover:scale-105"
                  >
                    <span className="text-lg">{type.emoji}</span>
                    <span className="text-xs font-medium">{type.name}</span>
                  </Button>
                ))}
              </div>
            </div>

            {/* Income Name */}
            <div className="space-y-2">
              <Label htmlFor="name" className="flex items-center space-x-2">
                <FileText className="w-4 h-4" />
                <span>Income Source *</span>
              </Label>
              <Input
                id="name"
                placeholder="e.g., Monthly Salary, Freelance Project, Dividend"
                value={formData.name}
                onChange={(e) => handleInputChange('name', e.target.value)}
                className="transition-all duration-200 focus:ring-2 focus:ring-green-500/20"
              />
            </div>

            {/* Amount */}
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
                className="transition-all duration-200 focus:ring-2 focus:ring-green-500/20"
              />
            </div>

            {/* Date */}
            <div className="space-y-2">
              <Label htmlFor="income_date" className="flex items-center space-x-2">
                <Calendar className="w-4 h-4" />
                <span>Date</span>
              </Label>
              <Input
                id="income_date"
                type="date"
                value={formData.income_date}
                onChange={(e) => handleInputChange('income_date', e.target.value)}
                className="transition-all duration-200 focus:ring-2 focus:ring-green-500/20"
              />
            </div>

            {/* Description */}
            <div className="space-y-2">
              <Label htmlFor="description">Description (Optional)</Label>
              <Input
                id="description"
                placeholder="Additional notes..."
                value={formData.description}
                onChange={(e) => handleInputChange('description', e.target.value)}
                className="transition-all duration-200 focus:ring-2 focus:ring-green-500/20"
              />
            </div>

            {/* Preview */}
            {formData.name && formData.price && (
              <div className="p-3 rounded-lg bg-green-50 dark:bg-green-950/20 border border-green-200 dark:border-green-800">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <span className="text-lg">
                      {incomeTypes.find(t => t.id === formData.type)?.emoji || '💰'}
                    </span>
                    <div>
                      <p className="font-medium text-sm">{formData.name}</p>
                      <p className="text-xs text-muted-foreground">
                        {incomeTypes.find(t => t.id === formData.type)?.name || 'Income'}
                      </p>
                    </div>
                  </div>
                  <p className="font-semibold text-green-500">
                    +${parseFloat(formData.price || '0').toFixed(2)}
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
                className="flex-1 bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700"
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
                    <span>Add Income</span>
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