import type { FC, ReactNode } from 'react';

interface BadgeProps {
  variant?: 'green' | 'yellow' | 'red' | 'gold' | 'gray';
  children: ReactNode;
  className?: string;
}

const variantClasses: Record<string, string> = {
  green: 'bg-forest-100 text-forest-700',
  yellow: 'bg-yellow-100 text-yellow-700',
  red: 'bg-red-100 text-red-700',
  gold: 'bg-gold-100 text-gold-700',
  gray: 'bg-gray-100 text-gray-600',
};

const Badge: FC<BadgeProps> = ({ variant = 'green', children, className = '' }) => {
  return (
    <span
      className={`inline-flex items-center rounded-full px-3 py-1 text-xs font-semibold ${variantClasses[variant]} ${className}`}
    >
      {children}
    </span>
  );
};

export default Badge;
