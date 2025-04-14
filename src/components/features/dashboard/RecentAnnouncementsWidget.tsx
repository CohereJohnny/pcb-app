'use client';

import { useMemo } from 'react';
import Link from 'next/link';
import { useAnnouncementStore } from '@/store/announcementStore';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { format } from 'date-fns';
import { Announcement } from '@/types/dataModel';

const MAX_WIDGET_ANNOUNCEMENTS = 3;

export function RecentAnnouncementsWidget() {
  const campId = 'mock-camp-123'; // Placeholder - needed for links

  // Fetch all announcements
  const allAnnouncements = useAnnouncementStore((state) => state.announcements);

  // Get the most recent announcements for the mock camp
  const recentAnnouncements = useMemo(() => {
    return (
      allAnnouncements
        .filter((ann) => ann.camp_id === campId)
        // Sort by date descending (newest first)
        .sort(
          (a, b) =>
            new Date(b.created_at || 0).getTime() -
            new Date(a.created_at || 0).getTime()
        )
        .slice(0, MAX_WIDGET_ANNOUNCEMENTS)
    );
  }, [allAnnouncements, campId]);

  const announcementsListHref = `/${campId}/announcements`;

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between pb-2">
        <CardTitle className="text-lg font-medium">
          Recent Announcements
        </CardTitle>
        <Button asChild variant="ghost" size="sm">
          <Link href={announcementsListHref}>View All</Link>
        </Button>
      </CardHeader>
      <CardContent>
        {recentAnnouncements.length === 0 ? (
          <p className="text-muted-foreground text-sm">
            No recent announcements.
          </p>
        ) : (
          <ul className="space-y-3">
            {recentAnnouncements.map((ann: Announcement) => (
              <li key={ann.id} className="text-sm">
                <Link
                  href={`/${campId}/announcements/${ann.id}`}
                  className="font-medium hover:underline"
                >
                  {ann.title}
                </Link>
                {ann.created_at && (
                  <p className="text-muted-foreground text-xs">
                    {format(new Date(ann.created_at), 'MMM d')}
                  </p>
                )}
              </li>
            ))}
          </ul>
        )}
      </CardContent>
    </Card>
  );
}
