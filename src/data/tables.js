// Mock data only — shape mirrors a future "GET /tables" response.
//
// IMPORTANT: a table is NOT an order. One table can have several
// independent, simultaneous orders (see orders.js — Table 04 has both
// #MM1042 and #MM1043). So these records intentionally do NOT store an
// activeOrderCount or any order details — that's derived on demand via
// getActiveOrderCountForTable() in orders.js, so it can never drift out
// of sync with the real order list.

export const tables = [
  { id: 'table-01', tableNumber: '01', capacity: 2, status: 'OCCUPIED', qrCode: 'TABLE-01' },
  { id: 'table-02', tableNumber: '02', capacity: 4, status: 'OCCUPIED', qrCode: 'TABLE-02' },
  { id: 'table-03', tableNumber: '03', capacity: 6, status: 'AVAILABLE', qrCode: 'TABLE-03' },
  { id: 'table-04', tableNumber: '04', capacity: 4, status: 'OCCUPIED', qrCode: 'TABLE-04' },
  { id: 'table-05', tableNumber: '05', capacity: 2, status: 'AVAILABLE', qrCode: 'TABLE-05' },
  { id: 'table-06', tableNumber: '06', capacity: 4, status: 'OCCUPIED', qrCode: 'TABLE-06' },
  { id: 'table-07', tableNumber: '07', capacity: 6, status: 'AVAILABLE', qrCode: 'TABLE-07' },
  { id: 'table-08', tableNumber: '08', capacity: 2, status: 'AVAILABLE', qrCode: 'TABLE-08' },
  { id: 'table-09', tableNumber: '09', capacity: 2, status: 'AVAILABLE', qrCode: 'TABLE-09' },
  { id: 'table-10', tableNumber: '10', capacity: 4, status: 'AVAILABLE', qrCode: 'TABLE-10' },
  { id: 'table-11', tableNumber: '11', capacity: 6, status: 'INACTIVE', qrCode: 'TABLE-11' },
  { id: 'table-12', tableNumber: '12', capacity: 2, status: 'AVAILABLE', qrCode: 'TABLE-12' },
];

export function getTableStatusCounts(tableList = tables) {
  return tableList.reduce(
    (counts, table) => {
      counts[table.status] = (counts[table.status] || 0) + 1;
      return counts;
    },
    { AVAILABLE: 0, OCCUPIED: 0, INACTIVE: 0 }
  );
}

export function isTableNumberTaken(tableNumber, tableList, excludeId = null) {
  const normalized = tableNumber.trim();
  return tableList.some((table) => table.tableNumber === normalized && table.id !== excludeId);
}
