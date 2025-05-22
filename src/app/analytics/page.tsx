
// src/app/analytics/page.tsx
"use client";

import { useEffect, useMemo, useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { DollarSign, ShoppingBag, Users, Star, AlertTriangle, AlertCircle, BarChartHorizontalBig } from "lucide-react";
import { useOrders } from "@/context/PurchaseRequestContext";
import { useStore } from "@/context/StoreContext";
import type { Order, StoreItem, CustomerReview } from "@/types";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Skeleton } from "@/components/ui/skeleton";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import Link from "next/link";
import { Button } from "@/components/ui/button";

// Shadcn/ui chart components (example using Bar chart)
import { Bar, BarChart, ResponsiveContainer, XAxis, YAxis, Tooltip, Legend } from 'recharts';
import { ChartConfig, ChartContainer, ChartTooltip, ChartTooltipContent, ChartLegend, ChartLegendContent } from "@/components/ui/chart";


export default function AnalyticsPage() {
  const { orders, isLoading: ordersLoading } = useOrders();
  const { productsServices, customers, isLoading: storeLoading } = useStore();
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  const analyticsData = useMemo(() => {
    if (ordersLoading || storeLoading || !isClient) {
      return {
        totalSales: 0,
        bestSellingItemName: "N/A",
        customerRepeatRate: 0,
        averageRating: "N/A",
        lowStockItems: [],
        salesByProduct: [],
      };
    }

    const completedOrders = orders.filter(o => o.status === "Delivered" || o.status === "Picked Up");

    // Total Sales
    const totalSales = completedOrders.reduce((sum, order) => sum + order.price, 0);

    // Best Selling Item
    const productCounts: { [key: string]: number } = {};
    completedOrders.forEach(order => {
      productCounts[order.productName] = (productCounts[order.productName] || 0) + 1;
    });
    let bestSellingItemName = "N/A";
    let maxCount = 0;
    for (const productName in productCounts) {
      if (productCounts[productName] > maxCount) {
        maxCount = productCounts[productName];
        bestSellingItemName = productName;
      }
    }
    
    const salesByProductData = Object.entries(productCounts).map(([name, sales]) => ({ name, sales })).sort((a,b) => b.sales - a.sales).slice(0, 5);


    // Customer Repeat Rate
    const customerOrderCounts: { [key: string]: number } = {};
    orders.forEach(order => {
      if (order.customerId) {
        customerOrderCounts[order.customerId] = (customerOrderCounts[order.customerId] || 0) + 1;
      }
    });
    const uniqueCustomers = Object.keys(customerOrderCounts).length;
    const repeatCustomers = Object.values(customerOrderCounts).filter(count => count > 1).length;
    const customerRepeatRate = uniqueCustomers > 0 ? (repeatCustomers / uniqueCustomers) * 100 : 0;

    // Average Rating
    const allReviews: CustomerReview[] = customers.flatMap(c => c.reviews);
    let averageRatingValue: string | number = "N/A";
    if (allReviews.length > 0) {
      const totalRating = allReviews.reduce((sum, review) => sum + review.rating, 0);
      averageRatingValue = (totalRating / allReviews.length).toFixed(1);
    }
    
    // Low Stock Items
    const lowStockItems = productsServices.filter(item => item.category === "Product" && item.availableStock !== undefined && item.availableStock < 10);

    return {
      totalSales,
      bestSellingItemName: bestSellingItemName !== "N/A" ? `${bestSellingItemName} (${maxCount} sales)` : "N/A",
      customerRepeatRate,
      averageRating: averageRatingValue,
      lowStockItems,
      salesByProduct: salesByProductData,
    };
  }, [orders, productsServices, customers, ordersLoading, storeLoading, isClient]);
  
  const salesChartConfig = {
    sales: {
      label: "Sales",
      color: "hsl(var(--primary))",
    },
  } satisfies ChartConfig;


  if (!isClient || ordersLoading || storeLoading) {
    return (
      <div className="space-y-6">
        <Skeleton className="h-10 w-72" />
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          {[...Array(4)].map((_, i) => <Skeleton key={i} className="h-32 rounded-lg" />)}
        </div>
        <Skeleton className="h-80 w-full rounded-lg" />
        <Skeleton className="h-40 w-full rounded-lg" />
      </div>
    );
  }

  return (
    <div className="space-y-8">
      <h1 className="text-3xl font-bold tracking-tight">Store Analytics</h1>
      
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        <Card className="shadow-md hover:shadow-lg transition-shadow">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Sales</CardTitle>
            <DollarSign className="h-5 w-5 text-primary" />
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">{analyticsData.totalSales.toLocaleString()} DZD</div>
            <p className="text-xs text-muted-foreground">Based on completed orders</p>
          </CardContent>
        </Card>
        <Card className="shadow-md hover:shadow-lg transition-shadow">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Best Selling Item</CardTitle>
            <ShoppingBag className="h-5 w-5 text-primary" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold truncate" title={analyticsData.bestSellingItemName}>{analyticsData.bestSellingItemName}</div>
            <p className="text-xs text-muted-foreground">Most frequently ordered</p>
          </CardContent>
        </Card>
        <Card className="shadow-md hover:shadow-lg transition-shadow">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Customer Repeat Rate</CardTitle>
            <Users className="h-5 w-5 text-primary" />
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">{analyticsData.customerRepeatRate.toFixed(1)}%</div>
            <p className="text-xs text-muted-foreground">Based on order history</p>
          </CardContent>
        </Card>
        <Card className="shadow-md hover:shadow-lg transition-shadow">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Average Rating</CardTitle>
            <Star className="h-5 w-5 text-yellow-500 fill-yellow-400" />
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">{analyticsData.averageRating} / 5</div>
            <p className="text-xs text-muted-foreground">From customer reviews</p>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <Card className="shadow-md hover:shadow-lg transition-shadow">
          <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <BarChartHorizontalBig className="h-6 w-6 text-primary"/>
                Top 5 Products/Services by Sales Count
              </CardTitle>
              <CardDescription>Number of times each product/service has been sold.</CardDescription>
          </CardHeader>
          <CardContent>
            {analyticsData.salesByProduct.length > 0 ? (
              <ChartContainer config={salesChartConfig} className="h-[300px] w-full">
                <BarChart accessibilityLayer data={analyticsData.salesByProduct} layout="vertical" margin={{left: 20, right: 20}}>
                  <XAxis type="number" dataKey="sales" stroke="hsl(var(--muted-foreground))" fontSize={12} tickLine={false} axisLine={false} />
                  <YAxis dataKey="name" type="category" stroke="hsl(var(--muted-foreground))" fontSize={12} tickLine={false} axisLine={false} width={150} tickFormatter={(value) => value.length > 20 ? `${value.substring(0,20)}...` : value} />
                  <ChartTooltip
                    cursor={false}
                    content={<ChartTooltipContent hideLabel />}
                  />
                   <Legend content={<ChartLegendContent />} />
                  <Bar dataKey="sales" layout="vertical" radius={4} />
                </BarChart>
              </ChartContainer>
            ) : (
              <div className="h-[300px] flex items-center justify-center bg-muted/50 rounded-md">
                  <p className="text-muted-foreground">No sales data to display chart.</p>
              </div>
            )}
          </CardContent>
        </Card>

        <Card className="shadow-md hover:shadow-lg transition-shadow">
          <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <AlertTriangle className="h-6 w-6 text-destructive" />
                Product Availability Alerts
              </CardTitle>
              <CardDescription>Products with low stock levels (less than 10 units).</CardDescription>
          </CardHeader>
          <CardContent>
            {analyticsData.lowStockItems.length > 0 ? (
                <div className="max-h-[300px] overflow-y-auto">
                    <Table>
                        <TableHeader>
                        <TableRow>
                            <TableHead>Product Name</TableHead>
                            <TableHead className="text-right">Stock</TableHead>
                            <TableHead className="text-right">Actions</TableHead>
                        </TableRow>
                        </TableHeader>
                        <TableBody>
                        {analyticsData.lowStockItems.map((item) => (
                            <TableRow key={item.id}>
                            <TableCell className="font-medium">{item.title}</TableCell>
                            <TableCell className="text-right text-destructive font-semibold">{item.availableStock}</TableCell>
                            <TableCell className="text-right">
                                <Button variant="outline" size="sm" asChild>
                                    <Link href={`/manage-items?edit=${item.id}`}>Restock</Link>
                                </Button>
                            </TableCell>
                            </TableRow>
                        ))}
                        </TableBody>
                    </Table>
                </div>
            ) : (
              <Alert>
                <AlertCircle className="h-4 w-4" />
                <AlertTitle>All Good!</AlertTitle>
                <AlertDescription>No products are currently low on stock.</AlertDescription>
              </Alert>
            )}
          </CardContent>
        </Card>
      </div>
      
       <Card className="shadow-md hover:shadow-lg transition-shadow">
        <CardHeader>
            <CardTitle>Sales Trends (Monthly/Weekly)</CardTitle>
            <CardDescription>A more detailed line chart showing sales over time will be displayed here.</CardDescription>
        </CardHeader>
        <CardContent>
            <div className="h-[300px] flex items-center justify-center bg-muted/50 rounded-md">
                <p className="text-muted-foreground">Line chart placeholder for detailed sales trends</p>
            </div>
        </CardContent>
      </Card>
    </div>
  );
}
