// Interactive resume timeline
'use client'

import { motion } from 'framer-motion'
import { useState } from 'react'

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
}

export default function InteractiveResume({ experience, skills, keyWins }: InteractiveResumeProps) {
  const [expandedIndex, setExpandedIndex] = useState<number | null>(0)

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

        {/* Key Wins Grid */}
        <div className="grid md:grid-cols-4 gap-6 mb-20">
          {keyWins.map((win, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="bg-zinc-900 border border-white/10 rounded-xl p-6 text-center hover:border-white/30 transition-all"
            >
              <div className="text-3xl font-bold text-white mb-2">{win.metric}</div>
              <div className="text-sm text-gray-400 leading-relaxed">{win.description}</div>
            </motion.div>
          ))}
        </div>

        {/* Experience Timeline */}
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
                onClick={() => setExpandedIndex(expandedIndex === index ? null : index)}
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

        {/* Skills Grid */}
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
                className="px-4 py-2 bg-white/5 border border-white/10 rounded-full text-sm text-gray-300 hover:bg-white/10 hover:border-white/20 transition-all"
              >
                {skill}
              </motion.span>
            ))}
          </div>
        </motion.div>

      </div>
    </section>
  )
}
