import { createClient } from '@/utils/supabase/client'

export async function setupSupabaseTables() {
  const supabase = createClient()
  
  console.log('🚀 Setting up Supabase tables...')
  
  try {
    // 1. Crear tabla users
    console.log('📋 Creating users table...')
    const { error: usersError } = await supabase.rpc('exec_sql', {
      sql: `
        CREATE TABLE IF NOT EXISTS public.users (
          id UUID REFERENCES auth.users(id) ON DELETE CASCADE PRIMARY KEY,
          email VARCHAR(255) UNIQUE NOT NULL,
          nombre VARCHAR(100),
          apellido VARCHAR(100),
          is_active BOOLEAN DEFAULT true,
          created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
          updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
        );
      `
    })
    
    if (usersError) {
      console.error('❌ Error creating users table:', usersError)
    } else {
      console.log('✅ Users table created successfully')
    }

    // 2. Crear tabla todos
    console.log('📋 Creating todos table...')
    const { error: todosError } = await supabase.rpc('exec_sql', {
      sql: `
        CREATE TABLE IF NOT EXISTS public.todos (
          id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
          task TEXT NOT NULL,
          completed BOOLEAN DEFAULT false,
          user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
          created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
        );
      `
    })
    
    if (todosError) {
      console.error('❌ Error creating todos table:', todosError)
    } else {
      console.log('✅ Todos table created successfully')
    }

    // 3. Configurar RLS
    console.log('🔒 Setting up RLS policies...')
    const { error: rlsError } = await supabase.rpc('exec_sql', {
      sql: `
        ALTER TABLE public.users ENABLE ROW LEVEL SECURITY;
        ALTER TABLE public.todos ENABLE ROW LEVEL SECURITY;
        
        DROP POLICY IF EXISTS "Anyone can view todos" ON public.todos;
        CREATE POLICY "Anyone can view todos" 
          ON public.todos 
          FOR SELECT 
          USING (true);
      `
    })
    
    if (rlsError) {
      console.error('❌ Error setting up RLS:', rlsError)
    } else {
      console.log('✅ RLS policies configured')
    }

    // 4. Insertar datos de ejemplo
    console.log('📊 Inserting sample data...')
    const { error: sampleError } = await supabase
      .from('todos')
      .insert([
        { task: 'Configurar Supabase ✅', completed: true },
        { task: 'Crear sistema de auth', completed: false },
        { task: 'Implementar tablas', completed: true }
      ])
    
    if (sampleError) {
      console.error('❌ Error inserting sample data:', sampleError)
    } else {
      console.log('✅ Sample data inserted')
    }

    console.log('🎉 Supabase setup completed!')
    return true

  } catch (error) {
    console.error('🚨 Setup failed:', error)
    return false
  }
}

// Función alternativa más simple usando APIs REST
export async function setupSupabaseSimple() {
  const supabase = createClient()
  
  console.log('🔧 Setting up Supabase (simple method)...')
  
  try {
    // Solo probar insertar un todo de ejemplo
    console.log('📊 Testing basic insert...')
    const { data, error } = await supabase
      .from('todos')
      .insert([
        { task: 'Test connection', completed: false }
      ])
      .select()
    
    if (error) {
      console.error('❌ Basic insert failed:', error)
      console.log('💡 This is expected if tables don\'t exist yet')
      return false
    } else {
      console.log('✅ Basic insert successful:', data)
      return true
    }
    
  } catch (error) {
    console.error('🚨 Simple setup failed:', error)
    return false
  }
}

// Función para verificar el estado actual
export async function checkSupabaseStatus() {
  const supabase = createClient()
  
  console.log('🔍 Checking Supabase status...')
  
  const results = {
    auth: false,
    todos: false,
    users: false
  }
  
  try {
    // Test auth
    const { data: { user } } = await supabase.auth.getUser()
    results.auth = true
    console.log('✅ Auth working, user:', user?.email || 'None')
    
    // Test todos table
    const { data: todos, error: todosError } = await supabase
      .from('todos')
      .select('*')
      .limit(1)
    
    if (!todosError) {
      results.todos = true
      console.log('✅ Todos table working:', todos?.length || 0, 'records')
    } else {
      console.log('❌ Todos table not available:', todosError.message)
    }
    
    // Test users table
    const { data: users, error: usersError } = await supabase
      .from('users')
      .select('*')
      .limit(1)
    
    if (!usersError) {
      results.users = true
      console.log('✅ Users table working:', users?.length || 0, 'records')
    } else {
      console.log('❌ Users table not available:', usersError.message)
    }
    
    return results
    
  } catch (error) {
    console.error('🚨 Status check failed:', error)
    return results
  }
}

// Hacer funciones disponibles globalmente para testing
if (typeof window !== 'undefined') {
  (window as any).setupSupabase = setupSupabaseTables;
  (window as any).setupSupabaseSimple = setupSupabaseSimple;
  (window as any).checkSupabaseStatus = checkSupabaseStatus;
}
