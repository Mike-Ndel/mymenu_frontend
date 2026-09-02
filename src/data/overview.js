// Mock data only — aggregate stats a future "GET /dashboard/overview"
// endpoint would return. Kept separate from orders.js/menu.js since these
// are pre-aggregated summary numbers, not raw records.

export const todayStats = {
  totalOrders: { value: 48, changePercent: 12, trend: 'up' },
  revenue: { value: 125500, changePercent: 8, trend: 'up' },
  pendingOrders: { value: 3, changePercent: -5, trend: 'down' },
  completedOrders: { value: 43, changePercent: 15, trend: 'up' },
};

// Last 7 days of revenue, oldest first, ending with today.
export const weeklyRevenue = [
  { day: 'Wed', date: 'Aug 19', amount: 98000 },
  { day: 'Thu', date: 'Aug 20', amount: 112500 },
  { day: 'Fri', date: 'Aug 21', amount: 134000 },
  { day: 'Sat', date: 'Aug 22', amount: 156500 },
  { day: 'Sun', date: 'Aug 23', amount: 142000 },
  { day: 'Mon', date: 'Aug 24', amount: 108000 },
  { day: 'Tue', date: 'Aug 25', amount: 125500 },
];
