import { Receipt } from 'lucide-react';
import PageHeader from '../../components/ui/PageHeader';
import ComingSoonCard from '../../components/ui/ComingSoonCard';

export default function Receipts() {
  return (
    <div>
      <PageHeader title="Receipts" description="View, print, and download customer receipts." />
      <ComingSoonCard icon={Receipt} label="Receipts table with view/print/download actions" />
    </div>
  );
}
