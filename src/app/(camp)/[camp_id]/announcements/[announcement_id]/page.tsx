'use client'; // Need client to interact with store and use params

import React from 'react';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import { useAnnouncementStore } from '@/store/announcementStore';
import { getMockAuthorName } from '@/lib/mockData/announcements';
import { format } from 'date-fns';
import { ArrowLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';

type ViewAnnouncementPageProps = {
  params: { 
    camp_id: string;
    announcement_id: string;
  };
  searchParams: Record<string, string | string[] | undefined>;
};

export default function ViewAnnouncementPage({ params: pageParams, searchParams }: ViewAnnouncementPageProps) {
  console.log('Page params:', pageParams, 'Search params:', searchParams); // Use both params
  // We're using useParams hook to get params from route in a client component
  const params = useParams();
  const { announcement_id, camp_id } = params;
  const announcement =
    useAnnouncementStore((state) =>
      state.announcements.find((a) => a.id === announcement_id)
    ) || null; // Find announcement by ID

  if (!announcement) {
    return (
      <div className="text-center py-10">
        <p className="text-muted-foreground">Announcement not found.</p>
        <Button variant="link" asChild className="mt-4">
          <Link href={`/${camp_id}/announcements`}>
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Announcements
          </Link>
        </Button>
      </div>
    );
  }

  const authorName =
    getMockAuthorName(announcement.author_user_id) || 'Camp Staff';
  const formattedDate = announcement.created_at
    ? format(new Date(announcement.created_at), 'PPPpp') // More detailed format
    : 'Date unknown';

  return (
    <div className="space-y-6">
      <Button variant="outline" asChild size="sm">
        <Link href={`/${camp_id}/announcements`}>
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to Announcements
        </Link>
      </Button>

      <Card>
        <CardHeader>
          <CardTitle className="text-2xl">{announcement.title}</CardTitle>
          <CardDescription>
            Posted by {authorName} on {formattedDate}
          </CardDescription>
        </CardHeader>
        <CardContent>
          {/* Render content - potentially use Markdown renderer later */}
          {/* Using whitespace-pre-wrap to respect newlines for now */}
          <div className="prose prose-sm dark:prose-invert max-w-none whitespace-pre-wrap">
            {announcement.content}
          </div>
        </CardContent>
      </Card>
    </div>
  );
} 