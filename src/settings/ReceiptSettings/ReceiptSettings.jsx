import { FileText } from 'lucide-react';
import PageHeader from '../../components/ui/PageHeader';
import ComingSoonCard from '../../components/ui/ComingSoonCard';

export default function ReceiptSettings() {
  return (
    <div>
      <PageHeader title="Receipt Settings" description="Customize what appears on your customer receipts." />
      <ComingSoonCard icon={FileText} label="Receipt settings form + receipt preview" />
    </div>
  );
}
