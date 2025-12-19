// ============================================================================
// HERO SECTION - Homepage Opening WITH ANIMATED SIGNATURE (UPDATED)
// ============================================================================
// What: Full-screen hero with VIDEO signature animation → static image
// Why: Premium brand experience, memorable first impression
// How: Video autoplays (3.2s) → fades to static signature → content appears
// 
// ✅ NEW IN THIS VERSION:
// - White signature VIDEO plays on load (3.2 seconds)
// - Gray background removed with mix-blend-mode: screen
// - Smooth transition to static white signature image
// - Coordinated timing with other animations
// - Same experience on mobile
// - Fallback to static image if video fails
// ============================================================================

'use client'

import { motion, AnimatePresence } from 'framer-motion'
import Image from 'next/image'
import { useState } from 'react'

export default function HeroSection() {
  // ==========================================================================
  // VIDEO ANIMATION STATE
  // ==========================================================================
  // ↓ NEW: Tracks when video finishes playing
  // videoEnded = false: Show video animation
  // videoEnded = true: Show static signature image
  const [videoEnded, setVideoEnded] = useState(false)
  
  // ↓ NEW: Fallback if video fails to load
  // If video errors, immediately show static image
  const [videoError, setVideoError] = useState(false)

  return (
    <section className="relative min-h-screen flex items-center justify-center bg-black text-white overflow-hidden">
      
      {/* ====================================================================== */}
      {/* BACKGROUND IMAGE - UNCHANGED */}
      {/* ====================================================================== */}
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

      {/* ====================================================================== */}
      {/* CONTENT - Hero Text and Elements */}
      {/* ====================================================================== */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="relative z-10 text-center px-6"
      >
        
        {/* ================================================================== */}
        {/* SIGNATURE - VIDEO ANIMATION → STATIC IMAGE */}
        {/* ================================================================== */}
        {/* Container: Same size as before (responsive) */}
        <div className="mb-12 mx-auto w-96 h-48 md:w-[500px] md:h-64 relative">
          
          {/* ============================================================== */}
          {/* VIDEO SIGNATURE ANIMATION (plays once, 3.2 seconds) */}
          {/* ============================================================== */}
          {/* ↓ NEW: Animated video signature */}
          {/* Shows on load, fades out after playing */}
          {/* AnimatePresence handles smooth fade transition */}
          <AnimatePresence>
            {!videoEnded && !videoError && (
              <motion.div
                initial={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.8 }}
                className="absolute inset-0 z-20"
              >
                <video
                  autoPlay          // ← Plays immediately on load
                  muted             // ← Silent (no audio)
                  playsInline       // ← Required for iOS autoplay
                  preload="auto"    // ← Preload for instant playback
                  onEnded={() => {
                    // ↓ Wait 0.5s after video ends before fading out
                    // Gives a natural pause before transition
                    setTimeout(() => setVideoEnded(true), 500)
                  }}
                  onError={() => {
                    // ↓ Fallback: If video fails, show static image immediately
                    console.log('Video failed to load, using static image')
                    setVideoError(true)
                    setVideoEnded(true)
                  }}
                  className="w-full h-full object-contain"
                  style={{ 
                    // ↓ CRITICAL: mix-blend-mode removes gray background!
                    // 'screen' blend mode: White stays visible, dark/gray becomes invisible
                    // Perfect for white signature on dark background
                    mixBlendMode: 'screen',
                    
                    // ↓ Optional: Enhance the white signature visibility
                    // Increase brightness slightly for crisp look
                    filter: 'brightness(1.2) contrast(1.1)'
                  }}
                >
                  <source src="/signature-animation.mp4" type="video/mp4" />
                </video>
              </motion.div>
            )}
          </AnimatePresence>

          {/* ============================================================== */}
          {/* STATIC SIGNATURE IMAGE (fades in after video) */}
          {/* ============================================================== */}
          {/* ↓ Only shows after video ends */}
          {/* Fades in smoothly to replace video */}
          <AnimatePresence>
            {videoEnded && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.8 }}
                className="absolute inset-0"
              >
                <Image
                  src="/BlackTransparent.png"
                  alt="Kerry Lee Hartley Signature"
                  fill
                  className="object-contain brightness-0 invert"
                  priority
                />
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* ================================================================== */}
        {/* TAGLINE - "Man of God" (appears after video) */}
        {/* ================================================================== */}
        {/* ↓ CHANGED: Only shows after video animation completes */}
        {/* Delay: 0.3s after video ends for smooth sequencing */}
        <AnimatePresence>
          {videoEnded && (
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.3 }}
              className="text-2xl md:text-3xl text-white font-light tracking-wider mb-32"
            >
              Man of God
            </motion.p>
          )}
        </AnimatePresence>

        {/* ================================================================== */}
        {/* SCROLL INDICATOR - Arrow Only (appears after video) */}
        {/* ================================================================== */}
        {/* ↓ CHANGED: Only shows after video animation completes */}
        {/* Delay: 0.5s after video ends */}
        <AnimatePresence>
          {videoEnded && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 1, delay: 0.5 }}
              className="absolute bottom-8 left-1/2 -translate-x-1/2"
            >
              <motion.div
                animate={{ y: [0, 12, 0] }}
                transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}
              >
                <svg 
                  className="w-8 h-8 text-gray-400" 
                  fill="none" 
                  stroke="currentColor" 
                  viewBox="0 0 24 24"
                >
                  <path 
                    strokeLinecap="round" 
                    strokeLinejoin="round" 
                    strokeWidth={1.5} 
                    d="M19 14l-7 7m0 0l-7-7m7 7V3" 
                  />
                </svg>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </section>
  )
}

