
"use client";

import { useState, useEffect } from "react";
import { useStore } from "@/context/StoreContext";
import { StoreProfileForm, type StoreProfileFormValues } from "@/components/store-profile/StoreProfileForm";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { useToast } from "@/hooks/use-toast";
import { AlertCircle, Loader2 } from "lucide-react";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";

export default function StoreProfilePage() {
  const { storeProfile, updateStoreProfile, isLoading: contextIsLoading } = useStore();
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  const handleSaveChanges = async (values: StoreProfileFormValues) => {
    if (!storeProfile) return;
    setIsSubmitting(true);
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    try {
      // Ensure ID is preserved if it's part of the storeProfile object but not in form values
      const updatedProfileData = {
        ...storeProfile, // Spread existing profile to keep ID and other non-form fields
        ...values, // Spread form values
      };
      updateStoreProfile(updatedProfileData);
      toast({
        title: "Profile Updated",
        description: "Your store profile has been successfully updated.",
      });
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Update Failed",
        description: "Could not update store profile. Please try again.",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  if (!isClient || contextIsLoading) {
    return (
      <div className="space-y-6">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
            <Skeleton className="h-10 w-60" />
        </div>
        <Card>
            <CardHeader>
                <Skeleton className="h-8 w-1/2 mb-2" />
                <Skeleton className="h-4 w-3/4" />
            </CardHeader>
            <CardContent className="space-y-4">
                <Skeleton className="h-10 w-full" />
                <Skeleton className="h-10 w-full" />
                <Skeleton className="h-20 w-full" />
                <Skeleton className="h-10 w-1/3" />
            </CardContent>
        </Card>
      </div>
    );
  }

  if (!storeProfile) {
    return (
         <div className="flex flex-col items-center justify-center min-h-[calc(100vh-12rem)] p-4">
            <Alert variant="destructive" className="max-w-lg">
                <AlertCircle className="h-4 w-4" />
                <AlertTitle>Error Loading Profile</AlertTitle>
                <AlertDescription>
                Store profile data could not be loaded. Please try refreshing the page.
                </AlertDescription>
            </Alert>
        </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <h1 className="text-3xl font-bold tracking-tight">Store Profile</h1>
        {/* Save button is now part of the form */}
      </div>
      <Card className="shadow-md">
        <CardHeader>
          <CardTitle>Edit Store Details</CardTitle>
          <CardDescription>Manage your store's information, location, and appearance.</CardDescription>
        </CardHeader>
        <CardContent>
          <StoreProfileForm 
            initialData={storeProfile} 
            onSubmit={handleSaveChanges}
            isSubmitting={isSubmitting}
          />
        </CardContent>
      </Card>
    </div>
  );
}
