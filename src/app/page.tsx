
"use client";

import { useState, useMemo } from "react";
import { useOrders } from "@/context/PurchaseRequestContext"; // Updated to useOrders
import { FilterTabs } from "@/components/purchase-requests/FilterTabs"; // Will rename/update this component later
import { PurchaseRequestTable } from "@/components/purchase-requests/PurchaseRequestTable"; // Will rename/update this component later
import type { OrderStatus } from "@/types"; // Updated type
import { Skeleton } from "@/components/ui/skeleton";
import { AlertCircle } from "lucide-react";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";

// This page now serves as the Order Dashboard
export default function OrderDashboardPage() {
  const { orders, isLoading } = useOrders(); // Using renamed hook
  const [currentFilter, setCurrentFilter] = useState<OrderStatus | "All">("All");

  const filteredOrders = useMemo(() => {
    if (currentFilter === "All") {
      return orders;
    }
    return orders.filter((req) => req.status === currentFilter);
  }, [orders, currentFilter]);
  
  const sortedOrders = useMemo(() => {
    return [...filteredOrders].sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
  }, [filteredOrders]);


  if (isLoading) {
    return (
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <h1 className="text-3xl font-bold tracking-tight">Order Dashboard</h1>
          <Skeleton className="h-10 w-72" /> {/* Skeleton for FilterTabs */}
        </div>
        <Skeleton className="h-[400px] w-full rounded-lg" /> {/* Skeleton for Table */}
      </div>
    );
  }
  
  if (!orders || orders.length === 0 && currentFilter === "All") {
    return (
      <div className="space-y-6">
        <h1 className="text-3xl font-bold tracking-tight">Order Dashboard</h1>
        <Alert>
          <AlertCircle className="h-4 w-4" />
          <AlertTitle>No Orders Yet</AlertTitle>
          <AlertDescription>
            There are no orders to display at the moment. New orders will appear here.
          </AlertDescription>
        </Alert>
      </div>
    )
  }


  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <h1 className="text-3xl font-bold tracking-tight">Order Dashboard</h1>
        {/* FilterTabs might need adjustment for new OrderStatus values */}
        <FilterTabs currentFilter={currentFilter} onFilterChange={setCurrentFilter} /> 
      </div>
      {/* PurchaseRequestTable will be updated to OrderTable or similar */}
      <PurchaseRequestTable requests={sortedOrders} title={`${currentFilter} Orders`} />
    </div>
  );
}
