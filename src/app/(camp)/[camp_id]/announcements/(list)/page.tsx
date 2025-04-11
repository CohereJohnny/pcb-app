'use client';

import { useParams } from 'next/navigation';
import { useAnnouncementStore } from '@/store/announcementStore';
import { AnnouncementList } from '@/components/features/announcements/AnnouncementList';
import { Button } from '@/components/ui/button';
import Link from 'next/link';

export default function AnnouncementsListPage() {
  const params = useParams();
  const campId = params.camp_id as string; // Assuming camp_id is always present

  // Fetch announcements for the current camp from the store
  const announcements = useAnnouncementStore((state) =>
    state.announcements.filter((ann) => ann.camp_id === campId)
  );

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
