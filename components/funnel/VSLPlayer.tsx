'use client'

import { motion } from 'framer-motion'

export interface VSLPlayerProps {
  videoUrl: string;           // Loom / Vimeo / YouTube embed URL
  headline?: string;          // Optional headline above video
  description?: string;       // Optional description or subheadline
}

export default function VSLPlayer({ videoUrl, headline, description }: VSLPlayerProps) {
  return (
    <section className="relative flex flex-col items-center justify-center py-20 px-4 sm:px-6 lg:px-8 overflow-hidden">
      {/* Optional headline above video */}
      {headline && (
        <motion.h2
          className="text-4xl md:text-5xl font-extrabold text-white text-center mb-12 drop-shadow-lg"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          {headline}
        </motion.h2>
      )}

      {/* Background Glow Orbs */}
      <div className="absolute inset-0 opacity-30 pointer-events-none">
        <motion.div
          className="absolute top-10 left-10 w-72 h-72 bg-[#FF6B9D] rounded-full blur-3xl"
          animate={{ x: [0, 30, 0], y: [0, -20, 0] }}
          transition={{ duration: 20, repeat: Infinity, repeatType: 'loop' }}
        />
        <motion.div
          className="absolute bottom-10 right-10 w-96 h-96 bg-[#2196F3] rounded-full blur-3xl"
          animate={{ x: [0, -30, 0], y: [0, 20, 0] }}
          transition={{ duration: 25, repeat: Infinity, repeatType: 'loop' }}
        />
      </div>

      {/* Video Container */}
      <motion.div
        className="relative w-full max-w-4xl rounded-3xl overflow-hidden shadow-2xl border-4 border-gradient-to-r from-yellow-400 via-pink-500 to-blue-500 p-1"
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.8 }}
      >
        <iframe
          src={videoUrl}
          className="w-full aspect-video rounded-2xl"
          frameBorder="0"
          allow="autoplay; fullscreen"
          allowFullScreen
        ></iframe>

        {/* Play Button Overlay */}
        <motion.div
          className="absolute inset-0 flex items-center justify-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 0.5 }}
        >
          <motion.button
            whileHover={{ scale: 1.1, boxShadow: '0 0 20px #D4AF37' }}
            className="w-20 h-20 rounded-full bg-gradient-to-r from-yellow-500 via-pink-500 to-blue-500 flex items-center justify-center shadow-lg text-black text-3xl"
          >
            ▶
          </motion.button>
        </motion.div>
      </motion.div>

      {/* Trust/CTA Bar Below Video */}
      <motion.div
        className="mt-12 flex flex-wrap justify-center gap-6"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6, delay: 0.8 }}
      >
        <div className="flex items-center gap-2 text-white font-medium">
          <span className="text-luxury-gold">★</span> Premium Quality Video
        </div>
        <div className="flex items-center gap-2 text-white font-medium">
          <span className="text-luxury-gold">✔</span> 100% Free Course
        </div>
        <div className="flex items-center gap-2 text-white font-medium">
          <span className="text-luxury-gold">⚡</span> Instant Access
        </div>
      </motion.div>
    </section>
  )
}
