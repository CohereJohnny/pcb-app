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

  // TODO: Add active link detection based on current pathname
  // const pathname = usePathname(); // Requires 'use client'

  return (
    <aside
      className={cn(
        'hidden border-r border-border bg-background md:flex md:w-60 md:flex-col',
        className
      )}
    >
      {/* Adjust padding for spacing */}
      <div className="flex flex-col gap-4 px-4 py-6">
        <nav className="grid items-start gap-1">
          {navItems.map((item) => {
            // const isActive = pathname?.startsWith(`/${campId}${item.href}`); // Example active check
            const isActive = false; // Placeholder
            return (
              <Link
                key={item.label}
                href={`/${campId}${item.href}`}
                className={cn(
                  'group flex items-center rounded-md px-3 py-2 text-sm font-medium transition-colors',
                  isActive
                    ? 'bg-muted text-primary' // Style for active link (e.g., muted bg, primary text)
                    : 'text-muted-foreground hover:bg-muted/50 hover:text-foreground' // Default & hover
                )}
              >
                {/* Icon Placeholder */}
                {/* <Icon className="mr-2 h-4 w-4" /> */}
                <span>{item.label}</span>
              </Link>
            );
          })}
        </nav>
      </div>
    </aside>
  );
}
