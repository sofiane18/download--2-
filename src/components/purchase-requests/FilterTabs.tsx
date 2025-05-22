
"use client";

import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import type { OrderStatus } from "@/types";
import { cn } from "@/lib/utils";

interface FilterTabsProps {
  currentFilter: OrderStatus | "All";
  onFilterChange: (filter: OrderStatus | "All") => void;
}

const filterOptions: (OrderStatus | "All")[] = ["All", "Pending", "Confirmed", "In-process", "Picked Up", "Delivered", "Cancelled"];

export function FilterTabs({ currentFilter, onFilterChange }: FilterTabsProps) {
  return (
    <Tabs
      value={currentFilter}
      onValueChange={(value) => onFilterChange(value as OrderStatus | "All")}
      className="w-full" // Tabs component takes full width of its container
    >
      {/* This div handles the scrolling */}
      <div className="w-full overflow-x-auto"> 
        <TabsList
          className={cn(
            // Base ShadCN styles for TabsList.
            "inline-flex h-10 items-center rounded-md bg-muted p-1 text-muted-foreground",
            "justify-start" // Ensure tabs align to the start for proper scrolling behavior
          )}
        >
          {filterOptions.map((filter) => (
            <TabsTrigger 
              key={filter} 
              value={filter} 
              className="flex-shrink-0" // Prevent tabs from shrinking
            >
              {filter}
            </TabsTrigger>
          ))}
        </TabsList>
      </div>
    </Tabs>
  );
}
