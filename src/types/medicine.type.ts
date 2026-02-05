export type Review = {
  id: string;
  rating: number;
  comment: string;
  user: {
    id: string;
    name: string;
  };
  createdAt: string;
};

export type Product = {
  id: string;
  name: string;
  description: string;
  price: number;
  stock: number;
  image?: string;
  categoryId: string;
  sellerId: string;
  createdAt: string;
  updatedAt: string;
  category: {
    id: string;
    name: string;
  };
  seller: {
    id: string;
    name: string;
    email: string;
  };
  reviews?: Review[];
};

export type ApiResponse<T> = {
  data: T | null;
  error: { message: string } | null;
};
// /types/session.ts
import { Roles } from "@/constant/roles";

export interface SessionUser {
  id: string;
  name: string;
  email: string;
  role?: Roles; 
  emailVerified: boolean;
  image?: string | null;
}
