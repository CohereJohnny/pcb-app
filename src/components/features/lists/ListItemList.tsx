import { ListItem } from '@/types/dataModel';
import { ListItemDisplay } from './ListItemDisplay';

interface ListItemListProps {
  items: ListItem[];
  listType: string; // Needed by ListItemDisplay
}

export function ListItemList({ items, listType }: ListItemListProps) {
  if (!items || items.length === 0) {
    return (
      <p className="text-muted-foreground py-4 text-sm">
        No items in this list yet.
      </p>
    );
  }

  // Sort items perhaps? e.g., incomplete first? Maybe later.

  return (
    <div className="mt-4">
      {items.map((item) => (
        <ListItemDisplay key={item.id} item={item} listType={listType} />
      ))}
    </div>
  );
}
