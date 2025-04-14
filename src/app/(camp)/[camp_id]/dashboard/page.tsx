'use client'; // Needed for widgets using client hooks

import { AssignedTasksWidget } from '@/components/features/dashboard/AssignedTasksWidget';
import { RecentAnnouncementsWidget } from '@/components/features/dashboard/RecentAnnouncementsWidget';

export default function DashboardPage() {
  // Could potentially fetch some page-level data here if needed

  return (
    <div className="container mx-auto p-4">
      <h1 className="mb-6 text-2xl font-semibold">Dashboard</h1>
      {/* Simple two-column grid layout for widgets */}
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        <RecentAnnouncementsWidget />
        <AssignedTasksWidget />
        {/* Add more widgets later */}
      </div>
    </div>
  );
}
