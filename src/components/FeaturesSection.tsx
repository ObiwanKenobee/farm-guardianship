
import { useRef, useEffect } from 'react';
import FeatureCard from './FeatureCard';
import { ShieldCheck, BarChart2, Leaf, CreditCard } from 'lucide-react';

const FeaturesSection = () => {
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

  return (
    <section id="features" className="py-20 px-6 md:px-10">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16 opacity-0 animate-fade-in">
          <span className="px-4 py-1.5 rounded-full bg-primary/10 text-primary text-xs font-medium">
            Core Features
          </span>
          <h2 className="mt-6 text-3xl md:text-4xl font-bold">The Guardian-IO Ecosystem</h2>
          <p className="mt-4 text-lg text-foreground/70 max-w-2xl mx-auto text-balance">
            Our platform combines blockchain, AI, IoT, and fintech to create a revolutionary agricultural experience
          </p>
        </div>
        
        <div 
          ref={sectionRef}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 opacity-0"
        >
          <FeatureCard 
            title="Blockchain Supply Chain"
            description="Track food from farm to market with immutable blockchain records ensuring transparency and preventing fraud."
            icon={ShieldCheck}
            color="guardian-green"
            delay="delay-100"
          />
          
          <FeatureCard 
            title="AI Market Intelligence"
            description="Get real-time pricing insights and AI-driven forecasts to match crops with the right buyers at optimal prices."
            icon={BarChart2}
            color="guardian-blue"
            delay="delay-200"
          />
          
          <FeatureCard 
            title="IoT Smart Farming"
            description="Reduce input costs through real-time soil, weather, and pest data from IoT sensors with automated alerts."
            icon={Leaf}
            color="guardian-purple"
            delay="delay-300"
          />
          
          <FeatureCard 
            title="Blockchain Microloans"
            description="Access instant, transparent loans and automatic crop insurance payouts via smart contracts."
            icon={CreditCard}
            color="guardian-orange"
            delay="delay-400"
          />
        </div>
      </div>
    </section>
  );
};

export default FeaturesSection;
