// Based on specs/datamodel.md (MVP subset)

// Represents an authenticated user identity (simplified for MVP context)
export interface User {
  id: string;
  email?: string;
  // Add other relevant fields if needed for context, e.g., name
  name?: string;
}

// Defines user roles within the application/camp
export type Role = 'ORGANIZER' | 'LEAD' | 'MEMBER';

// Links a User to a Camp with a specific Role (Simplified for mock context)
export interface Membership {
  user_id: string;
  camp_id: string;
  role: Role;
}

// Represents a Tenant (a specific Theme Camp - Simplified)
export interface Camp {
  id: string;
  name: string;
}

// Nested type for travel information within Profile
export interface TravelItinerary {
  arrival_date?: Date | string | null;
  arrival_time?: string | null;
  departure_date?: Date | string | null;
  departure_time?: string | null;
  mode_of_transport?: string | null;
  origin?: string | null;
  vehicle_pass_status?: 'HAVE' | 'NEED' | 'NA' | null;
  ride_status?: 'NEED' | 'OFFERING' | 'HAVE' | null;
  notes?: string | null;
}

// Nested type for accommodation information within Profile
export interface AccommodationDetails {
  type?: string | null;
  size_details?: string | null;
  power_needs?: boolean | null;
  power_amps?: number | null;
  sharing_with?: string | null;
}

// Holds application-specific user details (extends base User)
export interface Profile {
  id: string; // Usually same as User.id
  user_id: string;
  updated_at?: Date | string;
  playa_name?: string | null;
  contact_info?: string | null; // Consider making richer later
  emergency_contact?: string | null;
  travel_itinerary?: TravelItinerary | null;
  accommodation_details?: AccommodationDetails | null;
  // Add basic user name if not on User type
  name?: string; // Can duplicate from User for convenience if needed
}

// Note: Removed Announcements, Lists, ListItems for now as per Sprint 2 focus
