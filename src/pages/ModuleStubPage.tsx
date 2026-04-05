import DashboardLayout from "@/components/DashboardLayout";
import { useLocation } from "react-router-dom";

const MODULE_TITLES: Record<string, string> = {
  "/gate-inward": "Gate Inward",
  "/goods-requisition": "Goods Requisition",
  "/daily-production": "Daily Production",
  "/finished-goods": "Finished Goods",
  "/gate-outward": "Gate Outward",
  "/production-order": "Production Order",
  "/inventory": "Inventory",
  "/settings": "Settings",
};

export default function ModuleStubPage() {
  const { pathname } = useLocation();
  const title = MODULE_TITLES[pathname] || "Module";

  return (
    <DashboardLayout>
      <div className="animate-fade-in">
        <h1 className="mb-2 text-2xl font-bold text-foreground">{title}</h1>
        <p className="text-sm text-muted-foreground mb-8">
          This module is under construction. Full functionality coming soon.
        </p>

        {/* Placeholder table */}
        <div className="card-dashboard">
          <div className="flex items-center justify-between mb-4">
            <input
              placeholder="Search..."
              className="input-field max-w-xs"
            />
            <button className="btn-brand text-sm py-2 px-5">+ Add New</button>
          </div>
          <div className="border border-border rounded-lg overflow-hidden">
            <div className="grid grid-cols-4 gap-4 bg-muted px-4 py-3 text-xs font-semibold text-muted-foreground uppercase tracking-wider">
              <span>#</span><span>Name</span><span>Status</span><span>Actions</span>
            </div>
            {[1, 2, 3].map((i) => (
              <div key={i} className="grid grid-cols-4 gap-4 px-4 py-3 border-t border-border text-sm hover:bg-muted/50 transition-colors">
                <span className="text-muted-foreground">{i}</span>
                <span className="text-foreground">Sample Entry {i}</span>
                <span className="text-primary font-medium text-xs">Active</span>
                <span className="text-muted-foreground text-xs">Edit • Delete</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}
