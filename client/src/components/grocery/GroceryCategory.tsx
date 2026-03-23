import { useState, type FC } from 'react';
import { ChevronDown, ChevronUp } from 'lucide-react';
import type { GroceryCategory as GroceryCategoryType } from '../../lib/types';
import { formatPeso } from '../../lib/formatters';
import Badge from '../ui/Badge';
import GroceryItem from './GroceryItem';

interface GroceryCategoryProps {
  category: GroceryCategoryType;
}

const GroceryCategory: FC<GroceryCategoryProps> = ({ category }) => {
  const [isExpanded, setIsExpanded] = useState(true);

  const subtotal = Math.round(
    category.items.reduce((sum, item) => sum + item.estimated_cost, 0) * 100
  ) / 100;

  return (
    <div className="border-b border-forest-100 last:border-b-0">
      {/* Category header */}
      <button
        onClick={() => setIsExpanded(!isExpanded)}
        className="flex w-full items-center justify-between py-3 px-2 transition-colors hover:bg-forest-50/50"
      >
        <div className="flex items-center gap-2">
          <h3 className="font-heading font-semibold text-forest-800">
            {category.category}
          </h3>
          <Badge variant="gray">{category.items.length}</Badge>
        </div>
        {isExpanded ? (
          <ChevronUp size={18} className="text-forest-500" />
        ) : (
          <ChevronDown size={18} className="text-forest-500" />
        )}
      </button>

      {/* Items list */}
      {isExpanded && (
        <div className="pb-3 px-2">
          {category.items.map((item, index) => (
            <GroceryItem key={`${item.name}-${index}`} item={item} />
          ))}

          {/* Subtotal */}
          <div className="mt-2 flex justify-end border-t border-dashed border-forest-200 pt-2 pr-1">
            <span className="font-body text-sm font-semibold text-forest-700">
              Subtotal: {formatPeso(subtotal)}
            </span>
          </div>
        </div>
      )}
    </div>
  );
};

export default GroceryCategory;
