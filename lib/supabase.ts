// ============================================================================
// SUPABASE CLIENT - DATABASE CONNECTION (UPDATED WITH Q&A + TOOLS)
// ============================================================================
// What: Supabase client + types for funnels + Q&A + Tools for Journey
// Why: Centralized database access for all features
// How: Existing schema + Q&A + Tools tables integrated
// ============================================================================

import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!

export const supabase = createClient(supabaseUrl, supabaseAnonKey)

// ============================================================================
// EXISTING DATABASE TYPES (FUNNELS SYSTEM)
// ============================================================================

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

// ============================================================================
// Q&A DATABASE TYPES (FOR /LINKS + /QA PAGES)
// ============================================================================

export type QADatabase = {
  id: string
  created_at: string
  question: string
  answer_text?: string
  video_platform?: 'tiktok' | 'youtube' | 'instagram'
  video_url?: string
  video_embed_id?: string
  category?: 'career' | 'money' | 'purpose' | 'life'
  tags?: string[]
  status: 'pending' | 'answered' | 'published'
  asker_email?: string
  asker_name?: string
  answered_at?: string
  published_at?: string
  view_count: number
  last_viewed_at?: string
}

export type QAView = {
  id: string
  created_at: string
  qa_id: string
  session_id?: string
  user_id?: string
  time_spent_seconds?: number
  scrolled_to_bottom?: boolean
  clicked_video?: boolean
  viewed_at: string
}

export type QASearch = {
  id: string
  created_at: string
  search_term: string
  results_count?: number
  searched_at: string
  session_id?: string
}

export type QASubmission = {
  id: string
  created_at: string
  question: string
  email?: string
  name?: string
  triage_selection?: string
  vibe_check_score?: number
  submitted_at: string
  status: 'pending' | 'answered' | 'ignored'
  answered_qa_id?: string
}

// ============================================================================
// TOOLS FOR THE JOURNEY TYPES
// ============================================================================

export type Tool = {
  id: string
  created_at: string
  title: string
  description?: string
  category: string
  product_url: string
  image_url: string
  gradient_from: string
  gradient_to: string
  sort_order: number
  is_active: boolean
  click_count: number
  last_clicked_at?: string
}

// ============================================================================
// TELEPROMPTER TYPES
// ============================================================================

export type TeleprompterScript = {
  id: string
  created_at: string
  updated_at: string
  title: string
  content: string
  font_size: number
  scroll_speed: number
  is_mirror_mode: boolean
  is_public: boolean
  share_slug?: string
  owner_email?: string
  view_count: number
  last_viewed_at?: string
  read_count: number
}

// ============================================================================
// Q&A FUNCTIONS (FOR /LINKS + /QA PAGES)
// ============================================================================

/**
 * Get published Q&As (for public /qa page)
 */
export async function getPublishedQAs(limit: number = 10, category?: string) {
  let query = supabase
    .from('qa_database')
    .select('*')
    .eq('status', 'published')
    .order('published_at', { ascending: false })
    .limit(limit)

  if (category) {
    query = query.eq('category', category)
  }

  return await query
}

/**
 * Get single Q&A by ID
 */
export async function getQAById(id: string) {
  return await supabase
    .from('qa_database')
    .select('*')
    .eq('id', id)
    .eq('status', 'published')
    .single()
}

/**
 * Search Q&As
 */
export async function searchQAs(searchTerm: string) {
  await supabase.from('qa_searches').insert({
    search_term: searchTerm,
    searched_at: new Date().toISOString()
  })

  return await supabase
    .from('qa_database')
    .select('*')
    .eq('status', 'published')
    .or(`question.ilike.%${searchTerm}%,answer_text.ilike.%${searchTerm}%`)
    .order('published_at', { ascending: false })
}

/**
 * Track Q&A view (privately)
 */
export async function trackQAView(qaId: string, sessionId?: string) {
  await supabase.from('qa_views').insert({
    qa_id: qaId,
    session_id: sessionId,
    viewed_at: new Date().toISOString()
  })

  await supabase.rpc('increment_qa_view_count', { qa_uuid: qaId })
}

/**
 * Submit new question (from /links page)
 */
export async function submitQuestion(data: {
  question: string
  email: string
  name?: string
  triage_selection?: string
  vibe_check_score?: number
}) {
  return await supabase.from('qa_submissions').insert({
    question: data.question,
    email: data.email,
    name: data.name,
    triage_selection: data.triage_selection,
    vibe_check_score: data.vibe_check_score,
    submitted_at: new Date().toISOString(),
    status: 'pending'
  })
}

/**
 * Get pending questions (admin only via dashboard)
 */
export async function getPendingQuestions() {
  return await supabase
    .from('qa_submissions')
    .select('*')
    .eq('status', 'pending')
    .order('submitted_at', { ascending: false })
}

// ============================================================================
// TOOLS FOR THE JOURNEY FUNCTIONS
// ============================================================================

/**
 * Get all active tools (sorted by sort_order)
 */
export async function getTools() {
  return await supabase
    .from('tools_for_journey')
    .select('*')
    .eq('is_active', true)
    .order('sort_order', { ascending: true })
}

/**
 * Track tool click
 */
export async function trackToolClick(toolId: string) {
  return await supabase.rpc('increment_tool_clicks', { tool_uuid: toolId })
}

// ============================================================================
// TELEPROMPTER FUNCTIONS
// ============================================================================

/**
 * Get all scripts for user (or public scripts)
 */
export async function getTeleprompterScripts() {
  return await supabase
    .from('teleprompter_scripts')
    .select('*')
    .order('updated_at', { ascending: false })
}

/**
 * Get single script by ID
 */
export async function getTeleprompterScript(id: string) {
  return await supabase
    .from('teleprompter_scripts')
    .select('*')
    .eq('id', id)
    .single()
}

/**
 * Get script by share slug
 */
export async function getTeleprompterScriptBySlug(slug: string) {
  return await supabase
    .from('teleprompter_scripts')
    .select('*')
    .eq('share_slug', slug)
    .single()
}

/**
 * Create new script
 */
export async function createTeleprompterScript(data: Partial<TeleprompterScript>) {
  return await supabase
    .from('teleprompter_scripts')
    .insert(data)
    .select()
    .single()
}

/**
 * Update script
 */
export async function updateTeleprompterScript(id: string, data: Partial<TeleprompterScript>) {
  return await supabase
    .from('teleprompter_scripts')
    .update(data)
    .eq('id', id)
    .select()
    .single()
}

/**
 * Track script view
 */
export async function trackScriptView(scriptId: string) {
  return await supabase.rpc('increment_script_views', { script_uuid: scriptId })
}

/**
 * Track script read completion
 */
export async function trackScriptRead(scriptId: string) {
  return await supabase.rpc('increment_script_reads', { script_uuid: scriptId })
}