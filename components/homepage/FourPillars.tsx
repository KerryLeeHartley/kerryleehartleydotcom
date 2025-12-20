// ============================================================================
// FOUR PILLARS SECTION - Main Navigation Gateway (UPDATED)
// ============================================================================
// What: 4 cards representing your core areas (INNOVATE/INSPIRE/INVEST/IMPACT)
// Why: Matches your "Fundamental 4" brand, provides clear paths for visitors
// How: Hover-activated cards with images and descriptions
// 
// ✅ CHANGES MADE IN THIS UPDATE:
// - "Fundamental Four" typography completely redesigned
// - Added 3D depth effect with shadow layering
// - Changed to font-black (bolder) and tracking-tighter (tighter spacing)
// - Made uppercase for more editorial feel
// - Added drop-shadow-2xl for premium depth
// - Kept card structure UNCHANGED (working perfectly)
// ============================================================================

'use client'

import { motion } from 'framer-motion'
import Image from 'next/image'
import Link from 'next/link'

// ============================================================================
// PILLAR CARD COMPONENT - UNCHANGED (Working Great!)
// ============================================================================
// Individual card for each pillar
// Hover effects: grayscale → color, scale up, border brightens

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
          
          {/* Image - UNCHANGED */}
          <div className="relative h-64 overflow-hidden">
            <Image
              src={imageSrc}
              alt={title}
              fill
              className="object-cover grayscale group-hover:grayscale-0 group-hover:scale-110 transition-all duration-700"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent" />
          </div>

          {/* Content - UNCHANGED */}
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

// ============================================================================
// MAIN FOUR PILLARS COMPONENT
// ============================================================================

