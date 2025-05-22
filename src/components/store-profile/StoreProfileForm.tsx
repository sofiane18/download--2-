
"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import type { StoreProfile, StoreCategory } from "@/types";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Save, Loader2 } from "lucide-react";

const storeProfileSchema = z.object({
  name: z.string().min(3, "Store name must be at least 3 characters."),
  phone: z.string().min(8, "Phone number seems too short."),
  workingHours: z.string().min(5, "Working hours description is required."),
  storeCategory: z.enum(["Car Parts", "Car Services", "Both"], { required_error: "Store category is required." }),
  bio: z.string().min(10, "Bio should be at least 10 characters.").max(500, "Bio should not exceed 500 characters."),
  logoUrl: z.string().url({ message: "Please enter a valid URL for the logo." }).optional().or(z.literal('')),
  locationAddress: z.string().min(10, "Address is required."),
  mapCoordinates: z.string().optional().or(z.literal('')), // e.g., "36.7753, 3.0590"
  deliveryZones: z.string().optional().transform(val => val ? val.split(',').map(s => s.trim()).filter(s => s.length > 0) : []),
  simulatedProximityVisible: z.boolean().default(false),
});

export type StoreProfileFormValues = z.infer<typeof storeProfileSchema>;

interface StoreProfileFormProps {
  onSubmit: (values: StoreProfileFormValues) => Promise<void>;
  initialData: StoreProfile;
  isSubmitting?: boolean;
}

export function StoreProfileForm({ onSubmit, initialData, isSubmitting }: StoreProfileFormProps) {
  const form = useForm<StoreProfileFormValues>({
    resolver: zodResolver(storeProfileSchema),
    defaultValues: {
      name: initialData.name || "",
      phone: initialData.phone || "",
      workingHours: initialData.workingHours || "",
      storeCategory: initialData.storeCategory || undefined,
      bio: initialData.bio || "",
      logoUrl: initialData.logoUrl || "",
      locationAddress: initialData.locationAddress || "",
      mapCoordinates: initialData.mapCoordinates || "",
      deliveryZones: initialData.deliveryZones?.join(', ') || "",
      simulatedProximityVisible: initialData.simulatedProximityVisible || false,
    },
  });

  const handleFormSubmit = async (values: StoreProfileFormValues) => {
    await onSubmit(values);
    // form.reset(values); // Optionally reset form to new values if needed after successful submission
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(handleFormSubmit)} className="space-y-8">
        <ScrollArea className="h-[calc(100vh-20rem)] pr-3"> {/* Adjust height as needed */}
          <div className="space-y-6 p-1">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Store Name</FormLabel>
                  <FormControl>
                    <Input placeholder="e.g., AutoServe Central" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="phone"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Phone Number</FormLabel>
                  <FormControl>
                    <Input placeholder="+213 XXX XX XX XX" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="workingHours"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Working Hours</FormLabel>
                  <FormControl>
                    <Textarea placeholder="e.g., Sat-Thu: 9 AM - 6 PM" {...field} rows={3} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="storeCategory"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Store Category</FormLabel>
                  <Select onValueChange={field.onChange} defaultValue={field.value}>
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select store category" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="Car Parts">Car Parts</SelectItem>
                      <SelectItem value="Car Services">Car Services</SelectItem>
                      <SelectItem value="Both">Both (Parts & Services)</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="bio"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Store Bio</FormLabel>
                  <FormControl>
                    <Textarea placeholder="Brief description of your store..." {...field} rows={4} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="logoUrl"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Logo URL</FormLabel>
                  <FormControl>
                    <Input type="url" placeholder="https://example.com/logo.png" {...field} />
                  </FormControl>
                  <FormDescription>Link to your store's logo image.</FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="locationAddress"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Full Address</FormLabel>
                  <FormControl>
                    <Textarea placeholder="Street, City, Postal Code, Country" {...field} rows={3} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            <FormField
              control={form.control}
              name="mapCoordinates"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Map Coordinates (Latitude, Longitude)</FormLabel>
                  <FormControl>
                    <Input placeholder="e.g., 36.7753, 3.0590" {...field} />
                  </FormControl>
                   <FormDescription>Used for map display. Get from Google Maps.</FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="deliveryZones"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Delivery Zones</FormLabel>
                  <FormControl>
                    <Input placeholder="Alger Centre, Hydra, El Biar" 
                           {...field} 
                           value={Array.isArray(field.value) ? field.value.join(', ') : field.value || ''}
                           onChange={(e) => field.onChange(e.target.value.split(',').map(s => s.trim()))} 
                    />
                  </FormControl>
                  <FormDescription>Enter comma-separated delivery zone names.</FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="simulatedProximityVisible"
              render={({ field }) => (
                <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4 shadow-sm">
                  <FormControl>
                    <Checkbox
                      checked={field.value}
                      onCheckedChange={field.onChange}
                    />
                  </FormControl>
                  <div className="space-y-1 leading-none">
                    <FormLabel>
                      Simulate Proximity Visibility
                    </FormLabel>
                    <FormDescription>
                      If enabled, this store will appear as "nearby" in simulations.
                    </FormDescription>
                  </div>
                </FormItem>
              )}
            />
          </div>
        </ScrollArea>
        <div className="pt-6 border-t">
          <Button type="submit" disabled={isSubmitting} className="w-full sm:w-auto">
            {isSubmitting ? (
              <><Loader2 className="mr-2 h-4 w-4 animate-spin" /> Saving...</>
            ) : (
              <><Save className="mr-2 h-4 w-4" /> Save Changes</>
            )}
          </Button>
        </div>
      </form>
    </Form>
  );
}
