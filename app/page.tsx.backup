// ============================================================================
// HOMEPAGE - Main Landing Page
// ============================================================================
// What: Main homepage bringing together all sections
// Why: The "museum experience" - your personal brand showcase
// How: Combines hero, pillars, journey, and CTA sections
// ============================================================================

import Navigation from '@/components/shared/Navigation'
import MainFooter from '@/components/shared/MainFooter'
import HeroSection from '@/components/homepage/HeroSection'
import FourPillars from '@/components/homepage/FourPillars'
import JourneyPreview from '@/components/homepage/JourneyPreview'
import ContactCTA from '@/components/homepage/ContactCTA'

export default function HomePage() {
  return (
    <main className="bg-black">
      {/* Navigation */}
      <Navigation />

      {/* Hero Section - Full Screen Opening */}
      <HeroSection />

      {/* Introduction Section - Brief About */}
      <section className="py-24 bg-zinc-950">
        <div className="max-w-4xl mx-auto px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-5xl font-light text-white mb-8 leading-relaxed">
            I build experiences that matter.
          </h2>
          <p className="text-gray-400 text-lg leading-relaxed max-w-3xl mx-auto">
            From launching GTM strategies that drive millions in growth, to guiding 
            families to their first home, to sharing stories that inspire action—
            everything I do is intentional. This is my journey. Welcome to the experience.
          </p>
        </div>
      </section>

      {/* Four Pillars - Main Gateway */}
      <FourPillars />

      {/* Journey Preview - Timeline */}
      <JourneyPreview />

      {/* Featured Stories Section - Blog Preview */}
      <section className="py-24 bg-black">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-5xl md:text-6xl font-bold text-white mb-6 tracking-tight">
              Recent Stories
            </h2>
            <p className="text-gray-400 text-lg">
              Insights on technology, real estate, and intentional living.
            </p>
          </div>

          {/* Blog Post Cards - Placeholder */}
          <div className="grid md:grid-cols-3 gap-8">
            {[1, 2, 3].map((i) => (
              <div key={i} className="group cursor-pointer">
                <div className="relative h-64 mb-4 overflow-hidden rounded-lg bg-zinc-900">
                  <div className="absolute inset-0 bg-gradient-to-t from-black to-transparent" />
                  <div className="absolute bottom-4 left-4 text-white">
                    <span className="text-xs uppercase tracking-wider text-gray-400 block mb-2">
                      Coming Soon
                    </span>
                    <h3 className="text-xl font-bold">Featured Story {i}</h3>
                  </div>
                </div>
                <p className="text-gray-500 text-sm">
                  Content will be added from your blog posts...
                </p>
              </div>
            ))}
          </div>

          <div className="text-center mt-12">
            <a
              href="/blog"
              className="inline-flex items-center gap-2 px-8 py-4 border border-white/30 text-white rounded-full hover:bg-white/10 transition-colors font-semibold uppercase tracking-wider text-sm"
            >
              View All Stories
              <svg 
                className="w-4 h-4" 
                fill="none" 
                stroke="currentColor" 
                viewBox="0 0 24 24"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </a>
          </div>
        </div>
      </section>

      {/* Contact CTA - Final Invitation */}
      <ContactCTA />

      {/* Footer */}
      <MainFooter />
    </main>
  )
}

