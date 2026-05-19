import { createServerFn } from '@tanstack/react-start'
import { getSupabaseAdmin } from '@/integrations/supabase/client.server'

export const submitContactForm = createServerFn({ method: 'POST' })
  .inputValidator((data: any) => data)
  .handler(async ({ data }) => {
    const supabase = getSupabaseAdmin()

    const payload = {
      first_name: String(data.firstName ?? data.first_name ?? '').slice(0, 200),
      last_name: String(data.lastName ?? data.last_name ?? '').slice(0, 200) || null,
      phone: String(data.phone ?? '').slice(0, 50),
      email: data.email ? String(data.email).slice(0, 200) : null,
      message: data.message ? String(data.message).slice(0, 4000) : null,
    }

    if (!payload.first_name || !payload.phone) {
      throw new Error('Name and phone are required')
    }

    const { error } = await (supabase as any)
      .from('contact_submissions')
      .insert([payload])

    if (error) {
      console.error('Error submitting form:', error)
      throw new Error('Failed to submit form')
    }

    return { success: true }
  })
