import { Grid2x2 } from 'lucide-react';
import PageHeader from '../../components/ui/PageHeader';
import ComingSoonCard from '../../components/ui/ComingSoonCard';

export default function Tables() {
  return (
    <div>
      <PageHeader title="Tables" description="Manage tables, capacity, and QR codes." />
      <ComingSoonCard icon={Grid2x2} label="Table cards with QR code actions" />
    </div>
  );
}
