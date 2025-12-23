'use client'

import { useEffect } from 'react'
import { trackScrollDepth } from '@/components/analytics/GoogleAnalytics'

export default function ScrollTracker({ company }: { company: string }) {
  useEffect(() => {
    const thresholds = [25, 50, 75, 100]
    const tracked = new Set<number>()

    const handleScroll = () => {
      const scrollPercent = Math.round(
        (window.scrollY / (document.documentElement.scrollHeight - window.innerHeight)) * 100
      )

      thresholds.forEach(threshold => {
        if (scrollPercent >= threshold && !tracked.has(threshold)) {
          tracked.add(threshold)
          trackScrollDepth(threshold, `/apply/${company.toLowerCase()}`)
        }
      })
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [company])

  return null
}
