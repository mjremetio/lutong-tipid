import type { FC, ReactNode } from 'react';

interface CardProps {
  padding?: 'sm' | 'md' | 'lg';
  hover?: boolean;
  children: ReactNode;
  className?: string;
}

const paddingClasses: Record<string, string> = {
  sm: 'p-3',
  md: 'p-5',
  lg: 'p-7',
};

const Card: FC<CardProps> = ({
  padding = 'md',
  hover = false,
  children,
  className = '',
}) => {
  return (
    <div
      className={`
        rounded-2xl bg-white shadow-[0_4px_20px_rgba(120,90,50,0.08)]
        ${paddingClasses[padding]}
        ${hover ? 'transition-shadow duration-200 hover:shadow-[0_8px_30px_rgba(120,90,50,0.14)]' : ''}
        ${className}
      `}
    >
      {children}
    </div>
  );
};

export default Card;
