import { z } from 'zod';

export const announcementSchema = z.object({
  title: z.string().min(1, { message: 'Title is required' }),
  content: z.string().min(1, { message: 'Content is required' }),
});

export type AnnouncementFormData = z.infer<typeof announcementSchema>;
