"use client";

import { Card } from "@/components/ui/card";
import { ArrowRightLeft } from "lucide-react";

export function TransactionsView() {
  return (
    <div className="p-6 space-y-8 max-w-7xl mx-auto">
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
        <div className="flex items-center space-x-3">
          <div className="p-3 rounded-xl bg-green-50 dark:bg-green-950/20">
            <ArrowRightLeft className="w-8 h-8 text-green-500" />
          </div>
          <div>
            <h1 className="text-3xl font-bold bg-gradient-to-r from-green-600 to-blue-600 bg-clip-text text-transparent">
              💳 Transactions
            </h1>
            <p className="text-muted-foreground mt-1">
              Complete transaction history coming soon
            </p>
          </div>
        </div>
      </div>

      <Card className="p-12 text-center">
        <div className="max-w-md mx-auto">
          <ArrowRightLeft className="w-16 h-16 mx-auto mb-4 text-muted-foreground opacity-50" />
          <h3 className="text-xl font-semibold mb-2">Transactions Coming Soon</h3>
          <p className="text-muted-foreground">
            Detailed transaction list with filters and search will be available here.
          </p>
        </div>
      </Card>
    </div>
  );
}