import { useEffect, useCallback, type FC, type ReactNode } from 'react';
import { X } from 'lucide-react';

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title?: string;
  children: ReactNode;
  size?: 'sm' | 'md' | 'lg' | 'full';
}

const maxWidthClasses: Record<string, string> = {
  sm: 'md:max-w-sm',
  md: 'md:max-w-lg',
  lg: 'md:max-w-2xl',
  full: 'md:max-w-4xl',
};

const Modal: FC<ModalProps> = ({
  isOpen,
  onClose,
  title,
  children,
  size = 'md',
}) => {
  const handleKeyDown = useCallback(
    (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    },
    [onClose],
  );

  useEffect(() => {
    if (isOpen) {
      document.addEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'hidden';
    }
    return () => {
      document.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = '';
    };
  }, [isOpen, handleKeyDown]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-end md:items-center md:justify-center">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/40 transition-opacity duration-300"
        onClick={onClose}
        aria-hidden="true"
      />

      {/* Panel */}
      <div
        role="dialog"
        aria-modal="true"
        aria-label={title}
        className={`
          relative z-10 flex w-full flex-col
          rounded-t-2xl bg-white shadow-[0_-4px_30px_rgba(120,90,50,0.12)]
          max-h-[90vh]
          transition-transform duration-300 ease-out
          animate-[slideUp_0.3s_ease-out]
          md:rounded-2xl md:mx-4 ${maxWidthClasses[size]}
        `}
      >
        {/* Header */}
        <div className="flex items-center justify-between border-b border-forest-100 px-5 py-4">
          {title && (
            <h2 className="font-heading text-lg font-bold text-forest-800">
              {title}
            </h2>
          )}
          <button
            onClick={onClose}
            className="ml-auto flex h-9 w-9 items-center justify-center rounded-xl text-forest-500 transition-colors hover:bg-forest-50 hover:text-forest-700"
            aria-label="Close"
          >
            <X size={20} />
          </button>
        </div>

        {/* Body */}
        <div className="flex-1 overflow-y-auto px-5 py-4">{children}</div>
      </div>

      <style>{`
        @keyframes slideUp {
          from { transform: translateY(100%); }
          to   { transform: translateY(0); }
        }
        @media (min-width: 768px) {
          @keyframes slideUp {
            from { transform: scale(0.95); opacity: 0; }
            to   { transform: scale(1); opacity: 1; }
          }
        }
      `}</style>
    </div>
  );
};

export default Modal;