// ============================================================================
// 📚 COMPREHENSIVE EXPLANATION FOR NON-DEVELOPERS
// ============================================================================
/*
 * PURPOSE:
 * Premium animated signature intro → static signature → hero content
 * Creates memorable first impression with video animation
 * 
 * WHAT CHANGED IN THIS UPDATE:
 * 
 * 1. VIDEO SIGNATURE ANIMATION (NEW!)
 *    - Plays automatically on page load (3.2 seconds)
 *    - White signature on gray background
 *    - mix-blend-mode: screen removes gray, keeps white
 *    - Smooth fade out after playing
 *    
 * 2. TRANSITION SEQUENCE
 *    Timeline:
 *    0.0s - Video starts playing
 *    3.2s - Video ends
 *    3.7s - Video fades out (0.5s pause + 0.8s fade)
 *    4.5s - Static signature fades in (0.8s)
 *    4.8s - "Man of God" appears (0.3s delay)
 *    5.0s - Arrow appears (0.5s delay)
 *    
 * 3. BLEND MODE MAGIC
 *    mix-blend-mode: screen
 *    - White pixels: Stay bright and visible
 *    - Gray pixels: Blend into black background (invisible)
 *    - Result: Only white signature shows!
 *    
 * 4. FALLBACK BEHAVIOR
 *    If video fails to load:
 *    - Immediately shows static signature
 *    - User never knows video was supposed to play
 *    - Graceful degradation
 *    
 * 5. MOBILE BEHAVIOR
 *    Same animation on mobile:
 *    - autoPlay works on iOS with muted + playsInline
 *    - Smaller signature size on mobile (w-96 vs w-[500px])
 *    - Same smooth transitions
 * 
 * HOW IT WORKS TECHNICALLY:
 * 
 * STATE MANAGEMENT:
 * - videoEnded: false → show video, true → show image
 * - videoError: true → skip video, show image immediately
 * 
 * VIDEO ELEMENT:
 * - autoPlay: Starts immediately
 * - muted: Required for autoplay to work
 * - playsInline: Required for iOS autoplay
 * - onEnded: Triggers after 3.2s, waits 0.5s, then fades
 * - onError: Fallback if video can't load
 * 
 * BLEND MODE:
 * - screen: Mathematical blend that keeps lights, removes darks
 * - Perfect for white-on-dark scenarios
 * - No manual masking needed!
 * 
 * ANIMATION SEQUENCING:
 * - AnimatePresence: Smooth enter/exit animations
 * - Staggered delays: Each element appears after previous
 * - Natural, elegant flow
 * 
 * FILE REQUIREMENTS:
 * 
 * Video file must be at:
 * /public/signature-animation.mp4
 * 
 * Video specs:
 * - Duration: 3.2 seconds
 * - Format: MP4 (H.264)
 * - Size: Optimized (under 3MB recommended)
 * - Content: White signature on gray background
 * 
 * Static image at:
 * /public/BlackTransparent.png
 * 
 * HOW TO MODIFY:
 * 
 * Change video duration:
 * - Video naturally ends at its duration (3.2s)
 * - Adjust setTimeout(500) to change pause after video
 * 
 * Change blend mode if needed:
 * - screen: White stays, dark disappears (current)
 * - lighten: Similar to screen
 * - add: Additive blending
 * - normal: No blending (will show gray bg)
 * 
 * Adjust signature brightness:
 * - filter: 'brightness(1.2)' - increase number = brighter
 * - filter: 'contrast(1.1)' - increase = sharper
 * 
 * Skip video (show image immediately):
 * - Set initial state: useState(true)
 * - Or add condition to auto-skip on repeat visits
 * 
 * COMMON MODIFICATIONS:
 * 
 * Skip video on repeat visits:
 * ```javascript
 * const [videoEnded, setVideoEnded] = useState(() => {
 *   // Check localStorage - skip if seen before
 *   return localStorage.getItem('seenIntro') === 'true'
 * })
 * 
 * useEffect(() => {
 *   if (videoEnded) {
 *     localStorage.setItem('seenIntro', 'true')
 *   }
 * }, [videoEnded])
 * ```
 * 
 * Add skip button:
 * ```jsx
 * <button onClick={() => setVideoEnded(true)}>
 *   Skip Intro
 * </button>
 * ```
 * 
 * Loop video instead of transitioning:
 * ```jsx
 * <video loop>  // Add loop attribute
 * ```
 * 
 * PERFORMANCE NOTES:
 * 
 * Video loading:
 * - preload="auto": Downloads video immediately
 * - Ensures smooth playback on load
 * - Adds ~2-3MB to initial page load
 * 
 * Mobile optimization:
 * - Video compressed for mobile
 * - Same quality on all devices
 * - iOS requires muted + playsInline for autoplay
 * 
 * BROWSER COMPATIBILITY:
 * 
 * Supported:
 * ✅ Chrome/Edge (all versions)
 * ✅ Safari (iOS + macOS)
 * ✅ Firefox
 * ✅ Mobile browsers
 * 
 * Autoplay restrictions:
 * - All browsers: Muted videos can autoplay
 * - User interaction NOT required (muted = allowed)
 * - Fallback handles any failures gracefully
 * 
 * TESTING CHECKLIST:
 * 
 * Before deploying:
 * ✅ Video file at /public/signature-animation.mp4
 * ✅ Video plays automatically on desktop
 * ✅ Video plays automatically on mobile
 * ✅ Gray background is invisible (only white signature shows)
 * ✅ Smooth transition to static signature
 * ✅ "Man of God" appears after transition
 * ✅ Arrow appears last
 * ✅ Test on slow connection (video loads fast enough)
 * ✅ Test fallback (temporarily remove video file)
 * ✅ Test on iOS Safari (most restrictive browser)
 * 
 * IMPORTANT NOTES:
 * 
 * - Video plays ONCE per page load (not on scroll)
 * - First-time visitors see the animation
 * - Returning visitors see it again (add localStorage to skip)
 * - Mobile experience matches desktop (no separate flow)
 * - Fallback ensures site never breaks if video fails
 * - Blend mode works on all modern browsers
 * - White signature stays visible on any dark background
 * - Total sequence: ~5 seconds from load to full hero display
 */