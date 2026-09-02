import { ClipboardList, Wallet, Clock, CheckCircle2 } from 'lucide-react';
import { Link } from 'react-router-dom';
import PageHeader from '../../components/ui/PageHeader';
import Card from '../../components/ui/Card';
import StatCard from '../../components/cards/StatCard';
import RevenueChartCard from '../../components/cards/RevenueChartCard';
import PopularItemsCard from '../../components/cards/PopularItemsCard';
import OrderStatusSummaryCard from '../../components/cards/OrderStatusSummaryCard';
import QuickActionsCard from '../../components/cards/QuickActionsCard';
import RecentOrdersTable from '../../components/tables/RecentOrdersTable';
import { currentRestaurant } from '../../data/restaurants';
import { todayStats, weeklyRevenue } from '../../data/overview';
import { orders, getOrderStatusCounts } from '../../data/orders';
import { getPopularItems } from '../../data/menu';
import { formatFCFA } from '../../utils/formatCurrency';

export default function Overview() {
  const recentOrders = [...orders]
    .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
    .slice(0, 5);
  const statusCounts = getOrderStatusCounts(orders);
  const popularItems = getPopularItems(5);

  const today = new Date().toLocaleDateString('en-US', {
    weekday: 'long',
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  });

  return (
    <div className="space-y-6">
      <PageHeader
        title={`Good morning, ${currentRestaurant.name} 👋`}
        description={`Here's what's happening in your restaurant today · ${today}`}
      />

      {/* Summary cards */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <StatCard
          icon={ClipboardList}
          label="Today's Orders"
          value={todayStats.totalOrders.value}
          changePercent={todayStats.totalOrders.changePercent}
          trend={todayStats.totalOrders.trend}
        />
        <StatCard
          icon={Wallet}
          label="Today's Revenue"
          value={formatFCFA(todayStats.revenue.value)}
          changePercent={todayStats.revenue.changePercent}
          trend={todayStats.revenue.trend}
          accent="black"
        />
        <StatCard
          icon={Clock}
          label="Pending Orders"
          value={todayStats.pendingOrders.value}
          changePercent={todayStats.pendingOrders.changePercent}
          trend={todayStats.pendingOrders.trend}
        />
        <StatCard
          icon={CheckCircle2}
          label="Completed Orders"
          value={todayStats.completedOrders.value}
          changePercent={todayStats.completedOrders.changePercent}
          trend={todayStats.completedOrders.trend}
        />
      </div>

      {/* Revenue chart + Quick actions */}
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
        <div className="lg:col-span-2">
          <RevenueChartCard
            data={weeklyRevenue}
            description="Last 7 days"
          />
        </div>
        <QuickActionsCard />
      </div>

      {/* Order activity */}
      <OrderStatusSummaryCard counts={statusCounts} />

      {/* Recent orders + Popular items */}
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
        <div className="lg:col-span-2">
          <Card
            title="Recent Orders"
            description="Latest activity across all tables"
            actions={
              <Link
                to="/orders"
                className="text-sm font-medium text-ink hover:text-primary-hover"
              >
                View all
              </Link>
            }
          >
            <RecentOrdersTable orders={recentOrders} />
          </Card>
        </div>

        <PopularItemsCard items={popularItems} />
      </div>
    </div>
  );
}
