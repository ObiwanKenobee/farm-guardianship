
import { WalletProvider } from '../context/WalletContext';
import Navbar from '../components/layout/Navbar';
import HeroSection from '../components/HeroSection';
import FeaturesSection from '../components/FeaturesSection';
import WalletConnect from '../components/WalletConnect';
import AnimatedGradient from '../components/AnimatedGradient';

const Index = () => {
  return (
    <WalletProvider>
      <div className="relative min-h-screen overflow-hidden">
        <AnimatedGradient />
        <Navbar />
        <main>
          <HeroSection />
          <FeaturesSection />
          <WalletConnect />
        </main>
      </div>
    </WalletProvider>
  );
};

export default Index;
