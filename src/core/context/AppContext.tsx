import React, {
  createContext,
  Dispatch,
  SetStateAction,
  useContext,
  useState,
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
  const [isSalesMode, setIsSalesMode] = useState(false);
  const [activeTab, setActiveTab] = useState<TabKey>("overview");

  return (
    <AppContext.Provider
      value={{ isSalesMode, setIsSalesMode, activeTab, setActiveTab }}
    >
      {children}
    </AppContext.Provider>
  );
};
