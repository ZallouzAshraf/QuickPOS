import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Product } from "@/src/core/types/types";
import { Edit, Package, Plus, Search, Trash2 } from "lucide-react";

export const DashboardProductsComponent = () => {
  const products: Product[] = [
    {
      id: "1",
      name: "Laptop Dell XPS 13",
      category: "Électronique",
      price: 3500,
      stock: 12,
      status: "in_stock",
    },
    {
      id: "2",
      name: "iPhone 15 Pro",
      category: "Téléphones",
      price: 4200,
      stock: 5,
      status: "low_stock",
    },
    {
      id: "3",
      name: "Samsung Galaxy S24",
      category: "Téléphones",
      price: 3800,
      stock: 0,
      status: "out_of_stock",
    },
  ];

  const getStatusBadge = (status: Product["status"]) => {
    const styles = {
      in_stock: "bg-emerald-100 text-emerald-700",
      low_stock: "bg-amber-100 text-amber-700",
      out_of_stock: "bg-red-100 text-red-700",
    } as const;

    const labels = {
      in_stock: "En stock",
      low_stock: "Stock faible",
      out_of_stock: "Rupture",
    } as const;

    return (
      <span
        className={`px-3 py-1 rounded-full text-xs font-semibold ${styles[status]}`}
      >
        {labels[status]}
      </span>
    );
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
        <div className="relative flex-1 max-w-md w-full">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
          <Input
            placeholder="Rechercher un produit..."
            className="pl-12 h-12 bg-white border-slate-300 rounded-xl"
          />
        </div>
        <Button className="w-full sm:w-auto h-12 bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-600 hover:to-teal-700 text-white font-semibold rounded-xl shadow-lg shadow-emerald-500/30">
          <Plus className="w-5 h-5 mr-2" />
          Nouveau produit
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {products.map((product) => (
          <div
            key={product.id}
            className="bg-white rounded-2xl border border-slate-200 shadow-sm hover:shadow-lg transition-all overflow-hidden"
          >
            <div className="h-48 bg-gradient-to-br from-emerald-50 to-teal-50 flex items-center justify-center">
              <Package className="w-16 h-16 text-emerald-600" />
            </div>
            <div className="p-6">
              <div className="flex items-start justify-between mb-3">
                <div>
                  <h3 className="font-bold text-slate-800 mb-1">
                    {product.name}
                  </h3>
                  <p className="text-sm text-slate-500">{product.category}</p>
                </div>
                {getStatusBadge(product.status)}
              </div>
              <div className="flex items-center justify-between mb-4">
                <span className="text-2xl font-bold text-emerald-600">
                  {product.price} TND
                </span>
                <span className="text-sm text-slate-600">
                  Stock: <span className="font-semibold">{product.stock}</span>
                </span>
              </div>
              <div className="flex gap-2">
                <button className="flex-1 py-2 px-4 bg-slate-100 hover:bg-slate-200 text-slate-700 font-semibold rounded-xl transition-colors">
                  <Edit className="w-4 h-4 inline mr-1" />
                  Modifier
                </button>
                <button className="p-2 text-red-600 hover:bg-red-50 rounded-xl transition-colors">
                  <Trash2 className="w-5 h-5" />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
