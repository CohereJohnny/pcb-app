'use client';

import { Button } from '@/components/ui/button';
import { Plus } from 'lucide-react';
import Link from 'next/link';

interface AnnouncementsHeaderProps {
  campId: string;
}

export function AnnouncementsHeader({ campId }: AnnouncementsHeaderProps) {
  return (
    <div className="flex items-center justify-between">
      <h1 className="text-2xl font-bold">Announcements</h1>
      <Link href={`/${campId}/announcements/new`}>
        <Button>
          <Plus className="mr-2 h-4 w-4" />
          New Announcement
        </Button>
      </Link>
    </div>
  );
}
