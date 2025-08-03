"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { 
  CreditCard, 
  BarChart3, 
  ArrowRightLeft, 
  Target, 
  AlertTriangle, 
  Brain,
  ChevronRight,
  TrendingUp,
  Wallet,
  PieChart,
  Calendar
} from "lucide-react";
import { cn } from "@/lib/utils";

interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

export function Sidebar({ isOpen, onClose }: SidebarProps) {
  const [activeItem, setActiveItem] = useState("expenses");

  const navigationItems = [
    { 
      id: "expenses", 
      label: "Expenses", 
      icon: CreditCard,
      description: "Track your spending",
      color: "text-red-500",
      bgColor: "bg-red-50 dark:bg-red-950/20",
      count: 12
    },
    { 
      id: "analytics", 
      label: "Analytics", 
      icon: BarChart3,
      description: "View insights & reports",
      color: "text-blue-500",
      bgColor: "bg-blue-50 dark:bg-blue-950/20",
      trend: "+12%"
    },
    { 
      id: "transactions", 
      label: "Transactions", 
      icon: ArrowRightLeft,
      description: "All payment history",
      color: "text-green-500",
      bgColor: "bg-green-50 dark:bg-green-950/20",
      count: 347
    },
    { 
      id: "goals", 
      label: "Goals", 
      icon: Target,
      description: "Financial targets",
      color: "text-purple-500",
      bgColor: "bg-purple-50 dark:bg-purple-950/20",
      progress: "67%"
    },
    { 
      id: "limits", 
      label: "Limits", 
      icon: AlertTriangle,
      description: "Spending boundaries",
      color: "text-orange-500",
      bgColor: "bg-orange-50 dark:bg-orange-950/20",
      warning: true
    },
    { 
      id: "ai-analysis", 
      label: "AI Analysis", 
      icon: Brain,
      description: "Smart recommendations",
      color: "text-indigo-500",
      bgColor: "bg-indigo-50 dark:bg-indigo-950/20",
      badge: "NEW"
    },
  ];

  const quickStats = [
    { label: "This Month", value: "$2,847", icon: Wallet, change: "+15%" },
    { label: "Budget Left", value: "$1,153", icon: PieChart, change: "-8%" },
    { label: "Savings", value: "$5,420", icon: TrendingUp, change: "+23%" },
  ];

  return (
    <>
      {/* Backdrop for mobile */}
      {isOpen && (
        <div 
          className="fixed inset-0 bg-background/80 backdrop-blur-sm z-40 lg:hidden"
          onClick={onClose}
        />
      )}

      {/* Sidebar */}
      <aside className={cn(
        "fixed left-0 top-16 h-[calc(100vh-4rem)] w-80 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 border-r transition-transform duration-300 ease-in-out z-50 lg:translate-x-0 lg:static lg:z-0",
        isOpen ? "translate-x-0" : "-translate-x-full"
      )}>
        <div className="flex flex-col h-full p-6 space-y-6 overflow-y-auto">
          {/* Quick Stats */}
          <div className="space-y-3">
            <h3 className="text-sm font-semibold text-muted-foreground uppercase tracking-wider">
              Quick Overview
            </h3>
            <div className="grid gap-3">
              {quickStats.map((stat, index) => {
                const Icon = stat.icon;
                return (
                  <Card key={index} className="p-3 hover:shadow-md transition-all duration-200 cursor-pointer group">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-3">
                        <div className="p-2 rounded-lg bg-primary/10 group-hover:bg-primary/20 transition-colors duration-200">
                          <Icon className="w-4 h-4 text-primary" />
                        </div>
                        <div>
                          <p className="text-xs text-muted-foreground">{stat.label}</p>
                          <p className="font-semibold">{stat.value}</p>
                        </div>
                      </div>
                      <Badge 
                        variant={stat.change.startsWith('+') ? 'default' : 'secondary'}
                        className="text-xs"
                      >
                        {stat.change}
                      </Badge>
                    </div>
                  </Card>
                );
              })}
            </div>
          </div>

          {/* Navigation */}
          <div className="space-y-3">
            <h3 className="text-sm font-semibold text-muted-foreground uppercase tracking-wider">
              Navigation
            </h3>
            <nav className="space-y-2">
              {navigationItems.map((item) => {
                const Icon = item.icon;
                const isActive = activeItem === item.id;
                
                return (
                  <Button
                    key={item.id}
                    variant="ghost"
                    className={cn(
                      "w-full justify-start h-auto p-4 text-left transition-all duration-200 hover:scale-[1.02] group",
                      isActive && "bg-primary/10 border border-primary/20 shadow-sm"
                    )}
                    onClick={() => {
                      setActiveItem(item.id);
                      // On mobile, close sidebar after selection
                      if (window.innerWidth < 1024) {
                        onClose();
                      }
                    }}
                  >
                    <div className="flex items-center space-x-4 w-full">
                      <div className={cn(
                        "p-2 rounded-lg transition-all duration-200",
                        isActive ? item.bgColor : "bg-muted/50 group-hover:bg-muted",
                        "group-hover:scale-110"
                      )}>
                        <Icon className={cn(
                          "w-5 h-5 transition-colors duration-200",
                          isActive ? item.color : "text-muted-foreground group-hover:text-foreground"
                        )} />
                      </div>
                      
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center justify-between">
                          <h4 className={cn(
                            "font-medium transition-colors duration-200",
                            isActive ? "text-foreground" : "text-foreground group-hover:text-foreground"
                          )}>
                            {item.label}
                          </h4>
                          <div className="flex items-center space-x-2">
                            {item.badge && (
                              <Badge variant="default" className="text-xs px-2 py-0.5 bg-gradient-to-r from-blue-500 to-purple-500">
                                {item.badge}
                              </Badge>
                            )}
                            {item.count && (
                              <Badge variant="secondary" className="text-xs">
                                {item.count}
                              </Badge>
                            )}
                            {item.trend && (
                              <Badge variant="default" className="text-xs">
                                {item.trend}
                              </Badge>
                            )}
                            {item.progress && (
                              <Badge variant="outline" className="text-xs">
                                {item.progress}
                              </Badge>
                            )}
                            {item.warning && (
                              <div className="w-2 h-2 bg-orange-500 rounded-full animate-pulse" />
                            )}
                            <ChevronRight className={cn(
                              "w-4 h-4 transition-all duration-200",
                              isActive ? "rotate-90 text-primary" : "text-muted-foreground group-hover:text-foreground group-hover:translate-x-1"
                            )} />
                          </div>
                        </div>
                        <p className="text-xs text-muted-foreground mt-1 group-hover:text-muted-foreground">
                          {item.description}
                        </p>
                      </div>
                    </div>
                  </Button>
                );
              })}
            </nav>
          </div>

          {/* Recent Activity */}
          <div className="space-y-3">
            <h3 className="text-sm font-semibold text-muted-foreground uppercase tracking-wider">
              Recent Activity
            </h3>
            <Card className="p-4 space-y-3">
              <div className="flex items-center space-x-3">
                <div className="p-2 rounded-full bg-red-50 dark:bg-red-950/20">
                  <CreditCard className="w-4 h-4 text-red-500" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium truncate">Grocery Store</p>
                  <p className="text-xs text-muted-foreground">2 hours ago</p>
                </div>
                <p className="text-sm font-semibold text-red-500">-$89.42</p>
              </div>
              
              <div className="flex items-center space-x-3">
                <div className="p-2 rounded-full bg-green-50 dark:bg-green-950/20">
                  <TrendingUp className="w-4 h-4 text-green-500" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium truncate">Salary Deposit</p>
                  <p className="text-xs text-muted-foreground">Yesterday</p>
                </div>
                <p className="text-sm font-semibold text-green-500">+$3,200</p>
              </div>

              <div className="flex items-center space-x-3">
                <div className="p-2 rounded-full bg-blue-50 dark:bg-blue-950/20">
                  <Calendar className="w-4 h-4 text-blue-500" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium truncate">Monthly Goal</p>
                  <p className="text-xs text-muted-foreground">67% completed</p>
                </div>
                <div className="w-12 h-2 bg-muted rounded-full overflow-hidden">
                  <div className="w-2/3 h-full bg-gradient-to-r from-blue-500 to-purple-500 rounded-full" />
                </div>
              </div>
            </Card>
          </div>
        </div>
      </aside>
    </>
  );
}