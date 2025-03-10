
import { useWallet } from '../../context/WalletContext';
import { useUser } from '../../context/UserContext';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from '@/components/ui/button';
import { Leaf, TrendingUp, Droplets, AlertTriangle } from 'lucide-react';
import { useEffect, useState } from 'react';

const FarmerDashboard = () => {
  const { walletAddress } = useWallet();
  const { userRole } = useUser();
  const [recommendations, setRecommendations] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simulate loading crop recommendations
    const loadRecommendations = async () => {
      setIsLoading(true);
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      setRecommendations([
        { 
          id: 1, 
          crop: 'Maize', 
          confidence: 0.92, 
          season: 'Current',
          profit: '+22%',
          risk: 'Low'
        },
        { 
          id: 2, 
          crop: 'Soybeans', 
          confidence: 0.87, 
          season: 'Current',
          profit: '+18%',
          risk: 'Medium'
        },
        { 
          id: 3, 
          crop: 'Wheat', 
          confidence: 0.78, 
          season: 'Next',
          profit: '+15%',
          risk: 'Medium'
        },
      ]);
      setIsLoading(false);
    };
    
    loadRecommendations();
  }, []);

  return (
    <div className="container px-4 py-8 mx-auto">
      <div className="flex flex-col md:flex-row justify-between items-start mb-6">
        <div>
          <h1 className="text-3xl font-bold">Farmer Dashboard</h1>
          <p className="text-muted-foreground mt-1">
            Welcome back, Farmer {walletAddress?.substring(0, 6)}...{walletAddress?.substring(walletAddress.length - 4)}
          </p>
        </div>
        
        <div className="mt-4 md:mt-0 space-x-2 flex">
          <Button variant="outline">
            <AlertTriangle className="mr-2 h-4 w-4" />
            Report Issue
          </Button>
          <Button>
            <Leaf className="mr-2 h-4 w-4" />
            New Harvest
          </Button>
        </div>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mb-8">
        <Card>
          <CardHeader className="p-4 pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Yield Forecast</CardTitle>
          </CardHeader>
          <CardContent className="p-4 pt-0">
            <div className="text-2xl font-bold">4.2 tons/ha</div>
            <p className="text-xs text-green-600 flex items-center mt-1">
              <TrendingUp className="h-3 w-3 mr-1" /> +12% from last season
            </p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="p-4 pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Soil Health</CardTitle>
          </CardHeader>
          <CardContent className="p-4 pt-0">
            <div className="text-2xl font-bold">Good</div>
            <p className="text-xs text-amber-600 flex items-center mt-1">
              Nitrogen levels need attention
            </p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="p-4 pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Water Usage</CardTitle>
          </CardHeader>
          <CardContent className="p-4 pt-0">
            <div className="text-2xl font-bold">237 m³</div>
            <p className="text-xs text-green-600 flex items-center mt-1">
              <Droplets className="h-3 w-3 mr-1" /> 8% below average
            </p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="p-4 pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Finance</CardTitle>
          </CardHeader>
          <CardContent className="p-4 pt-0">
            <div className="text-2xl font-bold">$4,250</div>
            <p className="text-xs text-blue-600 flex items-center mt-1">
              $5,000 loan eligible
            </p>
          </CardContent>
        </Card>
      </div>

      {/* AI Crop Recommendations */}
      <h2 className="text-xl font-semibold mb-4">AI-Driven Crop Recommendations</h2>
      
      {isLoading ? (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {[1, 2, 3].map(i => (
            <Card key={i} className="animate-pulse">
              <CardHeader className="p-6">
                <div className="h-5 bg-gray-200 rounded w-1/3 mb-2"></div>
                <div className="h-4 bg-gray-200 rounded w-2/3"></div>
              </CardHeader>
              <CardContent className="p-6 pt-0">
                <div className="h-4 bg-gray-200 rounded w-full mb-2"></div>
                <div className="h-4 bg-gray-200 rounded w-5/6"></div>
              </CardContent>
              <CardFooter className="p-6 bg-gray-50">
                <div className="h-8 bg-gray-200 rounded w-full"></div>
              </CardFooter>
            </Card>
          ))}
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {recommendations.map(item => (
            <Card key={item.id}>
              <CardHeader>
                <CardTitle>{item.crop}</CardTitle>
                <CardDescription>
                  {item.season} Season • {item.confidence * 100}% Confidence
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex justify-between mb-2">
                  <span className="text-muted-foreground">Projected Profit:</span>
                  <span className="text-green-600 font-medium">{item.profit}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Risk Level:</span>
                  <span className={`font-medium ${
                    item.risk === 'Low' ? 'text-green-600' : 
                    item.risk === 'Medium' ? 'text-amber-600' : 'text-red-600'
                  }`}>
                    {item.risk}
                  </span>
                </div>
              </CardContent>
              <CardFooter className="bg-secondary/50">
                <Button variant="outline" className="w-full">View Detailed Analysis</Button>
              </CardFooter>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
};

export default FarmerDashboard;
