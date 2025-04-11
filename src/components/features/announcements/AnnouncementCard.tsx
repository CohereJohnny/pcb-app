'use client'; // Needs client for potential Link usage if params needed

import React from 'react';
import Link from 'next/link';
import { Announcement } from '@/types/dataModel';
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from '@/components/ui/card';
import { getMockAuthorName } from '@/lib/mockData/announcements'; // Helper to get author name
import { format } from 'date-fns'; // For formatting dates

interface AnnouncementCardProps {
  announcement: Announcement;
}

// Function to truncate content for preview
function truncateContent(content: string, maxLength = 100): string {
  if (content.length <= maxLength) {
    return content;
  }
  return content.substring(0, maxLength) + '...';
}

export function AnnouncementCard({ announcement }: AnnouncementCardProps) {
  const authorName = getMockAuthorName(announcement.author_user_id) || 'Camp Staff';
  const formattedDate = announcement.created_at
    ? format(new Date(announcement.created_at), 'MMM d, yyyy')
    : 'Date unknown';

  return (
    // Link wrapping the card to the detail page
    <Link href={`./${announcement.id}`} className="block group">
      <Card className="transition-colors group-hover:bg-muted/50">
        <CardHeader>
          <CardTitle>{announcement.title}</CardTitle>
          <CardDescription className="text-xs">
            By {authorName} on {formattedDate}
          </CardDescription>
        </CardHeader>
        <CardContent>
          <p className="text-sm text-muted-foreground">
            {truncateContent(announcement.content)}
          </p>
        </CardContent>
      </Card>
    </Link>
  );
} 