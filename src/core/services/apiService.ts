import { api } from "./api";
import { Client, License, Product, Sale, User } from "@/src/core/types/types";

export const ApiService = {
  // ----- AUTH -----
  login: (email: string, password: string) =>
    api.post("/auth/login", { email, password }),

  register: (data: { name: string; email: string; password: string }) =>
    api.post("/auth/register", data),

  // ----- CLIENTS -----
  getClients: () => api.get<Client[]>("/clients"),
  getClientById: (id: string) => api.get<Client>(`/clients/${id}`),
  createClient: (data: Partial<Client>) => api.post("/clients", data),
  updateClient: (id: string, data: Partial<Client>) =>
    api.put(`/clients/${id}`, data),
  deleteClient: (id: string) => api.delete(`/clients/${id}`),

  // ----- PRODUCTS -----
  getProducts: () => api.get<Product[]>("/products"),
  getProductById: (id: string) => api.get<Product>(`/products/${id}`),
  createProduct: (data: Partial<Product>) => api.post("/products", data),
  updateProduct: (id: string, data: Partial<Product>) =>
    api.put(`/products/${id}`, data),
  deleteProduct: (id: string) => api.delete(`/products/${id}`),

  // ----- SALES -----
  getSales: () => api.get<Sale[]>("/sales"),
  getSaleById: (id: string) => api.get<Sale>(`/sales/${id}`),
  createSale: (data: Partial<Sale>) => api.post("/sales", data),
  updateSale: (id: string, data: Partial<Sale>) =>
    api.put(`/sales/${id}`, data),
  deleteSale: (id: string) => api.delete(`/sales/${id}`),

  // ----- USERS -----
  getUsers: () => api.get<User[]>("/users"),
  getUserById: (id: string) => api.get<User>(`/users/${id}`),
  createUser: (data: Partial<User>) => api.post("/users", data),
  updateUser: (id: string, data: Partial<User>) =>
    api.put(`/users/${id}`, data),
  deleteUser: (id: string) => api.delete(`/users/${id}`),

  // ----- LICENSE -----
  getLicenses: () => api.get<License[]>("/license"),
  getLicenseById: (id: string) => api.get<License>(`/license/${id}`),
  createLicense: (data: Partial<License>) => api.post("/license", data),
  updateLicense: (id: string, data: Partial<License>) =>
    api.put(`/license/${id}`, data),
  deleteLicense: (id: string) => api.delete(`/license/${id}`),
};
