"use client";

import { Card } from "@/components/ui/card";
import { Target } from "lucide-react";

export function GoalsView() {
  return (
    <div className="p-6 space-y-8 max-w-7xl mx-auto">
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
        <div className="flex items-center space-x-3">
          <div className="p-3 rounded-xl bg-purple-50 dark:bg-purple-950/20">
            <Target className="w-8 h-8 text-purple-500" />
          </div>
          <div>
            <h1 className="text-3xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
              🎯 Goals
            </h1>
            <p className="text-muted-foreground mt-1">
              Financial goals and progress tracking coming soon
            </p>
          </div>
        </div>
      </div>

      <Card className="p-12 text-center">
        <div className="max-w-md mx-auto">
          <Target className="w-16 h-16 mx-auto mb-4 text-muted-foreground opacity-50" />
          <h3 className="text-xl font-semibold mb-2">Goals Coming Soon</h3>
          <p className="text-muted-foreground">
            Set and track your financial goals with progress bars and milestones.
          </p>
        </div>
      </Card>
    </div>
  );
}