'use client'

import { motion } from 'framer-motion'
import Image from 'next/image'

// ============================================================================
// TRUST SECTION - 95 YEARS OF EXCELLENCE + FORBES CREDIBILITY
// ============================================================================
// ↓ ADDED: New component to build credibility with brokerage heritage
// Purpose: Leverage Harry Norman's 95-year legacy + Forbes Global Properties
// Why: First-time buyers need reassurance - "Am I working with the best?"

interface TrustSectionProps {
  logoUrl?: string  // Path to Harry Norman + Forbes combo logo
}

// ============================================================================
// COLOR PALETTE - MATCHES HERO SECTION (Ferrari + Hermès Luxury)
// ============================================================================
/* no change - same colors as rest of funnel */
const colors = {
  primary: '#1F1F1F',           // Deep charcoal
  accentSoftPeach: '#FFAB91',   // Soft peach
  accentCoral: '#FF7961',       // Coral
  accentTeal: '#4DB6AC',        // Teal
  highlightGold: '#FFD54F',     // Gold
  textLight: '#FFFFFF',         // Pure white
}

export default function TrustSection({ logoUrl = '/images/HarryNorman_Logo.webp' }: TrustSectionProps) {
  
  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-[#2A2A2A] via-[#252525] to-[#2A2A2A] text-white py-20 px-6 md:px-12">
      
      {/* ================================================================ */}
      {/* BACKGROUND GLOWS - Floating orbs for depth */}
      {/* ================================================================ */}
      {/* ↓ MODIFIED: Slightly lighter background for visual separation from Quiz */}
      {/* Old: from-[#1F1F1F] via-[#2A2A2A] to-[#1F1F1F] */}
      {/* New: from-[#2A2A2A] via-[#252525] to-[#2A2A2A] */}
      {/* Why: Creates depth - Trust section feels "elevated" vs darker Quiz below */}
      <div className="absolute inset-0 opacity-20 pointer-events-none">
        <motion.div
          className="absolute top-20 left-1/4 w-96 h-96 bg-[#FFD54F] rounded-full blur-3xl"
          animate={{ 
            x: [0, 50, 0], 
            y: [0, -30, 0],
            scale: [1, 1.1, 1]
          }}
          transition={{ 
            duration: 20, 
            repeat: Infinity, 
            repeatType: 'loop' 
          }}
        />
        <motion.div
          className="absolute bottom-20 right-1/4 w-96 h-96 bg-[#FF7961] rounded-full blur-3xl"
          animate={{ 
            x: [0, -50, 0], 
            y: [0, 30, 0],
            scale: [1, 1.15, 1]
          }}
          transition={{ 
            duration: 25, 
            repeat: Infinity, 
            repeatType: 'loop' 
          }}
        />
        <motion.div
          className="absolute top-1/2 left-1/2 w-96 h-96 bg-[#4DB6AC] rounded-full blur-3xl"
          animate={{ 
            x: [0, 30, 0], 
            y: [0, -20, 0],
            scale: [1, 1.2, 1]
          }}
          transition={{ 
            duration: 22, 
            repeat: Infinity, 
            repeatType: 'loop' 
          }}
        />
      </div>

      {/* ================================================================ */}
      {/* MAIN CONTENT CONTAINER */}
      {/* ================================================================ */}
      <div className="relative max-w-6xl mx-auto">

        {/* ============================================================== */}
        {/* SECTION HEADLINE */}
        {/* ============================================================== */}
        {/* ↓ ADDED: Establishes institutional credibility immediately */}
        <motion.h2
          className="text-4xl md:text-5xl font-bold text-center mb-4 bg-gradient-to-r from-[#FFD54F] via-[#FFAB91] to-[#FF7961] bg-clip-text text-transparent"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          Backed by 95 Years of Atlanta Excellence
        </motion.h2>

        {/* ============================================================== */}
        {/* COMBO LOGO - Harry Norman + Forbes Global Properties */}
        {/* ============================================================== */}
        {/* ↓ ADDED: Single logo image (already combined by brokerage) */}
        {/* Legal: Must show Harry Norman, REALTORS® branding */}
        <motion.div
          className="flex justify-center mb-8"
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <div className="bg-white/5 backdrop-blur-sm rounded-2xl px-8 py-6 border border-white/10">
            <Image
              src={logoUrl}
              alt="Harry Norman REALTORS® - Forbes Global Properties"
              width={500}
              height={100}
              className="h-16 md:h-20 w-auto"
              priority
            />
          </div>
        </motion.div>

        {/* ============================================================== */}
        {/* AGENT NAME + CREDENTIALS */}
        {/* ============================================================== */}
        {/* ↓ ADDED: Your name with proper REALTOR® trademark */}
        {/* Legal: REALTOR® must be in all caps with ® symbol */}
        <motion.div
          className="text-center mb-12"
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3 }}
        >
          <p className="text-xl md:text-2xl font-semibold mb-1">
            Kerry Lee Hartley, REALTOR<sup className="text-xs">®</sup>
          </p>
          <p className="text-base md:text-lg text-white/70">
            Harry Norman, REALTORS<sup className="text-xs">®</sup>
          </p>
        </motion.div>

        {/* ============================================================== */}
        {/* STATS CARDS - 2024 Performance Numbers */}
        {/* ============================================================== */}
        {/* ↓ ADDED: Three key stats to prove scale and longevity */}
        {/* Data source: Harry Norman 2024 fact sheet */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          
          {/* STAT 1: Sales Volume */}
          <motion.div
            className="bg-white/5 backdrop-blur-sm rounded-2xl p-8 border border-white/10 text-center"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.4 }}
            whileHover={{ scale: 1.03, borderColor: 'rgba(255, 213, 79, 0.3)' }}
          >
            <div className="text-5xl md:text-6xl font-bold bg-gradient-to-r from-[#FFD54F] to-[#FFAB91] bg-clip-text text-transparent mb-2">
              $3.33B
            </div>
            <div className="text-sm md:text-base text-white/70 uppercase tracking-wider">
              Sales Volume
            </div>
            <div className="text-xs text-white/50 mt-1">
              2024
            </div>
          </motion.div>

          {/* STAT 2: Families Helped */}
          <motion.div
            className="bg-white/5 backdrop-blur-sm rounded-2xl p-8 border border-white/10 text-center"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.5 }}
            whileHover={{ scale: 1.03, borderColor: 'rgba(255, 171, 145, 0.3)' }}
          >
            <div className="text-5xl md:text-6xl font-bold bg-gradient-to-r from-[#FFAB91] to-[#FF7961] bg-clip-text text-transparent mb-2">
              5,688
            </div>
            <div className="text-sm md:text-base text-white/70 uppercase tracking-wider">
              Families Helped
            </div>
            <div className="text-xs text-white/50 mt-1">
              2024
            </div>
          </motion.div>

          {/* STAT 3: Years Serving Atlanta */}
          <motion.div
            className="bg-white/5 backdrop-blur-sm rounded-2xl p-8 border border-white/10 text-center"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.6 }}
            whileHover={{ scale: 1.03, borderColor: 'rgba(77, 182, 172, 0.3)' }}
          >
            <div className="text-5xl md:text-6xl font-bold bg-gradient-to-r from-[#FF7961] to-[#4DB6AC] bg-clip-text text-transparent mb-2">
              95+
            </div>
            <div className="text-sm md:text-base text-white/70 uppercase tracking-wider">
              Years Serving
            </div>
            <div className="text-xs text-white/50 mt-1">
              Atlanta
            </div>
          </motion.div>
        </div>

        {/* ============================================================== */}
        {/* TRUST QUOTE - Your Personal Message */}
        {/* ============================================================== */}
        {/* ↓ ADDED: Combines institutional trust with personal touch */}
        {/* Copy positioning: New agent + world-class brokerage */}
        <motion.div
          className="max-w-4xl mx-auto"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.7 }}
        >
          <blockquote className="text-center">
            <p className="text-lg md:text-xl leading-relaxed text-white/90 mb-4 italic">
              "When you work with me, you're backed by Atlanta's most trusted name in real estate, the credibility of Forbes' global network, and 95 years of proven expertise helping Atlanta families find their perfect home."
            </p>
            <footer className="text-base text-white/70">
              — Kerry Lee Hartley, REALTOR<sup className="text-xs">®</sup>
            </footer>
          </blockquote>
        </motion.div>

      </div>
    </section>
  )
}


