'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { v4 as uuidv4 } from 'uuid';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  // FormLabel, // Not needed for inline form
  FormMessage,
} from '@/components/ui/form';
import { listItemSchema, ListItemFormData } from '@/lib/validators/lists';
import { useListStore } from '@/store/listStore';
import { ListItem } from '@/types/dataModel';

interface AddItemFormProps {
  listId: string;
}

export function AddItemForm({ listId }: AddItemFormProps) {
  const addListItem = useListStore((state) => state.addListItem);

  const form = useForm<ListItemFormData>({
    resolver: zodResolver(listItemSchema),
    defaultValues: {
      content: '',
    },
  });

  function onSubmit(values: ListItemFormData) {
    const newListItem: ListItem = {
      id: uuidv4(),
      list_id: listId,
      content: values.content,
      is_complete: false,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
      // Assignee, due date, status would be set via different UI later
    };
    addListItem(newListItem);
    form.reset(); // Clear the form
  }

  return (
    <Form {...form}>
      {/* Use flex layout for inline appearance */}
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="border-border mt-4 flex items-start gap-2 border-t py-4"
      >
        <FormField
          control={form.control}
          name="content"
          render={({ field }) => (
            <FormItem className="flex-1">
              {/* <FormLabel>New Item</FormLabel> */}
              <FormControl>
                <Input
                  placeholder="Add a new item..."
                  {...field}
                  autoComplete="off"
                />
              </FormControl>
              <FormMessage className="text-xs" />
            </FormItem>
          )}
        />
        <Button
          type="submit"
          size="sm"
          disabled={form.formState.isSubmitting || !form.formState.isValid}
        >
          Add Item
        </Button>
      </form>
    </Form>
  );
}
