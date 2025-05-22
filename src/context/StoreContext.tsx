
"use client";

import type { ReactNode } from "react";
import React, { createContext, useContext, useState, useEffect, useCallback } from "react";
import type { StoreItem, StoreProfile, Customer, ItemCategory } from "@/types";
import { mockProductsServices, mockStoreProfile, mockCustomers } from "@/data/mockStoreData";

interface StoreContextType {
  storeProfile: StoreProfile | null;
  productsServices: StoreItem[];
  customers: Customer[];
  isLoading: boolean;
  updateStoreProfile: (updatedProfile: Partial<StoreProfile>) => void;
  addProductService: (newItem: Omit<StoreItem, 'id' | 'createdAt' | 'updatedAt'>) => void;
  updateProductService: (updatedItem: StoreItem) => void;
  deleteProductService: (itemId: string) => void;
  getItemById: (itemId: string) => StoreItem | undefined;
  getCustomerById: (customerId: string) => Customer | undefined;
}

const StoreContext = createContext<StoreContextType | undefined>(undefined);

export const StoreProvider = ({ children }: { children: ReactNode }) => {
  const [storeProfile, setStoreProfile] = useState<StoreProfile | null>(null);
  const [productsServices, setProductsServices] = useState<StoreItem[]>([]);
  const [customers, setCustomers] = useState<Customer[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simulate API call
    setTimeout(() => {
      setStoreProfile(mockStoreProfile);
      setProductsServices(mockProductsServices.sort((a,b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()));
      setCustomers(mockCustomers);
      setIsLoading(false);
    }, 300);
  }, []);

  const updateStoreProfile = useCallback((updatedProfile: Partial<StoreProfile>) => {
    setStoreProfile(prev => prev ? { ...prev, ...updatedProfile, id: prev.id } : null);
  }, []);

  const addProductService = useCallback((newItemData: Omit<StoreItem, 'id' | 'createdAt' | 'updatedAt'>) => {
    const newItem: StoreItem = {
      ...newItemData,
      id: `item_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      // Ensure conditional fields are handled
      availableStock: newItemData.category === "Product" ? (newItemData.availableStock ?? 0) : undefined,
      serviceDuration: newItemData.category === "Service" ? (newItemData.serviceDuration ?? '') : undefined,
    };
    setProductsServices(prev => [newItem, ...prev].sort((a,b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()));
  }, []);

  const updateProductService = useCallback((updatedItem: StoreItem) => {
    setProductsServices(prev =>
      prev.map(item => (item.id === updatedItem.id ? { ...updatedItem, updatedAt: new Date().toISOString() } : item))
        .sort((a,b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
    );
  }, []);

  const deleteProductService = useCallback((itemId: string) => {
    setProductsServices(prev => prev.filter(item => item.id !== itemId));
  }, []);
  
  const getItemById = useCallback((itemId: string) => {
    return productsServices.find(item => item.id === itemId);
  }, [productsServices]);

  const getCustomerById = useCallback((customerId: string) => {
    return customers.find(customer => customer.id === customerId);
  }, [customers]);

  return (
    <StoreContext.Provider value={{ 
      storeProfile, 
      productsServices,
      customers, 
      isLoading, 
      updateStoreProfile, 
      addProductService, 
      updateProductService, 
      deleteProductService,
      getItemById,
      getCustomerById
    }}>
      {children}
    </StoreContext.Provider>
  );
};

export const useStore = () => {
  const context = useContext(StoreContext);
  if (context === undefined) {
    throw new Error("useStore must be used within a StoreProvider");
  }
  return context;
};
