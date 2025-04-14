import { z } from 'zod';
import { LIST_TYPES } from '@/lib/constants/listTypes';

// Zod nativeEnum works better with 'as const' objects directly

export const listSchema = z.object({
  title: z.string().min(1, { message: 'Title is required' }),
  description: z.string().optional(),
  // Use nativeEnum with the actual LIST_TYPES object keys
  type: z.nativeEnum(LIST_TYPES, {
    errorMap: () => ({ message: 'Please select a valid list type.' }),
  }),
});

export type ListFormData = z.infer<typeof listSchema>;

// Schema for adding a new list item
export const listItemSchema = z.object({
  content: z.string().min(1, { message: 'Item content cannot be empty' }),
  // Add fields for assigning user, due date etc. later if needed in the form
});

export type ListItemFormData = z.infer<typeof listItemSchema>;
