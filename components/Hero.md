'use client'

import { motion } from 'framer-motion'
import Image from 'next/image'

interface HeroProps {
  headline: string
  subheadline: string
  ctaText: string
  ctaAction: () => void
  backgroundImage?: string
  accentColor?: 'gold' | 'blue' | 'rose'
}

export default function Hero({
  headline,
  subheadline,
  ctaText,
  ctaAction,
  backgroundImage,
  accentColor = 'gold'
}: HeroProps) {
  const accentColors = {
    gold: 'border-luxury-gold text-luxury-gold',
    blue: 'border-luxury-blue text-luxury-blue',
    rose: 'border-luxury-rose text-luxury-rose'
  }

  return (
    <section className="relative min-h-screen flex items-center justify-center bg-luxury-black text-luxury-white overflow-hidden">
      {/* Background Image with Overlay */}
      {backgroundImage && (
        <div className="absolute inset-0">
          <Image
            src={backgroundImage}
            alt="Hero background"
            fill
            className="object-cover opacity-20"
            priority
          />
        </div>
      )}

      {/* Subtle Background Pattern */}
      <div className="absolute inset-0 bg-noise opacity-50" />

      {/* Content Container */}
      <div className="relative z-10 container-width px-6 md:px-12 py-24">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: 'easeOut' }}
          className="max-w-5xl mx-auto text-center"
        >
          {/* Label */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2, duration: 0.6 }}
            className="mb-6"
          >
            <span className={`label-text border-b-2 pb-2 ${accentColors[accentColor]}`}>
              Real Estate Education
            </span>
          </motion.div>

          {/* Main Headline */}
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.8 }}
            className="heading-xl mb-8 text-balance"
          >
            {headline}
          </motion.h1>

          {/* Subheadline */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6, duration: 0.8 }}
            className="subheading text-neutral-light mb-12 max-w-3xl mx-auto"
          >
            {subheadline}
          </motion.p>

          {/* CTA Button */}
          <motion.button
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.8, duration: 0.4 }}
            onClick={ctaAction}
            className="btn-gold text-lg px-12 py-5 shadow-2xl"
          >
            {ctaText}
          </motion.button>

          {/* Trust Indicator */}
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1, duration: 0.6 }}
            className="mt-8 text-sm text-text-gray"
          >
            ✓ Free Course • ✓ No Credit Card Required • ✓ Instant Access
          </motion.p>
        </motion.div>
      </div>

      {/* Scroll Indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2, duration: 0.6 }}
        className="absolute bottom-12 left-1/2 transform -translate-x-1/2"
      >
        <div className="flex flex-col items-center gap-2 animate-bounce">
          <span className="text-xs text-text-gray uppercase tracking-wider">Scroll</span>
          <svg
            className="w-6 h-6 text-luxury-gold"
            fill="none"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path d="M19 14l-7 7m0 0l-7-7m7 7V3"></path>
          </svg>
        </div>
      </motion.div>
    </section>
  )
}
