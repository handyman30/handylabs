import React from 'react';

interface HandyLabsLogoProps {
  className?: string;
  showText?: boolean;
  size?: 'sm' | 'md' | 'lg' | 'xl';
}

export default function HandyLabsLogo({ 
  className = '', 
  showText = true, 
  size = 'md' 
}: HandyLabsLogoProps) {
  const sizeClasses = {
    sm: 'w-8 h-8',
    md: 'w-12 h-12', 
    lg: 'w-16 h-16',
    xl: 'w-24 h-24'
  };

  const textSizeClasses = {
    sm: 'text-sm',
    md: 'text-base',
    lg: 'text-xl', 
    xl: 'text-3xl'
  };

  return (
    <div className={`flex items-center space-x-3 ${className}`}>
      {/* HL Logo Mark */}
      <div className={`${sizeClasses[size]} relative`}>
        <svg viewBox="0 0 100 100" className="w-full h-full">
          {/* Background square for H */}
          <rect x="5" y="5" width="35" height="90" fill="currentColor" />
          
          {/* H letter cutout */}
          <rect x="15" y="15" width="15" height="25" fill="white" />
          <rect x="15" y="60" width="15" height="25" fill="white" />
          <rect x="15" y="35" width="15" height="15" fill="currentColor" />
          
          {/* Lightning bolt / L combination */}
          <path 
            d="M50 5 L50 45 L70 45 L45 95 L45 55 L25 55 L50 5 Z" 
            fill="currentColor"
          />
          
          {/* L base */}
          <rect x="60" y="75" width="35" height="20" fill="currentColor" />
        </svg>
      </div>
      
      {/* HandyLabs Text */}
      {showText && (
        <span className={`font-bold tracking-tight text-black ${textSizeClasses[size]}`}>
          HANDYLABS
        </span>
      )}
    </div>
  );
} 