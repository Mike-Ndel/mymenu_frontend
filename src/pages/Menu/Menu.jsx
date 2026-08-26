import { UtensilsCrossed } from 'lucide-react';
import PageHeader from '../../components/ui/PageHeader';
import ComingSoonCard from '../../components/ui/ComingSoonCard';

export default function Menu() {
  return (
    <div>
      <PageHeader title="Menu" description="Manage food items, availability, and today's menu." />
      <ComingSoonCard icon={UtensilsCrossed} label="Menu item cards & add/edit modal" />
    </div>
  );
}
