import React from 'react';
import {
  mockMemberships,
  mockRosterUsers,
  mockRosterProfiles,
} from '@/lib/mockData/roster';
import { RosterMember } from '@/components/features/roster/RosterTable';
import { Membership, User, Profile } from '@/types/dataModel';

// Import the component itself
import { RosterTable } from '@/components/features/roster/RosterTable';

type RosterPageProps = {
  params: Promise<{ camp_id: string }>;
  searchParams: Promise<Record<string, string | string[] | undefined>>;
};

// Helper function to combine roster data
function processRosterData(
  memberships: Membership[],
  users: User[],
  profiles: Partial<Profile>[]
): RosterMember[] {
  const userMap = new Map(users.map((u) => [u.id, u]));
  const profileMap = new Map(profiles.map((p) => [p.user_id, p]));

  return memberships.map((membership) => {
    const user = userMap.get(membership.user_id);
    const profile = profileMap.get(membership.user_id);

    return {
      user_id: membership.user_id,
      name: user?.name,
      playa_name: profile?.playa_name,
      role: membership.role,
      arrival_date: profile?.travel_itinerary?.arrival_date?.toString(), // Convert Date/string to string
      departure_date: profile?.travel_itinerary?.departure_date?.toString(), // Convert Date/string to string
      accommodation_type: profile?.accommodation_details?.type,
    };
  });
}

// This page will be a Server Component by default
export default async function RosterPage({
  params: pageParamsPromise,
  searchParams: searchParamsPromise,
}: RosterPageProps) {
  const params = await pageParamsPromise;
  const searchParams = await searchParamsPromise;
  console.log('Roster Page - Camp ID:', params.camp_id);
  console.log('Search params:', searchParams); // Use searchParams to avoid unused variable warning

  // Fetch and process mock data here
  const rosterData = processRosterData(
    mockMemberships,
    mockRosterUsers,
    mockRosterProfiles
  );

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold">Camp Roster</h1>
        <p className="text-muted-foreground mt-2">
          View the members registered for this camp.
        </p>
      </div>
      {/* Render RosterTable */}
      <RosterTable data={rosterData} />
    </div>
  );
}
