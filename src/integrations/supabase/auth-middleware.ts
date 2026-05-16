import { redirect } from '@tanstack/react-router'
import { supabase } from './client'

export const requireSupabaseAuth = async () => {
  const { data: { session } } = await supabase.auth.getSession()
  
  if (!session) {
    throw redirect({
      to: '/auth',
      search: {
        redirect: window.location.pathname,
      },
    })
  }

  return session
}
