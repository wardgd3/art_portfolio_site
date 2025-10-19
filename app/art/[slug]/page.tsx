import { notFound } from 'next/navigation';
import { supabase } from '@/lib/supabase/client';
import { ArtworkDetail } from '@/components/artwork-detail';
import { Database } from '@/lib/supabase/types';
import type { Metadata } from 'next';

type Artwork = Database['public']['Tables']['artworks']['Row'];

interface ArtworkPageProps {
  params: {
    slug: string;
  };
}

async function getArtwork(slug: string): Promise<Artwork | null> {
  const { data: artwork } = await supabase
    .from('artworks')
    .select('*')
    .eq('slug', slug)
    .eq('published', true)
    .maybeSingle();

  return artwork || null;
}

async function getEditions(artworkId: string) {
  const { data: editions } = await supabase
    .from('editions')
    .select('*')
    .eq('artwork_id', artworkId);

  return editions || [];
}

export async function generateMetadata({
  params,
}: ArtworkPageProps): Promise<Metadata> {
  const artwork = await getArtwork(params.slug);

  if (!artwork) {
    return {
      title: 'Artwork Not Found',
    };
  }

  return {
    title: `${artwork.title} - Grant Ward`,
    description: artwork.description || `${artwork.title} by Grant Ward`,
    openGraph: {
      title: `${artwork.title} - Grant Ward`,
      description: artwork.description || `${artwork.title} by Grant Ward`,
      images: artwork.cover_image_url ? [artwork.cover_image_url] : [],
      type: 'website',
    },
  };
}

export default async function ArtworkPage({ params }: ArtworkPageProps) {
  const artwork = await getArtwork(params.slug);

  if (!artwork) {
    notFound();
  }

  const editions = await getEditions(artwork.id);

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'VisualArtwork',
    name: artwork.title,
    creator: {
      '@type': 'Person',
      name: 'Grant Ward',
    },
    dateCreated: artwork.year?.toString(),
    artMedium: artwork.medium,
    artform: artwork.type === 'original' ? 'Painting' : 'Print',
    width: artwork.width_cm
      ? {
          '@type': 'QuantitativeValue',
          value: artwork.width_cm,
          unitText: 'cm',
        }
      : undefined,
    height: artwork.height_cm
      ? {
          '@type': 'QuantitativeValue',
          value: artwork.height_cm,
          unitText: 'cm',
        }
      : undefined,
    image: artwork.cover_image_url,
    url: `https://grantward.art/art/${artwork.slug}`,
    inLanguage: 'en',
    ...(artwork.description && { description: artwork.description }),
    ...(artwork.price_cents &&
      artwork.status === 'available' && {
        offers: {
          '@type': 'Offer',
          price: artwork.price_cents / 100,
          priceCurrency: 'USD',
          availability:
            artwork.status === 'available'
              ? 'https://schema.org/InStock'
              : 'https://schema.org/OutOfStock',
        },
      }),
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <div className="container px-4 py-8 md:px-6 md:py-12">
        <ArtworkDetail artwork={artwork} editions={editions} />
      </div>
    </>
  );
}
