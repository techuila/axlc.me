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
    left: 'ml-12 md:ml-24 items-start text-left',
    right: 'mr-12 md:mr-24 items-end text-right',
    center: 'items-center text-center',
  };

  return (
    <div className={`text-overlay max-w-lg p-6 ${positionClasses[position]}`}>
      <h2 className="mb-2 text-center text-4xl font-bold text-indigo-600 md:text-5xl">
        {title}
      </h2>
      {subtitle && (
        <h3 className="mb-4 text-center text-xl font-medium text-slate-300 md:text-2xl">
          {subtitle}
        </h3>
      )}
      <p className="mb-8 text-center leading-relaxed text-slate-400">
        {description}
      </p>
      {children}
    </div>
  );
};
