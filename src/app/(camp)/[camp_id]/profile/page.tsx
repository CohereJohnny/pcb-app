'use client'; // Forms will need client-side interaction

import React from 'react';
import { useParams, useSearchParams } from 'next/navigation'; // Import hooks
import { ProfileForm } from '@/components/features/profile/ProfileForm';
import { TravelItineraryForm } from '@/components/features/profile/TravelItineraryForm';
import { AccommodationForm } from '@/components/features/profile/AccommodationForm';
import { Separator } from '@/components/ui/separator';

// Remove params/searchParams from props, get them from hooks instead
export default function ProfilePage() {
  const params = useParams();
  const searchParams = useSearchParams();

  const campId = params.camp_id as string; // Get camp_id from params hook

  // Log the values obtained from hooks
  console.log('Camp ID (from hook):', campId);
  console.log('Search params (from hook):', searchParams.toString()); // Log searchParams

  return (
    <div className="space-y-8 pb-8">
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
