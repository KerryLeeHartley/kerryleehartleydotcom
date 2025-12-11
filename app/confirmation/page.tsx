'use client'

import { motion } from 'framer-motion'
import { useEffect } from 'react'

export default function ConfirmationPage() {
  useEffect(() => {
    // Track conversion in GTM
    if (typeof window !== 'undefined' && (window as any).dataLayer) {
      (window as any).dataLayer.push({
        event: 'conversion',
        conversion_type: 'lead_capture'
      })
    }
  }, [])

  return (
    <main className="min-h-screen bg-luxury-neutral flex items-center justify-center p-4">
      <div className="max-w-2xl mx-auto text-center">
        {/* Success Icon */}
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ duration: 0.5, type: 'spring' }}
          className="mb-8"
        >
          <div className="w-24 h-24 bg-luxury-gold rounded-full flex items-center justify-center mx-auto">
            <svg className="w-12 h-12 text-luxury-black" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
            </svg>
          </div>
        </motion.div>

        {/* Headline */}
        <motion.h1
          className="heading-xl mb-6"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          Check Your Email!
        </motion.h1>

        {/* Body Text */}
        <motion.div
          className="text-body-large mb-12 space-y-4"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          <p>
            We've sent you an email with your course access link. It should arrive within the next few minutes.
          </p>
          <p className="text-luxury-gray text-base">
            <strong>Don't see it?</strong> Check your spam folder and add us to your contacts.
          </p>
        </motion.div>

        {/* Course Access Card */}
        <motion.div
          className="card mb-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.6 }}
        >
          <h2 className="text-2xl font-bold mb-4">Or Access Your Course Now</h2>
          <p className="text-luxury-gray mb-6">
            Don't want to wait? Click below to start learning immediately.
          </p>
          <a
            href="https://course.kerryleehartly.com/first-time-buyers"
            className="btn-secondary inline-block"
            onClick={() => {
              // Track course click in GTM
              if (typeof window !== 'undefined' && (window as any).dataLayer) {
                (window as any).dataLayer.push({
                  event: 'course_click',
                  course_type: 'first-time-buyers'
                })
              }
            }}
          >
            Access Course Now →
          </a>
        </motion.div>

        {/* What's Next */}
        <motion.div
          className="card-dark text-left"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.8 }}
        >
          <h3 className="text-xl font-bold mb-4">What Happens Next?</h3>
          <ul className="space-y-3">
            <li className="flex items-start gap-3">
              <span className="text-luxury-gold">✓</span>
              <span>Complete the free course at your own pace (about 30 minutes)</span>
            </li>
            <li className="flex items-start gap-3">
              <span className="text-luxury-gold">✓</span>
              <span>Download helpful checklists and resources</span>
            </li>
            <li className="flex items-start gap-3">
              <span className="text-luxury-gold">✓</span>
              <span>Optionally schedule a free consultation call</span>
            </li>
            <li className="flex items-start gap-3">
              <span className="text-luxury-gold">✓</span>
              <span>Start your home buying journey with confidence!</span>
            </li>
          </ul>
        </motion.div>

        {/* Social Proof */}
        <motion.p
          className="text-luxury-gray text-sm mt-8"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 1 }}
        >
          Join 500+ Atlanta area home buyers who started with this course
        </motion.p>
      </div>
    </main>
  )
}
