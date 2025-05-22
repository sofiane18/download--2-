
import type { OrderStatus } from "@/types"; // Updated to OrderStatus
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

interface StatusBadgeProps {
  status: OrderStatus;
}

export function StatusBadge({ status }: StatusBadgeProps) {
  let variant: "default" | "secondary" | "destructive" | "outline" = "default";
  let className = "";

  switch (status) {
    case "Pending":
      variant = "outline";
      className = "border-amber-500 text-amber-600 dark:border-amber-400 dark:text-amber-400";
      break;
    case "Confirmed":
      variant = "outline";
      className = "border-sky-500 text-sky-600 dark:border-sky-400 dark:text-sky-400";
      break;
    case "In-process":
      variant = "outline";
      className = "border-blue-500 text-blue-600 dark:border-blue-400 dark:text-blue-400";
      break;
    case "Picked Up":
    case "Delivered": // Grouping Picked Up and Delivered for green status
      variant = "outline";
      className = "border-green-500 text-green-600 dark:border-green-400 dark:text-green-400";
      break;
    case "Cancelled":
      variant = "outline";
      className = "border-red-500 text-red-600 dark:border-red-400 dark:text-red-400";
      break;
    default:
      variant = "secondary";
      className = "text-muted-foreground";
  }

  return (
    <Badge variant={variant} className={cn("capitalize text-xs px-2 py-0.5", className)}>
      {status}
    </Badge>
  );
}

