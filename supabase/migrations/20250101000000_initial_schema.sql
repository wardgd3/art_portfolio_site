/*
  # Grant Ward Artist Portfolio - Initial Schema

  ## Overview
  Complete database schema for artist portfolio and print store application.

  ## New Tables

  ### `artworks`
  Main table for storing artwork information (originals and prints)
  - `id` (uuid, primary key) - Unique identifier
  - `slug` (text, unique) - URL-friendly identifier
  - `title` (text) - Artwork title
  - `year` (integer) - Year created
  - `medium` (text) - Medium used (Oil, Gouache, Charcoal, etc.)
  - `subject` (text[]) - Subject tags array (Landscape, Figure, etc.)
  - `width_in` (decimal) - Width in inches
  - `height_in` (decimal) - Height in inches
  - `width_cm` (decimal) - Width in centimeters
  - `height_cm` (decimal) - Height in centimeters
  - `orientation` (enum) - portrait, landscape, or square
  - `framed` (boolean) - Whether artwork is framed
  - `description` (text) - Artist notes and description
  - `status` (enum) - available, sold, or reserved
  - `type` (enum) - original or print
  - `price_cents` (integer) - Price in cents (null if not for sale)
  - `cover_image_url` (text) - Primary image URL
  - `images` (text[]) - Array of additional image URLs
  - `tags` (text[]) - Search tags
  - `created_at` (timestamptz) - Record creation timestamp
  - `updated_at` (timestamptz) - Last update timestamp
  - `published` (boolean) - Whether visible on site

  ### `editions`
  Limited edition print information
  - `id` (uuid, primary key) - Unique identifier
  - `artwork_id` (uuid, foreign key) - References artworks table
  - `label` (text) - Edition label (e.g., "11x14 giclée")
  - `edition_size` (integer) - Total number in edition
  - `remaining` (integer) - Number still available
  - `price_cents` (integer) - Price in cents
  - `sku` (text, unique) - Stock keeping unit
  - `created_at` (timestamptz) - Record creation timestamp

  ### `newsletter_subscribers`
  Newsletter subscription list
  - `id` (uuid, primary key) - Unique identifier
  - `email` (text, unique) - Subscriber email
  - `created_at` (timestamptz) - Subscription timestamp

  ### `inquiries`
  Customer inquiries and purchase requests
  - `id` (uuid, primary key) - Unique identifier
  - `artwork_id` (uuid, foreign key) - References artworks table
  - `edition_id` (uuid, foreign key, nullable) - References editions table
  - `name` (text) - Customer name
  - `email` (text) - Customer email
  - `message` (text) - Inquiry message
  - `country` (text) - Shipping country
  - `status` (enum) - new, replied, or closed
  - `created_at` (timestamptz) - Inquiry timestamp

  ## Security
  - Enable RLS on all tables
  - Public read access for published artworks and editions
  - Insert access for newsletter subscriptions and inquiries
  - Admin-only access for modifications (requires authenticated role)

  ## Important Notes
  1. All prices stored in cents to avoid floating-point issues
  2. Dimensions stored in both inches and centimeters for convenience
  3. Arrays used for subjects, images, and tags for flexible categorization
  4. Slug must be unique and URL-friendly for clean routing
  5. RLS policies ensure data security while allowing public viewing
*/

-- Create enums
DO $$ BEGIN
  CREATE TYPE artwork_orientation AS ENUM ('portrait', 'landscape', 'square');
EXCEPTION
  WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
  CREATE TYPE artwork_status AS ENUM ('available', 'sold', 'reserved');
EXCEPTION
  WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
  CREATE TYPE artwork_type AS ENUM ('original', 'print');
EXCEPTION
  WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
  CREATE TYPE inquiry_status AS ENUM ('new', 'replied', 'closed');
EXCEPTION
  WHEN duplicate_object THEN null;
END $$;

-- Create artworks table
CREATE TABLE IF NOT EXISTS artworks (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  slug text UNIQUE NOT NULL,
  title text NOT NULL,
  year integer,
  medium text,
  subject text[] DEFAULT '{}',
  width_in decimal(8,2),
  height_in decimal(8,2),
  width_cm decimal(8,2),
  height_cm decimal(8,2),
  orientation artwork_orientation,
  framed boolean DEFAULT false,
  description text DEFAULT '',
  status artwork_status DEFAULT 'available',
  type artwork_type DEFAULT 'original',
  price_cents integer,
  cover_image_url text,
  images text[] DEFAULT '{}',
  tags text[] DEFAULT '{}',
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now(),
  published boolean DEFAULT true
);

