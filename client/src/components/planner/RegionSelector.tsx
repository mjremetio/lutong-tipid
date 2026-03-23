import { REGIONS } from '../../lib/constants';

interface RegionSelectorProps {
  value: string;
  onChange: (region: string) => void;
}

export default function RegionSelector({
  value,
  onChange,
}: RegionSelectorProps) {
  return (
    <div>
      <label
        htmlFor="region-select"
        className="block font-heading text-sm font-semibold text-forest-700 mb-2"
      >
        Region
      </label>

      <select
        id="region-select"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="w-full rounded-xl border border-forest-200 bg-white px-4 py-3 text-sm font-medium text-forest-700 focus:outline-none focus:ring-2 focus:ring-forest-400 appearance-none cursor-pointer"
      >
        {REGIONS.map((r) => (
          <option key={r.id} value={r.id}>
            {r.label}
          </option>
        ))}
      </select>
    </div>
  );
}
