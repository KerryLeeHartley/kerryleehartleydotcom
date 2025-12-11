import { NextResponse } from 'next/server'
import { createClient } from '@supabase/supabase-js'

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const { name, email, phone, funnel_id, utm_data, metadata } = body

    // Validate required fields
    if (!name || !email || !funnel_id) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      )
    }

    // Initialize Supabase client (server-side)
    const supabase = createClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
    )

    // Insert lead into database
    const { data, error } = await supabase
      .from('leads')
      .insert([{
        name,
        email,
        phone: phone || null,
        funnel_id,
        utm_source: utm_data?.utm_source,
        utm_medium: utm_data?.utm_medium,
        utm_campaign: utm_data?.utm_campaign,
        utm_content: utm_data?.utm_content,
        utm_term: utm_data?.utm_term,
        status: 'new',
        metadata: metadata || {}
      }])
      .select()

    if (error) {
      console.error('Supabase error:', error)
      return NextResponse.json(
        { error: 'Failed to save lead' },
        { status: 500 }
      )
    }

    return NextResponse.json({ success: true, data })
  } catch (error) {
    console.error('API error:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}
