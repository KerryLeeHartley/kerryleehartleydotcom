// Video hero with Loom embed and optional transcript
'use client'

import { motion } from 'framer-motion'

interface LoomVideoHeroProps {
  videoUrl: string
  headline: string
  subtext: string
  company: string
}

export default function LoomVideoHero({ videoUrl, headline, subtext, company }: LoomVideoHeroProps) {
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
        </motion.div>

        {/* Loom Video Embed */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="relative w-full max-w-4xl mx-auto"
          style={{ paddingBottom: '56.25%' }} // 16:9 aspect ratio
        >
          <iframe
            src={videoUrl}
            frameBorder="0"
            allowFullScreen
            className="absolute top-0 left-0 w-full h-full rounded-2xl shadow-2xl"
            style={{
              border: '2px solid rgba(255, 255, 255, 0.1)'
            }}
          />
        </motion.div>

        {/* Quick Stats Bar */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.4 }}
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

      </div>
    </section>
  )
}
