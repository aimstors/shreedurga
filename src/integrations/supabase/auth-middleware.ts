import { supabase } from './client'

export const requireSupabaseAuth = async () => {
  const { data: { session } } = await supabase.auth.getSession()
  if (!session) throw new Error('Unauthorized')
  return session
}
