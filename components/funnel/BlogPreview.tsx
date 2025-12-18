'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import Image from 'next/image'

// ============================================================================
// BLOG PREVIEW COMPONENT - WITH IMAGE FALLBACK (v2.1)
// ============================================================================
// ✨ FIXED: Now shows cards even if images are missing
// - Gradient fallback for missing images
// - Proper error handling
// - Cards always display
// ============================================================================

interface BlogPost {
  title: string
  slug: string
  category: string
  featured: boolean
  tone: 'dream' | 'pain' | 'analytical' | 'educational'
  excerpt: string
  date: string
  readTime: string
  author: string
  image: string
}

interface BlogPreviewProps {
  category?: string
  featured?: boolean
  tone?: string | string[]
  limit?: number
  heading?: string
  subheading?: string
}

// ============================================================================
// SAMPLE BLOG POSTS
// ============================================================================
const SAMPLE_POSTS: BlogPost[] = [
  {
    title: "First Home Design on a Budget: 10 High-Impact Changes",
    slug: "first-home-design-budget-high-impact",
    category: "First Time Buyer",
    featured: true,
    tone: "dream",
    excerpt: "Transform your first home into a dream space without breaking the bank. These 10 budget-friendly changes create magazine-worthy results for under $500.",
    date: "2024-12-10",
    readTime: "7 min",
    author: "Kerry Lee Hartley",
    image: "/images/blog/blog_photo_3.png"
  },
  {
    title: "How to Know When You've Found 'The One' (Your Dream Home)",
    slug: "finding-the-one-dream-home",
    category: "First Time Buyer",
    featured: true,
    tone: "dream",
    excerpt: "Forget the checklist. Here's how to know when you've found the house that's meant to be yours—and why trusting your gut is just as important as the numbers.",
    date: "2024-12-08",
    readTime: "4 min",
    author: "Kerry Lee Hartley",
    image: "/images/blog/blog_photo_2.png"
  },
  {
    title: "From Apartment to Home: Your Transformation Story",
    slug: "apartment-to-home-transformation",
    category: "First Time Buyer",
    featured: true,
    tone: "dream",
    excerpt: "More than just moving boxes and changing addresses—this is the emotional journey from renter to homeowner, and why it changes everything.",
    date: "2024-12-06",
    readTime: "5 min",
    author: "Kerry Lee Hartley",
    image: "/images/blog/blog_photo_1.png"
  },
  {
    title: "The Magic of Homeownership: What No One Tells You",
    slug: "magic-of-homeownership",
    category: "First Time Buyer",
    featured: true,
    tone: "dream",
    excerpt: "Beyond the investment and the equity—these are the small, magical moments of owning your first home that no one warns you about (in the best way).",
    date: "2024-12-04",
    readTime: "3 min",
    author: "Kerry Lee Hartley",
    image: "/images/blog/blog_photo_4.png"
  }
]

