import React, { Dispatch, SetStateAction } from "react";
import { Menu, ArrowLeft, ShoppingCart } from "lucide-react";
import { useAppContext } from "@/src/core/context/AppContext";

interface DashboardHeaderProps {
  isMobileOpen: boolean;
  setIsMobileOpen: Dispatch<SetStateAction<boolean>>;
  title?: string;
}

export const DashboardHeader = ({
  isMobileOpen,
  setIsMobileOpen,
  title,
}: DashboardHeaderProps) => {
  const { activeTab, isSalesMode, setIsSalesMode, setActiveTab } =
    useAppContext();

  if (isSalesMode) {
    return (
      <header className="bg-white border-b border-slate-200 px-6 py-4 sticky top-0 z-30">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <button
              onClick={() => {
                setIsSalesMode(false);
                setActiveTab("overview");
              }}
              className="flex items-center gap-2 px-4 py-2 text-slate-600 hover:text-emerald-600 hover:bg-slate-50 rounded-xl transition-colors font-semibold"
            >
              <ArrowLeft className="w-5 h-5" />
              <span className="hidden sm:inline">Retour au Dashboard</span>
            </button>
            <div className="h-8 w-px bg-slate-200" />
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-gradient-to-br from-emerald-500 to-teal-600 rounded-xl flex items-center justify-center">
                <ShoppingCart className="w-5 h-5 text-white" />
              </div>
              <div>
                <h1 className="text-lg font-bold text-slate-800">
                  Point de Vente
                </h1>
                <p className="text-xs text-slate-500">Mode caisse rapide</p>
              </div>
            </div>
          </div>
        </div>
      </header>
    );
  }

  const titles = {
    overview: "Vue d'ensemble",
    clients: "Clients",
    products: "Produits",
    invoices: "Factures",
    sales: "Point de Vente",
    settings: "Paramètres",
  };

  return (
    <header className="bg-white border-b border-slate-200 px-6 py-4 sticky top-0 z-30">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <button
            onClick={() => setIsMobileOpen(!isMobileOpen)}
            className="lg:hidden text-slate-600 hover:text-emerald-600"
          >
            <Menu className="w-6 h-6" />
          </button>
          <h2 className="text-2xl font-bold text-slate-800">
            {titles[activeTab] || "Dashboard"}
          </h2>
        </div>
      </div>
    </header>
  );
};
