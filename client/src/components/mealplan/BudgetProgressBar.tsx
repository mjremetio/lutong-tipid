import type { FC } from 'react';
import ProgressBar from '../ui/ProgressBar';
import { formatPeso } from '../../lib/formatters';

interface BudgetProgressBarProps {
  totalCost: number;
  weeklyBudget: number;
}

const BudgetProgressBar: FC<BudgetProgressBarProps> = ({ totalCost, weeklyBudget }) => {
  const remaining = Math.round((weeklyBudget - totalCost) * 100) / 100;
  const isOverBudget = remaining < 0;

  return (
    <div className="sticky top-0 z-10 bg-white/95 backdrop-blur-sm rounded-xl px-4 py-3 shadow-sm border border-forest-100">
      <ProgressBar current={totalCost} max={weeklyBudget} showLabel />

      <div className="mt-1">
        {isOverBudget ? (
          <span className="font-body text-sm font-semibold text-red-600">
            {formatPeso(Math.abs(remaining))} over budget!
          </span>
        ) : (
          <span className="font-body text-sm text-forest-600">
            {formatPeso(remaining)} remaining
          </span>
        )}
      </div>
    </div>
  );
};

export default BudgetProgressBar;
