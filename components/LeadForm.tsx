'use client'

import { motion } from 'framer-motion'
import { useState } from 'react'
import { supabase } from '@/lib/supabase'

interface LeadFormProps {
  funnelId: string
  pageId: string
  headline?: string
  subheadline?: string
  ctaText?: string
  onSuccess?: () => void
  accentColor?: 'gold' | 'blue' | 'rose'
}

export default function LeadForm({
  funnelId,
  pageId,
  headline = 'Get Instant Access',
  subheadline = 'Start your free course now. No credit card required.',
  ctaText = 'Enroll Now - It\'s Free',
  onSuccess,
  accentColor = 'gold'
}: LeadFormProps) {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: ''
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const accentColors = {
    gold: 'focus:border-luxury-gold focus:ring-luxury-gold',
    blue: 'focus:border-luxury-blue focus:ring-luxury-blue',
    rose: 'focus:border-luxury-rose focus:ring-luxury-rose'
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    setError(null)

    try {
      // Get UTM parameters from URL
      const urlParams = new URLSearchParams(window.location.search)
      const utmData = {
        utm_source: urlParams.get('utm_source'),
        utm_medium: urlParams.get('utm_medium'),
        utm_campaign: urlParams.get('utm_campaign'),
        utm_content: urlParams.get('utm_content'),
        utm_term: urlParams.get('utm_term')
      }

      // Save lead to Supabase
      const { data, error: dbError } = await supabase
        .from('leads')
        .insert({
          name: formData.name,
          email: formData.email,
          phone: formData.phone || null,
          funnel_id: funnelId,
          page_id: pageId,
          ...utmData,
          metadata: {
            user_agent: navigator.userAgent,
            referrer: document.referrer,
            timestamp: new Date().toISOString()
          }
        })
        .select()
        .single()

      if (dbError) throw dbError

      // Track form submission event
      if (typeof window !== 'undefined' && (window as any).dataLayer) {
        (window as any).dataLayer.push({
          event: 'form_submission',
          form_type: 'lead_capture',
          funnel_id: funnelId,
          page_id: pageId
        })
      }

      // Save event
      await supabase.from('events').insert({
        event_type: 'form_submit',
        funnel_id: funnelId,
        page_id: pageId,
        lead_id: data?.id,
        metadata: {
          form_data: formData,
          ...utmData
        }
      })

      // Success callback
      if (onSuccess) {
        onSuccess()
      }

      // Reset form
      setFormData({ name: '', email: '', phone: '' })
    } catch (err: any) {
      setError(err.message || 'Something went wrong. Please try again.')
      console.error('Error submitting form:', err)
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <section className="section-padding bg-luxury-white">
      <div className="container-width">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="max-w-2xl mx-auto"
        >
          {/* Form Header */}
          <div className="text-center mb-10">
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="mb-4"
            >
              <span className="label-text text-luxury-gold">Limited Time Offer</span>
            </motion.div>
            
            <h2 className="heading-md mb-4">{headline}</h2>
            <p className="subheading">{subheadline}</p>
          </div>

          {/* Form Container */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.4, duration: 0.6 }}
            className="form-container"
          >
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Name Input */}
              <div>
                <label htmlFor="name" className="block text-sm font-semibold mb-2">
                  Full Name *
                </label>
                <input
                  type="text"
                  id="name"
                  required
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className={`input-field ${accentColors[accentColor]}`}
                  placeholder="John Smith"
                />
              </div>

              {/* Email Input */}
              <div>
                <label htmlFor="email" className="block text-sm font-semibold mb-2">
                  Email Address *
                </label>
                <input
                  type="email"
                  id="email"
                  required
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className={`input-field ${accentColors[accentColor]}`}
                  placeholder="john@example.com"
                />
              </div>

              {/* Phone Input (Optional) */}
              <div>
                <label htmlFor="phone" className="block text-sm font-semibold mb-2">
                  Phone Number <span className="text-text-gray text-xs">(Optional)</span>
                </label>
                <input
                  type="tel"
                  id="phone"
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  className={`input-field ${accentColors[accentColor]}`}
                  placeholder="(555) 123-4567"
                />
              </div>

              {/* Error Message */}
              {error && (
                <div className="bg-red-50 border border-red-200 text-red-800 px-4 py-3 rounded-lg text-sm">
                  {error}
                </div>
              )}

              {/* Submit Button */}
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full btn-gold text-lg py-5 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isSubmitting ? 'Processing...' : ctaText}
              </button>

              {/* Privacy Note */}
              <p className="text-xs text-text-gray text-center">
                By enrolling, you agree to receive emails from us. Unsubscribe anytime.
                <br />
                We respect your privacy. View our{' '}
                <a href="/privacy" className="underline hover:text-luxury-black">
                  Privacy Policy
                </a>
                .
              </p>
            </form>
          </motion.div>

          {/* Trust Badges */}
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.6 }}
            className="mt-10 flex items-center justify-center gap-8 text-sm text-text-gray"
          >
            <div className="flex items-center gap-2">
              <svg className="w-5 h-5 text-green-500" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
              </svg>
              <span>100% Free</span>
            </div>
            <div className="flex items-center gap-2">
              <svg className="w-5 h-5 text-green-500" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clipRule="evenodd" />
              </svg>
              <span>Secure & Private</span>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}
