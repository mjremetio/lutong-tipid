import type { FC } from 'react';

interface SpinnerProps {
  size?: 'sm' | 'md' | 'lg';
  color?: 'forest' | 'gold' | 'white';
}

const sizeClasses: Record<string, string> = {
  sm: 'h-4 w-4 border-2',
  md: 'h-6 w-6 border-2',
  lg: 'h-10 w-10 border-3',
};

const colorClasses: Record<string, string> = {
  forest: 'border-forest-200 border-t-forest-600',
  gold: 'border-gold-200 border-t-gold-500',
  white: 'border-white/30 border-t-white',
};

const Spinner: FC<SpinnerProps> = ({ size = 'md', color = 'forest' }) => {
  return (
    <span
      role="status"
      aria-label="Loading"
      className={`inline-block animate-spin rounded-full ${sizeClasses[size]} ${colorClasses[color]}`}
    />
  );
};

export default Spinner;
