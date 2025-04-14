import { create } from 'zustand';
import { List, ListItem } from '@/types/dataModel';
import { mockLists, mockListItems } from '@/lib/mockData/lists';

// Define the state shape
interface ListState {
  lists: List[];
  listItems: ListItem[];
}

// Define the actions
interface ListActions {
  setLists: (lists: List[]) => void;
  addList: (list: List) => void;
  setListItems: (listItems: ListItem[]) => void;
  addListItem: (listItem: ListItem) => void;
  // Add update/delete actions later if needed
  updateListItem: (
    itemId: string,
    updates: Partial<Omit<ListItem, 'id'>>
  ) => void;
  toggleItemComplete: (itemId: string) => void;
  // updateItemStatus: (itemId: string, status: string) => void; // Covered by updateListItem
}

// Create the store
export const useListStore = create<ListState & ListActions>((set) => ({
  // Initial state from mock data
  lists: mockLists,
  listItems: mockListItems,

  // Actions implementations
  setLists: (lists) => set({ lists }),
  addList: (list) => set((state) => ({ lists: [...state.lists, list] })),
  setListItems: (listItems) => set({ listItems }),
  addListItem: (listItem) =>
    set((state) => ({ listItems: [...state.listItems, listItem] })),
  updateListItem: (itemId, updates) =>
    set((state) => ({
      listItems: state.listItems.map((item) =>
        item.id === itemId
          ? { ...item, ...updates, updated_at: new Date().toISOString() }
          : item
      ),
    })),
  toggleItemComplete: (itemId) =>
    set((state) => ({
      listItems: state.listItems.map((item) =>
        item.id === itemId
          ? {
              ...item,
              is_complete: !item.is_complete,
              updated_at: new Date().toISOString(),
            }
          : item
      ),
    })),
  // updateItemStatus: (itemId, status) => // Replaced by updateListItem
  //     set((state) => ({
  //         listItems: state.listItems.map((item) =>
  //             item.id === itemId ? { ...item, status: status, updated_at: new Date().toISOString() } : item
  //         ),
  //     })),
}));
