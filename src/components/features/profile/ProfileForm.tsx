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
    formState: { errors, isSubmitting },
    reset, // Add reset function
  } = useForm<ProfileFormData>({
    resolver: zodResolver(profileFormSchema),
    // Use initialData for default values, fallback to empty object
    defaultValues: initialData ?? {},
  });

  // Reset form when initialData changes (e.g., after fetch)
  React.useEffect(() => {
    if (initialData) {
      reset(initialData);
    } else {
      reset({}); // Reset to empty if initialData is null
    }
  }, [initialData, reset]);

  // Updated onSubmit to accept validated data
  // TODO: Implement actual API call in Sprint 2
  const onSubmit = (data: ProfileFormData) => {
    console.log('Profile form submitted with:', data);
    // Simulate API call
    return new Promise((resolve) =>
      setTimeout(() => {
        // TODO: Call PUT /api/profile endpoint here
        resolve(void 0);
      }, 1000)
    );
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
        </CardContent>
        <CardFooter className="border-border flex justify-end border-t px-6 py-4">
          <Button type="submit" disabled={isSubmitting}>
            {' '}
            {/* Disable button while submitting */}
            {isSubmitting ? 'Saving...' : 'Save Profile'}
          </Button>
        </CardFooter>
      </Card>
    </form>
  );
}
