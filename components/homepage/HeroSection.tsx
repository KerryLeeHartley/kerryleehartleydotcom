// ============================================================================
// HERO SECTION - Homepage Opening
// ============================================================================
// What: Full-screen hero with signature and tagline
// Why: Make immediate visual impact matching David Alaba aesthetic
// How: Minimal text, strong typography, optional video background
// ============================================================================

'use client'

import { motion } from 'framer-motion'
import Image from 'next/image'

export default function HeroSection() {
  return (
    <section className="relative min-h-screen flex items-center justify-center bg-black text-white overflow-hidden">
      
      {/* Background Image (Placeholder - Replace with your professional photo) */}
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

      {/* Content */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, delay: 0.3 }}
        className="relative z-10 text-center px-6"
      >
        {/* Signature Logo */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.5 }}
          className="mb-8 mx-auto w-64 h-32 relative"
        >
          <Image
            src="/BlackTransparent.png"
            alt="Kerry Lee Hartley Signature"
            fill
            className="object-contain brightness-0 invert"
          />
        </motion.div>

        {/* Name */}
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.7 }}
          className="text-5xl md:text-7xl font-bold mb-6 tracking-tight"
        >
          KERRY LEE HARTLEY
        </motion.h1>

        {/* Tagline */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.9 }}
          className="text-xl md:text-2xl text-gray-300 mb-12 font-light tracking-wide"
        >
          Man of God
        </motion.p>

        {/* Scroll Indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 1.5 }}
          className="absolute bottom-12 left-1/2 -translate-x-1/2"
        >
          <motion.div
            animate={{ y: [0, 10, 0] }}
            transition={{ duration: 1.5, repeat: Infinity }}
            className="flex flex-col items-center gap-2 text-gray-400"
          >
            <span className="text-xs uppercase tracking-wider">Scroll to explore</span>
            <svg 
              className="w-6 h-6" 
              fill="none" 
              stroke="currentColor" 
              viewBox="0 0 24 24"
            >
              <path 
                strokeLinecap="round" 
                strokeLinejoin="round" 
                strokeWidth={2} 
                d="M19 14l-7 7m0 0l-7-7m7 7V3" 
              />
            </svg>
          </motion.div>
        </motion.div>
      </motion.div>
    </section>
  )
}

// ============================================================================
// 📚 USAGE NOTES
// ============================================================================
/*
 * PURPOSE:
 * Opening hero section that makes immediate visual impact
 * 
 * PLACEHOLDER IMAGE:
 * Using Unsplash professional portrait (grayscale)
 * REPLACE with your professional photo at /public/images/hero.jpg
 * 
 * HOW TO ADD YOUR PHOTO:
 * 1. Save your hero photo as /public/images/hero.jpg
 * 2. Change src from Unsplash URL to "/images/hero.jpg"
 * 3. Remove grayscale class if you want color photo
 * 
 * HOW TO ADD VIDEO BACKGROUND (Optional):
 * Replace the Image component with:
 * <video autoPlay loop muted className="absolute inset-0 w-full h-full object-cover">
 *   <source src="/BlackVideoSig.m4v" type="video/mp4" />
 * </video>
 * 
 * HOW TO MODIFY:
 * - Change tagline: Edit "Man of God" text
 * - Adjust spacing: Modify mb-* classes
 * - Change colors: Edit text-white, bg-black, etc.
 * - Remove scroll indicator: Delete the motion.div at bottom
 * 
 * IMPORTANT:
 * - Signature logo must be at /public/BlackTransparent.png
 * - Hero image should be high-quality (2000x1500px minimum)
 * - Keep text minimal for maximum impact
 */