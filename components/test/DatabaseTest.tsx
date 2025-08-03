"use client";

import { useState, useEffect } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { expenses, income, views, functions } from '@/lib/supabase';
import { Loader2, CheckCircle, XCircle, Database } from 'lucide-react';

interface TestResult {
  name: string;
  status: 'pending' | 'success' | 'error';
  data?: any;
  error?: string;
}

export function DatabaseTest() {
  const [tests, setTests] = useState<TestResult[]>([
    { name: 'Connect to Database', status: 'pending' },
    { name: 'Fetch Expense Categories', status: 'pending' },
    { name: 'Fetch Expenses', status: 'pending' },
    { name: 'Fetch Income', status: 'pending' },
    { name: 'Expense Summary by Category', status: 'pending' },
    { name: 'Spending Summary Function', status: 'pending' },
  ]);

  const [isRunning, setIsRunning] = useState(false);

  const updateTest = (index: number, status: TestResult['status'], data?: any, error?: string) => {
    setTests(prev => prev.map((test, i) => 
      i === index ? { ...test, status, data, error } : test
    ));
  };

  const runTests = async () => {
    setIsRunning(true);
    
    // Reset all tests
    setTests(prev => prev.map(test => ({ ...test, status: 'pending' })));

    try {
      // Test 1: Connect to Database
      updateTest(0, 'success', 'Connected successfully');
      await new Promise(resolve => setTimeout(resolve, 500));

      // Test 2: Fetch Expense Categories
      try {
        const { data: categories, error } = await expenses.getAll();
        if (error) throw error;
        updateTest(1, 'success', `Found ${categories?.length || 0} expense categories`);
      } catch (error: any) {
        updateTest(1, 'error', null, error.message);
      }
      await new Promise(resolve => setTimeout(resolve, 500));

      // Test 3: Fetch Expenses
      try {
        const { data: expenseData, error } = await expenses.getAll();
        if (error) throw error;
        updateTest(2, 'success', `Found ${expenseData?.length || 0} expenses`);
      } catch (error: any) {
        updateTest(2, 'error', null, error.message);
      }
      await new Promise(resolve => setTimeout(resolve, 500));

      // Test 4: Fetch Income
      try {
        const { data: incomeData, error } = await income.getAll();
        if (error) throw error;
        updateTest(3, 'success', `Found ${incomeData?.length || 0} income records`);
      } catch (error: any) {
        updateTest(3, 'error', null, error.message);
      }
      await new Promise(resolve => setTimeout(resolve, 500));

      // Test 5: Expense Summary by Category
      try {
        const { data: summary, error } = await views.expenseSummaryByCategory();
        if (error) throw error;
        updateTest(4, 'success', `Found ${summary?.length || 0} category summaries`);
      } catch (error: any) {
        updateTest(4, 'error', null, error.message);
      }
      await new Promise(resolve => setTimeout(resolve, 500));

      // Test 6: Spending Summary Function
      try {
        const { data: spendingSummary, error } = await functions.getSpendingSummary();
        if (error) throw error;
        const summary = spendingSummary?.[0];
        updateTest(5, 'success', 
          summary ? 
          `Expenses: $${summary.total_expenses}, Income: $${summary.total_income}, Net: $${summary.net_amount}` :
          'No data returned'
        );
      } catch (error: any) {
        updateTest(5, 'error', null, error.message);
      }

    } catch (error: any) {
      console.error('Test suite failed:', error);
    } finally {
      setIsRunning(false);
    }
  };

  const getStatusIcon = (status: TestResult['status']) => {
    switch (status) {
      case 'pending':
        return <Loader2 className="w-4 h-4 animate-spin text-muted-foreground" />;
      case 'success':
        return <CheckCircle className="w-4 h-4 text-green-500" />;
      case 'error':
        return <XCircle className="w-4 h-4 text-red-500" />;
    }
  };

  const getStatusBadge = (status: TestResult['status']) => {
    switch (status) {
      case 'pending':
        return <Badge variant="secondary">Pending</Badge>;
      case 'success':
        return <Badge variant="default" className="bg-green-500 hover:bg-green-600">Success</Badge>;
      case 'error':
        return <Badge variant="destructive">Error</Badge>;
    }
  };

  return (
    <Card className="p-6 max-w-2xl mx-auto">
      <div className="flex items-center space-x-3 mb-6">
        <div className="p-2 rounded-lg bg-blue-50 dark:bg-blue-950/20">
          <Database className="w-6 h-6 text-blue-500" />
        </div>
        <div>
          <h2 className="text-xl font-semibold">Database Connection Test</h2>
          <p className="text-sm text-muted-foreground">
            Test your Supabase database connection and functionality
          </p>
        </div>
      </div>

      <div className="space-y-4 mb-6">
        {tests.map((test, index) => (
          <div key={index} className="flex items-center justify-between p-3 rounded-lg bg-muted/30 hover:bg-muted/50 transition-colors duration-200">
            <div className="flex items-center space-x-3">
              {getStatusIcon(test.status)}
              <div>
                <p className="font-medium">{test.name}</p>
                {test.data && (
                  <p className="text-sm text-muted-foreground">{test.data}</p>
                )}
                {test.error && (
                  <p className="text-sm text-red-500">{test.error}</p>
                )}
              </div>
            </div>
            {getStatusBadge(test.status)}
          </div>
        ))}
      </div>

      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <span className="text-sm text-muted-foreground">
            {tests.filter(t => t.status === 'success').length} / {tests.length} tests passed
          </span>
        </div>
        <Button 
          onClick={runTests} 
          disabled={isRunning}
          className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700"
        >
          {isRunning ? (
            <Loader2 className="w-4 h-4 mr-2 animate-spin" />
          ) : (
            <Database className="w-4 h-4 mr-2" />
          )}
          {isRunning ? 'Running Tests...' : 'Run Tests'}
        </Button>
      </div>

      <div className="mt-4 p-3 rounded-lg bg-blue-50 dark:bg-blue-950/20 border border-blue-200 dark:border-blue-800">
        <p className="text-sm text-blue-700 dark:text-blue-300">
          <strong>💡 Tip:</strong> If all tests pass, your Supabase database is working perfectly! 
          You can now use the type-safe client in <code className="font-mono px-1 py-0.5 bg-blue-100 dark:bg-blue-900/50 rounded">lib/supabase.ts</code> 
          to build your expense tracker features.
        </p>
      </div>
    </Card>
  );
}