// ============================================================================
// HOMEPAGE - Main Landing Page (FULLY TRACKED)
// ============================================================================
// What: Main homepage bringing together all sections
// Why: The "museum experience" - your personal brand showcase
// How: Combines hero, pillars, journey, and CTA sections + comprehensive analytics
// ============================================================================

'use client'

import { trackNavClick } from '@/components/analytics/GoogleAnalytics'
import Navigation from '@/components/shared/Navigation'
import MainFooter from '@/components/shared/MainFooter'
import HeroSection from '@/components/homepage/HeroSection'
import FourPillars from '@/components/homepage/FourPillars'
import JourneyPreview from '@/components/homepage/JourneyPreview'
import ContactCTA from '@/components/homepage/ContactCTA'
import ScrollTracker from '@/components/apply/ScrollTracker'

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

      {/* Featured Stories Section - Blog Preview WITH TRACKING */}
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

          {/* Blog Post Cards - Placeholder WITH DYNAMIC TRACKING */}
          <div className="grid md:grid-cols-3 gap-8">
            {/* When you add real blog posts, replace this array with your actual posts */}
            {[
              { id: 1, title: 'Featured Story 1', category: 'Coming Soon' },
              { id: 2, title: 'Featured Story 2', category: 'Coming Soon' },
              { id: 3, title: 'Featured Story 3', category: 'Coming Soon' }
              // Real data will look like:
              // { id: 1, title: 'Building a GTM Strategy', category: 'Technology', slug: 'building-gtm-strategy' },
              // { id: 2, title: 'First-Time Home Buying Tips', category: 'Real Estate', slug: 'home-buying-tips' },
            ].map((post) => (
              <div 
                key={post.id} 
                className="group cursor-pointer"
                onClick={() => trackNavClick(`Homepage - Blog: ${post.title}`)}
              >
                <div className="relative h-64 mb-4 overflow-hidden rounded-lg bg-zinc-900 group-hover:ring-2 group-hover:ring-white/20 transition-all">
                  <div className="absolute inset-0 bg-gradient-to-t from-black to-transparent" />
                  <div className="absolute bottom-4 left-4 text-white">
                    <span className="text-xs uppercase tracking-wider text-gray-400 block mb-2">
                      {post.category}
                    </span>
                    <h3 className="text-xl font-bold">{post.title}</h3>
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
              onClick={() => trackNavClick('Homepage - View All Stories')}
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

      {/* Scroll Tracking */}
      <ScrollTracker company="Homepage" />
    </main>
  )
}

// ============================================================================
// 📊 TRACKING EVENTS ADDED TO HOMEPAGE:
// ============================================================================
/*
 * CURRENTLY TRACKING ON THIS PAGE:
 * 
 * 1. page_view (automatic via GA4)
 * 2. scroll_depth (25%, 50%, 75%, 100% via ScrollTracker)
 * 3. nav_click - "Homepage - Blog Card 1"
 * 4. nav_click - "Homepage - Blog Card 2"
 * 5. nav_click - "Homepage - Blog Card 3"
 * 6. nav_click - "Homepage - View All Stories"
 * 
 * CHILD COMPONENTS (need their own tracking):
 * - HeroSection: Upload next for tracking
 * - FourPillars: Upload next for tracking
 * - JourneyPreview: Upload next for tracking
 * - ContactCTA: Upload next for tracking
 * - Navigation: Upload next for tracking
 * - MainFooter: Upload next for tracking
 */