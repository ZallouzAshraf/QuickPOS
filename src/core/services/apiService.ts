import { api } from "./api";
import {
  AddCategoryItemDto,
  Client,
  CreateCategoryDto,
  License,
  Product,
  Sale,
  UpdateCategoryItemDto,
  UserDTO,
} from "@/src/core/types/types";

export const ApiService = {
  // ----- AUTH -----
  login: (email: string, password: string) =>
    api.post("/auth/login", { email, password }),
  register: (data: Partial<UserDTO>) => api.post("/auth/register", data),
  logout: () => api.post("/auth/logout"),
  currentUser: () => api.get("/auth/me"),
  refreshToken: () => api.post("/auth/refresh"),

  // ----- CLIENTS -----
  getClients: () => api.get<Client[]>("/clients"),
  getClientById: (id: string) => api.get<Client>(`/clients/${id}`),
  createClient: (data: Partial<Client>) => api.post("/clients", data),
  updateClient: (id: string, data: Partial<Client>) => {
    const { _id, ...clientData } = data;
    return api.patch(`/clients/${id}`, clientData);
  },
  deleteClient: (id: string) => api.delete(`/clients/${id}`),

  // ----- PRODUCTS -----
  getProducts: () => api.get<Product[]>("/products"),
  getProductById: (id: string) => api.get<Product>(`/products/${id}`),
  createProduct: (data: Partial<Product>) => api.post("/products", data),
  updateProduct: (id: string, data: Partial<Product>) => {
    const { _id, ...productData } = data;
    return api.patch(`/products/${id}`, productData);
  },
  deleteProduct: (id: string) => api.delete(`/products/${id}`),

  // ----- SALES -----
  getSales: () => api.get<Sale[]>("/sales"),
  getSaleById: (id: string) => api.get<Sale>(`/sales/${id}`),
  createSale: (data: Partial<Sale>) => api.post("/sales", data),
  updateSale: (id: string, data: Partial<Sale>) => {
    const { _id, ...saleData } = data;
    return api.patch(`/sales/${id}`, saleData);
  },
  deleteSale: (id: string) => api.delete(`/sales/${id}`),

  // ----- USERS -----
  getUsers: () => api.get<UserDTO[]>("/users"),
  getUserById: (id: string) => api.get<UserDTO>(`/users/${id}`),
  createUser: (data: Partial<UserDTO>) => api.post("/users", data),
  updateUser: (id: string, data: Partial<UserDTO>) => {
    const { _id, ...userData } = data;
    return api.patch(`/users/${id}`, userData);
  },
  deleteUser: (id: string) => api.delete(`/users/${id}`),

  // ----- LICENSE -----
  getLicenses: () => api.get<License[]>("/license"),
  getLicenseById: (id: string) => api.get<License>(`/license/${id}`),
  createLicense: (data: Partial<License>) => api.post("/license", data),
  updateLicense: (id: string, data: Partial<License>) => {
    const { _id, ...licenseData } = data;
    return api.patch(`/license/${id}`, licenseData);
  },
  deleteLicense: (id: string) => api.delete(`/license/${id}`),

  // ----- CATEGORIES -----
  getCategories: () => api.get(`/categories`),
  getCategoryById: (id: string) => api.get(`/categories/${id}`),
  getCategoriesByUserId: (userId: string) =>
    api.get(`/categories/user/${userId}`),
  createCategory: (data: Partial<CreateCategoryDto>) =>
    api.post(`/categories`, data),
  deleteCategory: (id: string) => api.delete(`/categories/${id}`),

  // ----- CATEGORY ITEMS -----
  addCategoryItem: (userId: string, data: Partial<AddCategoryItemDto>) =>
    api.post(`/categories/user/${userId}/item`, data),

  updateCategoryItem: (
    userId: string,
    categoryName: string,
    data: Partial<UpdateCategoryItemDto>
  ) => api.put(`/categories/user/${userId}/item/${categoryName}`, data),

  deleteCategoryItem: (userId: string, categoryName: string) =>
    api.delete(`/categories/user/${userId}/item/${categoryName}`),
};
