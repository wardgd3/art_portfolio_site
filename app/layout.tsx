import './globals.css';
import type { Metadata } from 'next';
import { ThemeProvider } from 'next-themes';
import { SiteHeader } from '@/components/site-header';
import { SiteFooter } from '@/components/site-footer';
import { Toaster } from '@/components/ui/sonner';

export const metadata: Metadata = {
  title: 'Grant Ward - Contemporary Painter',
  description:
    'Original paintings and limited edition prints by contemporary artist Grant Ward. Explore landscapes and figurative works in oil, gouache, and charcoal.',
  openGraph: {
    title: 'Grant Ward - Contemporary Painter',
    description:
      'Original paintings and limited edition prints by contemporary artist Grant Ward.',
    type: 'website',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <div className="flex min-h-screen flex-col">
            <SiteHeader />
            <main className="flex-1">{children}</main>
            <SiteFooter />
          </div>
          <Toaster />
        </ThemeProvider>
      </body>
    </html>
  );
}
