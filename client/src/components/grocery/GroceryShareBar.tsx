import { useState, useCallback, type FC } from 'react';
import { Copy, Share2, FileText, FileSpreadsheet } from 'lucide-react';
import type { GroceryCategory, BudgetSummary } from '../../lib/types';
import { groceryListToText, groceryListToCsv, downloadText, downloadCsv } from '../../lib/exporters';
import Button from '../ui/Button';
import Toast from '../ui/Toast';

interface GroceryShareBarProps {
  groceryList: GroceryCategory[];
  budgetSummary?: BudgetSummary;
}

const GroceryShareBar: FC<GroceryShareBarProps> = ({ groceryList, budgetSummary }) => {
  const [toast, setToast] = useState<{ visible: boolean; message: string; type: 'success' | 'error' }>({
    visible: false,
    message: '',
    type: 'success',
  });

  const defaultSummary: BudgetSummary = budgetSummary ?? {
    weekly_budget: 0,
    total_estimated_cost: 0,
    remaining_budget: 0,
    cost_per_person_per_day: 0,
  };

  const plainText = groceryListToText(groceryList, defaultSummary);

  const handleCopy = useCallback(async () => {
    try {
      await navigator.clipboard.writeText(plainText);
      setToast({ visible: true, message: 'Na-copy na ang grocery list!', type: 'success' });
    } catch {
      setToast({ visible: true, message: 'Hindi na-copy. Try again.', type: 'error' });
    }
  }, [plainText]);

  const handleShare = useCallback(async () => {
    if (navigator.share) {
      try {
        await navigator.share({ title: 'Grocery List — Lutong Tipid', text: plainText });
      } catch {
        // user cancelled
      }
    } else {
      await handleCopy();
    }
  }, [plainText, handleCopy]);

  const handleDownloadText = useCallback(() => {
    downloadText(plainText, 'lutong-tipid-grocery-list.txt');
  }, [plainText]);

  const handleDownloadCsv = useCallback(() => {
    downloadCsv(groceryListToCsv(groceryList), 'lutong-tipid-grocery-list.csv');
  }, [groceryList]);

  return (
    <>
      <div className="sticky bottom-0 z-10 flex flex-wrap gap-2 border-t border-forest-100 bg-white/95 backdrop-blur-sm px-4 py-3">
        <Button variant="outline" size="sm" onClick={handleCopy}>
          <Copy size={16} />
          Copy
        </Button>
        <Button variant="primary" size="sm" onClick={handleShare}>
          <Share2 size={16} />
          Share
        </Button>
        <Button variant="outline" size="sm" onClick={handleDownloadText}>
          <FileText size={16} />
          .txt
        </Button>
        <Button variant="outline" size="sm" onClick={handleDownloadCsv}>
          <FileSpreadsheet size={16} />
          .csv
        </Button>
      </div>

      <Toast
        message={toast.message}
        type={toast.type}
        isVisible={toast.visible}
        onClose={() => setToast((prev) => ({ ...prev, visible: false }))}
      />
    </>
  );
};

export default GroceryShareBar;
