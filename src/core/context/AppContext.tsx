import React, {
  createContext,
  Dispatch,
  SetStateAction,
  useContext,
  useState,
  useEffect,
} from "react";
import { TabKey } from "../types/types";

interface AppContextType {
  isSalesMode: boolean;
  setIsSalesMode: (value: boolean) => void;
  activeTab: TabKey;
  setActiveTab: Dispatch<SetStateAction<TabKey>>;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export const useAppContext = () => {
  const context = useContext(AppContext);
  if (!context)
    throw new Error("useAppContext must be used within AppProvider");
  return context;
};

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [isSalesMode, setIsSalesModeState] = useState(() => {
    if (typeof window !== "undefined") {
      const saved = localStorage.getItem("isSalesMode");
      return saved ? JSON.parse(saved) : false;
    }
    return false;
  });

  const [activeTab, setActiveTabState] = useState<TabKey>(() => {
    if (typeof window !== "undefined") {
      const saved = localStorage.getItem("activeTab");
      const validTabs: TabKey[] = [
        "overview",
        "clients",
        "products",
        "invoices",
        "sales",
        "settings",
      ];
      return saved && validTabs.includes(saved as TabKey)
        ? (saved as TabKey)
        : "overview";
    }
    return "overview";
  });

  useEffect(() => {
    localStorage.setItem("isSalesMode", JSON.stringify(isSalesMode));
  }, [isSalesMode]);

  useEffect(() => {
    localStorage.setItem("activeTab", activeTab);
  }, [activeTab]);

  const setIsSalesMode = (value: boolean) => {
    setIsSalesModeState(value);
  };

  const setActiveTab: Dispatch<SetStateAction<TabKey>> = (value) => {
    setActiveTabState(value);
  };

  return (
    <AppContext.Provider
      value={{ isSalesMode, setIsSalesMode, activeTab, setActiveTab }}
    >
      {children}
    </AppContext.Provider>
  );
};
