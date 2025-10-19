import { createClient } from '@supabase/supabase-js';
import { readFileSync } from 'fs';
import { join } from 'path';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;

const supabase = createClient(supabaseUrl, supabaseKey);

async function setupDatabase() {
  console.log('Setting up database...');

  const migrationPath = join(
    process.cwd(),
    'supabase',
    'migrations',
    '20250101000000_initial_schema.sql'
  );

  try {
    const migrationSQL = readFileSync(migrationPath, 'utf-8');
    console.log('Migration file loaded');
    console.log('Note: Migration should be applied via Supabase Dashboard');
    console.log(
      'Copy the SQL from supabase/migrations/20250101000000_initial_schema.sql'
    );
    console.log('and run it in the SQL Editor at your Supabase project');
  } catch (error) {
    console.error('Error reading migration file:', error);
  }

  console.log('\nSeeding sample data...');

  const sampleArtworks = [
    {
      slug: 'morning-light-over-valley-2024',
      title: 'Morning Light Over Valley',
      year: 2024,
      medium: 'Oil',
      subject: ['Landscape'],
      width_in: 24,
      height_in: 30,
      width_cm: 61,
      height_cm: 76,
      orientation: 'portrait' as const,
      framed: true,
      description:
        'Capturing the soft morning light as it filters through the valley mist. This piece explores the interplay between warm and cool tones in early morning atmospheric conditions.',
      status: 'available' as const,
      type: 'original' as const,
      price_cents: 285000,
      cover_image_url:
        'https://images.pexels.com/photos/1145720/pexels-photo-1145720.jpeg?auto=compress&cs=tinysrgb&w=800',
      images: [],
      tags: ['landscape', 'morning', 'atmospheric', '2024'],
      published: true,
    },
    {
      slug: 'winter-study-2023',
      title: 'Winter Study',
      year: 2023,
      medium: 'Gouache',
      subject: ['Landscape'],
      width_in: 11,
      height_in: 14,
      width_cm: 28,
      height_cm: 36,
      orientation: 'portrait' as const,
      framed: false,
      description:
        'A quick study of winter light on snow, exploring the subtle color shifts in shadow areas.',
      status: 'sold' as const,
      type: 'original' as const,
      price_cents: null,
      cover_image_url:
        'https://images.pexels.com/photos/754268/pexels-photo-754268.jpeg?auto=compress&cs=tinysrgb&w=800',
      images: [],
      tags: ['landscape', 'winter', 'study', '2023'],
      published: true,
    },
    {
      slug: 'evening-figure-2024',
      title: 'Evening Figure',
      year: 2024,
      medium: 'Oil',
      subject: ['Figure'],
      width_in: 18,
      height_in: 24,
      width_cm: 46,
      height_cm: 61,
      orientation: 'portrait' as const,
      framed: true,
      description:
        'A contemplative figure study exploring the quality of evening light and its effect on form and color.',
      status: 'available' as const,
      type: 'original' as const,
      price_cents: 195000,
      cover_image_url:
        'https://images.pexels.com/photos/853151/pexels-photo-853151.jpeg?auto=compress&cs=tinysrgb&w=800',
      images: [],
      tags: ['figure', 'portrait', 'evening', '2024'],
      published: true,
    },
  ];

  for (const artwork of sampleArtworks) {
    const { error } = await supabase.from('artworks').insert([artwork]);

    if (error) {
      if (error.code === '23505') {
        console.log(`Artwork "${artwork.title}" already exists, skipping...`);
      } else {
        console.error(`Error inserting artwork "${artwork.title}":`, error);
      }
    } else {
      console.log(`✓ Added artwork: ${artwork.title}`);
    }
  }

  console.log('\nDatabase setup complete!');
  console.log('\nNext steps:');
  console.log('1. Visit your Supabase Dashboard');
  console.log(
    '2. Go to SQL Editor and run the migration from supabase/migrations/20250101000000_initial_schema.sql'
  );
  console.log('3. Run this script again with: npm run setup-db');
}

setupDatabase().catch(console.error);
