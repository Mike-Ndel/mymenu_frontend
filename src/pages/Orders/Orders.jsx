import { ClipboardList } from 'lucide-react';
import PageHeader from '../../components/ui/PageHeader';
import ComingSoonCard from '../../components/ui/ComingSoonCard';

export default function Orders() {
  return (
    <div>
      <PageHeader title="Orders" description="Track and manage every order in real time." />
      <ComingSoonCard icon={ClipboardList} label="Orders table & order details modal" />
    </div>
  );
}
