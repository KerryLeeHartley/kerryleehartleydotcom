'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { supabase } from '../../lib/supabase'

export interface LeadFormProps {
  funnelId: string              // Required: identifies the funnel
  showPhone?: boolean           // Optional: show/hide phone input
  headline?: string             // Optional: heading text
  subheadline?: string          // Optional: subheading text
  ctaText?: string              // Optional: button text
}

interface FormState {
  name: string
  email: string
  phone?: string
  consent: boolean
}

export default function LeadForm({
  funnelId = 'first-time-buyers',
  showPhone = true,
  headline = 'Get Instant Access',
  subheadline = 'Enter your details below to receive your free first-time homebuyer resource.',
  ctaText = 'Get Access'
}: LeadFormProps) {
  const [form, setForm] = useState<FormState>({
    name: '',
    email: '',
    phone: '',
    consent: false,
  })
  const [submitting, setSubmitting] = useState(false)
  const [submitted, setSubmitted] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target
    setForm(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError(null)
    if (!form.name || !form.email) {
      setError('Name and Email are required.')
      return
    }
    if (!form.consent) {
      setError('Please accept consent to proceed.')
      return
    }
    setSubmitting(true)
    try {
      const { error } = await supabase.from('leads').insert([
        {
          name: form.name,
          email: form.email,
          phone: form.phone,
          funnel_id: funnelId,
          created_at: new Date(),
        },
      ])
      if (error) throw error
      setSubmitted(true)
    } catch (err: any) {
      setError(err.message || 'Something went wrong.')
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <section className="relative bg-luxury-black text-luxury-white py-24 px-6 md:px-12 overflow-hidden">
      {/* Background Glow */}
      <div className="absolute inset-0">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-luxury-gold rounded-full blur-3xl opacity-20 animate-pulse" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-luxury-rose rounded-full blur-3xl opacity-20 animate-pulse" />
        <div className="absolute top-1/2 left-1/2 w-96 h-96 bg-luxury-blue rounded-full blur-3xl opacity-20 animate-pulse" />
      </div>

      <motion.div
        className="relative max-w-3xl mx-auto bg-black/70 backdrop-blur-lg p-12 rounded-3xl shadow-2xl border border-white/10"
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        <h2 className="text-4xl font-extrabold mb-6 text-center drop-shadow-lg">{headline}</h2>
        <p className="text-gray-300 text-center mb-8">{subheadline}</p>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="flex flex-col md:flex-row gap-4">
            <motion.input
              type="text"
              name="name"
              value={form.name}
              onChange={handleChange}
              placeholder="Full Name"
              className="flex-1 px-6 py-4 rounded-xl border border-white/20 bg-black/50 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-luxury-gold focus:border-transparent transition"
              whileFocus={{ scale: 1.02 }}
            />
            <motion.input
              type="email"
              name="email"
              value={form.email}
              onChange={handleChange}
              placeholder="Email Address"
              className="flex-1 px-6 py-4 rounded-xl border border-white/20 bg-black/50 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-luxury-blue focus:border-transparent transition"
              whileFocus={{ scale: 1.02 }}
            />
          </div>

          {showPhone && (
            <motion.input
              type="tel"
              name="phone"
              value={form.phone}
              onChange={handleChange}
              placeholder="Phone (optional)"
              className="w-full px-6 py-4 rounded-xl border border-white/20 bg-black/50 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-luxury-rose focus:border-transparent transition"
              whileFocus={{ scale: 1.02 }}
            />
          )}

          <motion.label
            className="flex items-center gap-4 cursor-pointer"
            whileHover={{ scale: 1.02 }}
          >
            <input
              type="checkbox"
              name="consent"
              checked={form.consent}
              onChange={handleChange}
              className="w-5 h-5 rounded border-white/20 bg-black/50 focus:ring-2 focus:ring-luxury-gold transition"
            />
            <span className="text-gray-300 text-sm">
              I agree to receive communications from Kerry Lee Hartley.
            </span>
          </motion.label>

          {error && (
            <motion.p className="text-red-500 text-sm font-medium" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
              {error}
            </motion.p>
          )}

          <motion.button
            type="submit"
            disabled={submitting || submitted}
            className="w-full bg-gradient-to-r from-luxury-gold via-luxury-rose to-luxury-blue text-black font-bold py-4 px-6 rounded-full shadow-xl hover:shadow-2xl hover:scale-105 transition-all"
            whileHover={{ scale: 1.03 }}
          >
            {submitting ? 'Submitting...' : submitted ? 'Submitted ✔' : ctaText}
          </motion.button>
        </form>

        {/* Stats / Social Proof */}
        <motion.div
          className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-8 text-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.4 }}
        >
          <div className="p-6 bg-black/50 rounded-2xl border border-white/10 shadow-lg hover:scale-105 transition transform">
            <p className="text-3xl font-extrabold text-luxury-gold">1,200+</p>
            <p className="text-gray-300 mt-2">Happy Homeowners</p>
          </div>
          <div className="p-6 bg-black/50 rounded-2xl border border-white/10 shadow-lg hover:scale-105 transition transform">
            <p className="text-3xl font-extrabold text-luxury-blue">95%</p>
            <p className="text-gray-300 mt-2">Course Completion</p>
          </div>
          <div className="p-6 bg-black/50 rounded-2xl border border-white/10 shadow-lg hover:scale-105 transition transform">
            <p className="text-3xl font-extrabold text-luxury-rose">500+</p>
            <p className="text-gray-300 mt-2">Instant Signups</p>
          </div>
        </motion.div>
      </motion.div>
    </section>
  )
}
