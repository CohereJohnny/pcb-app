'use client';

import { useParams } from 'next/navigation';
import { useMemo } from 'react';
import { useListStore } from '@/store/listStore';
import { ListOverview } from '@/components/features/lists/ListOverview';
import { Button } from '@/components/ui/button';
import Link from 'next/link';

export default function ListsOverviewPage() {
  const params = useParams();
  const campId = params.camp_id as string;

  // Select the entire lists array from the store
  const allLists = useListStore((state) => state.lists);

  // Compute the filtered lists using useMemo
  const lists = useMemo(() => {
    return allLists.filter((list) => list.camp_id === campId);
  }, [allLists, campId]); // Dependencies: allLists array and campId

  const newListHref = `/${campId}/lists/new`;

  return (
    <div className="container mx-auto p-4">
      <div className="mb-6 flex items-center justify-between">
        <h1 className="text-2xl font-semibold">Lists</h1>
        <Button asChild>
          <Link href={newListHref}>New List</Link>
        </Button>
      </div>
      <ListOverview lists={lists} campId={campId} />
    </div>
  );
}
