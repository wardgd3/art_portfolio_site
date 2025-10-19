'use client';

import { useState } from 'react';
import { Database } from '@/lib/supabase/types';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Lightbox } from '@/components/lightbox';
import { InquiryDrawer } from '@/components/inquiry-drawer';
import { EditionSelector } from '@/components/edition-selector';
import { ZoomIn, MessageSquare } from 'lucide-react';

type Artwork = Database['public']['Tables']['artworks']['Row'];
type Edition = Database['public']['Tables']['editions']['Row'];

interface ArtworkDetailProps {
  artwork: Artwork;
  editions: Edition[];
}

export function ArtworkDetail({ artwork, editions }: ArtworkDetailProps) {
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [inquiryOpen, setInquiryOpen] = useState(false);
  const [selectedEdition, setSelectedEdition] = useState<Edition | null>(
    editions.length > 0 ? editions[0] : null
  );

  const images = artwork.cover_image_url
    ? [artwork.cover_image_url, ...artwork.images]
    : artwork.images;

  const statusColor = {
    available: 'bg-green-500/10 text-green-700 dark:text-green-400',
    sold: 'bg-red-500/10 text-red-700 dark:text-red-400',
    reserved: 'bg-yellow-500/10 text-yellow-700 dark:text-yellow-400',
  };

  return (
    <div className="grid gap-8 lg:grid-cols-2 lg:gap-12">
      <div className="space-y-4">
        <div className="relative aspect-[3/4] overflow-hidden rounded-lg border bg-muted">
          {artwork.cover_image_url ? (
            <>
              <img
                src={artwork.cover_image_url}
                alt={artwork.title}
                className="h-full w-full object-cover"
              />
              <Button
                size="icon"
                variant="secondary"
                className="absolute right-4 top-4"
                onClick={() => setLightboxOpen(true)}
              >
                <ZoomIn className="h-4 w-4" />
              </Button>
            </>
          ) : (
            <div className="flex h-full items-center justify-center">
              <p className="text-muted-foreground">No image available</p>
            </div>
          )}
        </div>

        {artwork.images.length > 0 && (
          <div className="grid grid-cols-4 gap-2">
            {artwork.images.slice(0, 4).map((image, index) => (
              <button
                key={index}
                className="aspect-square overflow-hidden rounded-md border bg-muted hover:opacity-80 transition-opacity"
                onClick={() => setLightboxOpen(true)}
              >
                <img
                  src={image}
                  alt={`${artwork.title} view ${index + 2}`}
                  className="h-full w-full object-cover"
                />
              </button>
            ))}
          </div>
        )}
      </div>

      <div className="space-y-6">
        <div className="space-y-4">
          <div className="space-y-2">
            <h1 className="text-4xl font-bold tracking-tight md:text-5xl">
              {artwork.title}
            </h1>
            {artwork.year && (
              <p className="text-xl text-muted-foreground">{artwork.year}</p>
            )}
          </div>

          <div className="flex flex-wrap gap-2">
            <Badge variant="secondary" className={statusColor[artwork.status]}>
              {artwork.status}
            </Badge>
            <Badge variant="outline" className="capitalize">
              {artwork.type}
            </Badge>
            {artwork.framed && <Badge variant="outline">Framed</Badge>}
          </div>
        </div>

        <div className="space-y-4 rounded-lg border p-6">
          <h2 className="text-lg font-semibold">Details</h2>
          <dl className="space-y-2 text-sm">
            {artwork.medium && (
              <div className="flex justify-between">
                <dt className="text-muted-foreground">Medium</dt>
                <dd className="font-medium">{artwork.medium}</dd>
              </div>
            )}
            {artwork.width_in && artwork.height_in && (
              <div className="flex justify-between">
                <dt className="text-muted-foreground">Size</dt>
                <dd className="font-medium">
                  {artwork.width_in}" × {artwork.height_in}" ({artwork.width_cm}{' '}
                  × {artwork.height_cm} cm)
                </dd>
              </div>
            )}
            {artwork.orientation && (
              <div className="flex justify-between">
                <dt className="text-muted-foreground">Orientation</dt>
                <dd className="font-medium capitalize">{artwork.orientation}</dd>
              </div>
            )}
          </dl>
        </div>

        {artwork.description && (
          <div className="space-y-2">
            <h2 className="text-lg font-semibold">About This Work</h2>
            <p className="text-muted-foreground leading-relaxed">
              {artwork.description}
            </p>
          </div>
        )}

        {artwork.type === 'print' && editions.length > 0 && (
          <EditionSelector
            editions={editions}
            selectedEdition={selectedEdition}
            onSelect={setSelectedEdition}
          />
        )}

        {artwork.status === 'available' && (
          <div className="space-y-4">
            {artwork.price_cents && (
              <div className="text-3xl font-bold">
                ${(artwork.price_cents / 100).toLocaleString()}
              </div>
            )}
            <Button
              size="lg"
              className="w-full"
              onClick={() => setInquiryOpen(true)}
            >
              <MessageSquare className="mr-2 h-4 w-4" />
              Inquire / Purchase
            </Button>
          </div>
        )}

        {artwork.tags.length > 0 && (
          <div className="space-y-2">
            <h3 className="text-sm font-semibold">Tags</h3>
            <div className="flex flex-wrap gap-2">
              {artwork.tags.map((tag) => (
                <Badge key={tag} variant="secondary">
                  {tag}
                </Badge>
              ))}
            </div>
          </div>
        )}
      </div>

      {lightboxOpen && (
        <Lightbox
          images={images}
          initialIndex={0}
          onClose={() => setLightboxOpen(false)}
        />
      )}

      {inquiryOpen && (
        <InquiryDrawer
          artwork={artwork}
          edition={selectedEdition}
          open={inquiryOpen}
          onOpenChange={setInquiryOpen}
        />
      )}
    </div>
  );
}
