
"use client";

import { useEffect, useState } from "react";
import { useRouter, useParams } from "next/navigation";
import { useOrders } from "@/context/PurchaseRequestContext"; // Updated to useOrders
import { VerificationForm } from "@/components/verification/VerificationForm";
import { ReceiptModal } from "@/components/verification/ReceiptModal";
import { useToast } from "@/hooks/use-toast";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Loader2 } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import type { Order } from "@/types"; // Updated to Order
import { Skeleton } from "@/components/ui/skeleton";

export default function VerificationPage() {
  const router = useRouter();
  const params = useParams();
  const { id } = params;
  const { getOrderById, updateOrderStatus, isLoading: contextLoading } = useOrders(); // Using renamed hooks
  const { toast } = useToast();

  const [order, setOrder] = useState<Order | undefined>(undefined); // Renamed request to order
  const [isVerifying, setIsVerifying] = useState(false);
  const [showReceipt, setShowReceipt] = useState(false);
  const [pageLoading, setPageLoading] = useState(true);

  useEffect(() => {
    if (!contextLoading && id) {
      const foundOrder = getOrderById(id as string);
      setOrder(foundOrder);
      if(foundOrder?.status === "Picked Up" || foundOrder?.status === "Delivered"){ // Also show receipt if delivered
        setShowReceipt(true); 
      }
    }
    setPageLoading(contextLoading);
  }, [id, getOrderById, contextLoading]);


  const handleVerification = (code: string) => {
    if (!order) return;

    setIsVerifying(true);
    // Simulate API call for verification
    setTimeout(() => {
      if (code === order.verificationCode) {
        const pickupTime = new Date().toISOString(); // Using ISOString for consistency
        // Assuming "Picked Up" is the status upon verification. Could be "Delivered" based on flow.
        updateOrderStatus(order.id, "Picked Up", pickupTime); 
        setOrder(prev => prev ? {...prev, status: "Picked Up", pickupTimestamp: pickupTime} : undefined);
        toast({
          title: "Verification Successful",
          description: `${order.productName} marked as Picked Up.`,
        });
        setShowReceipt(true);
      } else {
        toast({
          title: "Verification Failed",
          description: "The entered code is incorrect. Please try again.",
          variant: "destructive",
        });
      }
      setIsVerifying(false);
    }, 1000);
  };

  if (pageLoading) {
     return (
      <div className="flex flex-col items-center justify-center min-h-[calc(100vh-12rem)] p-4">
        <Loader2 className="h-12 w-12 animate-spin text-primary mb-4" />
        <p className="text-muted-foreground">Loading order details...</p>
      </div>
    );
  }

  if (!order) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[calc(100vh-12rem)] p-4 text-center">
        <Card className="w-full max-w-md">
            <CardHeader>
                <CardTitle>Order Not Found</CardTitle>
            </CardHeader>
            <CardContent>
                <p className="text-muted-foreground mb-4">The order could not be found. It might have been deleted or the ID is incorrect.</p>
                <Button onClick={() => router.push("/")}>
                    <ArrowLeft className="mr-2 h-4 w-4" /> Go Back to Dashboard
                </Button>
            </CardContent>
        </Card>
      </div>
    );
  }
  
  if ((order.status === "Picked Up" || order.status === "Delivered") && !showReceipt) {
     setShowReceipt(true);
  }


  return (
    <div className="flex flex-col items-center justify-center min-h-[calc(100vh-12rem)] p-4">
      <Button variant="outline" onClick={() => router.push("/")} className="absolute top-20 left-6 sm:top-24 sm:left-10">
        <ArrowLeft className="mr-2 h-4 w-4" /> Back to Dashboard
      </Button>
      
      {!showReceipt && order.status !== "Picked Up" && order.status !== "Delivered" ? ( // Ensure form doesn't show if already picked up/delivered
        <VerificationForm 
            correctCode={order.verificationCode} 
            onVerify={handleVerification}
            isVerifying={isVerifying}
        />
      ) : (
         <Card className="w-full max-w-md text-center">
            <CardHeader>
                <CardTitle className="text-2xl">Item Processed</CardTitle>
                <CardDescription>This item has already been {order.status.toLowerCase()}.</CardDescription>
            </CardHeader>
            <CardContent>
                <Button onClick={() => setShowReceipt(true)}>View Receipt</Button>
            </CardContent>
         </Card>
      )}

      <ReceiptModal
        isOpen={showReceipt}
        onClose={() => {
            setShowReceipt(false);
        }}
        request={order} // Prop name is request, but passing order
      />
    </div>
  );
}
