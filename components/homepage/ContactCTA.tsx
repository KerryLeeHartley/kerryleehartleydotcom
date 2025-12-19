// ============================================================================
// CONTACT CTA SECTION - Final Homepage Call-to-Action (UPDATED)
// ============================================================================
// What: Invitation to connect at bottom of homepage
// Why: Gentle CTA without being pushy, matches David Alaba aesthetic
// How: Clean design with contact button and newsletter option
// 
// ✅ CHANGES MADE IN THIS UPDATE:
// - Added REAL company logos (Camunda, Accenture, Pinterest, etc.)
// - Logos display in grayscale by default (matches monochrome aesthetic)
// - Hover reveals brand colors (interactive + fun)
// - Professional grid layout with proper spacing
// - Replaced text-only company names with actual brand logos
// ============================================================================

'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import Image from 'next/image'

export default function ContactCTA() {
  return (
    <section className="relative py-32 bg-black overflow-hidden">
      
      {/* ====================================================================== */}
      {/* BACKGROUND IMAGE - UNCHANGED */}
      {/* ====================================================================== */}
      <div className="absolute inset-0 z-0">
        <Image
          src="https://images.unsplash.com/photo-1519389950473-47ba0277781c?q=80&w=2940&auto=format&fit=crop"
          alt="Background"
          fill
          className="object-cover opacity-20 grayscale"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/80 to-black" />
      </div>

      {/* ====================================================================== */}
      {/* MAIN CONTENT - UNCHANGED */}
      {/* ====================================================================== */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
        className="relative z-10 max-w-4xl mx-auto px-6 text-center"
      >
        {/* Headline - UNCHANGED */}
        <h2 className="text-4xl md:text-6xl font-bold text-white mb-6 tracking-tight leading-tight">
          Let's Build Something
          <br />
          Meaningful Together
        </h2>
        
        {/* Subheadline - UNCHANGED */}
        <p className="text-gray-400 text-lg mb-12 max-w-2xl mx-auto leading-relaxed">
          Whether you're building a product, finding home, or seeking partnership—
          let's connect and create impact.
        </p>

        {/* CTA Buttons - UNCHANGED */}
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

        {/* ================================================================== */}
        {/* "TRUSTED BY" SECTION - COMPLETELY REDESIGNED */}
        {/* ================================================================== */}
        {/* ↓ CHANGED: Replaced text-only names with actual brand logos */}
        {/* Old: Just company names in text (Camunda, Accenture, etc.) */}
        {/* New: Real brand logos with grayscale + hover effects */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="mt-16 pt-12 border-t border-white/10"
        >
          {/* ↓ CHANGED: Better spacing (mb-4 → mb-8) */}
          <p className="text-gray-500 text-sm uppercase tracking-wider mb-8 text-center">
            Trusted By
          </p>
          
          {/* ↓ CHANGED: Grid layout with proper gaps for logos */}
          {/* Old: Simple flex with text */}
          {/* New: flex-wrap with 12-16 gap for logo spacing */}
          <div className="flex flex-wrap justify-center items-center gap-12 md:gap-16">
            
            {/* ================================================================ */}
            {/* CAMUNDA LOGO */}
            {/* ================================================================ */}
            {/* ↓ FIXED: Updated filename to match actual upload */}
            {/* Your file: camunda-logo-vector.png */}
            <div className="relative w-32 h-12 grayscale hover:grayscale-0 transition-all duration-500 opacity-60 hover:opacity-100">
              <Image
                src="/images/logos/camunda-logo-vector.png"
                alt="Camunda"
                fill
                className="object-contain"
              />
            </div>
            
            {/* ================================================================ */}
            {/* ACCENTURE LOGO */}
            {/* ================================================================ */}
            {/* ↓ FIXED: Updated filename to match actual upload */}
            {/* Your file: Accenture.svg.png */}
            <div className="relative w-32 h-12 grayscale hover:grayscale-0 transition-all duration-500 opacity-60 hover:opacity-100">
              <Image
                src="/images/logos/Acc_Logo_White_Purple_RGB.png"
                alt="Accenture"
                fill
                className="object-contain"
              />
            </div>
            
            {/* ================================================================ */}
            {/* PINTEREST LOGO */}
            {/* ================================================================ */}
            {/* ↓ FIXED: Updated filename to match actual upload */}
            {/* Your file: Pinterest-Logo.png */}
            <div className="relative w-32 h-12 grayscale hover:grayscale-0 transition-all duration-500 opacity-60 hover:opacity-100">
              <Image
                src="/images/logos/Pinterest-Logo.png"
                alt="Pinterest"
                fill
                className="object-contain"
              />
            </div>
            
            {/* ================================================================ */}
            {/* HARRY NORMAN / FORBES GLOBAL PROPERTIES LOGO */}
            {/* ================================================================ */}
            {/* ↓ FIXED: Updated filename to match actual upload */}
            {/* Your file: HarryNorman_Logo.webp */}
            <div className="relative w-48 h-12 grayscale hover:grayscale-0 transition-all duration-500 opacity-60 hover:opacity-100">
              <Image
                src="/images/logos/HarryNorman_Logo.webp"
                alt="Harry Norman REALTORS - Forbes Global Properties"
                fill
                className="object-contain"
              />
            </div>
            
            {/* ================================================================ */}
            {/* WAGS FOR US LOGO */}
            {/* ================================================================ */}
            {/* ↓ FIXED: Updated filename to match actual upload */}
            {/* Your file: wagsforuslogo.jpg */}
            <div className="relative w-24 h-12 grayscale hover:grayscale-0 transition-all duration-500 opacity-60 hover:opacity-100">
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
// 📚 COMPREHENSIVE EXPLANATION FOR NON-DEVELOPERS
// ============================================================================
/*
 * PURPOSE:
 * Final section of homepage that invites action
 * Not pushy, just an open invitation
 * Now includes visual trust signals with company logos
 * 
 * WHAT CHANGED IN THIS UPDATE:
 * 
 * 1. COMPANY LOGOS ADDED (Major Visual Upgrade)
 *    
 *    Before:
 *    - Just text names: "Camunda", "Accenture", etc.
 *    - opacity-50 (dim gray text)
 *    - Simple flex layout
 *    - No interaction
 *    
 *    After:
 *    - Real brand logos in Image components
 *    - Grayscale by default (fits B&W aesthetic)
 *    - Color reveals on hover (fun interaction!)
 *    - Professional spacing and sizing
 *    - Each logo individually configured
 *    
 *    Why changed:
 *    - Visual logos = stronger credibility
 *    - Grayscale keeps monochrome aesthetic
 *    - Hover effect adds interactivity
 *    - More professional than text-only
 * 
 * 2. HOVER EFFECT EXPLANATION
 *    
 *    How the logo hover works:
 *    
 *    Default state:
 *    - grayscale = removes all color (black/white only)
 *    - opacity-60 = slightly dimmed
 *    
 *    On hover:
 *    - hover:grayscale-0 = restores full brand colors
 *    - hover:opacity-100 = full brightness
 *    - transition-all duration-500 = smooth 0.5s transition
 *    
 *    Result: Gray logos "light up" in color when you hover
 *    (Same effect as the Four Pillars cards!)
 * 
 * 3. LOGO SIZING STRATEGY
 *    
 *    Different widths for different logo shapes:
 *    - Most logos: w-32 (128px wide)
 *    - Harry Norman/Forbes: w-48 (192px - wider combined logo)
 *    - Wags For Us: w-24 (96px - smaller personal business)
 *    - All logos: h-12 (48px tall - consistent height)
 *    
 *    Why: Maintains visual balance despite different logo shapes
 * 
 * 4. WHAT STAYED THE SAME (Working Great!)
 *    
 *    - Headline text and formatting (perfect tone)
 *    - CTA buttons (Get In Touch, Subscribe)
 *    - Background image setup (moody, subtle)
 *    - Overall layout and spacing
 *    - "Trusted By" label and positioning
 * 
 * LOGO FILES REQUIRED:
 * 
 * All logos must be in: /public/images/logos/
 * 
 * Files needed:
 * 1. camunda.png
 * 2. accenture.png
 * 3. pinterest.png
 * 4. harry-norman-forbes.webp
 * 5. wags-for-us.jpg
 * 
 * HOW TO ADD LOGOS:
 * 1. Create folder: /public/images/logos/
 * 2. Save all 5 logo files there
 * 3. Logos will automatically load
 * 
 * HOW TO MODIFY:
 * 
 * Add more logos:
 * - Copy one of the existing logo divs
 * - Change src to new logo filename
 * - Adjust width (w-32, w-24, w-48) as needed
 * 
 * Remove logos:
 * - Delete the entire <div className="relative..."> block
 * 
 * Change hover effect:
 * - Remove grayscale classes to keep color always
 * - Or change opacity values for different brightness
 * 
 * Adjust spacing:
 * - Modify gap-12 md:gap-16 for logo spacing
 * 
 * BUTTON BEHAVIOR (Unchanged):
 * - "Get In Touch" = White bg, stands out (primary CTA)
 * - "Subscribe" = Outline style (secondary CTA)
 * - Both have smooth hover states
 * 
 * NEWSLETTER INTEGRATION:
 * "Subscribe to Updates" button is placeholder
 * Replace with actual newsletter form:
 * - ConvertKit embed
 * - Mailchimp form
 * - Or custom form connected to your email service
 * 
 * IMPORTANT NOTES:
 * - Logo files must exist in /public/images/logos/
 * - Keep aspect ratios natural (don't stretch logos)
 * - Grayscale matches your B&W aesthetic perfectly
 * - Hover effect is same as Four Pillars cards (consistency!)
 * - Test on mobile - logos should wrap nicely (flex-wrap)
 * - All 5 companies you've worked with are represented
 */