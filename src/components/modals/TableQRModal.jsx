import { useEffect } from 'react';
import { X, Download, Printer } from 'lucide-react';
import QrPreview from '../ui/QrPreview';
import { currentRestaurant } from '../../data/restaurants';

export default function TableQRModal({ table, onClose }) {
  useEffect(() => {
    if (!table) return undefined;

    function handleKeyDown(event) {
      if (event.key === 'Escape') onClose();
    }

    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [table, onClose]);

  if (!table) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-black/40" onClick={onClose} aria-hidden="true" />

      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby="table-qr-title"
        className="relative w-full max-w-sm rounded-card bg-white shadow-xl"
      >
        <div className="flex items-center justify-between border-b border-gray-100 px-5 py-4">
          <h2 id="table-qr-title" className="text-lg font-bold text-ink">
            Table QR Code
          </h2>
          <button
            type="button"
            onClick={onClose}
            className="rounded-md p-1.5 text-gray-400 hover:bg-surface-muted hover:text-ink"
            aria-label="Close QR preview"
          >
            <X size={20} />
          </button>
        </div>

        <div className="flex flex-col items-center px-6 py-6 text-center">
          <p className="text-sm font-semibold text-ink">{currentRestaurant.name}</p>
          <p className="mt-0.5 text-2xl font-bold text-ink">Table {table.tableNumber}</p>

          <div className="mt-5 rounded-card border border-gray-100 p-4">
            <QrPreview value={table.qrCode} size={200} />
          </div>

          <p className="mt-4 text-sm text-gray-500">
            Scan to view menu and place your order
          </p>

          <div className="mt-6 grid w-full grid-cols-2 gap-2">
            <button
              type="button"
              onClick={() => {}}
              className="flex items-center justify-center gap-1.5 rounded-lg border border-gray-200 py-2.5 text-sm font-medium text-ink hover:bg-surface-muted"
            >
              <Download size={15} />
              Download
            </button>
            <button
              type="button"
              onClick={() => window.print()}
              className="flex items-center justify-center gap-1.5 rounded-lg bg-primary py-2.5 text-sm font-semibold text-ink hover:bg-primary-hover"
            >
              <Printer size={15} />
              Print
            </button>
          </div>
          <p className="mt-3 text-xs text-gray-400">
            QR download will be available once real QR generation is added.
          </p>
        </div>
      </div>
    </div>
  );
}
