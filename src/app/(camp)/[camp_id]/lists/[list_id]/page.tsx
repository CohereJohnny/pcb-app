'use client';

import { useParams, notFound } from 'next/navigation';
import Link from 'next/link';
import { useMemo } from 'react'; // Import useMemo again
import { useListStore } from '@/store/listStore';
// import { shallow } from 'zustand/shallow'; // Remove shallow
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ArrowLeft } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { ListItemList } from '@/components/features/lists/ListItemList'; // Import ListItemList
import { AddItemForm } from '@/components/features/lists/AddItemForm'; // Import AddItemForm

export default function SingleListPage() {
  const params = useParams();
  const campId = params.camp_id as string;
  const listId = params.list_id as string;

  // Select all lists and items
  const { allLists, allItems } = useListStore((state) => ({
    allLists: state.lists,
    allItems: state.listItems,
  })); // No shallow needed here for object if state structure is stable

  // Find the specific list using useMemo
  const list = useMemo(() => {
    return allLists.find((l) => l.camp_id === campId && l.id === listId);
  }, [allLists, campId, listId]);

  // Filter items for this list using useMemo
  const items = useMemo(() => {
    return allItems.filter((item) => item.list_id === listId);
  }, [allItems, listId]);

  if (!list) {
    notFound();
  }

  const listHref = `/${campId}/lists`;

  return (
    <div className="container mx-auto p-4">
      <Button variant="outline" size="sm" asChild className="mb-4">
        <Link href={listHref}>
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to Lists
        </Link>
      </Button>

      <Card>
        <CardHeader>
          <div className="flex items-start justify-between gap-2">
            <CardTitle className="text-2xl">{list.title}</CardTitle>
            <Badge variant="secondary">{list.type}</Badge>
          </div>
          {list.description && (
            <CardDescription>{list.description}</CardDescription>
          )}
        </CardHeader>
        <CardContent>
          {/* Remove placeholder text */}

          {/* Render List Items */}
          <ListItemList items={items} listType={list.type} />

          {/* Render Add Item Form */}
          <AddItemForm listId={listId} />
        </CardContent>
      </Card>
    </div>
  );
}
