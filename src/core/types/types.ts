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

export interface Invoice {
  _id: string;
  clientName: string;
  date: string;
  amount: number;
  status: "paid" | "pending" | "overdue";
}

export interface Sale {
  _id: string;
  product: string;
  quantity: number;
  amount: number;
  date: string;
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

export type User = {
  _id: string;
  name: string;
  email: string;
  role: "Admin" | "Employee";
  status: "Actif" | "Inactif";
  createdAt: string;
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

export type UpdateLicenseDTO = Partial<Omit<License, "id" | "createdAt">>;

export type UpdateUserDTO = Partial<Omit<User, "id" | "createdAt">>;

export type TabKey =
  | "overview"
  | "clients"
  | "products"
  | "invoices"
  | "sales"
  | "settings";
