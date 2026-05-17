import { createServerFn } from '@tanstack/react-start'
import { getSupabaseAdmin } from '@/integrations/supabase/client.server'

export const submitContactForm = createServerFn({ method: 'POST' })
  .inputValidator((data: any) => data)
  .handler(async ({ data }) => {
    const supabase = getSupabaseAdmin()
    
    // Log the submission to Supabase or send an email
    const { error } = await (supabase as any)
      .from('contact_submissions')
      .insert([data])

    if (error) {
      console.error('Error submitting form:', error)
      throw new Error('Failed to submit form')
    }

    return { success: true }
  })
