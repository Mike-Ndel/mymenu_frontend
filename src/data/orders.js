// Mock data only — shape mirrors a future "GET /orders" response.
// Reused by the Overview page (Recent Orders) and the full Orders page.
//
// NOTE: multiple customers can order from the same table (e.g. Table 04
// below has both #MM1042 and #MM1043) — a table is never assumed to map
// to a single order.

export const orders = [
  {
    id: 'MM1036',
    customer: { name: 'David' },
    table: { number: '05' },
    items: [
      { name: 'Pizza', quantity: 1, price: 5500 },
      { name: 'Water', quantity: 1, price: 300 },
    ],
    total: 5800,
    createdAt: '2026-08-26T09:54:00',
    paymentStatus: 'Paid',
    status: 'Completed',
  },
  {
    id: 'MM1037',
    customer: { name: 'Linda' },
    table: { number: '01' },
    items: [
      { name: 'Coke', quantity: 1, price: 500 },
      { name: 'Fried Plantain', quantity: 1, price: 1500 },
    ],
    total: 2000,
    createdAt: '2026-08-26T10:08:00',
    paymentStatus: 'Unpaid',
    status: 'Ready',
  },
  {
    id: 'MM1038',
    customer: { name: 'James' },
    table: { number: '06' },
    items: [
      { name: 'Burger', quantity: 1, price: 4800 },
      { name: 'Coke', quantity: 2, price: 500 },
    ],
    total: 5800,
    createdAt: '2026-08-26T10:15:00',
    paymentStatus: 'Unpaid',
    status: 'Pending',
  },
  {
    id: 'MM1039',
    customer: { name: 'Sarah' },
    table: { number: '03' },
    items: [
      { name: 'Chicken & Rice', quantity: 1, price: 3500 },
      { name: 'Fried Plantain', quantity: 1, price: 1500 },
      { name: 'Coke', quantity: 1, price: 500 },
    ],
    total: 5500,
    createdAt: '2026-08-26T10:21:00',
    paymentStatus: 'Paid',
    status: 'Completed',
  },
  {
    id: 'MM1040',
    customer: { name: 'Peter' },
    table: { number: '07' },
    items: [
      { name: 'Chicken & Rice', quantity: 1, price: 3500 },
      { name: 'Burger', quantity: 1, price: 4800 },
    ],
    total: 8300,
    createdAt: '2026-08-26T10:32:00',
    paymentStatus: 'Paid',
    status: 'Completed',
  },
  {
    id: 'MM1041',
    customer: { name: 'Mary' },
    table: { number: '02' },
    items: [
      { name: 'Fried Plantain', quantity: 2, price: 1500 },
      { name: 'Water', quantity: 2, price: 300 },
    ],
    total: 3600,
    createdAt: '2026-08-26T10:39:00',
    paymentStatus: 'Unpaid',
    status: 'Ready',
  },
  {
    id: 'MM1042',
    customer: { name: 'John' },
    table: { number: '04' },
    items: [
      { name: 'Chicken & Rice', quantity: 2, price: 3500 },
      { name: 'Coke', quantity: 1, price: 500 },
    ],
    total: 7500,
    createdAt: '2026-08-26T10:42:00',
    paymentStatus: 'Unpaid',
    status: 'Preparing',
  },
  {
    id: 'MM1043',
    customer: { name: 'Grace' },
    table: { number: '04' },
    items: [{ name: 'Pizza', quantity: 1, price: 5500 }],
    total: 5500,
    createdAt: '2026-08-26T10:45:00',
    paymentStatus: 'Unpaid',
    status: 'Pending',
  },
  {
    id: 'MM1044',
    customer: { name: 'Emmanuel' },
    table: { number: '08' },
    items: [{ name: 'Burger', quantity: 1, price: 4800 }],
    total: 4800,
    createdAt: '2026-08-26T10:20:00',
    paymentStatus: 'Refunded',
    status: 'Cancelled',
  },
];

export function getOrderStatusCounts(orderList = orders) {
  return orderList.reduce(
    (counts, order) => {
      counts[order.status] = (counts[order.status] || 0) + 1;
      return counts;
    },
    { Pending: 0, Preparing: 0, Ready: 0, Completed: 0, Cancelled: 0 }
  );
}

// Total quantity of items in an order (used for the "3 items" summary text).
export function getOrderItemCount(order) {
  return order.items.reduce((sum, item) => sum + item.quantity, 0);
}

// FIFO helper: pending orders sorted oldest-first. This is a purely visual,
// frontend-only representation — it does not implement or guarantee any
// authoritative server-side queue.
export function sortOrdersFIFO(orderList) {
  return [...orderList].sort((a, b) => new Date(a.createdAt) - new Date(b.createdAt));
}

export function getOldestPendingOrderId(orderList = orders) {
  const pending = orderList.filter((order) => order.status === 'Pending');
  if (pending.length === 0) return null;
  return sortOrdersFIFO(pending)[0].id;
}
