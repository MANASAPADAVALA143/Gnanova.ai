import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error('Missing Supabase environment variables');
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

export type Profile = {
  id: string;
  full_name: string;
  avatar_url: string | null;
  role: 'client' | 'agency';
  created_at: string;
  updated_at: string;
};

export type Client = {
  id: string;
  user_id: string | null;
  business_name: string;
  industry: string | null;
  website: string | null;
  email: string | null;
  phone: string | null;
  logo_url: string | null;
  plan: 'starter' | 'growth' | 'pro' | 'enterprise';
  status: 'active' | 'warning' | 'error' | 'paused';
  mrr: number;
  primary_color: string;
  secondary_color: string;
  accent_color: string;
  brand_voice: string | null;
  brand_description: string | null;
  target_audience: string | null;
  created_at: string;
  updated_at: string;
};

export type ContentItem = {
  id: string;
  client_id: string;
  type: string;
  caption: string | null;
  image_url: string | null;
  video_url: string | null;
  scheduled_for: string | null;
  status: 'pending_approval' | 'approved' | 'rejected' | 'published' | 'failed';
  platforms: string[];
  created_at: string;
  updated_at: string;
  published_at: string | null;
};

export type PlatformConnection = {
  id: string;
  client_id: string;
  platform: 'instagram' | 'facebook' | 'twitter' | 'linkedin' | 'youtube';
  account_name: string | null;
  account_id: string | null;
  is_connected: boolean;
  connected_at: string | null;
  created_at: string;
  updated_at: string;
};

export type Analytics = {
  id: string;
  content_id: string;
  platform: string;
  likes: number;
  comments: number;
  shares: number;
  saves: number;
  reach: number;
  engagement_rate: number;
  recorded_at: string;
};

export type BrandPreferences = {
  id: string;
  client_id: string;
  content_topics: string[];
  topics_to_avoid: string[];
  preferred_hashtags: string[];
  default_cta: string | null;
  posting_schedule: Record<string, any>;
  timezone: string;
  created_at: string;
  updated_at: string;
};

export type ActivityLog = {
  id: string;
  client_id: string;
  activity_type: 'generation' | 'approval' | 'publish' | 'error' | 'edit' | 'rejection';
  description: string;
  metadata: Record<string, any>;
  created_at: string;
};
