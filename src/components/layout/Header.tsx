'use client';
import React from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import {
  Avatar,
  AvatarFallback /*, AvatarImage*/,
} from '@/components/ui/avatar';
import { useUser } from '@/contexts/UserContext';

export function Header() {
  const { user } = useUser();
  const userInitials =
    user?.name
      ?.split(' ')
      .map((n) => n[0])
      .join('') || 'U';

  return (
    <header className="border-border/40 bg-background/95 supports-[backdrop-filter]:bg-background/60 sticky top-0 z-50 w-full border-b backdrop-blur">
      <div className="container flex h-14 max-w-screen-2xl items-center">
        {/* Logo/Title Placeholder */}
        <Link href="/" className="mr-6 flex items-center space-x-2">
          {/* <Icons.logo className="h-6 w-6" /> */}
          <span className="font-bold sm:inline-block">Theme Camp Hub</span>
        </Link>

        {/* Main Nav Placeholder (Could be here or in Sidebar) */}
        <nav className="flex flex-1 items-center space-x-4">
          {/* Links can go here if using top nav */}
        </nav>

        {/* Right Side - User Menu Placeholder */}
        <div className="flex items-center space-x-4">
          {/* <ThemeToggle /> */}
          {/* User Menu Button with Avatar */}
          <Button variant="ghost" className="relative h-8 w-8 rounded-full">
            <Avatar className="h-8 w-8">
              {/* Add actual image source later if available */}
              {/* <AvatarImage src={user?.avatarUrl} alt={user?.name} /> */}
              <AvatarFallback>{userInitials}</AvatarFallback>
            </Avatar>
            <span className="sr-only">User Menu</span>
          </Button>
        </div>
      </div>
    </header>
  );
}
