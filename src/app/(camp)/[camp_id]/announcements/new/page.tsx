'use client'; // Form needs to be client-side

import React from 'react';
import { AnnouncementForm } from '@/components/features/announcements/AnnouncementForm';

interface NewAnnouncementPageProps {
  params: Promise<{ camp_id: string }>;
}

export default async function NewAnnouncementPage({
  params: pageParamsPromise,
}: NewAnnouncementPageProps) {
  const pageParams = await pageParamsPromise;
  return (
    <div className="space-y-8">
      {/* Title could be part of the form header, but adding here for page context */}
      {/* <h1 className="text-3xl font-bold">New Announcement</h1> */}
      <AnnouncementForm campId={pageParams.camp_id} />
    </div>
  );
}