export default function BlogPreview({
  category,
  featured = true,
  tone,
  limit = 4,
  heading = "Imagine Your First Home",
  subheading = "Transform your space and make it uniquely yours"
}: BlogPreviewProps) {
  
  // ==========================================================================
  // FILTER POSTS
  // ==========================================================================
  let filteredPosts = SAMPLE_POSTS
  
  if (category) {
    filteredPosts = filteredPosts.filter(post => post.category === category)
  }
  
  if (featured !== undefined) {
    filteredPosts = filteredPosts.filter(post => post.featured === featured)
  }
  
  if (tone) {
    const tones = Array.isArray(tone) ? tone : [tone]
    filteredPosts = filteredPosts.filter(post => tones.includes(post.tone))
  }
  
  const displayPosts = filteredPosts.slice(0, limit)
  
  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-[#1a1412] via-[#251a15] to-[#1a1412] text-white py-20 px-6 md:px-12">
      
      {/* Background Glows */}
      <div className="absolute inset-0 opacity-25 pointer-events-none">
        <motion.div
          className="absolute top-1/4 right-1/4 w-96 h-96 bg-[#FFD54F] rounded-full blur-3xl"
          animate={{ 
            x: [0, 30, 0], 
            y: [0, -20, 0],
            scale: [1, 1.1, 1]
          }}
          transition={{ 
            duration: 20, 
            repeat: Infinity, 
            repeatType: 'loop' 
          }}
        />
        <motion.div
          className="absolute bottom-1/4 left-1/4 w-96 h-96 bg-[#FFAB91] rounded-full blur-3xl"
          animate={{ 
            x: [0, -30, 0], 
            y: [0, 20, 0],
            scale: [1, 1.15, 1]
          }}
          transition={{ 
            duration: 25, 
            repeat: Infinity, 
            repeatType: 'loop' 
          }}
        />
      </div>

      <div className="relative max-w-7xl mx-auto">

        {/* Section Header */}
        <motion.div
          className="text-center mb-12"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-[#FFD54F] via-[#FFAB91] to-[#FF7961] bg-clip-text text-transparent leading-tight">
            {heading}
          </h2>
          <p className="text-lg md:text-xl text-white/70 max-w-2xl mx-auto">
            {subheading}
          </p>
        </motion.div>

        {/* Blog Post Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {displayPosts.map((post, index) => (
            <motion.article
              key={post.slug}
              className="group bg-white/5 backdrop-blur-sm rounded-2xl overflow-hidden border border-white/10 hover:border-white/20 transition-all duration-300"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              whileHover={{ y: -8, scale: 1.02 }}
            >
              <Link href={`/blog/${post.slug}`} className="block">
                
                {/* ========== IMAGE WITH FALLBACK ========== */}
                <div className="relative h-48 bg-gradient-to-br from-gray-800 to-gray-900 overflow-hidden">
                  {/* Gradient Background Fallback */}
                  <div className="absolute inset-0 bg-gradient-to-br from-[#FFD54F]/20 via-[#FFAB91]/20 to-[#FF7961]/20" />
                  
                  {/* Try to load image, fall back to gradient if it fails */}
                  <div className="absolute inset-0">
                    <Image
                      src={post.image}
                      alt={post.title}
                      fill
                      className="object-cover group-hover:scale-110 transition-transform duration-500"
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
                      onError={(e) => {
                        // Hide image if it fails to load, show gradient instead
                        e.currentTarget.style.display = 'none'
                      }}
                    />
                  </div>
                  
                  {/* Gradient overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                  
                  {/* Category Badge */}
                  <div className="absolute top-4 left-4 z-10">
                    <span className="inline-block px-3 py-1 bg-[#FFAB91]/90 backdrop-blur-sm text-black text-xs font-semibold rounded-full">
                      {post.category}
                    </span>
                  </div>
                  
                  {/* Icon overlay when image doesn't load */}
                  <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                    <div className="text-6xl opacity-20">📝</div>
                  </div>
                </div>
                
                {/* Content */}
                <div className="p-6">
                  <h3 className="text-xl font-bold mb-3 group-hover:text-[#FFD54F] transition-colors min-h-[3.5rem]">
                    {post.title}
                  </h3>
                  
                  <p className="text-sm text-white/60 mb-4 line-clamp-3">
                    {post.excerpt}
                  </p>
                  
                  <div className="flex items-center justify-between text-xs text-white/40">
                    <span>{post.readTime} read</span>
                    <span className="flex items-center gap-1">
                      Read More
                      <svg className="w-4 h-4 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                      </svg>
                    </span>
                  </div>
                </div>
              </Link>
            </motion.article>
          ))}
        </div>

        {/* View All CTA */}
        <motion.div
          className="text-center"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          <Link 
            href="/blog"
            className="inline-flex items-center gap-2 px-8 py-4 bg-white/10 hover:bg-white/20 rounded-full font-semibold transition-all hover:scale-105"
          >
            Explore More Stories
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </Link>
        </motion.div>

      </div>
    </section>
  )
}

// ============================================================================
// 🔧 TROUBLESHOOTING GUIDE
// ============================================================================
//
// IF CARDS ARE NOT SHOWING AT ALL:
//
// 1. CHECK CONSOLE: Open browser DevTools (F12) and look for errors
// 2. CHECK IMAGE PATHS: Make sure images exist at /public/images/blog/
// 3. TRY THIS: Temporarily comment out the Image component to test
//
// TEMPORARY FIX TO SEE CARDS:
// Comment out lines with <Image> component (lines 178-187) and the cards
// will show with just the gradient background and emoji.
//
// ============================================================================
//
// 📸 IMAGE PATH CHECKLIST:
//
// ✅ Images should be at: /public/images/blog/filename.jpg
// ✅ MDX frontmatter should have: image: "/images/blog/filename.jpg"
// ✅ File names must match EXACTLY (case-sensitive on some systems)
// ✅ No typos in filenames
// ✅ File extensions must match (.jpg vs .png vs .webp)
//
// ============================================================================