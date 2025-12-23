'use client'

import { useEffect, useRef, useState } from 'react'
import { motion } from 'framer-motion'

interface VideoPlayerProps {
  videoUrl: string
  company: string
}

// Track video events
const trackVideoEvent = (action: string, company: string, additionalData?: any) => {
  if (typeof window !== 'undefined' && (window as any).gtag) {
    ;(window as any).gtag('event', action, {
      event_category: 'Video',
      event_label: `${company} VSL`,
      ...additionalData
    })
  }
}

export default function VideoPlayer({ videoUrl, company }: VideoPlayerProps) {
  const [embedUrl, setEmbedUrl] = useState<string>('')
  const [player, setPlayer] = useState<any>(null)
  const playerRef = useRef<any>(null)
  const hasTrackedImpression = useRef(false)
  const hasTrackedPlay = useRef(false)
  const progressTracked = useRef<Set<number>>(new Set())
  
  // Use company name for stable ID (no random, fixes hydration)
  const playerId = `youtube-player-${company.toLowerCase().replace(/\s+/g, '-')}`

  // Detect video type
  const isYouTube = videoUrl.includes('youtube.com') || videoUrl.includes('youtu.be')
  const isLoom = videoUrl.includes('loom.com')

  // Extract YouTube video ID
  const getYouTubeVideoId = (url: string) => {
    if (url.includes('youtube.com/watch')) {
      const urlParams = new URL(url).searchParams
      return urlParams.get('v') || ''
    } else if (url.includes('youtu.be/')) {
      return url.split('youtu.be/')[1].split('?')[0]
    } else if (url.includes('youtube.com/embed/')) {
      return url.split('youtube.com/embed/')[1].split('?')[0]
    }
    return ''
  }

  const videoId = isYouTube ? getYouTubeVideoId(videoUrl) : ''

  // Load YouTube IFrame API
  useEffect(() => {
    if (!isYouTube) {
      setEmbedUrl(videoUrl)
      return
    }

    // Track impression
    if (!hasTrackedImpression.current) {
      trackVideoEvent('video_impression', company)
      hasTrackedImpression.current = true
    }

    // Load YouTube IFrame API
    if (!(window as any).YT) {
      const tag = document.createElement('script')
      tag.src = 'https://www.youtube.com/iframe_api'
      const firstScriptTag = document.getElementsByTagName('script')[0]
      firstScriptTag.parentNode?.insertBefore(tag, firstScriptTag)
    }

    // Initialize player when API is ready
    const initPlayer = () => {
      if ((window as any).YT && (window as any).YT.Player) {
        const ytPlayer = new (window as any).YT.Player(playerId, {
          videoId: videoId,
          playerVars: {
            enablejsapi: 1,
            origin: window.location.origin,
          },
          events: {
            onStateChange: (event: any) => {
              const state = event.data
              
              // -1: unstarted, 0: ended, 1: playing, 2: paused, 3: buffering, 5: cued
              if (state === 1 && !hasTrackedPlay.current) {
                trackVideoEvent('video_play', company)
                hasTrackedPlay.current = true
              } else if (state === 2) {
                const currentTime = event.target.getCurrentTime()
                trackVideoEvent('video_pause', company, { progress: Math.round(currentTime) })
              } else if (state === 0) {
                trackVideoEvent('video_complete', company)
              }
            },
          },
        })

        playerRef.current = ytPlayer
        setPlayer(ytPlayer)

        // Track progress every 2 seconds
        const progressInterval = setInterval(() => {
          if (ytPlayer && ytPlayer.getCurrentTime && ytPlayer.getDuration) {
            const currentTime = ytPlayer.getCurrentTime()
            const duration = ytPlayer.getDuration()
            
            if (currentTime && duration) {
              const progress = (currentTime / duration) * 100
              
              if (progress >= 25 && !progressTracked.current.has(25)) {
                trackVideoEvent('video_progress', company, { milestone: '25%' })
                progressTracked.current.add(25)
              } else if (progress >= 50 && !progressTracked.current.has(50)) {
                trackVideoEvent('video_progress', company, { milestone: '50%' })
                progressTracked.current.add(50)
              } else if (progress >= 75 && !progressTracked.current.has(75)) {
                trackVideoEvent('video_progress', company, { milestone: '75%' })
                progressTracked.current.add(75)
              }
            }
          }
        }, 2000)

        return () => clearInterval(progressInterval)
      }
    }

    // Wait for API to load
    if ((window as any).YT && (window as any).YT.Player) {
      initPlayer()
    } else {
      (window as any).onYouTubeIframeAPIReady = initPlayer
    }

    return () => {
      if (playerRef.current && playerRef.current.destroy) {
        playerRef.current.destroy()
      }
    }
  }, [videoId, company, isYouTube, playerId])

  // Loom tracking (simple postMessage)
  useEffect(() => {
    if (!isLoom) return

    if (!hasTrackedImpression.current) {
      trackVideoEvent('video_impression', company)
      hasTrackedImpression.current = true
    }

    const handleMessage = (event: MessageEvent) => {
      if (!event.data || typeof event.data !== 'object') return

      const { type, data } = event.data

      switch (type) {
        case 'play':
          if (!hasTrackedPlay.current) {
            trackVideoEvent('video_play', company)
            hasTrackedPlay.current = true
          }
          break
        
        case 'pause':
          trackVideoEvent('video_pause', company, { progress: data?.currentTime || 0 })
          break
        
        case 'ended':
          trackVideoEvent('video_complete', company)
          break
        
        case 'timeupdate':
          const progress = data?.percentComplete || 0
          if (progress >= 25 && !progressTracked.current.has(25)) {
            trackVideoEvent('video_progress', company, { milestone: '25%' })
            progressTracked.current.add(25)
          } else if (progress >= 50 && !progressTracked.current.has(50)) {
            trackVideoEvent('video_progress', company, { milestone: '50%' })
            progressTracked.current.add(50)
          } else if (progress >= 75 && !progressTracked.current.has(75)) {
            trackVideoEvent('video_progress', company, { milestone: '75%' })
            progressTracked.current.add(75)
          }
          break
      }
    }

    window.addEventListener('message', handleMessage)
    return () => window.removeEventListener('message', handleMessage)
  }, [company, isLoom])

  if (isYouTube) {
    return (
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.2 }}
        className="relative w-full max-w-4xl mx-auto"
        style={{ paddingBottom: '56.25%' }}
      >
        <div
          id={playerId}
          className="absolute top-0 left-0 w-full h-full rounded-2xl shadow-2xl overflow-hidden"
          style={{ border: '2px solid rgba(255, 255, 255, 0.1)' }}
        />
      </motion.div>
    )
  }

  // Loom or other embeds
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, delay: 0.2 }}
      className="relative w-full max-w-4xl mx-auto"
      style={{ paddingBottom: '56.25%' }}
    >
      {embedUrl && (
        <iframe
          src={embedUrl}
          frameBorder="0"
          allowFullScreen
          allow="autoplay; encrypted-media"
          className="absolute top-0 left-0 w-full h-full rounded-2xl shadow-2xl"
          style={{ border: '2px solid rgba(255, 255, 255, 0.1)' }}
        />
      )}
    </motion.div>
  )
}