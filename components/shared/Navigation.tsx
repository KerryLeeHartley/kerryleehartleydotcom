// ============================================================================
// NAVIGATION COMPONENT - Main Site Header + TRACKING
// ============================================================================
// What: Primary navigation for the main website (not funnels)
// Why: Provides clean, minimal navigation matching David Alaba aesthetic
// How: Fixed header with dropdown for WORK, mobile overlay menu + click tracking
// ============================================================================

'use client'

import { motion, AnimatePresence } from 'framer-motion'
import { useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'

// Track navigation clicks
const trackNavClick = (label: string, isMobile: boolean = false) => {
  if (typeof window !== 'undefined' && (window as any).gtag) {
    ;(window as any).gtag('event', 'nav_click', {
      event_category: isMobile ? 'Mobile Navigation' : 'Desktop Navigation',
      event_label: label,
    })
  }
}

export default function Navigation() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [workDropdownOpen, setWorkDropdownOpen] = useState(false)

  return (
    <>
      {/* DESKTOP NAVIGATION */}
      <motion.nav
        className="fixed top-0 left-0 right-0 z-50 bg-black/90 backdrop-blur-md border-b border-white/10"
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="flex items-center justify-between h-20">
            
            {/* Logo - Your Signature WITH TRACKING */}
            <Link 
              href="/" 
              onClick={() => trackNavClick('Logo')}
              className="relative w-32 h-12"
            >
              <Image
                src="/BlackTransparent.png"
                alt="Kerry Lee Hartley"
                fill
                className="object-contain"
                priority
              />
            </Link>

            {/* Desktop Menu WITH TRACKING */}
            <div className="hidden md:flex items-center gap-8">
              <Link 
                href="/"
                onClick={() => trackNavClick('Home')}
                className="text-white hover:text-gray-300 transition-colors duration-300 text-sm uppercase tracking-wider"
              >
                Home
              </Link>
              
              <Link 
                href="/journey"
                onClick={() => trackNavClick('Journey')}
                className="text-white hover:text-gray-300 transition-colors duration-300 text-sm uppercase tracking-wider"
              >
                Journey
              </Link>

              {/* Work Dropdown WITH TRACKING */}
              <div 
                className="relative"
                onMouseEnter={() => setWorkDropdownOpen(true)}
                onMouseLeave={() => setWorkDropdownOpen(false)}
              >
                <button 
                  onClick={() => trackNavClick('Work Dropdown')}
                  className="text-white hover:text-gray-300 transition-colors duration-300 text-sm uppercase tracking-wider flex items-center gap-1"
                >
                  Work
                  <svg 
                    className={`w-4 h-4 transition-transform duration-200 ${workDropdownOpen ? 'rotate-180' : ''}`}
                    fill="none" 
                    stroke="currentColor" 
                    viewBox="0 0 24 24"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </button>

                {/* Dropdown Menu */}
                <AnimatePresence>
                  {workDropdownOpen && (
                    <motion.div
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      transition={{ duration: 0.2 }}
                      className="absolute top-full left-0 mt-2 w-48 bg-black/95 backdrop-blur-md border border-white/10 rounded-lg shadow-xl overflow-hidden"
                    >
                      <Link 
                        href="/work/technology"
                        onClick={() => trackNavClick('Work > Technology')}
                        className="block px-6 py-3 text-white hover:bg-white/10 transition-colors text-sm"
                      >
                        Technology
                      </Link>
                      <Link 
                        href="/funnel/first-time-buyers"
                        onClick={() => trackNavClick('Work > Real Estate')}
                        className="block px-6 py-3 text-white hover:bg-white/10 transition-colors text-sm"
                      >
                        Real Estate
                      </Link>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              <Link 
                href="/blog"
                onClick={() => trackNavClick('Stories')}
                className="text-white hover:text-gray-300 transition-colors duration-300 text-sm uppercase tracking-wider"
              >
                Stories
              </Link>

              <Link 
                href="/impact"
                onClick={() => trackNavClick('Impact')}
                className="text-white hover:text-gray-300 transition-colors duration-300 text-sm uppercase tracking-wider"
              >
                Impact
              </Link>

              <Link 
                href="/contact"
                onClick={() => trackNavClick('Contact')}
                className="text-white hover:text-gray-300 transition-colors duration-300 text-sm uppercase tracking-wider"
              >
                Contact
              </Link>
            </div>

            {/* Mobile Menu Button */}
            <button
              onClick={() => {
                setMobileMenuOpen(!mobileMenuOpen)
                trackNavClick('Mobile Menu Toggle', true)
              }}
              className="md:hidden text-white p-2"
              aria-label="Toggle menu"
            >
              <svg 
                className="w-6 h-6" 
                fill="none" 
                stroke="currentColor" 
                viewBox="0 0 24 24"
              >
                {mobileMenuOpen ? (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                ) : (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                )}
              </svg>
            </button>
          </div>
        </div>
      </motion.nav>

      {/* MOBILE MENU OVERLAY WITH TRACKING */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-40 bg-black md:hidden"
          >
            <div className="flex flex-col items-center justify-center h-full space-y-8 px-6">
              
              {/* Close Button */}
              <button
                onClick={() => {
                  setMobileMenuOpen(false)
                  trackNavClick('Mobile Menu Close', true)
                }}
                className="absolute top-8 right-8 text-white text-sm uppercase tracking-wider"
              >
                Close
              </button>

              {/* Logo */}
              <div className="absolute top-8 left-1/2 -translate-x-1/2 w-24 h-12 relative">
                <Image
                  src="/BlackTransparent.png"
                  alt="Kerry Lee Hartley"
                  fill
                  className="object-contain brightness-0 invert"
                />
              </div>

              {/* Menu Items WITH TRACKING */}
              <div className="flex flex-col items-center space-y-6 text-center">
                <Link 
                  href="/"
                  onClick={() => {
                    setMobileMenuOpen(false)
                    trackNavClick('Home', true)
                  }}
                  className="text-white text-2xl uppercase tracking-wider hover:text-gray-400 transition-colors"
                >
                  Home
                </Link>
                
                <Link 
                  href="/journey"
                  onClick={() => {
                    setMobileMenuOpen(false)
                    trackNavClick('Journey', true)
                  }}
                  className="text-white text-2xl uppercase tracking-wider hover:text-gray-400 transition-colors"
                >
                  Journey
                </Link>

                <div className="text-white text-xl uppercase tracking-wider opacity-50">Work</div>
                <Link 
                  href="/work/technology"
                  onClick={() => {
                    setMobileMenuOpen(false)
                    trackNavClick('Work > Technology', true)
                  }}
                  className="text-white text-lg pl-8 hover:text-gray-400 transition-colors"
                >
                  → Technology
                </Link>
                <Link 
                  href="/funnel/first-time-buyers"
                  onClick={() => {
                    setMobileMenuOpen(false)
                    trackNavClick('Work > Real Estate', true)
                  }}
                  className="text-white text-lg pl-8 hover:text-gray-400 transition-colors"
                >
                  → Real Estate
                </Link>

                <Link 
                  href="/blog"
                  onClick={() => {
                    setMobileMenuOpen(false)
                    trackNavClick('Stories', true)
                  }}
                  className="text-white text-2xl uppercase tracking-wider hover:text-gray-400 transition-colors"
                >
                  Stories
                </Link>

                <Link 
                  href="/impact"
                  onClick={() => {
                    setMobileMenuOpen(false)
                    trackNavClick('Impact', true)
                  }}
                  className="text-white text-2xl uppercase tracking-wider hover:text-gray-400 transition-colors"
                >
                  Impact
                </Link>

                <Link 
                  href="/contact"
                  onClick={() => {
                    setMobileMenuOpen(false)
                    trackNavClick('Contact', true)
                  }}
                  className="text-white text-2xl uppercase tracking-wider hover:text-gray-400 transition-colors"
                >
                  Contact
                </Link>
              </div>

              {/* Social Links WITH TRACKING */}
              <div className="flex gap-6 pt-8">
                <a 
                  href="https://instagram.com" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  onClick={() => trackNavClick('Instagram', true)}
                  className="text-white hover:text-gray-400 transition-colors"
                >
                  INSTAGRAM
                </a>
                <a 
                  href="https://linkedin.com" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  onClick={() => trackNavClick('LinkedIn', true)}
                  className="text-white hover:text-gray-400 transition-colors"
                >
                  LINKEDIN
                </a>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}

// ============================================================================
// 📊 TRACKING EVENTS ADDED:
// ============================================================================
/*
 * DESKTOP NAVIGATION:
 * 1. nav_click - "Logo"
 * 2. nav_click - "Home"
 * 3. nav_click - "Journey"
 * 4. nav_click - "Work Dropdown"
 * 5. nav_click - "Work > Technology"
 * 6. nav_click - "Work > Real Estate"
 * 7. nav_click - "Stories"
 * 8. nav_click - "Impact"
 * 9. nav_click - "Contact"
 * 
 * MOBILE NAVIGATION:
 * 10. nav_click - "Mobile Menu Toggle"
 * 11. nav_click - "Mobile Menu Close"
 * 12. nav_click - All menu items (marked as mobile)
 * 13. nav_click - "Instagram" (mobile)
 * 14. nav_click - "LinkedIn" (mobile)
 * 
 * INSIGHTS:
 * - Desktop vs Mobile usage
 * - Most popular navigation destinations
 * - Work dropdown engagement
 */