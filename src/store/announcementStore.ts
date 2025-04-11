import { create } from 'zustand';
import { Announcement } from '@/types/dataModel';
import { mockAnnouncements } from '@/lib/mockData/announcements';

interface AnnouncementState {
  announcements: Announcement[];
  setAnnouncements: (announcements: Announcement[]) => void;
  addAnnouncement: (announcement: Omit<Announcement, 'id' | 'created_at' | 'updated_at' | 'camp_id'> & { author_user_id: string }) => void; // Simplified input for adding
}

// Define Camp ID and get current user ID (placeholder for now)
const MOCK_CAMP_ID = 'mock-camp-123';
// In a real app, get this from auth context/session
const getCurrentUserId = () => 'user-123';

export const useAnnouncementStore = create<AnnouncementState>((set) => ({
  // Initialize with mock data
  announcements: mockAnnouncements,

  // Action to overwrite all announcements (e.g., if fetching from API later)
  setAnnouncements: (announcements) => set({ announcements }),

  // Action to add a new announcement
  addAnnouncement: (newAnnouncementData) =>
    set((state) => {
      const newId = `announce-${Date.now()}`;
      const now = new Date().toISOString();
      const currentUserId = getCurrentUserId(); // Fetch current user ID

      const announcementToAdd: Announcement = {
        id: newId,
        camp_id: MOCK_CAMP_ID,
        created_at: now,
        updated_at: now,
        author_user_id: newAnnouncementData.author_user_id || currentUserId, // Use provided author or current user
        title: newAnnouncementData.title,
        content: newAnnouncementData.content,
      };

      return {
        // Prepend new announcement to the list
        announcements: [announcementToAdd, ...state.announcements],
      };
    }),
})); 