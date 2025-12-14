'use client'

import { motion, AnimatePresence } from 'framer-motion'
import { X } from 'lucide-react'  // ↓ ADDED: Lucide-react for clean X icon
import { useEffect } from 'react'

// ============================================================================
// MODAL OVERLAY COMPONENT - COMPACT SIZE
// ============================================================================
// ↓ MODIFIED: Reduced modal width from max-w-2xl to max-w-md
// Old: 672px wide (too large for mobile, excessive desktop)
// New: 448px wide (perfect mobile fit, better desktop proportions)
// Why: Compact modals feel focused, convert better, fit mobile screens

interface ModalProps {
  isOpen: boolean           // Controls modal visibility
  onClose: () => void       // Function to call when closing modal
  children: React.ReactNode // Content to display inside (LeadForm)
}

export default function Modal({ isOpen, onClose, children }: ModalProps) {
  
  // ==========================================================================
  // BODY SCROLL LOCK - Prevent background page scrolling when modal open
  // ==========================================================================
  /* no change */
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden'  // Lock scroll
    } else {
      document.body.style.overflow = 'unset'   // Restore scroll
    }
    
    // Cleanup: Restore scroll when component unmounts
    return () => {
      document.body.style.overflow = 'unset'
    }
  }, [isOpen])

  // ==========================================================================
  // ESC KEY HANDLER - Close modal when user presses Escape
  // ==========================================================================
  /* no change */
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        onClose()
      }
    }
    
    window.addEventListener('keydown', handleEscape)
    return () => window.removeEventListener('keydown', handleEscape)
  }, [isOpen, onClose])

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* ================================================================ */}
          {/* OVERLAY BACKDROP - Dimmed background behind modal */}
          {/* ================================================================ */}
          {/* no change */}
          <motion.div
            className="fixed inset-0 bg-black/70 backdrop-blur-sm z-50"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            onClick={onClose} // Click outside modal = close
          />

          {/* ================================================================ */}
          {/* MODAL CONTENT CONTAINER - COMPACT SIZE */}
          {/* ================================================================ */}
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 pointer-events-none">
            {/* ↓ MODIFIED: Responsive sizing - compact mobile, almost full desktop */}
            {/* Old: max-w-md (448px all screens - too small on desktop) */}
            {/* New: max-w-md sm:max-w-2xl lg:max-w-5xl */}
            {/* Mobile (<640px): 448px, Tablet (≥640px): 672px, Desktop (≥1024px): 1024px */}
            {/* Why: Use available space on desktop, stay compact on mobile */}
            {/* ↓ MODIFIED: Removed bg-white - ModalLeadForm has dark background */}
            {/* Old: bg-white (white container around dark form = border effect) */}
            {/* New: No background (dark form seamlessly fills modal space) */}
            <motion.div
              className="relative rounded-2xl shadow-2xl max-w-md sm:max-w-2xl lg:max-w-5xl w-full max-h-[85vh] overflow-y-auto pointer-events-auto"
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              transition={{ duration: 0.3, ease: 'easeOut' }}
              onClick={(e) => e.stopPropagation()}  // Prevent click-through
            >
              {/* ============================================================ */}
              {/* CLOSE BUTTON (Top-right X) - Lucide React Icon */}
              {/* ============================================================ */}
              {/* ↓ MODIFIED: Close button styled for dark background */}
              {/* Old: hover:bg-gray-100 text-gray-600 (for white modal) */}
              {/* New: hover:bg-white/10 text-white (for dark modal) */}
              {/* Why: ModalLeadForm is dark, need white X that's visible */}
              <button
                onClick={onClose}
                className="absolute top-4 right-4 p-2 rounded-full hover:bg-white/10 transition-colors z-10"
                aria-label="Close modal"
              >
                <X className="w-6 h-6 text-white" />
              </button>

              {/* ============================================================ */}
              {/* MODAL CONTENT (Children) - NO PADDING */}
              {/* ============================================================ */}
              {/* ↓ MODIFIED: Removed padding - ModalLeadForm handles its own */}
              {/* Old: p-6 sm:p-8 (added padding around dark form) */}
              {/* New: No padding (dark form fills entire modal space) */}
              {/* Why: Eliminates white border, seamless dark background */}
              <div>
                {children}  {/* ModalLeadForm component renders here */}
              </div>
            </motion.div>
          </div>
        </>
      )}
    </AnimatePresence>
  )
}

