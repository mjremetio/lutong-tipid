import { MIN_BUDGET, MAX_BUDGET } from './constants';

/**
 * Validate the meal planner form inputs on the client side.
 * Returns an array of error messages. Empty array means valid.
 */
export function validateBudgetInput(
  budget: number,
  familySize: number,
  meals: string[]
): string[] {
  const errors: string[] = [];

  if (!Number.isFinite(budget) || budget < MIN_BUDGET) {
    errors.push(
      `Weekly budget must be at least \u20B1${MIN_BUDGET.toLocaleString()}.`
    );
  }

  if (budget > MAX_BUDGET) {
    errors.push(
      `Weekly budget cannot exceed \u20B1${MAX_BUDGET.toLocaleString()}.`
    );
  }

  if (
    !Number.isInteger(familySize) ||
    familySize < 1 ||
    familySize > 12
  ) {
    errors.push('Family size must be between 1 and 12.');
  }

  if (!Array.isArray(meals) || meals.length === 0) {
    errors.push('Select at least one meal type.');
  }

  if (meals.length > 0 && budget > 0 && familySize > 0) {
    const perPersonPerMeal =
      budget / 7 / familySize / meals.length;
    if (perPersonPerMeal < 10) {
      errors.push(
        'Budget is too low for the selected family size and meals. Consider reducing meals or increasing your budget.'
      );
    }
  }

  return errors;
}
