
import { useWallet } from '../../context/WalletContext';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from '@/components/ui/button';
import { useState } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';
import { Check, X, UserPlus, RefreshCw, TrendingUp, Users } from 'lucide-react';
import { toast } from 'sonner';

const AdminDashboard = () => {
  const { walletAddress } = useWallet();
  const [farmersToApprove, setFarmersToApprove] = useState([
    { id: 1, address: '0x72B...F39A', name: 'John Mwangi', location: 'Nairobi, Kenya', crops: 'Maize, Beans', date: '2023-06-15' },
    { id: 2, address: '0x45E...A21C', name: 'Amara Okafor', location: 'Lagos, Nigeria', crops: 'Cassava, Yam', date: '2023-06-14' },
    { id: 3, address: '0x91F...B45D', name: 'Kofi Mensah', location: 'Accra, Ghana', crops: 'Cocoa, Plantain', date: '2023-06-12' },
  ]);

  const marketData = [
    { name: 'Maize', value: 25000 },
    { name: 'Coffee', value: 18000 },
    { name: 'Cassava', value: 12000 },
    { name: 'Cocoa', value: 9000 },
    { name: 'Vanilla', value: 5000 },
  ];

  const transactionData = [
    { month: 'Jan', value: 12 },
    { month: 'Feb', value: 19 },
    { month: 'Mar', value: 25 },
    { month: 'Apr', value: 32 },
    { month: 'May', value: 45 },
    { month: 'Jun', value: 51 },
  ];

  const COLORS = ['#27AE60', '#3498DB', '#9B59B6', '#E67E22', '#F1C40F'];

  const approveFarmer = (id: number) => {
    toast.success('Farmer approved successfully!');
    setFarmersToApprove(farmersToApprove.filter(farmer => farmer.id !== id));
  };

  const rejectFarmer = (id: number) => {
    toast.info('Farmer application rejected');
    setFarmersToApprove(farmersToApprove.filter(farmer => farmer.id !== id));
  };

  return (
    <div className="container px-4 py-8 mx-auto">
      <div className="flex flex-col md:flex-row justify-between items-start mb-6">
        <div>
          <h1 className="text-3xl font-bold">Admin Dashboard</h1>
          <p className="text-muted-foreground mt-1">
            Welcome back, Admin {walletAddress?.substring(0, 6)}...{walletAddress?.substring(walletAddress.length - 4)}
          </p>
        </div>
        
        <div className="mt-4 md:mt-0 space-x-2 flex">
          <Button variant="outline">
            <RefreshCw className="mr-2 h-4 w-4" />
            Refresh Data
          </Button>
          <Button>
            <UserPlus className="mr-2 h-4 w-4" />
            Add New Farmer
          </Button>
        </div>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mb-8">
        <Card>
          <CardHeader className="p-4 pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Total Transactions</CardTitle>
          </CardHeader>
          <CardContent className="p-4 pt-0">
            <div className="text-2xl font-bold">184</div>
            <p className="text-xs text-green-600 flex items-center mt-1">
              <TrendingUp className="h-3 w-3 mr-1" /> +28% this month
            </p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="p-4 pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Active Farmers</CardTitle>
          </CardHeader>
          <CardContent className="p-4 pt-0">
            <div className="text-2xl font-bold">42</div>
            <p className="text-xs text-green-600 flex items-center mt-1">
              <TrendingUp className="h-3 w-3 mr-1" /> +5 in the last week
            </p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="p-4 pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Registered Buyers</CardTitle>
          </CardHeader>
          <CardContent className="p-4 pt-0">
            <div className="text-2xl font-bold">78</div>
            <p className="text-xs text-green-600 flex items-center mt-1">
              <Users className="h-3 w-3 mr-1" /> 23 active today
            </p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="p-4 pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Total Volume</CardTitle>
          </CardHeader>
          <CardContent className="p-4 pt-0">
            <div className="text-2xl font-bold">69,000 kg</div>
            <p className="text-xs text-green-600 flex items-center mt-1">
              <TrendingUp className="h-3 w-3 mr-1" /> Valued at 24.6 ETH
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Charts and Analytics */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
        <Card>
          <CardHeader>
            <CardTitle>Monthly Transactions</CardTitle>
          </CardHeader>
          <CardContent className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={transactionData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="value" fill="#27AE60" />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader>
            <CardTitle>Marketplace Volume by Crop (kg)</CardTitle>
          </CardHeader>
          <CardContent className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={marketData}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="value"
                >
                  {marketData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      {/* Pending Approvals */}
      <div className="mb-6">
        <h2 className="text-xl font-semibold mb-4">Pending Farmer Approvals</h2>
        
        {farmersToApprove.length === 0 ? (
          <Card>
            <CardContent className="p-6 text-center">
              <p className="text-muted-foreground">No pending approvals at this time.</p>
            </CardContent>
          </Card>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full bg-white rounded-lg overflow-hidden shadow">
              <thead className="bg-gray-50 border-b">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Farmer</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Location</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Crops</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Submitted</th>
                  <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {farmersToApprove.map(farmer => (
                  <tr key={farmer.id}>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm font-medium">{farmer.name}</div>
                      <div className="text-xs text-gray-500">{farmer.address}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm">{farmer.location}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm">{farmer.crops}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm">{farmer.date}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                      <Button 
                        variant="ghost" 
                        size="sm" 
                        className="text-green-600 hover:text-green-700 mr-2"
                        onClick={() => approveFarmer(farmer.id)}
                      >
                        <Check className="h-4 w-4" />
                      </Button>
                      <Button 
                        variant="ghost" 
                        size="sm" 
                        className="text-red-600 hover:text-red-700"
                        onClick={() => rejectFarmer(farmer.id)}
                      >
                        <X className="h-4 w-4" />
                      </Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminDashboard;
