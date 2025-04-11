'use client'; // Forms will need client-side interaction

import React from 'react';
import { ProfileForm } from '@/components/features/profile/ProfileForm';
import { TravelItineraryForm } from '@/components/features/profile/TravelItineraryForm';
import { AccommodationForm } from '@/components/features/profile/AccommodationForm';
import { Separator } from '@/components/ui/separator';

// Page receives params for dynamic routes
interface ProfilePageProps {
  params: { camp_id: string };
}

export default function ProfilePage({ params }: ProfilePageProps) {
  console.log('Camp ID:', params.camp_id); // Log camp id from route

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-semibold">Your Profile</h1>
        <p className="text-muted-foreground">
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
