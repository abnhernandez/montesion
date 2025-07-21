import { createClient } from '@/utils/supabase/client'

export async function testSupabaseConnection() {
  const supabase = createClient()
  
  try {
    // Test basic connection
    console.log('🔗 Testing Supabase connection...')
    const { data: { user } } = await supabase.auth.getUser()
    console.log('✅ Auth working, current user:', user?.email || 'None')
    
    // Test if tables exist
    console.log('📋 Testing tables...')
    
    // Test todos table (should work)
    const { data: todos, error: todosError } = await supabase
      .from('todos')
      .select('*')
      .limit(1)
    
    if (todosError) {
      console.error('❌ Todos table error:', todosError)
    } else {
      console.log('✅ Todos table working:', todos?.length || 0, 'records')
    }
    
    // Test users table (might not exist)
    const { data: users, error: usersError } = await supabase
      .from('users')
      .select('*')
      .limit(1)
    
    if (usersError) {
      console.error('❌ Users table error:', usersError)
    } else {
      console.log('✅ Users table working:', users?.length || 0, 'records')
    }
    
    // Test auth.users (built-in table)
    const { data: authUsers, error: authError } = await supabase
      .from('auth.users')
      .select('*')
      .limit(1)
    
    if (authError) {
      console.error('❌ Auth.users error:', authError)
    } else {
      console.log('✅ Auth.users accessible')
    }
    
  } catch (error) {
    console.error('🚨 Connection test failed:', error)
  }
}

// Test function that can be called from console
if (typeof window !== 'undefined') {
  (window as any).testSupabase = testSupabaseConnection
}
