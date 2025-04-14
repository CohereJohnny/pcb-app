import { List, ListItem } from '@/types/dataModel';
import { LIST_TYPES } from '@/lib/constants/listTypes';
import { getPastDate } from './announcements'; // Re-use date helper if needed

const MOCK_CAMP_ID = 'mock-camp-123';
const MOCK_USER_ID_1 = 'user-001'; // Alice Ashes
const MOCK_USER_ID_2 = 'user-002'; // Bob Burnside

export const mockLists: List[] = [
  {
    id: 'list-001',
    camp_id: MOCK_CAMP_ID,
    created_by_user_id: MOCK_USER_ID_1,
    title: 'Build Week Shopping List',
    description: 'Essential supplies for the main structure build.',
    type: LIST_TYPES.SHOPPING,
    created_at: getPastDate(7),
    updated_at: getPastDate(2),
  },
  {
    id: 'list-002',
    camp_id: MOCK_CAMP_ID,
    created_by_user_id: MOCK_USER_ID_2,
    title: 'Pre-Playa Tasks',
    description: 'Things to do before heading to the desert.',
    type: LIST_TYPES.TASK,
    created_at: getPastDate(10),
    updated_at: getPastDate(1),
  },
  {
    id: 'list-003',
    camp_id: MOCK_CAMP_ID,
    created_by_user_id: MOCK_USER_ID_1,
    title: 'Kitchen Inventory',
    description: 'Tracking shared kitchen items.',
    type: LIST_TYPES.GENERAL,
    created_at: getPastDate(5),
    updated_at: getPastDate(5),
  },
];

export const mockListItems: ListItem[] = [
  // Items for list-001 (Shopping)
  {
    id: 'item-001',
    list_id: 'list-001',
    content: '2x4 Lumber (x50)',
    is_complete: false,
    created_at: getPastDate(7),
    updated_at: getPastDate(7),
  },
  {
    id: 'item-002',
    list_id: 'list-001',
    content: 'Lag Bolts (1/2" x 10", Box of 100)',
    is_complete: true,
    created_at: getPastDate(7),
    updated_at: getPastDate(3),
  },
  {
    id: 'item-003',
    list_id: 'list-001',
    content: 'Rebar (10 ft lengths, x20)',
    is_complete: false,
    created_at: getPastDate(5),
    updated_at: getPastDate(5),
  },
  // Items for list-002 (Tasks)
  {
    id: 'item-004',
    list_id: 'list-002',
    content: 'Finalize transport plan',
    is_complete: false,
    created_at: getPastDate(10),
    updated_at: getPastDate(2),
    assignee_user_id: MOCK_USER_ID_2, // Bob assigned
    due_date: getPastDate(-5), // Due in 5 days
    status: 'IN_PROGRESS',
  },
  {
    id: 'item-005',
    list_id: 'list-002',
    content: 'Pack personal gear',
    is_complete: false,
    created_at: getPastDate(10),
    updated_at: getPastDate(10),
    assignee_user_id: null, // Unassigned
    due_date: getPastDate(-2), // Due in 2 days
    status: 'TODO',
  },
  {
    id: 'item-007', // Added new task item
    list_id: 'list-002',
    content: 'Buy snacks for the road',
    is_complete: true,
    created_at: getPastDate(4),
    updated_at: getPastDate(1),
    assignee_user_id: MOCK_USER_ID_1, // Alice assigned
    due_date: getPastDate(3), // Was due 3 days ago
    status: 'DONE', // Marked as done
  },
  // Items for list-003 (General)
  {
    id: 'item-006',
    list_id: 'list-003',
    content: 'Propane Tank #1',
    is_complete: false, // 'is_complete' might represent 'present' here
    created_at: getPastDate(5),
    updated_at: getPastDate(5),
  },
];
