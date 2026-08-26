// Mock data only — no backend/API calls.
// Shape mirrors what a real "GET /restaurants/:id" response would look like,
// so swapping in a real service later is a drop-in replacement.

export const currentRestaurant = {
  id: 'rest_001',
  name: 'Chez Marie',
  logoInitial: 'CM',
  admin: {
    name: 'Admin',
    role: 'Restaurant Owner',
  },
  branches: [
    { id: 'branch_001', name: 'Central Douala Branch' },
    { id: 'branch_002', name: 'Bonapriso Branch' },
    { id: 'branch_003', name: 'Akwa Branch' },
  ],
};

export const mockNotifications = [
  {
    id: 'ntf_001',
    title: 'New order received',
    detail: 'Table 04 just placed an order.',
    time: '2 min ago',
    unread: true,
  },
  {
    id: 'ntf_002',
    title: 'Order ready',
    detail: 'Order #MM1041 is ready to be served.',
    time: '18 min ago',
    unread: true,
  },
  {
    id: 'ntf_003',
    title: 'Daily summary',
    detail: 'Yesterday you served 48 orders for 125,500 FCFA.',
    time: '1 day ago',
    unread: false,
  },
];
