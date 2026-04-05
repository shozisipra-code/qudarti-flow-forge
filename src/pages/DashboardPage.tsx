import {
  ArrowDownToLine,
  ArrowUpFromLine,
  ClipboardList,
  Factory,
  Package,
  Eye,
} from "lucide-react";
import DashboardLayout from "@/components/DashboardLayout";
import { useAuth } from "@/contexts/AuthContext";
import { useNavigate } from "react-router-dom";

interface DashCard {
  id: string;
  title: string;
  icon: React.ElementType;
  bgClass: string;
  fgClass: string;
  fields: string[];
  path: string;
}

const CARDS: DashCard[] = [
  {
    id: "gate-inward",
    title: "Today's Gate Inward",
    icon: ArrowDownToLine,
    bgClass: "bg-card-red",
    fgClass: "text-card-red-fg",
    fields: ["Category", "Name", "Quantity"],
    path: "/gate-inward",
  },
  {
    id: "goods-requisition",
    title: "Today's Goods Requisition",
    icon: ClipboardList,
    bgClass: "bg-card-purple",
    fgClass: "text-card-purple-fg",
    fields: ["Receiver Name", "Product Name", "Quantity"],
    path: "/goods-requisition",
  },
  {
    id: "daily-production",
    title: "Today's Production",
    icon: Factory,
    bgClass: "bg-card-cyan",
    fgClass: "text-card-cyan-fg",
    fields: ["Product Name", "Total Time (Hours)", "No. of Workers"],
    path: "/daily-production",
  },
  {
    id: "finished-goods",
    title: "Today's Finished Goods",
    icon: Package,
    bgClass: "bg-card-blue",
    fgClass: "text-card-blue-fg",
    fields: ["Brand", "Product", "Carton Number"],
    path: "/finished-goods",
  },
  {
    id: "gate-outward",
    title: "Today's Gate Outward",
    icon: ArrowUpFromLine,
    bgClass: "bg-card-yellow",
    fgClass: "text-card-yellow-fg",
    fields: ["Product Name", "Brand", "Quantity"],
    path: "/gate-outward",
  },
];

export default function DashboardPage() {
  const { user } = useAuth();
  const navigate = useNavigate();

  const visible = CARDS.filter((c) => {
    if (user?.role === "super") return true;
    return user?.permissions.includes(c.id);
  });

  return (
    <DashboardLayout>
      <h1 className="mb-6 text-2xl font-bold text-foreground">Store Panel Dashboard</h1>
      <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {visible.map((card) => (
          <div
            key={card.id}
            className={`${card.bgClass} rounded-lg p-5 animate-fade-in`}
          >
            <div className="flex items-center gap-3 mb-4">
              <card.icon size={22} className={card.fgClass} />
              <h2 className={`text-sm font-bold ${card.fgClass}`}>{card.title}</h2>
            </div>

            {/* Empty state — placeholder for real data */}
            <div className="space-y-2 mb-4">
              {card.fields.map((f) => (
                <div key={f} className="flex justify-between text-xs">
                  <span className={`${card.fgClass} opacity-70`}>{f}</span>
                  <span className={`${card.fgClass} font-medium`}>—</span>
                </div>
              ))}
            </div>

            <button
              onClick={() => navigate(card.path)}
              className={`flex items-center gap-1.5 text-xs font-semibold ${card.fgClass} hover:underline`}
            >
              <Eye size={14} /> View Details
            </button>
          </div>
        ))}
      </div>
    </DashboardLayout>
  );
}
