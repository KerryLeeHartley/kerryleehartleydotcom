'use client'

import { motion } from 'framer-motion'

interface HeroSectionProps {
  headline: string
  subheadline: string
  ctaText: string
  ctaLink: string
  backgroundStyle?: 'dark' | 'light' | 'gradient'
}

const colors = {
  primary: '#1F1F1F',        // Deep Charcoal
  accentSoftPeach: '#FF8C6A',// Soft Peach
  accentMagenta: '#C21F77',  // Rich Magenta
  accentTeal: '#00B3A6',     // Soft Teal
  highlightGold: '#F5E8C7',  // Champagne Gold
  textLight: '#FFFFFF',       // White text
}

export default function HeroSection({
  headline,
  subheadline,
  ctaText,
  ctaLink,
  backgroundStyle = 'gradient'
}: HeroSectionProps) {
  const backgroundClass = {
    dark: 'bg-primary text-white',
    light: 'bg-white text-primary',
    gradient: 'relative overflow-hidden text-white'
  }[backgroundStyle]

  const isGradient = backgroundStyle === 'gradient'

  return (
    <section className={`${backgroundClass} min-h-screen flex items-center justify-center relative px-6 md:px-12`}>
      {/* Animated Gradient Background */}
      {isGradient && (
        <motion.div
          className="absolute inset-0"
          animate={{ backgroundPositionX: ['0%', '100%', '0%'] }}
          transition={{ duration: 40, repeat: Infinity, ease: 'linear' }}
          style={{
            background: `linear-gradient(135deg, ${colors.accentSoftPeach}, ${colors.accentMagenta}, ${colors.accentTeal})`,
            backgroundSize: '400% 400%',
            zIndex: -2
          }}
        />
      )}

      {/* Floating Glow Orbs */}
      <motion.div
        className="absolute w-96 h-96 rounded-full opacity-30"
        style={{ background: colors.accentSoftPeach, top: '10%', left: '15%', zIndex: -1 }}
        animate={{ y: [0, 20, 0], x: [0, 15, 0] }}
        transition={{ duration: 20, repeat: Infinity, repeatType: 'mirror' }}
      />
      <motion.div
        className="absolute w-96 h-96 rounded-full opacity-30"
        style={{ background: colors.accentMagenta, bottom: '15%', right: '10%', zIndex: -1 }}
        animate={{ y: [0, -20, 0], x: [0, -15, 0] }}
        transition={{ duration: 25, repeat: Infinity, repeatType: 'mirror' }}
      />
      <motion.div
        className="absolute w-96 h-96 rounded-full opacity-30"
        style={{ background: colors.accentTeal, top: '50%', left: '50%', transform: 'translate(-50%, -50%)', zIndex: -1 }}
        animate={{ y: [0, 10, 0], x: [0, 10, 0] }}
        transition={{ duration: 30, repeat: Infinity, repeatType: 'mirror' }}
      />

      {/* Content */}
      <div className="relative z-10 text-center max-w-4xl mx-auto">
        <motion.h1
          className="text-5xl md:text-6xl lg:text-7xl font-extrabold uppercase drop-shadow-lg mb-6"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          {headline}
        </motion.h1>

        <motion.p
          className="text-xl md:text-2xl text-white/80 mb-12"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          {subheadline}
        </motion.p>

        <motion.a
          href={ctaLink}
          className="inline-block px-12 py-5 rounded-full font-semibold shadow-lg text-black bg-gradient-to-r from-[#F5E8C7] via-[#FF8C6A] to-[#C21F77]"
          whileHover={{ scale: 1.05, boxShadow: '0px 0px 20px rgba(245, 232, 199, 0.6)' }}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
        >
          {ctaText}
        </motion.a>

        {/* Optional Trust Indicators */}
        <motion.div
          className="mt-16 flex items-center justify-center gap-8 flex-wrap"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.6 }}
        >
          <div className="flex items-center gap-2">
            <span className="text-white font-medium">Licensed Realtor</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-white font-medium">100% Free Course</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-white font-medium">Instant Access</span>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
