import { useNavigate, useLocation } from "react-router-dom";
import {
  ArrowDownToLine,
  ArrowUpFromLine,
  ClipboardList,
  Factory,
  Package,
  Warehouse,
  Settings,
  LogOut,
  ChevronLeft,
  ChevronRight,
  LayoutDashboard,
  BoxIcon,
} from "lucide-react";
import { BRANDING } from "@/config/branding";
import { useAuth } from "@/contexts/AuthContext";
import { useState } from "react";

const NAV_ITEMS = [
  { id: "dashboard", label: "Dashboard", icon: LayoutDashboard, path: "/dashboard" },
  { id: "gate-inward", label: "Gate Inward", icon: ArrowDownToLine, path: "/gate-inward" },
  { id: "goods-requisition", label: "Goods Requisition", icon: ClipboardList, path: "/goods-requisition" },
  { id: "daily-production", label: "Daily Production", icon: Factory, path: "/daily-production" },
  { id: "finished-goods", label: "Finished Goods", icon: Package, path: "/finished-goods" },
  { id: "gate-outward", label: "Gate Outward", icon: ArrowUpFromLine, path: "/gate-outward" },
  { id: "production-order", label: "Production Order", icon: BoxIcon, path: "/production-order" },
  { id: "inventory", label: "Inventory", icon: Warehouse, path: "/inventory" },
];

export default function AppSidebar() {
  const [collapsed, setCollapsed] = useState(false);
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const visibleItems = NAV_ITEMS.filter((item) => {
    if (item.id === "dashboard") return true;
    if (user?.role === "super") return true;
    return user?.permissions.includes(item.id);
  });

  return (
    <aside
      className={`flex h-screen flex-col border-r border-sidebar-border bg-sidebar transition-all duration-300 ${
        collapsed ? "w-16" : "w-60"
      }`}
    >
      {/* Logo */}
      <div className="flex h-16 items-center gap-2.5 border-b border-sidebar-border px-4">
        <img src={BRANDING.logoIcon} alt="Q" className="h-8 w-8 shrink-0" />
        {!collapsed && (
          <span className="text-lg font-bold tracking-tight text-sidebar-foreground">
            {BRANDING.appName}
          </span>
        )}
      </div>

      {/* Nav */}
      <nav className="flex-1 overflow-y-auto py-3 px-2 space-y-0.5">
        {visibleItems.map((item) => {
          const active = location.pathname === item.path;
          return (
            <button
              key={item.id}
              onClick={() => navigate(item.path)}
              title={collapsed ? item.label : undefined}
              className={`flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-colors ${
                active
                  ? "bg-sidebar-accent text-sidebar-primary"
                  : "text-sidebar-foreground hover:bg-sidebar-accent/60"
              }`}
            >
              <item.icon size={20} className="shrink-0" />
              {!collapsed && <span>{item.label}</span>}
            </button>
          );
        })}

        {/* Settings (Super only) */}
        {user?.role === "super" && (
          <button
            onClick={() => navigate("/settings")}
            title={collapsed ? "Settings" : undefined}
            className={`flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-colors ${
              location.pathname.startsWith("/settings")
                ? "bg-sidebar-accent text-sidebar-primary"
                : "text-sidebar-foreground hover:bg-sidebar-accent/60"
            }`}
          >
            <Settings size={20} className="shrink-0" />
            {!collapsed && <span>Settings</span>}
          </button>
        )}
      </nav>

      {/* Bottom */}
      <div className="border-t border-sidebar-border p-2 space-y-1">
        {/* Collapse toggle */}
        <button
          onClick={() => setCollapsed(!collapsed)}
          className="flex w-full items-center gap-3 rounded-lg px-3 py-2 text-sm text-sidebar-foreground hover:bg-sidebar-accent/60 transition-colors"
        >
          {collapsed ? <ChevronRight size={18} /> : <ChevronLeft size={18} />}
          {!collapsed && <span>Collapse</span>}
        </button>

        {/* Profile / logout */}
        <button
          onClick={() => { logout(); navigate("/login"); }}
          className="flex w-full items-center gap-3 rounded-lg px-3 py-2 text-sm text-sidebar-foreground hover:bg-sidebar-accent/60 transition-colors"
        >
          <LogOut size={18} className="shrink-0" />
          {!collapsed && <span>Logout</span>}
        </button>

        {!collapsed && user && (
          <div className="px-3 py-2 text-xs text-muted-foreground">
            <div className="font-medium text-foreground">{user.username}</div>
            <div className="capitalize">{user.role === "super" ? "Super User" : "User"}</div>
          </div>
        )}
      </div>
    </aside>
  );
}
