
"use client";

import type { ReactNode } from "react";
import React, { createContext, useContext, useState, useEffect } from "react";
import type { NotificationItem } from "@/types";
import { mockNotifications } from "@/data/mockStoreData";

interface NotificationContextType {
  notifications: NotificationItem[];
  unreadCount: number;
  markAsRead: (notificationId: string) => void;
  markAllAsRead: () => void;
  addNotification: (newNotification: Omit<NotificationItem, 'id' | 'timestamp' | 'read'>) => void;
  isLoading: boolean;
}

const NotificationContext = createContext<NotificationContextType | undefined>(undefined);

export const NotificationProvider = ({ children }: { children: ReactNode }) => {
  const [notifications, setNotifications] = useState<NotificationItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simulate API call
    setTimeout(() => {
      setNotifications(mockNotifications.sort((a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime()));
      setIsLoading(false);
    }, 400);
  }, []);

  const unreadCount = notifications.filter(n => !n.read).length;

  const markAsRead = (notificationId: string) => {
    setNotifications(prev => 
      prev.map(n => n.id === notificationId ? { ...n, read: true } : n)
    );
  };

  const markAllAsRead = () => {
    setNotifications(prev => prev.map(n => ({ ...n, read: true })));
  };
  
  const addNotification = (newNotificationData: Omit<NotificationItem, 'id' | 'timestamp' | 'read'>) => {
    const newNotif: NotificationItem = {
      ...newNotificationData,
      id: `notif_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
      timestamp: new Date().toISOString(),
      read: false,
    };
    setNotifications(prev => [newNotif, ...prev].sort((a,b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime()));
  }

  return (
    <NotificationContext.Provider value={{ notifications, unreadCount, markAsRead, markAllAsRead, addNotification, isLoading }}>
      {children}
    </NotificationContext.Provider>
  );
};

export const useNotifications = () => {
  const context = useContext(NotificationContext);
  if (context === undefined) {
    throw new Error("useNotifications must be used within a NotificationProvider");
  }
  return context;
};
