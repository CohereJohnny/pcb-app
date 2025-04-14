'use client';

import React from 'react';
import {
  ColumnDef,
  flexRender,
  getCoreRowModel,
  useReactTable,
} from '@tanstack/react-table';

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Role } from '@/types/dataModel';
import { Button } from '@/components/ui/button';

// Define a combined type for the roster data passed to the table
export interface RosterMember {
  user_id: string;
  name?: string; // From User
  playa_name?: string | null; // From Profile
  role: Role; // From Membership
  arrival_date?: string | null; // From Profile.travel_itinerary
  departure_date?: string | null; // From Profile.travel_itinerary
  accommodation_type?: string | null; // From Profile.accommodation_details
}

// Placeholder action handlers
const handleEditRole = (userId: string) => {
  console.log('Edit Role action for:', userId);
  alert(`Edit Role for ${userId} (not implemented)`);
};
const handleRemoveMember = (userId: string) => {
  console.log('Remove Member action for:', userId);
  alert(`Remove Member ${userId} (not implemented)`);
};

// Define table columns
export const columns: ColumnDef<RosterMember>[] = [
  {
    accessorKey: 'playa_name',
    header: 'Playa Name',
    cell: ({ row }) =>
      row.getValue('playa_name') || (
        <span className="text-muted-foreground">N/A</span>
      ),
  },
  {
    accessorKey: 'name',
    header: 'Real Name',
    cell: ({ row }) =>
      row.getValue('name') || (
        <span className="text-muted-foreground">N/A</span>
      ),
  },
  {
    accessorKey: 'role',
    header: 'Role',
  },
  {
    accessorKey: 'arrival_date',
    header: 'Arrival',
    cell: ({ row }) =>
      row.getValue('arrival_date') || (
        <span className="text-muted-foreground">--</span>
      ),
  },
  {
    accessorKey: 'departure_date',
    header: 'Departure',
    cell: ({ row }) =>
      row.getValue('departure_date') || (
        <span className="text-muted-foreground">--</span>
      ),
  },
  {
    accessorKey: 'accommodation_type',
    header: 'Accommodation',
    cell: ({ row }) =>
      row.getValue('accommodation_type') || (
        <span className="text-muted-foreground">N/A</span>
      ),
  },
  {
    id: 'actions',
    cell: ({ row }) => {
      const member = row.original;
      // Simple buttons for now
      return (
        <div className="flex justify-end gap-1">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => handleEditRole(member.user_id)}
          >
            Edit Role
          </Button>
          <Button
            variant="ghost"
            size="sm"
            className="text-destructive hover:text-destructive"
            onClick={() => handleRemoveMember(member.user_id)}
          >
            Remove
          </Button>
        </div>
      );
    },
    header: () => <div className="text-right">Actions</div>,
    size: 100,
  },
];

interface RosterTableProps {
  data: RosterMember[];
}

export function RosterTable({ data }: RosterTableProps) {
  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
  });

  return (
    <div className="border-border rounded-md border">
      <Table>
        <TableHeader>
          {table.getHeaderGroups().map((headerGroup) => (
            <TableRow key={headerGroup.id} className="border-border">
              {headerGroup.headers.map((header) => {
                return (
                  <TableHead
                    key={header.id}
                    className="text-muted-foreground h-12 px-4 text-left align-middle font-medium"
                  >
                    {header.isPlaceholder
                      ? null
                      : flexRender(
                          header.column.columnDef.header,
                          header.getContext()
                        )}
                  </TableHead>
                );
              })}
            </TableRow>
          ))}
        </TableHeader>
        <TableBody>
          {table.getRowModel().rows?.length ? (
            table.getRowModel().rows.map((row) => (
              <TableRow
                key={row.id}
                data-state={row.getIsSelected() && 'selected'}
                className="border-border hover:bg-muted/50 data-[state=selected]:bg-muted transition-colors"
              >
                {row.getVisibleCells().map((cell) => (
                  <TableCell key={cell.id} className="p-4 align-middle">
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </TableCell>
                ))}
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell colSpan={columns.length} className="h-24 text-center">
                No members found.
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </div>
  );
}
