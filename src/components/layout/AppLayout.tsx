
"use client";

import type { ReactNode } from "react";
import Link from "next/link";
import { 
    Home, 
    Truck, 
    Settings, 
    ShoppingCart, // For Manage Items
    Building,     // For Store Profile
    BarChart3,    // For Analytics
    Users,        // For Customers
    Bell          // For Notifications
} from "lucide-react";
import {
  SidebarProvider,
  Sidebar,
  SidebarHeader,
  SidebarContent,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarInset,
  SidebarTrigger,
} from "@/components/ui/sidebar";
import { Button } from "@/components/ui/button";
import { Toaster } from "@/components/ui/toaster";
import { usePathname } from "next/navigation";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Badge } from "@/components/ui/badge";
import { useNotifications } from "@/context/NotificationContext";
import { formatDistanceToNow } from 'date-fns';
import { ScrollArea } from "@/components/ui/scroll-area";

interface AppLayoutProps {
  children: ReactNode;
}

export function AppLayout({ children }: AppLayoutProps) {
  const pathname = usePathname();
  const { notifications, unreadCount, markAsRead, isLoading: notificationsLoading } = useNotifications();

  const navItems = [
    { href: "/", label: "Order Dashboard", icon: Home },
    { href: "/manage-items", label: "Manage Items", icon: ShoppingCart },
    { href: "/store-profile", label: "Store Profile", icon: Building },
    { href: "/analytics", label: "Analytics", icon: BarChart3 },
    { href: "/customers", label: "Customers", icon: Users },
    // { href: "/settings", label: "Settings", icon: Settings }, // Optional, if needed
  ];

  const getPageTitle = () => {
    const currentNavItem = navItems.find(item => pathname.startsWith(item.href) && (item.href === "/" ? pathname === "/" : true) );
    if (currentNavItem) return currentNavItem.label;
    if (pathname.startsWith("/verify")) return "Verify Purchase";
    return "AutoServe Store Panel";
  }

  return (
    <SidebarProvider defaultOpen>
      <Sidebar variant="sidebar" collapsible="icon">
        <SidebarHeader className="p-4 items-center flex flex-col gap-2">
            <div className="p-2 bg-primary rounded-md group-data-[collapsible=icon]:p-1">
                 <Truck className="h-8 w-8 text-primary-foreground group-data-[collapsible=icon]:h-6 group-data-[collapsible=icon]:w-6" />
            </div>
          <h1 className="text-xl font-semibold text-sidebar-foreground group-data-[collapsible=icon]:hidden">
            AutoServe Panel
          </h1>
        </SidebarHeader>
        <SidebarContent>
          <SidebarMenu>
            {navItems.map((item) => (
              <SidebarMenuItem key={item.label}>
                <Link href={item.href} passHref legacyBehavior>
                  <SidebarMenuButton
                    asChild
                    isActive={pathname === item.href || (item.href !== "/" && pathname.startsWith(item.href))}
                    tooltip={{ children: item.label, side: "right", align: "center" }}
                  >
                    <a>
                      <item.icon />
                      <span>{item.label}</span>
                    </a>
                  </SidebarMenuButton>
                </Link>
              </SidebarMenuItem>
            ))}
          </SidebarMenu>
        </SidebarContent>
      </Sidebar>
      <SidebarInset>
        <header className="sticky top-0 z-40 flex h-16 items-center gap-4 border-b bg-background/80 backdrop-blur-sm px-4 sm:px-6 shadow-sm">
            <SidebarTrigger className="md:hidden" />
            <div className="flex-1">
                <h2 className="text-xl font-semibold">
                    {getPageTitle()}
                </h2>
            </div>
            <Popover>
              <PopoverTrigger asChild>
                <Button variant="ghost" size="icon" className="relative">
                  <Bell className="h-5 w-5" />
                  {unreadCount > 0 && (
                    <Badge variant="destructive" className="absolute -top-1 -right-1 h-4 w-4 min-w-0 p-0 flex items-center justify-center text-xs">
                      {unreadCount}
                    </Badge>
                  )}
                  <span className="sr-only">Notifications</span>
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-80 p-0">
                <div className="p-4 font-medium border-b">Notifications</div>
                <ScrollArea className="h-[300px]">
                  {notificationsLoading ? (
                    <div className="p-4 text-sm text-muted-foreground">Loading notifications...</div>
                  ) : notifications.length === 0 ? (
                    <div className="p-4 text-sm text-muted-foreground">No new notifications.</div>
                  ) : (
                    <div className="divide-y">
                      {notifications.map(notif => (
                        <div key={notif.id} className={`p-3 ${!notif.read ? 'bg-accent/10' : ''}`}>
                          <p className="text-sm font-medium">{notif.message}</p>
                          <p className="text-xs text-muted-foreground">
                            {formatDistanceToNow(new Date(notif.timestamp), { addSuffix: true })}
                          </p>
                          {!notif.read && (
                            <Button variant="link" size="sm" className="p-0 h-auto text-xs mt-1" onClick={() => markAsRead(notif.id)}>
                              Mark as read
                            </Button>
                          )}
                        </div>
                      ))}
                    </div>
                  )}
                </ScrollArea>
                {notifications.length > 0 && (
                    <div className="p-2 border-t">
                        <Button variant="ghost" size="sm" className="w-full" onClick={() => { /* Implement mark all read or navigate */ }}>
                            View All / Mark All Read
                        </Button>
                    </div>
                )}
              </PopoverContent>
            </Popover>
        </header>
        <main className="flex-1 p-4 sm:p-6 overflow-auto bg-secondary/30"> {/* Added a subtle background to main */}
          {children}
          <Toaster />
        </main>
      </SidebarInset>
    </SidebarProvider>
  );
}
