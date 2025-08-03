"use client";

import { Card } from "@/components/ui/card";
import { BarChart3 } from "lucide-react";

export function AnalyticsView() {
  return (
    <div className="p-6 space-y-8 max-w-7xl mx-auto">
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
        <div className="flex items-center space-x-3">
          <div className="p-3 rounded-xl bg-blue-50 dark:bg-blue-950/20">
            <BarChart3 className="w-8 h-8 text-blue-500" />
          </div>
          <div>
            <h1 className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              📈 Analytics
            </h1>
            <p className="text-muted-foreground mt-1">
              Detailed insights and reports coming soon
            </p>
          </div>
        </div>
      </div>

      <Card className="p-12 text-center">
        <div className="max-w-md mx-auto">
          <BarChart3 className="w-16 h-16 mx-auto mb-4 text-muted-foreground opacity-50" />
          <h3 className="text-xl font-semibold mb-2">Analytics Coming Soon</h3>
          <p className="text-muted-foreground">
            Comprehensive analytics with charts and insights will be available here.
          </p>
        </div>
      </Card>
    </div>
  );
}