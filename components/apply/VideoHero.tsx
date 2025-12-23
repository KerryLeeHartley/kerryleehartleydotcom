// Video hero with prominent job posting CTA
// Supports YouTube, Loom, and other video platforms
'use client'

import { motion } from 'framer-motion'
import { trackNavClick } from '@/components/analytics/GoogleAnalytics'
import VideoPlayer from '@/components/apply/VideoPlayer'

interface VideoHeroProps {
  videoUrl: string
  headline: string
  subtext: string
  company: string
  jobPostingUrl?: string
  additionalRoles?: Array<{
    title: string
    url: string
    isPrimary?: boolean
  }>
}

export default function VideoHero({ videoUrl, headline, subtext, company, jobPostingUrl, additionalRoles }: VideoHeroProps) {
  return (
    <section className="relative py-20 md:py-32 bg-black">
      <div className="max-w-6xl mx-auto px-6">
        
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-12"
        >
          <h1 className="text-4xl md:text-6xl font-bold text-white mb-6 tracking-tight">
            {headline}
          </h1>
          <p className="text-xl text-gray-400 max-w-3xl mx-auto leading-relaxed">
            {subtext}
          </p>
          
          {/* Small Job Posting Link (above video) */}
          {jobPostingUrl && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.3 }}
              className="mt-6"
            >
              <a
                href={jobPostingUrl}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => trackNavClick('Job Posting Link - Top')}
                className="inline-flex items-center gap-2 text-white/70 hover:text-white transition-colors text-sm"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                </svg>
                View Official Job Posting
              </a>
            </motion.div>
          )}
        </motion.div>

        {/* Video */}
        <VideoPlayer videoUrl={videoUrl} company={company} />

        {/* PROMINENT JOB POSTING CTA (after video) */}
        {jobPostingUrl && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.5 }}
            className="mt-12 text-center"
          >
            <a
              href={jobPostingUrl}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => trackNavClick('Job Posting Link - CTA')}
              className="inline-flex items-center gap-3 px-8 py-4 bg-white text-black rounded-full font-semibold text-lg hover:bg-gray-200 transition-all shadow-xl hover:scale-105"
            >
              View Official {company} Job Posting
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
              </svg>
            </a>
            <p className="text-gray-500 text-sm mt-4">
              Compare my background with the official requirements
            </p>
          </motion.div>
        )}

        {/* Quick Stats Bar */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="mt-12 flex flex-wrap justify-center gap-8 text-center"
        >
          <div>
            <div className="text-3xl font-bold text-white">5+</div>
            <div className="text-sm text-gray-500 uppercase tracking-wider">Years Experience</div>
          </div>
          <div className="w-px bg-white/10" />
          <div>
            <div className="text-3xl font-bold text-white">$10M+</div>
            <div className="text-sm text-gray-500 uppercase tracking-wider">Revenue Impact</div>
          </div>
          <div className="w-px bg-white/10" />
          <div>
            <div className="text-3xl font-bold text-white">3</div>
            <div className="text-sm text-gray-500 uppercase tracking-wider">Companies Scaled</div>
          </div>
        </motion.div>

        {/* Additional Roles Section (if provided) */}
        {additionalRoles && additionalRoles.length > 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.7 }}
            className="mt-16 pt-12 border-t border-white/10"
          >
            <h3 className="text-2xl font-bold text-white text-center mb-6">
              Other Roles I'm Interested In
            </h3>
            <div className="flex flex-wrap justify-center gap-4">
              {additionalRoles.map((role, index) => (
                <a
                  key={index}
                  href={role.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => trackNavClick(`Role: ${role.title}`)}
                  className={`px-6 py-3 rounded-full border transition-all flex items-center gap-2 ${
                    role.isPrimary
                      ? 'bg-white text-black border-white font-semibold'
                      : 'border-white/30 text-white hover:bg-white/10'
                  }`}
                >
                  {role.title}
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                  </svg>
                </a>
              ))}
            </div>
            <p className="text-center text-gray-500 text-sm mt-4">
              Click to view full job descriptions on {company}'s careers page
            </p>
          </motion.div>
        )}

      </div>
    </section>
  )
}