import { useMemo, useState } from 'react';
import PageHeader from '../../components/ui/PageHeader';
import Card from '../../components/ui/Card';
import OrderSummaryCards from '../../components/cards/OrderSummaryCards';
import OrdersFilterBar from '../../components/tables/OrdersFilterBar';
import OrdersTable from '../../components/tables/OrdersTable';
import OrderDetailsDrawer from '../../components/modals/OrderDetailsDrawer';
import {
  orders as mockOrders,
  getOrderStatusCounts,
  getOldestPendingOrderId,
  sortOrdersFIFO,
} from '../../data/orders';

export default function Orders() {
  const [orderList, setOrderList] = useState(mockOrders);
  const [activeFilter, setActiveFilter] = useState('All');
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedOrderId, setSelectedOrderId] = useState(null);

  const statusCounts = useMemo(() => getOrderStatusCounts(orderList), [orderList]);
  const oldestPendingId = useMemo(() => getOldestPendingOrderId(orderList), [orderList]);

  const filteredOrders = useMemo(() => {
    let result = orderList;

    if (activeFilter !== 'All') {
      result = result.filter((order) => order.status === activeFilter);
    }

    const query = searchTerm.trim().toLowerCase().replace(/^#/, '');
    if (query) {
      result = result.filter((order) => {
        return (
          order.id.toLowerCase().includes(query) ||
          order.customer.name.toLowerCase().includes(query) ||
          order.table.number.toLowerCase().includes(query) ||
          `table ${order.table.number}`.toLowerCase().includes(query)
        );
      });
    }

    // Pending orders are shown First-Come-First-Serve (oldest first) so the
    // queue order is visible. Every other view shows most recent activity
    // first. This is a frontend-only visual convention, not an authoritative
    // queue.
    return activeFilter === 'Pending'
      ? sortOrdersFIFO(result)
      : [...result].sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
  }, [orderList, activeFilter, searchTerm]);

  const selectedOrder = useMemo(
    () => orderList.find((order) => order.id === selectedOrderId) || null,
    [orderList, selectedOrderId]
  );

  function handleAdvanceStatus(orderId, nextStatus) {
    setOrderList((prev) =>
      prev.map((order) => (order.id === orderId ? { ...order, status: nextStatus } : order))
    );
  }

  function handleCancelOrder(orderId) {
    setOrderList((prev) =>
      prev.map((order) => (order.id === orderId ? { ...order, status: 'Cancelled' } : order))
    );
  }

  return (
    <div className="space-y-6">
      <PageHeader
        title="Orders"
        description="Manage and track customer orders in real time."
      />

      <OrderSummaryCards counts={statusCounts} total={orderList.length} />

      <Card>
        <OrdersFilterBar
          activeFilter={activeFilter}
          onFilterChange={setActiveFilter}
          searchTerm={searchTerm}
          onSearchChange={setSearchTerm}
        />

        <div className="mt-5">
          <OrdersTable
            orders={filteredOrders}
            oldestPendingId={oldestPendingId}
            isFiltered={Boolean(searchTerm.trim())}
            onView={(order) => setSelectedOrderId(order.id)}
          />
        </div>
      </Card>

      <OrderDetailsDrawer
        order={selectedOrder}
        onClose={() => setSelectedOrderId(null)}
        onAdvanceStatus={handleAdvanceStatus}
        onCancelOrder={handleCancelOrder}
      />
    </div>
  );
}
