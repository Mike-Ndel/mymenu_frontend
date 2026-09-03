import { useMemo, useState } from 'react';
import { Plus, Search as SearchIcon, Grid2x2 } from 'lucide-react';
import PageHeader from '../../components/ui/PageHeader';
import Card from '../../components/ui/Card';
import EmptyState from '../../components/ui/EmptyState';
import TableSummaryCards from '../../components/cards/TableSummaryCards';
import TablesFilterBar from '../../components/tables/TablesFilterBar';
import TableCard from '../../components/cards/TableCard';
import TableFormModal from '../../components/modals/TableFormModal';
import TableQRModal from '../../components/modals/TableQRModal';
import { tables as mockTables, getTableStatusCounts } from '../../data/tables';
import { getActiveOrderCountForTable } from '../../data/orders';

export default function Tables() {
  const [tableList, setTableList] = useState(mockTables);
  const [activeFilter, setActiveFilter] = useState('All');
  const [searchTerm, setSearchTerm] = useState('');
  const [formModal, setFormModal] = useState(null); // { mode: 'add' | 'edit', table? }
  const [qrTable, setQrTable] = useState(null);

  const statusCounts = useMemo(() => getTableStatusCounts(tableList), [tableList]);

  const filteredTables = useMemo(() => {
    let result = tableList;

    if (activeFilter !== 'All') {
      result = result.filter((table) => table.status === activeFilter);
    }

    const query = searchTerm.trim().toLowerCase();
    if (query) {
      result = result.filter((table) => table.tableNumber.toLowerCase().includes(query));
    }

    return [...result].sort((a, b) => a.tableNumber.localeCompare(b.tableNumber, undefined, { numeric: true }));
  }, [tableList, activeFilter, searchTerm]);

  const existingTableNumbers = useMemo(() => {
    const editingId = formModal?.mode === 'edit' ? formModal.table.id : null;
    return tableList.filter((table) => table.id !== editingId).map((table) => table.tableNumber);
  }, [tableList, formModal]);

  function handleAddTable() {
    setFormModal({ mode: 'add' });
  }

  function handleEditTable(table) {
    setFormModal({ mode: 'edit', table });
  }

  function handleFormSubmit(values) {
    if (formModal.mode === 'edit') {
      const { id } = formModal.table;
      setTableList((prev) =>
        prev.map((table) =>
          table.id === id
            ? { ...table, tableNumber: values.tableNumber, capacity: values.capacity, status: values.status }
            : table
        )
      );
    } else {
      const newTable = {
        id: `table-${Date.now()}`,
        tableNumber: values.tableNumber,
        capacity: values.capacity,
        status: values.status,
        qrCode: `TABLE-${values.tableNumber}`,
      };
      setTableList((prev) => [...prev, newTable]);
    }
    setFormModal(null);
  }

  function handleToggleStatus(table) {
    if (table.status === 'INACTIVE') {
      setTableList((prev) =>
        prev.map((item) => (item.id === table.id ? { ...item, status: 'AVAILABLE' } : item))
      );
      return;
    }

    const confirmed = window.confirm(
      `Deactivate Table ${table.tableNumber}? It will no longer be available for new orders.`
    );
    if (!confirmed) return;

    setTableList((prev) =>
      prev.map((item) => (item.id === table.id ? { ...item, status: 'INACTIVE' } : item))
    );
  }

  const isFiltered = Boolean(searchTerm.trim()) || activeFilter !== 'All';

  return (
    <div className="space-y-6">
      <PageHeader
        title="Tables"
        description="Manage your tables and QR codes."
        actions={
          <button
            type="button"
            onClick={handleAddTable}
            className="flex items-center gap-1.5 rounded-lg bg-primary px-4 py-2.5 text-sm font-semibold text-ink hover:bg-primary-hover"
          >
            <Plus size={16} />
            Add Table
          </button>
        }
      />

      <TableSummaryCards counts={statusCounts} total={tableList.length} />

      <Card>
        <TablesFilterBar
          activeFilter={activeFilter}
          onFilterChange={setActiveFilter}
          searchTerm={searchTerm}
          onSearchChange={setSearchTerm}
        />
      </Card>

      {filteredTables.length === 0 ? (
        <Card>
          <EmptyState
            icon={isFiltered ? SearchIcon : Grid2x2}
            title={isFiltered ? 'No tables match your search' : 'No tables yet'}
            description={
              isFiltered
                ? 'Try a different table number or status filter.'
                : 'Add your first table to get started.'
            }
          />
        </Card>
      ) : (
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {filteredTables.map((table) => (
            <TableCard
              key={table.id}
              table={table}
              activeOrderCount={getActiveOrderCountForTable(table.tableNumber)}
              onViewQR={setQrTable}
              onEdit={handleEditTable}
              onToggleStatus={handleToggleStatus}
            />
          ))}
        </div>
      )}

      {formModal && (
        <TableFormModal
          mode={formModal.mode}
          initialValues={formModal.mode === 'edit' ? formModal.table : null}
          existingTableNumbers={existingTableNumbers}
          onClose={() => setFormModal(null)}
          onSubmit={handleFormSubmit}
        />
      )}

      <TableQRModal table={qrTable} onClose={() => setQrTable(null)} />
    </div>
  );
}
