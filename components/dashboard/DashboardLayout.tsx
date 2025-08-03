"use client";

import { useState } from "react";
import { TopBar } from "./TopBar";
import { Sidebar } from "./Sidebar";
import { DashboardContent } from "./DashboardContent";

export function DashboardLayout() {
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
          <DashboardContent />
        </main>
      </div>
    </div>
  );
}