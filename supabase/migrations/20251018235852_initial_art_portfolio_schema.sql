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
  width_in numeric(5,2),
  height_in numeric(5,2),
  width_cm numeric(5,2),
  height_cm numeric(5,2),
  orientation text CHECK (orientation IN ('portrait','landscape','square')),
  framed boolean DEFAULT false,
  description text DEFAULT '',
  status text CHECK (status IN ('available','sold','reserved')) DEFAULT 'available',
  type text CHECK (type IN ('original','print')) DEFAULT 'original',
  price_cents integer,
  cover_image_url text,
  images text[] DEFAULT '{}',
  tags text[] DEFAULT '{}',
  published boolean DEFAULT true,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
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
  status text CHECK (status IN ('new','replied','closed')) DEFAULT 'new',
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
DROP POLICY IF EXISTS "Anyone can view published artworks" ON artworks;
CREATE POLICY "Anyone can view published artworks"
  ON artworks FOR SELECT
  USING (published = true);

DROP POLICY IF EXISTS "Authenticated users can view all artworks" ON artworks;
CREATE POLICY "Authenticated users can view all artworks"
  ON artworks FOR SELECT
  TO authenticated
  USING (true);

DROP POLICY IF EXISTS "Authenticated users can insert artworks" ON artworks;
CREATE POLICY "Authenticated users can insert artworks"
  ON artworks FOR INSERT
  TO authenticated
  WITH CHECK (true);

DROP POLICY IF EXISTS "Authenticated users can update artworks" ON artworks;
CREATE POLICY "Authenticated users can update artworks"
  ON artworks FOR UPDATE
  TO authenticated
  USING (true)
  WITH CHECK (true);

DROP POLICY IF EXISTS "Authenticated users can delete artworks" ON artworks;
CREATE POLICY "Authenticated users can delete artworks"
  ON artworks FOR DELETE
  TO authenticated
  USING (true);

-- RLS Policies for editions
DROP POLICY IF EXISTS "Anyone can view editions" ON editions;
CREATE POLICY "Anyone can view editions"
  ON editions FOR SELECT
  USING (true);

DROP POLICY IF EXISTS "Authenticated users can insert editions" ON editions;
CREATE POLICY "Authenticated users can insert editions"
  ON editions FOR INSERT
  TO authenticated
  WITH CHECK (true);

DROP POLICY IF EXISTS "Authenticated users can update editions" ON editions;
CREATE POLICY "Authenticated users can update editions"
  ON editions FOR UPDATE
  TO authenticated
  USING (true)
  WITH CHECK (true);

DROP POLICY IF EXISTS "Authenticated users can delete editions" ON editions;
CREATE POLICY "Authenticated users can delete editions"
  ON editions FOR DELETE
  TO authenticated
  USING (true);

-- RLS Policies for newsletter_subscribers
DROP POLICY IF EXISTS "Anyone can subscribe to newsletter" ON newsletter_subscribers;
CREATE POLICY "Anyone can subscribe to newsletter"
  ON newsletter_subscribers FOR INSERT
  WITH CHECK (true);

DROP POLICY IF EXISTS "Authenticated users can view subscribers" ON newsletter_subscribers;
CREATE POLICY "Authenticated users can view subscribers"
  ON newsletter_subscribers FOR SELECT
  TO authenticated
  USING (true);

DROP POLICY IF EXISTS "Authenticated users can delete subscribers" ON newsletter_subscribers;
CREATE POLICY "Authenticated users can delete subscribers"
  ON newsletter_subscribers FOR DELETE
  TO authenticated
  USING (true);

-- RLS Policies for inquiries
DROP POLICY IF EXISTS "Anyone can submit inquiries" ON inquiries;
CREATE POLICY "Anyone can submit inquiries"
  ON inquiries FOR INSERT
  WITH CHECK (true);

DROP POLICY IF EXISTS "Authenticated users can view inquiries" ON inquiries;
CREATE POLICY "Authenticated users can view inquiries"
  ON inquiries FOR SELECT
  TO authenticated
  USING (true);

DROP POLICY IF EXISTS "Authenticated users can update inquiries" ON inquiries;
CREATE POLICY "Authenticated users can update inquiries"
  ON inquiries FOR UPDATE
  TO authenticated
  USING (true)
  WITH CHECK (true);

DROP POLICY IF EXISTS "Authenticated users can delete inquiries" ON inquiries;
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