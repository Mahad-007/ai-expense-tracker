"use client";

import { useState, useEffect } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { 
  TrendingUp, 
  TrendingDown, 
  DollarSign, 
  CreditCard, 
  Target, 
  PieChart,
  BarChart3,
  Plus,
  Download,
  Filter,
  Calendar,
  ArrowUpRight,
  ArrowDownRight,
  Zap,
  Shield,
  Brain
} from "lucide-react";
import { expenses, income, transactions, views, functions } from '@/lib/supabase';
import { format } from 'date-fns';
import toast from 'react-hot-toast';
import { AddExpenseModal } from '@/components/forms/AddExpenseModal';
import { AddIncomeModal } from '@/components/forms/AddIncomeModal';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { ChevronDown } from 'lucide-react';

interface DashboardData {
  totalIncome: number;
  totalExpenses: number;
  netAmount: number;
  transactionCount: number;
  recentTransactions: any[];
  expensesByCategory: any[];
}

export function DashboardContent() {
  const [dashboardData, setDashboardData] = useState<DashboardData>({
    totalIncome: 0,
    totalExpenses: 0,
    netAmount: 0,
    transactionCount: 0,
    recentTransactions: [],
    expensesByCategory: []
  });
  const [loading, setLoading] = useState(true);
  const [showExpenseModal, setShowExpenseModal] = useState(false);
  const [showIncomeModal, setShowIncomeModal] = useState(false);

  useEffect(() => {
    loadDashboardData();
  }, []);

  const loadDashboardData = async () => {
    try {
      setLoading(true);
      
      // Get spending summary
      const { data: spendingSummary, error: spendingError } = await functions.getSpendingSummary();
      if (spendingError) throw spendingError;

      // Get recent transactions
      const { data: recentTrans, error: transError } = await views.recentTransactionsDetailed(5);
      if (transError) throw transError;

      // Get expense summary by category
      const { data: expensesByCategory, error: categoryError } = await views.expenseSummaryByCategory();
      if (categoryError) throw categoryError;

      const summary = spendingSummary?.[0] || {
        total_expenses: 0,
        total_income: 0,
        net_amount: 0,
        transaction_count: 0
      };

      setDashboardData({
        totalIncome: Number(summary.total_income) || 0,
        totalExpenses: Number(summary.total_expenses) || 0,
        netAmount: Number(summary.net_amount) || 0,
        transactionCount: Number(summary.transaction_count) || 0,
        recentTransactions: recentTrans || [],
        expensesByCategory: expensesByCategory || []
      });

    } catch (error: any) {
      console.error('Error loading dashboard data:', error);
      toast.error('Failed to load dashboard data');
    } finally {
      setLoading(false);
    }
  };

  const handleDataUpdate = () => {
    loadDashboardData();
  };

  // Calculate total expenses for percentage calculation
  const totalCategoryExpenses = dashboardData.expensesByCategory.reduce(
    (sum, category) => sum + Number(category.total_amount || 0), 0
  );

  const stats = [
    {
      title: "Current Balance",
      value: `$${dashboardData.netAmount.toFixed(2)}`,
      change: dashboardData.netAmount >= 0 ? "+100%" : "-100%",
      trend: dashboardData.netAmount >= 0 ? "up" : "down",
      icon: DollarSign,
      color: dashboardData.netAmount >= 0 ? "text-green-500" : "text-red-500",
      bgColor: dashboardData.netAmount >= 0 ? "bg-green-50 dark:bg-green-950/20" : "bg-red-50 dark:bg-red-950/20"
    },
    {
      title: "Total Expenses",
      value: `$${dashboardData.totalExpenses.toFixed(2)}`,
      change: "-8.2%", // You can calculate this based on previous period
      trend: "down",
      icon: CreditCard,
      color: "text-red-500",
      bgColor: "bg-red-50 dark:bg-red-950/20"
    },
    {
      title: "Total Income",
      value: `$${dashboardData.totalIncome.toFixed(2)}`,
      change: "+12.5%", // You can calculate this based on previous period
      trend: "up",
      icon: TrendingUp,
      color: "text-green-500",
      bgColor: "bg-green-50 dark:bg-green-950/20"
    },
    {
      title: "Transactions",
      value: dashboardData.transactionCount.toString(),
      change: "+5.8%",
      trend: "up",
      icon: Target,
      color: "text-blue-500",
      bgColor: "bg-blue-50 dark:bg-blue-950/20"
    }
  ];

  // Process categories for display
  const processedCategories = dashboardData.expensesByCategory
    .filter(category => Number(category.total_amount) > 0)
    .map((category, index) => {
      const amount = Number(category.total_amount);
      const percentage = totalCategoryExpenses > 0 ? Math.round((amount / totalCategoryExpenses) * 100) : 0;
      const colors = ["bg-red-500", "bg-blue-500", "bg-purple-500", "bg-green-500", "bg-orange-500", "bg-pink-500", "bg-yellow-500"];
      
      return {
        name: category.category_name,
        amount: amount,
        percentage: percentage,
        color: colors[index % colors.length],
        count: category.expense_count
      };
    })
    .sort((a, b) => b.amount - a.amount);

  const aiInsights = [
    {
      type: "info",
      title: "Spending Analysis",
      description: `You have ${dashboardData.transactionCount} transactions this period with a net balance of $${dashboardData.netAmount.toFixed(2)}.`,
      icon: Brain,
      color: "text-blue-500",
      bgColor: "bg-blue-50 dark:bg-blue-950/20"
    },
    {
      type: dashboardData.netAmount >= 0 ? "success" : "warning",
      title: dashboardData.netAmount >= 0 ? "Positive Balance" : "Budget Alert",
      description: dashboardData.netAmount >= 0 
        ? "Great job! You're maintaining a positive balance." 
        : "Your expenses exceed income. Consider reviewing your spending.",
      icon: Target,
      color: dashboardData.netAmount >= 0 ? "text-green-500" : "text-orange-500",
      bgColor: dashboardData.netAmount >= 0 ? "bg-green-50 dark:bg-green-950/20" : "bg-orange-50 dark:bg-orange-950/20"
    },
    {
      type: "info",
      title: "Top Category",
      description: processedCategories.length > 0 
        ? `${processedCategories[0].name} is your highest expense category at $${processedCategories[0].amount.toFixed(2)}.`
        : "No expenses recorded yet.",
      icon: PieChart,
      color: "text-purple-500",
      bgColor: "bg-purple-50 dark:bg-purple-950/20"
    }
  ];

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
        <div>
          <h1 className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
            Welcome back, User!
          </h1>
          <p className="text-muted-foreground mt-2">
            Here's your financial overview for today
          </p>
        </div>
        <div className="flex items-center gap-3">
          <Button variant="outline" size="sm">
            <Filter className="w-4 h-4 mr-2" />
            Filter
          </Button>
          <Button variant="outline" size="sm">
            <Download className="w-4 h-4 mr-2" />
            Export
          </Button>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button size="sm" className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700">
                <Plus className="w-4 h-4 mr-2" />
                Add Transaction
                <ChevronDown className="w-4 h-4 ml-2" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-48">
              <DropdownMenuItem onClick={() => setShowExpenseModal(true)}>
                <CreditCard className="w-4 h-4 mr-2 text-red-500" />
                Add Expense
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => setShowIncomeModal(true)}>
                <TrendingUp className="w-4 h-4 mr-2 text-green-500" />
                Add Income
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => {
          const Icon = stat.icon;
          const TrendIcon = stat.trend === "up" ? ArrowUpRight : ArrowDownRight;
          
          return (
            <Card key={index} className="p-6 hover:shadow-lg transition-all duration-300 hover:scale-105 cursor-pointer group border-l-4 border-l-transparent hover:border-l-primary">
              <div className="flex items-center justify-between">
                <div className={`p-3 rounded-xl ${stat.bgColor} group-hover:scale-110 transition-transform duration-200`}>
                  <Icon className={`w-6 h-6 ${stat.color}`} />
                </div>
                <div className={`flex items-center space-x-1 text-sm font-medium ${
                  stat.trend === "up" ? "text-green-500" : "text-red-500"
                }`}>
                  <TrendIcon className="w-4 h-4" />
                  <span>{stat.change}</span>
                </div>
              </div>
              <div className="mt-4">
                <h3 className="text-sm font-medium text-muted-foreground">{stat.title}</h3>
                <p className="text-2xl font-bold mt-1">{stat.value}</p>
              </div>
            </Card>
          );
        })}
      </div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Recent Transactions */}
        <div className="lg:col-span-2">
          <Card className="p-6">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-semibold">Recent Transactions</h2>
              <Button variant="ghost" size="sm">
                View All
              </Button>
            </div>
            <div className="space-y-4">
              {dashboardData.recentTransactions.length > 0 ? (
                dashboardData.recentTransactions.map((transaction) => {
                  const isCredit = transaction.transaction_type === 'credit';
                  const amount = Number(transaction.trans_amount);
                  
                  return (
                    <div key={transaction.id} className="flex items-center justify-between p-4 rounded-lg bg-muted/30 hover:bg-muted/50 transition-colors duration-200 cursor-pointer group">
                      <div className="flex items-center space-x-4">
                        <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                          isCredit 
                            ? "bg-green-50 dark:bg-green-950/20" 
                            : "bg-red-50 dark:bg-red-950/20"
                        }`}>
                          <div className={`w-2 h-2 rounded-full ${
                            isCredit ? "bg-green-500" : "bg-red-500"
                          }`} />
                        </div>
                        <div>
                          <p className="font-medium group-hover:text-primary transition-colors duration-200">
                            {transaction.reference_name || transaction.description || 'Transaction'}
                          </p>
                          <p className="text-sm text-muted-foreground">
                            {transaction.category_name || transaction.reference_type || 'Uncategorized'}
                          </p>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className={`font-semibold ${
                          isCredit ? "text-green-500" : "text-red-500"
                        }`}>
                          {isCredit ? "+" : "-"}${amount.toFixed(2)}
                        </p>
                        <p className="text-sm text-muted-foreground">
                          {format(new Date(transaction.trans_date), 'MMM dd, yyyy')}
                        </p>
                      </div>
                    </div>
                  );
                })
              ) : (
                <div className="text-center py-8 text-muted-foreground">
                  <CreditCard className="w-12 h-12 mx-auto mb-4 opacity-50" />
                  <p>No recent transactions</p>
                  <p className="text-sm">Start by adding some expenses or income</p>
                </div>
              )}
            </div>
          </Card>
        </div>

        {/* Right Column */}
        <div className="space-y-6">
          {/* Spending Categories */}
          <Card className="p-6">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-semibold">Spending by Category</h2>
              <PieChart className="w-5 h-5 text-muted-foreground" />
            </div>
            <div className="space-y-4">
              {processedCategories.length > 0 ? (
                processedCategories.map((category, index) => (
                  <div key={index} className="space-y-2">
                    <div className="flex justify-between items-center">
                      <div className="flex items-center space-x-2">
                        <span className="text-sm font-medium">{category.name}</span>
                        <Badge variant="secondary" className="text-xs">
                          {category.count} items
                        </Badge>
                      </div>
                      <span className="text-sm font-semibold">${category.amount.toFixed(2)}</span>
                    </div>
                    <div className="w-full bg-muted rounded-full h-2 overflow-hidden">
                      <div 
                        className={`h-full ${category.color} rounded-full transition-all duration-500 ease-out`}
                        style={{ width: `${category.percentage}%` }}
                      />
                    </div>
                    <div className="flex justify-between text-xs text-muted-foreground">
                      <span>{category.percentage}% of total</span>
                      <span>Avg: ${(category.amount / category.count).toFixed(2)}</span>
                    </div>
                  </div>
                ))
              ) : (
                <div className="text-center py-8 text-muted-foreground">
                  <PieChart className="w-12 h-12 mx-auto mb-4 opacity-50" />
                  <p>No expense categories</p>
                  <p className="text-sm">Add some expenses to see breakdown</p>
                </div>
              )}
            </div>
          </Card>

          {/* AI Insights */}
          <Card className="p-6">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-semibold">AI Insights</h2>
              <Badge className="bg-gradient-to-r from-blue-500 to-purple-500">
                <Zap className="w-3 h-3 mr-1" />
                Smart
              </Badge>
            </div>
            <div className="space-y-4">
              {aiInsights.map((insight, index) => {
                const Icon = insight.icon;
                return (
                  <div key={index} className={`p-4 rounded-lg border-l-4 ${insight.bgColor} hover:shadow-md transition-all duration-200 cursor-pointer group`}>
                    <div className="flex items-start space-x-3">
                      <div className={`p-2 rounded-lg ${insight.bgColor}`}>
                        <Icon className={`w-4 h-4 ${insight.color}`} />
                      </div>
                      <div className="flex-1">
                        <h4 className="font-medium text-sm group-hover:text-primary transition-colors duration-200">
                          {insight.title}
                        </h4>
                        <p className="text-xs text-muted-foreground mt-1">
                          {insight.description}
                        </p>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </Card>
        </div>
      </div>

      {/* Quick Actions */}
      <Card className="p-6">
        <h2 className="text-xl font-semibold mb-6">Quick Actions</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <Button variant="outline" className="h-20 flex-col space-y-2 hover:scale-105 transition-transform duration-200">
            <Plus className="w-6 h-6" />
            <span className="text-sm">Add Expense</span>
          </Button>
          <Button variant="outline" className="h-20 flex-col space-y-2 hover:scale-105 transition-transform duration-200">
            <BarChart3 className="w-6 h-6" />
            <span className="text-sm">View Report</span>
          </Button>
          <Button variant="outline" className="h-20 flex-col space-y-2 hover:scale-105 transition-transform duration-200">
            <Target className="w-6 h-6" />
            <span className="text-sm">Set Goal</span>
          </Button>
          <Button variant="outline" className="h-20 flex-col space-y-2 hover:scale-105 transition-transform duration-200">
            <Shield className="w-6 h-6" />
            <span className="text-sm">Set Limit</span>
          </Button>
        </div>
      </Card>

      {/* Modals */}
      <AddExpenseModal
        isOpen={showExpenseModal}
        onClose={() => setShowExpenseModal(false)}
        onExpenseAdded={handleDataUpdate}
      />
      
      <AddIncomeModal
        isOpen={showIncomeModal}
        onClose={() => setShowIncomeModal(false)}
        onIncomeAdded={handleDataUpdate}
      />
    </div>
  );
}