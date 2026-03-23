import type { FC } from 'react';
import { formatPeso } from '../../lib/formatters';

interface ProgressBarProps {
  current: number;
  max: number;
  showLabel?: boolean;
  className?: string;
}

function getBarColor(rawPercentage: number): string {
  if (rawPercentage > 100) return 'bg-red-600';
  if (rawPercentage > 95) return 'bg-red-500';
  if (rawPercentage >= 80) return 'bg-yellow-500';
  return 'bg-forest-500';
}

const ProgressBar: FC<ProgressBarProps> = ({
  current,
  max,
  showLabel = false,
  className = '',
}) => {
  const rawPercentage = max > 0 ? (current / max) * 100 : 0;
  const barWidth = Math.min(rawPercentage, 100);
  const displayPercentage = Math.round(rawPercentage);
  const isOverBudget = current > max;

  return (
    <div className={className}>
      {showLabel && (
        <div className="mb-1.5 flex items-center justify-between text-sm font-body">
          <span className={`font-medium ${isOverBudget ? 'text-red-600' : 'text-forest-700'}`}>
            {formatPeso(current)} / {formatPeso(max)}
          </span>
          <span className={isOverBudget ? 'text-red-600 font-semibold' : 'text-forest-500'}>
            {displayPercentage}%
          </span>
        </div>
      )}
      <div className={`h-3 w-full overflow-hidden rounded-full ${isOverBudget ? 'bg-red-100' : 'bg-forest-100'}`}>
        <div
          className={`h-full rounded-full transition-all duration-500 ease-out ${getBarColor(rawPercentage)}`}
          style={{ width: `${barWidth}%` }}
          role="progressbar"
          aria-valuenow={current}
          aria-valuemin={0}
          aria-valuemax={max}
        />
      </div>
    </div>
  );
};

export default ProgressBar;
