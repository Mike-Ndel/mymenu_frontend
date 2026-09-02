/**
 * Formats an ISO timestamp as a 12-hour clock time, matching the style
 * used throughout MyMenu (e.g. 10:42 AM).
 */
export function formatOrderTime(isoString) {
  const date = new Date(isoString);
  if (Number.isNaN(date.getTime())) return '';
  return date.toLocaleTimeString('en-US', {
    hour: 'numeric',
    minute: '2-digit',
    hour12: true,
  });
}

/**
 * Formats an ISO timestamp as a short date + time, used in the order
 * details drawer (e.g. Aug 26, 2026 · 10:42 AM).
 */
export function formatOrderDateTime(isoString) {
  const date = new Date(isoString);
  if (Number.isNaN(date.getTime())) return '';
  const datePart = date.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
  return `${datePart} · ${formatOrderTime(isoString)}`;
}
