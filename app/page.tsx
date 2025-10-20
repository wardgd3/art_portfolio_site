import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { FeaturedGrid } from '@/components/featured-grid';
import { NewsletterSignup } from '@/components/newsletter-signup';
import { ArrowRight } from 'lucide-react';

export default function HomePage() {
  return (
    <div className="flex flex-col">
      <section className="relative h-[70vh] min-h-[500px] overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage:
              'url(https://images.pexels.com/photos/1145720/pexels-photo-1145720.jpeg?auto=compress&cs=tinysrgb&w=1920)',
          }}
        >
          <div className="absolute inset-0 bg-gradient-to-b from-background/60 via-background/40 to-background" />
        </div>

  <div className="container relative flex h-full items-center pl-8 pr-4 md:pl-16 md:pr-6">
          <div className="max-w-3xl space-y-6">
            <h1 className="text-5xl font-bold tracking-tight text-foreground md:text-7xl">
              Paintings by Grant Ward
            </h1>
            <p className="text-xl text-muted-foreground md:text-2xl">
              Contemporary landscapes and figurative works exploring light,
              atmosphere, and the subtle beauty of everyday moments
            </p>
            <div className="flex flex-wrap gap-4">
              <Button asChild size="lg">
                <Link href="/gallery">
                  View Gallery
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
              <Button asChild variant="outline" size="lg">
                <Link href="/originals">Originals</Link>
              </Button>
              <Button asChild variant="outline" size="lg">
                <Link href="/prints">Limited Prints</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      <section className="container space-y-8 px-4 py-16 md:px-6 md:py-24">
        <div className="flex items-end justify-between">
          <div className="space-y-2">
            <h2 className="text-3xl font-bold tracking-tight md:text-4xl">
              Featured Works
            </h2>
            <p className="text-muted-foreground">
              A curated selection of recent paintings and prints
            </p>
          </div>
          <Button asChild variant="ghost">
            <Link href="/gallery">
              View All
              <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </Button>
        </div>

        <FeaturedGrid />
      </section>

      <section className="border-y bg-card/30">
        <div className="container px-4 py-16 md:px-6 md:py-24">
          <div className="mx-auto max-w-2xl space-y-6 text-center">
            <h2 className="text-3xl font-bold tracking-tight md:text-4xl">
              Stay Connected
            </h2>
            <p className="text-lg text-muted-foreground">
              Join our mailing list to receive updates on new works, upcoming
              exhibitions, and exclusive offers.
            </p>
            <NewsletterSignup />
          </div>
        </div>
      </section>

      <section className="container px-4 py-16 md:px-6 md:py-24">
        <div className="grid gap-12 md:grid-cols-2 lg:gap-16">
          <div className="space-y-4">
            <h2 className="text-3xl font-bold tracking-tight md:text-4xl">
              About the Artist
            </h2>
            <p className="text-lg text-muted-foreground leading-relaxed">
              Grant Ward is a contemporary painter working primarily in oil and
              gouache. His work explores the intersection of memory and place,
              capturing fleeting moments of light and atmosphere in both
              landscape and figurative compositions.
            </p>
            <Button asChild variant="outline">
              <Link href="/about">Learn More</Link>
            </Button>
          </div>

          <div className="aspect-[4/3] overflow-hidden rounded-lg border bg-muted">
            <img
              src="https://images.pexels.com/photos/3778966/pexels-photo-3778966.jpeg?auto=compress&cs=tinysrgb&w=800"
              alt="Grant Ward in studio"
              className="h-full w-full object-cover"
            />
          </div>
        </div>
      </section>
    </div>
  );
}
