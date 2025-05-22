
"use client";

import Image from "next/image";
import type { StoreItem } from "@/types";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Edit, Trash2, Package, Clock, DollarSign, Star, Tag } from "lucide-react";

interface ItemCardProps {
  item: StoreItem;
  onEdit: (item: StoreItem) => void;
  onDelete: (itemId: string) => void;
}

export function ItemCard({ item, onEdit, onDelete }: ItemCardProps) {
  const displayImage = item.images?.[0] || "https://placehold.co/600x400.png";
  const imageHint = item.category === "Product" ? "product photo" : "service icon";

  return (
    <Card className="flex flex-col h-full shadow-lg hover:shadow-xl transition-shadow duration-300">
      <CardHeader className="relative p-0">
        <Image
          src={displayImage}
          alt={item.title}
          width={600}
          height={400}
          className="object-cover w-full h-48 rounded-t-lg"
          data-ai-hint={imageHint}
        />
        {item.isFeatured && (
          <Badge variant="secondary" className="absolute top-2 right-2 bg-accent text-accent-foreground">
            <Star className="mr-1 h-3 w-3" /> Featured
          </Badge>
        )}
         <Badge variant="outline" className="absolute top-2 left-2 bg-background/80">
            {item.category}
        </Badge>
      </CardHeader>
      <CardContent className="p-4 flex-grow">
        <CardTitle className="text-lg mb-1 leading-tight">{item.title}</CardTitle>
        <CardDescription className="text-xs text-muted-foreground mb-2 flex items-center">
            <Tag className="mr-1.5 h-3.5 w-3.5"/> {item.subcategory}
        </CardDescription>
        
        <p className="text-sm text-muted-foreground mb-3 line-clamp-3 h-[3.75rem] overflow-hidden">
          {item.description}
        </p>

        <div className="flex items-center text-primary font-semibold text-lg mb-3">
          <DollarSign className="mr-1 h-5 w-5" /> {item.price.toLocaleString()} DZD
        </div>

        {item.category === "Product" ? (
          <div className="text-sm text-muted-foreground flex items-center">
            <Package className="mr-2 h-4 w-4" /> Stock: {item.availableStock ?? 0}
          </div>
        ) : (
          <div className="text-sm text-muted-foreground flex items-center">
            <Clock className="mr-2 h-4 w-4" /> Duration: {item.serviceDuration || "N/A"}
          </div>
        )}
      </CardContent>
      <CardFooter className="p-4 border-t">
        <Button variant="outline" size="sm" onClick={() => onEdit(item)} className="mr-2 w-full sm:w-auto">
          <Edit className="mr-2 h-4 w-4" /> Edit
        </Button>
        <Button variant="destructive" size="sm" onClick={() => onDelete(item.id)} className="w-full sm:w-auto">
          <Trash2 className="mr-2 h-4 w-4" /> Delete
        </Button>
      </CardFooter>
    </Card>
  );
}
