"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ApiService } from "@/src/core/services/apiService";
import { Product } from "@/src/core/types/types";
import { Edit, Package, Plus, Search, Trash2 } from "lucide-react";
import { useEffect, useState } from "react";
import ProductModal from "../../common/Modal/productModal";

export const DashboardProductsComponent = () => {
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [products, setProducts] = useState<Product[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalMode, setModalMode] = useState<"add" | "edit">("add");

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await ApiService.getProducts();
        setProducts(response.data);
      } catch (error) {
        console.error("Erreur lors du chargement des clients", error);
      }
    };

    fetchProducts();
  }, []);

  const handleAddProduct = () => {
    setSelectedProduct(null);
    setModalMode("add");
    setIsModalOpen(true);
  };

  const handleEditProduct = (product: Product) => {
    setSelectedProduct(product);
    setModalMode("edit");
    setIsModalOpen(true);
  };

  const handleSaveProduct = async (product: Product) => {
    try {
      if (modalMode === "add") {
        const response = await ApiService.createProduct(product);
        setProducts([...products, response.data]);
      } else {
        const response = await ApiService.updateProduct(product._id!, product);
        setProducts(
          products.map((p) => (p._id === product._id ? response.data : p))
        );
      }
    } catch (error) {
      console.error("Erreur lors de la sauvegarde du produit", error);
    }
  };

  const handleDeleteProduct = async (productId: string) => {
    if (confirm("Êtes-vous sûr de vouloir supprimer ce produit ?")) {
      try {
        await ApiService.deleteProduct(productId);
        setProducts(products?.filter((p) => p._id !== productId));
      } catch (error) {
        console.error("Erreur lors de la suppression du produit", error);
      }
    }
  };

  const getStatusBadge = (stock: number) => {
    let status: "in_stock" | "low_stock" | "out_of_stock";

    if (stock === 0) status = "out_of_stock";
    else if (stock < 20) status = "low_stock";
    else status = "in_stock";

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
        <Button
          onClick={handleAddProduct}
          className="w-full sm:w-auto cursor-pointer h-12 bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-600 hover:to-teal-700 text-white font-semibold rounded-xl shadow-lg shadow-emerald-500/30"
        >
          <Plus className="w-5 h-5 mr-2" />
          Nouveau produit
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {products?.map((product) => (
          <div
            key={product._id}
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
                {getStatusBadge(product.stock)}
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
                <button
                  onClick={() => handleEditProduct(product)}
                  className="flex-1 py-2 px-4 cursor-pointer bg-slate-100 hover:bg-slate-200 text-slate-700 font-semibold rounded-xl transition-colors"
                >
                  <Edit className="w-4 h-4 inline mr-1" />
                  Modifier
                </button>
                <button
                  onClick={() => handleDeleteProduct(product._id)}
                  className="p-2 text-red-600 cursor-pointer hover:bg-red-50 rounded-xl transition-colors"
                >
                  <Trash2 className="w-5 h-5" />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
      <ProductModal
        product={selectedProduct}
        open={isModalOpen}
        setOpen={setIsModalOpen}
        onSave={handleSaveProduct}
        mode={modalMode}
      />
    </div>
  );
};