export default function FourPillars() {
  // ==========================================================================
  // PILLAR DATA - UNCHANGED (Content Working Well)
  // ==========================================================================
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
        
        {/* ================================================================== */}
        {/* SECTION HEADER - TYPOGRAPHY COMPLETELY REDESIGNED */}
        {/* ================================================================== */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          {/* ↓ CHANGED: Complete typography overhaul for "Fundamental Four" */}
          {/* Old: text-5xl md:text-6xl font-bold tracking-tight */}
          {/* New: text-5xl md:text-7xl font-black tracking-tighter uppercase */}
          {/* Why: More editorial, less template-y, adds premium feel */}
          
          {/* ↓ ADDED: 3D depth effect with layered shadow */}
          {/* How it works: Two overlapping text elements */}
          {/* - Bottom layer: Blurred, offset, low opacity (creates shadow) */}
          {/* - Top layer: Crisp, with drop-shadow (creates depth) */}
          <h2 className="text-5xl md:text-7xl font-black text-white mb-6 tracking-tighter uppercase relative">
            <span className="relative inline-block">
              {/* ↓ ADDED: Shadow layer (bottom) */}
              {/* What: Blurred copy of text positioned behind */}
              {/* Why: Creates 3D depth without looking cheesy */}
              {/* translate(2px, 2px) = slightly offset down/right */}
              <span className="absolute inset-0 text-white/10 blur-sm" style={{ transform: 'translate(2px, 2px)' }}>
                Fundamental Four
              </span>
              {/* ↓ ADDED: Main text layer (top) with drop shadow */}
              {/* drop-shadow-2xl = Tailwind's strongest shadow */}
              <span className="relative text-white drop-shadow-2xl">
                Fundamental Four
              </span>
            </span>
          </h2>
          
          {/* ↓ CHANGED: Improved description spacing and readability */}
          {/* Added: leading-relaxed for better line height */}
          <p className="text-gray-400 text-lg max-w-2xl mx-auto leading-relaxed">
            Every great endeavor is built on core pillars. These are mine.
          </p>
        </motion.div>

        {/* ================================================================== */}
        {/* PILLAR CARDS GRID - UNCHANGED (Working Perfectly!) */}
        {/* ================================================================== */}
        {/* Card hover effects: */}
        {/* - Image: grayscale → color */}
        {/* - Image: scale-100 → scale-110 */}
        {/* - Border: white/10 → white/30 */}
        {/* - "Explore" arrow: slides right 2px */}
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
// 📚 COMPREHENSIVE EXPLANATION FOR NON-DEVELOPERS
// ============================================================================
/*
 * PURPOSE:
 * Main gateway section showing your 4 core areas
 * Each card links to a different section of your site
 * 
 * WHAT CHANGED IN THIS UPDATE:
 * 
 * 1. "FUNDAMENTAL FOUR" TYPOGRAPHY - COMPLETE REDESIGN
 *    
 *    Before:
 *    - font-bold (weight 700)
 *    - tracking-tight (slightly condensed)
 *    - Normal case ("Fundamental Four")
 *    - No depth effects
 *    
 *    After:
 *    - font-black (weight 900 - boldest possible)
 *    - tracking-tighter (more condensed for impact)
 *    - UPPERCASE ("FUNDAMENTAL FOUR")
 *    - 3D layered shadow effect for depth
 *    
 *    Why changed:
 *    - Original felt "template-y" 
 *    - Needed more editorial, premium feel
 *    - 3D effect adds visual interest without being cheesy
 * 
 * 2. 3D DEPTH EFFECT - HOW IT WORKS
 *    
 *    The depth comes from two overlapping text layers:
 *    
 *    Layer 1 (Bottom/Shadow):
 *    - Same text as main
 *    - Blurred (blur-sm)
 *    - Low opacity (10%)
 *    - Offset 2px down and right
 *    - Creates soft shadow behind text
 *    
 *    Layer 2 (Top/Main):
 *    - Crisp, clear text
 *    - Full white color
 *    - Drop shadow added (drop-shadow-2xl)
 *    - Sits on top of shadow layer
 *    
 *    Result: Text appears to "float" off the page with depth
 * 
 * 3. WHAT STAYED THE SAME (Working Great!)
 *    
 *    - Card structure and layout (perfect)
 *    - Hover effects (grayscale → color)
 *    - Grid layout (4 columns on desktop)
 *    - Images and descriptions (all good)
 *    - Links and navigation (working)
 *    - "Explore" button animation (smooth)
 * 
 * TYPOGRAPHY BREAKDOWN:
 * 
 * - text-7xl: Very large text (72px on desktop)
 * - font-black: Heaviest font weight (900)
 * - tracking-tighter: Letters closer together
 * - uppercase: ALL CAPS for impact
 * - drop-shadow-2xl: Strong shadow for depth
 * 
 * PLACEHOLDER IMAGES:
 * Still using Unsplash professional photos (grayscale with hover color)
 * REPLACE with your actual photos once professional shoot is done
 * 
 * HOW TO UPDATE IMAGES:
 * 1. Save photos in /public/images/pillars/
 * 2. Name them: innovate.jpg, inspire.jpg, invest.jpg, impact.jpg
 * 3. Change imageSrc URLs in pillars array above
 * 
 * HOW TO MODIFY:
 * - Change descriptions: Edit description text in pillars array
 * - Update links: Change href values
 * - Adjust depth: Modify blur-sm or translate values
 * - Remove 3D effect: Delete the shadow layer span
 * - Change font weight: Try font-extrabold instead of font-black
 * 
 * CARD BEHAVIOR (Unchanged):
 * - Default: Grayscale image, white/10 border
 * - On hover: Full color image, scales up 110%, border brightens
 * - Smooth transitions throughout (duration-500/700)
 * 
 * IMPORTANT NOTES:
 * - Cards link to actual pages (make sure those pages exist!)
 * - Images should be high quality (1200x800px minimum)
 * - Keep descriptions concise (2-3 lines max)
 * - Ties to your "Fundamental 4" book branding
 * - Mobile responsive (stacks vertically on small screens)
 */