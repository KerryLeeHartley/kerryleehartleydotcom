// ============================================================================
// NAVIGATION COMPONENT - Main Site Header
// ============================================================================
// What: Primary navigation for the main website (not funnels)
// Why: Provides clean, minimal navigation matching David Alaba aesthetic
// How: Fixed header with dropdown for WORK, mobile overlay menu
// ============================================================================

'use client'

import { motion, AnimatePresence } from 'framer-motion'
import { useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'

export default function Navigation() {
  // ==========================================================================
  // STATE MANAGEMENT
  // ==========================================================================
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [workDropdownOpen, setWorkDropdownOpen] = useState(false)

  return (
    <>
      {/* ================================================================== */}
      {/* DESKTOP NAVIGATION */}
      {/* ================================================================== */}
      <motion.nav
        className="fixed top-0 left-0 right-0 z-50 bg-black/90 backdrop-blur-md border-b border-white/10"
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="flex items-center justify-between h-20">
            
            {/* Logo - Your Signature */}
            <Link href="/" className="relative w-32 h-12">
              <Image
                src="/BlackTransparent.png"
                alt="Kerry Lee Hartley"
                fill
                className="object-contain"
                priority
              />
            </Link>

            {/* Desktop Menu */}
            <div className="hidden md:flex items-center gap-8">
              <Link 
                href="/"
                className="text-white hover:text-gray-300 transition-colors duration-300 text-sm uppercase tracking-wider"
              >
                Home
              </Link>
              
              <Link 
                href="/journey"
                className="text-white hover:text-gray-300 transition-colors duration-300 text-sm uppercase tracking-wider"
              >
                Journey
              </Link>

              {/* Work Dropdown */}
              <div 
                className="relative"
                onMouseEnter={() => setWorkDropdownOpen(true)}
                onMouseLeave={() => setWorkDropdownOpen(false)}
              >
                <button className="text-white hover:text-gray-300 transition-colors duration-300 text-sm uppercase tracking-wider flex items-center gap-1">
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
                        className="block px-6 py-3 text-white hover:bg-white/10 transition-colors text-sm"
                      >
                        Technology
                      </Link>
                      <Link 
                        href="/funnel/first-time-buyers"
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
                className="text-white hover:text-gray-300 transition-colors duration-300 text-sm uppercase tracking-wider"
              >
                Stories
              </Link>

              <Link 
                href="/impact"
                className="text-white hover:text-gray-300 transition-colors duration-300 text-sm uppercase tracking-wider"
              >
                Impact
              </Link>

              <Link 
                href="/contact"
                className="text-white hover:text-gray-300 transition-colors duration-300 text-sm uppercase tracking-wider"
              >
                Contact
              </Link>
            </div>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
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

      {/* ================================================================== */}
      {/* MOBILE MENU OVERLAY (David Alaba Style) */}
      {/* ================================================================== */}
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
                onClick={() => setMobileMenuOpen(false)}
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

              {/* Menu Items */}
              <div className="flex flex-col items-center space-y-6 text-center">
                <Link 
                  href="/"
                  onClick={() => setMobileMenuOpen(false)}
                  className="text-white text-2xl uppercase tracking-wider hover:text-gray-400 transition-colors"
                >
                  Home
                </Link>
                
                <Link 
                  href="/journey"
                  onClick={() => setMobileMenuOpen(false)}
                  className="text-white text-2xl uppercase tracking-wider hover:text-gray-400 transition-colors"
                >
                  Journey
                </Link>

                <div className="text-white text-xl uppercase tracking-wider opacity-50">Work</div>
                <Link 
                  href="/work/technology"
                  onClick={() => setMobileMenuOpen(false)}
                  className="text-white text-lg pl-8 hover:text-gray-400 transition-colors"
                >
                  → Technology
                </Link>
                <Link 
                  href="/funnel/first-time-buyers"
                  onClick={() => setMobileMenuOpen(false)}
                  className="text-white text-lg pl-8 hover:text-gray-400 transition-colors"
                >
                  → Real Estate
                </Link>

                <Link 
                  href="/blog"
                  onClick={() => setMobileMenuOpen(false)}
                  className="text-white text-2xl uppercase tracking-wider hover:text-gray-400 transition-colors"
                >
                  Stories
                </Link>

                <Link 
                  href="/impact"
                  onClick={() => setMobileMenuOpen(false)}
                  className="text-white text-2xl uppercase tracking-wider hover:text-gray-400 transition-colors"
                >
                  Impact
                </Link>

                <Link 
                  href="/contact"
                  onClick={() => setMobileMenuOpen(false)}
                  className="text-white text-2xl uppercase tracking-wider hover:text-gray-400 transition-colors"
                >
                  Contact
                </Link>
              </div>

              {/* Social Links */}
              <div className="flex gap-6 pt-8">
                <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="text-white hover:text-gray-400 transition-colors">
                  INSTAGRAM
                </a>
                <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="text-white hover:text-gray-400 transition-colors">
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
// 📚 USAGE NOTES
// ============================================================================
/*
 * PURPOSE:
 * Main navigation for homepage and content pages (not funnel pages)
 * 
 * KEY FEATURES:
 * - Fixed header with backdrop blur
 * - Work dropdown menu (Technology, Real Estate)
 * - Full-screen mobile overlay (David Alaba style)
 * - Your signature logo integrated
 * - Smooth animations throughout
 * 
 * HOW TO MODIFY:
 * - Update links: Change href values
 * - Add menu items: Add new Link components
 * - Change dropdown items: Edit Work dropdown section
 * - Adjust colors: Modify bg-black/90, text-white, etc.
 * 
 * IMPORTANT:
 * - Logo file must be at /public/BlackTransparent.png
 * - This is for MAIN SITE only (funnels use different nav)
 * - Mobile menu uses full-screen overlay matching David's site
 */