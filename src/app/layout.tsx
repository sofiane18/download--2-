
import type { Metadata } from "next";
import { Inter, Roboto_Mono } from 'next/font/google';
import "./globals.css";
import { OrderProvider } from "@/context/PurchaseRequestContext"; // Will be OrderProvider
import { StoreProvider } from "@/context/StoreContext";
import { NotificationProvider } from "@/context/NotificationContext";
import { AppLayout } from "@/components/layout/AppLayout";

const inter = Inter({
  variable: '--font-inter',
  subsets: ['latin'],
});

const robotoMono = Roboto_Mono({
  variable: '--font-roboto-mono',
  subsets: ['latin'],
});

export const metadata: Metadata = {
  title: "AutoServe Dispatch - Store Panel", // Updated title
  description: "Manage automotive products, services, orders, and store analytics.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body 
        className={`${inter.variable} ${robotoMono.variable} antialiased`}
        suppressHydrationWarning={true}
      >
        <OrderProvider>
          <StoreProvider>
            <NotificationProvider>
              <AppLayout>{children}</AppLayout>
            </NotificationProvider>
          </StoreProvider>
        </OrderProvider>
      </body>
    </html>
  );
}
