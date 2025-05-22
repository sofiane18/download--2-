
"use client";

import { useState, useMemo, useEffect } from "react";
import { useStore } from "@/context/StoreContext";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from "@/components/ui/alert-dialog";
import { ItemCard } from "@/components/manage-items/ItemCard";
import { ItemForm, type ItemFormValues } from "@/components/manage-items/ItemForm";
import type { StoreItem, ItemCategory } from "@/types";
import { PlusCircle, Search, ListFilter, Package, Briefcase, Star, Loader2, Info } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { Skeleton } from "@/components/ui/skeleton";
import { Alert, AlertTitle, AlertDescription } from "@/components/ui/alert";

export default function ManageItemsPage() {
  const { productsServices, addProductService, updateProductService, deleteProductService, isLoading: contextIsLoading } = useStore();
  const { toast } = useToast();

  const [isClient, setIsClient] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [categoryFilter, setCategoryFilter] = useState<ItemCategory | "All">("All");
  const [featuredFilter, setFeaturedFilter] = useState<"All" | "Featured" | "NotFeatured">("All");
  
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingItem, setEditingItem] = useState<StoreItem | null>(null);
  const [itemToDelete, setItemToDelete] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  const filteredItems = useMemo(() => {
    return productsServices
      .filter(item => {
        const searchMatch = item.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                            item.subcategory.toLowerCase().includes(searchTerm.toLowerCase()) ||
                            item.description.toLowerCase().includes(searchTerm.toLowerCase());
        const categoryMatch = categoryFilter === "All" || item.category === categoryFilter;
        const featuredMatch = featuredFilter === "All" || 
                              (featuredFilter === "Featured" && item.isFeatured) ||
                              (featuredFilter === "NotFeatured" && !item.isFeatured);
        return searchMatch && categoryMatch && featuredMatch;
      })
      .sort((a,b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
  }, [productsServices, searchTerm, categoryFilter, featuredFilter]);

  const handleFormSubmit = async (values: ItemFormValues) => {
    setIsSubmitting(true);
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));

    try {
      if (editingItem) {
        updateProductService({ ...editingItem, ...values });
        toast({ title: "Item Updated", description: `${values.title} has been successfully updated.` });
      } else {
        addProductService(values);
        toast({ title: "Item Added", description: `${values.title} has been successfully added.` });
      }
      setIsFormOpen(false);
      setEditingItem(null);
    } catch (error) {
      toast({ variant: "destructive", title: "Error", description: "Could not save the item. Please try again." });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleEditItem = (item: StoreItem) => {
    setEditingItem(item);
    setIsFormOpen(true);
  };

  const handleOpenAddNewDialog = () => {
    setEditingItem(null);
    setIsFormOpen(true);
  };

  const handleDeleteItem = async () => {
    if (!itemToDelete) return;
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 500));
    try {
      deleteProductService(itemToDelete);
      toast({ title: "Item Deleted", description: "The item has been successfully deleted." });
    } catch (error) {
      toast({ variant: "destructive", title: "Error", description: "Could not delete the item." });
    } finally {
      setItemToDelete(null);
    }
  };

  if (!isClient || contextIsLoading) {
    return (
      <div className="space-y-6">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <Skeleton className="h-10 w-72" />
          <Skeleton className="h-10 w-40" />
        </div>
        <div className="flex flex-col sm:flex-row gap-4 mb-6">
            <Skeleton className="h-10 w-full sm:w-1/2 lg:w-1/3" />
            <Skeleton className="h-10 w-full sm:w-1/4 lg:w-1/6" />
            <Skeleton className="h-10 w-full sm:w-1/4 lg:w-1/6" />
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {[1, 2, 3, 4].map(i => <Skeleton key={i} className="h-96 rounded-lg" />)}
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <h1 className="text-3xl font-bold tracking-tight">Manage Products &amp; Services</h1>
        <Button onClick={handleOpenAddNewDialog}>
          <PlusCircle className="mr-2 h-4 w-4" /> Add New Item
        </Button>
      </div>

      {/* Filters */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 p-4 border rounded-lg bg-card shadow">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search items..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10"
          />
        </div>
        <Select value={categoryFilter} onValueChange={(value) => setCategoryFilter(value as ItemCategory | "All")}>
          <SelectTrigger>
            <ListFilter className="mr-2 h-4 w-4 text-muted-foreground" />
            <SelectValue placeholder="Filter by category" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="All"><Package className="mr-2 h-4 w-4 inline-block" />All Categories</SelectItem>
            <SelectItem value="Product"><Package className="mr-2 h-4 w-4 inline-block" />Products</SelectItem>
            <SelectItem value="Service"><Briefcase className="mr-2 h-4 w-4 inline-block" />Services</SelectItem>
          </SelectContent>
        </Select>
        <Select value={featuredFilter} onValueChange={(value) => setFeaturedFilter(value as "All" | "Featured" | "NotFeatured")}>
          <SelectTrigger>
            <Star className="mr-2 h-4 w-4 text-muted-foreground" />
            <SelectValue placeholder="Filter by featured" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="All">All Items</SelectItem>
            <SelectItem value="Featured"><Star className="mr-2 h-4 w-4 inline-block text-yellow-500 fill-yellow-400" />Featured</SelectItem>
            <SelectItem value="NotFeatured"><Star className="mr-2 h-4 w-4 inline-block text-muted-foreground" />Not Featured</SelectItem>
          </SelectContent>
        </Select>
      </div>
      
      {filteredItems.length === 0 ? (
         <Alert className="mt-6">
            <Info className="h-4 w-4" />
            <AlertTitle>No Items Found</AlertTitle>
            <AlertDescription>
              No products or services match your current filters. Try adjusting your search or add a new item.
            </AlertDescription>
          </Alert>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredItems.map((item) => (
            <ItemCard
              key={item.id}
              item={item}
              onEdit={handleEditItem}
              onDelete={() => setItemToDelete(item.id)}
            />
          ))}
        </div>
      )}

      <Dialog open={isFormOpen} onOpenChange={(isOpen) => {
          if (!isOpen) {
            setEditingItem(null); // Reset editing item when dialog closes
          }
          setIsFormOpen(isOpen);
        }}>
        <DialogContent className="sm:max-w-2xl">
          <DialogHeader>
            <DialogTitle>{editingItem ? "Edit Item" : "Add New Item"}</DialogTitle>
            <DialogDescription>
              {editingItem ? "Update the details of your item." : "Fill in the details to add a new product or service."}
            </DialogDescription>
          </DialogHeader>
          <ItemForm 
            onSubmit={handleFormSubmit} 
            initialData={editingItem}
            isSubmitting={isSubmitting} 
          />
        </DialogContent>
      </Dialog>

      <AlertDialog open={!!itemToDelete} onOpenChange={(isOpen) => { if(!isOpen) setItemToDelete(null);}}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone. This will permanently delete the item.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel onClick={() => setItemToDelete(null)}>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={handleDeleteItem} disabled={isSubmitting}>
                {isSubmitting ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : null}
                Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

    </div>
  );
}
