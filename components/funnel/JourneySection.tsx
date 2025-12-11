'use client'

import { motion } from 'framer-motion'

const steps = [
  {
    number: '01',
    title: 'Get Clear',
    description: 'Understand what you really want',
    icon: '🎯',
    color: 'from-[#2196F3] to-[#1976D2]'
  },
  {
    number: '02',
    title: 'Get Confident',
    description: 'Eliminate confusion and fear',
    icon: '💪',
    color: 'from-[#9C27B0] to-[#7B1FA2]'
  },
  {
    number: '03',
    title: 'Get Qualified',
    description: 'Know your buying power',
    icon: '✓',
    color: 'from-[#FF6B9D] to-[#E91E63]'
  },
  {
    number: '04',
    title: 'Get Your Home',
    description: 'Navigate with a green light',
    icon: '🏡',
    color: 'from-[#FFB800] to-[#FF8F00]'
  }
]

export default function JourneySection() {
  return (
    <section className="section bg-white">
      <div className="container-custom">
        {/* Section Header */}
        <motion.div
          className="text-center max-w-3xl mx-auto mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="heading-xl mb-4 text-luxury-black">
            The Clear Path to Your First Home
          </h2>
          <p className="text-body text-luxury-gray">
            A proven process that takes you from confused to confident
          </p>
        </motion.div>

        {/* Journey Steps */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {steps.map((step, index) => (
            <motion.div
              key={step.number}
              className="relative group"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
            >
              {/* Card */}
              <div className="relative h-full p-8 rounded-2xl bg-white border border-luxury-border hover:border-luxury-blue transition-all duration-300 hover:shadow-xl">
                {/* Gradient Background on Hover */}
                <div className={`absolute inset-0 bg-gradient-to-br ${step.color} opacity-0 group-hover:opacity-5 rounded-2xl transition-opacity duration-300`} />
                
                {/* Content */}
                <div className="relative z-10">
                  {/* Number */}
                  <div className="text-6xl font-extra-bold text-luxury-border mb-4 group-hover:text-luxury-blue transition-colors duration-300">
                    {step.number}
                  </div>

                  {/* Icon */}
                  <div className="text-5xl mb-4 transform group-hover:scale-110 transition-transform duration-300">
                    {step.icon}
                  </div>

                  {/* Title */}
                  <h3 className="text-2xl font-bold mb-3 text-luxury-black">
                    {step.title}
                  </h3>

                  {/* Description */}
                  <p className="text-luxury-gray leading-relaxed">
                    {step.description}
                  </p>
                </div>

                {/* Connecting Line (except last item) */}
                {index < steps.length - 1 && (
                  <div className="hidden lg:block absolute top-1/2 -right-4 w-8 h-0.5 bg-gradient-to-r from-luxury-border to-transparent" />
                )}
              </div>
            </motion.div>
          ))}
        </div>

        {/* Bottom CTA */}
        <motion.div
          className="text-center mt-16"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          <p className="text-luxury-gray mb-4">
            Ready to start your journey?
          </p>
          <a
            href="#video"
            className="inline-block px-8 py-4 bg-gradient-to-r from-[#2196F3] to-[#1976D2] text-white font-semibold rounded-lg hover:shadow-lg transform hover:scale-105 transition-all duration-300"
          >
            Watch the Video
          </a>
        </motion.div>
      </div>
    </section>
  )
}
