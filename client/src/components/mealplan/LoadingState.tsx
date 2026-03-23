import { useState, useEffect, type FC } from 'react';
import { LOADING_MESSAGES } from '../../lib/constants';

interface LoadingStateProps {
  isVisible?: boolean;
}

const LoadingState: FC<LoadingStateProps> = ({ isVisible = true }) => {
  const [messageIndex, setMessageIndex] = useState(0);

  useEffect(() => {
    if (!isVisible) return;
    const interval = setInterval(() => {
      setMessageIndex((prev) => (prev + 1) % LOADING_MESSAGES.length);
    }, 2000);
    return () => clearInterval(interval);
  }, [isVisible]);

  if (!isVisible) return null;

  return (
    <div className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-cream/80 backdrop-blur-sm animate-[pulse_3s_ease-in-out_infinite]">
      {/* Cooking pot with steam */}
      <div className="relative mb-8">
        {/* Steam lines */}
        <div className="absolute -top-12 left-1/2 -translate-x-1/2 flex gap-2">
          <div className="steam-line w-1.5 h-8 rounded-full bg-forest-300/60 animate-[steam1_2s_ease-in-out_infinite]" />
          <div className="steam-line w-1.5 h-10 rounded-full bg-forest-300/50 animate-[steam2_2s_ease-in-out_infinite_0.3s]" />
          <div className="steam-line w-1.5 h-7 rounded-full bg-forest-300/40 animate-[steam3_2s_ease-in-out_infinite_0.6s]" />
        </div>

        {/* Pot icon */}
        <div className="animate-[bob_2s_ease-in-out_infinite]">
          <svg
            width="80"
            height="80"
            viewBox="0 0 80 80"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="text-forest-600"
          >
            {/* Pot body */}
            <rect x="12" y="35" width="56" height="30" rx="6" fill="currentColor" />
            {/* Pot rim */}
            <rect x="8" y="30" width="64" height="8" rx="4" fill="currentColor" />
            {/* Lid handle */}
            <rect x="34" y="22" width="12" height="8" rx="4" fill="currentColor" opacity="0.8" />
            {/* Handles */}
            <rect x="2" y="42" width="12" height="6" rx="3" fill="currentColor" opacity="0.7" />
            <rect x="66" y="42" width="12" height="6" rx="3" fill="currentColor" opacity="0.7" />
            {/* Base */}
            <rect x="20" y="65" width="40" height="4" rx="2" fill="currentColor" opacity="0.5" />
          </svg>
        </div>
      </div>

      {/* Loading message */}
      <p className="font-heading text-xl text-forest-700 text-center px-6 transition-opacity duration-300">
        {LOADING_MESSAGES[messageIndex]}
      </p>

      <style>{`
        @keyframes bob {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-8px); }
        }
        @keyframes steam1 {
          0% { opacity: 0; transform: translateY(0) scaleX(1); }
          50% { opacity: 0.6; transform: translateY(-16px) scaleX(1.3); }
          100% { opacity: 0; transform: translateY(-32px) scaleX(0.8); }
        }
        @keyframes steam2 {
          0% { opacity: 0; transform: translateY(0) scaleX(1); }
          50% { opacity: 0.5; transform: translateY(-20px) scaleX(0.7); }
          100% { opacity: 0; transform: translateY(-36px) scaleX(1.2); }
        }
        @keyframes steam3 {
          0% { opacity: 0; transform: translateY(0) scaleX(1); }
          50% { opacity: 0.4; transform: translateY(-14px) scaleX(1.1); }
          100% { opacity: 0; transform: translateY(-28px) scaleX(0.6); }
        }
        @keyframes pulse {
          0%, 100% { background-color: rgba(var(--color-cream), 0.8); }
          50% { background-color: rgba(var(--color-cream), 0.9); }
        }
      `}</style>
    </div>
  );
};

export default LoadingState;
