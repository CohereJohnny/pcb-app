import { AiConfigForm } from '@/components/features/settings/AiConfigForm';

export default function SettingsPage() {
  return (
    <div className="container mx-auto py-10">
      <h1 className="mb-6 text-2xl font-bold">Settings</h1>
      <AiConfigForm />
    </div>
  );
}
