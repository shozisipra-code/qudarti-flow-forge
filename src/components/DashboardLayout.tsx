import { ReactNode, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import AppSidebar from "@/components/AppSidebar";
import { useAuth } from "@/contexts/AuthContext";

export default function DashboardLayout({ children }: { children: ReactNode }) {
  const { user, panel } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!user) navigate("/login", { replace: true });
    else if (!panel) navigate("/panel-select", { replace: true });
  }, [user, panel, navigate]);

  if (!user || !panel) return null;

  return (
    <div className="flex min-h-screen w-full">
      <AppSidebar />
      <main className="flex-1 overflow-auto bg-surface p-6">
        {children}
      </main>
    </div>
  );
}
