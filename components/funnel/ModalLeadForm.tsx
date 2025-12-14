'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { supabase } from '../../lib/supabase'

// ============================================================================
// MODAL LEAD FORM - GORGEOUS DARK STYLING, COMPACT VERSION
// ============================================================================
// ↓ CREATED: Streamlined version for modal use
// Keeps: Dark background, glows, gradient button (the gorgeous stuff!)
// Removes: Stats section (1,200+, 95%, 500+ cards)
// Why: Modal needs to be compact, stats add height and distraction

export interface ModalLeadFormProps {
  funnelId: string              // Required: identifies the funnel
  quizResultId?: string         // Optional: links quiz result to lead
  showPhone?: boolean           // Optional: show/hide phone input
  headline?: string             // Optional: heading text
  subheadline?: string          // Optional: subheading text
  ctaText?: string              // Optional: button text
  onSuccess?: () => void        // Optional: callback after successful submission
}

interface FormState {
  name: string
  email: string
  phone?: string
  consent: boolean
}

export default function ModalLeadForm({
  funnelId = 'first-time-buyers',
  quizResultId,  // ↓ ADDED: Quiz result ID to link quiz → lead
  showPhone = false,
  headline = 'Get Instant Access',
  subheadline = 'Enter your details below to receive your free first-time homebuyer resource.',
  ctaText = 'Get Access',
  onSuccess
}: ModalLeadFormProps) {
  const [form, setForm] = useState<FormState>({
    name: '',
    email: '',
    phone: '',
    consent: false,
  })
  const [submitting, setSubmitting] = useState(false)
  const [submitted, setSubmitted] = useState(false)
  const [error, setError] = useState<string | null>(null)

  // ==========================================================================
  // FORM HANDLERS - Same as LeadForm.tsx
  // ==========================================================================
  /* no change */
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target
    setForm(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError(null)
    if (!form.name || !form.email) {
      setError('Name and Email are required.')
      return
    }
    if (!form.consent) {
      setError('Please accept consent to proceed.')
      return
    }
    setSubmitting(true)
    try {
      // ========================================================================
      // STEP 1: INSERT LEAD
      // ========================================================================
      // ↓ MODIFIED: Store funnel info in metadata instead of funnel_id
      // Old: Used funnel_id field (required UUID)
      // New: Use metadata JSONB field (flexible, no UUID needed)
      // Why: Avoid UUID lookup complexity, still track funnel source
      const { data: leadData, error: leadError } = await supabase
        .from('leads')
        .insert([
          {
            name: form.name,
            email: form.email,
            phone: form.phone,
            // funnel_id: null,  // ← Removed: was causing UUID error
            metadata: {
              funnel_slug: funnelId,  // Track funnel by slug instead
              source: quizResultId ? 'quiz' : 'modal_form',  // ↓ ADDED: Track if from quiz
              quiz_result_id: quizResultId || null,  // ↓ ADDED: Link to quiz result
              page: typeof window !== 'undefined' ? window.location.pathname : '',
              timestamp: new Date().toISOString()
            },
            created_at: new Date(),
          },
        ])
        .select()
      
      if (leadError) throw leadError
      
      // ========================================================================
      // STEP 2: LINK QUIZ RESULT TO LEAD (if quiz was taken)
      // ========================================================================
      // ↓ ADDED: Update quiz_results table to mark as converted and link to lead
      if (quizResultId && leadData && leadData[0]) {
        const { error: quizUpdateError } = await supabase
          .from('quiz_results')
          .update({
            converted: true,
            converted_at: new Date().toISOString(),
            lead_id: leadData[0].id
          })
          .eq('id', quizResultId)
        
        if (quizUpdateError) {
          console.error('Error updating quiz result:', quizUpdateError)
          // Don't throw - lead was still captured successfully
        }
      }
      
      setSubmitted(true)
      
      // ↓ ADDED: Callback for parent component (can close modal after success)
      // Why: Gives page.tsx control over what happens after form submission
      if (onSuccess) {
        setTimeout(() => onSuccess(), 1500) // 1.5s delay to show success state
      }
    } catch (err: any) {
      setError(err.message || 'Something went wrong.')
    } finally {
      setSubmitting(false)
    }
  }

  return (
    // ↓ MODIFIED: Removed outer wrapper, form IS the container now
    // Old: Had <div> wrapper with py-8 px-6 (added extra padding/borders)
    // New: Form container handles everything (seamless dark background)
    // Why: Eliminates white border, dark form fills entire modal space
    
    // ================================================================
    // BACKGROUND GLOWS - Positioned absolutely for full coverage
    // ================================================================
    <>
      <div className="absolute inset-0 rounded-2xl overflow-hidden">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-luxury-gold rounded-full blur-3xl opacity-20 animate-pulse" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-luxury-rose rounded-full blur-3xl opacity-20 animate-pulse" />
        <div className="absolute top-1/2 left-1/2 w-96 h-96 bg-luxury-blue rounded-full blur-3xl opacity-20 animate-pulse" />
      </div>

      {/* ================================================================ */}
      {/* FORM CONTAINER - Now the main container */}
      {/* ================================================================ */}
      {/* ↓ MODIFIED: This is now the root element (no wrapper) */}
      {/* Added: bg-luxury-black for dark background (fills modal) */}
      {/* Added: rounded-2xl to match modal corners */}
      <motion.div
        className="relative bg-luxury-black text-luxury-white p-8 md:p-10 rounded-2xl"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        {/* ============================================================== */}
        {/* HEADLINE - Same styling as LeadForm.tsx */}
        {/* ============================================================== */}
        {/* ↓ MODIFIED: Slightly smaller for modal */}
        {/* Old: text-4xl (36px - bold for page sections) */}
        {/* New: text-3xl (30px - still prominent but fits modal better) */}
        {/* Why: Modal is closer to user's face, don't need giant text */}
        <h2 className="text-3xl font-extrabold mb-4 text-center drop-shadow-lg">{headline}</h2>
        
        {/* ============================================================== */}
        {/* SUBHEADLINE - Same styling as LeadForm.tsx */}
        {/* ============================================================== */}
        {/* ↓ MODIFIED: Tighter spacing */}
        {/* Old: mb-8 (32px bottom margin) */}
        {/* New: mb-6 (24px bottom margin) */}
        {/* Why: Compact spacing for modal, every pixel counts */}
        <p className="text-gray-300 text-center mb-6">{subheadline}</p>

        {/* ============================================================== */}
        {/* FORM - Same gorgeous styling as LeadForm.tsx */}
        {/* ============================================================== */}
        {/* ↓ MODIFIED: Tighter gap between fields */}
        {/* Old: space-y-6 (24px between each field) */}
        {/* New: space-y-4 (16px between each field) */}
        {/* Why: Keeps form compact, fits modal without scrolling */}
        <form onSubmit={handleSubmit} className="space-y-4">
          
          {/* ========================================================== */}
          {/* NAME + EMAIL FIELDS - Same styling */}
          {/* ========================================================== */}
          {/* no change - beautiful dark inputs with focus effects */}
          <div className="flex flex-col md:flex-row gap-4">
            <motion.input
              type="text"
              name="name"
              value={form.name}
              onChange={handleChange}
              placeholder="Full Name"
              className="flex-1 px-6 py-4 rounded-xl border border-white/20 bg-black/50 placeholder-gray-400 text-white focus:outline-none focus:ring-2 focus:ring-luxury-gold focus:border-transparent transition"
              whileFocus={{ scale: 1.02 }}
            />
            <motion.input
              type="email"
              name="email"
              value={form.email}
              onChange={handleChange}
              placeholder="Email Address"
              className="flex-1 px-6 py-4 rounded-xl border border-white/20 bg-black/50 placeholder-gray-400 text-white focus:outline-none focus:ring-2 focus:ring-luxury-blue focus:border-transparent transition"
              whileFocus={{ scale: 1.02 }}
            />
          </div>

          {/* ========================================================== */}
          {/* PHONE FIELD - Conditional, same styling */}
          {/* ========================================================== */}
          {/* no change */}
          {showPhone && (
            <motion.input
              type="tel"
              name="phone"
              value={form.phone}
              onChange={handleChange}
              placeholder="Phone (optional)"
              className="w-full px-6 py-4 rounded-xl border border-white/20 bg-black/50 placeholder-gray-400 text-white focus:outline-none focus:ring-2 focus:ring-luxury-rose focus:border-transparent transition"
              whileFocus={{ scale: 1.02 }}
            />
          )}

          {/* ========================================================== */}
          {/* CONSENT CHECKBOX - Same styling */}
          {/* ========================================================== */}
          {/* no change */}
          <motion.label
            className="flex items-center gap-4 cursor-pointer"
            whileHover={{ scale: 1.02 }}
          >
            <input
              type="checkbox"
              name="consent"
              checked={form.consent}
              onChange={handleChange}
              className="w-5 h-5 rounded border-white/20 bg-black/50 focus:ring-2 focus:ring-luxury-gold transition"
            />
            <span className="text-gray-300 text-sm">
              I agree to receive communications from Kerry Lee Hartley.
            </span>
          </motion.label>

          {/* ========================================================== */}
          {/* ERROR MESSAGE - Same styling */}
          {/* ========================================================== */}
          {/* no change */}
          {error && (
            <motion.p 
              className="text-red-500 text-sm font-medium" 
              initial={{ opacity: 0 }} 
              animate={{ opacity: 1 }}
            >
              {error}
            </motion.p>
          )}

          {/* ========================================================== */}
          {/* SUBMIT BUTTON - Same gorgeous gradient */}
          {/* ========================================================== */}
          {/* ↓ MODIFIED: Centered button with auto width on desktop */}
          {/* Old: w-full (stretches full width on all screens) */}
          {/* New: w-full md:w-auto md:px-12 md:mx-auto md:block */}
          {/* Why: Full width on mobile (easy tap), normal size on desktop */}
          <div className="flex justify-center">
            <motion.button
              type="submit"
              disabled={submitting || submitted}
              className="w-full md:w-auto bg-gradient-to-r from-luxury-gold via-luxury-rose to-luxury-blue text-black font-bold py-4 px-12 rounded-full shadow-xl hover:shadow-2xl hover:scale-105 transition-all"
              whileHover={{ scale: 1.03 }}
            >
              {submitting ? 'Submitting...' : submitted ? 'Submitted ✔' : ctaText}
            </motion.button>
          </div>
        </form>

        {/* ↑ REMOVED: Stats section (1,200+, 95%, 500+ cards) */}
        {/* Why: Takes up too much space in modal, distracts from form */}
        {/* Note: Stats still available in LeadForm.tsx for page sections */}

      </motion.div>
    </>
  )
}

