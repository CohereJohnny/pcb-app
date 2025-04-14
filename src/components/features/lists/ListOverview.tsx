import { List } from '@/types/dataModel';
import { ListCard } from './ListCard';

interface ListOverviewProps {
  lists: List[];
  campId: string; // Required by ListCard for linking
}

export function ListOverview({ lists, campId }: ListOverviewProps) {
  if (!lists || lists.length === 0) {
    return (
      <p className="text-muted-foreground">No lists found for this camp.</p>
    );
  }

  return (
    // Use a responsive grid layout
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
      {lists.map((list) => (
        <ListCard key={list.id} list={list} campId={campId} />
      ))}
    </div>
  );
}
