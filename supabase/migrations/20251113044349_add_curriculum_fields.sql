/*
  # Add Curriculum and Physics Education Fields
  
  1. Schema Changes
    - Add curriculum field to content_items (AP Physics, IIT-JEE, NEET, IB, IGCSE, A-Levels)
    - Add difficulty level field (easy, medium, hard)
    - Add topic field for physics topics
    - Add content_type_detail field (quiz, video, reel, concept, tip)
    - Add metadata field for additional curriculum-specific data
    
  2. Brand Preferences Updates
    - Add active_curricula array
    - Add difficulty_distribution JSONB
    - Add content_mix JSONB
    - Add topic_priorities array
    
  3. Client Updates
    - Add slug field for URL-friendly identifier
    - Add tagline field
    - Add social media handles
*/

-- Add new fields to content_items
DO $$ 
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns 
    WHERE table_name = 'content_items' AND column_name = 'curriculum'
  ) THEN
    ALTER TABLE content_items ADD COLUMN curriculum text;
  END IF;

  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns 
    WHERE table_name = 'content_items' AND column_name = 'difficulty'
  ) THEN
    ALTER TABLE content_items ADD COLUMN difficulty text CHECK (difficulty IN ('easy', 'medium', 'hard'));
  END IF;

  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns 
    WHERE table_name = 'content_items' AND column_name = 'topic'
  ) THEN
    ALTER TABLE content_items ADD COLUMN topic text;
  END IF;

  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns 
    WHERE table_name = 'content_items' AND column_name = 'content_type_detail'
  ) THEN
    ALTER TABLE content_items ADD COLUMN content_type_detail text;
  END IF;

  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns 
    WHERE table_name = 'content_items' AND column_name = 'metadata'
  ) THEN
    ALTER TABLE content_items ADD COLUMN metadata jsonb DEFAULT '{}';
  END IF;

  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns 
    WHERE table_name = 'content_items' AND column_name = 'tags'
  ) THEN
    ALTER TABLE content_items ADD COLUMN tags text[] DEFAULT '{}';
  END IF;
END $$;

-- Add new fields to clients
DO $$ 
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns 
    WHERE table_name = 'clients' AND column_name = 'slug'
  ) THEN
    ALTER TABLE clients ADD COLUMN slug text UNIQUE;
  END IF;

  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns 
    WHERE table_name = 'clients' AND column_name = 'tagline'
  ) THEN
    ALTER TABLE clients ADD COLUMN tagline text;
  END IF;

  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns 
    WHERE table_name = 'clients' AND column_name = 'instagram_handle'
  ) THEN
    ALTER TABLE clients ADD COLUMN instagram_handle text;
  END IF;

  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns 
    WHERE table_name = 'clients' AND column_name = 'youtube_handle'
  ) THEN
    ALTER TABLE clients ADD COLUMN youtube_handle text;
  END IF;

  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns 
    WHERE table_name = 'clients' AND column_name = 'facebook_handle'
  ) THEN
    ALTER TABLE clients ADD COLUMN facebook_handle text;
  END IF;
END $$;

-- Add new fields to brand_preferences
DO $$ 
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns 
    WHERE table_name = 'brand_preferences' AND column_name = 'active_curricula'
  ) THEN
    ALTER TABLE brand_preferences ADD COLUMN active_curricula text[] DEFAULT '{}';
  END IF;

  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns 
    WHERE table_name = 'brand_preferences' AND column_name = 'difficulty_distribution'
  ) THEN
    ALTER TABLE brand_preferences ADD COLUMN difficulty_distribution jsonb DEFAULT '{"easy": 30, "medium": 50, "hard": 20}';
  END IF;

  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns 
    WHERE table_name = 'brand_preferences' AND column_name = 'content_mix'
  ) THEN
    ALTER TABLE brand_preferences ADD COLUMN content_mix jsonb DEFAULT '{"quiz": 40, "video": 30, "reel": 20, "tip": 10}';
  END IF;

  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns 
    WHERE table_name = 'brand_preferences' AND column_name = 'topic_priorities'
  ) THEN
    ALTER TABLE brand_preferences ADD COLUMN topic_priorities text[] DEFAULT '{}';
  END IF;
END $$;

-- Create index for curriculum and difficulty filtering
CREATE INDEX IF NOT EXISTS idx_content_items_curriculum ON content_items(curriculum);
CREATE INDEX IF NOT EXISTS idx_content_items_difficulty ON content_items(difficulty);
CREATE INDEX IF NOT EXISTS idx_content_items_topic ON content_items(topic);
CREATE INDEX IF NOT EXISTS idx_clients_slug ON clients(slug);
