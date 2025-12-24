// ============================================================================
// FOOTER COMPONENT - Main Site Footer + TRACKING
// ============================================================================
// What: Clean, minimal footer for main website
// Why: Provides social links, newsletter, legal info without overwhelming
// How: Simplified structure matching David Alaba aesthetic + click tracking
// ============================================================================

'use client'

import { FaInstagram, FaLinkedin, FaYoutube, FaPinterest, FaFacebook } from 'react-icons/fa'

// Track footer interactions
const trackFooterClick = (label: string) => {
  if (typeof window !== 'undefined' && (window as any).gtag) {
    ;(window as any).gtag('event', 'nav_click', {
      event_category: 'Footer',
      event_label: label,
    })
  }
}

// Track newsletter signup
const trackNewsletterSubmit = () => {
  if (typeof window !== 'undefined' && (window as any).gtag) {
    ;(window as any).gtag('event', 'newsletter_signup', {
      event_category: 'Conversion',
      event_label: 'Footer Newsletter',
    })
  }
}

export default function Footer() {
  const currentYear = new Date().getFullYear()

  const handleNewsletterSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    trackNewsletterSubmit()
    // Add your newsletter integration here
  }

  return (
    <footer className="bg-black text-white py-16 border-t border-white/10">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        
        {/* Main Footer Content */}
        <div className="grid md:grid-cols-3 gap-12 mb-12">
          
          {/* Brand Section */}
          <div>
            <h3 className="text-2xl font-bold mb-4 tracking-tight">Kerry Lee Hartley</h3>
            <p className="text-gray-400 text-sm leading-relaxed">
              Man of God. Innovator. Storyteller. Building legacy through strategy, 
              creativity, and intentional impact.
            </p>
          </div>

          {/* Quick Links WITH TRACKING */}
          <div>
            <h4 className="font-semibold mb-4 uppercase tracking-wider text-sm">Navigate</h4>
            <ul className="space-y-3 text-sm text-gray-400">
              <li>
                <a 
                  href="/journey"
                  onClick={() => trackFooterClick('Journey')}
                  className="hover:text-white transition-colors"
                >
                  Journey
                </a>
              </li>
              <li>
                <a 
                  href="/work/technology"
                  onClick={() => trackFooterClick('Technology')}
                  className="hover:text-white transition-colors"
                >
                  Technology
                </a>
              </li>
              <li>
                <a 
                  href="/blog"
                  onClick={() => trackFooterClick('Stories')}
                  className="hover:text-white transition-colors"
                >
                  Stories
                </a>
              </li>
              <li>
                <a 
                  href="/impact"
                  onClick={() => trackFooterClick('Impact')}
                  className="hover:text-white transition-colors"
                >
                  Impact
                </a>
              </li>
              <li>
                <a 
                  href="/contact"
                  onClick={() => trackFooterClick('Contact')}
                  className="hover:text-white transition-colors"
                >
                  Contact
                </a>
              </li>
            </ul>
          </div>

          {/* Newsletter Signup WITH TRACKING */}
          <div>
            <h4 className="font-semibold mb-4 uppercase tracking-wider text-sm">Stay Connected</h4>
            <p className="text-gray-400 text-sm mb-4">
              Subscribe for insights on tech, real estate, and intentional living.
            </p>
            <form onSubmit={handleNewsletterSubmit} className="flex gap-2">
              <input
                type="email"
                placeholder="Your email"
                required
                className="flex-1 px-4 py-2 bg-white/5 border border-white/10 rounded focus:outline-none focus:border-white/30 text-sm"
              />
              <button
                type="submit"
                className="px-6 py-2 bg-white text-black rounded hover:bg-gray-200 transition-colors text-sm font-semibold"
              >
                Subscribe
              </button>
            </form>
          </div>
        </div>

        {/* Social Links WITH TRACKING */}
        <div className="flex gap-6 justify-center mb-8 pt-8 border-t border-white/10">
          <a 
            href="https://www.instagram.com/kerryleehartley" 
            target="_blank" 
            rel="noopener noreferrer"
            onClick={() => trackFooterClick('Instagram')}
            className="hover:text-gray-400 transition-colors"
            aria-label="Instagram"
          >
            <FaInstagram className="w-5 h-5" />
          </a>
          <a 
            href="https://www.linkedin.com/in/kerryleehartley/" 
            target="_blank" 
            rel="noopener noreferrer"
            onClick={() => trackFooterClick('LinkedIn')}
            className="hover:text-gray-400 transition-colors"
            aria-label="LinkedIn"
          >
            <FaLinkedin className="w-5 h-5" />
          </a>
          <a 
            href="https://youtube.com/@kerryleehartley" 
            target="_blank" 
            rel="noopener noreferrer"
            onClick={() => trackFooterClick('YouTube')}
            className="hover:text-gray-400 transition-colors"
            aria-label="YouTube"
          >
            <FaYoutube className="w-5 h-5" />
          </a>
          <a 
            href="https://www.pinterest.com/kerryleehartley/" 
            target="_blank" 
            rel="noopener noreferrer"
            onClick={() => trackFooterClick('Pinterest')}
            className="hover:text-gray-400 transition-colors"
            aria-label="Pinterest"
          >
            <FaPinterest className="w-5 h-5" />
          </a>
          <a 
            href="https://www.facebook.com/kerryleehartley" 
            target="_blank" 
            rel="noopener noreferrer"
            onClick={() => trackFooterClick('Facebook')}
            className="hover:text-gray-400 transition-colors"
            aria-label="Facebook"
          >
            <FaFacebook className="w-5 h-5" />
          </a>
        </div>

        {/* Bottom Bar WITH TRACKING */}
        <div className="text-center text-gray-500 text-sm space-y-2">
          <p>© {currentYear} Kerry Lee Hartley. All rights reserved.</p>
          <div className="flex gap-6 justify-center">
            <a 
              href="/privacy"
              onClick={() => trackFooterClick('Privacy Policy')}
              className="hover:text-white transition-colors"
            >
              Privacy Policy
            </a>
            <a 
              href="/terms"
              onClick={() => trackFooterClick('Terms of Service')}
              className="hover:text-white transition-colors"
            >
              Terms of Service
            </a>
          </div>
        </div>
      </div>
    </footer>
  )
}

// ============================================================================
// 📊 TRACKING EVENTS ADDED:
// ============================================================================
/*
 * NAVIGATION LINKS:
 * 1. nav_click - "Journey"
 * 2. nav_click - "Technology"
 * 3. nav_click - "Stories"
 * 4. nav_click - "Impact"
 * 5. nav_click - "Contact"
 * 
 * SOCIAL LINKS:
 * 6. nav_click - "Instagram"
 * 7. nav_click - "LinkedIn"
 * 8. nav_click - "YouTube"
 * 9. nav_click - "Pinterest"
 * 10. nav_click - "Facebook"
 * 
 * LEGAL LINKS:
 * 11. nav_click - "Privacy Policy"
 * 12. nav_click - "Terms of Service"
 * 
 * CONVERSION:
 * 13. newsletter_signup - "Footer Newsletter"
 * 
 * INSIGHTS:
 * - Footer engagement rate
 * - Most clicked social platform
 * - Newsletter signup conversion from footer
 */