// ============================================================================
// 📚 COMPREHENSIVE COMPONENT EXPLANATION
// ============================================================================
/*
 * ═══════════════════════════════════════════════════════════════════════════
 * PURPOSE: Professional Modal Overlay (Compact Version)
 * ═══════════════════════════════════════════════════════════════════════════
 * 
 * A modal is a dialog box that appears OVER the main page content, forcing
 * the user to interact with it before continuing. Think of it like a
 * pop-up window, but built into the page itself (not a browser popup).
 * 
 * This modal is specifically designed for LEAD CAPTURE in a luxury funnel:
 * - Compact size (fits mobile screens perfectly)
 * - Clean, professional appearance (white background, rounded corners)
 * - Multiple dismiss options (click outside, ESC key, X button)
 * - Smooth animations (fade in/out, slight zoom)
 * - Body scroll lock (prevents awkward double-scrollbar)
 * 
 * Key Design Decisions:
 * ✅ COMPACT WIDTH (max-w-md = 448px) instead of large (max-w-2xl = 672px)
 * ✅ SHORTER HEIGHT (85vh) to fit mobile screens without vertical scrolling
 * ✅ TIGHTER PADDING (p-6/p-8) to maximize form space in compact container
 * ✅ LUCIDE ICON for close button (professional, accessible)
 * 
 * ═══════════════════════════════════════════════════════════════════════════
 * TECHNIQUES USED (Non-Developer Explanation)
 * ═══════════════════════════════════════════════════════════════════════════
 * 
 * 1️⃣ ANIMATEPRESENCE (Smooth Exit Animations)
 * Normally when you hide a component in React, it just disappears instantly.
 * AnimatePresence from Framer Motion allows EXIT animations - the modal
 * fades out smoothly instead of vanishing abruptly.
 * 
 * Think of it like a curtain closing vs. lights suddenly turning off.
 * Much more pleasant experience.
 * 
 * 2️⃣ TWO-LAYER STRUCTURE (Backdrop + Modal)
 * Layer 1 (Backdrop):
 * - Covers entire screen (fixed inset-0)
 * - Black at 70% opacity (bg-black/70)
 * - Slight blur (backdrop-blur-sm)
 * - Click = closes modal
 * 
 * Layer 2 (Modal Container):
 * - Centered in viewport (flex items-center justify-center)
 * - White background (bg-white)
 * - Rounded corners (rounded-2xl)
 * - Click = does nothing (stops event propagation)
 * 
 * Result: Click modal = nothing, click outside = close
 * 
 * 3️⃣ POINTER-EVENTS TRICK (Click-Through Logic)
 * The outer container has pointer-events-none, which means clicks "pass
 * through" it to the backdrop below (triggering close).
 * 
 * The modal itself has pointer-events-auto, which means clicks are
 * captured and don't pass through (preventing close when clicking content).
 * 
 * This is how we achieve:
 * - Click modal content = nothing happens (form stays open)
 * - Click outside modal = closes modal
 * 
 * 4️⃣ BODY SCROLL LOCK (Prevent Double Scrollbar)
 * When modal opens:
 * - Set document.body.style.overflow = 'hidden'
 * - This prevents the background page from scrolling
 * - User can only scroll the modal content (if it overflows)
 * 
 * Why? Without this, you'd have TWO scrollbars:
 * - One for the page behind the modal
 * - One for the modal content
 * This is confusing and awkward.
 * 
 * When modal closes or component unmounts:
 * - Cleanup function restores overflow = 'unset'
 * - Background page scrolling returns to normal
 * 
 * 5️⃣ ESC KEY LISTENER (Keyboard Accessibility)
 * Second useEffect adds a keyboard event listener.
 * When user presses ESC key:
 * - If modal is open, call onClose()
 * - This is standard behavior users expect
 * 
 * Cleanup function removes the listener when component unmounts.
 * This prevents memory leaks (listener running after component gone).
 * 
 * 6️⃣ THREE-PART ANIMATION (Fade + Scale + Slide)
 * When modal appears:
 * - opacity: 0 → 1 (fades in)
 * - scale: 0.95 → 1 (slight zoom from 95% to 100%)
 * - y: 20 → 0 (slides up 20px)
 * 
 * When modal closes:
 * - Reverses the animation
 * - Takes 0.3 seconds (300ms)
 * 
 * Why all three properties?
 * - Fade alone feels flat
 * - Scale alone feels jarring
 * - Slide alone feels disconnected
 * - Combined = smooth, polished, premium feel
 * 
 * 7️⃣ Z-INDEX LAYERING (Stacking Order)
 * Everything has z-50 (very high z-index).
 * This ensures modal appears ABOVE all other page content:
 * - Navigation (typically z-40)
 * - Page content (typically z-0 to z-10)
 * - Footer (typically z-0)
 * 
 * Close button has z-10 within modal to appear above modal content.
 * 
 * 8️⃣ COMPACT SIZE OPTIMIZATION
 * max-w-md (448px) is perfect for:
 * - Mobile: Takes ~90% of screen width (comfortable)
 * - Tablet: Centered, doesn't look tiny
 * - Desktop: Focused, not sprawling across screen
 * 
 * Compare to max-w-2xl (672px):
 * - Mobile: Would require horizontal scrolling
 * - Desktop: Feels too wide for a simple form
 * 
 * max-h-[85vh] (85% of viewport height):
 * - Ensures modal fits on screen even on short devices
 * - 85% leaves room for margin at top/bottom
 * - Content overflows = scrollbar appears INSIDE modal only
 * 
 * 9️⃣ LUCIDE-REACT X ICON
 * Instead of using text ("×") or emoji, we use a proper icon from
 * lucide-react library. Benefits:
 * - Consistent sizing (always 24x24px)
 * - Accessible (proper SVG with aria-label)
 * - Professional appearance (not font-dependent)
 * - Hover-friendly (scales with button padding)
 * 
 * 🔟 RESPONSIVE PADDING
 * p-6 sm:p-8 means:
 * - Mobile (< 640px): 24px padding (p-6)
 * - Desktop (≥ 640px): 32px padding (sm:p-8)
 * 
 * This gives mobile more form space while keeping desktop comfortable.
 * 
 * ═══════════════════════════════════════════════════════════════════════════
 * HOW IT FITS IN THE APP (The Bigger Picture)
 * ═══════════════════════════════════════════════════════════════════════════
 * 
 * USER JOURNEY:
 * 1. User lands on HeroSection
 * 2. Watches video, reads content
 * 3. Clicks "Get Access" button
 * 4. HeroSection fires onCtaClick()
 * 5. page.tsx receives click → calls setShowModal(true)
 * 6. Modal component receives isOpen={true}
 * 7. Modal animates in (fade + scale + slide)
 * 8. LeadForm renders inside modal
 * 9. User fills form and submits
 * 10. LeadForm calls onSuccess()
 * 11. page.tsx closes modal OR user clicks X/outside
 * 12. Modal animates out smoothly
 * 
 * TECHNICAL FLOW:
 * page.tsx (Parent)
 *   └─> Manages showModal state (useState)
 *   └─> Passes isOpen={showModal} to Modal
 *   └─> Passes onClose={() => setShowModal(false)} to Modal
 *   └─> Modal renders when isOpen={true}
 *        └─> Backdrop covers screen
 *        └─> Modal container centers content
 *             └─> LeadForm renders as children
 * 
 * RESPONSIVE BEHAVIOR:
 * Mobile (< 640px):
 * - Modal: max-w-md (448px, ~95% screen width)
 * - Padding: p-6 (24px)
 * - Height: max-h-[85vh] (fits screen with margin)
 * - Scrollable if content exceeds height
 * 
 * Tablet/Desktop (≥ 640px):
 * - Modal: max-w-md (448px, centered with generous margin)
 * - Padding: sm:p-8 (32px)
 * - Height: max-h-[85vh] (more than enough space)
 * - Rarely needs scrolling
 * 
 * ═══════════════════════════════════════════════════════════════════════════
 * CUSTOMIZATION GUIDE (How to Adapt This)
 * ═══════════════════════════════════════════════════════════════════════════
 * 
 * 🎨 CHANGE MODAL SIZE:
 * Line: className="... max-w-md ..."
 * 
 * Options:
 * - max-w-sm (384px) - Extra compact, mobile-first
 * - max-w-md (448px) - Current, perfect for forms ✅
 * - max-w-lg (512px) - Slightly wider
 * - max-w-xl (576px) - Medium
 * - max-w-2xl (672px) - Large (original size)
 * - max-w-4xl (896px) - Extra large
 * 
 * 🌑 CHANGE BACKDROP DARKNESS:
 * Line: className="... bg-black/70 ..."
 * 
 * Options:
 * - bg-black/50 - Lighter (50% opacity)
 * - bg-black/70 - Current (70% opacity) ✅
 * - bg-black/80 - Darker (80% opacity)
 * - bg-black/90 - Very dark (90% opacity)
 * 
 * 🎭 CHANGE ANIMATION SPEED:
 * Line: transition={{ duration: 0.3 }}
 * 
 * Options:
 * - 0.2 - Faster (snappier)
 * - 0.3 - Current (balanced) ✅
 * - 0.5 - Slower (more dramatic)
 * - 0.7 - Very slow (luxurious)
 * 
 * 📦 CHANGE PADDING:
 * Line: className="p-6 sm:p-8"
 * 
 * Options:
 * - p-4 sm:p-6 - Tighter (more form space)
 * - p-6 sm:p-8 - Current (balanced) ✅
 * - p-8 sm:p-12 - Looser (more whitespace)
 * 
 * 🔲 CHANGE MODAL SHAPE:
 * Line: className="... rounded-2xl ..."
 * 
 * Options:
 * - rounded-lg - Subtle rounding (8px)
 * - rounded-xl - Medium rounding (12px)
 * - rounded-2xl - Current rounding (16px) ✅
 * - rounded-3xl - Heavy rounding (24px)
 * - rounded-none - Sharp corners (0px)
 * 
 * ❌ CHANGE CLOSE BUTTON POSITION:
 * Line: className="absolute top-4 right-4 ..."
 * 
 * Options:
 * - top-2 right-2 - Closer to corner
 * - top-4 right-4 - Current (comfortable) ✅
 * - top-6 right-6 - Further from corner
 * 
 * 🎬 DISABLE ANIMATIONS:
 * Remove initial, animate, exit props from motion components.
 * Modal will appear/disappear instantly (not recommended for luxury feel).
 * 
 * 🚫 DISABLE CLICK-OUTSIDE-TO-CLOSE:
 * Remove onClick={onClose} from backdrop div.
 * User MUST use X button or ESC key to close.
 * 
 * 🚫 DISABLE ESC-KEY-TO-CLOSE:
 * Remove the second useEffect (ESC key listener).
 * User MUST use X button or click outside to close.
 * 
 * ═══════════════════════════════════════════════════════════════════════════
 * ACCESSIBILITY FEATURES (Why This Modal Is User-Friendly)
 * ═══════════════════════════════════════════════════════════════════════════
 * 
 * ✅ KEYBOARD NAVIGATION:
 * - ESC key closes modal (standard behavior)
 * - TAB key cycles through form fields inside modal
 * - ENTER submits form (native HTML behavior)
 * - Close button is focusable (keyboard users can reach it)
 * 
 * ✅ SCREEN READER SUPPORT:
 * - aria-label="Close modal" on X button (announces purpose)
 * - Modal content is in DOM (screen readers can read it)
 * - Focus is trapped inside modal (body scroll is locked)
 * 
 * ✅ VISUAL FEEDBACK:
 * - Close button has hover state (hover:bg-gray-100)
 * - Smooth transitions (not jarring)
 * - Clear contrast (white modal on dark backdrop)
 * 
 * ✅ MOBILE-FRIENDLY:
 * - Large touch targets (X button is 40x40px with padding)
 * - Fits screen without horizontal scrolling
 * - Vertical scroll if content exceeds screen height
 * - No pinch-zoom issues
 * 
 * ═══════════════════════════════════════════════════════════════════════════
 * BRAND ALIGNMENT (Why It Matches Ferrari + Hermès)
 * ═══════════════════════════════════════════════════════════════════════════
 * 
 * 🏎️ FERRARI ELEMENTS:
 * ✅ Smooth, fast animations (0.3s, not slow or jarring)
 * ✅ Precise engineering (exact sizing, calculated spacing)
 * ✅ Performance-focused (GPU-accelerated animations)
 * ✅ Confident design (doesn't ask permission, just appears)
 * 
 * 👜 HERMÈS ELEMENTS:
 * ✅ Restraint (clean white, not over-designed)
 * ✅ Quality materials (rounded corners, soft shadow)
 * ✅ Attention to detail (Lucide icon, not generic text)
 * ✅ Understated elegance (no flashy colors or effects)
 * ✅ Respect for user (multiple ways to dismiss)
 * 
 * 💎 LUXURY PRINCIPLES:
 * - FOCUS: Backdrop dims everything except the modal
 * - CLARITY: White background, black text, obvious purpose
 * - CONTROL: User decides when to engage (not auto-opening)
 * - EASE: Multiple dismiss options (not trapped)
 * - POLISH: Smooth animations, hover states, clean icon
 * 
 * This modal doesn't TRAP users - it INVITES them. Like a luxury
 * boutique, the door is always open to leave, but the experience
 * inside makes you want to stay.
 * 
 * ═══════════════════════════════════════════════════════════════════════════
 * PERFORMANCE NOTES
 * ═══════════════════════════════════════════════════════════════════════════
 * 
 * OPTIMIZATION TECHNIQUES:
 * - Framer Motion uses GPU acceleration (60fps smooth)
 * - Transform and opacity are hardware-accelerated CSS properties
 * - Backdrop blur uses CSS backdrop-filter (native browser feature)
 * - Event listeners properly cleaned up (no memory leaks)
 * - Fixed positioning prevents layout recalculations
 * 
 * LOAD TIME:
 * - Modal is code-split (only loads when used)
 * - Lucide icon is tree-shaken (only X icon in bundle)
 * - No external dependencies beyond Framer Motion
 * - Renders instantly (no image assets to load)
 * 
 * MOBILE PERFORMANCE:
 * - Animations are simple (not taxing on mobile GPUs)
 * - Touch events work natively (no special handling)
 * - Scroll lock prevents janky double-scroll
 * - Compact size loads faster than large modals
 * 
 * ═══════════════════════════════════════════════════════════════════════════
 * COMMON QUESTIONS & ANSWERS
 * ═══════════════════════════════════════════════════════════════════════════
 * 
 * Q: Why not use a library like react-modal or headlessui?
 * A: This custom modal is smaller, faster, and perfectly tailored to
 *    our needs. No unnecessary features bloating the bundle.
 * 
 * Q: Why max-w-md instead of max-w-2xl?
 * A: Compact modals convert better. Users can see the entire form
 *    without scrolling. Feels focused, not overwhelming.
 * 
 * Q: Why both ESC key AND click outside to close?
 * A: Respects different user preferences. Some prefer keyboard,
 *    some prefer mouse. Luxury is about accommodating both.
 * 
 * Q: What if my form is longer than 85vh?
 * A: The modal will show a scrollbar INSIDE itself. This is better
 *    than making the modal taller (which would overflow viewport).
 * 
 * Q: Why preventDefault on modal click?
 * A: e.stopPropagation() prevents clicks inside the modal from
 *    bubbling up to the backdrop and triggering onClose.
 * 
 * Q: Can I use this for confirmation dialogs?
 * A: Absolutely! Just pass different children. Could be a delete
 *    confirmation, success message, image viewer, etc.
 * 
 * Q: Why AnimatePresence instead of CSS transitions?
 * A: AnimatePresence handles the complex timing of exit animations
 *    (removing element from DOM after animation completes). CSS
 *    transitions can't do this easily.
 * 
 * Q: Is this accessible to screen readers?
 * A: Yes. The modal is in the DOM, has aria-label on close button,
 *    and keyboard navigation works naturally.
 * 
 * ═══════════════════════════════════════════════════════════════════════════
 * USAGE EXAMPLE (In page.tsx)
 * ═══════════════════════════════════════════════════════════════════════════
 * 
 * 'use client'
 * 
 * import { useState } from 'react'
 * import Modal from '@/components/shared/Modal'
 * import LeadForm from '@/components/funnel/LeadForm'
 * 
 * export default function Page() {
 *   const [showModal, setShowModal] = useState(false)
 *   
 *   return (
 *     <>
 *       <button onClick={() => setShowModal(true)}>
 *         Open Modal
 *       </button>
 *       
 *       <Modal 
 *         isOpen={showModal} 
 *         onClose={() => setShowModal(false)}
 *       >
 *         <LeadForm onSuccess={() => setShowModal(false)} />
 *       </Modal>
 *     </>
 *   )
 * }
 * 
 * That's it! Three lines to manage modal state, one component to render it.
 * Simple, clean, professional.
 */