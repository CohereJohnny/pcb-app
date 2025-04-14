'use client';

import { useParams } from 'next/navigation';
import { useMemo } from 'react';
import { Button } from '@/components/ui/button';
import {
  RosterTable,
  RosterMember,
} from '@/components/features/roster/RosterTable';
// Import mock data directly
import {
  mockMemberships,
  mockRosterUsers,
  mockRosterProfiles,
} from '@/lib/mockData/roster';
import { Membership, User, Profile } from '@/types/dataModel';

// Helper function to combine mock roster data
// (Could be moved to a util file later)
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

    // Basic profile info even if partial mock profile is missing
    const basicProfile = profile || { user_id: membership.user_id };

    return {
      user_id: membership.user_id,
      name: user?.name,
      playa_name: basicProfile?.playa_name,
      role: membership.role,
      // Safely access nested properties
      arrival_date: basicProfile?.travel_itinerary?.arrival_date?.toString(),
      departure_date:
        basicProfile?.travel_itinerary?.departure_date?.toString(),
      accommodation_type: basicProfile?.accommodation_details?.type,
    };
  });
}

export default function RosterViewPage() {
  const params = useParams();
  const campId = params.camp_id as string;

  // Process the imported mock data using useMemo
  const rosterData = useMemo(() => {
    // Filter memberships for the current mock camp if necessary
    // (Although mock data is currently only for MOCK_CAMP_ID)
    const campMemberships = mockMemberships.filter((m) => m.camp_id === campId);
    return processRosterData(
      campMemberships,
      mockRosterUsers,
      mockRosterProfiles
    );
  }, [campId]); // Recalculate if campId changes (though it won't with current setup)

  const handleInvite = () => {
    // Placeholder action for MVP
    console.log(`Invite action triggered for camp: ${campId}`);
    alert('Invite Member functionality not implemented yet.');
  };

  return (
    <div className="container mx-auto p-4">
      <div className="mb-6 flex items-center justify-between">
        <h1 className="text-2xl font-semibold">Camp Roster</h1>
        <Button onClick={handleInvite}>Invite New Member</Button>
      </div>
      <RosterTable data={rosterData} />
    </div>
  );
}
