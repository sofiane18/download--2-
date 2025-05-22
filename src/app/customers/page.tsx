
// src/app/customers/page.tsx
"use client";

import { useState, useEffect, useMemo } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Filter, Search, Users, AlertCircle } from "lucide-react";
import { useStore } from "@/context/StoreContext";
import type { Customer } from "@/types";
import { Skeleton } from "@/components/ui/skeleton";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { format } from 'date-fns';

export default function CustomersPage() {
  const { customers, isLoading: storeLoading } = useStore();
  const [isClient, setIsClient] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    setIsClient(true);
  }, []);

  const filteredCustomers = useMemo(() => {
    return customers.filter(customer =>
      customer.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (customer.email && customer.email.toLowerCase().includes(searchTerm.toLowerCase())) ||
      (customer.phone && customer.phone.includes(searchTerm))
    ).sort((a,b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
  }, [customers, searchTerm]);

  const formatDateSafe = (dateString?: string) => {
    if (!dateString) return 'N/A';
    try {
      return format(new Date(dateString), "PP"); // Shorter date format
    } catch (error) {
      return dateString;
    }
  };

  if (!isClient || storeLoading) {
    return (
      <div className="space-y-6">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <Skeleton className="h-10 w-72" />
          <div className="flex gap-2 items-center">
            <Skeleton className="h-10 w-64" />
            <Skeleton className="h-10 w-24" />
          </div>
        </div>
        <Card>
          <CardHeader>
            <Skeleton className="h-8 w-1/2 mb-1" />
            <Skeleton className="h-4 w-3/4" />
          </CardHeader>
          <CardContent>
            <Skeleton className="h-40 w-full" />
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <h1 className="text-3xl font-bold tracking-tight flex items-center">
          <Users className="mr-3 h-8 w-8" /> Customer Management
        </h1>
        <div className="flex gap-2 items-center w-full sm:w-auto">
          <div className="relative flex-grow sm:flex-grow-0">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input 
              placeholder="Search customers..." 
              className="max-w-xs pl-10 w-full" 
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <Button variant="outline" disabled> {/* Filter functionality not implemented yet */}
            <Filter className="mr-2 h-4 w-4" /> Filter
          </Button>
        </div>
      </div>

      <Card className="shadow-md hover:shadow-lg transition-shadow">
        <CardHeader>
          <CardTitle>Customers List</CardTitle>
          <CardDescription>View customer details, order history, and reviews.</CardDescription>
        </CardHeader>
        <CardContent>
          {filteredCustomers.length === 0 ? (
            <Alert>
              <AlertCircle className="h-4 w-4" />
              <AlertTitle>No Customers Found</AlertTitle>
              <AlertDescription>
                {searchTerm ? "No customers match your search term." : "There are no customers to display."}
              </AlertDescription>
            </Alert>
          ) : (
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Name</TableHead>
                    <TableHead>Contact</TableHead>
                    <TableHead className="text-right">Total Spent (DZD)</TableHead>
                    <TableHead className="text-center">Orders</TableHead>
                    <TableHead>Last Order</TableHead>
                    <TableHead>Reviews</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredCustomers.map((customer) => (
                    <TableRow key={customer.id}>
                      <TableCell className="font-medium">{customer.name}</TableCell>
                      <TableCell>
                        {customer.email && <div className="text-xs">{customer.email}</div>}
                        {customer.phone && <div className="text-xs text-muted-foreground">{customer.phone}</div>}
                      </TableCell>
                      <TableCell className="text-right font-semibold">{customer.totalSpent.toLocaleString()}</TableCell>
                      <TableCell className="text-center">{customer.orderCount}</TableCell>
                      <TableCell>{formatDateSafe(customer.lastOrderDate)}</TableCell>
                      <TableCell className="text-center">{customer.reviews.length}</TableCell>
                      {/* Add actions button here later if needed, e.g., view details */}
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}

