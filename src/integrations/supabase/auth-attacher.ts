import { supabase } from './client'

export const attachSupabaseAuth = (headers: Headers) => {
  const session = supabase.auth.getSession()
  // logic to attach session token to headers for server functions if needed
  return headers
}
