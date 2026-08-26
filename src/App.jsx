import { Routes, Route } from 'react-router-dom';
import DashboardLayout from './components/layout/DashboardLayout';

import Overview from './pages/Overview/Overview';
import Orders from './pages/Orders/Orders';
import Tables from './pages/Tables/Tables';
import Menu from './pages/Menu/Menu';
import Receipts from './pages/Receipts/Receipts';

import RestaurantProfile from './settings/RestaurantProfile/RestaurantProfile';
import Branding from './settings/Branding/Branding';
import CustomizeDashboard from './settings/CustomizeDashboard/CustomizeDashboard';
import PaymentSettings from './settings/PaymentSettings/PaymentSettings';
import Security from './settings/Security/Security';
import ReceiptSettings from './settings/ReceiptSettings/ReceiptSettings';

export default function App() {
  return (
    <Routes>
      <Route element={<DashboardLayout />}>
        <Route path="/" element={<Overview />} />
        <Route path="/orders" element={<Orders />} />
        <Route path="/tables" element={<Tables />} />
        <Route path="/menu" element={<Menu />} />
        <Route path="/receipts" element={<Receipts />} />

        <Route path="/settings/restaurant-profile" element={<RestaurantProfile />} />
        <Route path="/settings/branding" element={<Branding />} />
        <Route path="/settings/customize-dashboard" element={<CustomizeDashboard />} />
        <Route path="/settings/payment-settings" element={<PaymentSettings />} />
        <Route path="/settings/security" element={<Security />} />
        <Route path="/settings/receipt-settings" element={<ReceiptSettings />} />
      </Route>
    </Routes>
  );
}
