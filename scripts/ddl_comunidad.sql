-- DDL for Community features: chat rooms, messages, posts, comments
-- Run this in Supabase SQL editor or psql as a service role if needed.

CREATE EXTENSION IF NOT EXISTS pgcrypto;

-- chat rooms
CREATE TABLE IF NOT EXISTS comunidad_chat_rooms (
  id text PRIMARY KEY,
  title text,
  is_public boolean DEFAULT true,
  created_at timestamptz DEFAULT now()
);

-- messages
CREATE TABLE IF NOT EXISTS comunidad_messages (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  room_id text NOT NULL REFERENCES comunidad_chat_rooms(id) ON DELETE CASCADE,
  user_id text NOT NULL,
  content text,
  metadata jsonb,
  created_at timestamptz DEFAULT now()
);

-- posts (feed)
CREATE TABLE IF NOT EXISTS comunidad_posts (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id text NOT NULL,
  content text,
  image_path text,
  likes integer DEFAULT 0,
  created_at timestamptz DEFAULT now()
);

-- comments
CREATE TABLE IF NOT EXISTS comunidad_comments (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  post_id uuid NOT NULL REFERENCES comunidad_posts(id) ON DELETE CASCADE,
  user_id text NOT NULL,
  content text,
  created_at timestamptz DEFAULT now()
);

-- Indexes to help queries
CREATE INDEX IF NOT EXISTS idx_comunidad_messages_room_created_at ON comunidad_messages(room_id, created_at DESC);
CREATE INDEX IF NOT EXISTS idx_comunidad_posts_created_at ON comunidad_posts(created_at DESC);

-- Optional: create a storage bucket named 'comunidad' in Supabase UI for images.

-- Example seed room
INSERT INTO comunidad_chat_rooms (id, title) VALUES ('general', 'Sala General') ON CONFLICT (id) DO NOTHING;

-- WebRTC signaling table for exchanging SDP and ICE via the DB (used for demos)
CREATE TABLE IF NOT EXISTS comunidad_webrtc_signals (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  room_id text NOT NULL,
  sender_id text NOT NULL,
  type text NOT NULL,
  payload jsonb,
  created_at timestamptz DEFAULT now()
);

CREATE INDEX IF NOT EXISTS idx_comunidad_webrtc_room_created_at ON comunidad_webrtc_signals(room_id, created_at DESC);
