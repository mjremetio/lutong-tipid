import { useState } from 'react';
import { formatPeso } from '../../lib/formatters';
import { MIN_BUDGET, MAX_BUDGET, BUDGET_STEP } from '../../lib/constants';

const CUSTOM_MAX = 50000; // Allow up to ₱50k via text input

interface BudgetSliderProps {
  value: number;
  onChange: (value: number) => void;
}

export default function BudgetSlider({ value, onChange }: BudgetSliderProps) {
  const [rawInput, setRawInput] = useState<string>(String(value));

  // Clamp visual percent to 0–100 for the fill bar
  const sliderValue = Math.min(value, MAX_BUDGET);
  const percent = Math.min(
    Math.max(((sliderValue - MIN_BUDGET) / (MAX_BUDGET - MIN_BUDGET)) * 100, 0),
    100
  );

  const isCustom = value > MAX_BUDGET;

  function handleInputChange(raw: string) {
    // Allow the user to type freely
    setRawInput(raw);
    const num = parseInt(raw.replace(/\D/g, ''), 10);
    if (Number.isNaN(num) || num < MIN_BUDGET) return;
    const clamped = Math.min(CUSTOM_MAX, Math.max(MIN_BUDGET, num));
    const snapped = Math.round(clamped / BUDGET_STEP) * BUDGET_STEP;
    onChange(snapped);
  }

  function handleInputBlur() {
    // Sync display back to actual value on blur
    setRawInput(String(value));
  }

  function handleSliderChange(val: number) {
    onChange(val);
    setRawInput(String(val));
  }

  return (
    <div>
      <label className="block font-heading text-sm font-semibold text-forest-700 mb-1">
        Weekly Budget
      </label>

      {/* Large peso display + manual input */}
      <div className="flex items-center gap-3 mb-3">
        <span className="text-4xl font-bold text-forest-700 font-heading">
          {formatPeso(value, false)}
        </span>
        <input
          type="text"
          inputMode="numeric"
          value={rawInput}
          onChange={(e) => handleInputChange(e.target.value)}
          onBlur={handleInputBlur}
          onFocus={() => setRawInput(String(value))}
          className="w-28 rounded-xl border border-forest-200 px-3 py-2 text-center text-sm font-semibold text-forest-700 focus:outline-none focus:ring-2 focus:ring-forest-400"
          aria-label="Enter exact budget amount"
        />
      </div>

      {/* Custom range slider */}
      <div className="relative">
        <input
          type="range"
          min={MIN_BUDGET}
          max={MAX_BUDGET}
          step={BUDGET_STEP}
          value={sliderValue}
          onChange={(e) => handleSliderChange(Number(e.target.value))}
          className="budget-slider w-full"
          aria-label="Budget slider"
        />
        {/* Visual track fill — capped at 100% */}
        <div
          className="pointer-events-none absolute left-0 top-1/2 h-2 -translate-y-1/2 rounded-full bg-forest-500"
          style={{ width: `${percent}%` }}
        />
      </div>

      <div className="mt-1 flex justify-between text-sm text-gray-500">
        <span>{formatPeso(MIN_BUDGET, false)}</span>
        <span>{formatPeso(MAX_BUDGET, false)}</span>
      </div>

      {/* Custom budget indicator */}
      {isCustom && (
        <p className="mt-2 text-xs text-gold-600 font-medium">
          Custom budget: {formatPeso(value, false)} (above slider max — type in the box above)
        </p>
      )}

      <p className="mt-1 text-xs text-gray-400">
        Max: {formatPeso(CUSTOM_MAX, false)} via text input
      </p>

      {/* Slider styles */}
      <style>{`
        .budget-slider {
          -webkit-appearance: none;
          appearance: none;
          height: 8px;
          border-radius: 9999px;
          background: var(--color-forest-200);
          outline: none;
          position: relative;
          z-index: 1;
        }
        .budget-slider::-webkit-slider-thumb {
          -webkit-appearance: none;
          appearance: none;
          width: 24px;
          height: 24px;
          border-radius: 50%;
          background: var(--color-forest-600);
          cursor: pointer;
          box-shadow: 0 2px 6px rgba(0,0,0,0.2);
          border: 3px solid white;
          position: relative;
          z-index: 2;
        }
        .budget-slider::-moz-range-thumb {
          width: 24px;
          height: 24px;
          border-radius: 50%;
          background: var(--color-forest-600);
          cursor: pointer;
          box-shadow: 0 2px 6px rgba(0,0,0,0.2);
          border: 3px solid white;
        }
        .budget-slider::-moz-range-track {
          height: 8px;
          border-radius: 9999px;
          background: var(--color-forest-200);
        }
        .budget-slider::-moz-range-progress {
          height: 8px;
          border-radius: 9999px;
          background: var(--color-forest-500);
        }
      `}</style>
    </div>
  );
}
