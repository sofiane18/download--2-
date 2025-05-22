
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
import type { StoreItem, ItemCategory } from "@/types";
import { ScrollArea } from "@/components/ui/scroll-area";

const itemFormSchema = z.object({
  title: z.string().min(3, "Title must be at least 3 characters long."),
  category: z.enum(["Product", "Service"], { required_error: "Category is required." }),
  subcategory: z.string().min(2, "Subcategory is required."),
  price: z.coerce.number().positive("Price must be a positive number."),
  description: z.string().min(10, "Description must be at least 10 characters long."),
  images: z.string().optional().transform(val => val ? val.split(',').map(s => s.trim()).filter(s => s.length > 0) : []), // Comma-separated URLs
  availableStock: z.coerce.number().int().nonnegative("Stock must be a non-negative integer.").optional(),
  serviceDuration: z.string().optional(),
  isFeatured: z.boolean().default(false),
}).refine(data => {
  if (data.category === "Product" && (data.availableStock === undefined || data.availableStock === null)) {
    return false;
  }
  return true;
}, {
  message: "Available stock is required for Products.",
  path: ["availableStock"],
}).refine(data => {
  if (data.category === "Service" && (!data.serviceDuration || data.serviceDuration.trim() === "")) {
    return false;
  }
  return true;
}, {
  message: "Service duration is required for Services.",
  path: ["serviceDuration"],
});


export type ItemFormValues = z.infer<typeof itemFormSchema>;

interface ItemFormProps {
  onSubmit: (values: ItemFormValues) => void;
  initialData?: StoreItem | null;
  isSubmitting?: boolean;
}

export function ItemForm({ onSubmit, initialData, isSubmitting }: ItemFormProps) {
  const form = useForm<ItemFormValues>({
    resolver: zodResolver(itemFormSchema),
    defaultValues: {
      title: initialData?.title || "",
      category: initialData?.category || undefined,
      subcategory: initialData?.subcategory || "",
      price: initialData?.price || 0,
      description: initialData?.description || "",
      images: initialData?.images || [],
      availableStock: initialData?.category === "Product" ? initialData?.availableStock : undefined,
      serviceDuration: initialData?.category === "Service" ? initialData?.serviceDuration : undefined,
      isFeatured: initialData?.isFeatured || false,
    },
  });

  const selectedCategory = form.watch("category");

  const handleSubmit = (values: ItemFormValues) => {
    const processedValues = {
        ...values,
        availableStock: values.category === 'Product' ? values.availableStock : undefined,
        serviceDuration: values.category === 'Service' ? values.serviceDuration : undefined,
    };
    onSubmit(processedValues);
  };
  

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-6">
        <ScrollArea className="h-[60vh] pr-3">
          <div className="space-y-6 p-1">
            <FormField
              control={form.control}
              name="title"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Title</FormLabel>
                  <FormControl>
                    <Input placeholder="e.g., Premium Engine Oil" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="category"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Category</FormLabel>
                  <Select onValueChange={field.onChange} defaultValue={field.value}>
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select a category" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="Product">Product</SelectItem>
                      <SelectItem value="Service">Service</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="subcategory"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Subcategory</FormLabel>
                  <FormControl>
                    <Input placeholder="e.g., Engine Lubricants, Routine Maintenance" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="price"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Price (DZD)</FormLabel>
                  <FormControl>
                    <Input type="number" placeholder="e.g., 5000" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Description</FormLabel>
                  <FormControl>
                    <Textarea placeholder="Detailed description of the item..." {...field} rows={4} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            <FormField
              control={form.control}
              name="images"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Image URLs</FormLabel>
                  <FormControl>
                    {/* For simplicity, using a text input for comma-separated URLs */}
                    <Input placeholder="url1.jpg, url2.png" {...field} 
                      value={Array.isArray(field.value) ? field.value.join(', ') : field.value || ''}
                      onChange={(e) => field.onChange(e.target.value.split(',').map(s => s.trim()))} 
                    />
                  </FormControl>
                  <FormDescription>Enter comma-separated image URLs.</FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />


            {selectedCategory === "Product" && (
              <FormField
                control={form.control}
                name="availableStock"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Available Stock</FormLabel>
                    <FormControl>
                      <Input type="number" placeholder="e.g., 50" {...field} value={field.value ?? ''}/>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            )}

            {selectedCategory === "Service" && (
              <FormField
                control={form.control}
                name="serviceDuration"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Service Duration</FormLabel>
                    <FormControl>
                      <Input placeholder="e.g., Approx. 1 hour" {...field} value={field.value ?? ''}/>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            )}

            <FormField
              control={form.control}
              name="isFeatured"
              render={({ field }) => (
                <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4 shadow">
                  <FormControl>
                    <Checkbox
                      checked={field.value}
                      onCheckedChange={field.onChange}
                    />
                  </FormControl>
                  <div className="space-y-1 leading-none">
                    <FormLabel>
                      Mark as Featured
                    </FormLabel>
                    <FormDescription>
                      Featured items may be highlighted in the store.
                    </FormDescription>
                  </div>
                </FormItem>
              )}
            />
          </div>
        </ScrollArea>
        <div className="pt-4 border-t">
            <Button type="submit" disabled={isSubmitting} className="w-full sm:w-auto">
            {isSubmitting ? "Saving..." : (initialData ? "Save Changes" : "Add Item")}
            </Button>
        </div>
      </form>
    </Form>
  );
}
