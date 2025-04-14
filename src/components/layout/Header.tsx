'use client';
import React from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import {
  Avatar,
  AvatarFallback /*, AvatarImage*/,
} from '@/components/ui/avatar';
import { useUser } from '@/contexts/UserContext';
import {
  DropdownMenu,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

export function Header() {
  const { user } = useUser();
  const userInitials =
    user?.name
      ?.split(' ')
      .map((n) => n[0])
      .join('') || 'U';

  return (
    <header className="border-border bg-background/95 supports-[backdrop-filter]:bg-background/60 sticky top-0 z-50 w-full border-b backdrop-blur">
      <div className="container flex h-14 items-center">
        {/* Logo/Title - potentially make font slightly lighter if needed */}
        <Link href="/" className="mr-6 flex items-center space-x-2">
          {/* <Icons.logo className="h-6 w-6" /> */}
          {/* Adjust font weight/size if needed based on spec */}
          <span className="font-semibold sm:inline-block">Theme Camp Hub</span>
        </Link>

        {/* Main Nav Placeholder */}
        <nav className="flex flex-1 items-center space-x-6">
          {/* Example Link */}
          {/* <Link href="#" className="text-sm font-medium text-muted-foreground transition-colors hover:text-foreground">Link 1</Link> */}
        </nav>

        {/* Right Side - User Menu */}
        <div className="flex items-center space-x-4">
          {/* ThemeToggle can be added later */}
          {/* User Menu Button - ensure ghost variant looks minimal */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="relative h-8 w-8 rounded-full">
                <Avatar className="border-muted h-8 w-8 border">
                  {' '}
                  {/* Add subtle border? */}
                  {/* <AvatarImage src={user?.avatarUrl} alt={user?.name} /> */}
                  <AvatarFallback>{userInitials}</AvatarFallback>
                </Avatar>
                <span className="sr-only">User Menu</span>
              </Button>
            </DropdownMenuTrigger>
          </DropdownMenu>
        </div>
      </div>
    </header>
  );
}
