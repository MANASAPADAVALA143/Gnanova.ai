/*
  # Gnanova.ai Platform Database Schema

  ## Overview
  This migration creates the complete database schema for the Gnanova.ai AI marketing agency platform.

  ## Tables Created

  ### 1. profiles
  Extends Supabase auth.users with additional user profile information
  - `id` (uuid, FK to auth.users) - User ID
  - `full_name` (text) - User's full name
  - `avatar_url` (text) - Profile picture URL
  - `role` (text) - User role: 'client' or 'agency'
  - `created_at` (timestamptz) - Account creation timestamp
  - `updated_at` (timestamptz) - Last update timestamp

  ### 2. clients
  Stores client business information and subscription details
  - `id` (uuid, PK) - Client ID
  - `user_id` (uuid, FK to profiles) - Associated user account
  - `business_name` (text) - Client's business name
  - `industry` (text) - Industry category
  - `website` (text) - Business website
  - `email` (text) - Business email
  - `phone` (text) - Contact phone
  - `logo_url` (text) - Business logo
  - `plan` (text) - Subscription plan: starter/growth/pro/enterprise
  - `status` (text) - Account status: active/warning/error/paused
  - `mrr` (numeric) - Monthly recurring revenue
  - `primary_color` (text) - Brand primary color
  - `secondary_color` (text) - Brand secondary color
  - `accent_color` (text) - Brand accent color
  - `brand_voice` (text) - Brand voice tone
  - `brand_description` (text) - Brand description
  - `target_audience` (text) - Target audience description
  - `created_at` (timestamptz)
  - `updated_at` (timestamptz)

  ### 3. content_items
  Stores all generated content pieces
  - `id` (uuid, PK) - Content ID
  - `client_id` (uuid, FK to clients) - Associated client
  - `type` (text) - Content type: instagram_post/facebook_post/etc.
  - `caption` (text) - Post caption/text
  - `image_url` (text) - Media URL
  - `video_url` (text) - Video URL if applicable
  - `scheduled_for` (timestamptz) - Scheduled publish time
  - `status` (text) - pending_approval/approved/rejected/published/failed
  - `platforms` (text[]) - Target platforms array
  - `created_at` (timestamptz)
  - `updated_at` (timestamptz)
  - `published_at` (timestamptz)

  ### 4. platform_connections
  Stores social media platform connection details
  - `id` (uuid, PK)
  - `client_id` (uuid, FK to clients)
  - `platform` (text) - Platform name: instagram/facebook/twitter/linkedin/youtube
  - `account_name` (text) - Connected account name
  - `account_id` (text) - Platform account ID
  - `is_connected` (boolean) - Connection status
  - `connected_at` (timestamptz)
  - `access_token` (text) - Encrypted access token
  - `refresh_token` (text) - Encrypted refresh token

  ### 5. analytics
  Stores post performance metrics
  - `id` (uuid, PK)
  - `content_id` (uuid, FK to content_items)
  - `platform` (text) - Platform name
  - `likes` (integer)
  - `comments` (integer)
  - `shares` (integer)
  - `saves` (integer)
  - `reach` (integer)
  - `engagement_rate` (numeric)
  - `recorded_at` (timestamptz)

  ### 6. brand_preferences
  Stores client content preferences
  - `id` (uuid, PK)
  - `client_id` (uuid, FK to clients)
  - `content_topics` (text[]) - Preferred topics
  - `topics_to_avoid` (text[]) - Topics to avoid
  - `preferred_hashtags` (text[]) - Default hashtags
  - `default_cta` (text) - Default call-to-action
  - `posting_schedule` (jsonb) - Weekly schedule configuration
  - `timezone` (text) - Client timezone

  ### 7. activity_log
  Tracks all system activities
  - `id` (uuid, PK)
  - `client_id` (uuid, FK to clients)
  - `activity_type` (text) - Type: generation/approval/publish/error
  - `description` (text) - Activity description
  - `metadata` (jsonb) - Additional data
  - `created_at` (timestamptz)

  ## Security
  - RLS enabled on all tables
  - Policies restrict access based on user role and ownership
  - Clients can only access their own data
  - Agency users can access all client data
*/

-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Profiles table
CREATE TABLE IF NOT EXISTS profiles (
  id uuid PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  full_name text NOT NULL,
  avatar_url text,
  role text NOT NULL CHECK (role IN ('client', 'agency')) DEFAULT 'client',
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view own profile"
  ON profiles FOR SELECT
  TO authenticated
  USING (auth.uid() = id);

CREATE POLICY "Users can update own profile"
  ON profiles FOR UPDATE
  TO authenticated
  USING (auth.uid() = id)
  WITH CHECK (auth.uid() = id);

CREATE POLICY "Users can insert own profile"
  ON profiles FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = id);

