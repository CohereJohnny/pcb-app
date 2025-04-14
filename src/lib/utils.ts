import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';
import { Membership, User, Profile } from '@/types/dataModel';
import { RosterMember } from '@/components/features/roster/RosterTable';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

/**
 * Processes raw mock data arrays into a structured format suitable for the RosterTable.
 *
 * Combines membership info with corresponding user and profile details.
 *
 * @param memberships - Array of Membership objects.
 * @param users - Array of User objects.
 * @param profiles - Array of partial Profile objects (can be incomplete in mock data).
 * @returns An array of RosterMember objects ready for display.
 */
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

    // Handle cases where mock profile data might be missing for a user
    const basicProfile = profile || { user_id: membership.user_id };

    return {
      user_id: membership.user_id,
      name: user?.name, // Use optional chaining for safety
      playa_name: basicProfile?.playa_name,
      role: membership.role,
      // Safely access potentially nested/missing properties from partial profiles
      arrival_date: basicProfile?.travel_itinerary?.arrival_date?.toString(),
      departure_date:
        basicProfile?.travel_itinerary?.departure_date?.toString(),
      accommodation_type: basicProfile?.accommodation_details?.type,
    };
  });
}
