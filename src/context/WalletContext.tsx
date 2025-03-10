
import { createContext, useState, useContext, ReactNode, useEffect } from 'react';
import { toast } from 'sonner';

interface WalletContextType {
  walletAddress: string;
  balance: string;
  isConnecting: boolean;
  connectWallet: () => Promise<void>;
  disconnectWallet: () => void;
  connectDemo: (address?: string) => void;
  isDemoMode: boolean;
}

const WalletContext = createContext<WalletContextType | undefined>(undefined);

export const WalletProvider = ({ children }: { children: ReactNode }) => {
  const [walletAddress, setWalletAddress] = useState<string>('');
  const [balance, setBalance] = useState<string>('0');
  const [isConnecting, setIsConnecting] = useState<boolean>(false);
  const [isDemoMode, setIsDemoMode] = useState<boolean>(false);

  // Check if the wallet is already connected
  useEffect(() => {
    const checkConnection = async () => {
      if (typeof window.ethereum !== 'undefined') {
        try {
          const accounts = await window.ethereum.request({ method: 'eth_accounts' });
          if (accounts.length > 0) {
            setWalletAddress(accounts[0]);
            const balance = await window.ethereum.request({
              method: 'eth_getBalance',
              params: [accounts[0], 'latest'],
            });
            setBalance((parseInt(balance, 16) / 1e18).toFixed(4));
          }
        } catch (error) {
          console.error('Failed to check wallet connection:', error);
        }
      }
    };

    checkConnection();
  }, []);

  // Listen for account changes
  useEffect(() => {
    if (typeof window.ethereum !== 'undefined') {
      window.ethereum.on('accountsChanged', (accounts: string[]) => {
        if (accounts.length > 0) {
          setWalletAddress(accounts[0]);
          toast.success('Wallet account changed');
        } else {
          setWalletAddress('');
          setBalance('0');
          toast.info('Wallet disconnected');
        }
      });
    }

    return () => {
      if (typeof window.ethereum !== 'undefined') {
        window.ethereum.removeAllListeners('accountsChanged');
      }
    };
  }, []);

  const connectWallet = async () => {
    if (typeof window.ethereum !== 'undefined') {
      setIsConnecting(true);
      try {
        const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
        setWalletAddress(accounts[0]);
        
        const balance = await window.ethereum.request({
          method: 'eth_getBalance',
          params: [accounts[0], 'latest'],
        });
        setBalance((parseInt(balance, 16) / 1e18).toFixed(4));
        setIsDemoMode(false);
        
        toast.success('Wallet connected successfully');
      } catch (error) {
        console.error('Failed to connect wallet:', error);
        toast.error('Failed to connect wallet');
      } finally {
        setIsConnecting(false);
      }
    } else {
      toast.error('Ethereum wallet not detected. Please install MetaMask.');
    }
  };

  const connectDemo = (address?: string) => {
    // Generate a fake address if none provided
    const demoAddress = address || '0xDemo' + Math.floor(Math.random() * 10000).toString().padStart(4, '0') + '...';
    setWalletAddress(demoAddress);
    setBalance('99.9999'); // Demo balance
    setIsDemoMode(true);
    toast.success('Demo mode activated');
  };

  const disconnectWallet = () => {
    setWalletAddress('');
    setBalance('0');
    setIsDemoMode(false);
    toast.info('Wallet disconnected');
  };

  return (
    <WalletContext.Provider
      value={{
        walletAddress,
        balance,
        isConnecting,
        connectWallet,
        disconnectWallet,
        connectDemo,
        isDemoMode,
      }}
    >
      {children}
    </WalletContext.Provider>
  );
};

export const useWallet = () => {
  const context = useContext(WalletContext);
  if (context === undefined) {
    throw new Error('useWallet must be used within a WalletProvider');
  }
  return context;
};
