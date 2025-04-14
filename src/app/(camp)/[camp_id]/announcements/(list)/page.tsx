'use client';

import { useParams } from 'next/navigation';
import { useMemo } from 'react';
import { useAnnouncementStore } from '@/store/announcementStore';
import { AnnouncementList } from '@/components/features/announcements/AnnouncementList';
import { Button } from '@/components/ui/button';
import Link from 'next/link';

export default function AnnouncementsListPage() {
  const params = useParams();
  const campId = params.camp_id as string; // Assuming camp_id is always present

  // Select the entire announcements array from the store
  const allAnnouncements = useAnnouncementStore((state) => state.announcements);

  // Compute the filtered announcements using useMemo
  const announcements = useMemo(() => {
    return allAnnouncements.filter((ann) => ann.camp_id === campId);
  }, [allAnnouncements, campId]); // Dependencies: allAnnouncements array and campId

  const newAnnouncementHref = `/${campId}/announcements/new`;

  return (
    <div className="container mx-auto p-4">
      <div className="mb-6 flex items-center justify-between">
        <h1 className="text-2xl font-semibold">Camp Announcements</h1>
        <Button asChild>
          <Link href={newAnnouncementHref}>New Announcement</Link>
        </Button>
      </div>
      <AnnouncementList announcements={announcements} campId={campId} />
    </div>
  );
}
