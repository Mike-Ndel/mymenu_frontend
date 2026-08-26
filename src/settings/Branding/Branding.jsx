import { Palette } from 'lucide-react';
import PageHeader from '../../components/ui/PageHeader';
import ComingSoonCard from '../../components/ui/ComingSoonCard';

export default function Branding() {
  return (
    <div>
      <PageHeader
        title="Branding"
        description="Customize how your menu looks to your customers. This will only affect the customer-facing menu, not your admin dashboard."
      />
      <ComingSoonCard icon={Palette} label="Live preview + branding controls (3-column layout)" />
    </div>
  );
}
