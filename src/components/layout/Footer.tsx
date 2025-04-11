import React from 'react';

export function Footer() {
  return (
    <footer className="border-t border-border bg-background py-6 md:px-8 md:py-0">
      <div className="container flex flex-col items-center justify-center gap-4 md:h-24 md:flex-row">
        <p className="text-center text-sm leading-loose text-muted-foreground md:text-left">
          Built for Burners. &copy; {new Date().getFullYear()}
        </p>
      </div>
    </footer>
  );
}
