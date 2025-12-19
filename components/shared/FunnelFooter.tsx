// ============================================================================
// FUNNEL FOOTER - Minimal & Conversion-Focused
// ============================================================================
// What: Footer for real estate funnels and conversion pages
// Why: Minimal distractions, maintain focus on conversion
// How: Essential info only - legal, trust badges, minimal links
// ============================================================================

'use client'

import Image from 'next/image'

export default function FunnelFooter() {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="bg-luxury-black text-luxury-white py-12 border-t border-luxury-gray/10">
      <div className="container-custom">
        
        {/* Trust & Legal Section */}
        <div className="grid md:grid-cols-2 gap-8 mb-8">
          
          {/* Brand & Trust */}
          <div>
            <h3 className="text-xl font-bold mb-3">Kerry Lee Hartley, REALTOR®</h3>
            <p className="text-luxury-gray text-sm leading-relaxed">
              Licensed in Georgia<br />
              Harry Norman, REALTORS®<br />
              Forbes Global Properties Member
            </p>
          </div>

          {/* Legal Disclaimer */}
          <div>
            <h4 className="font-semibold mb-3 text-sm">Legal</h4>
            <p className="text-luxury-gray text-xs leading-relaxed">
              Harry Norman, REALTORS® is a registered trademark used under license. 
              Harry Norman, REALTORS® is an exclusive member of Forbes Global Properties 
              in Atlanta. Forbes® is a registered trademark used under license.
            </p>
            <p className="text-luxury-gray text-xs mt-2">
              © {currentYear} Running Real Estate LLC. All rights reserved.
            </p>
          </div>
        </div>

        {/* Equal Housing Opportunity */}
        <div className="flex flex-col md:flex-row items-center justify-center gap-4 pt-6 border-t border-luxury-gray/10 text-center md:text-left">
          <Image
            src="/images/equal-housing-opportunity-logo-1200w.png"
            alt="Equal Housing Opportunity"
            width={96}
            height={96}
            className="w-20 md:w-24"
          />
          <p className="text-luxury-gray text-xs max-w-md leading-relaxed">
            We are an equal housing opportunity provider. We do not discriminate on the basis 
            of race, color, sex, national origin, religion, disability, or familial status 
            (having children under age 18).
          </p>
        </div>

        {/* Bottom Disclaimer */}
        <div className="pt-6 border-t border-luxury-gray/10 text-center mt-6">
          <p className="text-luxury-gray text-xs">
            This is a lead qualification resource. Not a paid course or service.
          </p>
          <div className="flex gap-4 justify-center mt-3 text-xs">
            <a href="/privacy" className="text-luxury-gray hover:text-luxury-gold transition-colors">
              Privacy Policy
            </a>
            <span className="text-luxury-gray">•</span>
            <a href="/terms" className="text-luxury-gray hover:text-luxury-gold transition-colors">
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
 * Minimal, conversion-focused footer for real estate funnels
 * 
 * STRATEGY:
 * - NO distractions (no social links, no navigation)
 * - Focus stays on conversion (email capture, quiz)
 * - Legal requirements only (equal housing, licensing, etc.)
 * - Trust badges (Forbes, Harry Norman)
 * - Minimal footer = less opportunity to bounce
 * 
 * USED ON:
 * - /funnel/first-time-buyers
 * - /funnel/new-construction
 * - /funnel/relocation-*
 * - All conversion-focused pages
 * 
 * NOT USED ON:
 * - Homepage (use MainFooter.tsx instead)
 * - Blog pages (use MainFooter.tsx)
 * - Portfolio pages (use MainFooter.tsx)
 * 
 * COLORS:
 * Uses your existing funnel color palette:
 * - luxury-black (#000000)
 * - luxury-white (#FFFFFF)
 * - luxury-gold (#D4AF37)
 * - luxury-gray (#6B7280)
 * 
 * HOW TO MODIFY:
 * - Update legal text: Edit disclaimer sections
 * - Change trust badges: Update licensing info
 * - Adjust spacing: Modify py-* and gap-* classes
 * 
 * IMPORTANT:
 * - Keep it MINIMAL - don't add nav links
 * - No social links (distraction from conversion)
 * - Equal Housing logo required by law
 * - Legal disclaimers protect you
 * - Privacy/Terms links required
 * 
 * CONVERSION PRINCIPLE:
 * Every element on a funnel should either:
 * 1. Build trust
 * 2. Overcome objections
 * 3. Move toward conversion
 * 
 * Footer is for trust + legal compliance ONLY.
 */
