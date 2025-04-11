'use client'; // Needs client for potential Link usage if params needed

import React from 'react';
import Link from 'next/link';
import { Announcement } from '@/types/dataModel';
import { getMockAuthorName } from '@/lib/mockData/announcements'; // Corrected function name
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from '@/components/ui/card';

interface AnnouncementCardProps {
  announcement: Announcement;
  campId: string; // Needed to construct the link URL
}

const MAX_SNIPPET_LENGTH = 150;

export function AnnouncementCard({
  announcement,
  campId,
}: AnnouncementCardProps) {
  const authorName =
    getMockAuthorName(announcement.author_user_id) || 'Unknown Author';

  // Handle potentially undefined created_at
  const formattedDate = announcement.created_at
    ? new Date(announcement.created_at).toLocaleDateString()
    : 'Date unknown';

  const contentSnippet =
    announcement.content.length > MAX_SNIPPET_LENGTH
      ? `${announcement.content.substring(0, MAX_SNIPPET_LENGTH)}...`
      : announcement.content;

  // Corrected link path (route groups are not part of the URL path)
  const href = `/${campId}/announcements/${announcement.id}`;

  return (
    <Link
      href={href}
      className="hover:bg-muted/50 block rounded-lg transition-colors"
    >
      <Card className="h-full border-0 bg-transparent shadow-none">
        {' '}
        {/* Minimal styling */}
        <CardHeader>
          <CardTitle>{announcement.title}</CardTitle>
          <CardDescription>
            By {authorName} on {formattedDate}
          </CardDescription>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground text-sm">{contentSnippet}</p>
        </CardContent>
      </Card>
    </Link>
  );
}
