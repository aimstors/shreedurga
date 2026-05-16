import { createClient } from '@supabase/supabase-js'
import type { Database } from './types.ts'

export const getSupabaseAdmin = () => {
  const supabaseUrl = process.env.SUPABASE_URL ?? ''
  const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY ?? ''
  
  if (!supabaseUrl || !supabaseServiceKey) {
    throw new Error('Missing Supabase server-side environment variables')
  }

  return createClient<Database>(supabaseUrl, supabaseServiceKey, {
    auth: {
      autoRefreshToken: false,
      persistSession: false
    }
  })
}
