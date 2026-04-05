import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { AuthProvider } from "@/contexts/AuthContext";
import LoginPage from "@/pages/LoginPage";
import PanelSelectPage from "@/pages/PanelSelectPage";
import DashboardPage from "@/pages/DashboardPage";
import ModuleStubPage from "@/pages/ModuleStubPage";
import NotFound from "@/pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Sonner />
      <BrowserRouter>
        <AuthProvider>
          <Routes>
            <Route path="/" element={<Navigate to="/login" replace />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/panel-select" element={<PanelSelectPage />} />
            <Route path="/dashboard" element={<DashboardPage />} />
            <Route path="/gate-inward" element={<ModuleStubPage />} />
            <Route path="/goods-requisition" element={<ModuleStubPage />} />
            <Route path="/daily-production" element={<ModuleStubPage />} />
            <Route path="/finished-goods" element={<ModuleStubPage />} />
            <Route path="/gate-outward" element={<ModuleStubPage />} />
            <Route path="/production-order" element={<ModuleStubPage />} />
            <Route path="/inventory" element={<ModuleStubPage />} />
            <Route path="/settings" element={<ModuleStubPage />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </AuthProvider>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
