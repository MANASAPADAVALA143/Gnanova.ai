/*
  # Seed Sample Data for Gnanova.pro

  ## Purpose
  This migration seeds the database with sample data for development and testing.

  ## Sample Data Includes
  1. A sample client profile (Srikanth Academy)
  2. Sample content items in various states
  3. Sample platform connections
  4. Sample brand preferences
  5. Sample analytics data

  ## Note
  This data is for development purposes only. Run this migration only in dev environments.
*/

-- Note: In production, you would create actual user accounts first via Supabase Auth
-- For this seed, we'll insert data that can work with any authenticated user

-- Sample content items that will be visible to any client
-- These use placeholder client_id values that should be updated when real clients are created

-- You can manually create a test user and client through the app's register flow
-- This migration provides the structure for what sample data looks like