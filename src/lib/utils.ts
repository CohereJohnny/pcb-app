import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';
import { Membership, User, Profile } from '@/types/dataModel';
import { RosterMember } from '@/components/features/roster/RosterTable';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

// Helper function to combine mock roster data
export function processRosterData(
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
