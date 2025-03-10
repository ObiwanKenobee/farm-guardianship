
import { createContext, useState, useContext, ReactNode, useEffect } from 'react';
import { useWallet } from './WalletContext';
import { toast } from 'sonner';

// Define user roles
export type UserRole = 'Farmer' | 'Buyer' | 'Admin' | null;

interface UserContextType {
  userRole: UserRole;
  isLoadingRole: boolean;
  setUserRole: (role: UserRole) => void;
}

const UserContext = createContext<UserContextType | undefined>(undefined);

export const UserProvider = ({ children }: { children: ReactNode }) => {
  const { walletAddress } = useWallet();
  const [userRole, setUserRole] = useState<UserRole>(null);
  const [isLoadingRole, setIsLoadingRole] = useState<boolean>(false);

  // Assign a random role when wallet is connected
  useEffect(() => {
    const assignRandomRole = async () => {
      // Only assign a role if wallet is connected and no role exists
      if (walletAddress && !userRole) {
        setIsLoadingRole(true);
        try {
          // Simulate API delay
          await new Promise(resolve => setTimeout(resolve, 1000));
          
          // Randomly assign a role for demo purposes
          const roles: UserRole[] = ['Farmer', 'Buyer', 'Admin'];
          const randomRole = roles[Math.floor(Math.random() * roles.length)];
          
          setUserRole(randomRole);
          toast.success(`Welcome! You've been assigned the ${randomRole} role`);
        } catch (error) {
          console.error('Failed to assign role:', error);
          toast.error('Failed to assign a role');
        } finally {
          setIsLoadingRole(false);
        }
      }
      
      // Clear role when wallet is disconnected
      if (!walletAddress) {
        setUserRole(null);
      }
    };

    assignRandomRole();
  }, [walletAddress, userRole]);

  return (
    <UserContext.Provider
      value={{
        userRole,
        isLoadingRole,
        setUserRole,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => {
  const context = useContext(UserContext);
  if (context === undefined) {
    throw new Error('useUser must be used within a UserProvider');
  }
  return context;
};
