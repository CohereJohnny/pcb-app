'use client';

import { useMemo } from 'react';
import Link from 'next/link';
import { useListStore } from '@/store/listStore';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Checkbox } from '@/components/ui/checkbox'; // To show completion status
import { TASK_STATUS } from '@/lib/constants/taskStatus';
import { List } from '@/types/dataModel'; // Import List type

// Mock current user ID - Replace with actual authentication logic later
const MOCK_CURRENT_USER_ID = 'user-001'; // Alice Ashes

export function AssignedTasksWidget() {
  // Select individual state pieces directly
  const allItems = useListStore((state) => state.listItems);
  const allLists = useListStore((state) => state.lists);

  // Memoize the list lookup map
  const listMap = useMemo(() => {
    return new Map(allLists.map((list: List) => [list.id, list]));
  }, [allLists]);

  // Find the parent list for a given item ID using the memoized map
  const getListById = (listId: string) => listMap.get(listId);

  // Filter assigned, incomplete tasks using useMemo
  const assignedTasks = useMemo(() => {
    return allItems.filter(
      (item) =>
        item.assignee_user_id === MOCK_CURRENT_USER_ID &&
        !item.is_complete &&
        item.status !== TASK_STATUS.DONE
    );
  }, [allItems]); // Dependency is only allItems now

  return (
    <Card>
      <CardHeader>
        <CardTitle>My Assigned Tasks</CardTitle>
      </CardHeader>
      <CardContent>
        {assignedTasks.length === 0 ? (
          <p className="text-muted-foreground text-sm">
            No incomplete tasks assigned to you.
          </p>
        ) : (
          <ul className="space-y-2">
            {assignedTasks.map((task) => {
              const parentList = getListById(task.list_id);
              const listHref = parentList
                ? `/mock-camp-123/lists/${parentList.id}`
                : '#'; // Link to list
              return (
                <li key={task.id} className="flex items-center gap-2 text-sm">
                  <Checkbox
                    checked={task.is_complete}
                    disabled
                    className="size-4"
                  />
                  <Link
                    href={listHref}
                    className="flex-1 truncate hover:underline"
                  >
                    {task.content}
                  </Link>
                  {parentList && (
                    <Badge variant="outline" className="text-xs">
                      {parentList.title}
                    </Badge>
                  )}
                  {task.status && task.status !== TASK_STATUS.DONE && (
                    <Badge variant="secondary" className="text-xs">
                      {task.status}
                    </Badge>
                  )}
                </li>
              );
            })}
          </ul>
        )}
      </CardContent>
    </Card>
  );
}
