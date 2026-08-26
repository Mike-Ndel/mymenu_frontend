import {
  LayoutGrid,
  ClipboardList,
  Grid2x2,
  UtensilsCrossed,
  Receipt,
  Settings,
  Store,
  Palette,
  SlidersHorizontal,
  Wallet,
  ShieldCheck,
  FileText,
} from 'lucide-react';

// Top-level sidebar items
export const mainNavItems = [
  { label: 'Overview', path: '/', icon: LayoutGrid },
  { label: 'Orders', path: '/orders', icon: ClipboardList },
  { label: 'Tables', path: '/tables', icon: Grid2x2 },
  { label: 'Menu', path: '/menu', icon: UtensilsCrossed },
  { label: 'Receipts', path: '/receipts', icon: Receipt },
];

// Settings section + its sub-items
export const settingsNav = {
  label: 'Settings',
  icon: Settings,
  basePath: '/settings',
  children: [
    { label: 'Restaurant Profile', path: '/settings/restaurant-profile', icon: Store },
    { label: 'Branding', path: '/settings/branding', icon: Palette },
    { label: 'Customize Dashboard', path: '/settings/customize-dashboard', icon: SlidersHorizontal },
    { label: 'Payment Settings', path: '/settings/payment-settings', icon: Wallet },
    { label: 'Security', path: '/settings/security', icon: ShieldCheck },
    { label: 'Receipt Settings', path: '/settings/receipt-settings', icon: FileText },
  ],
};
