/**
 * Formats a numeric amount as FCFA, matching the spacing style used
 * throughout MyMenu (e.g. 125,500 FCFA).
 */
export function formatFCFA(amount) {
  const value = Number(amount) || 0;
  return `${value.toLocaleString('en-US')} FCFA`;
}
