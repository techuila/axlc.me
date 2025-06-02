import React from 'react';

interface TextOverlayProps {
  title: string;
  subtitle?: string;
  description: string;
  position: 'left' | 'right' | 'center';
  children?: React.ReactNode;
}

export const TextOverlay: React.FC<TextOverlayProps> = ({
  title,
  subtitle,
  description,
  position,
  children,
}) => {
  const positionClasses = {
    left: 'md:ml-12 lg:ml-24 md:items-start md:text-left items-center text-center',
    right:
      'md:mr-12 lg:mr-24 md:items-end md:text-right items-center text-center',
    center: 'items-center text-center',
  };

  const titleAlignment = {
    left: 'text-center md:text-left',
    right: 'text-center md:text-right',
    center: 'text-center',
  };

  const contentAlignment = {
    left: 'text-center md:text-left',
    right: 'text-center md:text-right',
    center: 'text-center',
  };

  return (
    <div className={`text-overlay max-w-lg p-6 ${positionClasses[position]}`}>
      <h2
        className={`mb-2 text-4xl font-bold text-indigo-600 md:text-5xl ${titleAlignment[position]}`}
      >
        {title}
      </h2>
      {subtitle && (
        <h3
          className={`mb-4 text-xl font-medium text-slate-300 md:text-2xl ${titleAlignment[position]}`}
        >
          {subtitle}
        </h3>
      )}
      <p
        className={`mb-8 leading-relaxed text-slate-400 ${contentAlignment[position]}`}
      >
        {description}
      </p>
      {children}
    </div>
  );
};
