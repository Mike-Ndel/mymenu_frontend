import { Store } from 'lucide-react';
import PageHeader from '../../components/ui/PageHeader';
import ComingSoonCard from '../../components/ui/ComingSoonCard';

export default function RestaurantProfile() {
  return (
    <div>
      <PageHeader title="Restaurant Profile" description="Manage your restaurant's basic information." />
      <ComingSoonCard icon={Store} label="Restaurant profile form" />
    </div>
  );
}
