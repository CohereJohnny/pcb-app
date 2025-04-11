'use client'; // Form needs to be client-side

import React from 'react';
import { AnnouncementForm } from '@/components/features/announcements/AnnouncementForm';

type NewAnnouncementPageProps = {
  params: { camp_id: string };
  searchParams: Record<string, string | string[] | undefined>;
};

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export default function NewAnnouncementPage({ params, searchParams }: NewAnnouncementPageProps) {
  console.log('Camp ID:', params.camp_id, 'Search params:', searchParams); // Use both params
  return (
    <div className="space-y-8">
      {/* Title could be part of the form header, but adding here for page context */}
      {/* <h1 className="text-3xl font-bold">New Announcement</h1> */}
      <AnnouncementForm />
    </div>
  );
} 