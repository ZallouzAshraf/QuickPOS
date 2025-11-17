"use client";

import { createContext, useContext, useEffect, useState } from "react";
import { ApiService } from "../services/apiService";
import { UserDTO } from "../types/types";

interface AuthContextType {
  user: UserDTO | null;
  isLoading: boolean;
  refreshUser: () => Promise<boolean>;
  setUser: (user: UserDTO | null) => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<UserDTO | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  const refreshUser = async () => {
    try {
      const res = await ApiService.refreshToken();
      const userRes = await ApiService.currentUser();
      setUser(userRes.data);
      return true;
    } catch (error) {
      setUser(null);
      ApiService.logout();
      return false;
    }
  };

  useEffect(() => {
    let intervalId: NodeJS.Timeout;

    const initAuth = async () => {
      try {
        const userRes = await ApiService.currentUser();
        setUser(userRes.data);
        intervalId = setInterval(async () => {
          await refreshUser();
        }, 5 * 60 * 1000);
      } catch (error) {
        setUser(null);
        ApiService.logout();
      } finally {
        setIsLoading(false);
      }
    };

    initAuth();

    return () => {
      if (intervalId) clearInterval(intervalId);
    };
  }, []);

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-screen">
        Loading...
      </div>
    );
  }

  return (
    <AuthContext.Provider value={{ user, isLoading, refreshUser, setUser }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error("useAuth must be used within an AuthProvider");
  return context;
};
