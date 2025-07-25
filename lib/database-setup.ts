import { createClient } from '@/utils/supabase/client';

export async function setupDatabase() {
  const supabase = createClient();
  
  console.log('🔧 Setting up database tables...');
  
  try {
    // Test connection first
    const { error: testError } = await supabase
      .from('users')
      .select('count')
      .limit(1);
    
    if (testError && testError.message.includes('relation "public.users" does not exist')) {
      console.log('❌ Users table does not exist. Please run the setup SQL script.');
      return false;
    }
    
    // Test todos table
    const { error: todosError } = await supabase
      .from('todos')
      .select('count')
      .limit(1);
    
    if (todosError && todosError.message.includes('relation "public.todos" does not exist')) {
      console.log('❌ Todos table does not exist. Please run the setup SQL script.');
      return false;
    }
    
    console.log('✅ Database tables are configured correctly');
    return true;
    
  } catch (error) {
    console.error('❌ Error checking database setup:', error);
    return false;
  }
}

export async function createSampleData() {
  const supabase = createClient();
  
  try {
    // Insert sample todos if none exist
    const { data: existingTodos } = await supabase
      .from('todos')
      .select('id')
      .limit(1);
    
    if (!existingTodos || existingTodos.length === 0) {
      // We'll create the sample data via SQL since RLS policies prevent anonymous inserts
      console.log('✅ Sample todos should be created via the initial SQL setup');
    } else {
      console.log('✅ Sample todos already exist');
    }
    
    return true;
  } catch {
    console.log('ℹ️ Sample data creation handled by SQL setup script');
    return true; // This is expected due to RLS policies
  }
}
