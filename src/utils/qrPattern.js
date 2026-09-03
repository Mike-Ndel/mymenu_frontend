// Generates a deterministic, QR-code-*looking* module grid from a seed
// string (e.g. a table's QR id). This is a purely visual placeholder —
// it is not a real, scannable QR code and no QR-generation dependency
// is added for it. The same seed always produces the same pattern.

const GRID_SIZE = 21; // matches a "version 1" QR code's module count
const FINDER_SIZE = 7;

function hashSeed(seed) {
  let hash = 0;
  for (let i = 0; i < seed.length; i += 1) {
    hash = (hash << 5) - hash + seed.charCodeAt(i);
    hash |= 0; // force 32-bit int
  }
  return hash;
}

function seededBit(seed, index) {
  const value = Math.sin(seed + index * 12.9898) * 43758.5453;
  return value - Math.floor(value) > 0.5;
}

const FINDER_ORIGINS = [
  [0, 0],
  [0, GRID_SIZE - FINDER_SIZE],
  [GRID_SIZE - FINDER_SIZE, 0],
];

function finderZoneFor(row, col) {
  return FINDER_ORIGINS.find(
    ([r, c]) => row >= r && row < r + FINDER_SIZE && col >= c && col < c + FINDER_SIZE
  );
}

function isFinderModuleOn(row, col, zone) {
  const rr = row - zone[0];
  const cc = col - zone[1];
  const onOuterRing = rr === 0 || rr === FINDER_SIZE - 1 || cc === 0 || cc === FINDER_SIZE - 1;
  const onInnerSquare = rr >= 2 && rr <= 4 && cc >= 2 && cc <= 4;
  return onOuterRing || onInnerSquare;
}

/**
 * Returns a GRID_SIZE x GRID_SIZE boolean matrix (true = filled module)
 * for the given seed string, including the three QR "finder" corners.
 */
export function generateQrMatrix(seed) {
  const hash = hashSeed(seed || 'MYMENU');
  const matrix = [];

  for (let row = 0; row < GRID_SIZE; row += 1) {
    const rowModules = [];
    for (let col = 0; col < GRID_SIZE; col += 1) {
      const zone = finderZoneFor(row, col);
      rowModules.push(zone ? isFinderModuleOn(row, col, zone) : seededBit(hash, row * GRID_SIZE + col));
    }
    matrix.push(rowModules);
  }

  return matrix;
}

export const QR_GRID_SIZE = GRID_SIZE;
