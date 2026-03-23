const OPTIONS = [
  { id: 'no_pork', label: 'No Pork' },
  { id: 'no_seafood', label: 'No Seafood' },
  { id: 'vegetarian', label: 'Vegetarian' },
  { id: 'no_spicy', label: 'No Spicy' },
  { id: 'diabetic_friendly', label: 'Diabetic-Friendly' },
];

interface DietaryPreferencesProps {
  selected: string[];
  onChange: (prefs: string[]) => void;
}

export default function DietaryPreferences({
  selected,
  onChange,
}: DietaryPreferencesProps) {
  function toggle(id: string) {
    if (selected.includes(id)) {
      onChange(selected.filter((s) => s !== id));
    } else {
      onChange([...selected, id]);
    }
  }

  return (
    <div>
      <label className="block font-heading text-sm font-semibold text-forest-700 mb-2">
        Dietary Preferences{' '}
        <span className="font-normal text-gray-400">(optional)</span>
      </label>

      <div className="flex flex-wrap gap-2">
        {OPTIONS.map((opt) => {
          const isSelected = selected.includes(opt.id);
          return (
            <button
              key={opt.id}
              type="button"
              onClick={() => toggle(opt.id)}
              className={`rounded-full border px-4 py-2 text-sm font-medium transition ${
                isSelected
                  ? 'border-gold-400 bg-gold-400 text-forest-900'
                  : 'border-gray-200 bg-gray-100 text-gray-600 hover:border-gray-300'
              }`}
            >
              {opt.label}
            </button>
          );
        })}
      </div>
    </div>
  );
}
