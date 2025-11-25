"use client";
import { ApiService } from "@/src/core/services/apiService";
import { Product } from "@/src/core/types/types";
import { useEffect, useState } from "react";
import ProductModal from "../../../common/Modal/productModal";
import { ConfirmationDialog } from "../../../common/Modal/confirmationDialog";
import { SearchHeader } from "@/src/components/common/SearchHeader";
import { ProductCard } from "./productCard";

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

  return (
    <div className="space-y-6">
      <SearchHeader
        searchPlaceholder="Rechercher un produit..."
        textButton="Nouveau produit"
        searchTerm={searchTerm}
        onSearchChange={setSearchTerm}
        onAddClient={handleAddProduct}
      />

      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4">
        {filteredProducts?.map((product) => (
          <ProductCard
            key={product._id}
            product={product}
            onEdit={handleEditProduct}
            onDelete={setProductToDelete}
          />
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
