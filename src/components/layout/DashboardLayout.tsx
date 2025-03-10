
import { ReactNode, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useUser } from '../../context/UserContext';
import { useWallet } from '../../context/WalletContext';
import Navbar from './Navbar';
import { Loader2 } from 'lucide-react';

interface DashboardLayoutProps {
  children: ReactNode;
  requiredRole?: 'Farmer' | 'Buyer' | 'Admin';
}

const DashboardLayout = ({ children, requiredRole }: DashboardLayoutProps) => {
  const { userRole, isLoadingRole } = useUser();
  const { walletAddress } = useWallet();
  const navigate = useNavigate();

  useEffect(() => {
    // If wallet is not connected, redirect to homepage
    if (!walletAddress) {
      navigate('/');
      return;
    }

    // If role is loaded (not loading) and doesn't match required role, redirect to appropriate dashboard
    if (!isLoadingRole && requiredRole && userRole !== requiredRole) {
      if (userRole === 'Farmer') {
        navigate('/dashboard/farmer');
      } else if (userRole === 'Buyer') {
        navigate('/dashboard/buyer');
      } else if (userRole === 'Admin') {
        navigate('/dashboard/admin');
      } else {
        // If no role assigned, redirect to home
        navigate('/');
      }
    }
  }, [walletAddress, userRole, requiredRole, isLoadingRole, navigate]);

  if (!walletAddress) {
    return null; // Will redirect to home
  }

  if (isLoadingRole) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <Loader2 className="h-10 w-10 animate-spin mx-auto mb-4 text-guardian-green" />
          <p className="text-lg font-medium">Assigning your role...</p>
          <p className="text-sm text-muted-foreground">Please wait while we authenticate your wallet</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <div className="pt-20">
        {children}
      </div>
    </div>
  );
};

export default DashboardLayout;
