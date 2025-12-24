// ============================================================================
// CONTACT CTA SECTION - Final Homepage Call-to-Action + TRACKING
// ============================================================================
// What: Invitation to connect at bottom of homepage
// Why: Gentle CTA without being pushy, matches David Alaba aesthetic
// How: Clean design with contact button and newsletter option + click tracking
// ============================================================================

'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import Image from 'next/image'

// Track CTA interactions
const trackCTAClick = (label: string) => {
  if (typeof window !== 'undefined' && (window as any).gtag) {
    ;(window as any).gtag('event', 'nav_click', {
      event_category: 'Homepage CTA',
      event_label: label,
    })
  }
}

// Track newsletter signup
const trackNewsletterClick = () => {
  if (typeof window !== 'undefined' && (window as any).gtag) {
    ;(window as any).gtag('event', 'newsletter_signup', {
      event_category: 'Conversion',
      event_label: 'Homepage Bottom CTA',
    })
  }
}

// Track company logo clicks
const trackLogoClick = (company: string) => {
  if (typeof window !== 'undefined' && (window as any).gtag) {
    ;(window as any).gtag('event', 'logo_click', {
      event_category: 'Homepage Logos',
      event_label: company,
    })
  }
}

export default function ContactCTA() {
  return (
    <section className="relative py-32 bg-black overflow-hidden">
      
      {/* Background Image */}
      <div className="absolute inset-0 z-0">
        <Image
          src="https://images.unsplash.com/photo-1519389950473-47ba0277781c?q=80&w=2940&auto=format&fit=crop"
          alt="Background"
          fill
          className="object-cover opacity-20 grayscale"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/80 to-black" />
      </div>

      {/* Main Content */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
        className="relative z-10 max-w-4xl mx-auto px-6 text-center"
      >
        {/* Headline */}
        <h2 className="text-4xl md:text-6xl font-bold text-white mb-6 tracking-tight leading-tight">
          Let's Build Something
          <br />
          Meaningful Together
        </h2>
        
        {/* Subheadline */}
        <p className="text-gray-400 text-lg mb-12 max-w-2xl mx-auto leading-relaxed">
          Whether you're building a product, finding home, or seeking partnership—
          let's connect and create impact.
        </p>

        {/* CTA Buttons WITH TRACKING */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
          <Link
            href="/contact"
            onClick={() => trackCTAClick('Get In Touch')}
            className="px-8 py-4 bg-white text-black rounded-full hover:bg-gray-200 transition-colors font-semibold uppercase tracking-wider text-sm"
          >
            Get In Touch
          </Link>
          
          <button
            onClick={trackNewsletterClick}
            className="px-8 py-4 border border-white/30 text-white rounded-full hover:bg-white/10 transition-colors font-semibold uppercase tracking-wider text-sm"
          >
            Subscribe to Updates
          </button>
        </div>

        {/* "TRUSTED BY" SECTION WITH TRACKING */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="mt-16 pt-12 border-t border-white/10"
        >
          <p className="text-gray-500 text-sm uppercase tracking-wider mb-8 text-center">
            Trusted By
          </p>
          
          <div className="flex flex-wrap justify-center items-center gap-12 md:gap-16">
            
            {/* CAMUNDA LOGO WITH TRACKING */}
            <div 
              onClick={() => trackLogoClick('Camunda')}
              className="relative w-32 h-12 grayscale hover:grayscale-0 transition-all duration-500 opacity-60 hover:opacity-100 cursor-pointer"
            >
              <Image
                src="/images/logos/camunda-logo-vector.png"
                alt="Camunda"
                fill
                className="object-contain"
              />
            </div>
            
            {/* ACCENTURE LOGO WITH TRACKING */}
            <div 
              onClick={() => trackLogoClick('Accenture')}
              className="relative w-32 h-12 grayscale hover:grayscale-0 transition-all duration-500 opacity-60 hover:opacity-100 cursor-pointer"
            >
              <Image
                src="/images/logos/Acc_Logo_White_Purple_RGB.png"
                alt="Accenture"
                fill
                className="object-contain"
              />
            </div>
            
            {/* PINTEREST LOGO WITH TRACKING */}
            <div 
              onClick={() => trackLogoClick('Pinterest')}
              className="relative w-32 h-12 grayscale hover:grayscale-0 transition-all duration-500 opacity-60 hover:opacity-100 cursor-pointer"
            >
              <Image
                src="/images/logos/Pinterest-Logo.png"
                alt="Pinterest"
                fill
                className="object-contain"
              />
            </div>
            
            {/* HARRY NORMAN / FORBES GLOBAL PROPERTIES LOGO WITH TRACKING */}
            <div 
              onClick={() => trackLogoClick('Harry Norman REALTORS')}
              className="relative w-48 h-12 grayscale hover:grayscale-0 transition-all duration-500 opacity-60 hover:opacity-100 cursor-pointer"
            >
              <Image
                src="/images/logos/HarryNorman_Logo.webp"
                alt="Harry Norman REALTORS - Forbes Global Properties"
                fill
                className="object-contain"
              />
            </div>
            
            {/* WAGS FOR US LOGO WITH TRACKING */}
            <div 
              onClick={() => trackLogoClick('Wags For Us')}
              className="relative w-24 h-12 grayscale hover:grayscale-0 transition-all duration-500 opacity-60 hover:opacity-100 cursor-pointer"
            >
              <Image
                src="/images/logos/wagsforuslogo.jpg"
                alt="Wags For Us"
                fill
                className="object-contain"
              />
            </div>
            
          </div>
        </motion.div>
      </motion.div>
    </section>
  )
}

// ============================================================================
// 📊 TRACKING EVENTS ADDED:
// ============================================================================
/*
 * EVENTS NOW TRACKED:
 * 
 * 1. nav_click - "Get In Touch"
 *    When: User clicks primary CTA button
 *    Category: Homepage CTA
 *    
 * 2. newsletter_signup
 *    When: User clicks Subscribe button
 *    Category: Conversion
 *    Label: "Homepage Bottom CTA"
 *    
 * 3. logo_click - "Camunda"
 * 4. logo_click - "Accenture"
 * 5. logo_click - "Pinterest"
 * 6. logo_click - "Harry Norman REALTORS"
 * 7. logo_click - "Wags For Us"
 *    When: User clicks company logos
 *    Category: Homepage Logos
 * 
 * BUSINESS INSIGHTS:
 * 
 * CTA Performance:
 * - "Get In Touch" = 50 clicks → Primary action interest
 * - "Subscribe" = 30 clicks → Content interest
 * 
 * Logo Engagement:
 * - "Camunda" = 20 clicks → Tech career interest
 * - "Harry Norman" = 15 clicks → Real estate interest
 * - Shows which experience resonates most
 * 
 * Action: Highlight top-performing companies in marketing
 */