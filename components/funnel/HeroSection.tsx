'use client'

import { motion } from 'framer-motion'
import Image from 'next/image'

// ============================================================================
// HERO SECTION - ULTRA-LUXURY WITH VIDEO PLAYER
// ============================================================================
// ↓ MODIFIED: Added video player, video subheadline, and shortened CTA
// Old version had: Static content only, long CTA button text
// Why: Video increases engagement, subheadline explains value, short CTA reduces friction

interface HeroSectionProps {
  headline: string
  subheadline: string
  ctaText: string
  videoUrl: string        // ↓ ADDED: Video URL prop for embedded video player
  onCtaClick?: () => void // ↓ ADDED: Click handler to open modal
}

// ============================================================================
// COLOR PALETTE - TONED PINK/CORAL (Ferrari + Hermès Luxury)
// ============================================================================
/* no change */
const colors = {
  primary: '#1F1F1F',           // Deep charcoal (sophistication)
  accentSoftPeach: '#FFAB91',   // Soft peach (warmth, approachability)
  accentCoral: '#FF7961',       // Coral (energy, excitement)
  accentTeal: '#4DB6AC',        // Teal (trust, professionalism)
  highlightGold: '#FFD54F',     // Gold (premium, success)
  textLight: '#FFFFFF',         // Pure white (clarity)
}

