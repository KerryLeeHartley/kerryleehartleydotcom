import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!

export const supabase = createClient(supabaseUrl, supabaseAnonKey)

// Database Types
export type Funnel = {
  id: string
  created_at: string
  updated_at: string
  name: string
  slug: string
  funnel_type: 'first-time-buyer' | 'builder' | 'luxury' | 'fix-flip' | 'referral'
  status: 'draft' | 'published' | 'archived'
  colors: {
    primary: string
    secondary: string
    accent1: string
    accent2: string
    neutral: string
    text: string
  }
  fonts: {
    heading: string
    body: string
  }
  analytics_ids: {
    gtm?: string
    ga?: string
    fb_pixel?: string
    linkedin?: string
    pinterest?: string
  }
  settings: {
    video_url: string
    course_url: string
    headline: string
    subheadline: string
  }
}

export type Lead = {
  id: string
  created_at: string
  email: string
  name: string
  phone?: string
  funnel_id: string
  page_id?: string
  utm_source?: string
  utm_medium?: string
  utm_campaign?: string
  utm_content?: string
  utm_term?: string
  status: 'new' | 'contacted' | 'qualified' | 'unqualified'
  metadata?: Record<string, any>
}

export type Event = {
  id: string
  created_at: string
  event_type: 'page_view' | 'form_submit' | 'video_view' | 'course_click'
  funnel_id: string
  page_id?: string
  lead_id?: string
  metadata?: Record<string, any>
}
