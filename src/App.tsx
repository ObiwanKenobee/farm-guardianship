
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { WalletProvider } from "./context/WalletContext";
import { UserProvider } from "./context/UserContext";
import Index from "./pages/Index";
import About from "./pages/About";
import Ecosystem from "./pages/Ecosystem";
import NotFound from "./pages/NotFound";
import FarmerDashboard from "./pages/dashboard/FarmerDashboard";
import BuyerDashboard from "./pages/dashboard/BuyerDashboard";
import AdminDashboard from "./pages/dashboard/AdminDashboard";
import DashboardRedirect from "./pages/dashboard/DashboardRedirect";
import DashboardLayout from "./components/layout/DashboardLayout";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <WalletProvider>
        <UserProvider>
          <Toaster />
          <Sonner />
          <BrowserRouter>
            <Routes>
              <Route path="/" element={<Index />} />
              <Route path="/about" element={<About />} />
              <Route path="/ecosystem" element={<Ecosystem />} />
              
              {/* Dashboard Routes */}
              <Route path="/dashboard" element={<DashboardRedirect />} />
              <Route 
                path="/dashboard/farmer" 
                element={
                  <DashboardLayout requiredRole="Farmer">
                    <FarmerDashboard />
                  </DashboardLayout>
                } 
              />
              <Route 
                path="/dashboard/buyer" 
                element={
                  <DashboardLayout requiredRole="Buyer">
                    <BuyerDashboard />
                  </DashboardLayout>
                } 
              />
              <Route 
                path="/dashboard/admin" 
                element={
                  <DashboardLayout requiredRole="Admin">
                    <AdminDashboard />
                  </DashboardLayout>
                } 
              />
              
              {/* Catch-all route */}
              <Route path="*" element={<NotFound />} />
            </Routes>
          </BrowserRouter>
        </UserProvider>
      </WalletProvider>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
