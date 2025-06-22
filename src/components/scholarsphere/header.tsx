"use client";

import Link from 'next/link';
import { BookOpen, GraduationCap } from 'lucide-react';
import { ThemeToggle } from '@/components/theme-toggle';
import { Button } from '@/components/ui/button';

const navLinks = [
  { href: '#home', label: 'Home' },
  { href: '#resources', label: 'Resources' },
  { href: '#syllabus', label: 'Syllabus' },
  { href: '#contact', label: 'Contact' },
  // { href: '/admin', label: 'Admin' },
];

export function Header() {
  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center">
        <div className="mr-4 flex items-center">
          <Link href="/" className="flex items-center gap-2">
            <GraduationCap className="h-6 w-6 text-primary" />
            <span className="font-bold text-lg font-headline">ScholarSphere</span>
          </Link>
        </div>
        <nav className="hidden flex-1 items-center space-x-4 text-sm font-medium sm:flex">
          {navLinks.map(({ href, label }) => (
            <Link
              key={label}
              href={href}
              className="text-muted-foreground transition-colors hover:text-foreground"
            >
              {label}
            </Link>
          ))}
        </nav>
        <div className="flex flex-1 items-center justify-end space-x-2">
           <Button variant="ghost" className="text-muted-foreground transition-colors hover:text-foreground">About</Button>
           <Button variant="outline">Admin</Button>
          <ThemeToggle />
        </div>
      </div>
    </header>
  );
}
