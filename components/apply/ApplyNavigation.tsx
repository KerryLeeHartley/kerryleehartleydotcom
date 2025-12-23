'use client'

import Image from 'next/image'
import { trackCalendlyClick, trackNavClick } from '@/components/analytics/GoogleAnalytics'

export default function ApplyNavigation({ company }: { company: string }) {
  const handleCalendlyClick = () => {
    trackCalendlyClick(company, 'Nav Button')
    trackNavClick('Calendly')
  }

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-black/95 backdrop-blur-sm border-b border-white/10">
      <div className="max-w-7xl mx-auto px-6 lg:px-8 py-4 flex items-center justify-between">
        {/* Static Signature Logo - No Link */}
        <div className="relative w-32 h-12">
          <Image
            src="/BlackTransparent.png"
            alt="Kerry Lee Hartley"
            fill
            className="object-contain brightness-0 invert"
            priority
          />
        </div>

        {/* Book Call Button with tracking */}
        <a
          href="https://calendly.com/thekerryleehartley/chat"
          target="_blank"
          rel="noopener noreferrer"
          onClick={handleCalendlyClick}
          className="px-6 py-3 bg-white text-black font-semibold rounded-full hover:bg-gray-200 transition-colors text-sm md:text-base"
        >
          Book a Call
        </a>
      </div>
    </nav>
  )
}
