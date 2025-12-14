'use client'

import { motion } from 'framer-motion'

export interface JourneyStep {
  number: string;            // Step number e.g., '01'
  title: string;             // Step title
  description: string;       // Step description
  icon: string;              // Emoji or icon string
  color: string;             // Tailwind gradient string e.g., 'from-[#2196F3] to-[#1976D2]'
}

export const steps: JourneyStep[] = [
  { number: '01', title: 'Get Clear', description: 'Understand what you really want', icon: '🎯', color: 'from-[#2196F3] to-[#1976D2]' },
  { number: '02', title: 'Get Confident', description: 'Eliminate confusion and fear', icon: '💪', color: 'from-[#9C27B0] to-[#7B1FA2]' },
  { number: '03', title: 'Get Qualified', description: 'Know your buying power', icon: '✓', color: 'from-[#FF6B9D] to-[#E91E63]' },
  { number: '04', title: 'Get Your Home', description: 'Navigate with a green light', icon: '🏡', color: 'from-[#FFB800] to-[#FF8F00]' }
]

export default function JourneySection() {
  return (
    <section className="relative section bg-white overflow-hidden">
      {/* Floating background shapes */}
      <motion.div
        className="absolute w-96 h-96 bg-gradient-to-r from-blue-400 via-purple-500 to-pink-400 rounded-full opacity-20 top-0 -left-32 blur-3xl animate-float-slow"
        initial={{ scale: 0.8 }}
        animate={{ scale: 1.2, rotate: 360 }}
        transition={{ duration: 20, repeat: Infinity, repeatType: 'mirror' }}
      />
      <motion.div
        className="absolute w-72 h-72 bg-gradient-to-r from-yellow-400 via-orange-500 to-red-400 rounded-full opacity-25 bottom-0 -right-24 blur-3xl animate-float-slow"
        initial={{ scale: 0.7 }}
        animate={{ scale: 1.1, rotate: -360 }}
        transition={{ duration: 18, repeat: Infinity, repeatType: 'mirror' }}
      />

      <div className="container-custom relative z-10">
        {/* Section Header */}
        <motion.div
          className="text-center max-w-3xl mx-auto mb-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <h2 className="heading-xl mb-4 text-luxury-black">
            The Clear Path to Your First Home
          </h2>
          <p className="text-body text-luxury-gray">
            A proven process that takes you from confused to confident
          </p>
        </motion.div>

        {/* Journey Steps */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-10">
          {steps.map((step, index) => (
            <motion.div
              key={step.number}
              className="relative group"
              initial={{ opacity: 0, y: 50, scale: 0.95 }}
              whileInView={{ opacity: 1, y: 0, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: index * 0.15 }}
            >
              <div className="relative h-full p-8 rounded-3xl bg-white border border-luxury-border shadow-sm hover:shadow-xl transition-all duration-500 overflow-hidden">
                {/* Gradient Background on Hover */}
                <div
                  className={`absolute inset-0 bg-gradient-to-br ${step.color} opacity-0 group-hover:opacity-10 rounded-3xl transition-opacity duration-500`}
                />

                {/* Content */}
                <div className="relative z-10 text-center">
                  <motion.div
                    className="text-6xl font-extrabold text-luxury-border mb-4 group-hover:text-luxury-blue transition-colors duration-500"
                    whileHover={{ scale: 1.1 }}
                  >
                    {step.number}
                  </motion.div>

                  <motion.div
                    className="text-5xl mb-4"
                    whileHover={{ rotate: 15, scale: 1.2 }}
                    transition={{ duration: 0.3 }}
                  >
                    {step.icon}
                  </motion.div>

                  <h3 className="text-2xl font-bold mb-3 text-luxury-black">
                    {step.title}
                  </h3>

                  <p className="text-luxury-gray leading-relaxed">
                    {step.description}
                  </p>
                </div>

                {/* Connecting Line (except last item) */}
                {index < steps.length - 1 && (
                  <div className="hidden lg:block absolute top-1/2 -right-4 w-10 h-0.5 bg-gradient-to-r from-luxury-border to-transparent" />
                )}
              </div>
            </motion.div>
          ))}
        </div>

        {/* Bottom CTA */}
        <motion.div
          className="text-center mt-20"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.5 }}
        >
          <p className="text-luxury-gray mb-4">Ready to start your journey?</p>
          <motion.a
            href="#video"
            className="inline-block px-10 py-5 bg-gradient-to-r from-[#2196F3] to-[#1976D2] text-white font-semibold rounded-xl shadow-lg hover:shadow-2xl transform hover:scale-105 transition-all duration-500"
            whileHover={{ scale: 1.05 }}
          >
            Watch the Video
          </motion.a>
        </motion.div>
      </div>
    </section>
  )
}
