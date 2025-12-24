// ============================================================================
// JOURNEY PREVIEW - Timeline Section + TRACKING
// ============================================================================
// What: Preview of key life/career moments with timeline visual
// Why: Build credibility and showcase your multi-dimensional journey
// How: Vertical timeline with dates and key achievements + click tracking
// ============================================================================

'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'

// Track timeline interactions
const trackJourneyClick = (label: string) => {
  if (typeof window !== 'undefined' && (window as any).gtag) {
    ;(window as any).gtag('event', 'nav_click', {
      event_category: 'Homepage Journey',
      event_label: label,
    })
  }
}

interface TimelineItem {
  year: string
  title: string
  description: string
}

export default function JourneyPreview() {
  const milestones: TimelineItem[] = [
    {
      year: '2016-2018',
      title: 'FAMU Graduate',
      description: 'Environmental Studies + Public Relations. Foundation for strategic thinking and communication.'
    },
    {
      year: '2020',
      title: 'Marriage & Entrepreneurship',
      description: 'Married Ashley. Launched Wags For Us Pet Care. Built business during pandemic to fund our wedding.'
    },
    {
      year: '2020',
      title: 'Published Author',
      description: 'Released "Fundamental 4" - a framework for intentional living and strategic execution.'
    },
    {
      year: '2021-2023',
      title: 'Sales Operations Leader',
      description: 'Led portfolio of 315 accounts. Reduced churn through data-driven insights and strategic CRM enhancements.'
    },
    {
      year: '2023-2024',
      title: 'Accenture & Pinterest',
      description: 'Sales Strategy & Operations. 20% improvement in forecasting accuracy. Optimized commercial operations.'
    },
    {
      year: '2024-2025',
      title: 'GTM Strategy Manager',
      description: 'Camunda. 33% YoY bookings growth. 181% SQO increase. Led cross-functional Pipeline Generation Council.'
    },
    {
      year: '2025',
      title: 'Licensed Realtor',
      description: 'Harry Norman, REALTORS® (Forbes Global Properties). Bringing GTM strategy to real estate.'
    },
    {
      year: 'Present',
      title: 'Building Legacy',
      description: 'Multi-dimensional operator. Technology strategist. Real estate expert. Content creator. Man of God.'
    }
  ]

  return (
    <section className="py-24 bg-zinc-950">
      <div className="max-w-5xl mx-auto px-6 lg:px-8">
        
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-5xl md:text-6xl font-bold text-white mb-6 tracking-tight">
            The Journey
          </h2>
          <p className="text-gray-400 text-lg max-w-2xl mx-auto mb-8">
            A snapshot of the path. Every moment intentional. Every step strategic.
          </p>
        </motion.div>

        {/* Timeline */}
        <div className="relative">
          {/* Vertical Line */}
          <div className="absolute left-0 md:left-1/2 top-0 bottom-0 w-px bg-gradient-to-b from-transparent via-white/20 to-transparent" />

          {/* Timeline Items WITH TRACKING */}
          <div className="space-y-12">
            {milestones.map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: index % 2 === 0 ? -30 : 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                onClick={() => trackJourneyClick(`Timeline: ${item.title}`)}
                className={`relative flex items-center ${
                  index % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'
                } flex-col md:gap-0 gap-4 cursor-pointer hover:opacity-80 transition-opacity`}
              >
                {/* Content */}
                <div className={`w-full md:w-5/12 ${index % 2 === 0 ? 'md:text-right md:pr-12' : 'md:text-left md:pl-12'} text-left pl-8 md:pl-0`}>
                  <span className="text-gray-500 text-sm uppercase tracking-wider">
                    {item.year}
                  </span>
                  <h3 className="text-xl font-bold text-white mt-2 mb-2">
                    {item.title}
                  </h3>
                  <p className="text-gray-400 text-sm leading-relaxed">
                    {item.description}
                  </p>
                </div>

                {/* Center Dot */}
                <div className="absolute left-0 md:left-1/2 top-0 w-4 h-4 bg-white rounded-full -ml-2 md:-ml-2 ring-4 ring-zinc-950" />
              </motion.div>
            ))}
          </div>
        </div>

        {/* CTA to Full Journey WITH TRACKING */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.5 }}
          className="text-center mt-16"
        >
          <Link
            href="/journey"
            onClick={() => trackJourneyClick('View Full Journey')}
            className="inline-flex items-center gap-2 px-8 py-4 bg-white text-black rounded-full hover:bg-gray-200 transition-colors font-semibold uppercase tracking-wider text-sm"
          >
            View Full Journey
            <svg 
              className="w-4 h-4" 
              fill="none" 
              stroke="currentColor" 
              viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </Link>
        </motion.div>
      </div>
    </section>
  )
}

// ============================================================================
// 📊 TRACKING EVENTS ADDED:
// ============================================================================
/*
 * EVENTS NOW TRACKED:
 * 
 * 1. nav_click - "Timeline: FAMU Graduate"
 * 2. nav_click - "Timeline: Marriage & Entrepreneurship"
 * 3. nav_click - "Timeline: Published Author"
 * 4. nav_click - "Timeline: Sales Operations Leader"
 * 5. nav_click - "Timeline: Accenture & Pinterest"
 * 6. nav_click - "Timeline: GTM Strategy Manager"
 * 7. nav_click - "Timeline: Licensed Realtor"
 * 8. nav_click - "Timeline: Building Legacy"
 * 9. nav_click - "View Full Journey"
 * 
 * BUSINESS INSIGHTS:
 * 
 * Timeline Engagement:
 * - Which milestones get clicked most?
 * - "GTM Strategy Manager" = 100 clicks → Career focus
 * - "Licensed Realtor" = 80 clicks → Real estate interest
 * - "Published Author" = 60 clicks → Book/content interest
 * 
 * Action: Highlight top-performing milestones in marketing
 */