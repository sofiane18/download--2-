
"use client";

import type { ReactNode } from "react";
import React, { createContext, useContext, useState, useEffect } from "react";
import type { Order, OrderStatus } from "@/types"; // Updated to use Order and OrderStatus
import { mockPurchaseRequests } from "@/data/mockData"; // This now contains Order[]

interface OrderContextType {
  orders: Order[];
  updateOrderStatus: (id: string, status: OrderStatus, pickupTimestamp?: string) => void;
  getOrderById: (id: string) => Order | undefined;
  addOrder: (newOrder: Order) => void; // For future use if adding orders from admin panel
  isLoading: boolean;
}

const OrderContext = createContext<OrderContextType | undefined>(undefined);

export const OrderProvider = ({ children }: { children: ReactNode }) => {
  const [orders, setOrders] = useState<Order[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simulate API call
    setTimeout(() => {
      setOrders(mockPurchaseRequests); // mockPurchaseRequests is now mockOrders essentially
      setIsLoading(false);
    }, 500);
  }, []);

  const updateOrderStatus = (id: string, status: OrderStatus, pickupTimestamp?: string) => {
    setOrders((prevOrders) =>
      prevOrders.map((order) =>
        order.id === id ? { ...order, status, pickupTimestamp: pickupTimestamp ?? order.pickupTimestamp } : order
      )
    );
  };

  const getOrderById = (id: string) => {
    return orders.find((order) => order.id === id);
  };

  const addOrder = (newOrder: Order) => {
    setOrders((prevOrders) => [newOrder, ...prevOrders]);
  };

  return (
    <OrderContext.Provider value={{ orders, updateOrderStatus, getOrderById, addOrder, isLoading }}>
      {children}
    </OrderContext.Provider>
  );
};

export const useOrders = () => { // Renamed from usePurchaseRequests
  const context = useContext(OrderContext);
  if (context === undefined) {
    throw new Error("useOrders must be used within an OrderProvider");
  }
  return context;
};
