// Mock data for the Roster feature

import {
  Membership,
  User,
  Profile,
  TravelItinerary,
  AccommodationDetails,
} from '@/types/dataModel';

const MOCK_CAMP_ID = 'mock-camp-123';

// --- Mock Users ---
export const mockRosterUsers: User[] = [
  {
    id: 'user-001',
    email: 'alice.ashes@example.com',
    name: 'Alice Ashes',
  },
  {
    id: 'user-002',
    email: 'bob.burnside@example.com',
    name: 'Bob Burnside',
  },
  {
    id: 'user-003',
    email: 'charlie.cinders@example.com',
    name: 'Charlie Cinders',
  },
  {
    id: 'user-004',
    email: 'diana.dustdevil@example.com',
    name: 'Diana Dustdevil',
  },
  {
    id: 'user-123', // Our current mock user from context
    email: 'sam.stardust@example.com',
    name: 'Sam Stardust',
  },
];

// --- Mock Memberships ---
export const mockMemberships: Membership[] = [
  {
    user_id: 'user-001',
    camp_id: MOCK_CAMP_ID,
    role: 'ORGANIZER',
  },
  {
    user_id: 'user-002',
    camp_id: MOCK_CAMP_ID,
    role: 'LEAD',
  },
  {
    user_id: 'user-003',
    camp_id: MOCK_CAMP_ID,
    role: 'MEMBER',
  },
  {
    user_id: 'user-004',
    camp_id: MOCK_CAMP_ID,
    role: 'MEMBER',
  },
  {
    user_id: 'user-123',
    camp_id: MOCK_CAMP_ID,
    role: 'MEMBER',
  },
];

// --- Mock Profiles (subset needed for Roster) ---

// Helper function for dates
function getDate(daysOffset: number): Date {
  const date = new Date();
  date.setDate(date.getDate() + daysOffset);
  return date;
}

export const mockRosterProfiles: Partial<Profile>[] = [
  {
    // Alice Ashes (Organizer)
    user_id: 'user-001',
    playa_name: 'Sparkle Pony',
    travel_itinerary: {
      arrival_date: getDate(-2).toISOString().split('T')[0], // Arriving early
      departure_date: getDate(8).toISOString().split('T')[0], // Leaving late
    } as TravelItinerary,
    accommodation_details: {
      type: 'RV / Trailer',
    } as AccommodationDetails,
  },
  {
    // Bob Burnside (Lead)
    user_id: 'user-002',
    playa_name: 'Gear Head',
    travel_itinerary: {
      arrival_date: getDate(0).toISOString().split('T')[0],
      departure_date: getDate(7).toISOString().split('T')[0],
    } as TravelItinerary,
    accommodation_details: {
      type: 'ShiftPod',
    } as AccommodationDetails,
  },
  {
    // Charlie Cinders (Member)
    user_id: 'user-003',
    playa_name: 'Pyro',
    travel_itinerary: {
      arrival_date: getDate(1).toISOString().split('T')[0],
      departure_date: getDate(6).toISOString().split('T')[0],
    } as TravelItinerary,
    accommodation_details: {
      type: 'Tent',
    } as AccommodationDetails,
  },
  {
    // Diana Dustdevil (Member)
    user_id: 'user-004',
    playa_name: 'Wind Dancer',
    travel_itinerary: {
      arrival_date: getDate(0).toISOString().split('T')[0],
      departure_date: getDate(7).toISOString().split('T')[0],
    } as TravelItinerary,
    accommodation_details: {
      type: 'Yurt',
    } as AccommodationDetails,
  },
  {
    // Sam Stardust (Our mock user)
    user_id: 'user-123',
    playa_name: 'Stargazer', // Let's assume Sam updated profile
    travel_itinerary: {
      arrival_date: getDate(2).toISOString().split('T')[0],
      departure_date: getDate(5).toISOString().split('T')[0],
    } as TravelItinerary,
    accommodation_details: {
      type: 'Dome',
    } as AccommodationDetails,
  },
];
