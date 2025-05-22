
"use client";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import type { Order } from "@/types"; 
import { CheckCircle, ShoppingBag, User, Hash, CalendarClock, MapPin, Tag, CreditCard, Users } from "lucide-react"; 
import { format } from 'date-fns';

interface ReceiptModalProps {
  isOpen: boolean;
  onClose: () => void;
  request: Order | null; 
}

export function ReceiptModal({ isOpen, onClose, request: order }: ReceiptModalProps) { 
  if (!order) return null;

  const formatDateSafe = (dateString?: string) => {
    if (!dateString) return 'N/A';
    try {
      return format(new Date(dateString), "PPp"); 
    } catch (error) {
      return dateString; 
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={(openStatus) => { if(!openStatus) onClose(); }}>
      <DialogContent className="sm:max-w-lg">
        <DialogHeader className="items-center text-center">
          <CheckCircle className="h-16 w-16 text-green-500 mb-4" />
          <DialogTitle className="text-2xl">Order {order.status || "Processed"}!</DialogTitle>
          <DialogDescription>
            Receipt for Order ID: {order.id}
          </DialogDescription>
        </DialogHeader>
        
        <div className="space-y-6 py-4 px-2 max-h-[60vh] overflow-y-auto">
          
          {/* Customer & Order Info */}
          <div className="rounded-lg border bg-card text-card-foreground shadow-sm p-4 space-y-3">
            <h4 className="font-semibold text-md mb-2 border-b pb-2">Order & Customer Details</h4>
            <div className="flex items-start">
              <Hash className="mr-3 h-5 w-5 text-muted-foreground flex-shrink-0 mt-1" />
              <div>
                <p className="text-sm text-muted-foreground">Order ID</p>
                <p className="font-medium font-mono text-xs break-all">{order.id}</p>
              </div>
            </div>
            <div className="flex items-start">
              <User className="mr-3 h-5 w-5 text-muted-foreground flex-shrink-0 mt-1" />
              <div>
                <p className="text-sm text-muted-foreground">Buyer Name</p>
                <p className="font-medium">{order.buyerName}</p>
              </div>
            </div>
            {order.customerId && (
              <div className="flex items-start">
                <Users className="mr-3 h-5 w-5 text-muted-foreground flex-shrink-0 mt-1" />
                <div>
                  <p className="text-sm text-muted-foreground">Customer ID</p>
                  <p className="font-medium font-mono text-xs">{order.customerId}</p>
                </div>
              </div>
            )}
             <div className="flex items-start">
              <MapPin className="mr-3 h-5 w-5 text-muted-foreground flex-shrink-0 mt-1" />
              <div>
                <p className="text-sm text-muted-foreground">Store</p>
                <p className="font-medium">{order.storeName}</p>
              </div>
            </div>
            <div className="flex items-start">
              <CalendarClock className="mr-3 h-5 w-5 text-muted-foreground flex-shrink-0 mt-1" />
              <div>
                <p className="text-sm text-muted-foreground">Order Placed</p>
                <p className="font-medium">{formatDateSafe(order.createdAt)}</p>
              </div>
            </div>
             {order.pickupTimestamp && (
                <div className="flex items-start">
                    <CalendarClock className="mr-3 h-5 w-5 text-muted-foreground flex-shrink-0 mt-1" />
                    <div>
                        <p className="text-sm text-muted-foreground">{order.status} Timestamp</p>
                        <p className="font-medium">{formatDateSafe(order.pickupTimestamp)}</p>
                    </div>
                </div>
            )}
             <div className="flex items-start">
                <Hash className="mr-3 h-5 w-5 text-muted-foreground flex-shrink-0 mt-1" />
                <div>
                    <p className="text-sm text-muted-foreground">Verification Code Used</p>
                    <p className="font-medium">{order.verificationCode}</p>
                </div>
            </div>
          </div>

          {/* Item Details */}
          <div className="rounded-lg border bg-card text-card-foreground shadow-sm p-4 space-y-3">
            <h4 className="font-semibold text-md mb-2 border-b pb-2">Item Details</h4>
            <div className="flex items-start">
              <ShoppingBag className="mr-3 h-5 w-5 text-muted-foreground flex-shrink-0 mt-1" />
              <div>
                <p className="text-sm text-muted-foreground">Product/Service</p>
                <p className="font-medium">{order.productName}</p>
              </div>
            </div>
            <div className="flex items-start">
              <Tag className="mr-3 h-5 w-5 text-muted-foreground flex-shrink-0 mt-1" />
              <div>
                <p className="text-sm text-muted-foreground">Category</p>
                <p className="font-medium">{order.itemCategory}</p>
              </div>
            </div>
          </div>
          
          {/* Payment Details */}
           <div className="rounded-lg border bg-card text-card-foreground shadow-sm p-4 space-y-3">
            <h4 className="font-semibold text-md mb-2 border-b pb-2">Payment Information</h4>
             <div className="flex items-start">
              <CreditCard className="mr-3 h-5 w-5 text-muted-foreground flex-shrink-0 mt-1" />
              <div>
                <p className="text-sm text-muted-foreground">Total Amount</p>
                <p className="font-medium text-lg">{order.price.toLocaleString()} DZD</p>
              </div>
            </div>
            <div className="flex items-start">
                <CreditCard className="mr-3 h-5 w-5 text-muted-foreground flex-shrink-0 mt-1" />
                <div>
                    <p className="text-sm text-muted-foreground">Payment Type</p>
                    <p className="font-medium">{order.paymentType}</p>
                </div>
            </div>
            {order.paymentType === "Installment Plan" && order.installmentDetails && (
              <>
                <div className="flex items-start">
                  <CalendarClock className="mr-3 h-5 w-5 text-muted-foreground flex-shrink-0 mt-1" />
                  <div>
                    <p className="text-sm text-muted-foreground">Installment Plan</p>
                    <p className="font-medium">{order.installmentDetails.plan}</p>
                  </div>
                </div>
                <div className="flex items-start">
                   <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mr-3 h-5 w-5 text-muted-foreground flex-shrink-0 mt-1"><path d="M12 2H2v10h10V2Z"/><path d="M22 12h-10v10h10V12Z"/><path d="M17 17a1 1 0 0 0 1-1v-4a1 1 0 0 0-1-1h-4a1 1 0 0 0-1 1v4a1 1 0 0 0 1 1Z"/><path d="M7 7a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1H2a1 1 0 0 0-1 1v4a1 1 0 0 0 1 1Z"/></svg> 
                  <div>
                    <p className="text-sm text-muted-foreground">Monthly Payment</p>
                    <p className="font-medium">{order.installmentDetails.monthlyAmount.toLocaleString()} DZD</p>
                  </div>
                </div>
                <div className="flex items-start">
                  <Hash className="mr-3 h-5 w-5 text-muted-foreground flex-shrink-0 mt-1" />
                  <div>
                    <p className="text-sm text-muted-foreground">Installments Paid</p>
                    <p className="font-medium">{order.installmentDetails.installmentsPaid} / {order.installmentDetails.totalInstallments}</p>
                  </div>
                </div>
                {order.installmentDetails.nextDueDate && (
                   <div className="flex items-start">
                    <CalendarClock className="mr-3 h-5 w-5 text-muted-foreground flex-shrink-0 mt-1" />
                    <div>
                        <p className="text-sm text-muted-foreground">Next Payment Due</p>
                        <p className="font-medium">{formatDateSafe(order.installmentDetails.nextDueDate)}</p>
                    </div>
                    </div>
                )}
              </>
            )}
          </div>
        </div>

        <DialogFooter className="sm:justify-center pt-4 border-t">
          <Button type="button" onClick={onClose}>
            Close
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
