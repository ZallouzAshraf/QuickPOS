import { TrendingUp, Users, Package, FileText, ShoppingCart, Settings } from "lucide-react";


export const MENU_ITEMS = [
  { id: "overview", label: "Vue d'ensemble", icon: TrendingUp },
  { id: "clients", label: "Clients", icon: Users },
  { id: "products", label: "Produits", icon: Package },
  { id: "invoices", label: "Factures", icon: FileText },
  { id: "sales", label: "Point de Vente", icon: ShoppingCart },
  { id: "settings", label: "Paramètres", icon: Settings },
] as const;

 
