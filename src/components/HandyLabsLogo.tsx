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
          {/* H Letter - Left vertical bar */}
          <rect x="5" y="5" width="12" height="90" fill="currentColor" />
          
          {/* H Letter - Right vertical bar */}
          <rect x="28" y="5" width="12" height="90" fill="currentColor" />
          
          {/* H Letter - Horizontal crossbar */}
          <rect x="5" y="42" width="35" height="16" fill="currentColor" />
          
          {/* Lightning bolt in center */}
          <path 
            d="M52 5 L52 35 L65 35 L45 65 L45 35 L32 35 L52 5 Z" 
            fill="currentColor"
          />
          
          {/* L Letter - Vertical bar */}
          <rect x="70" y="5" width="12" height="90" fill="currentColor" />
          
          {/* L Letter - Horizontal base */}
          <rect x="70" y="83" width="25" height="12" fill="currentColor" />
        </svg>
      </div>
      
      {/* HandyLabs Text */}
      {showText && (
        <span className={`font-bold tracking-tight ${textSizeClasses[size]}`}>
          HANDYLABS
        </span>
      )}
    </div>
  );
} 