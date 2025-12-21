// ============================================================================
// GOOGLE ANALYTICS 4 - Next.js Integration
// ============================================================================
// What: GA4 tracking with custom events
// Why: Track user behavior, conversions, and page performance
// How: Script injection + custom event tracking
// ============================================================================

'use client'

import Script from 'next/script'
import { usePathname, useSearchParams } from 'next/navigation'
import { useEffect, Suspense } from 'react'

// ============================================================================
// CONFIGURATION
// ============================================================================
// Replace with your actual GA4 Measurement ID from Google Analytics
const GA_MEASUREMENT_ID = process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID || 'G-XXXXXXXXXX'

// ============================================================================
// PAGE VIEW TRACKING (wrapped in Suspense)
// ============================================================================
function GoogleAnalyticsTracking() {
  const pathname = usePathname()
  const searchParams = useSearchParams()

  useEffect(() => {
    if (pathname) {
      pageview(pathname)
    }
  }, [pathname, searchParams])

  return null
}

export function GoogleAnalytics() {
  return (
    <>
      {/* Google Analytics Script */}
      <Script
        strategy="afterInteractive"
        src={`https://www.googletagmanager.com/gtag/js?id=${GA_MEASUREMENT_ID}`}
      />
      <Script
        id="google-analytics"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{
          __html: `
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', '${GA_MEASUREMENT_ID}', {
              page_path: window.location.pathname,
            });
          `,
        }}
      />
      
      {/* Tracking component wrapped in Suspense */}
      <Suspense fallback={null}>
        <GoogleAnalyticsTracking />
      </Suspense>
    </>
  )
}

// ============================================================================
// HELPER FUNCTIONS FOR TRACKING
// ============================================================================

// Track page views
export const pageview = (url: string) => {
  if (typeof window !== 'undefined' && (window as any).gtag) {
    ;(window as any).gtag('config', GA_MEASUREMENT_ID, {
      page_path: url,
    })
  }
}

// Track custom events
export const event = ({ action, category, label, value }: {
  action: string
  category: string
  label?: string
  value?: number
}) => {
  if (typeof window !== 'undefined' && (window as any).gtag) {
    ;(window as any).gtag('event', action, {
      event_category: category,
      event_label: label,
      value: value,
    })
  }
}

// ============================================================================
// PRE-BUILT EVENT TRACKERS (USE THESE IN YOUR COMPONENTS)
// ============================================================================

// Track video plays
export const trackVideoPlay = (videoName: string, company: string) => {
  event({
    action: 'video_play',
    category: 'VSL',
    label: `${company} - ${videoName}`,
  })
}

// Track Calendly clicks
export const trackCalendlyClick = (company: string, source: string) => {
  event({
    action: 'calendly_click',
    category: 'Conversion',
    label: `${company} - ${source}`,
  })
}

// Track downloads
export const trackDownload = (fileType: string, company: string) => {
  event({
    action: 'download',
    category: 'Files',
    label: `${fileType} - ${company}`,
  })
}

// Track project clicks
export const trackProjectClick = (projectName: string) => {
  event({
    action: 'project_click',
    category: 'Projects',
    label: projectName,
  })
}

// Track navigation clicks
export const trackNavClick = (destination: string) => {
  event({
    action: 'nav_click',
    category: 'Navigation',
    label: destination,
  })
}

// Track scroll depth
export const trackScrollDepth = (depth: number, page: string) => {
  event({
    action: 'scroll_depth',
    category: 'Engagement',
    label: page,
    value: depth,
  })
}

// Track contact form submissions
export const trackContactSubmission = (source: string) => {
  event({
    action: 'contact_submit',
    category: 'Conversion',
    label: source,
  })
}

// ============================================================================
// USAGE EXAMPLES (FOR YOUR REFERENCE)
// ============================================================================
/*
 * IN YOUR COMPONENTS:
 * 
 * 1. TRACK VIDEO PLAY:
 * 
 * import { trackVideoPlay } from '@/components/analytics/GoogleAnalytics'
 * 
 * <video onPlay={() => trackVideoPlay('VSL', 'Airbnb')}>
 * 
 * 
 * 2. TRACK CALENDLY CLICK:
 * 
 * import { trackCalendlyClick } from '@/components/analytics/GoogleAnalytics'
 * 
 * <a 
 *   href={calendlyUrl}
 *   onClick={() => trackCalendlyClick('Airbnb', 'CTA Button')}
 * >
 * 
 * 
 * 3. TRACK DOWNLOAD:
 * 
 * import { trackDownload } from '@/components/analytics/GoogleAnalytics'
 * 
 * <a 
 *   href="/resume.pdf"
 *   onClick={() => trackDownload('Resume', 'Airbnb')}
 * >
 * 
 * 
 * 4. TRACK PROJECT CLICK:
 * 
 * import { trackProjectClick } from '@/components/analytics/GoogleAnalytics'
 * 
 * <a onClick={() => trackProjectClick('Personal Website')}>
 * 
 * 
 * 5. TRACK SCROLL DEPTH:
 * 
 * import { trackScrollDepth } from '@/components/analytics/GoogleAnalytics'
 * 
 * useEffect(() => {
 *   const handleScroll = () => {
 *     const scrollPercent = (window.scrollY / document.body.scrollHeight) * 100
 *     if (scrollPercent > 75) {
 *       trackScrollDepth(75, '/apply/airbnb')
 *     }
 *   }
 *   window.addEventListener('scroll', handleScroll)
 *   return () => window.removeEventListener('scroll', handleScroll)
 * }, [])
 */