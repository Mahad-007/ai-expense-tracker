"use client";

import { Card } from "@/components/ui/card";
import { Brain } from "lucide-react";

export function AIAnalysisView() {
  return (
    <div className="p-6 space-y-8 max-w-7xl mx-auto">
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
        <div className="flex items-center space-x-3">
          <div className="p-3 rounded-xl bg-indigo-50 dark:bg-indigo-950/20">
            <Brain className="w-8 h-8 text-indigo-500" />
          </div>
          <div>
            <h1 className="text-3xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
              🤖 AI Analysis
            </h1>
            <p className="text-muted-foreground mt-1">
              AI-powered insights and recommendations coming soon
            </p>
          </div>
        </div>
      </div>

      <Card className="p-12 text-center">
        <div className="max-w-md mx-auto">
          <Brain className="w-16 h-16 mx-auto mb-4 text-muted-foreground opacity-50" />
          <h3 className="text-xl font-semibold mb-2">AI Analysis Coming Soon</h3>
          <p className="text-muted-foreground">
            Get personalized insights, spending patterns analysis, and smart recommendations.
          </p>
        </div>
      </Card>
    </div>
  );
}