-- Clients table
CREATE TABLE IF NOT EXISTS clients (
  id uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id uuid REFERENCES profiles(id) ON DELETE CASCADE,
  business_name text NOT NULL,
  industry text,
  website text,
  email text,
  phone text,
  logo_url text,
  plan text CHECK (plan IN ('starter', 'growth', 'pro', 'enterprise')) DEFAULT 'starter',
  status text CHECK (status IN ('active', 'warning', 'error', 'paused')) DEFAULT 'active',
  mrr numeric DEFAULT 0,
  primary_color text DEFAULT '#6366f1',
  secondary_color text DEFAULT '#8b5cf6',
  accent_color text DEFAULT '#ec4899',
  brand_voice text,
  brand_description text,
  target_audience text,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

ALTER TABLE clients ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Clients can view own data"
  ON clients FOR SELECT
  TO authenticated
  USING (
    user_id = auth.uid() OR
    EXISTS (SELECT 1 FROM profiles WHERE profiles.id = auth.uid() AND profiles.role = 'agency')
  );

CREATE POLICY "Agency can insert clients"
  ON clients FOR INSERT
  TO authenticated
  WITH CHECK (EXISTS (SELECT 1 FROM profiles WHERE profiles.id = auth.uid() AND profiles.role = 'agency'));

CREATE POLICY "Clients and agency can update"
  ON clients FOR UPDATE
  TO authenticated
  USING (
    user_id = auth.uid() OR
    EXISTS (SELECT 1 FROM profiles WHERE profiles.id = auth.uid() AND profiles.role = 'agency')
  )
  WITH CHECK (
    user_id = auth.uid() OR
    EXISTS (SELECT 1 FROM profiles WHERE profiles.id = auth.uid() AND profiles.role = 'agency')
  );

-- Content items table
CREATE TABLE IF NOT EXISTS content_items (
  id uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
  client_id uuid REFERENCES clients(id) ON DELETE CASCADE NOT NULL,
  type text NOT NULL,
  caption text,
  image_url text,
  video_url text,
  scheduled_for timestamptz,
  status text CHECK (status IN ('pending_approval', 'approved', 'rejected', 'published', 'failed')) DEFAULT 'pending_approval',
  platforms text[] DEFAULT '{}',
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now(),
  published_at timestamptz
);

ALTER TABLE content_items ENABLE ROW LEVEL SECURITY;

CREATE POLICY "View content based on client access"
  ON content_items FOR SELECT
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM clients
      WHERE clients.id = content_items.client_id
      AND (clients.user_id = auth.uid() OR EXISTS (SELECT 1 FROM profiles WHERE profiles.id = auth.uid() AND profiles.role = 'agency'))
    )
  );

CREATE POLICY "Agency can insert content"
  ON content_items FOR INSERT
  TO authenticated
  WITH CHECK (EXISTS (SELECT 1 FROM profiles WHERE profiles.id = auth.uid() AND profiles.role = 'agency'));

CREATE POLICY "Update content based on access"
  ON content_items FOR UPDATE
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM clients
      WHERE clients.id = content_items.client_id
      AND (clients.user_id = auth.uid() OR EXISTS (SELECT 1 FROM profiles WHERE profiles.id = auth.uid() AND profiles.role = 'agency'))
    )
  )
  WITH CHECK (
    EXISTS (
      SELECT 1 FROM clients
      WHERE clients.id = content_items.client_id
      AND (clients.user_id = auth.uid() OR EXISTS (SELECT 1 FROM profiles WHERE profiles.id = auth.uid() AND profiles.role = 'agency'))
    )
  );

-- Platform connections table
CREATE TABLE IF NOT EXISTS platform_connections (
  id uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
  client_id uuid REFERENCES clients(id) ON DELETE CASCADE NOT NULL,
  platform text NOT NULL CHECK (platform IN ('instagram', 'facebook', 'twitter', 'linkedin', 'youtube')),
  account_name text,
  account_id text,
  is_connected boolean DEFAULT false,
  connected_at timestamptz,
  access_token text,
  refresh_token text,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now(),
  UNIQUE(client_id, platform)
);

ALTER TABLE platform_connections ENABLE ROW LEVEL SECURITY;

CREATE POLICY "View platforms based on client access"
  ON platform_connections FOR SELECT
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM clients
      WHERE clients.id = platform_connections.client_id
      AND (clients.user_id = auth.uid() OR EXISTS (SELECT 1 FROM profiles WHERE profiles.id = auth.uid() AND profiles.role = 'agency'))
    )
  );

CREATE POLICY "Update platforms based on access"
  ON platform_connections FOR UPDATE
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM clients
      WHERE clients.id = platform_connections.client_id
      AND (clients.user_id = auth.uid() OR EXISTS (SELECT 1 FROM profiles WHERE profiles.id = auth.uid() AND profiles.role = 'agency'))
    )
  )
  WITH CHECK (
    EXISTS (
      SELECT 1 FROM clients
      WHERE clients.id = platform_connections.client_id
      AND (clients.user_id = auth.uid() OR EXISTS (SELECT 1 FROM profiles WHERE profiles.id = auth.uid() AND profiles.role = 'agency'))
    )
  );

CREATE POLICY "Insert platforms based on access"
  ON platform_connections FOR INSERT
  TO authenticated
  WITH CHECK (
    EXISTS (
      SELECT 1 FROM clients
      WHERE clients.id = platform_connections.client_id
      AND (clients.user_id = auth.uid() OR EXISTS (SELECT 1 FROM profiles WHERE profiles.id = auth.uid() AND profiles.role = 'agency'))
    )
  );

