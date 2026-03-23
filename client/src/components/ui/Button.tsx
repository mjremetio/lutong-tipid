import type { ButtonHTMLAttributes, FC, ReactNode } from 'react';
import Spinner from './Spinner';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
  fullWidth?: boolean;
  loading?: boolean;
  children: ReactNode;
}

const variantClasses: Record<string, string> = {
  primary:
    'bg-forest-600 text-white hover:bg-forest-700 active:bg-forest-800 focus-visible:ring-forest-400',
  secondary:
    'bg-gold-400 text-forest-900 hover:bg-gold-500 active:bg-gold-600 focus-visible:ring-gold-300',
  outline:
    'border-2 border-forest-300 text-forest-700 hover:bg-forest-50 active:bg-forest-100 focus-visible:ring-forest-300',
  ghost:
    'text-forest-700 hover:bg-forest-50 active:bg-forest-100 focus-visible:ring-forest-300',
};

const sizeClasses: Record<string, string> = {
  sm: 'min-h-[44px] px-4 py-2 text-sm',
  md: 'min-h-[44px] px-6 py-2.5 text-base',
  lg: 'min-h-[52px] px-8 py-3 text-lg',
};

const Button: FC<ButtonProps> = ({
  variant = 'primary',
  size = 'md',
  fullWidth = false,
  loading = false,
  disabled = false,
  children,
  className = '',
  ...rest
}) => {
  const isDisabled = disabled || loading;

  return (
    <button
      disabled={isDisabled}
      className={`
        inline-flex items-center justify-center gap-2
        rounded-xl font-heading font-semibold
        transition-colors duration-150 ease-in-out
        focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2
        disabled:cursor-not-allowed disabled:opacity-50
        ${variantClasses[variant]}
        ${sizeClasses[size]}
        ${fullWidth ? 'w-full' : ''}
        ${className}
      `}
      {...rest}
    >
      {loading && (
        <Spinner
          size="sm"
          color={variant === 'primary' ? 'white' : 'forest'}
        />
      )}
      {children}
    </button>
  );
};

export default Button;
