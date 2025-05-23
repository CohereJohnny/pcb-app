'use client'; // May need client if interacting with store directly here

import React from 'react';
import { Announcement } from '@/types/dataModel';
import { AnnouncementCard } from './AnnouncementCard';

interface AnnouncementListProps {
  announcements: Announcement[];
  campId: string; // Required by AnnouncementCard for linking
}

export function AnnouncementList({
  announcements,
  campId,
}: AnnouncementListProps) {
  if (!announcements || announcements.length === 0) {
    return (
      <div className="text-muted-foreground py-8 text-center">
        No announcements posted yet.
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {announcements.map((announcement) => (
        <AnnouncementCard
          key={announcement.id}
          announcement={announcement}
          campId={campId}
        />
      ))}
    </div>
  );
}
