import { createClient } from '@/utils/supabase/client';

// Shared browser client instance for legacy imports in the codebase.
export const supabase = createClient();