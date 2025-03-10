import { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useWallet } from '../context/WalletContext';
import { Button } from '@/components/ui/button';
import { Wallet, Copy, LogOut, ChevronDown, User, Users, ShieldAlert } from 'lucide-react';
import { toast } from 'sonner';
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuItem,
} from "@/components/ui/dropdown-menu";

const WalletConnect = () => {
  const { walletAddress, balance, connectWallet, disconnectWallet, isConnecting, connectDemo, isDemoMode } = useWallet();
  const navigate = useNavigate();
  const sectionRef = useRef<HTMLDivElement>(null);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            entry.target.classList.add('animate-fade-in');
            entry.target.classList.remove('opacity-0');
          }
        });
      },
      { threshold: 0.1 }
    );
    
    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }
    
    return () => {
      if (sectionRef.current) {
        observer.unobserve(sectionRef.current);
      }
    };
  }, []);

  const copyAddress = () => {
    if (walletAddress) {
      navigator.clipboard.writeText(walletAddress);
      toast.success('Wallet address copied to clipboard');
    }
  };

  const handleConnect = async () => {
    if (!walletAddress) {
      await connectWallet();
      // After connecting, wait a moment and then navigate to dashboard
      setTimeout(() => {
        navigate('/dashboard');
      }, 500);
    } else {
      navigate('/dashboard');
    }
  };

  const handleDemoConnect = (role: string) => {
    connectDemo(`0x${role}Demo1234`);
    // After connecting demo, navigate directly to role-specific dashboard
    setTimeout(() => {
      if (role === 'Farmer') {
        navigate('/dashboard/farmer');
      } else if (role === 'Buyer') {
        navigate('/dashboard/buyer');
      } else if (role === 'Admin') {
        navigate('/dashboard/admin');
      }
    }, 300);
  };

  return (
    <section ref={sectionRef} id="wallet" className="py-20 px-6 md:px-10 opacity-0">
      <div className="max-w-4xl mx-auto">
        <div className="glass-card rounded-2xl p-8 md:p-12 text-center">
          <h2 className="text-2xl md:text-3xl font-bold mb-4">Connect Your Blockchain Wallet</h2>
          <p className="text-foreground/70 mb-8 max-w-2xl mx-auto text-balance">
            Access blockchain-powered features like supply chain tracking, smart contracts, 
            and secure payments by connecting your Ethereum wallet.
          </p>
          
          {!walletAddress ? (
            <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
              <Button 
                size="lg"
                className="flex items-center gap-2 px-8 py-6"
                onClick={handleConnect}
                disabled={isConnecting}
              >
                <Wallet className="mr-2 h-5 w-5" />
                {isConnecting ? 'Connecting...' : 'Connect Wallet'}
              </Button>
              
              <div className="relative">
                <DropdownMenu open={dropdownOpen} onOpenChange={setDropdownOpen}>
                  <DropdownMenuTrigger asChild>
                    <Button 
                      variant="outline" 
                      size="lg"
                      className="flex items-center gap-2 px-8 py-6"
                    >
                      <span className="text-sm">Demo Access</span>
                      <ChevronDown className="h-4 w-4" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end" className="w-48">
                    <DropdownMenuLabel>Select Role</DropdownMenuLabel>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem onClick={() => handleDemoConnect('Farmer')} className="cursor-pointer">
                      <User className="mr-2 h-4 w-4 text-green-600" />
                      <span>Farmer</span>
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={() => handleDemoConnect('Buyer')} className="cursor-pointer">
                      <Users className="mr-2 h-4 w-4 text-blue-600" />
                      <span>Buyer</span>
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={() => handleDemoConnect('Admin')} className="cursor-pointer">
                      <ShieldAlert className="mr-2 h-4 w-4 text-purple-600" />
                      <span>Admin</span>
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
            </div>
          ) : (
            <div className="space-y-6">
              <div className="bg-secondary/50 backdrop-blur-sm rounded-xl p-4 flex flex-col sm:flex-row justify-between items-center gap-4 max-w-md mx-auto">
                <div className="flex items-center gap-3">
                  <div className="bg-guardian-green/20 rounded-full p-2">
                    <Wallet className="h-5 w-5 text-guardian-green" />
                  </div>
                  <div className="text-left">
                    <p className="text-sm text-foreground/60">
                      {isDemoMode ? 'Demo Mode' : 'Connected Wallet'}
                    </p>
                    <p className="font-medium">
                      {walletAddress.includes('Demo') 
                        ? walletAddress 
                        : `${walletAddress.substring(0, 6)}...${walletAddress.substring(walletAddress.length - 4)}`}
                    </p>
                  </div>
                </div>
                <Button variant="ghost" size="icon" onClick={copyAddress}>
                  <Copy className="h-4 w-4" />
                </Button>
              </div>
              
              <div className="bg-secondary/50 backdrop-blur-sm rounded-xl p-4 flex justify-between items-center max-w-md mx-auto">
                <div className="flex items-center gap-3">
                  <div className="bg-guardian-blue/20 rounded-full p-2">
                    <svg className="h-5 w-5 text-guardian-blue" viewBox="0 0 256 417" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="xMidYMid">
                      <path fill="currentColor" d="M127.9611 0.0724792L125.1841 9.5574V285.55L127.9611 288.328L255.9231 212.385L127.9611 0.0724792Z" />
                      <path fill="currentColor" d="M127.962 0.0724146L0 212.385L127.962 288.328V154.531V0.0724146Z" />
                      <path fill="currentColor" d="M127.9609 312.1866L126.3859 314.1066V413.9306L127.9609 417.0005L255.9989 236.1417L127.9609 312.1866Z" />
                      <path fill="currentColor" d="M127.962 417.001V312.187L0 236.142L127.962 417.001Z" />
                      <path fill="currentColor" d="M127.9609 288.3285L255.9229 212.3855L127.9609 154.5315V288.3285Z" />
                      <path fill="currentColor" d="M0.0009766 212.385L127.963 288.328V154.531L0.0009766 212.385Z" />
                    </svg>
                  </div>
                  <div className="text-left">
                    <p className="text-sm text-foreground/60">Balance</p>
                    <p className="font-medium">{balance} ETH</p>
                  </div>
                </div>
              </div>
              
              <div className="flex justify-center space-x-3 mt-6">
                <Button 
                  variant="outline"
                  size="sm"
                  className="flex items-center gap-2"
                  onClick={disconnectWallet}
                >
                  <LogOut className="mr-1 h-4 w-4" />
                  Disconnect
                </Button>
                
                <Button 
                  size="sm"
                  className="flex items-center gap-2"
                  onClick={() => navigate('/dashboard')}
                >
                  Go to Dashboard
                </Button>
              </div>
            </div>
          )}
          
          {isDemoMode && (
            <div className="mt-6 text-amber-600 text-sm font-medium bg-amber-100 p-2 rounded-md inline-block">
              ⚠️ Demo Mode Active - No actual blockchain transactions will occur
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default WalletConnect;
