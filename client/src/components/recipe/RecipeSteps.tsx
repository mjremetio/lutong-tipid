import type { FC } from 'react';
import type { RecipeStep } from '../../lib/types';
import Badge from '../ui/Badge';

interface RecipeStepsProps {
  steps: RecipeStep[];
}

const RecipeSteps: FC<RecipeStepsProps> = ({ steps }) => {
  return (
    <div>
      <h3 className="font-heading text-base font-bold text-forest-800 mb-4">
        Instructions
      </h3>

      <ol className="space-y-5">
        {steps.map((step) => (
          <li key={step.step_number} className="flex gap-4">
            {/* Step number circle */}
            <div className="flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full bg-forest-600 text-white text-sm font-bold">
              {step.step_number}
            </div>

            <div className="flex-1 pt-1">
              {/* Instruction text */}
              <p className="font-body text-sm text-forest-800 leading-relaxed">
                {step.instruction}
              </p>

              {/* Duration badge */}
              {step.duration_minutes && (
                <Badge variant="gray" className="mt-2">
                  {step.duration_minutes} min
                </Badge>
              )}

              {/* Tip */}
              {step.tip && (
                <p className="mt-2 font-body text-xs italic text-gold-700 bg-gold-50 rounded-lg px-3 py-1.5">
                  Tip: {step.tip}
                </p>
              )}
            </div>
          </li>
        ))}
      </ol>
    </div>
  );
};

export default RecipeSteps;