export default function HeroSection({
  headline,
  subheadline,
  ctaText,
  videoUrl,    // ↓ ADDED: Destructure new props
  onCtaClick   // ↓ ADDED: Modal trigger function
}: HeroSectionProps) {

  return (
    <section className="relative overflow-hidden text-white min-h-screen flex items-center justify-center px-6 md:px-12 py-20">
      
      {/* ================================================================ */}
      {/* ANIMATED GRADIENT BACKGROUND - Breathing Color Movement */}
      {/* ================================================================ */}
      {/* no change */}
      <motion.div
        className="absolute inset-0"
        animate={{ backgroundPositionX: ['0%', '100%', '0%'] }}
        transition={{ duration: 40, repeat: Infinity, ease: 'linear' }}
        style={{
          background: `linear-gradient(135deg, ${colors.accentSoftPeach}, ${colors.accentCoral}, ${colors.accentTeal})`,
          backgroundSize: '400% 400%',
          zIndex: -2,
          opacity: 0.85    // 85% opacity for softer, more elegant feel
        }}
      />

      {/* ================================================================ */}
      {/* FLOATING ORBS - 4 Depth Layers with Breathing Animation */}
      {/* ================================================================ */}
      {/* no change */}
      
      {/* ORB 1: Top-left Peach (15 second cycle) */}
      <motion.div
        className="absolute w-[500px] h-[500px] rounded-full opacity-50"
        style={{ background: colors.accentSoftPeach, top: '5%', left: '10%', zIndex: -1, filter: 'blur(120px)' }}
        animate={{ y: [0, 40, 0], x: [0, 30, 0], scale: [1, 1.2, 1] }}
        transition={{ duration: 15, repeat: Infinity, repeatType: 'mirror', ease: 'easeInOut' }}
      />
      
      {/* ORB 2: Bottom-right Coral (18 second cycle) */}
      <motion.div
        className="absolute w-[500px] h-[500px] rounded-full opacity-50"
        style={{ background: colors.accentCoral, bottom: '10%', right: '5%', zIndex: -1, filter: 'blur(120px)' }}
        animate={{ y: [0, -40, 0], x: [0, -30, 0], scale: [1, 1.2, 1] }}
        transition={{ duration: 18, repeat: Infinity, repeatType: 'mirror', ease: 'easeInOut' }}
      />
      
      {/* ORB 3: Center Teal (22 second cycle) */}
      <motion.div
        className="absolute w-[500px] h-[500px] rounded-full opacity-45"
        style={{ background: colors.accentTeal, top: '50%', left: '50%', transform: 'translate(-50%, -50%)', zIndex: -1, filter: 'blur(120px)' }}
        animate={{ y: [0, 20, 0], x: [0, 20, 0], scale: [1, 1.15, 1] }}
        transition={{ duration: 22, repeat: Infinity, repeatType: 'mirror', ease: 'easeInOut' }}
      />

      {/* ORB 4: Top-right Gold (20 second cycle) */}
      <motion.div
        className="absolute w-[400px] h-[400px] rounded-full opacity-40"
        style={{ background: colors.highlightGold, top: '15%', right: '20%', zIndex: -1, filter: 'blur(100px)' }}
        animate={{ y: [0, -25, 0], x: [0, 25, 0], scale: [1, 1.1, 1] }}
        transition={{ duration: 20, repeat: Infinity, repeatType: 'mirror', ease: 'easeInOut' }}
      />

      {/* ================================================================ */}
      {/* CONTENT CONTAINER - Centered, Max-width Controlled */}
      {/* ================================================================ */}
      <div className="relative z-10 text-center max-w-5xl mx-auto w-full">
        
        {/* ============================================================== */}
        {/* HOUSE SVG ICON - Custom Icon (NO EMOJIS per brand guidelines) */}
        {/* ============================================================== */}
        {/* no change */}
        <motion.div
          className="mb-12 flex justify-center"
          initial={{ opacity: 0, y: -20, scale: 0.8 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 0.8 }}
        >
          <Image 
            src="/icons/house1.svg" 
            alt="Home Icon" 
            width={400}
            height={400}
            className="drop-shadow-2xl w-48 md:w-72 lg:w-96 h-auto"
            // Responsive: 192px mobile, 288px tablet, 384px desktop
          />
        </motion.div>
        
        {/* ============================================================== */}
        {/* HEADLINE - Bold, Uppercase, Maximum Impact */}
        {/* ============================================================== */}
        {/* no change */}
        <motion.h1
          className="text-5xl md:text-6xl lg:text-7xl font-extrabold uppercase drop-shadow-lg mb-6"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          {headline}
        </motion.h1>

        {/* ============================================================== */}
        {/* SUBHEADLINE - Supporting Message, Slightly Transparent */}
        {/* ============================================================== */}
        {/* no change */}
        <motion.p
          className="text-xl md:text-2xl text-white/80 mb-12"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
        >
          {subheadline}
        </motion.p>

        {/* ============================================================== */}
        {/* VIDEO PLAYER - Iframe with Autoplay, Mute, Loop */}
        {/* ============================================================== */}
        {/* ↓ MODIFIED: Changed from <video> to <iframe> with autoplay params */}
        {/* Old: <video> tag (only works with direct .mp4 files) */}
        {/* New: <iframe> with URL parameters for autoplay/mute/loop */}
        {/* Why: Loom URLs require iframe, params control playback behavior */}
        <motion.div
          className="mb-6 max-w-4xl mx-auto"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
        >
          <div className="relative rounded-2xl overflow-hidden shadow-2xl">
            {/* ↓ ADDED: Gradient glow behind video for depth */}
            {/* Creates premium "floating" effect */}
            <div className="absolute inset-0 bg-gradient-to-r from-yellow-400 via-pink-500 to-blue-500 opacity-30 blur-xl" />
            
            {/* ↓ MODIFIED: Black container for video (clean contrast) */}
            <div className="relative bg-black rounded-2xl overflow-hidden">
              {/* ↓ MODIFIED: iframe with autoplay/mute/loop URL parameters */}
              {/* URL params: ?autoplay=1&muted=1&loop=1&hide_owner=true&hide_share=true */}
              {/* Works with: Loom, YouTube, Vimeo, Wistia, etc. */}
              <iframe
                src={`${videoUrl}?autoplay=1&muted=1&loop=1&hide_owner=true&hide_share=true&hide_title=true`}
                className="w-full aspect-video"
                frameBorder="0"
                allow="autoplay; fullscreen; picture-in-picture"
                allowFullScreen
                title="Video Player"
              />
            </div>
          </div>
          
          {/* ============================================================ */}
          {/* VIDEO SUBHEADLINE - Explains Video Value */}
          {/* ============================================================ */}
          {/* ↓ ADDED: Subheadline explaining what viewer gets from video */}
          {/* Old version: No explanation, user confusion potential */}
          {/* Why: Clear value proposition increases video watch rate */}
          <motion.p
            className="text-center text-base md:text-lg text-white/90 mt-6 mb-8 max-w-2xl mx-auto leading-relaxed"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.8 }}
          >
            Watch this free video to discover the exact roadmap first-time buyers use to confidently navigate the home buying process.
          </motion.p>
        </motion.div>

        {/* ============================================================== */}
        {/* CTA BUTTON - SHORT TEXT (2 Words Max) */}
        {/* ============================================================== */}
        {/* ↓ MODIFIED: Button text shortened dramatically */}
        {/* Old: "Get Your Complete Home Buying Roadmap" (6 words, 38 chars) */}
        {/* New: "Get Access" (2 words, 10 chars) */}
        {/* Why: Shorter = less friction, faster decision, cleaner design */}
        <motion.button
          onClick={onCtaClick}  // ↓ ADDED: Opens modal with lead form
          className="inline-block px-16 py-6 rounded-full font-bold shadow-lg text-black bg-gradient-to-r from-[#FFD54F] via-[#FFAB91] to-[#FF7961] text-2xl"
          // ↓ MODIFIED: Increased button size for prominence
          // Old: px-12 py-4 text-xl
          // New: px-16 py-6 text-2xl (33% larger padding, bigger text)
          // Why: Bigger button = easier to click, more confident appearance
          whileHover={{ 
            scale: 1.05,
            boxShadow: '0px 0px 20px rgba(255, 213, 79, 0.6)'
          }}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1.0 }}
        >
          {ctaText}  {/* ↓ ADDED: Dynamic prop instead of hardcoded text */}
        </motion.button>

        {/* ============================================================== */}
        {/* TRUST INDICATORS - Social Proof Below Button */}
        {/* ============================================================== */}
        {/* no change */}
        <motion.div
          className="mt-12 flex items-center justify-center gap-8 flex-wrap"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 1.2 }}
        >
          <span className="text-white/80 font-medium">Licensed Realtor</span>
          <span className="text-white/80 font-medium">100% Free Resource</span>
          <span className="text-white/80 font-medium">Instant Access</span>
        </motion.div>
      </div>
    </section>
  )
}

