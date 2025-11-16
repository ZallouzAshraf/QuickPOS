"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ApiService } from "@/src/core/services/apiService";
import { Product } from "@/src/core/types/types";
import {
  Edit,
  Package,
  Plus,
  Search,
  Trash2,
  Eye,
  ShoppingCart,
} from "lucide-react";
import { useEffect, useState } from "react";
import ProductModal from "../../common/Modal/productModal";
import Image from "next/image";
import { ConfirmationDialog } from "../../common/Modal/confirmationDialog";

export const DashboardProductsComponent = () => {
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [products, setProducts] = useState<Product[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalMode, setModalMode] = useState<"add" | "edit">("add");
  const [searchTerm, setSearchTerm] = useState("");
  const [productToDelete, setProductToDelete] = useState<Product | null>(null);
  const filteredProducts = products.filter(
    (product) =>
      product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      product.brand.toLowerCase().includes(searchTerm.toLowerCase()) ||
      product.category.toLowerCase().includes(searchTerm.toLowerCase())
  );

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

  const handleSaveProduct = async (product: Partial<Product>) => {
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

  const handleDeleteProduct = async () => {
    if (!productToDelete?._id) return;

    try {
      await ApiService.deleteProduct(productToDelete._id);
      setProducts(products.filter((p) => p._id !== productToDelete._id));
    } catch (error) {
      console.error("Erreur lors de la suppression du produit", error);
    } finally {
      setProductToDelete(null);
    }
  };

  const getStatusBadge = (stock: number) => {
    let status: "in_stock" | "low_stock" | "out_of_stock";

    if (stock === 0) status = "out_of_stock";
    else if (stock < 20) status = "low_stock";
    else status = "in_stock";

    const styles = {
      in_stock:
        "bg-emerald-500/10 text-emerald-600 border border-emerald-500/20",
      low_stock: "bg-amber-500/10 text-amber-600 border border-amber-500/20",
      out_of_stock: "bg-red-500/10 text-red-600 border border-red-500/20",
    } as const;

    const labels = {
      in_stock: "En stock",
      low_stock: "Stock faible",
      out_of_stock: "Rupture",
    } as const;

    return (
      <span
        className={`px-2.5 py-1 rounded-lg text-[10px] font-bold uppercase tracking-wide ${styles[status]}`}
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
            className="pl-12 h-11 bg-white/80 backdrop-blur-sm border-slate-200 rounded-xl focus:ring-2 focus:ring-emerald-500/20"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <Button
          onClick={handleAddProduct}
          className="w-full sm:w-auto cursor-pointer h-11 bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700 text-white font-semibold rounded-xl shadow-lg shadow-emerald-500/25 transition-all hover:shadow-xl"
        >
          <Plus className="w-5 h-5 mr-2" />
          Nouveau produit
        </Button>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4">
        {filteredProducts?.map((product) => (
          <div
            key={product._id}
            className="group relative bg-gradient-to-br from-white to-slate-50/50 rounded-2xl border border-slate-200/60 shadow-sm hover:shadow-xl hover:border-slate-300 transition-all duration-300 overflow-hidden"
          >
            <div className="relative h-40 bg-gradient-to-br from-slate-100 to-slate-200/50 overflow-hidden">
              {product.image ? (
                <Image
                  src={product.image}
                  alt={product.name}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center">
                  <Package className="w-12 h-12 text-slate-400" />
                </div>
              )}

              <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center gap-2">
                <button
                  onClick={() => handleEditProduct(product)}
                  className="p-2 bg-white/95 hover:bg-white cursor-pointer text-slate-700 rounded-lg transition-all transform hover:scale-110"
                >
                  <Edit className="w-4 h-4" />
                </button>
                <button
                  onClick={() => setProductToDelete(product)}
                  className="p-2 bg-white/95 hover:bg-white cursor-pointer text-red-600 rounded-lg transition-all transform hover:scale-110"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>

              <div className="absolute top-2 right-2">
                {getStatusBadge(product.stock)}
              </div>
            </div>

            <div className="p-3 space-y-2">
              <div>
                <h3
                  className="font-bold text-sm text-slate-800 line-clamp-1 mb-0.5 text-ellipsis"
                  title={product.name}
                >
                  {product.name}
                </h3>
                <p className="text-[11px] text-slate-500 font-medium uppercase tracking-wide">
                  {product.brand}
                </p>
              </div>

              <div className="flex items-center justify-between pt-1">
                <div>
                  <p className="text-xs text-slate-500 font-medium">Prix</p>
                  <p className="text-lg font-bold text-emerald-600">
                    {product.price}
                    <span className="text-xs ml-0.5">TND</span>
                  </p>
                </div>
                <div className="text-right">
                  <p className="text-xs text-slate-500 font-medium">Stock</p>
                  <p className="text-sm font-bold text-slate-700">
                    {product.stock}
                  </p>
                </div>
              </div>
              <div className="pt-1">
                <span className="inline-block px-2 py-1 bg-slate-100 text-slate-600 text-[10px] font-semibold rounded-md">
                  {product.category}
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>

      <ConfirmationDialog
        open={!!productToDelete}
        onClose={() => setProductToDelete(null)}
        title="Supprimer le prduit ?"
        description={
          <>
            Cette action est irréversible. Voulez-vous vraiment supprimer{" "}
            <strong>{productToDelete?.name}</strong> ?
          </>
        }
        confirmText="Supprimer"
        confirmClassName="bg-red-600 hover:bg-red-700 text-white"
        onConfirm={handleDeleteProduct}
      />

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
