'use client'

import { useState, FormEvent } from 'react'
import { motion } from 'framer-motion'
import { supabase } from '@/lib/supabase'

interface LeadFormProps {
  funnelId: string
  headline?: string
  subheadline?: string
  ctaText?: string
  showPhone?: boolean
  onSuccess?: () => void
}

export default function LeadForm({
  funnelId,
  headline = "Get Your Free Course",
  subheadline = "Enter your details below to get instant access",
  ctaText = "Start Learning Now",
  showPhone = false,
  onSuccess
}: LeadFormProps) {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: ''
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [error, setError] = useState('')

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    setError('')

    try {
      // Get UTM parameters from URL
      const urlParams = new URLSearchParams(window.location.search)
      const utmData = {
        utm_source: urlParams.get('utm_source') || undefined,
        utm_medium: urlParams.get('utm_medium') || undefined,
        utm_campaign: urlParams.get('utm_campaign') || undefined,
        utm_content: urlParams.get('utm_content') || undefined,
        utm_term: urlParams.get('utm_term') || undefined,
      }

      // Save lead to Supabase
      const { error: dbError } = await supabase
        .from('leads')
        .insert([{
          name: formData.name,
          email: formData.email,
          phone: formData.phone || null,
          funnel_id: funnelId,
          ...utmData,
          status: 'new',
          metadata: {
            user_agent: navigator.userAgent,
            referrer: document.referrer,
            timestamp: new Date().toISOString()
          }
        }])

      if (dbError) throw dbError

      // Track form submission in GTM
      if (typeof window !== 'undefined' && (window as any).dataLayer) {
        (window as any).dataLayer.push({
          event: 'form_submit',
          form_name: 'lead_capture',
          funnel_id: funnelId
        })
      }

      // Success - redirect or callback
      if (onSuccess) {
        onSuccess()
      } else {
        window.location.href = '/confirmation'
      }
    } catch (err: any) {
      console.error('Error submitting form:', err)
      setError('Something went wrong. Please try again.')
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <section className="section bg-luxury-white">
      <div className="container-custom">
        <div className="max-w-2xl mx-auto">
          {/* Headline */}
          <motion.div
            className="text-center mb-12"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="heading-xl mb-4">{headline}</h2>
            <p className="text-body">{subheadline}</p>
          </motion.div>

          {/* Form */}
          <motion.div
            className="card"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Name Field */}
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
                  className="input-field"
                  placeholder="John Doe"
                />
              </div>

              {/* Email Field */}
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
                  className="input-field"
                  placeholder="john@example.com"
                />
              </div>

              {/* Phone Field (Optional) */}
              {showPhone && (
                <div>
                  <label htmlFor="phone" className="block text-sm font-semibold mb-2">
                    Phone Number (Optional)
                  </label>
                  <input
                    type="tel"
                    id="phone"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    className="input-field"
                    placeholder="(555) 123-4567"
                  />
                </div>
              )}

              {/* Error Message */}
              {error && (
                <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg text-sm">
                  {error}
                </div>
              )}

              {/* Submit Button */}
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full btn-primary text-lg disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isSubmitting ? 'Submitting...' : ctaText}
              </button>

              {/* Privacy Note */}
              <p className="text-xs text-luxury-gray text-center">
                We respect your privacy. Your information will never be shared.
              </p>
            </form>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
