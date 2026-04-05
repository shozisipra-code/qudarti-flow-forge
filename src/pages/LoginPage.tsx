import { useState, useRef, useEffect, KeyboardEvent } from "react";
import { useNavigate } from "react-router-dom";
import { Eye, EyeOff } from "lucide-react";
import { BRANDING } from "@/config/branding";
import { useAuth } from "@/contexts/AuthContext";
import { toast } from "sonner";

export default function LoginPage() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [showPw, setShowPw] = useState(false);
  const usernameRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);
  const { login } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    usernameRef.current?.focus();
  }, []);

  const handleUsernameKey = (e: KeyboardEvent) => {
    if (e.key === "Enter") {
      e.preventDefault();
      passwordRef.current?.focus();
    }
  };

  const handleSubmit = () => {
    if (!username.trim() || !password.trim()) return;
    const ok = login(username.trim(), password.trim());
    if (ok) {
      navigate("/panel-select");
    } else {
      toast.error("Wrong Password", {
        description: "Please check your credentials and try again.",
      });
    }
  };

  const handlePasswordKey = (e: KeyboardEvent) => {
    if (e.key === "Enter") {
      e.preventDefault();
      handleSubmit();
    }
  };

  return (
    <div className="flex min-h-screen">
      {/* Left — Form */}
      <div className="flex w-full lg:w-1/2 flex-col justify-between bg-surface px-8 py-10 sm:px-16">
        {/* Logo */}
        <div className="flex items-center gap-2.5">
          <img src={BRANDING.logoIcon} alt="Q" className="h-10 w-10" />
          <span className="text-xl font-bold tracking-tight text-foreground">
            {BRANDING.appName}
          </span>
        </div>

        {/* Form */}
        <div className="mx-auto w-full max-w-sm animate-fade-in">
          <h1 className="mb-8 text-3xl font-extrabold text-foreground">LOGIN</h1>

          <label className="mb-1.5 block text-sm font-medium text-foreground">Username</label>
          <input
            ref={usernameRef}
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            onKeyDown={handleUsernameKey}
            placeholder="Enter your username"
            className="input-field mb-5"
          />

          <label className="mb-1.5 block text-sm font-medium text-foreground">Password</label>
          <div className="relative mb-8">
            <input
              ref={passwordRef}
              type={showPw ? "text" : "password"}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              onKeyDown={handlePasswordKey}
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

          <button onClick={handleSubmit} className="btn-brand w-full">
            Login
          </button>
        </div>

        {/* Footer */}
        <div className="flex items-center justify-between text-xs text-muted-foreground">
          <span>{BRANDING.copyright}</span>
          <span>{BRANDING.termsLabel}</span>
        </div>
      </div>

      {/* Right — Hero */}
      <div className="hidden lg:block lg:w-1/2">
        <img
          src={BRANDING.heroImage}
          alt="Industrial workspace"
          className="h-full w-full object-cover"
          width={960}
          height={1080}
        />
      </div>
    </div>
  );
}
