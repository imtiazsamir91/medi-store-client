import Link from "next/link";
import Image from "next/image";
import {  Eye, MessageCircle } from "lucide-react";

import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import { Product } from "@/types";
import { Badge } from "@/components/ui/badge";


type MedicineCardProps = {
  product: Product;
};

export default function MedicineCard({ product }: MedicineCardProps) {
  return (
    <Card className="h-full overflow-hidden shadow-md transition-transform duration-300 hover:scale-105">
      {/* Thumbnail placeholder */}
      <div className="relative h-56 w-full overflow-hidden bg-muted text-muted-foreground flex items-center justify-center">
        <span>No Image</span>
      </div>

      <CardHeader>
        <CardTitle className="line-clamp-2 text-lg font-bold">
          {product.name}
        </CardTitle>
      </CardHeader>

      <CardContent>
        <p className="text-sm text-muted-foreground line-clamp-3">
          {product.description}
        </p>

        <p className="mt-2 font-semibold text-primary">${product.price}</p>

        <Badge variant="secondary" className="mt-2 text-xs">
          {product.category.name}
        </Badge>
      </CardContent>

      <CardFooter className="flex justify-between text-sm text-muted-foreground">
        <span>Stock: {product.stock}</span>
        <span>Seller: {product.seller.name}</span>
      </CardFooter>
    </Card>
  );
}
