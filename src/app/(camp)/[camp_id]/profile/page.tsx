// ProfilePage as a Server Component for Sprint 2 data fetching

import React from 'react';
import { redirect } from 'next/navigation';
import { ProfileForm } from '@/components/features/profile/ProfileForm';
import { TravelItineraryForm } from '@/components/features/profile/TravelItineraryForm';
import { AccommodationForm } from '@/components/features/profile/AccommodationForm';
import { Separator } from '@/components/ui/separator';
import { fetchUserProfile } from '@/lib/supabase/queries/profile';

// Direct Supabase client creation (workaround)
import { createServerClient } from '@supabase/ssr';
import { cookies } from 'next/headers';

// Workaround: Define createSupabaseServerClient locally accepting cookie store
function createSupabaseServerClient(cookieStore: ReturnType<typeof cookies>) {
  return createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        get(name: string) {
          return cookieStore.get(name)?.value;
        },
        // NOTE: set/remove omitted based on previous attempts for build
      },
    }
  );
}

// Make the page component async and accept params
export default async function ProfilePage({
  params,
}: {
  params: { camp_id: string };
}) {
  const campId = params.camp_id;
  console.log('[ProfilePage] Rendering for Camp ID:', campId);

  // Get cookie store within the async component context
  const cookieStore = cookies();

  let supabase;
  try {
    console.log(
      '[ProfilePage] Attempting to create Supabase client (direct)...'
    );
    // Pass cookieStore to the helper
    supabase = createSupabaseServerClient(cookieStore);
    console.log('[ProfilePage] Supabase client created successfully (direct).');
  } catch (clientError) {
    console.error(
      '[ProfilePage] FATAL: Error creating Supabase client (direct):',
      clientError
    );
    return (
      <div>Error initializing Supabase client. Please check server logs.</div>
    );
  }

  // Fetch user session
  console.log('[ProfilePage] Attempting to get user session...');
  const { data: authData, error: authError } = await supabase.auth.getUser();

  console.log('[ProfilePage] getUser result:', {
    data: authData,
    error: authError,
  });

  if (authError || !authData?.user) {
    console.error(
      '[ProfilePage] Auth error or no user found, redirecting to login...',
      { authError, user: authData?.user }
    );
    redirect('/login'); // Redirect to login if not authenticated
  }

  const user = authData.user;
  console.log('[ProfilePage] Authenticated user found:', user.id);

  // Fetch user profile data
  console.log('[ProfilePage] Now attempting to fetch profile...');
  const { profile, error: profileError } = await fetchUserProfile(user.id);

  if (profileError) {
    console.error('Error fetching user profile:', profileError.message);
  }
  console.log('Fetched profile data:', profile);

  // Pass the fetched profile to the forms
  // Note: The forms themselves will need to be Client Components
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
