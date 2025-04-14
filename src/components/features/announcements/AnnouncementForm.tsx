'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { v4 as uuidv4 } from 'uuid'; // To generate unique IDs for mock data

import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardFooter,
} from '@/components/ui/card';
import {
  announcementSchema,
  AnnouncementFormData,
} from '@/lib/validators/announcements';
import { useAnnouncementStore } from '@/store/announcementStore';
import { Announcement } from '@/types/dataModel';
import { Wand2 } from 'lucide-react'; // Add icon import

interface AnnouncementFormProps {
  campId: string;
  authorUserId: string;
  onSuccess?: () => void; // Optional callback for successful submission
}

export function AnnouncementForm({
  campId,
  authorUserId,
  onSuccess,
}: AnnouncementFormProps) {
  const addAnnouncement = useAnnouncementStore(
    (state) => state.addAnnouncement
  );

  const form = useForm<AnnouncementFormData>({
    resolver: zodResolver(announcementSchema),
    defaultValues: {
      title: '',
      content: '',
    },
  });

  async function onSubmit(values: AnnouncementFormData) {
    // Simulate network delay
    await new Promise((resolve) => setTimeout(resolve, 500));

    const newAnnouncement: Announcement = {
      id: uuidv4(), // Generate a unique ID for the mock announcement
      camp_id: campId,
      author_user_id: authorUserId,
      title: values.title,
      content: values.content,
      created_at: new Date().toISOString(), // Set current date/time
      updated_at: new Date().toISOString(),
    };

    addAnnouncement(newAnnouncement);
    form.reset(); // Reset form after submission
    onSuccess?.(); // Call the success callback if provided
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Create New Announcement</CardTitle>
      </CardHeader>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          <CardContent className="space-y-4">
            <FormField
              control={form.control}
              name="title"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Title</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Enter announcement title..."
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="content"
              render={({ field }) => (
                <FormItem>
                  <div className="flex items-center justify-between">
                    <FormLabel>Content</FormLabel>
                    <Button
                      type="button"
                      variant="ghost"
                      size="sm"
                      onClick={() => {
                        // console.log('Draft Announcement with AI clicked')
                      }}
                    >
                      <Wand2 className="mr-1 h-4 w-4" />
                      Draft with AI
                    </Button>
                  </div>
                  <FormControl>
                    <Textarea
                      placeholder="Enter announcement content..."
                      className="min-h-[100px] resize-y"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </CardContent>
          <CardFooter>
            <Button type="submit" disabled={form.formState.isSubmitting}>
              {form.formState.isSubmitting
                ? 'Creating...'
                : 'Create Announcement'}
            </Button>
          </CardFooter>
        </form>
      </Form>
    </Card>
  );
}
