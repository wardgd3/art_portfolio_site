'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { supabase } from '@/lib/supabase/client';
import { Database } from '@/lib/supabase/types';
import { ArtworkCard } from '@/components/artwork-card';
import { Skeleton } from '@/components/ui/skeleton';

type Artwork = Database['public']['Tables']['artworks']['Row'];

export function FeaturedGrid() {
  const [artworks, setArtworks] = useState<Artwork[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchFeaturedArtworks() {
      const { data, error } = await supabase
        .from('artworks')
        .select('*')
        .eq('published', true)
        .order('created_at', { ascending: false })
        .limit(6);

      if (!error && data) {
        setArtworks(data);
      }
      setLoading(false);
    }

    fetchFeaturedArtworks();
  }, []);

  if (loading) {
    return (
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {[...Array(6)].map((_, i) => (
          <div key={i} className="space-y-3">
            <Skeleton className="aspect-[3/4] w-full" />
            <Skeleton className="h-4 w-3/4" />
            <Skeleton className="h-3 w-1/2" />
          </div>
        ))}
      </div>
    );
  }

  if (artworks.length === 0) {
    return (
      <div className="flex min-h-[400px] items-center justify-center rounded-lg border-2 border-dashed">
        <div className="text-center">
          <p className="text-lg text-muted-foreground">
            No artworks available yet
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
      {artworks.map((artwork) => (
        <Link key={artwork.id} href={`/art/${artwork.slug}`}>
          <ArtworkCard artwork={artwork} />
        </Link>
      ))}
    </div>
  );
}
