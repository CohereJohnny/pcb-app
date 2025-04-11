'use client';

import { useParams, notFound } from 'next/navigation';
import Link from 'next/link';
import { useAnnouncementStore } from '@/store/announcementStore';
import { getMockAuthorName } from '@/lib/mockData/announcements';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ArrowLeft } from 'lucide-react';

export default function AnnouncementViewPage() {
  const params = useParams();
  const campId = params.camp_id as string;
  const announcementId = params.announcement_id as string;

  const announcement = useAnnouncementStore((state) =>
    state.announcements.find(
      (ann) => ann.camp_id === campId && ann.id === announcementId
    )
  );

  if (!announcement) {
    // If announcement not found for the given camp and id, show 404
    notFound();
  }

  const authorName =
    getMockAuthorName(announcement.author_user_id) || 'Unknown Author';
  const formattedDate = announcement.created_at
    ? new Date(announcement.created_at).toLocaleDateString()
    : 'Date unknown';

  const listHref = `/${campId}/announcements`;

  return (
    <div className="container mx-auto p-4">
      <Button variant="outline" size="sm" asChild className="mb-4">
        <Link href={listHref}>
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to Announcements
        </Link>
      </Button>

      <Card>
        <CardHeader>
          <CardTitle className="text-2xl">{announcement.title}</CardTitle>
          <CardDescription>
            By {authorName} on {formattedDate}
          </CardDescription>
        </CardHeader>
        <CardContent>
          {/* Render content - potentially Markdown in future */}
          <p className="whitespace-pre-wrap">{announcement.content}</p>
        </CardContent>
      </Card>
    </div>
  );
}
