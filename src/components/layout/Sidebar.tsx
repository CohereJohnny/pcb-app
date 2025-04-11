import React from 'react';
import Link from 'next/link';
import { cn } from '@/lib/utils'; // Assuming utils exists from shadcn init

// Placeholder links - replace with actual routes and potentially icons
const navItems = [
  { href: '/dashboard', label: 'Dashboard' },
  { href: '/profile', label: 'Profile' },
  { href: '/roster', label: 'Roster' },
  { href: '/announcements', label: 'Announcements' },
  { href: '/lists', label: 'Lists' },
  { href: '/settings', label: 'Settings' },
];

export function Sidebar({ className }: { className?: string }) {
  // Need to get campId context or param later for dynamic links
  const campId = 'mock-camp-123'; // Placeholder

  return (
    <aside
      className={cn('hidden border-r md:flex md:w-60 md:flex-col', className)}
    >
      <div className="flex flex-col gap-2 px-4 py-6">
        <nav className="grid items-start gap-1">
          {navItems.map((item) => (
            <Link
              key={item.label}
              href={`/${campId}${item.href}`}
              className={cn(
                'group hover:bg-accent hover:text-accent-foreground flex items-center rounded-md px-3 py-2 text-sm font-medium',
                // Add logic for active link later
                'text-muted-foreground'
              )}
            >
              {/* Add Icon placeholder later */}
              <span>{item.label}</span>
            </Link>
          ))}
        </nav>
      </div>
    </aside>
  );
}
