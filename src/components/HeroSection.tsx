
import { useEffect, useRef } from 'react';
import { Button } from '@/components/ui/button';
import { ArrowRight, Shield, Sprout, Database, BarChart4 } from 'lucide-react';

const HeroSection = () => {
  const iconRefs = useRef<(HTMLDivElement | null)[]>([]);

  // Animation for floating icons
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('animate-slide-up', 'opacity-100');
          }
        });
      },
      { threshold: 0.1 }
    );

    iconRefs.current.forEach((ref) => {
      if (ref) observer.observe(ref);
    });

    return () => {
      iconRefs.current.forEach((ref) => {
        if (ref) observer.unobserve(ref);
      });
    };
  }, []);

  return (
    <section className="relative min-h-screen flex flex-col items-center justify-center px-6 md:px-10 pt-16 pb-32">
      {/* Pill label */}
      <div className="mb-8 opacity-0 animate-fade-in">
        <div className="px-4 py-1.5 rounded-full bg-white/70 backdrop-blur-sm border border-gray-100 shadow-sm inline-flex items-center">
          <span className="text-xs font-medium text-primary mr-2">Zero to One Innovation</span>
          <span className="flex h-1.5 w-1.5 rounded-full bg-guardian-green"></span>
        </div>
      </div>

      {/* Main heading */}
      <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-center max-w-4xl mx-auto opacity-0 animate-fade-in delay-100 text-balance">
        <span className="bg-clip-text text-transparent bg-gradient-to-r from-primary to-guardian-blue">
          Revolutionizing Agriculture
        </span>{" "}
        <br /> 
        With Blockchain & AI
      </h1>

      {/* Subtitle */}
      <p className="mt-6 text-lg md:text-xl text-center max-w-3xl mx-auto text-foreground/70 opacity-0 animate-fade-in delay-200 text-balance">
        Guardian-IO is building the future of AgriTech - a transparent, AI-powered ecosystem that controls the entire agricultural supply chain from crop selection to payments and ethical sourcing.
      </p>

      {/* CTA Buttons */}
      <div className="mt-10 flex flex-col sm:flex-row gap-4 opacity-0 animate-fade-in delay-300">
        <Button className="flex items-center gap-2 px-6 py-6" size="lg">
          Get Started <ArrowRight className="ml-1 h-4 w-4" />
        </Button>
        <Button variant="outline" className="px-6 py-6" size="lg">
          Learn More
        </Button>
      </div>

      {/* Floating icons */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div 
          ref={el => (iconRefs.current[0] = el)} 
          className="absolute top-1/4 left-1/4 transform -translate-x-1/2 -translate-y-1/2 opacity-0 transition-all"
        >
          <div className="p-3 bg-white/80 backdrop-blur-sm rounded-xl shadow-lg">
            <Shield className="h-8 w-8 text-guardian-green" />
          </div>
        </div>
        <div 
          ref={el => (iconRefs.current[1] = el)} 
          className="absolute top-1/3 right-1/4 transform translate-x-1/2 -translate-y-1/2 opacity-0 transition-all"
        >
          <div className="p-3 bg-white/80 backdrop-blur-sm rounded-xl shadow-lg">
            <Sprout className="h-8 w-8 text-guardian-blue" />
          </div>
        </div>
        <div 
          ref={el => (iconRefs.current[2] = el)} 
          className="absolute bottom-1/3 left-1/3 transform -translate-x-1/2 translate-y-1/2 opacity-0 transition-all"
        >
          <div className="p-3 bg-white/80 backdrop-blur-sm rounded-xl shadow-lg">
            <Database className="h-8 w-8 text-guardian-purple" />
          </div>
        </div>
        <div 
          ref={el => (iconRefs.current[3] = el)} 
          className="absolute bottom-1/4 right-1/3 transform translate-x-1/2 translate-y-1/2 opacity-0 transition-all"
        >
          <div className="p-3 bg-white/80 backdrop-blur-sm rounded-xl shadow-lg">
            <BarChart4 className="h-8 w-8 text-guardian-orange" />
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
