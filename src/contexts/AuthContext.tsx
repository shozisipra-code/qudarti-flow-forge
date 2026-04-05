import { createContext, useContext, useState, ReactNode, useCallback } from "react";
import { DEMO_USERS, ALL_MODULES, type AppUser, type UserRole } from "@/config/branding";

interface AuthContextType {
  user: AppUser | null;
  panel: "account" | "store" | null;
  login: (username: string, password: string) => boolean;
  selectPanel: (panel: "account" | "store") => void;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | null>(null);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<AppUser | null>(null);
  const [panel, setPanel] = useState<"account" | "store" | null>(null);

  const login = useCallback((username: string, password: string): boolean => {
    if (username === DEMO_USERS.super.username && password === DEMO_USERS.super.password) {
      setUser({ username, role: "super", permissions: [...ALL_MODULES] });
      return true;
    }
    if (username === DEMO_USERS.lower.username && password === DEMO_USERS.lower.password) {
      setUser({ username, role: "lower", permissions: ["gate-inward", "goods-requisition", "daily-production"] });
      return true;
    }
    return false;
  }, []);

  const selectPanel = useCallback((p: "account" | "store") => setPanel(p), []);
  const logout = useCallback(() => { setUser(null); setPanel(null); }, []);

  return (
    <AuthContext.Provider value={{ user, panel, login, selectPanel, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used within AuthProvider");
  return ctx;
}
