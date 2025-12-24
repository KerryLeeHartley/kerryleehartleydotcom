// ============================================================================
// FOUR PILLARS SECTION - Main Navigation Gateway + TRACKING
// ============================================================================
// What: 4 cards representing your core areas (INNOVATE/INSPIRE/INVEST/IMPACT)
// Why: Matches your "Fundamental 4" brand, provides clear paths for visitors
// How: Hover-activated cards with images and descriptions + click tracking
// ============================================================================

'use client'

import { motion } from 'framer-motion'
import Image from 'next/image'
import Link from 'next/link'

// Track pillar clicks
const trackPillarClick = (pillar: string) => {
  if (typeof window !== 'undefined' && (window as any).gtag) {
    ;(window as any).gtag('event', 'nav_click', {
      event_category: 'Homepage Pillars',
      event_label: `Pillar: ${pillar}`,
    })
  }
}

interface PillarCardProps {
  title: string
  description: string
  audience: string
  imageSrc: string
  href: string
  delay: number
}

function PillarCard({ title, description, audience, imageSrc, href, delay }: PillarCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, delay }}
      className="group"
    >
      <Link 
        href={href} 
        onClick={() => trackPillarClick(title)}
        className="block"
      >
        <div className="relative overflow-hidden bg-black border border-white/10 rounded-lg hover:border-white/30 transition-all duration-500 h-[500px]">
          
          {/* Image */}
          <div className="relative h-64 overflow-hidden">
            <Image
              src={imageSrc}
              alt={title}
              fill
              className="object-cover grayscale group-hover:grayscale-0 group-hover:scale-110 transition-all duration-700"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent" />
          </div>

          {/* Content */}
          <div className="p-8 space-y-4">
            <h3 className="text-4xl font-bold text-white tracking-tight group-hover:text-gray-200 transition-colors">
              {title}
            </h3>
            
            <p className="text-gray-400 text-sm leading-relaxed">
              {description}
            </p>

            <p className="text-gray-500 text-xs uppercase tracking-wider">
              {audience}
            </p>

            <div className="flex items-center gap-2 text-white group-hover:translate-x-2 transition-transform duration-300">
              <span className="text-sm uppercase tracking-wider">Explore</span>
              <svg 
                className="w-4 h-4" 
                fill="none" 
                stroke="currentColor" 
                viewBox="0 0 24 24"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </div>
          </div>
        </div>
      </Link>
    </motion.div>
  )
}

export default function FourPillars() {
  const pillars = [
    {
      title: 'INNOVATE',
      description: 'Building the future of work through GTM strategy, operations excellence, and data-driven solutions.',
      audience: 'For Builders',
      imageSrc: '/images/image000000.png',
      href: '/work/technology',
      delay: 0.1
    },
    {
      title: 'INSPIRE',
      description: 'Sharing stories that move people to action. Content that connects, educates, and transforms.',
      audience: 'For Communities',
      imageSrc: '/images/IMG_7600.png',
      href: '/blog',
      delay: 0.2
    },
    {
      title: 'INVEST',
      description: 'Creating paths to wealth and homeownership. Helping families build their foundation.',
      audience: 'For Families',
      imageSrc: '/images/IMG_6022.png',
      href: '/funnel/first-time-buyers',
      delay: 0.3
    },
    {
      title: 'IMPACT',
      description: 'Giving back to community. Building legacy through intentional service and meaningful contribution.',
      audience: 'For Tomorrow',
      imageSrc: '/images/IMG_0112.png',
      href: '/impact',
      delay: 0.4
    }
  ]

  return (
    <section className="py-24 bg-black">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-5xl md:text-7xl font-black text-white mb-6 tracking-tighter uppercase relative">
            <span className="relative inline-block">
              <span className="absolute inset-0 text-white/10 blur-sm" style={{ transform: 'translate(2px, 2px)' }}>
                Fundamental Four
              </span>
              <span className="relative text-white drop-shadow-2xl">
                Fundamental Four
              </span>
            </span>
          </h2>
          
          <p className="text-gray-400 text-lg max-w-2xl mx-auto leading-relaxed">
            Every great endeavor is built on core pillars. These are mine.
          </p>
        </motion.div>

        {/* Pillar Cards Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {pillars.map((pillar) => (
            <PillarCard key={pillar.title} {...pillar} />
          ))}
        </div>
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
 * 1. nav_click - "Pillar: INNOVATE"
 *    When: User clicks INNOVATE card
 *    Category: Homepage Pillars
 *    
 * 2. nav_click - "Pillar: INSPIRE"
 *    When: User clicks INSPIRE card
 *    Category: Homepage Pillars
 *    
 * 3. nav_click - "Pillar: INVEST"
 *    When: User clicks INVEST card
 *    Category: Homepage Pillars
 *    
 * 4. nav_click - "Pillar: IMPACT"
 *    When: User clicks IMPACT card
 *    Category: Homepage Pillars
 * 
 * BUSINESS INSIGHTS:
 * 
 * Pillar Performance:
 * - Which pillar gets clicked most?
 * - INNOVATE = 150 clicks → Tech career interest
 * - INSPIRE = 80 clicks → Blog content interest
 * - INVEST = 120 clicks → Real estate interest
 * - IMPACT = 40 clicks → Philanthropy interest
 * 
 * Action: Focus content on top-performing pillars
 */