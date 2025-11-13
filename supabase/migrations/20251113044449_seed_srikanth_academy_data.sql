/*
  # Seed Srikanth Academy Data
  
  1. Seed Data
    - Create Srikanth Academy client
    - Add brand preferences for international physics education
    - Create sample content items across different curricula
    - Add platform connections
    - Create sample analytics data
*/

-- Insert Srikanth Academy client (only if not exists)
INSERT INTO clients (
  id,
  business_name,
  slug,
  tagline,
  industry,
  email,
  instagram_handle,
  youtube_handle,
  facebook_handle,
  plan,
  status,
  mrr,
  primary_color,
  secondary_color,
  accent_color,
  brand_voice,
  brand_description,
  target_audience
) VALUES (
  'a0eebc99-9c0b-4ef8-bb6d-6bb9bd380a11',
  'Srikanth Academy',
  'srikanth-academy',
  'International Physics Education',
  'Education - Physics',
  'info@srikanthacademy.com',
  '@srikanthphysics',
  '@SrikanthAcademyPhysics',
  '@SrikanthAcademy',
  'pro',
  'active',
  299.00,
  '#3B82F6',
  '#8B5CF6',
  '#F59E0B',
  'Educational, enthusiastic, and encouraging. We make physics accessible and exciting for students worldwide.',
  'International physics coaching institute helping students excel in AP Physics, IIT-JEE, NEET, IB, IGCSE, and A-Levels.',
  'Global students (USA, UK, UAE, India, Singapore) preparing for international physics exams across different curricula'
)
ON CONFLICT (id) DO NOTHING;

-- Insert brand preferences for Srikanth Academy
INSERT INTO brand_preferences (
  client_id,
  active_curricula,
  content_topics,
  difficulty_distribution,
  content_mix,
  topic_priorities,
  preferred_hashtags,
  default_cta,
  timezone
) VALUES (
  'a0eebc99-9c0b-4ef8-bb6d-6bb9bd380a11',
  ARRAY['AP Physics', 'IIT-JEE', 'NEET', 'IB Physics'],
  ARRAY['Kinematics', 'Dynamics', 'Electromagnetism', 'Thermodynamics', 'Modern Physics'],
  '{"easy": 30, "medium": 50, "hard": 20}'::jsonb,
  '{"quiz": 40, "video": 30, "reel": 20, "tip": 10}'::jsonb,
  ARRAY['Mechanics', 'Electromagnetism', 'Modern Physics'],
  ARRAY['#APPhysics', '#Physics', '#IIT JEE', '#NEET', '#IBPhysics', '#PhysicsEducation'],
  'Comment your answer below! 👇',
  'America/New_York'
)
ON CONFLICT (client_id) DO UPDATE SET
  active_curricula = EXCLUDED.active_curricula,
  content_topics = EXCLUDED.content_topics,
  difficulty_distribution = EXCLUDED.difficulty_distribution,
  content_mix = EXCLUDED.content_mix,
  topic_priorities = EXCLUDED.topic_priorities;

-- Insert platform connections
INSERT INTO platform_connections (
  client_id,
  platform,
  account_name,
  is_connected,
  connected_at
) VALUES
  ('a0eebc99-9c0b-4ef8-bb6d-6bb9bd380a11', 'instagram', '@srikanthphysics', true, now()),
  ('a0eebc99-9c0b-4ef8-bb6d-6bb9bd380a11', 'youtube', 'Srikanth Academy Physics', true, now()),
  ('a0eebc99-9c0b-4ef8-bb6d-6bb9bd380a11', 'facebook', 'Srikanth Academy', false, null)
ON CONFLICT (client_id, platform) DO UPDATE SET
  account_name = EXCLUDED.account_name,
  is_connected = EXCLUDED.is_connected;

