// Interactive resume timeline with event tracking
'use client'

import { motion } from 'framer-motion'
import { useState } from 'react'

// Track resume interactions
const trackResumeInteraction = (action: string, label: string) => {
  if (typeof window !== 'undefined' && (window as any).gtag) {
    ;(window as any).gtag('event', action, {
      event_category: 'Resume',
      event_label: label,
    })
  }
}

// Track navigation clicks (for role links)
const trackNavClick = (label: string) => {
  if (typeof window !== 'undefined' && (window as any).gtag) {
    ;(window as any).gtag('event', 'nav_click', {
      event_category: 'Navigation',
      event_label: label,
    })
  }
}

interface ExperienceItem {
  title: string
  company: string
  period: string
  highlights: string[]
}

interface InteractiveResumeProps {
  experience: ExperienceItem[]
  skills: string[]
  keyWins: Array<{ metric: string; description: string }>
  additionalRoles?: Array<{
    title: string
    url: string
    isPrimary?: boolean
  }>
  company?: string
}

export default function InteractiveResume({ experience, skills, keyWins, additionalRoles, company }: InteractiveResumeProps) {
  const [expandedIndex, setExpandedIndex] = useState<number | null>(0)

  const handleAccordionClick = (index: number, company: string) => {
    const isExpanding = expandedIndex !== index
    setExpandedIndex(isExpanding ? index : null)
    
    if (isExpanding) {
      trackResumeInteraction('accordion_expand', company)  // Now shows "Camunda", "Pinterest", etc.
    }
  }

  const handleKeyWinClick = (metric: string) => {
    trackResumeInteraction('key_win_click', metric)
  }

  const handleSkillClick = (skill: string) => {
    trackResumeInteraction('skill_click', skill)
  }

  return (
    <section className="py-20 bg-gradient-to-b from-black via-zinc-950 to-black">
      <div className="max-w-6xl mx-auto px-6">
        
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
            Track Record of Impact
          </h2>
          <p className="text-gray-400 text-lg">
            Proven results across high-growth SaaS companies
          </p>
        </motion.div>

        {/* Key Wins Grid with tracking */}
        <div className="grid md:grid-cols-4 gap-6 mb-20">
          {keyWins.map((win, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              onClick={() => handleKeyWinClick(win.metric)}
              className="bg-zinc-900 border border-white/10 rounded-xl p-6 text-center hover:border-white/30 transition-all cursor-pointer"
            >
              <div className="text-3xl font-bold text-white mb-2">{win.metric}</div>
              <div className="text-sm text-gray-400 leading-relaxed">{win.description}</div>
            </motion.div>
          ))}
        </div>

        {/* Experience Timeline with tracking */}
        <div className="space-y-4 mb-16">
          {experience.map((exp, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="bg-zinc-900 border border-white/10 rounded-xl overflow-hidden hover:border-white/30 transition-all"
            >
              {/* Header - Always visible */}
              <button
                onClick={() => handleAccordionClick(index, exp.company)}
                className="w-full p-6 text-left flex items-center justify-between hover:bg-white/5 transition-colors"
              >
                <div className="flex-1">
                  <h3 className="text-xl font-bold text-white mb-1">{exp.title}</h3>
                  <div className="flex items-center gap-3 text-gray-400">
                    <span className="font-semibold">{exp.company}</span>
                    <span className="text-white/20">•</span>
                    <span className="text-sm">{exp.period}</span>
                  </div>
                </div>
                <motion.svg
                  animate={{ rotate: expandedIndex === index ? 180 : 0 }}
                  transition={{ duration: 0.3 }}
                  className="w-6 h-6 text-gray-400"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </motion.svg>
              </button>

              {/* Expandable Content */}
              <motion.div
                initial={false}
                animate={{
                  height: expandedIndex === index ? 'auto' : 0,
                  opacity: expandedIndex === index ? 1 : 0
                }}
                transition={{ duration: 0.3 }}
                className="overflow-hidden"
              >
                <div className="px-6 pb-6 space-y-3">
                  {exp.highlights.map((highlight, hIndex) => (
                    <div key={hIndex} className="flex items-start gap-3">
                      <span className="text-white mt-1.5">→</span>
                      <span className="text-gray-300 leading-relaxed">{highlight}</span>
                    </div>
                  ))}
                </div>
              </motion.div>
            </motion.div>
          ))}
        </div>

        {/* Skills Grid with tracking */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="text-center"
        >
          <h3 className="text-2xl font-bold text-white mb-6">Core Competencies</h3>
          <div className="flex flex-wrap justify-center gap-3">
            {skills.map((skill, index) => (
              <motion.span
                key={index}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.05 }}
                onClick={() => handleSkillClick(skill)}
                className="px-4 py-2 bg-white/5 border border-white/10 rounded-full text-sm text-gray-300 hover:bg-white/10 hover:border-white/20 transition-all cursor-pointer"
              >
                {skill}
              </motion.span>
            ))}
          </div>
        </motion.div>

        {/* Open to Similar Roles - NEW SECTION */}
        {additionalRoles && additionalRoles.length > 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="mt-16 pt-12 border-t border-white/10"
          >
            {/* Smart heading based on number of roles */}
            <h3 className="text-2xl font-bold text-white text-center mb-4">
              {additionalRoles.length > 1 ? 'Other Roles I\'m Interested In' : 'Primary Role'}
            </h3>
            
            <div className="flex flex-wrap justify-center gap-4 mb-4">
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
            
            {/* Smart subtext based on number of roles */}
            <p className="text-center text-gray-400 text-base leading-relaxed max-w-2xl mx-auto">
              {additionalRoles.length > 1 
                ? `Click to view full job descriptions on ${company}'s careers page`
                : `Also open to similar roles in Sales Operations, Revenue Operations, and Go-To-Market Strategy`
              }
            </p>
          </motion.div>
        )}

      </div>
    </section>
  )
}