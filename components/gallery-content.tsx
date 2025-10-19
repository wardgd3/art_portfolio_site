'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useSearchParams, useRouter, usePathname } from 'next/navigation';
import { supabase } from '@/lib/supabase/client';
import { Database } from '@/lib/supabase/types';
import { ArtworkCard } from '@/components/artwork-card';
import { FilterBar } from '@/components/filter-bar';
import { Skeleton } from '@/components/ui/skeleton';

type Artwork = Database['public']['Tables']['artworks']['Row'];

export function GalleryContent() {
  const [artworks, setArtworks] = useState<Artwork[]>([]);
  const [loading, setLoading] = useState(true);
  const searchParams = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    async function fetchArtworks() {
      setLoading(true);
      let query = supabase
        .from('artworks')
        .select('*')
        .eq('published', true);

      const typeFilter = searchParams.get('type');
      const statusFilter = searchParams.get('status');
      const mediumFilter = searchParams.get('medium');
      const yearFilter = searchParams.get('year');
      const searchQuery = searchParams.get('search');

      if (typeFilter) {
        query = query.eq('type', typeFilter);
      }

      if (statusFilter) {
        query = query.eq('status', statusFilter);
      }

      if (mediumFilter) {
        query = query.eq('medium', mediumFilter);
      }

      if (yearFilter) {
        query = query.eq('year', parseInt(yearFilter));
      }

      if (searchQuery) {
        query = query.ilike('title', `%${searchQuery}%`);
      }

      query = query.order('created_at', { ascending: false });

      const { data, error } = await query;

      if (!error && data) {
        setArtworks(data);
      }
      setLoading(false);
    }

    fetchArtworks();
  }, [searchParams]);

  if (loading) {
    return (
      <div className="space-y-6">
        <div className="flex gap-2">
          {[...Array(5)].map((_, i) => (
            <Skeleton key={i} className="h-10 w-24" />
          ))}
        </div>
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {[...Array(9)].map((_, i) => (
            <div key={i} className="space-y-3">
              <Skeleton className="aspect-[3/4] w-full" />
              <Skeleton className="h-4 w-3/4" />
              <Skeleton className="h-3 w-1/2" />
            </div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <FilterBar />

      {artworks.length === 0 ? (
        <div className="flex min-h-[400px] items-center justify-center rounded-lg border-2 border-dashed">
          <div className="text-center">
            <p className="text-lg text-muted-foreground">
              No artworks match your filters
            </p>
          </div>
        </div>
      ) : (
        <>
          <div className="text-sm text-muted-foreground">
            {artworks.length} {artworks.length === 1 ? 'work' : 'works'} found
          </div>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {artworks.map((artwork) => (
              <Link key={artwork.id} href={`/art/${artwork.slug}`}>
                <ArtworkCard artwork={artwork} />
              </Link>
            ))}
          </div>
        </>
      )}
    </div>
  );
}
