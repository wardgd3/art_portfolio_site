import Link from 'next/link';
import { Instagram, Mail } from 'lucide-react';

const footerNav = [
  { name: 'Gallery', href: '/gallery' },
  { name: 'About', href: '/about' },
  { name: 'Contact', href: '/contact' },
];

export function SiteFooter() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="border-t bg-card/50">
      <div className="container px-4 py-12 md:px-6">
        <div className="grid gap-8 md:grid-cols-3">
          <div className="space-y-4">
            <h3 className="font-serif text-lg font-semibold">Grant Ward</h3>
            <p className="text-sm text-muted-foreground">
              Contemporary painter exploring landscapes and figurative works
              through oil, gouache, and charcoal.
            </p>
          </div>

          <div className="space-y-4">
            <h3 className="text-sm font-semibold uppercase tracking-wider">
              Navigate
            </h3>
            <nav className="flex flex-col gap-2">
              {footerNav.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className="text-sm text-muted-foreground transition-colors hover:text-foreground"
                >
                  {item.name}
                </Link>
              ))}
            </nav>
          </div>

          <div className="space-y-4">
            <h3 className="text-sm font-semibold uppercase tracking-wider">
              Connect
            </h3>
            <div className="flex gap-4">
              <a
                href="mailto:grant@grantward.art"
                className="text-muted-foreground transition-colors hover:text-foreground"
                aria-label="Email"
              >
                <Mail className="h-5 w-5" />
              </a>
              <a
                href="https://instagram.com/grantwardart"
                target="_blank"
                rel="noopener noreferrer"
                className="text-muted-foreground transition-colors hover:text-foreground"
                aria-label="Instagram"
              >
                <Instagram className="h-5 w-5" />
              </a>
            </div>
          </div>
        </div>

        <div className="mt-8 border-t pt-8 text-center text-sm text-muted-foreground">
          <p>&copy; {currentYear} Grant Ward. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