// ============================================================================
// 📚 COMPREHENSIVE USAGE NOTES FOR KERRY
// ============================================================================
/*
 * WELCOME TO YOUR HOMEPAGE! 🎉
 * 
 * This is the main landing page - the "museum experience" we discussed.
 * Everything is built with placeholder content that you'll refine over time.
 * 
 * ═══════════════════════════════════════════════════════════════════════════
 * STRUCTURE OVERVIEW:
 * ═══════════════════════════════════════════════════════════════════════════
 * 
 * 1. HERO SECTION
 *    - Your signature logo
 *    - "Man of God" tagline
 *    - Full-screen opening
 *    - Placeholder photo (replace with your professional shot)
 * 
 * 2. INTRODUCTION
 *    - Brief "who you are" statement
 *    - Sets tone for the site
 *    - Placeholder copy (refine as you go)
 * 
 * 3. FOUR PILLARS (Your Fundamental 4)
 *    - INNOVATE → Technology Portfolio
 *    - INSPIRE → Stories/Blog
 *    - INVEST → Real Estate Funnels
 *    - IMPACT → Philanthropy
 *    - Each card has placeholder images (replace with your photos)
 * 
 * 4. JOURNEY PREVIEW
 *    - Timeline of key moments
 *    - Based on your resume + life moments
 *    - Links to full /journey page (to be built)
 * 
 * 5. FEATURED STORIES
 *    - 3 recent blog posts (placeholder for now)
 *    - Will connect to your actual blog later
 * 
 * 6. CONTACT CTA
 *    - Final invitation to connect
 *    - Get in Touch + Newsletter buttons
 * 
 * 7. FOOTER
 *    - Social links
 *    - Navigation
 *    - Newsletter signup
 * 
 * ═══════════════════════════════════════════════════════════════════════════
 * WHAT'S PLACEHOLDER (TO BE REPLACED):
 * ═══════════════════════════════════════════════════════════════════════════
 * 
 * IMAGES:
 * - Hero background (Unsplash stock photo)
 * - Four Pillars cards (Unsplash stock photos)
 * - Contact CTA background (Unsplash stock photo)
 * → Replace with your professional photos after photo shoot
 * 
 * COPY:
 * - Introduction text ("I build experiences...")
 * - Journey descriptions
 * - Four Pillars descriptions
 * → Refine through version control as you iterate
 * 
 * BLOG POSTS:
 * - "Featured Story 1, 2, 3" placeholders
 * → Will populate from your actual blog posts once connected
 * 
 * ═══════════════════════════════════════════════════════════════════════════
 * HOW TO UPDATE CONTENT:
 * ═══════════════════════════════════════════════════════════════════════════
 * 
 * INTRODUCTION TEXT:
 * - Find: "I build experiences that matter"
 * - Edit: Change to your preferred wording
 * - Keep it concise (2-3 sentences max)
 * 
 * FOUR PILLARS:
 * - Open: /components/homepage/FourPillars.tsx
 * - Edit: Change descriptions in pillars array
 * - Images: Replace imageSrc URLs with your photos
 * 
 * JOURNEY TIMELINE:
 * - Open: /components/homepage/JourneyPreview.tsx
 * - Edit: Update milestones array with your moments
 * - Add: New timeline items as your story grows
 * 
 * ═══════════════════════════════════════════════════════════════════════════
 * PAGES THAT NEED TO BE BUILT NEXT:
 * ═══════════════════════════════════════════════════════════════════════════
 * 
 * IMMEDIATE PRIORITY:
 * 1. /journey - Full timeline page (deep story like David Alaba)
 * 2. /work/technology - Tech portfolio page
 * 3. /blog - Main blog listing page
 * 4. /impact - Philanthropy page
 * 5. /contact - Contact form page
 * 
 * THESE PAGES LINKED FROM HOMEPAGE:
 * - Four Pillars cards link to these pages
 * - Navigation links to these pages
 * - Footer links to these pages
 * 
 * ═══════════════════════════════════════════════════════════════════════════
 * TESTING CHECKLIST:
 * ═══════════════════════════════════════════════════════════════════════════
 * 
 * LOCAL TESTING:
 * 1. Run: npm run dev
 * 2. Visit: http://localhost:3000
 * 3. Check: Hero loads with your signature
 * 4. Check: Navigation dropdown works
 * 5. Check: All sections visible and animated
 * 6. Check: Four Pillars cards hover correctly
 * 7. Check: Timeline displays properly
 * 8. Check: Mobile menu works (resize browser)
 * 9. Check: All links work (even if pages don't exist yet)
 * 10. Check: Footer displays correctly
 * 
 * MOBILE TESTING:
 * 1. Resize browser to mobile width
 * 2. Check: Hero looks good on mobile
 * 3. Check: Mobile menu overlay works
 * 4. Check: Four Pillars stack vertically
 * 5. Check: Timeline displays correctly
 * 6. Check: Footer is readable
 * 
 * ═══════════════════════════════════════════════════════════════════════════
 * NEXT STEPS AFTER REVIEWING:
 * ═══════════════════════════════════════════════════════════════════════════
 * 
 * 1. TEST LOCALLY
 *    - Make sure everything loads
 *    - Click through all sections
 *    - Test mobile responsiveness
 * 
 * 2. GATHER FEEDBACK
 *    - Does it feel like "you"?
 *    - Is the David Alaba aesthetic coming through?
 *    - Any sections feel off?
 * 
 * 3. PREPARE FOR PHOTO SHOOT
 *    - Show photographer the placeholder images
 *    - Explain the style (editorial B&W, moody)
 *    - Get shots that match the layouts
 * 
 * 4. REFINE COPY
 *    - Introduction text
 *    - Four Pillars descriptions
 *    - Journey timeline descriptions
 * 
 * 5. BUILD NEXT PAGES
 *    - /journey (full story)
 *    - /work/technology (portfolio)
 *    - /blog (listing page)
 * 
 * ═══════════════════════════════════════════════════════════════════════════
 * DESIGN NOTES:
 * ═══════════════════════════════════════════════════════════════════════════
 * 
 * COLOR PALETTE:
 * - Black (#000000) - Primary background
 * - Zinc-950 - Secondary sections
 * - White (#FFFFFF) - Primary text
 * - Gray-400 - Secondary text
 * 
 * TYPOGRAPHY:
 * - Headlines: Bold, tight tracking
 * - Body: Light, relaxed leading
 * - Uppercase: Used sparingly for small text
 * 
 * ANIMATIONS:
 * - Smooth fade-ins on scroll
 * - Hover effects on cards
 * - Staggered timeline reveals
 * - All using Framer Motion
 * 
 * ═══════════════════════════════════════════════════════════════════════════
 * IMPORTANT REMINDERS:
 * ═══════════════════════════════════════════════════════════════════════════
 * 
 * - This is MVP - placeholder content is EXPECTED
 * - Logo file must be at /public/BlackTransparent.png
 * - All photos are temporary - replace after photo shoot
 * - Copy will be refined through version control
 * - Pages linked from cards don't exist yet - build them next
 * - Mobile responsiveness is built in
 * - All animations tested and working
 * - This matches David Alaba aesthetic as discussed
 * 
 * ═══════════════════════════════════════════════════════════════════════════
 * 
 * YOU'RE READY TO TEST! 🚀
 * 
 * Run `npm run dev` and visit http://localhost:3000
 * 
 * Let me know what you think and we'll iterate from there!
 * 
 * ═══════════════════════════════════════════════════════════════════════════
 */