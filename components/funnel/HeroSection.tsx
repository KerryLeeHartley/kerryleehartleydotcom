'use client'

import { motion } from 'framer-motion'

interface HeroSectionProps {
  headline: string
  subheadline: string
  ctaText: string
  ctaLink: string
  backgroundStyle?: 'dark' | 'light' | 'gradient'
}

export default function HeroSection({
  headline,
  subheadline,
  ctaText,
  ctaLink,
  backgroundStyle = 'dark'
}: HeroSectionProps) {
  const backgroundClass = {
    dark: 'bg-luxury-black text-luxury-white',
    light: 'bg-luxury-white text-luxury-black',
    gradient: 'relative overflow-hidden text-luxury-white'
  }[backgroundStyle]

  const isGradient = backgroundStyle === 'gradient'

  return (
    <section className={`${backgroundClass} min-h-screen flex items-center justify-center relative`}>
      {/* Animated Gradient Background */}
      {isGradient && (
        <div className="absolute inset-0 bg-gradient-to-br from-[#0A1929] via-[#1565C0] to-[#0A1929] animate-gradient-shift">
          <div className="absolute inset-0 opacity-30">
            <div className="absolute top-20 right-20 w-96 h-96 bg-[#2196F3] rounded-full blur-3xl animate-pulse" />
            <div className="absolute bottom-20 left-20 w-96 h-96 bg-[#FF6B9D] rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }} />
            <div className="absolute top-1/2 left-1/2 w-96 h-96 bg-[#FFB800] rounded-full blur-3xl animate-pulse" style={{ animationDelay: '2s' }} />
          </div>
        </div>
      )}

      {/* Original decorative elements for non-gradient backgrounds */}
      {!isGradient && (
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-20 right-20 w-72 h-72 bg-luxury-gold rounded-full blur-3xl" />
          <div className="absolute bottom-20 left-20 w-96 h-96 bg-luxury-blue rounded-full blur-3xl" />
        </div>
      )}

      <div className="container-custom relative z-10">
        <div className="max-w-4xl mx-auto text-center">
          {/* Headline */}
          <motion.h1
            className="heading-hero mb-6"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            {headline}
          </motion.h1>

          {/* Subheadline */}
          <motion.p
            className="text-body-large mb-12 max-w-2xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            {subheadline}
          </motion.p>

          {/* CTA Button */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            <a
              href={ctaLink}
              className="inline-block btn-secondary text-lg px-12 py-5"
            >
              {ctaText}
            </a>
          </motion.div>

          {/* Trust Indicators */}
          <motion.div
            className="mt-16 flex items-center justify-center gap-8 flex-wrap"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.6 }}
          >
            <div className="flex items-center gap-2">
              <svg className="w-5 h-5 text-luxury-gold" fill="currentColor" viewBox="0 0 20 20">
                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
              </svg>
              <span className="text-sm font-medium">Licensed Realtor</span>
            </div>
            <div className="flex items-center gap-2">
              <svg className="w-5 h-5 text-luxury-gold" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
              </svg>
              <span className="text-sm font-medium">100% Free Course</span>
            </div>
            <div className="flex items-center gap-2">
              <svg className="w-5 h-5 text-luxury-gold" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M11.3 1.046A1 1 0 0112 2v5h4a1 1 0 01.82 1.573l-7 10A1 1 0 018 18v-5H4a1 1 0 01-.82-1.573l7-10a1 1 0 011.12-.38z" clipRule="evenodd" />
              </svg>
              <span className="text-sm font-medium">Instant Access</span>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
