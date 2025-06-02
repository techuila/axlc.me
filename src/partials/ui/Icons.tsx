import React from 'react';

type StackOverflowIconProps = { size?: number; className?: string };

export const StackOverflowIcon: React.FC<StackOverflowIconProps> = ({
  size = 20,
  className = '',
}) => {
  return (
    <svg
      className={className}
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="currentColor"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path d="M18.986 21.865v-6.404h2.134V24H1.844v-8.539h2.13v6.404h15.012zM6.111 19.731H16.85v-2.137H6.111v2.137zm.259-4.852l10.48 2.189.451-2.07-10.478-2.187-.453 2.068zm1.359-5.056l9.705 4.53.903-1.95-9.706-4.53-.902 1.95zm2.715-4.785l8.217 6.855 1.359-1.62-8.216-6.853-1.36 1.618zM15.539 0l-1.7 1.265 6.305 8.516 1.7-1.265L15.539 0z" />
    </svg>
  );
};
