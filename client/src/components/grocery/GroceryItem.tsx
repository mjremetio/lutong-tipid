import type { FC } from 'react';
import { Home } from 'lucide-react';
import type { GroceryItem as GroceryItemType } from '../../lib/types';
import { formatPeso } from '../../lib/formatters';

interface GroceryItemProps {
  item: GroceryItemType;
}

const GroceryItem: FC<GroceryItemProps> = ({ item }) => {
  const isPantryStaple = item.store_section.toLowerCase().includes('pantry');

  return (
    <div className="flex items-center gap-3 py-2 px-1">
      {/* Decorative checkbox */}
      <div className="flex h-5 w-5 flex-shrink-0 items-center justify-center rounded border-2 border-forest-300">
        <div className="h-0 w-0" />
      </div>

      {/* Item name + pantry indicator */}
      <div className="flex-1 min-w-0">
        <span className="font-body text-sm text-forest-800">{item.name}</span>
        {isPantryStaple && (
          <span className="ml-2 inline-flex items-center gap-1 text-xs text-gray-400">
            <Home size={10} />
            may have at home
          </span>
        )}
      </div>

      {/* Quantity */}
      <span className="flex-shrink-0 font-body text-sm text-forest-600">
        {item.quantity}
      </span>

      {/* Price */}
      <span className="flex-shrink-0 font-body text-sm font-medium text-forest-700 w-16 text-right">
        {formatPeso(item.estimated_cost)}
      </span>
    </div>
  );
};

export default GroceryItem;
