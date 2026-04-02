import { createClient } from '@/utils/supabase/client'

// Backward-compatible export used by older components.
export const supabase = createClient()