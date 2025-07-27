import React from 'react';

const AnimatedBackground = ({ children, variant = 'default' }) => {
  const getBackgroundClass = () => {
    switch (variant) {
      case 'food':
        return 'bg-gradient-to-br from-orange-100 via-red-50 to-yellow-100';
      case 'vendor':
        return 'bg-gradient-to-br from-blue-100 via-indigo-50 to-purple-100';
      case 'supplier':
        return 'bg-gradient-to-br from-green-100 via-emerald-50 to-teal-100';
      case 'discovery':
        return 'bg-gradient-to-br from-purple-100 via-pink-50 to-indigo-100';
      default:
        return 'bg-gradient-to-br from-orange-50 via-red-50 to-yellow-50';
    }
  };

  return (
    <div className={`min-h-screen relative overflow-hidden ${getBackgroundClass()}`}>
      {/* Animated floating elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {/* Floating food icons */}
        <div className="absolute top-20 left-10 text-4xl animate-bounce opacity-20">🍕</div>
        <div className="absolute top-40 right-20 text-3xl animate-pulse opacity-20">🍔</div>
        <div className="absolute top-60 left-1/4 text-5xl animate-bounce opacity-15" style={{ animationDelay: '1s' }}>🍜</div>
        <div className="absolute bottom-40 right-10 text-4xl animate-pulse opacity-20" style={{ animationDelay: '2s' }}>🥘</div>
        <div className="absolute bottom-20 left-20 text-3xl animate-bounce opacity-15" style={{ animationDelay: '0.5s' }}>🍛</div>
        <div className="absolute top-1/3 right-1/3 text-4xl animate-pulse opacity-10" style={{ animationDelay: '1.5s' }}>🌶️</div>
        <div className="absolute bottom-1/3 left-1/3 text-3xl animate-bounce opacity-15" style={{ animationDelay: '3s' }}>🥬</div>
        
        {/* Floating geometric shapes */}
        <div className="absolute top-32 right-1/4 w-16 h-16 bg-gradient-to-r from-orange-300 to-red-300 rounded-full opacity-10 animate-float"></div>
        <div className="absolute bottom-32 left-1/4 w-12 h-12 bg-gradient-to-r from-blue-300 to-purple-300 rounded-full opacity-10 animate-float" style={{ animationDelay: '2s' }}></div>
        <div className="absolute top-1/2 left-10 w-8 h-8 bg-gradient-to-r from-green-300 to-teal-300 rounded-full opacity-15 animate-float" style={{ animationDelay: '1s' }}></div>
        <div className="absolute top-1/4 right-10 w-20 h-20 bg-gradient-to-r from-yellow-300 to-orange-300 rounded-full opacity-10 animate-float" style={{ animationDelay: '3s' }}></div>
      </div>

      {/* Content */}
      <div className="relative z-10">
        {children}
      </div>

      {/* Custom CSS for animations */}
      <style jsx>{`
        @keyframes float {
          0%, 100% { transform: translateY(0px) rotate(0deg); }
          33% { transform: translateY(-10px) rotate(120deg); }
          66% { transform: translateY(10px) rotate(240deg); }
        }
        .animate-float {
          animation: float 6s ease-in-out infinite;
        }
      `}</style>
    </div>
  );
};

export default AnimatedBackground;