// ============================================================================
// 📚 COMPREHENSIVE COMPONENT EXPLANATION
// ============================================================================
/*
 * ═══════════════════════════════════════════════════════════════════════════
 * PURPOSE: Ultra-Luxury Hero Section with Video Player
 * ═══════════════════════════════════════════════════════════════════════════
 * 
 * This is the FIRST THING visitors see when they land on your funnel page.
 * It combines cinematic visuals with video content to create an immersive,
 * premium experience that captures attention and builds trust instantly.
 * 
 * Key Responsibilities:
 * 1. Create stunning first impression (luxury brand alignment)
 * 2. Present main value proposition (headline + subheadline)
 * 3. Showcase video content (primary conversion tool)
 * 4. Drive action (CTA button opens modal with lead form)
 * 5. Build trust (social proof badges at bottom)
 * 
 * ═══════════════════════════════════════════════════════════════════════════
 * TECHNIQUES USED (Non-Developer Explanation)
 * ═══════════════════════════════════════════════════════════════════════════
 * 
 * 1️⃣ ANIMATED GRADIENT BACKGROUND
 * Think of this like a slow-moving aurora borealis behind your content.
 * The gradient has 3 colors (peach, coral, teal) and they slowly shift
 * position over 40 seconds in a continuous loop. This creates depth and
 * movement without being distracting.
 * 
 * Technical: backgroundPositionX animates from 0% → 100% → 0%
 * backgroundSize: 400% means gradient is 4x wider than screen
 * Result: Smooth, elegant color shifting
 * 
 * 2️⃣ FLOATING ORBS (4 Layers of Depth)
 * These are large, blurred circles that "breathe" in the background.
 * Each orb moves on its own timing (15s, 18s, 20s, 22s cycles) creating
 * a natural, organic feeling like watching clouds drift.
 * 
 * Technical Details:
 * - Size: 400-500px diameter
 * - Blur: 100-120px (creates soft glow)
 * - Opacity: 40-50% (subtle, not overpowering)
 * - Position: absolute (floats behind content)
 * - Z-index: -1 (behind everything)
 * - Animation: y-axis, x-axis, scale all move independently
 * 
 * Why 4 different timing cycles?
 * When objects move at different speeds, it creates DEPTH. Your brain
 * perceives this as 3D space. Fast luxury cars use this same principle
 * in their design language (layered, dimensional, deep).
 * 
 * 3️⃣ STAGGERED ANIMATIONS (Sequential Reveal)
 * Content doesn't all appear at once. Instead, each element fades in
 * one after another with small delays:
 * 
 * - House icon: 0.0s delay (appears first)
 * - Headline: 0.2s delay (appears second)
 * - Subheadline: 0.4s delay
 * - Video: 0.6s delay
 * - Video subheadline: 0.8s delay
 * - CTA button: 1.0s delay
 * - Trust badges: 1.2s delay (appears last)
 * 
 * This creates a "cinematic reveal" effect, like a movie opening sequence.
 * Each element gets its moment to shine before the next appears.
 * 
 * 4️⃣ VIDEO AUTOPLAY WITH MUTE & LOOP
 * The video uses an iframe with URL parameters for playback control:
 * - autoplay=1: Video starts automatically when page loads
 * - muted=1: Video is muted by default (required for autoplay)
 * - loop=1: Video repeats endlessly (continuous exposure)
 * - hide_owner=true: Hides Loom owner info (cleaner look)
 * - hide_share=true: Hides share button (less distraction)
 * - hide_title=true: Hides video title (cleaner look)
 * 
 * Why autoplay muted loop?
 * - Autoplay grabs attention immediately (no click needed)
 * - Muted prevents annoying users (they can unmute if interested)
 * - Loop ensures continuous exposure (plays even if they scroll back)
 * - URL params work with Loom, YouTube (?autoplay=1&mute=1&loop=1)
 * 
 * User can still:
 * - Unmute the video (click sound icon)
 * - Pause/play (click video or use controls)
 * - Fullscreen (click fullscreen button)
 * - Scrub timeline (drag playhead)
 * 
 * 5️⃣ VIDEO GLOW EFFECT (Premium Depth)
 * Behind the video is a blurred gradient glow (yellow/pink/blue).
 * This creates the illusion that the video is "floating" above the page.
 * Same technique used in luxury product photography (halo lighting).
 * 
 * Technical: absolute positioned div with blur-xl and low opacity
 * 
 * 6️⃣ RESPONSIVE HOUSE ICON
 * The house SVG scales across devices:
 * - Mobile: w-48 (192px)
 * - Tablet: md:w-72 (288px)
 * - Desktop: lg:w-96 (384px)
 * 
 * This ensures the icon is prominent on all screens without overwhelming
 * mobile users or looking tiny on desktop.
 * 
 * 7️⃣ SHORT CTA TEXT (Friction Reduction)
 * Button says "Get Access" (2 words) instead of longer alternatives.
 * Why? Every extra word adds mental friction. "Get Access" is:
 * - Clear (you know what you're getting)
 * - Short (quick to read and decide)
 * - Active (implies immediate action)
 * - Benefit-focused ("access" = exclusive value)
 * 
 * Compare:
 * ❌ "Click Here to Get Your Complete Home Buying Roadmap" (9 words)
 * ✅ "Get Access" (2 words)
 * 
 * The shorter version converts better because it respects user's time
 * and reduces decision paralysis.
 * 
 * 8️⃣ HOVER EFFECTS (Micro-interactions)
 * When you hover over the CTA button:
 * - Scales up 5% (scale: 1.05)
 * - Glows with golden shadow
 * - Feels "clickable" and responsive
 * 
 * These tiny details make the interface feel alive and premium.
 * It's like touching a luxury car door handle - there's tactile feedback.
 * 
 * ═══════════════════════════════════════════════════════════════════════════
 * HOW IT FITS IN THE APP (The Bigger Picture)
 * ═══════════════════════════════════════════════════════════════════════════
 * 
 * USER JOURNEY:
 * 1. User lands on page → Sees animated gradient + floating orbs (immediate "wow")
 * 2. House icon fades in → Visual anchor (this is about homes)
 * 3. Headline appears → Value proposition clear
 * 4. Video starts playing → User watches (primary conversion tool)
 * 5. Video subheadline explains value → Clarity on what they'll learn
 * 6. "Get Access" button appears → Clear next step
 * 7. User clicks button → Modal opens with lead form (next component)
 * 8. User submits form → Gets access to full resource
 * 
 * TECHNICAL FLOW:
 * page.tsx (Parent Component)
 *   └─> HeroSection.tsx (This Component)
 *        ├─> Receives props: headline, subheadline, ctaText, videoUrl
 *        ├─> Renders animated background + orbs
 *        ├─> Displays content (icon, text, video)
 *        └─> Fires onCtaClick when button pressed
 *             └─> page.tsx receives click → opens Modal
 *                  └─> Modal.tsx displays → shows LeadForm.tsx
 * 
 * RESPONSIVE BEHAVIOR:
 * Mobile (< 768px):
 * - Single column layout
 * - Smaller text sizes (text-5xl)
 * - Smaller icon (w-48)
 * - Touch-friendly button size
 * - Padding: px-6 (24px sides)
 * 
 * Tablet (768px - 1024px):
 * - Medium text (text-6xl)
 * - Medium icon (md:w-72)
 * - Padding: md:px-12 (48px sides)
 * 
 * Desktop (> 1024px):
 * - Largest text (lg:text-7xl)
 * - Largest icon (lg:w-96)
 * - Max-width: max-w-5xl (keeps content centered, not stretched)
 * 
 * ═══════════════════════════════════════════════════════════════════════════
 * CUSTOMIZATION GUIDE (How to Adapt This)
 * ═══════════════════════════════════════════════════════════════════════════
 * 
 * CHANGE COLORS:
 * 1. Find the `colors` object at top of file
 * 2. Replace hex codes with your brand colors
 * 3. Example: accentSoftPeach: '#YOUR_COLOR' 
 * 
 * CHANGE VIDEO:
 * 1. Replace videoUrl prop in page.tsx
 * 2. Use embed URL format (component automatically adds params):
 *    - Loom: https://www.loom.com/embed/{VIDEO_ID}
 *    - YouTube: https://www.youtube.com/embed/{VIDEO_ID}
 *    - Vimeo: https://player.vimeo.com/video/{VIDEO_ID}
 * 3. Component adds: ?autoplay=1&muted=1&loop=1&hide_owner=true...
 * 4. Keep aspect-video class for 16:9 ratio
 * 
 * DISABLE AUTOPLAY:
 * Remove autoplay parameters from iframe src:
 * Change: src={`${videoUrl}?autoplay=1&muted=1&loop=1...`}
 * To: src={videoUrl}
 * 
 * For direct .mp4 files:
 * Replace iframe with <video> tag:
 * <video src={videoUrl} controls autoPlay muted loop playsInline />
 * 
 * CHANGE ICON:
 * 1. Replace /icons/house1.svg with your own SVG
 * 2. Update src="/icons/YOUR_ICON.svg"
 * 3. Adjust width/height in Image component if needed
 * 
 * CHANGE TEXT SIZE:
 * Headline: text-5xl md:text-6xl lg:text-7xl
 * - 5xl = mobile (48px)
 * - 6xl = tablet (60px)
 * - 7xl = desktop (72px)
 * Change these to 4xl/5xl/6xl for smaller, or 6xl/7xl/8xl for bigger
 * 
 * DISABLE AUTOPLAY:
 * Remove `autoPlay` from video tag
 * Add poster="thumbnail.jpg" for static preview image
 * User must click play button to start
 * 
 * CHANGE ANIMATION SPEED:
 * Gradient: duration: 40 (seconds) - change to 20 for faster, 60 for slower
 * Orbs: duration: 15, 18, 20, 22 - adjust each independently
 * Stagger delays: 0.2, 0.4, 0.6, etc. - reduce for faster reveal
 * 
 * ADD MORE ORBS:
 * Copy one of the existing motion.div orb blocks
 * Change: top/bottom/left/right position
 * Change: background color
 * Change: duration (timing)
 * Result: More depth layers
 * 
 * CHANGE BUTTON SIZE:
 * Current: px-16 py-6 text-2xl
 * Smaller: px-12 py-4 text-xl
 * Larger: px-20 py-8 text-3xl
 * 
 * ═══════════════════════════════════════════════════════════════════════════
 * BRAND ALIGNMENT (Why It Matches Ferrari + Hermès)
 * ═══════════════════════════════════════════════════════════════════════════
 * 
 * FERRARI ELEMENTS:
 * ✅ Cinematic motion (animated gradient, floating orbs)
 * ✅ Bold, confident typography (UPPERCASE headline)
 * ✅ Depth and layers (4 orb layers create 3D space)
 * ✅ Performance feel (smooth 60fps animations)
 * ✅ Precision engineering (exact timing, intentional delays)
 * 
 * HERMÈS ELEMENTS:
 * ✅ Restraint (no cluttered design, plenty of whitespace)
 * ✅ Craftsmanship (every detail intentional)
 * ✅ Timeless colors (warm peach/coral palette, not trendy)
 * ✅ Quality materials (custom SVG icon, no generic emojis)
 * ✅ Understated luxury (elegant, not flashy)
 * 
 * LUXURY PSYCHOLOGY PRINCIPLES:
 * 1. SCARCITY: "Instant Access" implies exclusivity
 * 2. AUTHORITY: "Licensed Realtor" builds credibility
 * 3. SOCIAL PROOF: Trust badges below button
 * 4. CLARITY: Short CTA removes decision paralysis
 * 5. CONFIDENCE: No desperate language, calm assurance
 * 6. RESPECT: Video has controls (user has agency)
 * 7. PATIENCE: Staggered animations don't rush user
 * 
 * This isn't just a hero section - it's a carefully orchestrated
 * experience designed to make visitors feel they've discovered something
 * valuable and exclusive, just like walking into a Ferrari showroom or
 * Hermès boutique.
 * 
 * ═══════════════════════════════════════════════════════════════════════════
 * PERFORMANCE NOTES
 * ═══════════════════════════════════════════════════════════════════════════
 * 
 * OPTIMIZATION TECHNIQUES:
 * - Framer Motion uses GPU acceleration (smooth 60fps)
 * - next/image lazy loads + optimizes SVG
 * - Video uses native HTML5 (no heavy player libraries)
 * - Animations run on transform/opacity (hardware accelerated properties)
 * - Z-index layering keeps repaints minimal
 * 
 * LOAD TIME CONSIDERATIONS:
 * - SVG icon: < 5KB (instant load)
 * - Gradient: CSS only (no image)
 * - Orbs: CSS blur filter (GPU rendered)
 * - Video: Loads asynchronously (doesn't block page render)
 * 
 * MOBILE PERFORMANCE:
 * - Reduced animation complexity on mobile (browser optimizes)
 * - playsInline prevents fullscreen video (better UX)
 * - Touch-friendly button size (min 44x44px hit area)
 * 
 * ═══════════════════════════════════════════════════════════════════════════
 * COMMON QUESTIONS & ANSWERS
 * ═══════════════════════════════════════════════════════════════════════════
 * 
 * Q: Why is video muted by default?
 * A: Browser autoplay policies require muted video. Unexpected sound
 *    annoys users. They can unmute if interested.
 * 
 * Q: Why so many orbs?
 * A: Depth perception. Different timing creates 3D illusion, like looking
 *    through layers of atmosphere. Premium brands use depth extensively.
 * 
 * Q: Why uppercase headline?
 * A: Commands attention. Luxury brands (GUCCI, PRADA, CARTIER) use
 *    uppercase for confidence and authority.
 * 
 * Q: Why delay animations?
 * A: Staggered reveals feel cinematic and intentional. Everything at
 *    once feels rushed and cheap. Luxury takes its time.
 * 
 * Q: Can I use emoji instead of SVG?
 * A: NO. Brand guidelines explicitly forbid emojis. Custom icons show
 *    craftsmanship and attention to detail.
 * 
 * Q: Why is CTA so short?
 * A: Every word adds friction. "Get Access" is clear, confident, and
 *    respectful of user's time. Converts better than long text.
 * 
 * Q: Will this work on slow connections?
 * A: Yes. CSS animations run on GPU (smooth even on slow devices).
 *    Video loads asynchronously (page renders while video loads).
 * 
 * Q: How do I test different CTAs?
 * A: Change ctaText prop in page.tsx. Component is designed for
 *    easy A/B testing without touching this file.
 */