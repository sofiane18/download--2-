
"use client";

import Link from "next/link";
import React, { useState, useEffect } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import type { Order } from "@/types";
import { StatusBadge } from "./StatusBadge";
import { Eye, ShieldCheck, Truck, PackageX, CreditCard } from "lucide-react"; // Added CreditCard
import { format } from 'date-fns';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { useIsMobile } from "@/hooks/use-mobile";
import { Skeleton } from "@/components/ui/skeleton";

interface OrderTableProps {
  requests: Order[];
  title: string;
}

export function PurchaseRequestTable({ requests: orders, title }: OrderTableProps) {
  const [hasMounted, setHasMounted] = useState(false);
  const isMobile = useIsMobile();

  useEffect(() => {
    setHasMounted(true);
  }, []);

  const formatDate = (dateString?: string) => {
    if (!dateString) return 'N/A';
    try {
      return format(new Date(dateString), "PPp"); 
    } catch (error) {
      return dateString; 
    }
  };

  const getActionForOrder = (order: Order) => {
    switch (order.status) {
      case "Pending":
      case "Confirmed":
        return (
          <Button asChild variant="outline" size="sm" className="w-full sm:w-auto">
            <Link href={`/verify/${order.id}`}>
              <ShieldCheck className="mr-2 h-4 w-4" />
              Verify Pickup
            </Link>
          </Button>
        );
      case "In-process":
         return (
          <Button asChild variant="outline" size="sm" className="w-full sm:w-auto">
            <Link href={`/verify/${order.id}`}>
              <Truck className="mr-2 h-4 w-4" />
              Mark Delivered
            </Link>
          </Button>
        );
      case "Picked Up":
      case "Delivered":
        return (
         <Button asChild variant="ghost" size="sm" className="w-full sm:w-auto text-accent-foreground bg-accent/80 hover:bg-accent">
           <Link href={`/verify/${order.id}`}>
             <Eye className="mr-2 h-4 w-4" />
             View Receipt
           </Link>
         </Button>
        );
      case "Cancelled":
        return (
          <Button variant="ghost" size="sm" disabled className="w-full sm:w-auto text-destructive">
            <PackageX className="mr-2 h-4 w-4" />
            Cancelled
          </Button>
        );
      default:
        return null;
    }
  };

  if (!hasMounted) {
    return (
      <Card className="shadow-lg">
        <CardHeader>
          <CardTitle>{title}</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {[1, 2, 3].map((i) => ( <Skeleton key={i} className="h-12 w-full rounded-md" /> ))}
          </div>
        </CardContent>
      </Card>
    );
  }

  if (orders.length === 0) {
    return (
      <Card className="shadow-lg">
        <CardHeader>
          <CardTitle>{title}</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground">No orders found for this filter.</p>
        </CardContent>
      </Card>
    );
  }

  if (isMobile) {
    return (
      <Card className="shadow-lg">
        <CardHeader>
          <CardTitle>{title}</CardTitle>
           {orders.length > 0 && <CardDescription>Displaying {orders.length} order(s)</CardDescription>}
        </CardHeader>
        <CardContent className="px-2 sm:px-4">
          <Accordion type="single" collapsible className="w-full space-y-3">
            {orders.map((order) => (
              <AccordionItem value={order.id} key={order.id} className="border bg-card text-card-foreground rounded-lg shadow-sm overflow-hidden">
                <AccordionTrigger className="p-3 hover:no-underline text-left w-full">
                  <div className="flex flex-col w-full space-y-1.5">
                    <div className="flex justify-between items-start w-full">
                      <h4 className="font-semibold text-base leading-tight mr-2 flex-1 truncate">{order.productName}</h4>
                      <span className="font-medium text-sm whitespace-nowrap text-primary">{order.price.toLocaleString()} DZD</span>
                    </div>
                    <div className="flex justify-between items-center w-full">
                      <p className="text-xs text-muted-foreground truncate mr-2">
                        {order.buyerName} <span className="font-mono">#{order.id.substring(0,6)}</span>
                      </p>
                      <StatusBadge status={order.status} />
                    </div>
                  </div>
                </AccordionTrigger>
                <AccordionContent className="p-3 pt-0 border-t bg-secondary/10">
                  <div className="space-y-3 mt-3">
                     <div className="flex justify-between items-center text-sm">
                      <span className="text-muted-foreground font-medium">Order ID:</span>
                      <span className="font-mono text-xs text-right">{order.id}</span>
                    </div>
                    {order.customerId && (
                      <div className="flex justify-between items-center text-sm">
                        <span className="text-muted-foreground font-medium">Customer ID:</span>
                        <span className="font-mono text-xs text-right">{order.customerId}</span>
                      </div>
                    )}
                    <div className="flex justify-between items-center text-sm">
                      <span className="text-muted-foreground font-medium">Store:</span>
                      <span className="text-right">{order.storeName}</span>
                    </div>
                     <div className="flex justify-between items-center text-sm">
                      <span className="text-muted-foreground font-medium">Payment:</span>
                      <span className="text-right">{order.paymentType}</span>
                    </div>
                    {order.paymentType === "Installment Plan" && order.installmentDetails && (
                       <div className="flex justify-between items-center text-sm">
                         <span className="text-muted-foreground font-medium">Plan:</span>
                         <span className="text-right">{order.installmentDetails.plan} ({order.installmentDetails.monthlyAmount.toLocaleString()} DZD/mo)</span>
                       </div>
                    )}
                    <div className="flex justify-between items-center text-sm">
                      <span className="text-muted-foreground font-medium">Created:</span>
                      <span className="text-right">{formatDate(order.createdAt)}</span>
                    </div>
                     {(order.status === "Picked Up" || order.status === "Delivered") && order.pickupTimestamp && (
                        <div className="flex justify-between items-center text-sm">
                            <span className="text-muted-foreground font-medium">{order.status}:</span>
                            <span className="text-right">{formatDate(order.pickupTimestamp)}</span>
                        </div>
                    )}
                    <div className="pt-2">
                      {getActionForOrder(order)}
                    </div>
                  </div>
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </CardContent>
      </Card>
    );
  }

  // Desktop Table View
  return (
    <Card className="shadow-lg">
      <CardHeader>
        <CardTitle>{title}</CardTitle>
        {orders.length > 0 && <CardDescription>Displaying {orders.length} order(s)</CardDescription>}
      </CardHeader>
      <CardContent>
        <div className="relative w-full overflow-auto">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="px-2 py-3 sm:px-4 sm:py-3">Order ID</TableHead>
                <TableHead className="px-2 py-3 sm:px-4 sm:py-3">Buyer Name</TableHead>
                <TableHead className="px-2 py-3 sm:px-4 sm:py-3">Product/Service</TableHead>
                <TableHead className="text-right px-2 py-3 sm:px-4 sm:py-3">Price (DZD)</TableHead>
                <TableHead className="px-2 py-3 sm:px-4 sm:py-3">Payment Type</TableHead>
                <TableHead className="px-2 py-3 sm:px-4 sm:py-3">Store Name</TableHead>
                <TableHead className="px-2 py-3 sm:px-4 sm:py-3">Status</TableHead>
                <TableHead className="px-2 py-3 sm:px-4 sm:py-3">Created At</TableHead>
                <TableHead className="text-center px-2 py-3 sm:px-4 sm:py-3">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {orders.map((order) => (
                <TableRow key={order.id}>
                  <TableCell className="font-mono text-xs px-2 py-3 sm:px-4 sm:py-4">#{order.id.substring(0,10)}...</TableCell>
                  <TableCell className="px-2 py-3 sm:px-4 sm:py-4">{order.buyerName}</TableCell>
                  <TableCell className="px-2 py-3 sm:px-4 sm:py-4">{order.productName}</TableCell>
                  <TableCell className="text-right font-medium px-2 py-3 sm:px-4 sm:py-4">{order.price.toLocaleString()}</TableCell>
                  <TableCell className="px-2 py-3 sm:px-4 sm:py-4">
                     <span className="flex items-center gap-1">
                       <CreditCard className="h-3.5 w-3.5 text-muted-foreground" />
                       {order.paymentType}
                     </span>
                      {order.paymentType === "Installment Plan" && order.installmentDetails && (
                        <span className="text-xs text-muted-foreground block">
                            {order.installmentDetails.plan}
                        </span>
                      )}
                  </TableCell>
                  <TableCell className="px-2 py-3 sm:px-4 sm:py-4">{order.storeName}</TableCell>
                  <TableCell className="px-2 py-3 sm:px-4 sm:py-4">
                    <StatusBadge status={order.status} />
                  </TableCell>
                  <TableCell className="px-2 py-3 sm:px-4 sm:py-4">{formatDate(order.createdAt)}</TableCell>
                  <TableCell className="text-center px-2 py-3 sm:px-4 sm:py-4">
                    {getActionForOrder(order)}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </CardContent>
    </Card>
  );
}
