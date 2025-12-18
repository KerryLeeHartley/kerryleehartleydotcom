// ============================================================================
// FOOTER COMPONENT - Main Site Footer
// ============================================================================
// What: Clean, minimal footer for main website
// Why: Provides social links, newsletter, legal info without overwhelming
// How: Simplified structure matching David Alaba aesthetic
// ============================================================================

'use client'

import { FaInstagram, FaLinkedin, FaYoutube, FaPinterest, FaFacebook } from 'react-icons/fa'

export default function Footer() {
  const currentYear = new Date().getFullYear()

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

          {/* Quick Links */}
          <div>
            <h4 className="font-semibold mb-4 uppercase tracking-wider text-sm">Navigate</h4>
            <ul className="space-y-3 text-sm text-gray-400">
              <li>
                <a href="/journey" className="hover:text-white transition-colors">
                  Journey
                </a>
              </li>
              <li>
                <a href="/work/technology" className="hover:text-white transition-colors">
                  Technology
                </a>
              </li>
              <li>
                <a href="/blog" className="hover:text-white transition-colors">
                  Stories
                </a>
              </li>
              <li>
                <a href="/impact" className="hover:text-white transition-colors">
                  Impact
                </a>
              </li>
              <li>
                <a href="/contact" className="hover:text-white transition-colors">
                  Contact
                </a>
              </li>
            </ul>
          </div>

          {/* Newsletter Signup */}
          <div>
            <h4 className="font-semibold mb-4 uppercase tracking-wider text-sm">Stay Connected</h4>
            <p className="text-gray-400 text-sm mb-4">
              Subscribe for insights on tech, real estate, and intentional living.
            </p>
            <form className="flex gap-2">
              <input
                type="email"
                placeholder="Your email"
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

        {/* Social Links */}
        <div className="flex gap-6 justify-center mb-8 pt-8 border-t border-white/10">
          <a 
            href="https://instagram.com" 
            target="_blank" 
            rel="noopener noreferrer"
            className="hover:text-gray-400 transition-colors"
            aria-label="Instagram"
          >
            <FaInstagram className="w-5 h-5" />
          </a>
          <a 
            href="https://linkedin.com" 
            target="_blank" 
            rel="noopener noreferrer"
            className="hover:text-gray-400 transition-colors"
            aria-label="LinkedIn"
          >
            <FaLinkedin className="w-5 h-5" />
          </a>
          <a 
            href="https://youtube.com" 
            target="_blank" 
            rel="noopener noreferrer"
            className="hover:text-gray-400 transition-colors"
            aria-label="YouTube"
          >
            <FaYoutube className="w-5 h-5" />
          </a>
          <a 
            href="https://pinterest.com" 
            target="_blank" 
            rel="noopener noreferrer"
            className="hover:text-gray-400 transition-colors"
            aria-label="Pinterest"
          >
            <FaPinterest className="w-5 h-5" />
          </a>
          <a 
            href="https://facebook.com" 
            target="_blank" 
            rel="noopener noreferrer"
            className="hover:text-gray-400 transition-colors"
            aria-label="Facebook"
          >
            <FaFacebook className="w-5 h-5" />
          </a>
        </div>

        {/* Bottom Bar */}
        <div className="text-center text-gray-500 text-sm space-y-2">
          <p>© {currentYear} Kerry Lee Hartley. All rights reserved.</p>
          <div className="flex gap-6 justify-center">
            <a href="/privacy" className="hover:text-white transition-colors">
              Privacy Policy
            </a>
            <a href="/terms" className="hover:text-white transition-colors">
              Terms of Service
            </a>
          </div>
        </div>
      </div>
    </footer>
  )
}

// ============================================================================
// 📚 USAGE NOTES
// ============================================================================
/*
 * PURPOSE:
 * Clean footer for main website (not funnel pages)
 * 
 * KEY FEATURES:
 * - Brand statement
 * - Quick navigation links
 * - Newsletter signup form
 * - Social media links
 * - Legal links
 * 
 * HOW TO MODIFY:
 * - Update social URLs: Change href values in social links
 * - Add/remove nav links: Edit Quick Links section
 * - Newsletter form: Connect to your email service (ConvertKit, Mailchimp, etc.)
 * - Change colors: Modify bg-black, text-white, etc.
 * 
 * IMPORTANT:
 * - This is for MAIN SITE only (funnels use different footer)
 * - Newsletter form needs backend integration (placeholder for now)
 * - Social links need your actual URLs
 */