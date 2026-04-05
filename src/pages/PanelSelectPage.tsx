import { useState, useEffect, useRef, KeyboardEvent } from "react";
import { useNavigate } from "react-router-dom";
import { Monitor, Warehouse, Eye, EyeOff } from "lucide-react";
import { BRANDING } from "@/config/branding";
import { useAuth } from "@/contexts/AuthContext";
import { toast } from "sonner";

export default function PanelSelectPage() {
  const { user, selectPanel } = useAuth();
  const navigate = useNavigate();
  const [selected, setSelected] = useState<"account" | "store">("store");
  const [password, setPassword] = useState("");
  const [showPw, setShowPw] = useState(false);
  const passwordRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (!user) navigate("/login", { replace: true });
  }, [user, navigate]);

  useEffect(() => {
    const handler = (e: globalThis.KeyboardEvent) => {
      if (e.key === "ArrowLeft") setSelected("account");
      if (e.key === "ArrowRight") setSelected("store");
      if (e.key === "Enter" && document.activeElement?.tagName !== "INPUT") {
        passwordRef.current?.focus();
      }
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, []);

  const handleSubmit = () => {
    if (!password.trim()) return;
    // For prototype, accept any non-empty password on panel select
    if (password === "admin123" || password === "user123") {
      selectPanel(selected);
      navigate("/dashboard");
    } else {
      toast.error("Wrong Password", {
        description: "Please verify your credentials.",
      });
    }
  };

  const handleKey = (e: KeyboardEvent) => {
    if (e.key === "Enter") {
      e.preventDefault();
      handleSubmit();
    }
  };

  if (!user) return null;

  const panels = [
    { id: "account" as const, label: "Account Panel", icon: Monitor },
    { id: "store" as const, label: "Store Panel", icon: Warehouse },
  ];

  return (
    <div className="flex min-h-screen flex-col items-center justify-between bg-surface px-6 py-10">
      {/* Logo */}
      <div className="flex items-center gap-2.5">
        <img src={BRANDING.logoIcon} alt="Q" className="h-10 w-10" />
        <span className="text-xl font-bold tracking-tight text-foreground">{BRANDING.appName}</span>
      </div>

      {/* Panel cards */}
      <div className="w-full max-w-lg animate-fade-in">
        <div className="mb-8 grid grid-cols-2 gap-5">
          {panels.map((p) => {
            const active = selected === p.id;
            return (
              <button
                key={p.id}
                onClick={() => setSelected(p.id)}
                className={`relative flex flex-col items-center gap-3 rounded-lg border-2 p-8 transition-all duration-200 ${
                  active
                    ? "border-primary bg-accent"
                    : "border-border bg-card hover:border-primary/30"
                }`}
              >
                {/* Radio dot */}
                <span
                  className={`absolute left-3 top-3 h-4 w-4 rounded-full border-2 transition-colors ${
                    active ? "border-primary bg-primary" : "border-muted-foreground"
                  }`}
                />
                <p.icon size={40} className={active ? "text-primary" : "text-muted-foreground"} />
                <span className={`text-sm font-semibold ${active ? "text-accent-foreground" : "text-foreground"}`}>
                  {p.label}
                </span>
              </button>
            );
          })}
        </div>

        {/* Password */}
        <label className="mb-1.5 block text-sm font-medium text-foreground">Password</label>
        <div className="relative mb-6">
          <input
            ref={passwordRef}
            type={showPw ? "text" : "password"}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            onKeyDown={handleKey}
            placeholder="Enter your password"
            className="input-field pr-12"
          />
          <button
            type="button"
            tabIndex={-1}
            onClick={() => setShowPw(!showPw)}
            className="absolute right-4 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
          >
            {showPw ? <EyeOff size={18} /> : <Eye size={18} />}
          </button>
        </div>

        <button
          onClick={handleSubmit}
          className={password.trim() ? "btn-brand w-full" : "btn-brand-disabled w-full"}
        >
          Next
        </button>
      </div>

      {/* Footer */}
      <div className="flex w-full max-w-lg items-center justify-between text-xs text-muted-foreground">
        <span>{BRANDING.copyright}</span>
        <span>{BRANDING.termsLabel}</span>
      </div>
    </div>
  );
}