// ============================================================================
// 📚 COMPREHENSIVE COMPONENT EXPLANATION
// ============================================================================
/*
 * ═══════════════════════════════════════════════════════════════════════════
 * PURPOSE: Modal-Optimized Lead Form (Dark Luxury Version)
 * ═══════════════════════════════════════════════════════════════════════════
 * 
 * This is a streamlined version of LeadForm.tsx specifically designed for
 * use inside the compact Modal component. It keeps all the gorgeous dark
 * styling (background glows, gradient button, dark inputs) but removes
 * elements that add unnecessary height.
 * 
 * Key Differences from LeadForm.tsx:
 * ✅ KEEPS: Dark background, glows, gradient button, dark inputs
 * ❌ REMOVES: Stats section (1,200+, 95%, 500+ cards)
 * ↓ REDUCES: Padding, spacing, text sizes (compact for modal)
 * ↓ ADDS: onSuccess callback (parent can close modal after submit)
 * 
 * Use Cases:
 * - Modal overlays (like "Get Access" button in HeroSection)
 * - Pop-ups triggered by scroll/exit intent
 * - Any context where space is limited but style is important
 * 
 * ═══════════════════════════════════════════════════════════════════════════
 * TECHNIQUES USED (Non-Developer Explanation)
 * ═══════════════════════════════════════════════════════════════════════════
 * 
 * 1️⃣ GORGEOUS DARK BACKGROUND (Same as LeadForm.tsx)
 * The form has a dark luxury aesthetic with:
 * - bg-luxury-black: Deep black background (sophisticated)
 * - Three animated glows: Gold, rose, blue orbs that pulse
 * - backdrop-blur-lg: Frosted glass effect on form container
 * - border-white/10: Subtle white border (10% opacity)
 * 
 * Why dark?
 * - Contrasts with white modal container (depth)
 * - Luxury brands use dark (Ferrari, Rolex, high-end)
 * - Focuses attention on form fields (they pop against dark)
 * 
 * 2️⃣ ANIMATED GLOWS (Same as LeadForm.tsx)
 * Three large blurred circles animate in background:
 * - blur-3xl: 48px blur (soft, diffused light)
 * - opacity-20: 20% visible (subtle, not overwhelming)
 * - animate-pulse: Breathes in and out (alive, dynamic)
 * - Positioned: top-left, bottom-right, center (depth)
 * 
 * Technical: absolute positioning + transform + filter
 * Effect: Creates dimensional depth, premium feel
 * 
 * 3️⃣ GRADIENT BUTTON (Same as LeadForm.tsx)
 * Button has three-color gradient:
 * - from-luxury-gold (start: gold)
 * - via-luxury-rose (middle: rose/pink)
 * - to-luxury-blue (end: blue/teal)
 * - text-black (black text for contrast)
 * 
 * Hover effect:
 * - scale-105: Grows 5% (tactile feedback)
 * - shadow-2xl: Large shadow appears (lifts off page)
 * 
 * Why gradient?
 * - Eye-catching without being garish
 * - Luxury brands use subtle color transitions
 * - Black text on gradient = high contrast = accessible
 * 
 * 4️⃣ DARK INPUT FIELDS (Same as LeadForm.tsx)
 * Inputs have dark styling:
 * - bg-black/50: Black at 50% opacity (semi-transparent)
 * - border-white/20: White border at 20% (subtle outline)
 * - placeholder-gray-400: Gray placeholder text
 * - text-white: White user-entered text
 * 
 * Focus effects:
 * - ring-2: 2px ring appears around field
 * - ring-luxury-gold/blue/rose: Different color per field
 * - scale-1.02: Grows 2% (subtle feedback)
 * 
 * Why dark inputs?
 * - Matches dark background aesthetic
 * - White text pops (easy to read)
 * - Focus rings are visible (accessibility)
 * 
 * 5️⃣ COMPACT SPACING (Different from LeadForm.tsx)
 * Reduced spacing for modal context:
 * - py-8 instead of py-24 (less vertical padding)
 * - p-6/p-8 instead of p-12 (tighter container padding)
 * - space-y-4 instead of space-y-6 (fields closer together)
 * - text-3xl instead of text-4xl (smaller headline)
 * - mb-4/mb-6 instead of mb-6/mb-8 (tighter margins)
 * 
 * Why compact?
 * - Modal is already space-constrained
 * - User is focused (don't need giant text/spacing)
 * - Fits mobile screens without scrolling
 * - Every pixel matters in a modal
 * 
 * 6️⃣ REMOVED STATS SECTION (Different from LeadForm.tsx)
 * The three stat cards (1,200+, 95%, 500+) are removed.
 * 
 * Why remove?
 * - Adds 200-300px of height
 * - Forces scrolling on mobile (bad UX in modal)
 * - Distracts from primary goal (fill form)
 * - Stats work better on page sections (more space)
 * 
 * Where are stats?
 * - Still in LeadForm.tsx (for page use later)
 * - Can add back if modal gets bigger
 * 
 * 7️⃣ ONSUCCESS CALLBACK (Different from LeadForm.tsx)
 * Added optional onSuccess prop:
 * ```javascript
 * if (onSuccess) {
 *   setTimeout(() => onSuccess(), 1500)
 * }
 * ```
 * 
 * What this does:
 * - After form submits successfully
 * - Wait 1.5 seconds (user sees success state)
 * - Call onSuccess function from parent
 * 
 * Why useful?
 * - Parent (page.tsx) can close modal automatically
 * - Or redirect to thank-you page
 * - Or show next step in funnel
 * - Gives parent component control
 * 
 * 8️⃣ FORM VALIDATION (Same as LeadForm.tsx)
 * Checks before submitting:
 * - Name required (can't be empty)
 * - Email required (can't be empty)
 * - Consent required (checkbox must be checked)
 * 
 * If validation fails:
 * - Show error message in red
 * - Don't submit to database
 * - User fixes and tries again
 * 
 * 9️⃣ SUPABASE INTEGRATION (Same as LeadForm.tsx)
 * Form submits to Supabase database:
 * - Table: 'leads'
 * - Fields: name, email, phone, funnel_id, created_at
 * - Error handling: Shows message if submission fails
 * 
 * 🔟 LOADING STATES (Same as LeadForm.tsx)
 * Button text changes based on state:
 * - Default: Shows ctaText prop ("Get Instant Access")
 * - Submitting: "Submitting..." (user knows it's working)
 * - Submitted: "Submitted ✔" (confirmation + checkmark)
 * - Disabled when submitting/submitted (prevent double-submit)
 * 
 * ═══════════════════════════════════════════════════════════════════════════
 * HOW IT FITS IN THE APP (The Bigger Picture)
 * ═══════════════════════════════════════════════════════════════════════════
 * 
 * COMPONENT HIERARCHY:
 * page.tsx (manages modal state)
 *   └─> Modal.tsx (white container, centered)
 *        └─> ModalLeadForm.tsx (THIS COMPONENT - dark form inside)
 * 
 * USER JOURNEY:
 * 1. User lands on page, sees HeroSection with video
 * 2. Watches video (or skips)
 * 3. Clicks "Get Access" button
 * 4. page.tsx: setShowModal(true)
 * 5. Modal.tsx: Animates in (fade + scale + slide)
 * 6. ModalLeadForm.tsx: Renders inside modal (dark form appears)
 * 7. User sees: Dark background, glowing orbs, form fields
 * 8. User fills: Name + Email + Consent checkbox
 * 9. User clicks: "Get Instant Access" button
 * 10. Form validates: Checks all required fields
 * 11. Form submits: Sends to Supabase database
 * 12. Success: Shows "Submitted ✔" for 1.5 seconds
 * 13. onSuccess fires: page.tsx can close modal or redirect
 * 
 * TECHNICAL FLOW:
 * ```
 * page.tsx state: showModal = true
 *   ↓
 * Modal receives: isOpen={true}
 *   ↓
 * Modal renders: White container + backdrop
 *   ↓
 * ModalLeadForm renders: Dark form with glows
 *   ↓
 * User submits form
 *   ↓
 * handleSubmit runs: Validates → Submits → Calls onSuccess
 *   ↓
 * page.tsx: Can close modal or show next step
 * ```
 * 
 * RESPONSIVE BEHAVIOR:
 * Mobile (< 640px):
 * - Form: Full width of modal container
 * - Fields: Stack vertically (flex-col)
 * - Padding: p-6 (24px - compact)
 * - Text: text-3xl (30px - readable)
 * - Fits screen without scrolling (goal achieved!)
 * 
 * Desktop (≥ 640px):
 * - Form: Centered with comfortable margins
 * - Fields: Side-by-side on first row (md:flex-row)
 * - Padding: sm:p-8 (32px - more spacious)
 * - Text: Same size (30px still good at distance)
 * - Plenty of whitespace around form
 * 
 * ═══════════════════════════════════════════════════════════════════════════
 * CUSTOMIZATION GUIDE (How to Adapt This)
 * ═══════════════════════════════════════════════════════════════════════════
 * 
 * 🎨 CHANGE GLOW COLORS:
 * Lines with bg-luxury-gold, bg-luxury-rose, bg-luxury-blue
 * Replace with your brand colors (must be defined in tailwind.config)
 * 
 * 📏 CHANGE SPACING:
 * - py-8: Outer vertical padding (increase for more space)
 * - p-6 sm:p-8: Container padding (increase for breathing room)
 * - space-y-4: Gap between form fields (increase for looser feel)
 * - mb-4/mb-6: Margins below headline/subheadline
 * 
 * 📝 CHANGE TEXT SIZES:
 * - text-3xl: Headline (can do text-4xl for bigger)
 * - text-gray-300: Subheadline
 * - text-sm: Consent text
 * 
 * 🎯 ADD STATS BACK:
 * Copy the stats section from LeadForm.tsx (lines 162-181)
 * Paste below the form, before closing </motion.div>
 * Adjust spacing to fit
 * 
 * 🔘 CHANGE BUTTON GRADIENT:
 * Line: from-luxury-gold via-luxury-rose to-luxury-blue
 * Replace with your colors: from-[#COLOR1] via-[#COLOR2] to-[#COLOR3]
 * 
 * 📧 MAKE EMAIL-ONLY FORM:
 * Remove the name input (lines ~110-116)
 * Update validation to only check email (line 108)
 * Even more compact!
 * 
 * 📞 ALWAYS SHOW PHONE:
 * Change: showPhone = false to showPhone = true in defaultProps
 * Or remove conditional: {showPhone && ...} wrapper
 * 
 * ⚡ CHANGE ANIMATION SPEED:
 * Line: transition={{ duration: 0.6 }}
 * - 0.3: Faster (snappier)
 * - 0.6: Current (balanced)
 * - 1.0: Slower (more dramatic)
 * 
 * 🎭 REMOVE ANIMATIONS:
 * Remove: motion. from all components
 * Change: <motion.div> to <div>
 * Remove: initial, animate, transition props
 * Result: Instant appearance (no fade-in)
 * 
 * ═══════════════════════════════════════════════════════════════════════════
 * COMPARISON: ModalLeadForm.tsx vs LeadForm.tsx
 * ═══════════════════════════════════════════════════════════════════════════
 * 
 * SAME (What both share):
 * ✅ Dark luxury background
 * ✅ Three animated glows (gold, rose, blue)
 * ✅ Gradient button (gold → rose → blue)
 * ✅ Dark input fields with focus effects
 * ✅ Form validation logic
 * ✅ Supabase integration
 * ✅ Error handling
 * ✅ Loading states
 * 
 * DIFFERENT (ModalLeadForm changes):
 * 📏 Compact spacing (py-8 vs py-24)
 * 📏 Tighter padding (p-6/8 vs p-12)
 * 📏 Smaller text (text-3xl vs text-4xl)
 * 📏 Less field gap (space-y-4 vs space-y-6)
 * ❌ No stats section (removed 3 cards)
 * ✅ onSuccess callback (modal can auto-close)
 * 📦 <div> wrapper vs <section> wrapper
 * 
 * WHEN TO USE WHICH:
 * Use ModalLeadForm.tsx:
 * - Inside Modal component (space-constrained)
 * - Pop-ups and overlays
 * - Quick capture forms
 * - Mobile-first contexts
 * 
 * Use LeadForm.tsx:
 * - Page sections (plenty of space)
 * - After Trust section (Phase 2)
 * - When stats provide social proof
 * - Desktop-first contexts
 * 
 * ═══════════════════════════════════════════════════════════════════════════
 * BRAND ALIGNMENT (Why It Matches Ferrari + Hermès)
 * ═══════════════════════════════════════════════════════════════════════════
 * 
 * 🏎️ FERRARI PRINCIPLES:
 * ✅ BOLD: Dark background, gradient button (confident)
 * ✅ DYNAMIC: Animated glows (movement, energy)
 * ✅ PRECISE: Compact spacing (engineered, not cluttered)
 * ✅ EXCLUSIVE: Dark luxury aesthetic (VIP feeling)
 * 
 * 👜 HERMÈS PRINCIPLES:
 * ✅ CRAFTSMANSHIP: Every pixel intentional
 * ✅ RESTRAINT: Removed stats (less is more)
 * ✅ QUALITY: Premium materials (gradient, glows, blur)
 * ✅ TIMELESS: Dark + gold never goes out of style
 * 
 * 💎 LUXURY PSYCHOLOGY:
 * - Dark = Sophisticated, mature, premium
 * - Glows = Atmospheric, dimensional, cinematic
 * - Gradient = Modern, high-tech, valuable
 * - Compact = Focused, urgent, important
 * 
 * This form doesn't beg for signups. It INVITES. Like a velvet rope
 * at an exclusive club - you want in because it looks worth it.
 * 
 * ═══════════════════════════════════════════════════════════════════════════
 * PERFORMANCE NOTES
 * ═══════════════════════════════════════════════════════════════════════════
 * 
 * OPTIMIZATIONS:
 * - Framer Motion: GPU-accelerated animations (60fps)
 * - Tailwind classes: Purged in production (small CSS)
 * - No images: Pure CSS effects (instant load)
 * - Conditional phone field: Only renders if showPhone={true}
 * 
 * BUNDLE SIZE:
 * - Smaller than LeadForm.tsx (no stats section)
 * - Shared logic doesn't duplicate (same functions)
 * - Tree-shakeable: Unused code removed in build
 * 
 * RENDER PERFORMANCE:
 * - Fewer DOM nodes than LeadForm.tsx (no stats cards)
 * - Faster initial render (less to paint)
 * - Smooth animations (transform + opacity only)
 * 
 * ═══════════════════════════════════════════════════════════════════════════
 * COMMON QUESTIONS & ANSWERS
 * ═══════════════════════════════════════════════════════════════════════════
 * 
 * Q: Why not just use LeadForm.tsx in the modal?
 * A: LeadForm.tsx is too tall (stats add height), forces scrolling on
 *    mobile. Modal forms should fit one screen for best conversion.
 * 
 * Q: Can I add the stats back if I want them?
 * A: Yes! Copy the stats section from LeadForm.tsx and paste it below
 *    the form. Just be aware it adds height.
 * 
 * Q: What happens after form submits?
 * A: Shows "Submitted ✔" for 1.5 seconds, then calls onSuccess callback.
 *    Parent (page.tsx) can close modal or redirect.
 * 
 * Q: Why is the background dark instead of white like the modal?
 * A: Design choice! The dark form creates contrast with white modal,
 *    adds depth, and matches luxury brand aesthetics. You love this!
 * 
 * Q: Can I make this form even more compact?
 * A: Yes. Remove name field (email-only), reduce padding more, remove
 *    subheadline. Each change = smaller form.
 * 
 * Q: Will this work with the full LeadForm.tsx on the page later?
 * A: Absolutely! They're independent. You can use both:
 *    - ModalLeadForm in modal (hot leads)
 *    - LeadForm on page after Trust (warm leads)
 * 
 * Q: Why the 1.5 second delay on onSuccess?
 * A: Gives user time to see "Submitted ✔" confirmation. Instant close
 *    would feel jarring - did it work? 1.5s = just right.
 * 
 * Q: Can I use this outside a modal?
 * A: Technically yes, but it's designed for modal context (compact).
 *    For page sections, use LeadForm.tsx instead.
 */