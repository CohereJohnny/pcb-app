'use client';

import { useParams } from 'next/navigation';
import { useMemo } from 'react';
import { Button } from '@/components/ui/button';
import { RosterTable } from '@/components/features/roster/RosterTable';
// Import mock data directly
import {
  mockMemberships,
  mockRosterUsers,
  mockRosterProfiles,
} from '@/lib/mockData/roster';
import { processRosterData } from '@/lib/utils';

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

  // Placeholder action handler
  const handleInvite = () => {
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
