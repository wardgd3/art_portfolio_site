'use client';

import { Database } from '@/lib/supabase/types';
import { Badge } from '@/components/ui/badge';
import { motion } from 'framer-motion';

type Artwork = Database['public']['Tables']['artworks']['Row'];

interface ArtworkCardProps {
  artwork: Artwork;
}

export function ArtworkCard({ artwork }: ArtworkCardProps) {
  const statusColor = {
    available: 'bg-green-500/10 text-green-700 dark:text-green-400',
    sold: 'bg-red-500/10 text-red-700 dark:text-red-400',
    reserved: 'bg-yellow-500/10 text-yellow-700 dark:text-yellow-400',
  };

  return (
    <motion.div
      whileHover={{ y: -4 }}
      transition={{ duration: 0.2 }}
      className="group cursor-pointer"
    >
      <div className="relative aspect-[3/4] overflow-hidden rounded-lg border bg-muted">
        {artwork.cover_image_url ? (
          <img
            src={artwork.cover_image_url}
            alt={artwork.title}
            className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
          />
        ) : (
          <div className="flex h-full items-center justify-center bg-muted">
            <p className="text-sm text-muted-foreground">No image</p>
          </div>
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-background/80 via-background/0 to-background/0 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
          <div className="absolute bottom-0 left-0 right-0 p-4 text-foreground">
            <p className="text-sm font-medium">{artwork.medium}</p>
            {artwork.width_in && artwork.height_in && (
              <p className="text-xs text-muted-foreground">
                {artwork.width_in}" × {artwork.height_in}"
              </p>
            )}
          </div>
        </div>
      </div>

      <div className="mt-3 space-y-1">
        <div className="flex items-start justify-between gap-2">
          <h3 className="font-serif text-lg font-semibold leading-tight group-hover:text-accent transition-colors">
            {artwork.title}
          </h3>
          <Badge
            variant="secondary"
            className={statusColor[artwork.status]}
          >
            {artwork.status}
          </Badge>
        </div>
        <div className="flex items-center gap-2 text-sm text-muted-foreground">
          {artwork.year && <span>{artwork.year}</span>}
          {artwork.type && (
            <>
              <span>•</span>
              <span className="capitalize">{artwork.type}</span>
            </>
          )}
        </div>
        {artwork.price_cents && artwork.status === 'available' && (
          <p className="text-sm font-medium">
            ${(artwork.price_cents / 100).toLocaleString()}
          </p>
        )}
      </div>
    </motion.div>
  );
}
