import Link from 'next/link';
import { List } from '@/types/dataModel';
import { useListStore } from '@/store/listStore'; // To get item count
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Badge } from '@/components/ui/badge'; // Use Shadcn Badge

interface ListCardProps {
  list: List;
  campId: string;
}

const MAX_DESC_LENGTH = 100;

export function ListCard({ list, campId }: ListCardProps) {
  // Get item count for this specific list from the store
  const itemCount = useListStore(
    (state) => state.listItems.filter((item) => item.list_id === list.id).length
  );

  const descriptionSnippet = list.description
    ? list.description.length > MAX_DESC_LENGTH
      ? `${list.description.substring(0, MAX_DESC_LENGTH)}...`
      : list.description
    : 'No description';

  const href = `/${campId}/lists/${list.id}`;

  return (
    <Link
      href={href}
      className="hover:bg-muted/50 block rounded-lg transition-colors"
    >
      <Card className="h-full border-0 bg-transparent shadow-none">
        {' '}
        {/* Minimal styling */}
        <CardHeader>
          <div className="flex items-start justify-between gap-2">
            <CardTitle>{list.title}</CardTitle>
            {/* Use a simple Tag or Badge for the type */}
            <Badge variant="outline">{list.type}</Badge> {/* Use Badge */}
          </div>
          <CardDescription>
            {itemCount} item{itemCount !== 1 ? 's' : ''}
          </CardDescription>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground text-sm">{descriptionSnippet}</p>
        </CardContent>
      </Card>
    </Link>
  );
}
