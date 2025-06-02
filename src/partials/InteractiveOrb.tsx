import React, { useState } from 'react';

interface InteractiveOrbProps {
  title: string;
  link: string;
  color?: string;
  size?: 'sm' | 'md' | 'lg';
  children?: React.ReactNode;
}

export const InteractiveOrb: React.FC<InteractiveOrbProps> = ({
  title,
  link,
  color = 'from-indigo-400 to-purple-500',
  size = 'md',
  children,
}) => {
  const [hovered, setHovered] = useState(false);

  const sizeClasses = {
    sm: 'w-16 h-16',
    md: 'w-24 h-24',
    lg: 'w-32 h-32',
  };

  return (
    <div className="group relative">
      <a
        href={link}
        target="_blank"
        rel="noopener noreferrer"
        className={`
          interactive-element rounded-full 
          ${sizeClasses[size]} 
          bg-gradient-to-br ${color}
          flex items-center justify-center
          shadow-lg
          ${hovered ? 'scale-110' : ''}
          transition-all duration-300
        `}
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
      >
        {children}
      </a>

      <div
        className={`
        absolute -bottom-10 left-1/2 -translate-x-1/2 whitespace-nowrap
        rounded-md bg-white p-2 text-sm
        font-medium text-indigo-600 opacity-0
        shadow-md transition-opacity
        duration-300 group-hover:opacity-100
      `}
      >
        {title}
      </div>
    </div>
  );
};
