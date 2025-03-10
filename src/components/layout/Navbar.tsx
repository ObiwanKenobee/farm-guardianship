
import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useWallet } from '../../context/WalletContext';
import { useUser } from '../../context/UserContext';
import { Button } from '@/components/ui/button';
import { Wallet, Menu, X, Info, Globe, LogOut, LayoutDashboard } from 'lucide-react';

const Navbar = () => {
  const { walletAddress, balance, connectWallet, disconnectWallet, isConnecting } = useWallet();
  const { userRole } = useUser();
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const navigate = useNavigate();

  // Handle scroll effect
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 10) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  const handleConnectWallet = async () => {
    if (walletAddress) {
      // If already connected, go to dashboard
      navigate('/dashboard');
    } else {
      // Connect wallet
      await connectWallet();
    }
  };

  const handleDisconnect = () => {
    disconnectWallet();
    // If on a dashboard page, redirect to home
    if (window.location.pathname.includes('/dashboard')) {
      navigate('/');
    }
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 py-4 px-6 md:px-10 transition-all duration-300 ${
        scrolled ? 'bg-white/90 backdrop-blur-md shadow-sm' : 'bg-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        <div className="flex items-center">
          <Link to="/" className="text-xl font-semibold bg-clip-text text-transparent bg-gradient-to-r from-guardian-green to-guardian-blue">
            Guardian-IO
          </Link>
        </div>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center space-x-8">
          <Link to="/about" className="text-sm font-medium hover:text-primary transition-colors flex items-center">
            <Info className="mr-1.5 h-4 w-4" />
            About
          </Link>
          <Link to="/ecosystem" className="text-sm font-medium hover:text-primary transition-colors flex items-center">
            <Globe className="mr-1.5 h-4 w-4" />
            Ecosystem
          </Link>
          
          {userRole && (
            <Link to="/dashboard" className="text-sm font-medium hover:text-primary transition-colors flex items-center">
              <LayoutDashboard className="mr-1.5 h-4 w-4" />
              Dashboard
            </Link>
          )}
          
          {walletAddress ? (
            <div className="flex items-center space-x-2">
              <div className="flex flex-col mr-2">
                <span className="text-xs text-muted-foreground">
                  {userRole ? `${userRole} Account` : 'Connected'}
                </span>
                <span className="text-sm font-medium">
                  {`${walletAddress.slice(0, 6)}...${walletAddress.slice(-4)}`}
                </span>
              </div>
              <Button 
                variant="outline" 
                size="sm" 
                onClick={handleDisconnect}
                className="flex items-center"
              >
                <LogOut className="mr-1 h-4 w-4" />
                Disconnect
              </Button>
            </div>
          ) : (
            <Button 
              variant="outline" 
              size="sm" 
              onClick={handleConnectWallet} 
              disabled={isConnecting}
              className="ml-2 flex items-center"
            >
              <Wallet className="mr-2 h-4 w-4" />
              {isConnecting ? 'Connecting...' : 'Connect Wallet'}
            </Button>
          )}
        </nav>

        {/* Mobile Menu Button */}
        <button onClick={toggleMenu} className="md:hidden text-foreground">
          {menuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Navigation */}
      {menuOpen && (
        <div className="md:hidden absolute top-full left-0 right-0 bg-white/95 backdrop-blur-md shadow-lg p-5 flex flex-col space-y-4 animate-fade-in">
          <Link to="/about" className="text-sm font-medium hover:text-primary flex items-center" onClick={() => setMenuOpen(false)}>
            <Info className="mr-1.5 h-4 w-4" />
            About
          </Link>
          <Link to="/ecosystem" className="text-sm font-medium hover:text-primary flex items-center" onClick={() => setMenuOpen(false)}>
            <Globe className="mr-1.5 h-4 w-4" />
            Ecosystem
          </Link>
          
          {userRole && (
            <Link to="/dashboard" className="text-sm font-medium hover:text-primary flex items-center" onClick={() => setMenuOpen(false)}>
              <LayoutDashboard className="mr-1.5 h-4 w-4" />
              Dashboard
            </Link>
          )}
          
          {walletAddress ? (
            <>
              <div className="flex flex-col py-2 px-4 bg-gray-50 rounded-md">
                <span className="text-xs text-muted-foreground">
                  {userRole ? `${userRole} Account` : 'Connected'}
                </span>
                <span className="text-sm font-medium">
                  {`${walletAddress.slice(0, 6)}...${walletAddress.slice(-4)}`}
                </span>
                <span className="text-xs mt-1">
                  {balance} ETH
                </span>
              </div>
              <Button 
                variant="outline" 
                size="sm" 
                onClick={() => { handleDisconnect(); setMenuOpen(false); }}
                className="flex items-center justify-center"
              >
                <LogOut className="mr-2 h-4 w-4" />
                Disconnect
              </Button>
            </>
          ) : (
            <Button 
              variant="outline" 
              size="sm" 
              onClick={() => { handleConnectWallet(); setMenuOpen(false); }} 
              disabled={isConnecting}
              className="flex items-center justify-center"
            >
              <Wallet className="mr-2 h-4 w-4" />
              {isConnecting ? 'Connecting...' : 'Connect Wallet'}
            </Button>
          )}
        </div>
      )}
    </header>
  );
};

export default Navbar;
