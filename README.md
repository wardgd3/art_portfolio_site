# Grant Ward Artist Portfolio & Print Store

A fast, elegant, and accessible art website for painter Grant Ward, showcasing original artwork and limited-edition prints. Built with Next.js 14, Tailwind CSS, Supabase, and Resend.

## Features

- **Beautiful Image Presentation**: Responsive gallery with masonry grid, lightbox zoom, and lazy loading
- **Advanced Filtering**: Filter artworks by year, medium, subject, availability, and more
- **Inquiry System**: Contact forms and purchase inquiries with email notifications
- **Edition Management**: Limited edition print tracking with remaining inventory
- **Newsletter Integration**: Mailing list signup with Supabase storage
- **Dark/Light Theme**: System-aware theme toggle with smooth transitions
- **SEO Optimized**: JSON-LD structured data, Open Graph tags, and semantic HTML
- **Fully Accessible**: WCAG AA+ compliant with keyboard navigation
- **Admin Ready**: Database structure for future admin dashboard

## Tech Stack

- **Framework**: Next.js 14 (App Router) with TypeScript
- **Styling**: Tailwind CSS with custom design system
- **UI Components**: Shadcn/ui primitives
- **Database**: Supabase (PostgreSQL with RLS)
- **Email**: Resend (transactional emails)
- **Icons**: Lucide React
- **Animations**: Framer Motion

## Design System

The site features a minimal gallery aesthetic with "frost-bitten Siberian fantasy" accents:

- **Typography**: Spectral (serif headings) + Inter (body text)
- **Colors**: Cool neutrals, parchment backgrounds, icy blue accents
- **Contrast**: Optimized for both light and dark modes

## Getting Started

### Prerequisites

- Node.js 18+ and npm
- A Supabase account and project
- (Optional) A Resend account for email functionality

### Installation

1. Clone the repository
2. Install dependencies:

```bash
npm install
```

3. Set up environment variables in `.env`:

```env
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
```

### Database Setup

1. Go to your Supabase project dashboard
2. Navigate to SQL Editor
3. Copy the contents of `supabase/migrations/20250101000000_initial_schema.sql`
4. Paste and execute in the SQL Editor
5. Run the seed script to add sample artworks:

```bash
npm run setup-db
```

This creates the following tables:
- `artworks` - All artwork data (originals and prints)
- `editions` - Limited edition print variants
- `newsletter_subscribers` - Mailing list
- `inquiries` - Purchase and contact inquiries

### Development

Run the development server:

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to view the site.

### Building for Production

```bash
npm run build
npm start
```

## Project Structure

```
├── app/                    # Next.js app router pages
│   ├── art/[slug]/        # Artwork detail pages
│   ├── gallery/           # Gallery with filters
│   ├── originals/         # Originals filter view
│   ├── prints/            # Prints filter view
│   ├── about/             # About page
│   ├── contact/           # Contact page
│   └── api/               # API routes
├── components/            # React components
│   ├── ui/               # Shadcn/ui components
│   ├── site-header.tsx   # Navigation header
│   ├── site-footer.tsx   # Footer
│   ├── artwork-card.tsx  # Artwork grid item
│   ├── lightbox.tsx      # Image lightbox
│   └── ...
├── lib/                   # Utilities
│   └── supabase/         # Supabase client & types
├── scripts/              # Database setup scripts
└── supabase/             # Database migrations
    └── migrations/
```

## Key Pages

- `/` - Home with hero, featured works, newsletter signup
- `/gallery` - Complete gallery with filters and search
- `/originals` - Original paintings only
- `/prints` - Limited edition prints only
- `/art/[slug]` - Individual artwork details with inquiry form
- `/about` - Artist bio, statement, exhibitions
- `/contact` - Contact form with purpose selector

## Database Schema

### Artworks Table
Main table storing all artwork information including:
- Basic info (title, year, medium)
- Dimensions (inches and centimeters)
- Pricing and availability
- Images and tags
- Type (original or print)

### Editions Table
For limited edition prints:
- Edition details (label, size, SKU)
- Inventory tracking (remaining count)
- Pricing per edition

### Newsletter Subscribers
Email collection for mailing list

### Inquiries
Customer inquiries with:
- Artwork reference
- Contact information
- Message and country
- Status tracking

## Customization

### Changing Colors

Edit `app/globals.css` to modify the CSS variables for light/dark themes.

### Adding Artworks

Use the database setup script as a template, or insert directly via Supabase dashboard:

```typescript
const artwork = {
  slug: 'unique-slug',
  title: 'Artwork Title',
  year: 2024,
  medium: 'Oil',
  // ... other fields
};
```

### Email Configuration

To enable email notifications:

1. Sign up for Resend
2. Add your API key to `.env`:
```env
RESEND_API_KEY=your_resend_api_key
```
3. Update `app/api/contact/route.ts` with Resend integration

## SEO & Accessibility

- All images require alt text
- Semantic HTML structure
- ARIA labels where needed
- Keyboard navigation support
- JSON-LD structured data on artwork pages
- Open Graph tags for social sharing

## Performance

- Optimized images with Next/Image
- Static generation where possible
- Code splitting for admin features
- Lazy loading for images
- Minimal JavaScript for interactivity

## Future Enhancements

- Full admin dashboard for artwork management
- Stripe integration for direct purchases
- Advanced search with Algolia
- Exhibition/event calendar
- Commission request workflow
- Multi-language support

## License

Copyright © 2024 Grant Ward. All rights reserved.

## Support

For questions or issues, contact grant@grantward.art
