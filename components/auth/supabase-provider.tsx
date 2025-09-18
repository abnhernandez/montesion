'use client'

import { createContext, useContext, useState } from 'react'
import { createBrowserSupabaseClient } from '@supabase/auth-helpers-nextjs'
import { type SupabaseClient } from '@supabase/auth-helpers-nextjs'
import { type Session } from '@supabase/auth-helpers-nextjs'

type SupabaseContextType = {
  supabase: SupabaseClient
  session: Session | null
}

const SupabaseContext = createContext<SupabaseContextType | undefined>(undefined)

export default function SupabaseProvider({ 
  children,
  session
}: { 
  children: React.ReactNode
  session: Session | null
}) {
  const [supabase] = useState(() => createBrowserSupabaseClient())

  return (
    <SupabaseContext.Provider value={{ supabase, session }}>
      {children}
    </SupabaseContext.Provider>
  )
}

export const useSupabase = () => {
  const context = useContext(SupabaseContext)
  if (context === undefined) {
    throw new Error('useSupabase must be used inside SupabaseProvider')
  }
  return context
}