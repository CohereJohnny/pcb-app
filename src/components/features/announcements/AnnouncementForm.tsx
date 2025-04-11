'use client';

import React from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useRouter } from 'next/navigation';
import { useAnnouncementStore } from '@/store/announcementStore';

const announcementSchema = z.object({
  title: z.string().min(1, 'Title is required'),
  content: z.string().min(1, 'Content is required'),
});

type AnnouncementFormData = z.infer<typeof announcementSchema>;

interface AnnouncementFormProps {
  campId: string;
}

export function AnnouncementForm({ campId }: AnnouncementFormProps) {
  const router = useRouter();
  const addAnnouncement = useAnnouncementStore(
    (state) => state.addAnnouncement
  );

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<AnnouncementFormData>({
    resolver: zodResolver(announcementSchema),
  });

  const onSubmit = async (data: AnnouncementFormData) => {
    try {
      // Add announcement to store
      addAnnouncement({
        title: data.title,
        content: data.content,
        author_user_id: 'user-123', // Mock user ID
        camp_id: campId,
      });

      // Redirect back to announcements list
      router.push(`/${campId}/announcements`);
    } catch (error) {
      console.error('Failed to create announcement:', error);
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>New Announcement</CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div className="space-y-2">
            <Input
              placeholder="Title"
              {...register('title')}
              aria-invalid={errors.title ? 'true' : 'false'}
            />
            {errors.title && (
              <p className="text-destructive text-sm font-medium">
                {errors.title.message}
              </p>
            )}
          </div>

          <div className="space-y-2">
            <Textarea
              placeholder="Content"
              {...register('content')}
              rows={6}
              aria-invalid={errors.content ? 'true' : 'false'}
            />
            {errors.content && (
              <p className="text-destructive text-sm font-medium">
                {errors.content.message}
              </p>
            )}
          </div>

          <div className="flex justify-end gap-4">
            <Button
              type="button"
              variant="outline"
              onClick={() => router.push(`/${campId}/announcements`)}
            >
              Cancel
            </Button>
            <Button type="submit" disabled={isSubmitting}>
              {isSubmitting ? 'Creating...' : 'Create Announcement'}
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  );
}
