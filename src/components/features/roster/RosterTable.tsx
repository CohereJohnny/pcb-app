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
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { MoreHorizontal } from "lucide-react";

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

      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="h-8 w-8 p-0">
              <span className="sr-only">Open menu</span>
              <MoreHorizontal className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel>Actions</DropdownMenuLabel>
            <DropdownMenuItem
              onClick={() => {
                // Placeholder action
                alert(`Edit Role for ${member.user_id} (not implemented).`);
              }}
            >
              Edit Role
            </DropdownMenuItem>
            <DropdownMenuItem
              className="text-destructive focus:text-destructive focus:bg-destructive/10"
              onClick={() => {
                // Placeholder action
                alert(`Remove Member ${member.user_id} (not implemented).`);
              }}
            >
              Remove Member
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
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
