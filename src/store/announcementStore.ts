import { create } from 'zustand';
import { Announcement } from '@/types/dataModel';

interface AnnouncementStore {
  announcements: Announcement[];
  addAnnouncement: (
    announcement: Pick<
      Announcement,
      'title' | 'content' | 'author_user_id' | 'camp_id'
    >
  ) => void;
}

export const useAnnouncementStore = create<AnnouncementStore>((set) => ({
  announcements: [],
  addAnnouncement: (announcement) => {
    const now = new Date().toISOString();
    const newAnnouncement: Announcement = {
      ...announcement,
      id: Math.random().toString(36).substr(2, 9),
      created_at: now,
      updated_at: now,
    };
    set((state) => ({
      announcements: [...state.announcements, newAnnouncement],
    }));
  },
}));
