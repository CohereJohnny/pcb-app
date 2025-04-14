'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { v4 as uuidv4 } from 'uuid';

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
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardFooter,
} from '@/components/ui/card';
import { listSchema, ListFormData } from '@/lib/validators/lists';
import { useListStore } from '@/store/listStore';
import { List } from '@/types/dataModel';
import { listTypeOptions } from '@/lib/constants/listTypes'; // Import options

interface ListFormProps {
  campId: string;
  authorUserId: string; // Assuming mock user ID passed in
  onSuccess?: () => void;
}

export function ListForm({ campId, authorUserId, onSuccess }: ListFormProps) {
  const addList = useListStore((state) => state.addList);

  const form = useForm<ListFormData>({
    resolver: zodResolver(listSchema),
    defaultValues: {
      title: '',
      description: '',
      type: undefined, // Default to no selection
    },
  });

  async function onSubmit(values: ListFormData) {
    await new Promise((resolve) => setTimeout(resolve, 500)); // Simulate delay

    const newList: List = {
      id: uuidv4(),
      camp_id: campId,
      created_by_user_id: authorUserId,
      title: values.title,
      description: values.description || null,
      type: values.type, // Type comes directly from validated form data
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
    };

    addList(newList);
    form.reset();
    onSuccess?.();
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Create New List</CardTitle>
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
                    <Input placeholder="Enter list title..." {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Description (Optional)</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="Enter a brief description..."
                      {...field}
                      // Ensure zod schema handles potential null/undefined
                      value={field.value ?? ''}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="type"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>List Type</FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select a list type" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {listTypeOptions.map((option) => (
                        <SelectItem key={option.value} value={option.value}>
                          {option.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
          </CardContent>
          <CardFooter>
            <Button type="submit" disabled={form.formState.isSubmitting}>
              {form.formState.isSubmitting ? 'Creating...' : 'Create List'}
            </Button>
          </CardFooter>
        </form>
      </Form>
    </Card>
  );
}
