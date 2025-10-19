import { Mail, Instagram } from 'lucide-react';
import { Button } from '@/components/ui/button';
import Link from 'next/link';

export const metadata = {
  title: 'About - Grant Ward',
  description:
    'Learn about contemporary painter Grant Ward, his artistic process, and notable exhibitions.',
};

export default function AboutPage() {
  return (
    <div className="container px-4 py-8 md:px-6 md:py-12">
      <div className="mx-auto max-w-4xl space-y-12">
        <div className="space-y-4">
          <h1 className="text-4xl font-bold tracking-tight md:text-5xl">
            About Grant Ward
          </h1>
          <p className="text-xl text-muted-foreground">
            Contemporary painter exploring the ephemeral beauty of light and
            atmosphere
          </p>
        </div>

        <div className="grid gap-8 md:grid-cols-5">
          <div className="md:col-span-3 space-y-6">
            <section className="space-y-4">
              <h2 className="text-2xl font-bold">Artist Statement</h2>
              <div className="space-y-4 text-lg leading-relaxed text-muted-foreground">
                <p>
                  My work is rooted in observation and memory, seeking to
                  capture the fleeting qualities of light and atmosphere that
                  define a moment in time. Through oil painting and gouache, I
                  explore both landscape and figurative subjects, drawn to the
                  quiet poetry found in everyday scenes.
                </p>
                <p>
                  I'm interested in the space between realism and abstraction,
                  where forms dissolve into light and color becomes the primary
                  language. Each painting begins with direct observation,
                  whether from life or reference, but evolves through an
                  intuitive process that allows for interpretation and emotional
                  resonance.
                </p>
                <p>
                  Working primarily in oil on canvas and gouache on paper, I
                  build up layers of color to create depth and luminosity. The
                  process is both deliberate and spontaneous, requiring patience
                  to develop the surface while remaining open to unexpected
                  discoveries.
                </p>
              </div>
            </section>

            <section className="space-y-4">
              <h2 className="text-2xl font-bold">Background</h2>
              <div className="space-y-4 text-lg leading-relaxed text-muted-foreground">
                <p>
                  Grant Ward is a contemporary painter based in the Pacific
                  Northwest. He received his MFA in Painting from the School of
                  Visual Arts and has been exhibiting his work nationally for
                  over a decade.
                </p>
                <p>
                  His paintings are held in private collections across North
                  America and Europe. He teaches workshops on landscape painting
                  and contemporary techniques at various institutions and
                  maintains an active studio practice.
                </p>
              </div>
            </section>

            <section className="space-y-4">
              <h2 className="text-2xl font-bold">Notable Exhibitions</h2>
              <ul className="space-y-3 text-lg text-muted-foreground">
                <li className="flex gap-3">
                  <span className="font-medium">2024</span>
                  <span>
                    "Atmospheric Studies" - Solo Exhibition, Gallery North,
                    Seattle
                  </span>
                </li>
                <li className="flex gap-3">
                  <span className="font-medium">2023</span>
                  <span>
                    "Light and Shadow" - Group Exhibition, Contemporary Arts
                    Center, Portland
                  </span>
                </li>
                <li className="flex gap-3">
                  <span className="font-medium">2022</span>
                  <span>
                    "Pacific Light" - Solo Exhibition, Coastal Gallery, San
                    Francisco
                  </span>
                </li>
                <li className="flex gap-3">
                  <span className="font-medium">2021</span>
                  <span>
                    "New Visions" - Juried Exhibition, Museum of Contemporary
                    Art, Vancouver
                  </span>
                </li>
              </ul>
            </section>
          </div>

          <div className="md:col-span-2 space-y-6">
            <div className="sticky top-20">
              <div className="aspect-[3/4] overflow-hidden rounded-lg border bg-muted">
                <img
                  src="https://images.pexels.com/photos/3778966/pexels-photo-3778966.jpeg?auto=compress&cs=tinysrgb&w=600"
                  alt="Grant Ward portrait"
                  className="h-full w-full object-cover"
                />
              </div>

              <div className="mt-6 space-y-4">
                <div className="rounded-lg border bg-card p-6 space-y-4">
                  <h3 className="font-semibold">Connect</h3>
                  <div className="space-y-2">
                    <Button asChild variant="outline" className="w-full justify-start">
                      <a href="mailto:grant@grantward.art">
                        <Mail className="mr-2 h-4 w-4" />
                        grant@grantward.art
                      </a>
                    </Button>
                    <Button asChild variant="outline" className="w-full justify-start">
                      <a
                        href="https://instagram.com/grantwardart"
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        <Instagram className="mr-2 h-4 w-4" />
                        @grantwardart
                      </a>
                    </Button>
                  </div>
                </div>

                <Button asChild size="lg" className="w-full">
                  <Link href="/contact">Contact for Commissions</Link>
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
