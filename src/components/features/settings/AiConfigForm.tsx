'use client';

import { useForm } from 'react-hook-form';
// No Zod schema needed for this mock form

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
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
  CardDescription,
} from '@/components/ui/card';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Terminal } from 'lucide-react';

// Mock AI Providers
const aiProviders = [
  { value: 'openai', label: 'OpenAI' },
  { value: 'anthropic', label: 'Anthropic' },
  // Add more later
];

// Define form data structure (even without Zod for now)
interface AiConfigFormData {
  provider: string;
  apiKey: string;
}

export function AiConfigForm() {
  const form = useForm<AiConfigFormData>({
    // No resolver needed
    defaultValues: {
      provider: '', // Default to empty or first provider?
      apiKey: '',
    },
  });

  function onSubmit(/* values: AiConfigFormData */) {
    // Placeholder action
    // console.log('Save AI Settings clicked:', values);
    alert('Saving AI settings is not implemented in this mock UI.');
    // IMPORTANT: Never actually save/handle real API keys in frontend code.
    // This data would typically be sent securely to a backend.
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>AI Feature Configuration</CardTitle>
        <CardDescription>
          Configure the AI provider and API key for features like drafting
          announcements or suggesting list items.
        </CardDescription>
      </CardHeader>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          <CardContent className="space-y-4">
            {/* Security Warning */}
            <Alert variant="destructive">
              <Terminal className="h-4 w-4" />
              <AlertTitle>Security Warning</AlertTitle>
              <AlertDescription>
                Do not enter real API keys here. This is a mock UI and does not
                securely store sensitive information. Configuration should
                happen via secure backend settings or environment variables in a
                real application.
              </AlertDescription>
            </Alert>

            <FormField
              control={form.control}
              name="provider"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>AI Provider</FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select AI provider..." />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {aiProviders.map((option) => (
                        <SelectItem key={option.value} value={option.value}>
                          {option.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormDescription>
                    Choose the AI service to use.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="apiKey"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>API Key</FormLabel>
                  <FormControl>
                    {/* Use type="password" for basic masking */}
                    <Input
                      type="password"
                      placeholder="Enter API key (mock)..."
                      {...field}
                    />
                  </FormControl>
                  <FormDescription>
                    Your API key for the selected provider (stored insecurely in
                    this demo).
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
          </CardContent>
          <CardContent>
            {' '}
            {/* Separate CardContent for Button to avoid large spacing */}
            <Button type="submit" disabled={form.formState.isSubmitting}>
              {form.formState.isSubmitting ? 'Saving...' : 'Save Settings (Mock)'}
            </Button>
          </CardContent>
        </form>
      </Form>
    </Card>
  );
}
