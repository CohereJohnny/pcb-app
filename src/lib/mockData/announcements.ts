// Mock data for the Announcements feature

import { Announcement } from '@/types/dataModel';
import { mockRosterUsers } from './roster'; // Assuming roster mock exists for author names

const MOCK_CAMP_ID = 'mock-camp-123';

// Helper function for past dates
export function getPastDate(daysAgo: number): string {
  const date = new Date();
  date.setDate(date.getDate() - daysAgo);
  return date.toISOString();
}

export const mockAnnouncements: Announcement[] = [
  {
    id: 'announce-001',
    camp_id: MOCK_CAMP_ID,
    author_user_id: 'user-001', // Alice Ashes (Organizer)
    title: 'Welcome to the Theme Camp Hub!',
    content:
      'This is the first announcement! Use this space to share important updates, schedules, and news with the camp. More features coming soon!',
    created_at: getPastDate(5),
    updated_at: getPastDate(5),
  },
  {
    id: 'announce-002',
    camp_id: MOCK_CAMP_ID,
    author_user_id: 'user-002', // Bob Burnside (Lead)
    title: 'Build Week Schedule Update',
    content:
      'Heads up builders! The schedule for build week has been updated. Please check the latest version in the shared drive. Safety meeting at 9 AM sharp on Monday!',
    created_at: getPastDate(3),
    updated_at: getPastDate(2),
  },
  {
    id: 'announce-003',
    camp_id: MOCK_CAMP_ID,
    author_user_id: 'user-001', // Alice Ashes (Organizer)
    title: 'Reminder: Camp Dues Deadline Approaching',
    content:
      'Just a friendly reminder that camp dues are due by the end of this week. Please see the finances channel for payment details. Let us know if you have any issues.',
    created_at: getPastDate(1),
    updated_at: getPastDate(1),
  },
];

// Helper to get author name from mock users - useful for display
// In real app, this join would happen via API/DB query
const userMap = new Map(mockRosterUsers.map((u) => [u.id, u.name]));

export function getMockAuthorName(userId: string): string | undefined {
  return userMap.get(userId);
}
