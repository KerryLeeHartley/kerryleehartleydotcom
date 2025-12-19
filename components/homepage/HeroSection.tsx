// ============================================================================
// HERO SECTION - Homepage Opening (UPDATED)
// ============================================================================
// What: Full-screen hero with signature and tagline
// Why: Make immediate visual impact matching David Alaba aesthetic
// How: Minimal text, strong typography, animated arrow
// 
// ✅ CHANGES MADE IN THIS UPDATE:
// - Signature made 2x bigger (w-96 → w-[500px])
// - REMOVED "KERRY LEE HARTLEY" text (signature is the logo)
// - REMOVED "Scroll to explore" text (arrow only)
// - Moved arrow down (bottom-12 → bottom-8)
// - Arrow animation smoother, more subtle
// - "Man of God" has more breathing room (mb-12 → mb-32)
// ============================================================================

'use client'

import { motion } from 'framer-motion'
import Image from 'next/image'

export default function HeroSection() {
  return (
    <section className="relative min-h-screen flex items-center justify-center bg-black text-white overflow-hidden">
      
      {/* Background Image - UNCHANGED */}
      <div className="absolute inset-0 z-0">
        <Image
          src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=2787&auto=format&fit=crop"
          alt="Kerry Lee Hartley"
          fill
          className="object-cover opacity-40 grayscale"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/40 to-black" />
      </div>

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, delay: 0.3 }}
        className="relative z-10 text-center px-6"
      >
        
        {/* ↓ CHANGED: Signature MUCH BIGGER */}
        {/* Old: w-64 h-32 */}
        {/* New: w-96 h-48 (mobile), w-[500px] h-64 (desktop) */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.5 }}
          className="mb-12 mx-auto w-96 h-80 md:w-[1080px] md:h-400 relative"
        >
          <Image
            src="/BlackTransparent.png"
            alt="Kerry Lee Hartley Signature"
            fill
            className="object-contain brightness-0 invert"
            priority
          />
        </motion.div>

        {/* ↓ REMOVED: "KERRY LEE HARTLEY" text - signature is the logo */}

        {/* ↓ CHANGED: More spacing (mb-32), brighter (text-white) */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.7 }}
          className="text-2xl md:text-3xl text-white font-light tracking-wider mb-32"
        >
          Man of God
        </motion.p>

        {/* ↓ CHANGED: Arrow only (no text), moved up (bottom-8) */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 1.2 }}
          className="absolute bottom-8 left-1/2 -translate-x-1/2"
        >
          <motion.div
            animate={{ y: [0, 12, 0] }}
            transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}
          >
            <svg 
              className="w-8 h-8 text-gray-400" 
              fill="none" 
              stroke="currentColor" 
              viewBox="0 0 24 24"
            >
              <path 
                strokeLinecap="round" 
                strokeLinejoin="round" 
                strokeWidth={1.5} 
                d="M19 14l-7 7m0 0l-7-7m7 7V3" 
              />
            </svg>
          </motion.div>
        </motion.div>
      </motion.div>
    </section>
  )
}