"use client";
import { useState } from "react";
import ClientsPage from "./clients/page";
import InvoicesPage from "./invoices/page";
import OverViewPage from "./overview/page";
import ProductsPage from "./products/page";
import SalesPage from "./sales/page";
import SettingPage from "./settings/page";
import { Sidebar } from "@/src/components/layout/sideBar";
import { TabKey } from "@/src/core/types/types";
import { DashboardHeader } from "@/src/components/ui/dashboard/dashboardHeader";
import { AppProvider, useAppContext } from "@/src/core/context/AppContext";
import DashboardSalesComponent from "@/src/components/ui/dashboard/dashboardSales";

function DashboardLayout() {
  const { isSalesMode, activeTab, setActiveTab } = useAppContext();
  const [isMobileOpen, setIsMobileOpen] = useState(false);

  const renderContent = () => {
    if (isSalesMode) {
      return <DashboardSalesComponent />;
    }
    switch (activeTab) {
      case "overview":
        return <OverViewPage />;
      case "clients":
        return <ClientsPage />;
      case "products":
        return <ProductsPage />;
      case "invoices":
        return <InvoicesPage />;
      case "sales":
        return <SalesPage />;
      case "settings":
        return <SettingPage />;
      default:
        return <OverViewPage />;
    }
  };

  const getTitleByTab = () => {
    const titles: Record<TabKey, string> = {
      overview: "Vue d'ensemble",
      clients: "Clients",
      products: "Produits",
      invoices: "Factures",
      sales: "Ventes",
      settings: "Paramètres",
    };

    return titles[activeTab];
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-teal-50 to-cyan-50">
      {isSalesMode ? (
        <div className="h-screen flex flex-col">
          <DashboardHeader
            isMobileOpen={isMobileOpen}
            setIsMobileOpen={setIsMobileOpen}
          />
          {renderContent()}
        </div>
      ) : (
        <div className="flex">
          <Sidebar
            activeTab={activeTab}
            setActiveTab={setActiveTab}
            isMobileOpen={isMobileOpen}
            setIsMobileOpen={setIsMobileOpen}
          />
          <main className="flex-1 min-h-screen">
            <DashboardHeader
              isMobileOpen={isMobileOpen}
              setIsMobileOpen={setIsMobileOpen}
            />
            <div className="p-6">{renderContent()}</div>
          </main>
        </div>
      )}
    </div>
  );
}

export default function Dashboard() {
  return (
    <AppProvider>
      <DashboardLayout />
    </AppProvider>
  );
}
