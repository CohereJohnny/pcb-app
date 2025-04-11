'use client'; // Need client to interact with Zustand store

import React from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { AnnouncementList } from '@/components/features/announcements/AnnouncementList';
import { useAnnouncementStore } from '@/store/announcementStore';
import { PlusCircle } from 'lucide-react'; // Icon for button

type AnnouncementsPageProps = {
  params: {
    camp_id: string;
  };
  searchParams: Record<string, string | string[] | undefined>;
}

export default function AnnouncementsPage({ params, searchParams }: AnnouncementsPageProps) {
  // Get announcements from the Zustand store
  const announcements = useAnnouncementStore((state) => state.announcements);

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Announcements</h1>
          <p className="text-muted-foreground mt-2">
            Latest news and updates for the camp.
          </p>
        </div>
        {/* Link to the new announcement page */}
        <Button asChild>
          <Link href={`/${params.camp_id}/announcements/new`}>
            <PlusCircle className="mr-2 h-4 w-4" />
            New Announcement
          </Link>
        </Button>
      </div>

      {/* Render the list of announcements */}
      <AnnouncementList announcements={announcements} />
    </div>
  );
} 