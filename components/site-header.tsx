'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Search, Menu } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { ThemeToggle } from '@/components/theme-toggle';
import { cn } from '@/lib/utils';
import { useState, useEffect } from 'react';

const navigation = [
  { name: 'Gallery', href: '/gallery' },
  { name: 'Originals', href: '/originals' },
  { name: 'Prints', href: '/prints' },
  { name: 'About', href: '/about' },
  { name: 'Contact', href: '/contact' },
];

export function SiteHeader() {
  const pathname = usePathname();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header
      className={cn(
        'sticky top-0 z-50 w-full border-b transition-all duration-300',
        isScrolled
          ? 'bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60'
          : 'bg-background/0 border-transparent'
      )}
    >
      <div className="container flex h-16 items-center justify-between px-4 md:px-6">
        <Link
          href="/"
          className="flex items-center space-x-2 font-serif text-xl font-semibold tracking-tight"
        >
          <span>Grant Ward</span>
        </Link>

        <nav className="hidden items-center gap-6 md:flex">
          {navigation.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                'text-sm font-medium transition-colors hover:text-accent',
                pathname === item.href
                  ? 'text-foreground'
                  : 'text-muted-foreground'
              )}
            >
              {item.name}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <Button
            variant="ghost"
            size="icon"
            className="hidden md:flex"
            aria-label="Search"
          >
            <Search className="h-5 w-5" />
          </Button>
          <ThemeToggle />
          <Button
            variant="ghost"
            size="icon"
            className="md:hidden"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            aria-label="Toggle menu"
          >
            <Menu className="h-5 w-5" />
          </Button>
        </div>
      </div>

      {isMobileMenuOpen && (
        <div className="border-t md:hidden">
          <nav className="container flex flex-col gap-4 px-4 py-4">
            {navigation.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  'text-sm font-medium transition-colors hover:text-accent',
                  pathname === item.href
                    ? 'text-foreground'
                    : 'text-muted-foreground'
                )}
                onClick={() => setIsMobileMenuOpen(false)}
              >
                {item.name}
              </Link>
            ))}
          </nav>
        </div>
      )}
    </header>
  );
}
