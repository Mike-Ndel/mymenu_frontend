import { Wallet } from 'lucide-react';
import PageHeader from '../../components/ui/PageHeader';
import ComingSoonCard from '../../components/ui/ComingSoonCard';

export default function PaymentSettings() {
  return (
    <div>
      <PageHeader title="Payment Settings" description="Configure payment methods and order policies." />
      <ComingSoonCard icon={Wallet} label="Payment method toggles & order payment policy" />
    </div>
  );
}
