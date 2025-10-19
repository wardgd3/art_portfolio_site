# Database Setup Complete ✓

## Schema Overview

Your Supabase PostgreSQL database has been successfully created with the following structure:

### Tables Created

1. **artworks** - Main table for all artwork (originals & prints)
   - 22 columns including id, slug, title, year, medium, dimensions, pricing, images, tags
   - Text constraints for orientation, status, and type
   - RLS enabled with public read for published items

2. **editions** - Limited edition print variants
   - 8 columns including artwork_id (FK), label, edition_size, remaining, price_cents, sku
   - Tracks inventory for each print size/type
   - RLS enabled with public read access

3. **newsletter_subscribers** - Email collection
   - 3 columns: id, email (unique), created_at
   - Public insert, admin read access

4. **inquiries** - Customer purchase/contact requests
   - 9 columns including artwork_id (FK), edition_id (FK), customer details, status
   - Public insert, admin read/update access

### Security (RLS Policies)

All tables have Row Level Security enabled:

- **Public users** can:
  - View published artworks
  - View all editions
  - Submit inquiries
  - Subscribe to newsletter

- **Authenticated users** can:
  - Full CRUD on artworks, editions, inquiries
  - View and manage subscribers

### Indexes Created

Performance indexes on:
- artworks: slug, published, type, status, year
- editions: artwork_id
- inquiries: artwork_id, status

### Triggers

- Auto-update `updated_at` timestamp on artwork changes

## Sample Data

✓ **6 artworks** inserted:
- 4 original paintings (3 available, 1 sold, 1 reserved)
- 2 limited edition prints (both available)

✓ **3 print editions** created:
- Coastal Path: 11×14 (47/50 remaining) - $65
- Coastal Path: 16×20 (28/30 remaining) - $85
- Mountain Morning: 11×14 (48/50 remaining) - $65

## Database Statistics

```
Total Artworks: 6
  - Originals: 4
  - Prints: 2

Status Breakdown:
  - Available: 4
  - Sold: 1
  - Reserved: 1

Edition Inventory: 3 editions across 2 artworks
```

## Connection Details

Your application is already configured to connect via:
- URL: From `NEXT_PUBLIC_SUPABASE_URL` environment variable
- Key: From `NEXT_PUBLIC_SUPABASE_ANON_KEY` environment variable

## Next Steps

1. **View Your Data**: Visit your Supabase Dashboard → Table Editor
2. **Add More Artworks**: Use the sample INSERT statements as templates
3. **Test the Application**: Run `npm run dev` and view the gallery
4. **Manage Content**: All data is accessible through the Supabase dashboard

## SQL Reference

### Add a New Artwork

```sql
INSERT INTO artworks (
  slug, title, year, medium, subject,
  width_in, height_in, width_cm, height_cm,
  orientation, framed, description,
  status, type, price_cents, cover_image_url, tags
) VALUES (
  'my-artwork-slug',
  'My Artwork Title',
  2024,
  'Oil on canvas',
  ARRAY['Landscape'],
  18, 24, 46, 61,
  'portrait',
  true,
  'Description of the artwork...',
  'available',
  'original',
  195000,
  'https://example.com/image.jpg',
  ARRAY['tag1', 'tag2']
);
```

### Add Print Editions

```sql
INSERT INTO editions (artwork_id, label, edition_size, remaining, price_cents, sku)
SELECT
  id,
  '11x14 Giclée Print',
  50,
  50,
  6500,
  'UNIQUE-SKU-CODE'
FROM artworks WHERE slug = 'your-artwork-slug';
```

### Query Examples

```sql
-- View all available artworks
SELECT title, year, medium, status, type, price_cents/100 as price_dollars
FROM artworks
WHERE status = 'available' AND published = true;

-- Check edition inventory
SELECT a.title, e.label, e.remaining, e.edition_size
FROM editions e
JOIN artworks a ON e.artwork_id = a.id
WHERE e.remaining > 0;

-- View recent inquiries
SELECT i.name, i.email, a.title, i.created_at
FROM inquiries i
LEFT JOIN artworks a ON i.artwork_id = a.id
ORDER BY i.created_at DESC
LIMIT 10;
```

## Troubleshooting

**Issue**: Can't see artworks on the website
- Check `published = true` in the database
- Verify RLS policies are active
- Check browser console for errors

**Issue**: Can't insert data
- Ensure you're using the correct data types
- Check that unique constraints (slug, sku, email) aren't violated
- Verify RLS policies allow the operation

**Issue**: Images not displaying
- Verify `cover_image_url` contains valid URLs
- Check CORS settings if using external image hosts
- Consider using Supabase Storage for image hosting

---

**Database successfully initialized on:** $(date)
**Migration applied:** initial_art_portfolio_schema
**Total tables:** 4
**Sample records:** 6 artworks, 3 editions