-- Insert sample content items
INSERT INTO content_items (
  client_id,
  curriculum,
  difficulty,
  topic,
  content_type_detail,
  type,
  caption,
  scheduled_for,
  status,
  platforms,
  tags,
  metadata
) VALUES
  -- Pending approvals
  (
    'a0eebc99-9c0b-4ef8-bb6d-6bb9bd380a11',
    'AP Physics',
    'medium',
    'Projectile Motion',
    'quiz',
    'instagram_reel',
    '⚡ AP Physics Challenge! A ball is thrown at 30 m/s at 45°. How far does it travel? A) 90m B) 92m C) 45m D) 60m 🤔 Comment your answer! #APPhysics #Physics #ProjectileMotion',
    now() + interval '6 hours',
    'pending_approval',
    ARRAY['instagram', 'youtube'],
    ARRAY['ap-physics', 'mechanics', 'projectile-motion'],
    '{"question_number": 47, "correct_answer": "B"}'::jsonb
  ),
  (
    'a0eebc99-9c0b-4ef8-bb6d-6bb9bd380a11',
    'IIT-JEE',
    'hard',
    'Circular Motion',
    'reel',
    'instagram_reel',
    '🎯 JEE Advanced Problem! A particle moves in a circle of radius 5m. Find the centripetal acceleration when velocity is 10 m/s. Tag a friend preparing for JEE! 🚀 #IITJEE #JEE2025 #Physics',
    now() + interval '1 day' + interval '6 hours',
    'pending_approval',
    ARRAY['instagram', 'youtube'],
    ARRAY['iit-jee', 'circular-motion', 'mechanics'],
    '{"difficulty_level": "jee-advanced", "topic_chapter": "circular-motion"}'::jsonb
  ),
  (
    'a0eebc99-9c0b-4ef8-bb6d-6bb9bd380a11',
    'NEET',
    'easy',
    'Newton''s Laws',
    'concept',
    'youtube_short',
    '💡 NEET Physics Concept: Newton''s Second Law explained in 60 seconds! Force = Mass × Acceleration. Save this for your revision! 📚 #NEET #NEETPhysics #NewtonsLaws',
    now() + interval '2 days',
    'pending_approval',
    ARRAY['youtube', 'instagram'],
    ARRAY['neet', 'newtons-laws', 'mechanics'],
    '{"concept_type": "fundamental", "chapter": "laws-of-motion"}'::jsonb
  ),
  (
    'a0eebc99-9c0b-4ef8-bb6d-6bb9bd380a11',
    'AP Physics',
    'medium',
    'Electrostatics',
    'quiz',
    'instagram_post',
    '🔋 AP Physics Quiz: Two charges of +2μC and -2μC are 10cm apart. Calculate the electric field at the midpoint. Think you know? Drop your answer! ⚡ #APPhysics #Electricity',
    now() + interval '3 days',
    'pending_approval',
    ARRAY['instagram'],
    ARRAY['ap-physics', 'electrostatics', 'electricity'],
    '{"quiz_type": "calculation", "topic_difficulty": "medium"}'::jsonb
  ),
  (
    'a0eebc99-9c0b-4ef8-bb6d-6bb9bd380a11',
    'IB Physics',
    'medium',
    'Waves',
    'video',
    'youtube_video',
    '🌊 IB Physics: Understanding Wave Interference! Complete explanation with examples and practice problems. Perfect for your IB exam prep! 🎓 #IBPhysics #Waves #Physics',
    now() + interval '4 days',
    'pending_approval',
    ARRAY['youtube'],
    ARRAY['ib-physics', 'waves', 'interference'],
    '{"video_length": "8:30", "topic_unit": "wave-phenomena"}'::jsonb
  ),
  
  -- Published content with analytics
  (
    'a0eebc99-9c0b-4ef8-bb6d-6bb9bd380a11',
    'AP Physics',
    'medium',
    'Newton''s Laws',
    'quiz',
    'instagram_reel',
    '⚡ AP Physics Challenge! A 5kg block slides down a frictionless incline at 30°. What''s the acceleration? Comment your answer! 🎯 #APPhysics #NewtonsLaws',
    now() - interval '2 days',
    'published',
    ARRAY['instagram', 'youtube'],
    ARRAY['ap-physics', 'newtons-laws', 'mechanics'],
    '{"quiz_number": 44, "correct_answer": "4.9 m/s²"}'::jsonb
  ),
  (
    'a0eebc99-9c0b-4ef8-bb6d-6bb9bd380a11',
    'IIT-JEE',
    'hard',
    'Circular Motion',
    'reel',
    'instagram_reel',
    '🎯 JEE Trick Alert! Quick method to solve circular motion problems in 10 seconds! Save this for your exam! 🚀 #IITJEE #CircularMotion #PhysicsTricks',
    now() - interval '3 days',
    'published',
    ARRAY['instagram', 'youtube'],
    ARRAY['iit-jee', 'circular-motion', 'tricks'],
    '{"trick_type": "shortcut", "topic_difficulty": "jee-advanced"}'::jsonb
  ),
  (
    'a0eebc99-9c0b-4ef8-bb6d-6bb9bd380a11',
    'NEET',
    'easy',
    'Free Body Diagrams',
    'video',
    'youtube_short',
    '📊 NEET Physics: Master Free Body Diagrams in 60 seconds! Essential concept for mechanics problems. Like if this helped! 💙 #NEET #Physics #FBD',
    now() - interval '4 days',
    'published',
    ARRAY['youtube', 'instagram'],
    ARRAY['neet', 'fbd', 'mechanics'],
    '{"video_type": "tutorial", "duration": "60s"}'::jsonb
  ),
  (
    'a0eebc99-9c0b-4ef8-bb6d-6bb9bd380a11',
    'AP Physics',
    'easy',
    'Kinematics',
    'tip',
    'instagram_post',
    '💡 AP Physics Study Tip: Always list your knowns and unknowns before solving kinematics! This simple habit prevents silly mistakes. Share with your classmates! 📝 #APPhysics #StudyTips',
    now() - interval '5 days',
    'published',
    ARRAY['instagram'],
    ARRAY['ap-physics', 'study-tips', 'kinematics'],
    '{"tip_category": "problem-solving", "target_exam": "ap-physics-1"}'::jsonb
  ),
  (
    'a0eebc99-9c0b-4ef8-bb6d-6bb9bd380a11',
    'IB Physics',
    'medium',
    'Energy Conservation',
    'quiz',
    'instagram_reel',
    '⚡ IB Physics: A 2kg ball drops from 10m height. What''s its velocity at ground? (g=10 m/s²) Tag your study buddy! 🎓 #IBPhysics #Energy',
    now() - interval '6 days',
    'published',
    ARRAY['instagram'],
    ARRAY['ib-physics', 'energy', 'conservation'],
    '{"quiz_difficulty": "sl", "correct_answer": "14.1 m/s"}'::jsonb
  ),
  (
    'a0eebc99-9c0b-4ef8-bb6d-6bb9bd380a11',
    'AP Physics',
    'hard',
    'Momentum',
    'quiz',
    'instagram_reel',
    '🎯 Challenging AP Physics Problem! Two objects collide elastically. Object A (3kg, 5m/s) hits stationary B (2kg). Find final velocities! Think you got this? 🤔 #APPhysics #Momentum',
    now() - interval '7 days',
    'published',
    ARRAY['instagram', 'youtube'],
    ARRAY['ap-physics', 'momentum', 'collisions'],
    '{"difficulty": "challenging", "topic": "elastic-collisions"}'::jsonb
  ),
  (
    'a0eebc99-9c0b-4ef8-bb6d-6bb9bd380a11',
    'IIT-JEE',
    'medium',
    'Rotational Motion',
    'video',
    'youtube_short',
    '🔄 JEE Main Concept: Moment of Inertia made simple! Understand the parallel axis theorem with examples. Save for quick revision! 📖 #IITJEE #Rotation',
    now() - interval '8 days',
    'published',
    ARRAY['youtube'],
    ARRAY['iit-jee', 'rotation', 'moment-of-inertia'],
    '{"concept_level": "jee-main", "chapter": "rotational-mechanics"}'::jsonb
  );

-- Get content IDs for analytics (using the published ones)
DO $$
DECLARE
  content_record RECORD;
BEGIN
  FOR content_record IN 
    SELECT id FROM content_items 
    WHERE client_id = 'a0eebc99-9c0b-4ef8-bb6d-6bb9bd380a11' 
    AND status = 'published'
    LIMIT 7
  LOOP
    -- Insert analytics for Instagram
    INSERT INTO analytics (
      content_id,
      platform,
      likes,
      comments,
      shares,
      saves,
      reach,
      engagement_rate
    ) VALUES (
      content_record.id,
      'instagram',
      floor(random() * 200 + 150)::integer,
      floor(random() * 60 + 30)::integer,
      floor(random() * 40 + 10)::integer,
      floor(random() * 80 + 20)::integer,
      floor(random() * 3000 + 2000)::integer,
      (random() * 3 + 3.5)::numeric(5,2)
    );
  END LOOP;
END $$;
