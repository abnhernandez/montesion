-- RLS policies for community tables (use with caution; review before applying in production)

-- Enable RLS and create policies so only authenticated users can insert, and only owners can modify/delete their content.

-- Messages
ALTER TABLE IF EXISTS comunidad_messages ENABLE ROW LEVEL SECURITY;
DROP POLICY IF EXISTS "select_messages_authenticated" ON comunidad_messages;
CREATE POLICY "select_messages_authenticated" ON comunidad_messages FOR SELECT USING (auth.uid() IS NOT NULL);
DROP POLICY IF EXISTS "insert_own_message" ON comunidad_messages;
CREATE POLICY "insert_own_message" ON comunidad_messages FOR INSERT WITH CHECK (user_id = auth.uid());
DROP POLICY IF EXISTS "delete_own_message" ON comunidad_messages;
CREATE POLICY "delete_own_message" ON comunidad_messages FOR DELETE USING (user_id = auth.uid());

-- Posts
ALTER TABLE IF EXISTS comunidad_posts ENABLE ROW LEVEL SECURITY;
DROP POLICY IF EXISTS "select_posts_authenticated" ON comunidad_posts;
CREATE POLICY "select_posts_authenticated" ON comunidad_posts FOR SELECT USING (auth.uid() IS NOT NULL);
DROP POLICY IF EXISTS "insert_own_post" ON comunidad_posts;
CREATE POLICY "insert_own_post" ON comunidad_posts FOR INSERT WITH CHECK (user_id = auth.uid());
DROP POLICY IF EXISTS "delete_own_post" ON comunidad_posts;
CREATE POLICY "delete_own_post" ON comunidad_posts FOR DELETE USING (user_id = auth.uid());

-- Comments
ALTER TABLE IF EXISTS comunidad_comments ENABLE ROW LEVEL SECURITY;
DROP POLICY IF EXISTS "select_comments_authenticated" ON comunidad_comments;
CREATE POLICY "select_comments_authenticated" ON comunidad_comments FOR SELECT USING (auth.uid() IS NOT NULL);
DROP POLICY IF EXISTS "insert_own_comment" ON comunidad_comments;
CREATE POLICY "insert_own_comment" ON comunidad_comments FOR INSERT WITH CHECK (user_id = auth.uid());
DROP POLICY IF EXISTS "delete_own_comment" ON comunidad_comments;
CREATE POLICY "delete_own_comment" ON comunidad_comments FOR DELETE USING (user_id = auth.uid());

-- Signaling (for demo) - allow inserts from authenticated users and selects for authenticated
ALTER TABLE IF EXISTS comunidad_webrtc_signals ENABLE ROW LEVEL SECURITY;
DROP POLICY IF EXISTS "select_signals_authenticated" ON comunidad_webrtc_signals;
CREATE POLICY "select_signals_authenticated" ON comunidad_webrtc_signals FOR SELECT USING (auth.uid() IS NOT NULL);
DROP POLICY IF EXISTS "insert_signals_authenticated" ON comunidad_webrtc_signals;
CREATE POLICY "insert_signals_authenticated" ON comunidad_webrtc_signals FOR INSERT WITH CHECK (sender_id = auth.uid());

-- Note: After applying, test with a real authenticated session. Adjust policies for moderators/admins as needed.