-- Analytics table
CREATE TABLE IF NOT EXISTS analytics (
  id uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
  content_id uuid REFERENCES content_items(id) ON DELETE CASCADE NOT NULL,
  platform text NOT NULL,
  likes integer DEFAULT 0,
  comments integer DEFAULT 0,
  shares integer DEFAULT 0,
  saves integer DEFAULT 0,
  reach integer DEFAULT 0,
  engagement_rate numeric DEFAULT 0,
  recorded_at timestamptz DEFAULT now()
);

ALTER TABLE analytics ENABLE ROW LEVEL SECURITY;

CREATE POLICY "View analytics based on content access"
  ON analytics FOR SELECT
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM content_items
      JOIN clients ON clients.id = content_items.client_id
      WHERE content_items.id = analytics.content_id
      AND (clients.user_id = auth.uid() OR EXISTS (SELECT 1 FROM profiles WHERE profiles.id = auth.uid() AND profiles.role = 'agency'))
    )
  );

-- Brand preferences table
CREATE TABLE IF NOT EXISTS brand_preferences (
  id uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
  client_id uuid REFERENCES clients(id) ON DELETE CASCADE NOT NULL UNIQUE,
  content_topics text[] DEFAULT '{}',
  topics_to_avoid text[] DEFAULT '{}',
  preferred_hashtags text[] DEFAULT '{}',
  default_cta text,
  posting_schedule jsonb DEFAULT '{}',
  timezone text DEFAULT 'America/New_York',
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

ALTER TABLE brand_preferences ENABLE ROW LEVEL SECURITY;

CREATE POLICY "View preferences based on client access"
  ON brand_preferences FOR SELECT
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM clients
      WHERE clients.id = brand_preferences.client_id
      AND (clients.user_id = auth.uid() OR EXISTS (SELECT 1 FROM profiles WHERE profiles.id = auth.uid() AND profiles.role = 'agency'))
    )
  );

CREATE POLICY "Update preferences based on access"
  ON brand_preferences FOR UPDATE
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM clients
      WHERE clients.id = brand_preferences.client_id
      AND (clients.user_id = auth.uid() OR EXISTS (SELECT 1 FROM profiles WHERE profiles.id = auth.uid() AND profiles.role = 'agency'))
    )
  )
  WITH CHECK (
    EXISTS (
      SELECT 1 FROM clients
      WHERE clients.id = brand_preferences.client_id
      AND (clients.user_id = auth.uid() OR EXISTS (SELECT 1 FROM profiles WHERE profiles.id = auth.uid() AND profiles.role = 'agency'))
    )
  );

CREATE POLICY "Insert preferences based on access"
  ON brand_preferences FOR INSERT
  TO authenticated
  WITH CHECK (
    EXISTS (
      SELECT 1 FROM clients
      WHERE clients.id = brand_preferences.client_id
      AND (clients.user_id = auth.uid() OR EXISTS (SELECT 1 FROM profiles WHERE profiles.id = auth.uid() AND profiles.role = 'agency'))
    )
  );

-- Activity log table
CREATE TABLE IF NOT EXISTS activity_log (
  id uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
  client_id uuid REFERENCES clients(id) ON DELETE CASCADE NOT NULL,
  activity_type text NOT NULL CHECK (activity_type IN ('generation', 'approval', 'publish', 'error', 'edit', 'rejection')),
  description text NOT NULL,
  metadata jsonb DEFAULT '{}',
  created_at timestamptz DEFAULT now()
);

ALTER TABLE activity_log ENABLE ROW LEVEL SECURITY;

CREATE POLICY "View activity based on client access"
  ON activity_log FOR SELECT
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM clients
      WHERE clients.id = activity_log.client_id
      AND (clients.user_id = auth.uid() OR EXISTS (SELECT 1 FROM profiles WHERE profiles.id = auth.uid() AND profiles.role = 'agency'))
    )
  );

CREATE POLICY "Insert activity"
  ON activity_log FOR INSERT
  TO authenticated
  WITH CHECK (
    EXISTS (
      SELECT 1 FROM clients
      WHERE clients.id = activity_log.client_id
      AND (clients.user_id = auth.uid() OR EXISTS (SELECT 1 FROM profiles WHERE profiles.id = auth.uid() AND profiles.role = 'agency'))
    )
  );

-- Create indexes for better query performance
CREATE INDEX IF NOT EXISTS idx_content_items_client_id ON content_items(client_id);
CREATE INDEX IF NOT EXISTS idx_content_items_status ON content_items(status);
CREATE INDEX IF NOT EXISTS idx_content_items_scheduled_for ON content_items(scheduled_for);
CREATE INDEX IF NOT EXISTS idx_analytics_content_id ON analytics(content_id);
CREATE INDEX IF NOT EXISTS idx_activity_log_client_id ON activity_log(client_id);
CREATE INDEX IF NOT EXISTS idx_activity_log_created_at ON activity_log(created_at DESC);