
import { WalletProvider } from '../context/WalletContext';
import Navbar from '../components/layout/Navbar';
import AnimatedGradient from '../components/AnimatedGradient';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Layers, Target, Globe, Users } from "lucide-react";

const Ecosystem = () => {
  return (
    <WalletProvider>
      <div className="relative min-h-screen overflow-hidden">
        <AnimatedGradient />
        <Navbar />
        <main className="container mx-auto px-4 py-24 md:py-32">
          <div className="max-w-5xl mx-auto">
            <h1 className="text-4xl md:text-5xl font-bold mb-8 bg-clip-text text-transparent bg-gradient-to-r from-guardian-green to-guardian-blue">
              Guardian-IO Ecosystem
            </h1>
            
            <p className="text-xl mb-12">
              Our comprehensive ecosystem connects all aspects of agricultural production, creating a unified platform that brings value to all participants.
            </p>
            
            <div className="grid md:grid-cols-2 gap-8 mb-12">
              <Card className="transition-all hover:shadow-lg">
                <CardHeader className="pb-2">
                  <div className="w-12 h-12 flex items-center justify-center rounded-full bg-guardian-green/10 mb-4">
                    <Layers className="h-6 w-6 text-guardian-green" />
                  </div>
                  <CardTitle>Blockchain Supply Chain</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-base">
                    Our blockchain infrastructure ensures complete transparency from farm to table. Every step of the journey is recorded immutably, allowing for verification of organic practices, fair trade compliance, and product authenticity.
                  </CardDescription>
                </CardContent>
              </Card>
              
              <Card className="transition-all hover:shadow-lg">
                <CardHeader className="pb-2">
                  <div className="w-12 h-12 flex items-center justify-center rounded-full bg-guardian-blue/10 mb-4">
                    <Target className="h-6 w-6 text-guardian-blue" />
                  </div>
                  <CardTitle>AI-Driven Insights</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-base">
                    Our artificial intelligence systems analyze market trends, weather patterns, and crop data to provide farmers with actionable insights for optimal planting, harvesting, and selling decisions.
                  </CardDescription>
                </CardContent>
              </Card>
              
              <Card className="transition-all hover:shadow-lg">
                <CardHeader className="pb-2">
                  <div className="w-12 h-12 flex items-center justify-center rounded-full bg-guardian-purple/10 mb-4">
                    <Globe className="h-6 w-6 text-guardian-purple" />
                  </div>
                  <CardTitle>Global Marketplace</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-base">
                    Our decentralized marketplace connects farmers directly with buyers worldwide, eliminating middlemen and ensuring farmers receive fair prices for their produce while providing buyers with verified, quality products.
                  </CardDescription>
                </CardContent>
              </Card>
              
              <Card className="transition-all hover:shadow-lg">
                <CardHeader className="pb-2">
                  <div className="w-12 h-12 flex items-center justify-center rounded-full bg-guardian-orange/10 mb-4">
                    <Users className="h-6 w-6 text-guardian-orange" />
                  </div>
                  <CardTitle>Financial Services</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-base">
                    Through smart contracts, we provide farmers with access to microloans, crop insurance, and other financial services that have traditionally been difficult to obtain, enabling growth and stability.
                  </CardDescription>
                </CardContent>
              </Card>
            </div>
            
            <div className="bg-gradient-to-r from-guardian-green/10 to-guardian-blue/10 p-6 rounded-lg">
              <h2 className="text-2xl font-semibold mb-4">Join Our Ecosystem</h2>
              <p className="mb-4">
                Whether you're a farmer, distributor, retailer, or consumer, Guardian-IO's ecosystem offers benefits and opportunities for all participants in the agricultural value chain.
              </p>
              <p>
                Connect your wallet to explore our platform and become part of the agricultural revolution.
              </p>
            </div>
          </div>
        </main>
      </div>
    </WalletProvider>
  );
};

export default Ecosystem;
