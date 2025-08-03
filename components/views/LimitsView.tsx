"use client";

import { Card } from "@/components/ui/card";
import { AlertTriangle } from "lucide-react";

export function LimitsView() {
  return (
    <div className="p-6 space-y-8 max-w-7xl mx-auto">
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
        <div className="flex items-center space-x-3">
          <div className="p-3 rounded-xl bg-orange-50 dark:bg-orange-950/20">
            <AlertTriangle className="w-8 h-8 text-orange-500" />
          </div>
          <div>
            <h1 className="text-3xl font-bold bg-gradient-to-r from-orange-600 to-red-600 bg-clip-text text-transparent">
              ⚠️ Limits
            </h1>
            <p className="text-muted-foreground mt-1">
              Budget limits and spending alerts coming soon
            </p>
          </div>
        </div>
      </div>

      <Card className="p-12 text-center">
        <div className="max-w-md mx-auto">
          <AlertTriangle className="w-16 h-16 mx-auto mb-4 text-muted-foreground opacity-50" />
          <h3 className="text-xl font-semibold mb-2">Limits Coming Soon</h3>
          <p className="text-muted-foreground">
            Set spending limits and receive alerts when you're approaching your budget.
          </p>
        </div>
      </Card>
    </div>
  );
}