import { generateQrMatrix, QR_GRID_SIZE } from '../../utils/qrPattern';

/**
 * Renders a QR-code-*styled* SVG for a given seed (e.g. a table's QR id).
 * Visual placeholder only — not a scannable code. Pure SVG/CSS, no
 * dependency added.
 */
export default function QrPreview({ value, size = 56, className = '' }) {
  const matrix = generateQrMatrix(value);

  return (
    <svg
      viewBox={`0 0 ${QR_GRID_SIZE} ${QR_GRID_SIZE}`}
      width={size}
      height={size}
      className={`shrink-0 rounded-md bg-white ${className}`}
      role="img"
      aria-label={`QR code placeholder for ${value}`}
    >
      <rect x="0" y="0" width={QR_GRID_SIZE} height={QR_GRID_SIZE} fill="#FFFFFF" />
      {matrix.map((row, rowIndex) =>
        row.map((filled, colIndex) =>
          filled ? (
            <rect
              key={`${rowIndex}-${colIndex}`}
              x={colIndex}
              y={rowIndex}
              width={1}
              height={1}
              fill="#111827"
            />
          ) : null
        )
      )}
    </svg>
  );
}
