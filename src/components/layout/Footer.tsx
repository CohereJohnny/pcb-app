import React from 'react';

export function Footer() {
  return (
    <footer className="border-t py-6 md:px-8 md:py-0">
      <div className="container flex flex-col items-center justify-center gap-4 md:h-16 md:flex-row">
        <p className="text-muted-foreground text-center text-sm leading-loose md:text-left">
          Built for Burners. &copy; {new Date().getFullYear()}
        </p>
      </div>
    </footer>
  );
}
