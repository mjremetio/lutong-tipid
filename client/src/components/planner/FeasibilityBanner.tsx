import { AlertCircle, AlertTriangle, CheckCircle, ThumbsUp } from 'lucide-react';
import { formatPeso } from '../../lib/formatters';
import type { FeasibilityResponse } from '../../lib/types';

interface FeasibilityBannerProps {
  feasibility: FeasibilityResponse | null;
}

const CONFIG: Record<
  FeasibilityResponse['level'],
  { bg: string; border: string; text: string; Icon: typeof AlertCircle }
> = {
  unrealistic: {
    bg: 'bg-red-50',
    border: 'border-red-300',
    text: 'text-red-800',
    Icon: AlertCircle,
  },
  tight: {
    bg: 'bg-yellow-50',
    border: 'border-yellow-300',
    text: 'text-yellow-800',
    Icon: AlertTriangle,
  },
  moderate: {
    bg: 'bg-forest-50',
    border: 'border-forest-300',
    text: 'text-forest-800',
    Icon: CheckCircle,
  },
  comfortable: {
    bg: 'bg-forest-100',
    border: 'border-forest-400',
    text: 'text-forest-800',
    Icon: ThumbsUp,
  },
};

export default function FeasibilityBanner({
  feasibility,
}: FeasibilityBannerProps) {
  if (!feasibility) return null;

  const { level, budget_per_person_per_meal, message, suggestions } =
    feasibility;
  const { bg, border, text, Icon } = CONFIG[level];

  return (
    <div
      className={`animate-slide-down rounded-xl border ${border} ${bg} p-4`}
    >
      <div className="flex items-start gap-3">
        <Icon className={`h-5 w-5 mt-0.5 flex-shrink-0 ${text}`} />
        <div className="flex-1 min-w-0">
          <p className={`text-sm font-bold ${text}`}>
            {formatPeso(budget_per_person_per_meal)} per person per meal
          </p>
          <p className={`mt-1 text-sm ${text} opacity-90`}>{message}</p>
          {suggestions.length > 0 && (
            <ul className={`mt-2 text-xs ${text} opacity-80 list-disc list-inside`}>
              {suggestions.map((s, i) => (
                <li key={i}>{s}</li>
              ))}
            </ul>
          )}
        </div>
      </div>

      {/* Animation keyframe */}
      <style>{`
        @keyframes slide-down {
          from { opacity: 0; transform: translateY(-8px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        .animate-slide-down {
          animation: slide-down 0.3s ease-out;
        }
      `}</style>
    </div>
  );
}
