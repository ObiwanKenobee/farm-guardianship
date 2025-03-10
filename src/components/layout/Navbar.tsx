
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useWallet } from '../../context/WalletContext';
import { Button } from '@/components/ui/button';
import { Wallet, Menu, X, Info, Globe } from 'lucide-react';

const Navbar = () => {
  const { walletAddress, balance, connectWallet, isConnecting } = useWallet();
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

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
          <a href="#features" className="text-sm font-medium hover:text-primary transition-colors">
            Features
          </a>
          <Button 
            variant="outline" 
            size="sm" 
            onClick={connectWallet} 
            disabled={isConnecting || !!walletAddress}
            className="ml-2 flex items-center"
          >
            <Wallet className="mr-2 h-4 w-4" />
            {walletAddress ? `${walletAddress.slice(0, 6)}...${walletAddress.slice(-4)} (${balance} ETH)` : 'Connect Wallet'}
          </Button>
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
          <a href="#features" className="text-sm font-medium hover:text-primary" onClick={() => setMenuOpen(false)}>
            Features
          </a>
          <Button 
            variant="outline" 
            size="sm" 
            onClick={() => { connectWallet(); setMenuOpen(false); }} 
            disabled={isConnecting || !!walletAddress}
            className="flex items-center justify-center"
          >
            <Wallet className="mr-2 h-4 w-4" />
            {walletAddress ? `${walletAddress.slice(0, 6)}...${walletAddress.slice(-4)}` : 'Connect Wallet'}
          </Button>
        </div>
      )}
    </header>
  );
};

export default Navbar;
