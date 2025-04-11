'use client';

import { Button } from '@/components/ui/button';
import { Plus } from 'lucide-react';
import Link from 'next/link';

interface AnnouncementsPageClientProps {
  params: {
    camp_id: string;
  };
}

export function AnnouncementsPageClient({
  params,
}: AnnouncementsPageClientProps) {
  return (
    <div className="flex flex-col gap-4">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">Announcements</h1>
        <Link href={`/${params.camp_id}/announcements/new`}>
          <Button>
            <Plus className="mr-2 h-4 w-4" />
            New Announcement
          </Button>
        </Link>
      </div>
      {/* TODO: Implement AnnouncementList component */}
      <div>Announcements will be listed here</div>
    </div>
  );
}
