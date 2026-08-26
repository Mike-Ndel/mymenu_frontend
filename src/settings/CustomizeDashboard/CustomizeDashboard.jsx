import { SlidersHorizontal } from 'lucide-react';
import PageHeader from '../../components/ui/PageHeader';
import ComingSoonCard from '../../components/ui/ComingSoonCard';

export default function CustomizeDashboard() {
  return (
    <div>
      <PageHeader title="Customize Dashboard" description="Choose what shows up on your dashboard." />
      <ComingSoonCard icon={SlidersHorizontal} label="Dashboard widget toggles & layout preferences" />
    </div>
  );
}
