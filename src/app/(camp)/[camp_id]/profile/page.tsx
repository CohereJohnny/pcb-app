// ProfilePage as a Server Component using API Route for data fetching

import React from 'react';
// No longer needs redirect - auth handled by API route
// import { redirect } from 'next/navigation';
import { ProfileForm } from '@/components/features/profile/ProfileForm';
import { TravelItineraryForm } from '@/components/features/profile/TravelItineraryForm';
import { AccommodationForm } from '@/components/features/profile/AccommodationForm';
import { Separator } from '@/components/ui/separator';
// No longer needs direct Supabase imports or helpers
// import { fetchUserProfile } from '@/lib/supabase/queries/profile';
// import { createServerClient, type CookieOptions } from '@supabase/ssr';
// import { cookies } from 'next/headers';

// Make the page component async and accept params
export default async function ProfilePage({
  params,
}: {
  params: { camp_id: string };
}) {
  const campId = params.camp_id; // Can keep this for context if needed
  console.log('[ProfilePage] Rendering for Camp ID:', campId);

  let profile = null;
  let fetchError: string | null = null;
  let response: Response | null = null; // Declare response outside try

  try {
    console.log('[ProfilePage] Fetching data from /api/profile...');
    // Fetch from the API route - MUST use absolute URL on server-side
    // Or configure fetch to handle relative URLs correctly (requires setup)
    // Using a placeholder for base URL for now - replace with actual env var
    const baseUrl = process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000';
    response = await fetch(`${baseUrl}/api/profile`, {
      method: 'GET',
      headers: {
        // Include cookies or other headers if necessary, but fetch should handle session cookies
        'Content-Type': 'application/json',
      },
      cache: 'no-store', // Ensure fresh data is fetched
    });

    console.log(`[ProfilePage] API response status: ${response.status}`);

    if (response.ok) {
      profile = await response.json();
      console.log('[ProfilePage] Successfully fetched profile data:', profile);
    } else if (response.status !== 401) {
      // Handle non-401 errors here
      const errorData = await response
        .json()
        .catch(() => ({ error: 'Failed to parse error response' }));
      console.error(
        `[ProfilePage] API fetch error (${response.status}):`,
        errorData
      );
      fetchError = errorData.error || `HTTP error ${response.status}`;
    }
    // Don't handle 401 inside the try-catch related to fetch
  } catch (error) {
    console.error('[ProfilePage] Unexpected error during fetch/parse:', error);
    fetchError =
      error instanceof Error
        ? error.message
        : 'An unknown fetch error occurred';
  }

  // Handle 401 redirect *after* the try-catch
  if (response && response.status === 401) {
    console.log('[ProfilePage] Unauthorized (401), redirecting to login...');
    const { redirect } = await import('next/navigation');
    redirect('/login');
  }

  // Render error page if fetch failed (for non-401 errors)
  if (fetchError) {
    return (
      <div className="p-4 text-red-500">
        <h1 className="text-xl font-bold">Error Loading Profile</h1>
        <p>Could not load your profile data. Please try again later.</p>
        <pre className="mt-2 text-sm">Error: {fetchError}</pre>
      </div>
    );
  }

  // Pass the fetched profile to the forms
  return (
    <div className="space-y-8 pb-8">
      <div>
        <h1 className="text-3xl font-bold">Your Profile</h1>
        <p className="text-muted-foreground mt-2">
          Manage your personal, travel, and accommodation details.
        </p>
      </div>
      <Separator />

      {/* Pass fetched profile data down as props */}
      <ProfileForm initialData={profile} />
      <TravelItineraryForm initialData={profile?.travel_itinerary ?? null} />
      <AccommodationForm initialData={profile?.accommodation_details ?? null} />
    </div>
  );
}
