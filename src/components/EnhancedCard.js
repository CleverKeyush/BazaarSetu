import React, { useState } from 'react';

const EnhancedCard = ({ 
  children, 
  className = '', 
  hover = true, 
  glow = false, 
  gradient = false,
  onClick,
  animation = 'none' // 'none', 'slide-up', 'fade-in', 'scale'
}) => {
  const [isHovered, setIsHovered] = useState(false);

  const getAnimationClass = () => {
    switch (animation) {
      case 'slide-up':
        return 'transform translate-y-2 opacity-0 animate-slide-up';
      case 'fade-in':
        return 'opacity-0 animate-fade-in';
      case 'scale':
        return 'transform scale-95 opacity-0 animate-scale-in';
      default:
        return '';
    }
  };

  const getHoverEffects = () => {
    if (!hover) return '';
    return 'hover:shadow-2xl hover:-translate-y-2 hover:scale-105';
  };

  const getGlowEffect = () => {
    if (!glow) return '';
    return isHovered ? 'shadow-2xl shadow-orange-500/25' : '';
  };

  const getGradientBorder = () => {
    if (!gradient) return 'border border-gray-200';
    return 'border-2 border-transparent bg-gradient-to-r from-orange-500 via-red-500 to-yellow-500 bg-clip-border';
  };

  return (
    <>
      <div
        className={`
          bg-white rounded-xl shadow-lg transition-all duration-500 ease-out
          ${getHoverEffects()}
          ${getGlowEffect()}
          ${getGradientBorder()}
          ${getAnimationClass()}
          ${className}
          ${onClick ? 'cursor-pointer' : ''}
        `}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        onClick={onClick}
      >
        {gradient && (
          <div className="bg-white rounded-xl p-6 m-0.5">
            {children}
          </div>
        )}
        {!gradient && (
          <div className="p-6">
            {children}
          </div>
        )}
      </div>

      {/* Custom CSS for animations */}
      <style jsx>{`
        @keyframes slide-up {
          from {
            transform: translateY(20px);
            opacity: 0;
          }
          to {
            transform: translateY(0);
            opacity: 1;
          }
        }
        
        @keyframes fade-in {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        
        @keyframes scale-in {
          from {
            transform: scale(0.95);
            opacity: 0;
          }
          to {
            transform: scale(1);
            opacity: 1;
          }
        }
        
        .animate-slide-up {
          animation: slide-up 0.6s ease-out forwards;
        }
        
        .animate-fade-in {
          animation: fade-in 0.8s ease-out forwards;
        }
        
        .animate-scale-in {
          animation: scale-in 0.5s ease-out forwards;
        }
      `}</style>
    </>
  );
};

export default EnhancedCard;