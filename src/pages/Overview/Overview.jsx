import { LayoutGrid } from 'lucide-react';
import PageHeader from '../../components/ui/PageHeader';
import ComingSoonCard from '../../components/ui/ComingSoonCard';
import { currentRestaurant } from '../../data/restaurants';

export default function Overview() {
  return (
    <div>
      <PageHeader
        title={`Good morning, ${currentRestaurant.name}`}
        description="Here's what's happening with your restaurant today."
      />
      <ComingSoonCard icon={LayoutGrid} label="Stats, revenue chart & recent orders" />
    </div>
  );
}