-- Create editions table
CREATE TABLE IF NOT EXISTS editions (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  artwork_id uuid NOT NULL REFERENCES artworks(id) ON DELETE CASCADE,
  label text NOT NULL,
  edition_size integer NOT NULL DEFAULT 0,
  remaining integer NOT NULL DEFAULT 0,
  price_cents integer NOT NULL,
  sku text UNIQUE NOT NULL,
  created_at timestamptz DEFAULT now()
);

-- Create newsletter_subscribers table
CREATE TABLE IF NOT EXISTS newsletter_subscribers (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  email text UNIQUE NOT NULL,
  created_at timestamptz DEFAULT now()
);

-- Create inquiries table
CREATE TABLE IF NOT EXISTS inquiries (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  artwork_id uuid REFERENCES artworks(id) ON DELETE SET NULL,
  edition_id uuid REFERENCES editions(id) ON DELETE SET NULL,
  name text NOT NULL,
  email text NOT NULL,
  message text DEFAULT '',
  country text,
  status inquiry_status DEFAULT 'new',
  created_at timestamptz DEFAULT now()
);

-- Create indexes for better query performance
CREATE INDEX IF NOT EXISTS idx_artworks_slug ON artworks(slug);
CREATE INDEX IF NOT EXISTS idx_artworks_published ON artworks(published);
CREATE INDEX IF NOT EXISTS idx_artworks_type ON artworks(type);
CREATE INDEX IF NOT EXISTS idx_artworks_status ON artworks(status);
CREATE INDEX IF NOT EXISTS idx_artworks_year ON artworks(year);
CREATE INDEX IF NOT EXISTS idx_editions_artwork_id ON editions(artwork_id);
CREATE INDEX IF NOT EXISTS idx_inquiries_artwork_id ON inquiries(artwork_id);
CREATE INDEX IF NOT EXISTS idx_inquiries_status ON inquiries(status);

-- Enable Row Level Security
ALTER TABLE artworks ENABLE ROW LEVEL SECURITY;
ALTER TABLE editions ENABLE ROW LEVEL SECURITY;
ALTER TABLE newsletter_subscribers ENABLE ROW LEVEL SECURITY;
ALTER TABLE inquiries ENABLE ROW LEVEL SECURITY;

-- RLS Policies for artworks
CREATE POLICY "Anyone can view published artworks"
  ON artworks FOR SELECT
  USING (published = true);

CREATE POLICY "Authenticated users can view all artworks"
  ON artworks FOR SELECT
  TO authenticated
  USING (true);

CREATE POLICY "Authenticated users can insert artworks"
  ON artworks FOR INSERT
  TO authenticated
  WITH CHECK (true);

CREATE POLICY "Authenticated users can update artworks"
  ON artworks FOR UPDATE
  TO authenticated
  USING (true)
  WITH CHECK (true);

CREATE POLICY "Authenticated users can delete artworks"
  ON artworks FOR DELETE
  TO authenticated
  USING (true);

-- RLS Policies for editions
CREATE POLICY "Anyone can view editions"
  ON editions FOR SELECT
  USING (true);

CREATE POLICY "Authenticated users can insert editions"
  ON editions FOR INSERT
  TO authenticated
  WITH CHECK (true);

CREATE POLICY "Authenticated users can update editions"
  ON editions FOR UPDATE
  TO authenticated
  USING (true)
  WITH CHECK (true);

CREATE POLICY "Authenticated users can delete editions"
  ON editions FOR DELETE
  TO authenticated
  USING (true);

-- RLS Policies for newsletter_subscribers
CREATE POLICY "Anyone can subscribe to newsletter"
  ON newsletter_subscribers FOR INSERT
  WITH CHECK (true);

CREATE POLICY "Authenticated users can view subscribers"
  ON newsletter_subscribers FOR SELECT
  TO authenticated
  USING (true);

CREATE POLICY "Authenticated users can delete subscribers"
  ON newsletter_subscribers FOR DELETE
  TO authenticated
  USING (true);

-- RLS Policies for inquiries
CREATE POLICY "Anyone can submit inquiries"
  ON inquiries FOR INSERT
  WITH CHECK (true);

CREATE POLICY "Authenticated users can view inquiries"
  ON inquiries FOR SELECT
  TO authenticated
  USING (true);

CREATE POLICY "Authenticated users can update inquiries"
  ON inquiries FOR UPDATE
  TO authenticated
  USING (true)
  WITH CHECK (true);

CREATE POLICY "Authenticated users can delete inquiries"
  ON inquiries FOR DELETE
  TO authenticated
  USING (true);

-- Create updated_at trigger function
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ language 'plpgsql';

-- Add trigger to artworks table
DROP TRIGGER IF EXISTS update_artworks_updated_at ON artworks;
CREATE TRIGGER update_artworks_updated_at
  BEFORE UPDATE ON artworks
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();
