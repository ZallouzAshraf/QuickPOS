"use client";

import { useState, useMemo, useEffect } from "react";
import {
  ShoppingCart,
  Search,
  X,
  Percent,
  FileText,
  Printer,
  CreditCard,
  Banknote,
  Grid3x3,
  List,
} from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { ProductCard } from "./ProductCardComponent/ProductCardComponent";
import { CartItemComponent } from "./CartItemComponent/CartItemComponent";
import { useAppContext } from "@/src/core/context/AppContext";
import { CartItem, Product, Sale } from "@/src/core/types/types";
import { ApiService } from "@/src/core/services/apiService";

export default function DashboardSalesComponent() {
  const [cart, setCart] = useState<CartItem[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  const [discountPercent, setDiscountPercent] = useState(0);
  const [showPaymentModal, setShowPaymentModal] = useState(false);
  const [salesHistory, setSalesHistory] = useState<Sale[]>([]);
  const { isSalesMode } = useAppContext();
  const [products, setProducts] = useState<Product[]>([]);
  const [clientInfo, setClientInfo] = useState<{
    firstName: string;
    lastName: string;
  }>({ firstName: "", lastName: "" });
  const [showClientModal, setShowClientModal] = useState(false);
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState<
    "cash" | "card" | null
  >(null);

  const categories = useMemo(() => {
    const cats = ["all", ...new Set(products.map((p) => p.category))];
    return cats;
  }, [products]);

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

  const filteredProducts = useMemo(() => {
    return products.filter((product) => {
      const matchesSearch = product.name
        .toLowerCase()
        .includes(searchTerm.toLowerCase());

      const matchesCategory =
        selectedCategory === "all" || product.category === selectedCategory;

      return matchesSearch && matchesCategory;
    });
  }, [products, searchTerm, selectedCategory]);

  const subtotal = useMemo(() => {
    return cart.reduce(
      (sum, item) => sum + item.product.price * item.quantity,
      0
    );
  }, [cart]);

  if (!isSalesMode) {
    return null;
  }

  const taxRate = 0.19;
  const tax = subtotal * taxRate;
  const discountAmount = subtotal * (discountPercent / 100);
  const total = subtotal + tax - discountAmount;

  const addToCart = (product: Product) => {
    setCart((prev) => {
      const existing = prev.find((item) => item.product._id === product._id);
      if (existing) {
        return prev.map((item) =>
          item.product._id === product._id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }
      return [...prev, { product, quantity: 1 }];
    });
  };

  const updateQuantity = (productId: string, quantity: number) => {
    if (quantity <= 0) {
      removeFromCart(productId);
      return;
    }
    setCart((prev) =>
      prev.map((item) =>
        item.product._id === productId ? { ...item, quantity } : item
      )
    );
  };

  const removeFromCart = (productId: string) => {
    setCart((prev) => prev.filter((item) => item.product._id !== productId));
  };

  const clearCart = () => {
    setCart([]);
    setDiscountPercent(0);
  };

  const completeSale = async () => {
    if (!selectedPaymentMethod) return;

    const salePayload = {
      clientName: `${clientInfo.firstName} ${clientInfo.lastName}`,
      items: cart.map((item) => ({
        productId: item.product._id,
        name: item.product.name,
        quantity: item.quantity,
        unitPrice: item.product.price,
      })),
      currency: "TND",
      taxRate,
      discountRate: discountPercent,
      paymentMethod: selectedPaymentMethod,
      issuedAt: new Date().toISOString(),
    };

    try {
      await ApiService.createInvoice(salePayload);
      alert("Vente enregistrée avec succès !");
      setSalesHistory((prev) => [
        ...prev,
        {
          id: `SALE-${Date.now()}`,
          items: [...cart],
          subtotal,
          tax,
          discount: discountAmount,
          total,
          date: new Date().toLocaleString("fr-FR"),
          paymentMethod: selectedPaymentMethod,
        },
      ]);
      clearCart();
      setShowClientModal(false);
      setSelectedPaymentMethod(null);
      setClientInfo({ firstName: "", lastName: "" });
    } catch (error) {
      console.error(error);
      alert("Erreur lors de la création de la facture");
    }
  };

  const generateInvoice = () => {
    alert(
      "Génération de la facture PDF...\n(Fonctionnalité à implémenter avec jsPDF ou similaire)"
    );
  };

  const printReceipt = () => {
    alert(
      "Impression du ticket...\n(Fonctionnalité à implémenter avec window.print())"
    );
  };

  const handlePaymentClick = (method: "cash" | "card") => {
    setSelectedPaymentMethod(method);
    setShowClientModal(true);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-teal-50 to-cyan-50 p-6">
      <div className="max-w-[1800px] mx-auto">
        <div className="mb-6">
          <h1 className="text-3xl font-bold bg-gradient-to-r from-emerald-600 to-teal-600 bg-clip-text text-transparent mb-2">
            Point de Vente
          </h1>
          <p className="text-slate-600 font-medium">
            Créez vos commandes rapidement
          </p>
        </div>

        <div className="flex flex-row gap-4 h-[100dvh] overflow-hidden">
          <div className="flex-1 overflow-y-auto pr-3 space-y-2">
            <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-4">
              <div className="flex flex-col sm:flex-row gap-4">
                <div className="relative flex-1">
                  <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                  <Input
                    placeholder="Rechercher un produit..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-12 h-12 bg-slate-50 border-slate-300 rounded-xl"
                  />
                </div>
                <div className="flex gap-2">
                  <button
                    onClick={() => setViewMode("grid")}
                    className={`p-3 rounded-xl transition-colors ${
                      viewMode === "grid"
                        ? "bg-emerald-100 text-emerald-600"
                        : "bg-slate-100 text-slate-600 hover:bg-slate-200"
                    }`}
                  >
                    <Grid3x3 className="w-5 h-5" />
                  </button>
                  <button
                    onClick={() => setViewMode("list")}
                    className={`p-3 rounded-xl transition-colors ${
                      viewMode === "list"
                        ? "bg-emerald-100 text-emerald-600"
                        : "bg-slate-100 text-slate-600 hover:bg-slate-200"
                    }`}
                  >
                    <List className="w-5 h-5" />
                  </button>
                </div>
              </div>

              <div className="flex gap-2 mt-4 overflow-x-auto pb-2">
                {categories.map((category) => (
                  <button
                    key={category}
                    onClick={() => setSelectedCategory(category)}
                    className={`px-4 py-2 rounded-xl font-semibold whitespace-nowrap transition-all ${
                      selectedCategory === category
                        ? "bg-gradient-to-r from-emerald-500 to-teal-600 text-white shadow-lg"
                        : "bg-slate-100 text-slate-600 hover:bg-slate-200"
                    }`}
                  >
                    {category === "all" ? "Tous" : category}
                  </button>
                ))}
              </div>
            </div>

            <div
              className={`
              ${
                viewMode === "grid"
                  ? "grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4"
                  : "space-y-3"
              }
            `}
            >
              {filteredProducts.map((product) => (
                <ProductCard
                  key={product._id}
                  product={product}
                  onAdd={addToCart}
                  viewMode={viewMode}
                />
              ))}
            </div>

            {filteredProducts.length === 0 && (
              <div className="bg-white rounded-2xl border border-slate-200 p-12 text-center">
                <p className="text-slate-500 font-medium">
                  Aucun produit trouvé
                </p>
              </div>
            )}
          </div>

          <div className="w-[350px] flex-shrink-0 h-[100dvh] sticky top-0">
            <div className="bg-white rounded-2xl border border-slate-200 shadow-lg h-full flex flex-col">
              <div className="p-6 border-b border-slate-200">
                <div className="flex items-center justify-between mb-2">
                  <h2 className="text-xl font-bold text-slate-800 flex items-center gap-2">
                    <ShoppingCart className="w-6 h-6 text-emerald-600" />
                    Panier
                  </h2>
                  <span className="px-3 py-1 bg-emerald-100 text-emerald-700 font-bold rounded-full text-sm">
                    {cart.reduce((sum, item) => sum + item.quantity, 0)}{" "}
                    articles
                  </span>
                </div>
              </div>

              <div className="p-4 flex-1 overflow-y-auto space-y-3">
                {cart.length === 0 ? (
                  <div className="text-center py-12">
                    <ShoppingCart className="w-16 h-16 text-slate-300 mx-auto mb-4" />
                    <p className="text-slate-500 font-medium">Panier vide</p>
                    <p className="text-sm text-slate-400">
                      Ajoutez des produits pour commencer
                    </p>
                  </div>
                ) : (
                  cart.map((item) => (
                    <CartItemComponent
                      key={item.product._id}
                      item={item}
                      onUpdateQuantity={updateQuantity}
                      onRemove={removeFromCart}
                    />
                  ))
                )}
              </div>

              {cart.length > 0 && (
                <>
                  <div className="p-4 border-t border-slate-200">
                    <div className="flex items-center gap-3">
                      <Percent className="w-5 h-5 text-emerald-600" />
                      <Input
                        type="number"
                        placeholder="Remise %"
                        value={discountPercent || ""}
                        onChange={(e) =>
                          setDiscountPercent(Number(e.target.value) || 0)
                        }
                        className="h-10 bg-slate-50 border-slate-300 rounded-xl"
                        min="0"
                        max="100"
                      />
                    </div>
                  </div>

                  <div className="p-6 border-t border-slate-200 space-y-3">
                    <div className="flex justify-between text-slate-600">
                      <span>Sous-total</span>
                      <span className="font-semibold">
                        {subtotal.toFixed(2)} TND
                      </span>
                    </div>
                    <div className="flex justify-between text-slate-600">
                      <span>TVA (19%)</span>
                      <span className="font-semibold">
                        {tax.toFixed(2)} TND
                      </span>
                    </div>
                    {discountPercent > 0 && (
                      <div className="flex justify-between text-emerald-600">
                        <span>Remise ({discountPercent}%)</span>
                        <span className="font-semibold">
                          -{discountAmount.toFixed(2)} TND
                        </span>
                      </div>
                    )}
                    <div className="pt-3 border-t border-slate-200 flex justify-between items-center">
                      <span className="text-lg font-bold text-slate-800">
                        Total
                      </span>
                      <span className="text-2xl font-bold text-emerald-600">
                        {total.toFixed(2)} TND
                      </span>
                    </div>
                  </div>

                  <div className="p-4 border-t border-slate-200 space-y-3">
                    <div className="grid grid-cols-2 gap-3">
                      <Button
                        onClick={generateInvoice}
                        className="h-12 bg-slate-100 hover:bg-slate-200 text-slate-700 font-semibold rounded-xl"
                      >
                        <FileText className="w-4 h-4 mr-2" />
                        Facture
                      </Button>
                      <Button
                        onClick={printReceipt}
                        className="h-12 bg-slate-100 hover:bg-slate-200 text-slate-700 font-semibold rounded-xl"
                      >
                        <Printer className="w-4 h-4 mr-2" />
                        Imprimer
                      </Button>
                    </div>
                    <Button
                      onClick={() => setShowPaymentModal(true)}
                      className="w-full h-14 bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-600 hover:to-teal-700 text-white font-bold rounded-xl shadow-lg shadow-emerald-500/30"
                    >
                      Finaliser la vente
                    </Button>
                    <Button
                      onClick={clearCart}
                      variant="outline"
                      className="w-full h-12 border-red-200 text-red-600 hover:bg-red-50 font-semibold rounded-xl"
                    >
                      <X className="w-4 h-4 mr-2" />
                      Vider le panier
                    </Button>
                  </div>
                </>
              )}
            </div>
          </div>
        </div>

        {showPaymentModal && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-3xl shadow-2xl max-w-md w-full p-8">
              <h3 className="text-2xl font-bold text-slate-800 mb-6">
                Méthode de paiement
              </h3>
              <div className="space-y-4 mb-8">
                <button
                  onClick={() => handlePaymentClick("cash")}
                  className="w-full flex items-center gap-4 p-6 border-2 border-slate-200 hover:border-emerald-500 rounded-2xl transition-all group"
                >
                  <div className="p-3 bg-emerald-100 rounded-xl group-hover:bg-emerald-500 transition-colors">
                    <Banknote className="w-8 h-8 text-emerald-600 group-hover:text-white" />
                  </div>
                  <div className="flex-1 text-left">
                    <p className="font-bold text-slate-800">Espèces</p>
                    <p className="text-sm text-slate-500">
                      Paiement en liquide
                    </p>
                  </div>
                </button>
                <button
                  onClick={() => handlePaymentClick("card")}
                  className="w-full flex items-center gap-4 p-6 border-2 border-slate-200 hover:border-emerald-500 rounded-2xl transition-all group"
                >
                  <div className="p-3 bg-emerald-100 rounded-xl group-hover:bg-emerald-500 transition-colors">
                    <CreditCard className="w-8 h-8 text-emerald-600 group-hover:text-white" />
                  </div>
                  <div className="flex-1 text-left">
                    <p className="font-bold text-slate-800">Carte bancaire</p>
                    <p className="text-sm text-slate-500">Paiement par carte</p>
                  </div>
                </button>
              </div>
              <Button
                onClick={() => setShowPaymentModal(false)}
                variant="outline"
                className="w-full h-12 font-semibold rounded-xl"
              >
                Annuler
              </Button>
            </div>
          </div>
        )}

        {salesHistory.length > 0 && (
          <div className="mt-8 bg-white rounded-2xl border border-slate-200 shadow-sm p-6">
            <h2 className="text-xl font-bold text-slate-800 mb-4">
              Historique des ventes
            </h2>
            <div className="space-y-3">
              {salesHistory.slice(0, 5).map((sale) => (
                <div
                  key={sale.id}
                  className="flex items-center justify-between p-4 bg-slate-50 rounded-xl"
                >
                  <div className="flex-1">
                    <p className="font-semibold text-slate-700">{sale.id}</p>
                    <p className="text-sm text-slate-500">
                      {sale.date} • {sale.items.length} articles
                    </p>
                  </div>
                  <div className="text-right">
                    <p className="font-bold text-emerald-600">
                      {sale.total.toFixed(2)} TND
                    </p>
                    <p className="text-xs text-slate-500 capitalize">
                      {sale.paymentMethod === "cash" ? "Espèces" : "Carte"}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      {showClientModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-3xl shadow-2xl max-w-md w-full p-8">
            <h3 className="text-2xl font-bold text-slate-800 mb-6">
              Informations du client
            </h3>
            <div className="space-y-4 mb-8">
              <Input
                placeholder="Prénom"
                value={clientInfo.firstName}
                onChange={(e) =>
                  setClientInfo({ ...clientInfo, firstName: e.target.value })
                }
              />
              <Input
                placeholder="Nom"
                value={clientInfo.lastName}
                onChange={(e) =>
                  setClientInfo({ ...clientInfo, lastName: e.target.value })
                }
              />
            </div>
            <Button
              onClick={completeSale}
              disabled={!clientInfo.firstName || !clientInfo.lastName}
              className={`w-full h-12 font-bold rounded-xl mb-2 ${
                !clientInfo.firstName || !clientInfo.lastName
                  ? "bg-gray-300 text-gray-500 cursor-not-allowed"
                  : "bg-emerald-600 text-white"
              }`}
            >
              Confirmer
            </Button>

            <Button
              variant="outline"
              onClick={() => setShowClientModal(false)}
              className="w-full h-12 rounded-xl"
            >
              Annuler
            </Button>
          </div>
        </div>
      )}
    </div>
  );
}
