import { useState } from 'react';
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
  const [rawInput, setRawInput] = useState<string>(value > 10 ? String(value) : '');
  const isCustom = value > 10;

  function handleCustomInput(raw: string) {
    setRawInput(raw);
    const digits = raw.replace(/\D/g, '');
    if (digits === '') return;
    const num = parseInt(digits, 10);
    if (Number.isNaN(num) || num < 1) return;
    onChange(Math.min(50, num));
  }

  function handleCustomBlur() {
    if (isCustom) {
      setRawInput(String(value));
    } else {
      setRawInput('');
    }
  }

  function handleCustomFocus() {
    if (isCustom) {
      setRawInput(String(value));
    }
  }

  function handlePresetClick(n: number) {
    onChange(n);
    setRawInput('');
  }

  return (
    <div>
      <label className="block font-heading text-sm font-semibold text-forest-700 mb-2">
        Family Size
      </label>

      <div className="flex gap-2 overflow-x-auto pb-2">
        {presets.map((n) => {
          const isExact = n === value;
          const Icon = n >= 3 ? Users : User;

          return (
            <button
              key={n}
              type="button"
              onClick={() => handlePresetClick(n)}
              className={`flex-shrink-0 flex flex-col items-center justify-center w-11 h-11 rounded-xl transition ${
                isExact
                  ? 'bg-forest-600 text-white shadow-md'
                  : 'bg-gray-50 text-gray-400 hover:bg-gray-100'
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
            value={rawInput}
            placeholder="11+"
            onChange={(e) => handleCustomInput(e.target.value)}
            onBlur={handleCustomBlur}
            onFocus={handleCustomFocus}
            className={`w-14 h-11 rounded-xl border text-center text-sm font-bold transition focus:outline-none focus:ring-2 focus:ring-forest-400 ${
              isCustom
                ? 'border-forest-600 bg-forest-600 text-white'
                : 'border-forest-200 bg-gray-50 text-gray-400'
            }`}
            aria-label="Custom family size (11 and above)"
          />
        </div>
      </div>

      <p className="mt-1 text-sm text-gray-500">
        {value} {value === 1 ? 'tao' : 'tao'} · max 50
      </p>
    </div>
  );
}
