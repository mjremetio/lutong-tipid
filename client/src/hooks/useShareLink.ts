import { useState, useCallback, useRef } from 'react';

interface UseShareLinkReturn {
  copyToClipboard: (text: string) => Promise<boolean>;
  shareLink: (title: string, text: string) => Promise<boolean>;
  toastMessage: string | null;
  toastType: 'success' | 'error' | 'info';
  showToast: boolean;
  dismissToast: () => void;
}

export default function useShareLink(): UseShareLinkReturn {
  const [toastMessage, setToastMessage] = useState<string | null>(null);
  const [toastType, setToastType] = useState<'success' | 'error' | 'info'>(
    'info'
  );
  const [showToast, setShowToast] = useState(false);
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const showToastMessage = useCallback(
    (message: string, type: 'success' | 'error' | 'info') => {
      // Clear any existing timer
      if (timerRef.current) {
        clearTimeout(timerRef.current);
      }

      setToastMessage(message);
      setToastType(type);
      setShowToast(true);

      timerRef.current = setTimeout(() => {
        setShowToast(false);
      }, 3000);
    },
    []
  );

  const dismissToast = useCallback(() => {
    if (timerRef.current) {
      clearTimeout(timerRef.current);
    }
    setShowToast(false);
  }, []);

  const copyToClipboard = useCallback(
    async (text: string): Promise<boolean> => {
      try {
        await navigator.clipboard.writeText(text);
        showToastMessage('Copied to clipboard!', 'success');
        return true;
      } catch {
        showToastMessage('Failed to copy to clipboard.', 'error');
        return false;
      }
    },
    [showToastMessage]
  );

  const shareLink = useCallback(
    async (title: string, text: string): Promise<boolean> => {
      // Try native share API first
      if (navigator.share) {
        try {
          await navigator.share({ title, text });
          showToastMessage('Shared successfully!', 'success');
          return true;
        } catch (err) {
          // User cancelled the share dialog — not an error
          if (err instanceof Error && err.name === 'AbortError') {
            return false;
          }
          // Fall through to clipboard fallback
        }
      }

      // Fallback to clipboard
      return copyToClipboard(text);
    },
    [copyToClipboard, showToastMessage]
  );

  return {
    copyToClipboard,
    shareLink,
    toastMessage,
    toastType,
    showToast,
    dismissToast,
  };
}
