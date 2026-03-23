/**
 * Format a number as Philippine Peso currency.
 * Examples: 1234.5 -> "₱1,234.50", 1234 -> "₱1,234"
 */
export function formatPeso(amount: number, decimals: boolean = true): string {
  const rounded = Math.round(amount * 100) / 100;
  if (!decimals || rounded === Math.floor(rounded)) {
    return `\u20B1${Math.floor(rounded).toLocaleString('en-PH')}`;
  }
  return `\u20B1${rounded.toLocaleString('en-PH', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
}

/**
 * Format a Date object as a human-readable string.
 * Example: "Wednesday, March 19, 2026"
 */
export function formatDate(date: Date): string {
  return date.toLocaleDateString('en-PH', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
}

/**
 * Format cooking time in minutes to a readable string.
 * Examples:
 *   30  -> "30 min"
 *   75  -> "1 hr 15 min"
 *   120 -> "2 hrs"
 */
export function formatCookingTime(minutes: number): string {
  if (minutes < 60) {
    return `${minutes} min`;
  }
  const hours = Math.floor(minutes / 60);
  const remaining = minutes % 60;
  const hourLabel = hours === 1 ? 'hr' : 'hrs';
  if (remaining === 0) {
    return `${hours} ${hourLabel}`;
  }
  return `${hours} ${hourLabel} ${remaining} min`;
}
