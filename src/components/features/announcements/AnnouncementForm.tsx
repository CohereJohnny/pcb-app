'use client';

import React from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useRouter } from 'next/navigation'; // For redirecting

import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea'; // Use Textarea for content
import { Button } from '@/components/ui/button';
import { useAnnouncementStore } from '@/store/announcementStore'; // Import store hook

// Define Zod schema for the form
export const announcementSchema = z.object({
  title: z.string().min(3, { message: 'Title must be at least 3 characters long.' }),
  content: z.string().min(10, { message: 'Content must be at least 10 characters long.' }),
  // author_user_id will be added implicitly or based on auth state
});

export type AnnouncementFormData = z.infer<typeof announcementSchema>;

export function AnnouncementForm() {
  const router = useRouter();
  const addAnnouncement = useAnnouncementStore((state) => state.addAnnouncement);
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset, // To clear form after submission
  } = useForm<AnnouncementFormData>({
    resolver: zodResolver(announcementSchema),
    defaultValues: {
      title: '',
      content: '',
    },
  });

  const onSubmit = async (data: AnnouncementFormData) => {
    console.log('Submitting announcement:', data);
    try {
      // Get current user ID (using placeholder for now)
      const currentUserId = 'user-123'; // Replace with actual auth user ID later

      // Add to store (simulate saving)
      addAnnouncement({ ...data, author_user_id: currentUserId });

      // Simulate API delay
      await new Promise((resolve) => setTimeout(resolve, 500));

      console.log('Announcement added successfully.');
      reset(); // Clear the form

      // Redirect back to the announcements list page
      // Need to get campId dynamically later
      const campId = 'mock-camp-123';
      router.push(`/${campId}/announcements`);
    } catch (error) {
      console.error('Failed to add announcement:', error);
      // TODO: Show error message to user
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Card>
        <CardHeader>
          <CardTitle>New Announcement</CardTitle>
          <CardDescription>Share something with the camp.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6 pt-6">
          <div className="space-y-2">
            <Label htmlFor="title">Title</Label>
            <Input
              id="title"
              placeholder="Enter the announcement title"
              {...register('title')}
            />
            {errors.title && (
              <p className="text-sm font-medium text-destructive pt-1">
                {errors.title.message}
              </p>
            )}
          </div>
          <div className="space-y-2">
            <Label htmlFor="content">Content</Label>
            <Textarea
              id="content"
              placeholder="Write your announcement here..."
              {...register('content')}
              rows={6} // Give more space for content
            />
            {errors.content && (
              <p className="text-sm font-medium text-destructive pt-1">
                {errors.content.message}
              </p>
            )}
          </div>
        </CardContent>
        <CardFooter className="flex justify-end border-t border-border px-6 py-4">
          <Button type="submit" disabled={isSubmitting}>
            {isSubmitting ? 'Posting...' : 'Post Announcement'}
          </Button>
        </CardFooter>
      </Card>
    </form>
  );
} 