'use client';

import { ListItem } from '@/types/dataModel';
import { useListStore } from '@/store/listStore';
import { Checkbox } from '@/components/ui/checkbox';
import { Badge } from '@/components/ui/badge';
import { format } from 'date-fns'; // For formatting dates
import { getMockAuthorName } from '@/lib/mockData/announcements'; // Reuse author lookup
import { cn } from '@/lib/utils';
import { TASK_STATUS } from '@/lib/constants/taskStatus';
import { LIST_TYPES } from '@/lib/constants/listTypes';

interface ListItemDisplayProps {
  item: ListItem;
  listType: string; // Pass the type of the parent list
  // Add props for inline editing later if implemented
}

export function ListItemDisplay({ item, listType }: ListItemDisplayProps) {
  const toggleItemComplete = useListStore((state) => state.toggleItemComplete);
  // Add updateListItem later for inline editing

  const handleCheckboxChange = () => {
    toggleItemComplete(item.id);
  };

  const assigneeName = item.assignee_user_id
    ? getMockAuthorName(item.assignee_user_id) || 'Unknown User'
    : 'Unassigned';

  const formattedDueDate = item.due_date
    ? format(new Date(item.due_date), 'MMM d')
    : null;

  const isTask = listType === LIST_TYPES.TASK;

  return (
    <div className="border-border flex items-start gap-3 border-b py-2 last:border-b-0">
      <Checkbox
        id={`item-${item.id}`}
        checked={item.is_complete}
        onCheckedChange={handleCheckboxChange}
        className="mt-1" // Align checkbox better with text
      />
      <div className="grid flex-1 gap-1">
        <label
          htmlFor={`item-${item.id}`}
          className={cn(
            'text-sm leading-none font-medium',
            item.is_complete && 'text-muted-foreground line-through'
          )}
        >
          {item.content}
        </label>
        {/* Task-specific details */}
        {isTask && (
          <div className="text-muted-foreground flex items-center gap-2 text-xs">
            {item.status && (
              <Badge
                variant={
                  item.status === TASK_STATUS.DONE ? 'secondary' : 'outline'
                }
                className="text-xs"
              >
                {item.status}
              </Badge>
            )}
            <span>{assigneeName}</span>
            {formattedDueDate && <span>Due: {formattedDueDate}</span>}
          </div>
        )}
      </div>
      {/* Add Edit/Delete buttons later */}
    </div>
  );
}
