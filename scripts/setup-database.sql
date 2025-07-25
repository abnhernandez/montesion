-- ================================
-- MONTESION DATABASE SETUP
-- ================================

-- Create the users table
CREATE TABLE IF NOT EXISTS public.users (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    email VARCHAR(255) UNIQUE NOT NULL,
    nombre VARCHAR(100) NOT NULL,
    apellido VARCHAR(100) NOT NULL,
    is_active BOOLEAN DEFAULT true,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create the todos table
CREATE TABLE IF NOT EXISTS public.todos (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    task TEXT NOT NULL,
    completed BOOLEAN DEFAULT false,
    user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create the prayer_requests table
CREATE TABLE IF NOT EXISTS public.prayer_requests (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    ticket INTEGER UNIQUE NOT NULL,
    nombre VARCHAR(100) NOT NULL,
    correo_electronico VARCHAR(255) NOT NULL,
    asunto VARCHAR(200) NOT NULL,
    peticion TEXT NOT NULL,
    status VARCHAR(50) DEFAULT 'pending',
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    processed_at TIMESTAMP WITH TIME ZONE
);

-- Create the newsletter_subscriptions table
CREATE TABLE IF NOT EXISTS public.newsletter_subscriptions (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    email VARCHAR(255) UNIQUE NOT NULL,
    subscribed_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    is_active BOOLEAN DEFAULT true,
    unsubscribe_token VARCHAR(255) UNIQUE
);

-- ================================
-- ENABLE ROW LEVEL SECURITY
-- ================================

ALTER TABLE public.users ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.todos ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.prayer_requests ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.newsletter_subscriptions ENABLE ROW LEVEL SECURITY;

-- ================================
-- CREATE POLICIES
-- ================================

-- Users policies
CREATE POLICY IF NOT EXISTS "Users can view own profile" 
    ON public.users FOR SELECT 
    USING (auth.uid() = id);

CREATE POLICY IF NOT EXISTS "Users can update own profile" 
    ON public.users FOR UPDATE 
    USING (auth.uid() = id);

CREATE POLICY IF NOT EXISTS "Users can insert own profile" 
    ON public.users FOR INSERT 
    WITH CHECK (auth.uid() = id);

-- Todos policies
CREATE POLICY IF NOT EXISTS "Users can manage own todos" 
    ON public.todos FOR ALL 
    USING (auth.uid() = user_id)
    WITH CHECK (auth.uid() = user_id);

-- Prayer requests policies (public for creation, authenticated for viewing)
CREATE POLICY IF NOT EXISTS "Anyone can create prayer requests" 
    ON public.prayer_requests FOR INSERT 
    WITH CHECK (true);

CREATE POLICY IF NOT EXISTS "Authenticated users can view prayer requests" 
    ON public.prayer_requests FOR SELECT 
    USING (auth.role() = 'authenticated');

-- Newsletter policies (public for subscription)
CREATE POLICY IF NOT EXISTS "Anyone can subscribe to newsletter" 
    ON public.newsletter_subscriptions FOR INSERT 
    WITH CHECK (true);

-- ================================
-- CREATE FUNCTIONS
-- ================================

-- Function to update timestamp
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ language 'plpgsql';

-- Trigger for users table
DROP TRIGGER IF EXISTS update_users_updated_at ON public.users;
CREATE TRIGGER update_users_updated_at 
    BEFORE UPDATE ON public.users 
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- Function to create sequence for prayer request tickets
CREATE SEQUENCE IF NOT EXISTS prayer_request_ticket_seq START 1000;

-- Function to automatically assign ticket numbers
CREATE OR REPLACE FUNCTION assign_prayer_ticket()
RETURNS TRIGGER AS $$
BEGIN
    IF NEW.ticket IS NULL THEN
        NEW.ticket := nextval('prayer_request_ticket_seq');
    END IF;
    RETURN NEW;
END;
$$ language 'plpgsql';

-- Trigger for prayer requests
DROP TRIGGER IF EXISTS assign_prayer_ticket_trigger ON public.prayer_requests;
CREATE TRIGGER assign_prayer_ticket_trigger
    BEFORE INSERT ON public.prayer_requests
    FOR EACH ROW EXECUTE FUNCTION assign_prayer_ticket();

-- ================================
-- INSERT SAMPLE DATA
-- ================================

-- Insert sample todos (only if the table is empty)
INSERT INTO public.todos (task, completed, user_id) 
SELECT 'Setup Supabase database', true, NULL
WHERE NOT EXISTS (SELECT 1 FROM public.todos);

INSERT INTO public.todos (task, completed, user_id) 
SELECT 'Configure authentication', false, NULL
WHERE NOT EXISTS (SELECT 1 FROM public.todos WHERE task = 'Configure authentication');

INSERT INTO public.todos (task, completed, user_id) 
SELECT 'Test prayer requests system', false, NULL
WHERE NOT EXISTS (SELECT 1 FROM public.todos WHERE task = 'Test prayer requests system');

COMMIT;
