import React, { Dispatch, SetStateAction } from "react";
import { ShoppingCart, X } from "lucide-react";
import { TabKey } from "@/src/core/types/types";
import { useAppContext } from "@/src/core/context/AppContext";
import { MENU_ITEMS } from "@/src/core/utils/constants";

interface SidebarProps {
  activeTab: string;
  setActiveTab: React.Dispatch<React.SetStateAction<TabKey>>;
  isMobileOpen: boolean;
  setIsMobileOpen: Dispatch<SetStateAction<boolean>>;
}

export const Sidebar = ({
  activeTab,
  setActiveTab,
  isMobileOpen,
  setIsMobileOpen,
}: SidebarProps) => {
  const { setIsSalesMode } = useAppContext();

  return (
    <>
      {isMobileOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-40 lg:hidden"
          onClick={() => setIsMobileOpen(false)}
        />
      )}

      <aside
        className={`
        fixed lg:sticky inset-y-0 left-0 z-50 lg:top-0 lg:h-screen
        w-72 bg-white border-r border-slate-200 
        transform transition-transform duration-300 ease-in-out
        ${isMobileOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"}
      `}
      >
        <div className="h-full flex flex-col">
          <div className="p-6 border-b border-slate-200 flex-shrink-0">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 bg-gradient-to-br from-emerald-500 to-teal-600 rounded-2xl flex items-center justify-center shadow-lg">
                  <ShoppingCart className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h1 className="text-xl font-bold bg-gradient-to-r from-emerald-600 to-teal-600 bg-clip-text text-transparent">
                    QuickPOS
                  </h1>
                  <p className="text-xs text-slate-500 font-medium">
                    Gestion de ventes
                  </p>
                </div>
              </div>
              <button
                onClick={() => setIsMobileOpen(false)}
                className="lg:hidden text-slate-500 hover:text-slate-700"
              >
                <X className="w-6 h-6" />
              </button>
            </div>
          </div>

          <nav className="flex-1 p-4 space-y-1 overflow-y-auto">
            {MENU_ITEMS.map((item) => {
              const Icon = item.icon;
              const isActive = activeTab === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => {
                    setActiveTab(item.id as TabKey);
                    setIsMobileOpen(false);
                    if (item.id === "sales") {
                      setIsSalesMode(true);
                    }
                  }}
                  className={`
                    w-full flex items-center gap-3 px-4 py-3 cursor-pointer rounded-xl
                    font-semibold transition-all duration-200
                    ${
                      isActive
                        ? "bg-gradient-to-r from-emerald-500 to-teal-600 text-white shadow-lg shadow-emerald-500/30"
                        : "text-slate-600 hover:bg-slate-50 hover:text-emerald-600"
                    }
                  `}
                >
                  <Icon className="w-5 h-5" />
                  <span>{item.label}</span>
                </button>
              );
            })}
          </nav>
          <div className="p-4 border-t border-slate-200 flex-shrink-0">
            <div className="flex items-center gap-3 px-4 py-3 bg-slate-50 rounded-xl">
              <div className="w-10 h-10 bg-gradient-to-br from-emerald-500 to-teal-600 rounded-full flex items-center justify-center text-white font-bold">
                JD
              </div>
              <div className="flex-1">
                <p className="text-sm font-semibold text-slate-700">
                  Ashraf Zallouz
                </p>
                <p className="text-xs text-slate-500">Ma Boutique</p>
              </div>
            </div>
          </div>
        </div>
      </aside>
    </>
  );
};
