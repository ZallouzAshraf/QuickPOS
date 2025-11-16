import React, { Dispatch, SetStateAction, useEffect, useState } from "react";
import { ShoppingCart, X, LogOut } from "lucide-react";
import { TabKey, UserDTO } from "@/src/core/types/types";
import { useAppContext } from "@/src/core/context/AppContext";
import { MENU_ITEMS } from "@/src/core/utils/constants";
import { ApiService } from "@/src/core/services/apiService";
import { useRouter } from "next/navigation";

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
  const router = useRouter();
  const { setIsSalesMode } = useAppContext();
  const [showLogout, setShowLogout] = useState(false);
  const [currentUser, setCurrentUser] = useState<UserDTO>();

  const handleLogout = async () => {
    await ApiService.logout();
    router.push("/auth/login");
  };

  useEffect(() => {
    const fetchUser = async () => {
      const response = await ApiService.currentUser();
      setCurrentUser(response.data);
    };
    fetchUser();
  }, []);

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
            <div className="relative">
              <button
                onClick={() => setShowLogout(!showLogout)}
                className="w-full flex items-center gap-3 px-4 py-3 bg-slate-50 rounded-xl hover:bg-slate-100 transition-colors duration-200"
              >
                <div className="w-10 h-10 bg-gradient-to-br from-emerald-500 to-teal-600 rounded-full flex items-center justify-center text-white font-bold">
                  AZ
                </div>
                <div className="flex-1 text-left">
                  <p className="text-sm font-semibold text-slate-700">
                    {currentUser?.firstName} {currentUser?.lastName}
                  </p>
                  <p className="text-xs text-slate-500">
                    {currentUser?.company}{" "}
                  </p>
                </div>
              </button>

              {showLogout && (
                <div className="absolute bottom-full left-0 right-0 mb-2 bg-white border border-slate-200 rounded-xl shadow-lg overflow-hidden animate-in fade-in slide-in-from-bottom-2 duration-200">
                  <button
                    onClick={handleLogout}
                    className="w-full flex cursor-pointer items-center gap-3 px-4 py-3 text-red-600 hover:bg-red-50 transition-colors duration-200"
                  >
                    <LogOut className="w-5 h-5" />
                    <span className="text-sm font-semibold">Déconnexion</span>
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </aside>
    </>
  );
};
