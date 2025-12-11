'use client'

import { motion } from 'framer-motion'

interface ConfirmationProps {
  headline?: string
  message?: string
  courseUrl: string
  courseName?: string
}

export default function Confirmation({
  headline = 'You\'re In! Check Your Email',
  message = 'We\'ve sent you an email with your course access details. Click the link below to get started immediately.',
  courseUrl,
  courseName = 'Start Your Course'
}: ConfirmationProps) {
  return (
    <section className="min-h-screen flex items-center justify-center bg-neutral-light section-padding">
      <div className="container-width">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, ease: 'easeOut' }}
          className="max-w-3xl mx-auto text-center"
        >
          {/* Success Icon */}
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.2, type: 'spring', stiffness: 200 }}
            className="mb-8 inline-block"
          >
            <div className="w-24 h-24 bg-green-100 rounded-full flex items-center justify-center">
              <svg
                className="w-12 h-12 text-green-600"
                fill="none"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path d="M5 13l4 4L19 7"></path>
              </svg>
            </div>
          </motion.div>

          {/* Headline */}
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.6 }}
            className="heading-lg mb-6"
          >
            {headline}
          </motion.h1>

          {/* Message */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6, duration: 0.6 }}
            className="subheading mb-10 max-w-2xl mx-auto"
          >
            {message}
          </motion.p>

          {/* CTA Button to Course */}
          <motion.a
            href={courseUrl}
            target="_blank"
            rel="noopener noreferrer"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8, duration: 0.6 }}
            className="inline-block btn-gold text-lg px-12 py-5 shadow-2xl"
            onClick={() => {
              // Track course click event
              if (typeof window !== 'undefined' && (window as any).dataLayer) {
                (window as any).dataLayer.push({
                  event: 'course_click',
                  course_url: courseUrl
                })
              }
            }}
          >
            {courseName} →
          </motion.a>

          {/* What's Next Section */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1, duration: 0.6 }}
            className="mt-16 grid md:grid-cols-3 gap-8 text-left"
          >
            <div className="card">
              <div className="w-12 h-12 bg-luxury-gold bg-opacity-10 rounded-lg flex items-center justify-center mb-4">
                <span className="text-2xl font-bold text-luxury-gold">1</span>
              </div>
              <h3 className="text-xl font-bold mb-2">Check Your Email</h3>
              <p className="text-text-gray">
                We've sent you a welcome email with all the details you need to get started.
              </p>
            </div>

            <div className="card">
              <div className="w-12 h-12 bg-luxury-blue bg-opacity-10 rounded-lg flex items-center justify-center mb-4">
                <span className="text-2xl font-bold text-luxury-blue">2</span>
              </div>
              <h3 className="text-xl font-bold mb-2">Access Your Course</h3>
              <p className="text-text-gray">
                Click the button above to instantly access your free course and start learning.
              </p>
            </div>

            <div className="card">
              <div className="w-12 h-12 bg-luxury-rose bg-opacity-10 rounded-lg flex items-center justify-center mb-4">
                <span className="text-2xl font-bold text-luxury-rose">3</span>
              </div>
              <h3 className="text-xl font-bold mb-2">Take Action</h3>
              <p className="text-text-gray">
                Complete the course at your own pace and reach out when you're ready to move forward.
              </p>
            </div>
          </motion.div>

          {/* Additional Support */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.2, duration: 0.6 }}
            className="mt-12 p-6 bg-luxury-white rounded-xl border border-border-gray"
          >
            <p className="text-text-gray">
              <strong className="text-luxury-black">Need help?</strong> Email us at{' '}
              <a href="mailto:support@kerryleehartly.com" className="text-luxury-gold hover:underline">
                support@kerryleehartly.com
              </a>{' '}
              and we'll get back to you within 24 hours.
            </p>
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}
