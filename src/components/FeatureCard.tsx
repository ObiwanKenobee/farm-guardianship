
import { ReactNode } from 'react';
import { LucideIcon } from 'lucide-react';

interface FeatureCardProps {
  title: string;
  description: string;
  icon: LucideIcon;
  color: string;
  delay?: string;
}

const FeatureCard = ({ title, description, icon: Icon, color, delay = 'delay-100' }: FeatureCardProps) => {
  const bgGradient = `bg-gradient-to-br from-${color}/10 to-${color}/5`;
  
  return (
    <div 
      className={`feature-card glass-card rounded-2xl p-8 opacity-0 animate-slide-up ${delay}`}
    >
      <div className={`rounded-xl p-4 inline-flex mb-6 bg-${color}/10`}>
        <Icon className={`h-10 w-10 text-${color}`} />
      </div>
      <h3 className="text-xl font-semibold mb-3">{title}</h3>
      <p className="text-foreground/70 text-balance">{description}</p>
    </div>
  );
};

export default FeatureCard;
