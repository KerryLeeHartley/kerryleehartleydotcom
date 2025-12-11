'use client'

import { motion } from 'framer-motion'
import { useEffect, useRef, useState } from 'react'

interface VSLPlayerProps {
  videoUrl: string
  headline?: string
  description?: string
  onVideoView?: () => void
  onVideoComplete?: () => void
}

export default function VSLPlayer({
  videoUrl,
  headline = 'Watch This Free Training',
  description,
  onVideoView,
  onVideoComplete
}: VSLPlayerProps) {
  const [isPlaying, setIsPlaying] = useState(false)
  const videoRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    // Track video view event
    if (isPlaying && onVideoView) {
      onVideoView()
    }
  }, [isPlaying, onVideoView])

  // Extract Loom video ID from URL
  const getLoomEmbedUrl = (url: string) => {
    // Handle both share URLs and embed URLs
    if (url.includes('/embed/')) {
      return url
    }
    if (url.includes('/share/')) {
      const videoId = url.split('/share/')[1]?.split('?')[0]
      return `https://www.loom.com/embed/${videoId}`
    }
    return url
  }

  const embedUrl = getLoomEmbedUrl(videoUrl)

  return (
    <section className="section-padding bg-neutral-light">
      <div className="container-width">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="max-w-5xl mx-auto"
        >
          {/* Section Header */}
          <div className="text-center mb-12">
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="mb-4"
            >
              <span className="label-text text-luxury-gold">Free Training</span>
            </motion.div>
            
            <h2 className="heading-md mb-6">{headline}</h2>
            
            {description && (
              <p className="subheading max-w-2xl mx-auto">
                {description}
              </p>
            )}
          </div>

          {/* Video Player */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.4, duration: 0.6 }}
            ref={videoRef}
            className="video-wrapper"
          >
            <iframe
              src={embedUrl}
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
              className="absolute inset-0 w-full h-full"
              onLoad={() => setIsPlaying(true)}
            ></iframe>
          </motion.div>

          {/* Video Info */}
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.6 }}
            className="mt-8 flex items-center justify-center gap-6 text-sm text-text-gray"
          >
            <div className="flex items-center gap-2">
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                <path d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z" />
              </svg>
              <span>15-20 Minutes</span>
            </div>
            <div className="flex items-center gap-2">
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z" clipRule="evenodd" />
              </svg>
              <span>Watch Anytime</span>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}
