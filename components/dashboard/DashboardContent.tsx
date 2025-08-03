"use client";

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

export function DashboardContent() {
  const stats = [
    {
      title: "Total Balance",
      value: "$12,847.32",
      change: "+12.5%",
      trend: "up",
      icon: DollarSign,
      color: "text-green-500",
      bgColor: "bg-green-50 dark:bg-green-950/20"
    },
    {
      title: "Monthly Expenses",
      value: "$3,692.18",
      change: "-8.2%",
      trend: "down",
      icon: CreditCard,
      color: "text-red-500",
      bgColor: "bg-red-50 dark:bg-red-950/20"
    },
    {
      title: "Savings Goal",
      value: "67%",
      change: "+5.8%",
      trend: "up",
      icon: Target,
      color: "text-blue-500",
      bgColor: "bg-blue-50 dark:bg-blue-950/20"
    },
    {
      title: "Investment Returns",
      value: "$1,249.85",
      change: "+18.7%",
      trend: "up",
      icon: TrendingUp,
      color: "text-purple-500",
      bgColor: "bg-purple-50 dark:bg-purple-950/20"
    }
  ];

  const recentTransactions = [
    { id: 1, name: "Whole Foods Market", category: "Groceries", amount: -89.42, date: "2 hours ago", status: "completed" },
    { id: 2, name: "Netflix Subscription", category: "Entertainment", amount: -15.99, date: "1 day ago", status: "completed" },
    { id: 3, name: "Salary Deposit", category: "Income", amount: 3200.00, date: "2 days ago", status: "completed" },
    { id: 4, name: "Gas Station", category: "Transportation", amount: -45.20, date: "3 days ago", status: "completed" },
    { id: 5, name: "Coffee Shop", category: "Food & Dining", amount: -12.50, date: "3 days ago", status: "completed" },
  ];

  const categories = [
    { name: "Food & Dining", amount: 842.30, percentage: 23, color: "bg-red-500" },
    { name: "Transportation", amount: 432.15, percentage: 12, color: "bg-blue-500" },
    { name: "Entertainment", amount: 298.60, percentage: 8, color: "bg-purple-500" },
    { name: "Shopping", amount: 756.90, percentage: 21, color: "bg-green-500" },
    { name: "Bills & Utilities", amount: 1285.45, percentage: 36, color: "bg-orange-500" },
  ];

  const aiInsights = [
    {
      type: "warning",
      title: "Unusual Spending Pattern",
      description: "Your dining expenses are 23% higher than usual this month.",
      icon: Brain,
      color: "text-orange-500",
      bgColor: "bg-orange-50 dark:bg-orange-950/20"
    },
    {
      type: "success",
      title: "Goal Achievement",
      description: "You're on track to meet your savings goal 2 weeks early!",
      icon: Target,
      color: "text-green-500",
      bgColor: "bg-green-50 dark:bg-green-950/20"
    },
    {
      type: "info",
      title: "Investment Opportunity",
      description: "Consider investing your surplus in a high-yield savings account.",
      icon: TrendingUp,
      color: "text-blue-500",
      bgColor: "bg-blue-50 dark:bg-blue-950/20"
    }
  ];

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
          <Button size="sm" className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700">
            <Plus className="w-4 h-4 mr-2" />
            Add Transaction
          </Button>
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
              {recentTransactions.map((transaction) => (
                <div key={transaction.id} className="flex items-center justify-between p-4 rounded-lg bg-muted/30 hover:bg-muted/50 transition-colors duration-200 cursor-pointer group">
                  <div className="flex items-center space-x-4">
                    <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                      transaction.amount > 0 
                        ? "bg-green-50 dark:bg-green-950/20" 
                        : "bg-red-50 dark:bg-red-950/20"
                    }`}>
                      <div className={`w-2 h-2 rounded-full ${
                        transaction.amount > 0 ? "bg-green-500" : "bg-red-500"
                      }`} />
                    </div>
                    <div>
                      <p className="font-medium group-hover:text-primary transition-colors duration-200">
                        {transaction.name}
                      </p>
                      <p className="text-sm text-muted-foreground">{transaction.category}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className={`font-semibold ${
                      transaction.amount > 0 ? "text-green-500" : "text-red-500"
                    }`}>
                      {transaction.amount > 0 ? "+" : ""}${Math.abs(transaction.amount).toFixed(2)}
                    </p>
                    <p className="text-sm text-muted-foreground">{transaction.date}</p>
                  </div>
                </div>
              ))}
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
              {categories.map((category, index) => (
                <div key={index} className="space-y-2">
                  <div className="flex justify-between items-center">
                    <span className="text-sm font-medium">{category.name}</span>
                    <span className="text-sm font-semibold">${category.amount.toFixed(2)}</span>
                  </div>
                  <div className="w-full bg-muted rounded-full h-2 overflow-hidden">
                    <div 
                      className={`h-full ${category.color} rounded-full transition-all duration-500 ease-out`}
                      style={{ width: `${category.percentage}%` }}
                    />
                  </div>
                </div>
              ))}
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
    </div>
  );
}