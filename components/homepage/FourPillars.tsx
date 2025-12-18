// ============================================================================
// FOUR PILLARS SECTION - Main Navigation Gateway
// ============================================================================
// What: 4 cards representing your core areas (INNOVATE/INSPIRE/INVEST/IMPACT)
// Why: Matches your "Fundamental 4" brand, provides clear paths for visitors
// How: Hover-activated cards with images and descriptions
// ============================================================================

'use client'

import { motion } from 'framer-motion'
import Image from 'next/image'
import Link from 'next/link'

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
      <Link href={href} className="block">
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
      imageSrc: 'https://images.unsplash.com/photo-1551434678-e076c223a692?q=80&w=2940&auto=format&fit=crop',
      href: '/work/technology',
      delay: 0.1
    },
    {
      title: 'INSPIRE',
      description: 'Sharing stories that move people to action. Content that connects, educates, and transforms.',
      audience: 'For Communities',
      imageSrc: 'https://images.unsplash.com/photo-1475721027785-f74eccf877e2?q=80&w=2940&auto=format&fit=crop',
      href: '/blog',
      delay: 0.2
    },
    {
      title: 'INVEST',
      description: 'Creating paths to wealth and homeownership. Helping families build their foundation.',
      audience: 'For Families',
      imageSrc: 'https://images.unsplash.com/photo-1560518883-ce09059eeffa?q=80&w=2073&auto=format&fit=crop',
      href: '/funnel/first-time-buyers',
      delay: 0.3
    },
    {
      title: 'IMPACT',
      description: 'Giving back to community. Building legacy through intentional service and meaningful contribution.',
      audience: 'For Tomorrow',
      imageSrc: 'https://images.unsplash.com/photo-1559027615-cd4628902d4a?q=80&w=2786&auto=format&fit=crop',
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
          <h2 className="text-5xl md:text-6xl font-bold text-white mb-6 tracking-tight">
            Fundamental Four
          </h2>
          <p className="text-gray-400 text-lg max-w-2xl mx-auto">
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
// 📚 USAGE NOTES
// ============================================================================
/*
 * PURPOSE:
 * Main gateway section showing your 4 core areas
 * Each card links to a different section of your site
 * 
 * PLACEHOLDER IMAGES:
 * Using Unsplash professional photos (grayscale with hover color)
 * REPLACE with your actual photos once professional shoot is done
 * 
 * HOW TO UPDATE IMAGES:
 * 1. Save your photos in /public/images/pillars/
 * 2. Name them: innovate.jpg, inspire.jpg, invest.jpg, impact.jpg
 * 3. Change imageSrc from Unsplash URLs to "/images/pillars/innovate.jpg" etc.
 * 
 * HOW TO MODIFY:
 * - Change descriptions: Edit description text in pillars array
 * - Update links: Change href values
 * - Adjust audience text: Edit audience field
 * - Remove grayscale: Delete "grayscale" class if you want color
 * 
 * CARD BEHAVIOR:
 * - Default: Grayscale image
 * - On hover: Color image, scale up, border brightens
 * - Smooth transitions throughout
 * 
 * IMPORTANT:
 * - Cards link to actual pages (make sure those pages exist)
 * - Images should be high quality (1200x800px minimum)
 * - Keep descriptions concise (2-3 lines max)
 * - Ties to your "Fundamental 4" book branding
 */