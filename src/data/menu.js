// Mock data only — shape mirrors a future "GET /menu-items" response.
// `emoji` stands in for a real product photo until real asset uploads exist.

export const menuItems = [
  {
    id: 'item_001',
    name: 'Chicken & Rice',
    emoji: '🍗',
    price: 3500,
    category: 'Main Course',
    available: true,
    todaysMenu: true,
    ordersSold: 32,
    revenue: 112000,
  },
  {
    id: 'item_002',
    name: 'Burger',
    emoji: '🍔',
    price: 4800,
    category: 'Main Course',
    available: true,
    todaysMenu: true,
    ordersSold: 27,
    revenue: 129600,
  },
  {
    id: 'item_003',
    name: 'Fried Plantain',
    emoji: '🍌',
    price: 1500,
    category: 'Side',
    available: true,
    todaysMenu: true,
    ordersSold: 21,
    revenue: 31500,
  },
  {
    id: 'item_004',
    name: 'Coke',
    emoji: '🥤',
    price: 500,
    category: 'Drink',
    available: true,
    todaysMenu: true,
    ordersSold: 18,
    revenue: 9000,
  },
  {
    id: 'item_005',
    name: 'Pizza',
    emoji: '🍕',
    price: 5500,
    category: 'Main Course',
    available: true,
    todaysMenu: true,
    ordersSold: 15,
    revenue: 82500,
  },
  {
    id: 'item_006',
    name: 'Water',
    emoji: '💧',
    price: 300,
    category: 'Drink',
    available: true,
    todaysMenu: true,
    ordersSold: 12,
    revenue: 3600,
  },
];

export function getPopularItems(limit = 5) {
  return [...menuItems].sort((a, b) => b.ordersSold - a.ordersSold).slice(0, limit);
}
