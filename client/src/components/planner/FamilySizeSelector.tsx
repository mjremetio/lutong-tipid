import { User, Users } from 'lucide-react';

interface FamilySizeSelectorProps {
  value: number;
  onChange: (value: number) => void;
}

export default function FamilySizeSelector({
  value,
  onChange,
}: FamilySizeSelectorProps) {
  const presets = Array.from({ length: 10 }, (_, i) => i + 1);

  function handleCustomInput(raw: string) {
    const num = parseInt(raw.replace(/\D/g, ''), 10);
    if (Number.isNaN(num)) return;
    onChange(Math.max(1, Math.min(50, num)));
  }

  return (
    <div>
      <label className="block font-heading text-sm font-semibold text-forest-700 mb-2">
        Family Size
      </label>

      <div className="flex gap-2 overflow-x-auto pb-2">
        {presets.map((n) => {
          const isSelected = n <= value && value <= 10;
          const isExact = n === value;
          const Icon = n >= 3 ? Users : User;

          return (
            <button
              key={n}
              type="button"
              onClick={() => onChange(n)}
              className={`flex-shrink-0 flex flex-col items-center justify-center w-11 h-11 rounded-xl transition ${
                isExact
                  ? 'bg-forest-600 text-white shadow-md'
                  : isSelected
                  ? 'bg-forest-100 text-forest-600'
                  : 'bg-gray-50 text-gray-300 hover:bg-gray-100'
              }`}
              aria-label={`${n} ${n === 1 ? 'person' : 'people'}`}
            >
              <Icon className="h-5 w-5" />
              <span className="text-[10px] font-bold mt-0.5">{n}</span>
            </button>
          );
        })}

        {/* Custom input for larger families */}
        <div className="flex-shrink-0 flex flex-col items-center justify-center">
          <input
            type="text"
            inputMode="numeric"
            value={value > 10 ? value : ''}
            placeholder="11+"
            onChange={(e) => handleCustomInput(e.target.value)}
            className={`w-11 h-11 rounded-xl border text-center text-sm font-bold transition focus:outline-none focus:ring-2 focus:ring-forest-400 ${
              value > 10
                ? 'border-forest-600 bg-forest-600 text-white'
                : 'border-forest-200 bg-gray-50 text-gray-400'
            }`}
            aria-label="Custom family size"
          />
        </div>
      </div>

      <p className="mt-1 text-sm text-gray-500">
        {value} {value === 1 ? 'tao' : 'tao'}
      </p>
    </div>
  );
}
