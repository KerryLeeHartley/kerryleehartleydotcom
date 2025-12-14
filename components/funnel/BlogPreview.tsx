'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import Image from 'next/image'

// ============================================================================
// BLOG PREVIEW COMPONENT - DISPLAY FEATURED POSTS
// ============================================================================
// ↓ ADDED: Shows curated blog posts on landing pages
// Purpose: Build authority, drive SEO, keep users engaged
// Why: 80% of buyers research online before contacting agent

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
  category?: string              // Filter by category (e.g., 'first-time-buyers')
  featured?: boolean             // Show only featured posts
  tone?: string | string[]       // Filter by tone (e.g., 'dream')
  limit?: number                 // Number of posts to show
  heading?: string               // Section heading
  subheading?: string            // Section subheading
}

// ============================================================================
// SAMPLE BLOG POSTS - Replace with actual MDX file loading in production
// ============================================================================
// ↓ TODO: In production, load these from /content/blog/*.mdx files
// For now, hardcoded for demonstration
const SAMPLE_POSTS: BlogPost[] = [
  {
    title: "First Home Design on a Budget: 10 High-Impact Changes",
    slug: "first-home-design-budget-high-impact",
    category: "first-time-buyers",
    featured: true,
    tone: "dream",
    excerpt: "Transform your first home into a dream space without breaking the bank. These 10 budget-friendly changes create magazine-worthy results for under $500.",
    date: "2024-12-10",
    readTime: "7 min",
    author: "Kerry Lee Hartley",
    image: "/images/blog/budget-design.jpg"
  },
  {
    title: "How to Know When You've Found 'The One' (Your Dream Home)",
    slug: "finding-the-one-dream-home",
    category: "first-time-buyers",
    featured: true,
    tone: "dream",
    excerpt: "Forget the checklist. Here's how to know when you've found the house that's meant to be yours—and why trusting your gut is just as important as the numbers.",
    date: "2024-12-08",
    readTime: "4 min",
    author: "Kerry Lee Hartley",
    image: "/images/blog/the-one-home.jpg"
  },
  {
    title: "From Apartment to Home: Your Transformation Story",
    slug: "apartment-to-home-transformation",
    category: "first-time-buyers",
    featured: true,
    tone: "dream",
    excerpt: "More than just moving boxes and changing addresses—this is the emotional journey from renter to homeowner, and why it changes everything.",
    date: "2024-12-06",
    readTime: "5 min",
    author: "Kerry Lee Hartley",
    image: "/images/blog/apartment-to-home.jpg"
  },
  {
    title: "The Magic of Homeownership: What No One Tells You",
    slug: "magic-of-homeownership",
    category: "first-time-buyers",
    featured: true,
    tone: "dream",
    excerpt: "Beyond the investment and the equity—these are the small, magical moments of owning your first home that no one warns you about (in the best way).",
    date: "2024-12-04",
    readTime: "3 min",
    author: "Kerry Lee Hartley",
    image: "/images/blog/homeownership-magic.jpg"
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
  
  // Filter by category
  if (category) {
    filteredPosts = filteredPosts.filter(post => post.category === category)
  }
  
  // Filter by featured
  if (featured !== undefined) {
    filteredPosts = filteredPosts.filter(post => post.featured === featured)
  }
  
  // Filter by tone
  if (tone) {
    const tones = Array.isArray(tone) ? tone : [tone]
    filteredPosts = filteredPosts.filter(post => tones.includes(post.tone))
  }
  
  // Limit number of posts
  const displayPosts = filteredPosts.slice(0, limit)
  
  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-[#1a1412] via-[#251a15] to-[#1a1412] text-white py-20 px-6 md:px-12">
      
      {/* ================================================================ */}
      {/* BACKGROUND GLOWS - Warmer, more energetic */}
      {/* ================================================================ */}
      {/* ↓ MODIFIED: Warmer background with brown/amber tones for energy */}
      {/* Old: from-[#0A0A0A] via-[#141414] (too dark, monotonous) */}
      {/* New: from-[#1a1412] via-[#251a15] (warm brown, energetic) */}
      {/* Why: Breaks up darkness, adds warmth, creates visual hierarchy */}
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

      {/* ================================================================ */}
      {/* MAIN CONTENT */}
      {/* ================================================================ */}
      <div className="relative max-w-7xl mx-auto">

        {/* ============================================================== */}
        {/* SECTION HEADER */}
        {/* ============================================================== */}
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

        {/* ============================================================== */}
        {/* BLOG POST GRID */}
        {/* ============================================================== */}
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
                {/* Image */}
                <div className="relative h-48 bg-gradient-to-br from-[#FFD54F]/20 to-[#FFAB91]/20 overflow-hidden">
                  {/* Placeholder gradient - replace with actual images */}
                  <div className="absolute inset-0 bg-gradient-to-br from-[#FFD54F]/30 to-[#FF7961]/30 group-hover:scale-110 transition-transform duration-500" />
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="text-6xl opacity-20">📝</div>
                  </div>
                </div>
                
                {/* Content */}
                <div className="p-6">
                  {/* Title */}
                  <h3 className="text-xl font-bold mb-3 group-hover:text-[#FFD54F] transition-colors min-h-[3.5rem]">
                    {post.title}
                  </h3>
                  
                  {/* Excerpt */}
                  <p className="text-sm text-white/60 mb-4 line-clamp-3">
                    {post.excerpt}
                  </p>
                  
                  {/* Meta */}
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

        {/* ============================================================== */}
        {/* VIEW ALL CTA */}
        {/* ============================================================== */}
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
// ============================================================================
// 
//                          📖 DOCUMENTATION
// 
// ============================================================================
// ============================================================================


/*
 * ============================================================================
 * PURPOSE
 * ============================================================================
 * 
 * The Blog Preview section serves multiple strategic purposes:
 * 
 * 1️⃣ AUTHORITY BUILDING
 * Shows you're not just an agent, you're an educator and thought leader.
 * Builds trust before they even contact you.
 * 
 * 2️⃣ SEO POWERHOUSE
 * Blog posts rank for long-tail keywords like:
 * - "first home design on a budget"
 * - "how to know if house is right"
 * - "apartment to homeownership transformation"
 * 
 * Each post = another entry point to your funnel.
 * 
 * 3️⃣ ENGAGEMENT EXTENSION
 * Keeps visitors on your site longer (reduces bounce rate).
 * More time on site = better SEO + more conversion opportunities.
 * 
 * 4️⃣ CONTENT FOR NURTURE
 * These posts become:
 * - Email sequence content
 * - Social media posts
 * - YouTube video scripts
 * - Instagram carousel topics
 * 
 * One blog post = 10+ pieces of content.
 * 
 * 
 * ============================================================================
 * FILTERING LOGIC
 * ============================================================================
 * 
 * CATEGORY FILTER:
 * Purpose: Show only relevant posts for each landing page
 * Example: 'first-time-buyers' page shows only first-time buyer posts
 * 
 * FEATURED FILTER:
 * Purpose: Manually curate which posts appear on landing pages
 * featured: true = shows on landing page
 * featured: false = shows only on /blog page or resources page
 * 
 * TONE FILTER:
 * Purpose: Match posts to page's emotional journey
 * 'dream' = aspirational, exciting (for landing pages)
 * 'pain' = problem-focused (for retargeting ads)
 * 'analytical' = data-driven (for resources pages)
 * 'educational' = how-to (for nurture sequences)
 * 
 * 
 * ============================================================================
 * CURRENT CONFIGURATION (Landing Page)
 * ============================================================================
 * 
 * Shows:
 * - category: 'first-time-buyers'
 * - featured: true
 * - tone: 'dream'
 * - limit: 4
 * 
 * Result: Only dream-focused, featured first-time buyer posts
 * 
 * 
 * ============================================================================
 * CUSTOMIZATION GUIDE
 * ============================================================================
 * 
 * CHANGE HEADING/SUBHEADING:
 * <BlogPreview 
 *   heading="Your custom heading"
 *   subheading="Your custom subheading"
 * />
 * 
 * SHOW DIFFERENT POSTS:
 * <BlogPreview 
 *   category="luxury"           // Show luxury posts
 *   featured={false}            // Show non-featured posts
 *   tone={['analytical', 'educational']}  // Multiple tones
 *   limit={6}                   // Show 6 posts
 * />
 * 
 * SHOW ALL POSTS (No Filters):
 * <BlogPreview 
 *   // No filters = shows everything
 *   sortBy="date"               // Newest first
 * />
 * 
 * 
 * ============================================================================
 * BRAND ALIGNMENT
 * ============================================================================
 * 
 * FERRARI PRINCIPLES:
 * - Bold gradients (performance colors)
 * - Hover animations (responsive, alive)
 * - Confident typography (large headlines)
 * 
 * HERMÈS PRINCIPLES:
 * - Dark sophisticated background
 * - Elegant card design (glassmorphism)
 * - White space (uncluttered)
 * - Quality micro-interactions
 * 
 * MATCHES OTHER SECTIONS:
 * - Same glows as Quiz, Trust sections
 * - Same gradient colors (gold/peach/coral)
 * - Same glassmorphism style
 * - Consistent animations
 * 
 * 
 * ============================================================================
 * PRODUCTION TODO
 * ============================================================================
 * 
 * Currently using SAMPLE_POSTS array (hardcoded).
 * 
 * In production, replace with MDX file loading:
 * 
 * import fs from 'fs'
 * import path from 'path'
 * import matter from 'gray-matter'
 * 
 * function loadBlogPosts() {
 *   const postsDirectory = path.join(process.cwd(), 'content/blog')
 *   const filenames = fs.readdirSync(postsDirectory)
 *   
 *   return filenames.map(filename => {
 *     const filePath = path.join(postsDirectory, filename)
 *     const fileContents = fs.readFileSync(filePath, 'utf8')
 *     const { data } = matter(fileContents)
 *     return data
 *   })
 * }
 * 
 * Then pass posts as prop:
 * <BlogPreview posts={loadBlogPosts()} />
 * 
 */