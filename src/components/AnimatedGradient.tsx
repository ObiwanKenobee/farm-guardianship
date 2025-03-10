
const AnimatedGradient = () => {
  return (
    <div className="absolute inset-0 overflow-hidden -z-10">
      <div className="absolute -inset-[10%] opacity-30">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-guardian-green rounded-full filter blur-3xl opacity-50 animate-float"></div>
        <div className="absolute top-1/3 right-1/4 w-96 h-96 bg-guardian-blue rounded-full filter blur-3xl opacity-50 animate-float" style={{ animationDelay: '1s' }}></div>
        <div className="absolute bottom-1/4 left-1/3 w-80 h-80 bg-guardian-purple rounded-full filter blur-3xl opacity-40 animate-float" style={{ animationDelay: '2s' }}></div>
        <div className="absolute bottom-1/3 right-1/3 w-80 h-80 bg-guardian-orange rounded-full filter blur-3xl opacity-40 animate-float" style={{ animationDelay: '3s' }}></div>
      </div>

      {/* Subtle grid */}
      <div className="absolute inset-0 bg-grid-slate-200/[0.05] bg-[size:20px_20px]"></div>
    </div>
  );
};

export default AnimatedGradient;