// ============================================================================
// ============================================================================
// 
//                          📖 DOCUMENTATION
// 
// ============================================================================
// ============================================================================


/*
 * ============================================================================
 * PURPOSE
 * ============================================================================
 * 
 * The Trust Section builds instant credibility by leveraging:
 * 
 * 1️⃣ INSTITUTIONAL AUTHORITY - Harry Norman, REALTORS®
 * - 95+ years of Atlanta real estate expertise
 * - Not just a new agent, but backed by legacy institution
 * - "Atlanta's First in Luxury" positioning
 * 
 * 2️⃣ GLOBAL CREDIBILITY - Forbes Global Properties
 * - Exclusive Georgia member (no other brokerages have this!)
 * - Forbes = 167M+ global audience, 100+ years in business
 * - 80% share of voice in luxury real estate (beats all competitors)
 * 
 * 3️⃣ PROVEN PERFORMANCE - 2024 Stats
 * - $3.33B in sales volume (scale)
 * - 5,688 families helped (proven track record)
 * - 95+ years (longevity = stability)
 * 
 * WHY THIS MATTERS FOR FIRST-TIME BUYERS:
 * First-time buyers are anxious. They ask:
 * - "Am I working with someone who knows what they're doing?"
 * - "Can I trust this person with the biggest purchase of my life?"
 * - "What if I make a mistake?"
 * 
 * This section answers: "You're backed by the best. Relax."
 * 
 * 
 * ============================================================================
 * TECHNIQUES USED
 * ============================================================================
 * 
 * 1️⃣ ANIMATED GLOWS (Brand Consistency)
 * Three floating orbs (gold, coral, teal) create depth and luxury feel.
 * Same animation style as HeroSection for brand cohesion.
 * 
 * Technical implementation:
 * - Framer Motion animate prop with x/y/scale transforms
 * - 20-25 second durations for smooth, organic movement
 * - opacity-20 keeps them subtle (not distracting)
 * 
 * 2️⃣ GRADIENT TEXT (Premium Feel)
 * Main headline uses gradient from gold → peach → coral.
 * Stats use gradients too (each different for visual interest).
 * 
 * bg-gradient-to-r from-[#FFD54F] via-[#FFAB91] to-[#FF7961]
 * bg-clip-text text-transparent
 * 
 * Why: Gradients = modern, premium, eye-catching
 * 
 * 3️⃣ HOVER EFFECTS (Micro-interactions)
 * Stats cards scale up 3% and glow on hover.
 * whileHover={{ scale: 1.03, borderColor: 'rgba(...)' }}
 * 
 * Why: Rewards exploration, feels alive, premium attention to detail
 * 
 * 4️⃣ STAGGERED ANIMATIONS (Professional Polish)
 * Each element fades in sequentially (0.1-0.2s delays).
 * Headline → Logo → Name → Stats → Quote
 * 
 * transition={{ duration: 0.6, delay: 0.4 }}
 * 
 * Why: Guides eye down page, feels choreographed not chaotic
 * 
 * 5️⃣ GLASSMORPHISM (Modern Luxury)
 * Cards use backdrop-blur-sm with white/5 backgrounds.
 * border border-white/10 for subtle definition.
 * 
 * Why: Trendy, premium, lets glows show through
 * 
 * 
 * ============================================================================
 * HOW IT FITS IN THE FUNNEL
 * ============================================================================
 * 
 * PAGE STRUCTURE:
 * 1. Navigation
 * 2. HeroSection (video + "Get Access" CTA)
 * 3. ✨ TrustSection (THIS COMPONENT - builds credibility)
 * 4. Quiz Section ("Are You Making These Buyer Mistakes?")
 * 5. Blog Preview Section
 * 6. FAQ Section
 * 7. LeadForm Section (second conversion opportunity)
 * 8. Footer
 * 
 * PSYCHOLOGY FLOW:
 * - Hero: "Watch video, get excited"
 * - Trust: "Okay, this is legit. I can trust them."
 * - Quiz: "Let me see if I'm on the right track"
 * - Convert: "Yes, I need help. Let's do this."
 * 
 * Trust Section is CRITICAL bridge between:
 * Interest (video) → Confidence (trust) → Action (quiz/form)
 * 
 * 
 * ============================================================================
 * CUSTOMIZATION GUIDE
 * ============================================================================
 * 
 * CHANGE STATS:
 * Update the three stat cards with current year data:
 * - Sales Volume: Line 151 (text-5xl div)
 * - Families Helped: Line 170 (text-5xl div)
 * - Years: Line 189 (text-5xl div)
 * 
 * CHANGE LOGO:
 * Replace logoUrl prop in page.tsx:
 * <TrustSection logoUrl="/images/your-logo.webp" />
 * 
 * CHANGE QUOTE:
 * Update the blockquote section (lines 208-217):
 * - Main text: Line 211 (inside <p> tag)
 * - Attribution: Line 214 (footer element)
 * 
 * ADD MORE STATS:
 * Copy one of the motion.div blocks (lines 144-158)
 * Paste in grid, update:
 * - Number (text-5xl div)
 * - Label (uppercase text)
 * - Delay (transition.delay)
 * - Gradient colors
 * 
 * ADJUST COLORS:
 * All colors defined at top (lines 16-23)
 * Used throughout via colors.highlightGold, etc.
 * 
 * 
 * ============================================================================
 * BRAND ALIGNMENT
 * ============================================================================
 * 
 * FERRARI PRINCIPLES:
 * - Bold gradients (performance, energy)
 * - Animated glows (dynamic, moving)
 * - Hover effects (responsive, alive)
 * - Large numbers (confidence, scale)
 * 
 * HERMÈS PRINCIPLES:
 * - Dark sophisticated background (restraint)
 * - Subtle glassmorphism (quality materials)
 * - Elegant typography (craftsmanship)
 * - White space (timeless, uncluttered)
 * 
 * LUXURY PSYCHOLOGY:
 * Dark = sophisticated, premium, exclusive
 * Glows = atmospheric, magical, special
 * Gradient = modern, innovative, forward-thinking
 * Stats = proof, scale, institutional strength
 * 
 * 
 * ============================================================================
 * LEGAL & COMPLIANCE
 * ============================================================================
 * 
 * REALTOR® TRADEMARK:
 * - Must be in ALL CAPS
 * - Must include ® symbol
 * - Used as: REALTOR®
 * - Implemented as: <sup className="text-xs">®</sup>
 * 
 * WHY: NAR (National Association of REALTORS®) requires this
 * 
 * COMPANY NAME:
 * - Must be: Harry Norman, REALTORS®
 * - Not: Harry Norman Realtors (missing ®)
 * - Not: Harry Norman REALTORS (missing ®)
 * 
 * FORBES GLOBAL PROPERTIES:
 * - Logo is combo (Harry Norman + Forbes)
 * - "Exclusive Georgia member" claim is accurate (per PDFs)
 * - Stats from official Harry Norman fact sheet (2024)
 * 
 * 
 * ============================================================================
 * TECHNICAL NOTES
 * ============================================================================
 * 
 * DEPENDENCIES:
 * - framer-motion: Animations
 * - next/image: Optimized logo loading
 * - Tailwind CSS: Styling
 * 
 * PERFORMANCE:
 * - Logo uses priority loading (appears faster)
 * - Animations use whileInView (only animate when visible)
 * - viewport={{ once: true }} prevents re-animating on scroll
 * 
 * ACCESSIBILITY:
 * - Semantic HTML (section, h2, blockquote)
 * - Alt text on logo image
 * - High contrast text (white on dark)
 * - WCAG AA compliant color ratios
 * 
 * MOBILE OPTIMIZATION:
 * - Grid switches to single column on mobile (grid-cols-1 md:grid-cols-3)
 * - Text sizes scale down (text-4xl md:text-5xl)
 * - Logo height adjusts (h-16 md:h-20)
 * - Padding adjusts (px-6 md:px-12)
 * 
 * 
 * ============================================================================
 * CONVERSION PSYCHOLOGY
 * ============================================================================
 * 
 * THIS SECTION ADDRESSES 3 KEY OBJECTIONS:
 * 
 * OBJECTION 1: "Are you experienced enough?"
 * ANSWER: "I'm backed by 95 years of expertise"
 * 
 * OBJECTION 2: "How do I know you're legitimate?"
 * ANSWER: "Forbes Global Properties exclusive member + $3.33B volume"
 * 
 * OBJECTION 3: "What if I make a mistake?"
 * ANSWER: "5,688 families trusted us in 2024 alone"
 * 
 * EMOTIONAL TRIGGERS:
 * - Safety (institutional backing)
 * - Status (Forbes, luxury associations)
 * - Proof (stats, numbers)
 * - Heritage (95 years = stability)
 * 
 * 
 * ============================================================================
 * STATS EXPLAINED
 * ============================================================================
 * 
 * $3.33B SALES VOLUME (2024):
 * - Shows scale and market presence
 * - Validates that Harry Norman is a major player
 * - First-time buyers think: "They must be good if they're doing $3B+"
 * 
 * 5,688 FAMILIES HELPED (2024):
 * - Humanizes the numbers (not just $, but people)
 * - Shows consistent volume (not a one-hit wonder)
 * - First-time buyers think: "5,000+ people trusted them, I can too"
 * 
 * 95+ YEARS:
 * - Longevity = stability
 * - Survived Great Depression, multiple recessions
 * - First-time buyers think: "They've been around forever, they're safe"
 * 
 * WHY THESE THREE?
 * They work together:
 * - $ = power
 * - People = proof
 * - Years = permanence
 * 
 * 
 * ============================================================================
 * FUTURE ENHANCEMENTS
 * ============================================================================
 * 
 * PHASE 2 ADDITIONS (OPTIONAL):
 * - Add award badges (if you get specific awards)
 * - Add client testimonial quotes
 * - Add "As Seen In" media logos
 * - Add team photos
 * 
 * A/B TEST IDEAS:
 * - Quote vs no quote (which converts better?)
 * - 3 stats vs 4 stats (is more better?)
 * - Headline variations ("Backed by" vs "Trusted by" vs "Powered by")
 * 
 * PERSONALIZATION IDEAS:
 * - Different stats for luxury vs first-time pages
 * - Different quotes for different buyer types
 * - Dynamic "families helped" counter (updates monthly)
 * 
 */