
import { useEffect, useRef } from 'react';
import { useWallet } from '../context/WalletContext';
import { Button } from '@/components/ui/button';
import { Wallet, Copy, LogOut } from 'lucide-react';
import { toast } from 'sonner';

const WalletConnect = () => {
  const { walletAddress, balance, connectWallet, disconnectWallet, isConnecting } = useWallet();
  const sectionRef = useRef<HTMLDivElement>(null);
  
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
            <Button 
              size="lg"
              className="flex items-center gap-2 px-8 py-6 mx-auto"
              onClick={connectWallet}
              disabled={isConnecting}
            >
              <Wallet className="mr-2 h-5 w-5" />
              {isConnecting ? 'Connecting...' : 'Connect Wallet'}
            </Button>
          ) : (
            <div className="space-y-6">
              <div className="bg-secondary/50 backdrop-blur-sm rounded-xl p-4 flex flex-col sm:flex-row justify-between items-center gap-4 max-w-md mx-auto">
                <div className="flex items-center gap-3">
                  <div className="bg-guardian-green/20 rounded-full p-2">
                    <Wallet className="h-5 w-5 text-guardian-green" />
                  </div>
                  <div className="text-left">
                    <p className="text-sm text-foreground/60">Connected Wallet</p>
                    <p className="font-medium">
                      {`${walletAddress.substring(0, 6)}...${walletAddress.substring(walletAddress.length - 4)}`}
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
              
              <Button 
                variant="outline"
                size="sm"
                className="flex items-center gap-2 mt-4"
                onClick={disconnectWallet}
              >
                <LogOut className="mr-1 h-4 w-4" />
                Disconnect
              </Button>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default WalletConnect;
