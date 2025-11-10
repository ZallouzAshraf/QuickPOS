export interface Client {
  id: string;
  name: string;
  email: string;
  phone: string;
  totalPurchases: number;
  lastPurchase: string;
}

export interface Product {
  id: string;
  name: string;
  category: string;
  price: number;
  stock: number;
  status: 'in_stock' | 'low_stock' | 'out_of_stock';
}

export interface Invoice {
  id: string;
  clientName: string;
  date: string;
  amount: number;
  status: 'paid' | 'pending' | 'overdue';
}

export interface Sale {
  id: string;
  product: string;
  quantity: number;
  amount: number;
  date: string;
}

export interface ProductDetails {
  id: string;
  name: string;
  price: number;
  category: string;
  stock: number;
  image?: string;
}


export type TabKey = "overview" | "clients" | "products" | "invoices" | "sales" | "settings";