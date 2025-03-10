
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useUser } from '../../context/UserContext';
import { useWallet } from '../../context/WalletContext';
import { Loader2 } from 'lucide-react';

const DashboardRedirect = () => {
  const { userRole, isLoadingRole } = useUser();
  const { walletAddress } = useWallet();
  const navigate = useNavigate();

  useEffect(() => {
    if (!walletAddress) {
      // If wallet is not connected, redirect to home
      navigate('/');
      return;
    }

    if (!isLoadingRole && userRole) {
      // Once role is assigned, redirect to appropriate dashboard
      if (userRole === 'Farmer') {
        navigate('/dashboard/farmer');
      } else if (userRole === 'Buyer') {
        navigate('/dashboard/buyer');
      } else if (userRole === 'Admin') {
        navigate('/dashboard/admin');
      }
    }
  }, [userRole, isLoadingRole, walletAddress, navigate]);

  return (
    <div className="flex items-center justify-center min-h-screen">
      <div className="text-center">
        <Loader2 className="h-10 w-10 animate-spin mx-auto mb-4 text-guardian-green" />
        <p className="text-lg font-medium">Preparing your dashboard...</p>
        <p className="text-sm text-muted-foreground">
          {isLoadingRole ? 'Assigning your role based on wallet...' : 'Redirecting to your personalized dashboard...'}
        </p>
      </div>
    </div>
  );
};

export default DashboardRedirect;
