"use client";

import { useState } from "react";
import { TopBar } from "./TopBar";
import { Sidebar } from "./Sidebar";
import { DashboardContent } from "./DashboardContent";
import { NavigationProvider, useNavigation } from "@/components/context/NavigationContext";
import { ExpensesView } from "@/components/views/ExpensesView";
import { AnalyticsView } from "@/components/views/AnalyticsView";
import { TransactionsView } from "@/components/views/TransactionsView";
import { GoalsView } from "@/components/views/GoalsView";
import { LimitsView } from "@/components/views/LimitsView";
import { AIAnalysisView } from "@/components/views/AIAnalysisView";

function MainContent() {
  const { currentView } = useNavigation();
  
  switch (currentView) {
    case 'dashboard':
      return <DashboardContent />;
    case 'expenses':
      return <ExpensesView />;
    case 'analytics':
      return <AnalyticsView />;
    case 'transactions':
      return <TransactionsView />;
    case 'goals':
      return <GoalsView />;
    case 'limits':
      return <LimitsView />;
    case 'ai-analysis':
      return <AIAnalysisView />;
    default:
      return <DashboardContent />;
  }
}

function DashboardLayoutInner() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const closeSidebar = () => {
    setIsSidebarOpen(false);
  };

  return (
    <div className="min-h-screen bg-background">
      {/* TopBar */}
      <TopBar onMenuToggle={toggleSidebar} isSidebarOpen={isSidebarOpen} />
      
      {/* Main Layout */}
      <div className="flex">
        {/* Sidebar */}
        <Sidebar isOpen={isSidebarOpen} onClose={closeSidebar} />
        
        {/* Main Content */}
        <main className="flex-1 lg:ml-0">
          <MainContent />
        </main>
      </div>
    </div>
  );
}

export function DashboardLayout() {
  return (
    <NavigationProvider>
      <DashboardLayoutInner />
    </NavigationProvider>
  );
}