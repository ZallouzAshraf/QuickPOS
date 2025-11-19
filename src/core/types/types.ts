export enum ClientType {
  INDIVIDUAL = "Particulier",
  COMPANY = "Entreprise",
}

export type Client = {
  _id: string;
  firstName: string;
  lastName: string;
  type: ClientType;
  email?: string;
  phone?: string;
  address?: string;
  city?: string;
  postalCode?: string;
  country?: string;
  discountRate: number;
  status: "active" | "inactive";
  createdAt: string;
  updatedAt?: string;
};

export interface CartItem {
  product: Product;
  quantity: number;
}

export interface Sale {
  id: string;
  items: CartItem[];
  subtotal: number;
  tax: number;
  discount: number;
  total: number;
  date: string;
  paymentMethod: "cash" | "card";
}

export interface Product {
  _id: string;
  brand: string;
  name: string;
  description: string;
  price: number;
  category: string;
  stock: number;
  createdAt: string;
  image?: string;
}

export type UserDTO = {
  _id: string;
  firstName: string;
  lastName: string;
  company?: string;
  email: string;
  password: string;
  phone?: string;
  status: "Actif" | "Inactif";
  createdAt: string;
  updatedAt?: string;
};

export type CreateUserDTO = {
  name: string;
  email: string;
  password: string;
  role: "Admin" | "Employee";
};

export type License = {
  _id: string;
  key: string;
  active: boolean;
  expirationDate: string;
  createdAt: string;
};

export type CreateLicenseDTO = {
  key: string;
  expirationDate: string;
};

export interface CreateCategoryDto {
  name: string;
  userId: string;
  items?: string[];
}

export interface UpdateCategoryDto {
  _id: string;
  name?: string;
  items?: string[];
}

export interface AddCategoryItemDto {
  itemName: string;
}

export interface UpdateCategoryItemDto {
  oldItemName: string;
  newItemName: string;
}

export type InvoiceItem = {
  productId: string;
  name: string;
  quantity: number;
  unitPrice: number;
};

export type Invoice = {
  _id: string;
  clientId?: string;
  clientName?: string;
  clientEmail?: string;
  clientPhone?: string;
  clientAddress?: string;
  items: InvoiceItem[];
  currency: string;
  taxRate?: number;
  discountRate?: number;
  paymentMethod: "cash" | "card" | "transfer" | "mobile" | "other";
  issuedAt?: string;
  dueDate?: string;
  status?: InvoiceStatus;
};

export enum InvoiceStatus {
  DRAFT = "draft",
  ISSUED = "issued",
  PAID = "paid",
  VOID = "void",
}

export type PaymentMethod = "cash" | "card" | "transfer" | "mobile" | "other";

export type UpdateLicenseDTO = Partial<Omit<License, "id" | "createdAt">>;

export type UpdateUserDTO = Partial<Omit<UserDTO, "id" | "createdAt">>;

export type TabKey =
  | "overview"
  | "clients"
  | "products"
  | "invoices"
  | "sales"
  | "settings";
