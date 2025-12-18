// ============================================================================
// CONTACT CTA SECTION - Final Homepage Call-to-Action
// ============================================================================
// What: Invitation to connect at bottom of homepage
// Why: Gentle CTA without being pushy, matches David Alaba aesthetic
// How: Clean design with contact button and newsletter option
// ============================================================================

'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import Image from 'next/image'

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

      {/* Content */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
        className="relative z-10 max-w-4xl mx-auto px-6 text-center"
      >
        <h2 className="text-4xl md:text-6xl font-bold text-white mb-6 tracking-tight leading-tight">
          Let's Build Something
          <br />
          Meaningful Together
        </h2>
        
        <p className="text-gray-400 text-lg mb-12 max-w-2xl mx-auto leading-relaxed">
          Whether you're building a product, finding home, or seeking partnership—
          let's connect and create impact.
        </p>

        {/* CTA Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
          <Link
            href="/contact"
            className="px-8 py-4 bg-white text-black rounded-full hover:bg-gray-200 transition-colors font-semibold uppercase tracking-wider text-sm"
          >
            Get In Touch
          </Link>
          
          <button
            className="px-8 py-4 border border-white/30 text-white rounded-full hover:bg-white/10 transition-colors font-semibold uppercase tracking-wider text-sm"
          >
            Subscribe to Updates
          </button>
        </div>

        {/* Social Proof / Trust Element */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="mt-16 pt-12 border-t border-white/10"
        >
          <p className="text-gray-500 text-sm uppercase tracking-wider mb-4">
            Trusted By
          </p>
          <div className="flex flex-wrap justify-center items-center gap-8 opacity-50">
            <span className="text-white text-lg">Camunda</span>
            <span className="text-white text-lg">Accenture</span>
            <span className="text-white text-lg">Pinterest</span>
            <span className="text-white text-lg">Harry Norman</span>
            <span className="text-white text-lg">Forbes</span>
          </div>
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
 * Final section of homepage that invites action
 * Not pushy, just an open invitation
 * 
 * PLACEHOLDER IMAGE:
 * Using Unsplash team/collaboration photo
 * REPLACE with your own photo if desired
 * 
 * HOW TO MODIFY:
 * - Change headline: Edit the h2 text
 * - Update CTAs: Modify button text and links
 * - Add newsletter form: Replace "Subscribe" button with actual form
 * - Remove social proof: Delete the trust element section
 * - Change companies: Edit the span elements in trust section
 * 
 * BUTTON BEHAVIOR:
 * - Primary CTA (Get In Touch): White bg, stands out
 * - Secondary CTA (Subscribe): Outline style, less prominent
 * - Both have smooth hover states
 * 
 * NEWSLETTER INTEGRATION:
 * Replace the "Subscribe" button with actual newsletter form:
 * - ConvertKit embed
 * - Mailchimp form
 * - Or custom form connected to your email service
 * 
 * IMPORTANT:
 * - Keep tone inviting, not desperate
 * - Maintain visual balance with rest of page
 * - Test on mobile - buttons should stack nicely
 */