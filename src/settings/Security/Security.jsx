import { ShieldCheck } from 'lucide-react';
import PageHeader from '../../components/ui/PageHeader';
import ComingSoonCard from '../../components/ui/ComingSoonCard';

export default function Security() {
  return (
    <div>
      <PageHeader title="Security" description="Manage your account security." />
      <ComingSoonCard icon={ShieldCheck} label="Password, 2FA & active sessions" />
    </div>
  );
}
