'use client'

import { motion } from 'framer-motion'
import { useEffect, useState } from 'react'

interface VSLPlayerProps {
  videoUrl: string // Loom embed URL
  headline?: string
  onVideoView?: () => void
}

export default function VSLPlayer({ videoUrl, headline, onVideoView }: VSLPlayerProps) {
  const [hasViewed, setHasViewed] = useState(false)

  useEffect(() => {
    // Track video view once
    if (!hasViewed) {
      setHasViewed(true)
      onVideoView?.()
      
      // Send custom event to GTM
      if (typeof window !== 'undefined' && (window as any).dataLayer) {
        (window as any).dataLayer.push({
          event: 'video_view',
          video_url: videoUrl
        })
      }
    }
  }, [hasViewed, videoUrl, onVideoView])

  return (
    <section className="section bg-luxury-black">
      <div className="container-custom">
        <div className="max-w-5xl mx-auto">
          {/* Optional Headline */}
          {headline && (
            <motion.h2
              className="heading-xl text-center mb-12 text-luxury-white"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              {headline}
            </motion.h2>
          )}

          {/* Video Player with Premium Frame */}
          <motion.div
            className="relative"
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            {/* Glow Effect */}
            <div className="absolute -inset-1 bg-gradient-to-r from-[#2196F3] via-[#9C27B0] to-[#FF6B9D] rounded-xl blur-lg opacity-50 animate-pulse" />
            
            {/* Video Container */}
            <div className="relative video-container bg-luxury-black rounded-xl overflow-hidden shadow-2xl">
              <iframe
                src={videoUrl}
                frameBorder="0"
                allowFullScreen
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                title="Video Sales Letter"
              />
            </div>
          </motion.div>

          {/* Video Caption */}
          <motion.p
            className="text-center text-luxury-gray mt-6 text-sm"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            ⏱️ Watch this short video to learn how we can help you
          </motion.p>
        </div>
      </div>
    </section>
  )
}
