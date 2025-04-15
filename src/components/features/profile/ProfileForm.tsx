'use client';

import React from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
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
import { Button } from '@/components/ui/button';
import {
  profileFormSchema,
  type ProfileFormData,
} from '@/lib/validators/profileSchema';
import { useProfileMutations } from '@/hooks/useProfileMutations';
import type { UpdateProfilePayload } from '@/lib/validators/profileSchema';

// Type for the props, including optional initialData
interface ProfileFormProps {
  initialData: Partial<ProfileFormData> | null;
}

// Removed mock data
// const MOCK_PROFILE_DATA: Partial<ProfileFormData> = { ... };

// Accept initialData prop
export function ProfileForm({ initialData }: ProfileFormProps) {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<ProfileFormData>({
    resolver: zodResolver(profileFormSchema),
    defaultValues: initialData ?? {},
  });

  // Use the mutation hook
  const {
    updateProfile,
    isLoading: isMutating,
    error: mutationError,
  } = useProfileMutations();

  // Reset form when initialData changes (e.g., after fetch)
  React.useEffect(() => {
    if (initialData) {
      reset(initialData);
    } else {
      reset({}); // Reset to empty if initialData is null
    }
  }, [initialData, reset]);

  // Update onSubmit to use the hook
  const onSubmit = async (data: ProfileFormData) => {
    console.log('[ProfileForm] Submitting:', data);
    // Construct payload for the API (only fields from this form)
    const payload: UpdateProfilePayload = {
      name: data.name,
      playa_name: data.playa_name,
      contact_info: data.contact_info,
      emergency_contact: data.emergency_contact,
    };
    const result = await updateProfile(payload);
    if (result.success) {
      console.log('[ProfileForm] Update successful!');
      // TODO: Add success feedback (e.g., toast)
    } else {
      console.error('[ProfileForm] Update failed:', result.error);
      // TODO: Add error feedback (e.g., toast)
    }
  };

  return (
    // Use RHF's handleSubmit
    <form onSubmit={handleSubmit(onSubmit)}>
      <Card>
        <CardHeader>
          <CardTitle>Basic Information</CardTitle>
          <CardDescription>Your personal details.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6 pt-6">
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor="name">Legal Name</Label>
              <Input
                id="name"
                placeholder="Enter your legal name"
                {...register('name')} // Register field
              />
              {/* Display validation error */}
              {errors.name && (
                <p className="text-destructive pt-1 text-sm font-medium">
                  {errors.name.message}
                </p>
              )}
            </div>
            <div className="space-y-2">
              <Label htmlFor="playa_name">Playa Name</Label>
              <Input
                id="playa_name"
                placeholder="Enter your playa name"
                {...register('playa_name')} // Register field
              />
              {/* No error display for optional field unless schema changes */}
            </div>
          </div>
          <div className="space-y-2">
            <Label htmlFor="contact_info">Contact Info</Label>
            <Input
              id="contact_info"
              placeholder="Email or Phone"
              {...register('contact_info')} // Register field
            />
            {/* Add error display if schema requires format later */}
          </div>
          <div className="space-y-2">
            <Label htmlFor="emergency_contact">Emergency Contact</Label>
            <Input
              id="emergency_contact"
              placeholder="Name & Phone"
              {...register('emergency_contact')} // Register field
            />
            {/* Add error display if schema requires format later */}
          </div>
          {/* Display mutation error near footer */}
          {mutationError && (
            <p className="text-destructive pt-1 text-sm font-medium">
              Error saving profile: {mutationError}
            </p>
          )}
        </CardContent>
        <CardFooter className="border-border flex justify-end border-t px-6 py-4">
          {/* Use isLoading from the hook */}
          <Button type="submit" disabled={isMutating}>
            {isMutating ? 'Saving...' : 'Save Profile'}
          </Button>
        </CardFooter>
      </Card>
    </form>
  );
}
