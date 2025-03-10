
import { useWallet } from '../../context/WalletContext';
import { useUser } from '../../context/UserContext';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from '@/components/ui/button';
import { Search, ShoppingCart, Package, List, Check, Shield } from 'lucide-react';
import { useState } from 'react';
import { toast } from 'sonner';

const BuyerDashboard = () => {
  const { walletAddress } = useWallet();
  const { userRole } = useUser();
  const [searchTerm, setSearchTerm] = useState('');
  
  const farmProducts = [
    {
      id: 1,
      name: 'Organic Maize',
      farmer: '0x71C...A4B2',
      location: 'Nairobi Region, Kenya',
      price: '0.05 ETH',
      quantity: '500 kg',
      certification: 'Organic, Fair Trade',
      verifiedOnChain: true,
      image: 'https://images.unsplash.com/photo-1551887196-72e32bfc7bf3?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=200'
    },
    {
      id: 2,
      name: 'Premium Coffee Beans',
      farmer: '0x33D...76F9',
      location: 'Mount Elgon, Uganda',
      price: '0.12 ETH',
      quantity: '100 kg',
      certification: 'Rainforest Alliance',
      verifiedOnChain: true,
      image: 'https://images.unsplash.com/photo-1559056211-efdc2interwoven?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=200'
    },
    {
      id: 3,
      name: 'Fresh Cassava',
      farmer: '0x91A...C56D',
      location: 'Lagos Region, Nigeria',
      price: '0.03 ETH',
      quantity: '300 kg',
      certification: 'Local Certified',
      verifiedOnChain: false,
      image: 'https://images.unsplash.com/photo-1598512752271-33f913a5af13?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=200'
    },
    {
      id: 4,
      name: 'Vanilla Beans',
      farmer: '0x45B...E32A',
      location: 'Antananarivo, Madagascar',
      price: '0.25 ETH',
      quantity: '20 kg',
      certification: 'Organic, Fair Trade',
      verifiedOnChain: true,
      image: 'https://images.unsplash.com/photo-1611132577592-72bc25c7e033?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=200'
    }
  ];

  const handlePurchase = (id: number) => {
    toast.success('Purchase initiated! Connecting to blockchain...');
    // Simulate blockchain transaction
    setTimeout(() => {
      toast.success('Purchase completed successfully!');
    }, 2000);
  };

  const verifyProduct = (id: number) => {
    toast.success('Verification initiated...');
    // Simulate blockchain verification
    setTimeout(() => {
      toast.success('Product verified! Supply chain data is authentic.');
    }, 1500);
  };

  return (
    <div className="container px-4 py-8 mx-auto">
      <div className="flex flex-col md:flex-row justify-between items-start mb-6">
        <div>
          <h1 className="text-3xl font-bold">Buyer Dashboard</h1>
          <p className="text-muted-foreground mt-1">
            Welcome back, Buyer {walletAddress?.substring(0, 6)}...{walletAddress?.substring(walletAddress.length - 4)}
          </p>
        </div>
        
        <div className="mt-4 md:mt-0 space-x-2 flex">
          <Button variant="outline">
            <List className="mr-2 h-4 w-4" />
            Order History
          </Button>
          <Button>
            <ShoppingCart className="mr-2 h-4 w-4" />
            Cart (0)
          </Button>
        </div>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mb-8">
        <Card>
          <CardHeader className="p-4 pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Purchase History</CardTitle>
          </CardHeader>
          <CardContent className="p-4 pt-0">
            <div className="text-2xl font-bold">12 Orders</div>
            <p className="text-xs text-muted-foreground mt-1">
              Last order: 2 days ago
            </p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="p-4 pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Verified Purchases</CardTitle>
          </CardHeader>
          <CardContent className="p-4 pt-0">
            <div className="text-2xl font-bold">100%</div>
            <p className="text-xs text-green-600 flex items-center mt-1">
              <Check className="h-3 w-3 mr-1" /> All purchases verified on-chain
            </p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="p-4 pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Available Balance</CardTitle>
          </CardHeader>
          <CardContent className="p-4 pt-0">
            <div className="text-2xl font-bold">1.45 ETH</div>
            <p className="text-xs text-muted-foreground mt-1">
              Avg. monthly spend: 0.32 ETH
            </p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="p-4 pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Trusted Farmers</CardTitle>
          </CardHeader>
          <CardContent className="p-4 pt-0">
            <div className="text-2xl font-bold">7</div>
            <p className="text-xs text-blue-600 flex items-center mt-1">
              <Shield className="h-3 w-3 mr-1" /> Verified supplier network
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Search and Marketplace */}
      <div className="mb-6">
        <div className="relative w-full md:w-1/2 mb-6">
          <input
            type="text"
            placeholder="Search for ethical farm produce..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full px-4 py-2 pl-10 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-guardian-green"
          />
          <Search className="absolute left-3 top-2.5 h-5 w-5 text-muted-foreground" />
        </div>
        
        <h2 className="text-xl font-semibold mb-4">Available Farm Produce</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6">
          {farmProducts.map(product => (
            <Card key={product.id} className="flex flex-col md:flex-row overflow-hidden">
              <div className="md:w-1/3 bg-gray-100 flex items-center justify-center p-2">
                <div className="h-32 w-full rounded overflow-hidden bg-cover bg-center" 
                     style={{ backgroundImage: `url(${product.image})` }}>
                </div>
              </div>
              <div className="md:w-2/3 p-6">
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="text-lg font-semibold">{product.name}</h3>
                    <p className="text-sm text-muted-foreground">
                      Farmer: {product.farmer} • {product.location}
                    </p>
                  </div>
                  {product.verifiedOnChain && (
                    <div className="bg-green-100 text-green-800 text-xs px-2 py-1 rounded-full flex items-center">
                      <Shield className="h-3 w-3 mr-1" /> Verified
                    </div>
                  )}
                </div>
                
                <div className="mt-3">
                  <div className="flex justify-between text-sm mb-1">
                    <span className="font-medium">Price:</span>
                    <span>{product.price}</span>
                  </div>
                  <div className="flex justify-between text-sm mb-1">
                    <span className="font-medium">Quantity:</span>
                    <span>{product.quantity}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="font-medium">Certification:</span>
                    <span>{product.certification}</span>
                  </div>
                </div>
                
                <div className="mt-4 flex space-x-2">
                  <Button variant="outline" size="sm" onClick={() => verifyProduct(product.id)}>
                    <Shield className="mr-1 h-4 w-4" />
                    Verify
                  </Button>
                  <Button size="sm" onClick={() => handlePurchase(product.id)}>
                    <ShoppingCart className="mr-1 h-4 w-4" />
                    Purchase
                  </Button>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
};

export default BuyerDashboard;
