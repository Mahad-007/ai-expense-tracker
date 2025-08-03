"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { ThemeSwitcher } from "@/components/theme-switcher";
import { 
  Home, 
  MessageCircle, 
  Users, 
  Settings, 
  Search,
  Bell,
  User,
  Menu,
  X
} from "lucide-react";
import { cn } from "@/lib/utils";

interface TopBarProps {
  onMenuToggle: () => void;
  isSidebarOpen: boolean;
}

export function TopBar({ onMenuToggle, isSidebarOpen }: TopBarProps) {
  const [activeTab, setActiveTab] = useState("home");

  const navigationItems = [
    { id: "home", label: "Home", icon: Home },
    { id: "contact", label: "Contact", icon: MessageCircle },
    { id: "collaboration", label: "Collaboration", icon: Users },
    { id: "settings", label: "Settings", icon: Settings },
  ];

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="flex h-16 items-center px-4 lg:px-6">
        {/* Mobile menu button */}
        <Button
          variant="ghost"
          size="sm"
          className="mr-2 lg:hidden"
          onClick={onMenuToggle}
        >
          {isSidebarOpen ? (
            <X className="h-5 w-5" />
          ) : (
            <Menu className="h-5 w-5" />
          )}
        </Button>

        {/* Logo/Brand */}
        <div className="flex items-center space-x-2 mr-6">
          <div className="w-8 h-8 bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg flex items-center justify-center">
            <span className="text-white font-bold text-sm">AI</span>
          </div>
          <span className="font-bold text-xl bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
            ExpenseTracker
          </span>
        </div>

        {/* Navigation */}
        <nav className="hidden md:flex items-center space-x-1 lg:space-x-2">
          {navigationItems.map((item) => {
            const Icon = item.icon;
            return (
              <Button
                key={item.id}
                variant={activeTab === item.id ? "default" : "ghost"}
                size="sm"
                className={cn(
                  "relative transition-all duration-200 hover:scale-105",
                  activeTab === item.id && "bg-primary text-primary-foreground shadow-md"
                )}
                onClick={() => setActiveTab(item.id)}
              >
                <Icon className="w-4 h-4 mr-2" />
                {item.label}
                {activeTab === item.id && (
                  <div className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 w-1 h-1 bg-primary rounded-full" />
                )}
              </Button>
            );
          })}
        </nav>

        {/* Right side actions */}
        <div className="flex items-center space-x-2 ml-auto">
          {/* Search */}
          <div className="hidden lg:flex relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
            <input
              type="text"
              placeholder="Search transactions..."
              className="pl-10 pr-4 py-2 text-sm bg-muted/50 border border-muted-foreground/20 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary transition-all duration-200 w-64"
            />
          </div>

          {/* Search button for mobile */}
          <Button variant="ghost" size="sm" className="lg:hidden">
            <Search className="w-4 h-4" />
          </Button>

          {/* Notifications */}
          <Button variant="ghost" size="sm" className="relative">
            <Bell className="w-4 h-4" />
            <div className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full flex items-center justify-center">
              <span className="text-xs text-white font-bold">3</span>
            </div>
          </Button>

          {/* Theme Switcher */}
          <ThemeSwitcher />

          {/* Profile */}
          <Button variant="ghost" size="sm" className="rounded-full p-2">
            <div className="w-6 h-6 bg-gradient-to-r from-green-400 to-blue-500 rounded-full flex items-center justify-center">
              <User className="w-3 h-3 text-white" />
            </div>
          </Button>
        </div>
      </div>

      {/* Mobile Navigation */}
      <div className="md:hidden border-t bg-background/95">
        <nav className="flex items-center justify-around py-2 px-4">
          {navigationItems.map((item) => {
            const Icon = item.icon;
            return (
              <Button
                key={item.id}
                variant={activeTab === item.id ? "default" : "ghost"}
                size="sm"
                className={cn(
                  "flex-col h-auto py-2 px-3 space-y-1 transition-all duration-200",
                  activeTab === item.id && "bg-primary text-primary-foreground"
                )}
                onClick={() => setActiveTab(item.id)}
              >
                <Icon className="w-4 h-4" />
                <span className="text-xs">{item.label}</span>
              </Button>
            );
          })}
        </nav>
      </div>
    </header>
  );
}