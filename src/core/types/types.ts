export type Client = {
  id: string;
  name: string;
  type: "Particulier" | "Entreprise";
  email: string;
  phone: string;
  address: string;
  city: string;
  postalCode: string;
  country: string;
  discountRate: number;
  status: "Actif" | "Inactif";
  createdAt: string;
};

export interface Product {
  id: string;
  name: string;
  category: string;
  price: number;
  stock: number;
  status: "in_stock" | "low_stock" | "out_of_stock";
}

export interface Invoice {
  id: string;
  clientName: string;
  date: string;
  amount: number;
  status: "paid" | "pending" | "overdue";
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

export type User = {
  id: string;
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
  id: string;
  key: string;
  active: boolean;
  expirationDate: string;
  createdAt: string;
};

export type CreateLicenseDTO = {
  key: string;
  expirationDate: string;
};

export type UpdateLicenseDTO = Partial<Omit<License, "id" | "createdAt">>;

export type UpdateUserDTO = Partial<Omit<User, "id" | "createdAt">>;

export type TabKey =
  | "overview"
  | "clients"
  | "products"
  | "invoices"
  | "sales"
  | "settings";
