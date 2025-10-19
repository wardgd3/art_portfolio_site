'use client';

import { useSearchParams, useRouter, usePathname } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { X, Search } from 'lucide-react';
import { useState } from 'react';

const filters = {
  type: [
    { label: 'Originals', value: 'original' },
    { label: 'Prints', value: 'print' },
  ],
  status: [
    { label: 'Available', value: 'available' },
    { label: 'Sold', value: 'sold' },
    { label: 'Reserved', value: 'reserved' },
  ],
  medium: [
    { label: 'Oil', value: 'Oil' },
    { label: 'Gouache', value: 'Gouache' },
    { label: 'Charcoal', value: 'Charcoal' },
    { label: 'Watercolor', value: 'Watercolor' },
  ],
};

export function FilterBar() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();
  const [searchQuery, setSearchQuery] = useState(
    searchParams.get('search') || ''
  );

  const updateFilter = (key: string, value: string) => {
    const params = new URLSearchParams(searchParams.toString());
    if (params.get(key) === value) {
      params.delete(key);
    } else {
      params.set(key, value);
    }
    router.push(`${pathname}?${params.toString()}`);
  };

  const clearFilters = () => {
    setSearchQuery('');
    router.push(pathname);
  };

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    const params = new URLSearchParams(searchParams.toString());
    if (searchQuery) {
      params.set('search', searchQuery);
    } else {
      params.delete('search');
    }
    router.push(`${pathname}?${params.toString()}`);
  };

  const hasActiveFilters =
    searchParams.toString().length > 0 || searchQuery.length > 0;

  return (
    <div className="space-y-4">
      <form onSubmit={handleSearch} className="flex gap-2">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            type="search"
            placeholder="Search artworks..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-9"
          />
        </div>
        <Button type="submit">Search</Button>
      </form>

      <div className="flex flex-wrap items-center gap-2">
        <span className="text-sm font-medium text-muted-foreground">
          Filters:
        </span>

        {Object.entries(filters).map(([key, options]) => (
          <div key={key} className="flex flex-wrap gap-2">
            {options.map((option) => {
              const isActive = searchParams.get(key) === option.value;
              return (
                <Button
                  key={option.value}
                  variant={isActive ? 'default' : 'outline'}
                  size="sm"
                  onClick={() => updateFilter(key, option.value)}
                >
                  {option.label}
                  {isActive && <X className="ml-1 h-3 w-3" />}
                </Button>
              );
            })}
          </div>
        ))}

        {hasActiveFilters && (
          <Button variant="ghost" size="sm" onClick={clearFilters}>
            Clear All
          </Button>
        )}
      </div>

      {searchParams.toString().length > 0 && (
        <div className="flex flex-wrap gap-2">
          {Array.from(searchParams.entries()).map(([key, value]) => (
            <Badge key={`${key}-${value}`} variant="secondary">
              {key}: {value}
              <button
                onClick={() => {
                  const params = new URLSearchParams(searchParams.toString());
                  params.delete(key);
                  router.push(`${pathname}?${params.toString()}`);
                }}
                className="ml-1"
              >
                <X className="h-3 w-3" />
              </button>
            </Badge>
          ))}
        </div>
      )}
    </div>
  );
}
