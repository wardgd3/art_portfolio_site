import { MetadataRoute } from 'next';
import { supabase } from '@/lib/supabase/client';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = 'https://grantward.art';

  const { data: artworks } = await supabase
    .from('artworks')
    .select('slug, updated_at')
    .eq('published', true)
    .returns<Array<{ slug: string; updated_at: string }>>();

  const artworkUrls: MetadataRoute.Sitemap =
    artworks?.map((artwork) => ({
      url: `${baseUrl}/art/${artwork.slug}`,
      lastModified: new Date(artwork.updated_at),
      changeFrequency: 'weekly' as const,
      priority: 0.8,
    })) || [];

  return [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 1,
    },
    {
      url: `${baseUrl}/gallery`,
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 0.9,
    },
    {
      url: `${baseUrl}/originals`,
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 0.9,
    },
    {
      url: `${baseUrl}/prints`,
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 0.9,
    },
    {
      url: `${baseUrl}/about`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.7,
    },
    {
      url: `${baseUrl}/contact`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.6,
    },
    ...artworkUrls,
  ];
}
