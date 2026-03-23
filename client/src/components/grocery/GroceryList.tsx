import type { FC } from 'react';
import type { GroceryCategory as GroceryCategoryType, BudgetSummary } from '../../lib/types';
import { formatPeso } from '../../lib/formatters';
import Card from '../ui/Card';
import ProgressBar from '../ui/ProgressBar';
import GroceryCategory from './GroceryCategory';
import GroceryShareBar from './GroceryShareBar';

interface GroceryListProps {
  groceryList: GroceryCategoryType[];
  budgetSummary: BudgetSummary;
}

const GroceryList: FC<GroceryListProps> = ({ groceryList, budgetSummary }) => {
  const runningTotal = groceryList.reduce(
    (sum, cat) => sum + cat.items.reduce((s, item) => s + item.estimated_cost, 0),
    0,
  );

  return (
    <div className="flex flex-col">
      {/* Budget summary card */}
      <Card padding="md" className="mb-4">
        <h2 className="font-heading text-lg font-bold text-forest-800 mb-2">
          Budget Summary
        </h2>
        <div className="flex items-center justify-between mb-2">
          <span className="font-body text-sm text-forest-700">
            {formatPeso(budgetSummary.total_estimated_cost)} / {formatPeso(budgetSummary.weekly_budget)}
          </span>
          <span className="font-body text-sm text-forest-500">
            {budgetSummary.weekly_budget > 0
              ? `${Math.round((budgetSummary.total_estimated_cost / budgetSummary.weekly_budget) * 100)}%`
              : '0%'}
          </span>
        </div>
        <ProgressBar current={budgetSummary.total_estimated_cost} max={budgetSummary.weekly_budget} />
        <p className="mt-2 font-body text-sm text-forest-600">
          {budgetSummary.remaining_budget >= 0
            ? `${formatPeso(budgetSummary.remaining_budget)} remaining`
            : `${formatPeso(Math.abs(budgetSummary.remaining_budget))} over budget`}
        </p>
      </Card>

      {/* Category sections */}
      <Card padding="sm" className="mb-20">
        {groceryList.map((category, index) => (
          <GroceryCategory key={`${category.category}-${index}`} category={category} />
        ))}

        {/* Running total */}
        <div className="mt-4 flex justify-between border-t-2 border-forest-200 pt-3 px-2">
          <span className="font-heading font-bold text-forest-800">Total</span>
          <span className="font-heading font-bold text-forest-800">
            {formatPeso(runningTotal)}
          </span>
        </div>
      </Card>

      {/* Share bar */}
      <GroceryShareBar groceryList={groceryList} budgetSummary={budgetSummary} />
    </div>
  );
};

export default GroceryList;
