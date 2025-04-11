'use client'; // Forms will need client-side interaction

import React from 'react';
import { ProfileForm } from '@/components/features/profile/ProfileForm';
import { TravelItineraryForm } from '@/components/features/profile/TravelItineraryForm';
import { AccommodationForm } from '@/components/features/profile/AccommodationForm';
import { Separator } from '@/components/ui/separator';

// Page receives params for dynamic routes
type ProfilePageProps = {
  params: Promise<{ camp_id: string }>;
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
};

export default async function ProfilePage({
  params: pageParamsPromise,
  searchParams: searchParamsPromise,
}: ProfilePageProps) {
  const params = await pageParamsPromise;
  const searchParams = await searchParamsPromise;
  console.log('Camp ID:', params.camp_id); // Log camp id from route
  console.log('Search params:', searchParams); // Use searchParams to avoid unused variable warning

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold">Your Profile</h1>
        <p className="text-muted-foreground mt-2">
          Manage your personal, travel, and accommodation details.
        </p>
      </div>
      <Separator />

      <ProfileForm />
      <TravelItineraryForm />
      <AccommodationForm />
    </div>
  );
}
