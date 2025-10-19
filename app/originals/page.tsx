import { Suspense } from 'react';
import { GalleryContent } from '@/components/gallery-content';
import { Skeleton } from '@/components/ui/skeleton';
import { redirect } from 'next/navigation';

export const metadata = {
  title: 'Original Paintings - Grant Ward',
  description: 'Browse original paintings by Grant Ward',
};

export default function OriginalsPage({
  searchParams,
}: {
  searchParams: { [key: string]: string | undefined };
}) {
  if (!searchParams.type) {
    redirect('/originals?type=original');
  }

  return (
    <div className="container px-4 py-8 md:px-6 md:py-12">
      <div className="mb-8 space-y-2">
        <h1 className="text-4xl font-bold tracking-tight md:text-5xl">
          Original Paintings
        </h1>
        <p className="text-lg text-muted-foreground">
          One-of-a-kind original artworks available for purchase
        </p>
      </div>

      <Suspense fallback={<GalleryLoadingSkeleton />}>
        <GalleryContent />
      </Suspense>
    </div>
  );
}

function GalleryLoadingSkeleton() {
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
