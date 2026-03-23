import { useEffect, type FC } from 'react';
import { CheckCircle, XCircle, Info, X } from 'lucide-react';

interface ToastProps {
  message: string;
  type?: 'success' | 'error' | 'info';
  isVisible: boolean;
  onClose: () => void;
}

const typeConfig: Record<string, { bg: string; icon: FC<{ size?: number }> }> = {
  success: { bg: 'bg-forest-600', icon: CheckCircle },
  error: { bg: 'bg-red-600', icon: XCircle },
  info: { bg: 'bg-gold-500', icon: Info },
};

const Toast: FC<ToastProps> = ({ message, type = 'success', isVisible, onClose }) => {
  useEffect(() => {
    if (!isVisible) return;
    const timer = setTimeout(onClose, 4000);
    return () => clearTimeout(timer);
  }, [isVisible, onClose]);

  if (!isVisible) return null;

  const { bg, icon: Icon } = typeConfig[type];

  return (
    <div
      className={`
        fixed bottom-6 left-1/2 z-50 -translate-x-1/2
        md:left-auto md:right-6 md:translate-x-0
        animate-[toastIn_0.3s_ease-out]
      `}
    >
      <div
        className={`
          flex items-center gap-3 rounded-xl px-5 py-3 text-white shadow-lg
          ${bg}
        `}
        role="alert"
      >
        <Icon size={20} />
        <span className="font-body text-sm font-medium">{message}</span>
        <button
          onClick={onClose}
          className="ml-2 flex h-6 w-6 items-center justify-center rounded-lg transition-colors hover:bg-white/20"
          aria-label="Dismiss"
        >
          <X size={16} />
        </button>
      </div>

      <style>{`
        @keyframes toastIn {
          from { transform: translateY(20px); opacity: 0; }
          to   { transform: translateY(0); opacity: 1; }
        }
      `}</style>
    </div>
  );
};

export default Toast;
