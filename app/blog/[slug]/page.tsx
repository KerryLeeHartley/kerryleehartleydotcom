// ============================================================================
// ENHANCED BLOG POST PAGE WITH MDX SUPPORT - Version 2.1 (UPDATED)
// ============================================================================
// 📁 FILE: /app/blog/[slug]/page.tsx
// 
// ✨ UPDATES IN THIS VERSION:
// - LARGER typography for better readability (20px body, bigger headings)
// - IMPROVED MDX formatting (better spacing, hierarchy)
// - FIXED floating button position on mobile (doesn't block category tag)
// - CLEARER image attachment instructions
//
// ✨ FEATURES:
// - Reads from MDX files (no more hard-coded content!)
// - Full-width header images with gradient overlays
// - AdSense sidebar and in-content ad slots
// - Sponsor card for affiliate partnerships
// - Next/Previous post navigation
// - Newsletter signup in sidebar
// - Author CTA linking back to funnel
// - Proper typography with Tailwind prose classes
// - Enhanced mobile experience
// - Table of contents auto-generated from headings
// - Social share buttons
// - Related posts section
//
// ============================================================================

import { notFound } from 'next/navigation'
import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'
import { MDXRemote } from 'next-mdx-remote/rsc'
import Link from 'next/link'
import { 
  ArrowLeft, 
  Clock, 
  User, 
  Calendar,
  Facebook,
  Twitter,
  Linkedin,
  Mail
} from 'lucide-react'

// ============================================================================
// TYPE DEFINITIONS
// ============================================================================

interface BlogPost {
  slug: string
  title: string
  excerpt: string
  date: string
  author: string
  readTime: string
  category: string
  image: string  // Header image from MDX frontmatter
  content: string
}

// ============================================================================
// HELPER FUNCTIONS - GET BLOG POSTS FROM MDX FILES
// ============================================================================

/**
 * Get all blog posts from the MDX files
 * Reads from: /content/blog/first-time-buyers/*.mdx
 */
function getAllPosts(): BlogPost[] {
  const postsDirectory = path.join(process.cwd(), 'content/blog/first-time-buyers')
  
  // Check if directory exists
  if (!fs.existsSync(postsDirectory)) {
    console.warn('Blog directory not found:', postsDirectory)
    return []
  }

  const filenames = fs.readdirSync(postsDirectory)
  const posts = filenames
    .filter(filename => filename.endsWith('.mdx'))
    .map(filename => {
      const slug = filename.replace(/\.mdx$/, '')
      const filePath = path.join(postsDirectory, filename)
      const fileContents = fs.readFileSync(filePath, 'utf8')
      const { data, content } = matter(fileContents)

      return {
        slug,
        title: data.title || 'Untitled',
        excerpt: data.excerpt || '',
        date: data.date || new Date().toISOString(),
        author: data.author || 'Kerry Lee Hartley',
        readTime: data.readTime || '5 min',
        category: data.category || 'First Time Buyer',  // ← UPDATED: No dashes!
        image: data.image || '/images/blog/default-header.jpg',
        content,
      }
    })
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())

  return posts
}

/**
 * Get a single post by slug
 */
function getPostBySlug(slug: string): BlogPost | null {
  const posts = getAllPosts()
  return posts.find(post => post.slug === slug) || null
}

/**
 * Get adjacent posts for next/previous navigation
 */
function getAdjacentPosts(currentSlug: string) {
  const posts = getAllPosts()
  const currentIndex = posts.findIndex(post => post.slug === currentSlug)
  
  return {
    prev: currentIndex > 0 ? posts[currentIndex - 1] : null,
    next: currentIndex < posts.length - 1 ? posts[currentIndex + 1] : null,
  }
}

/**
 * Get related posts (excluding current post)
 */
function getRelatedPosts(currentSlug: string, limit: number = 3): BlogPost[] {
  return getAllPosts()
    .filter(post => post.slug !== currentSlug)
    .slice(0, limit)
}

/**
 * Generate table of contents from markdown content
 */
function generateTOC(content: string) {
  const headingRegex = /^(#{2,3})\s+(.+)$/gm
  const headings: { level: number; text: string; id: string }[] = []
  let match

  while ((match = headingRegex.exec(content)) !== null) {
    const level = match[1].length
    const text = match[2].trim()
    const id = text
      .toLowerCase()
      .replace(/[^\w\s-]/g, '')
      .replace(/\s+/g, '-')

    headings.push({ level, text, id })
  }

  return headings
}

// ============================================================================
// SHARE BUTTONS COMPONENT
// ============================================================================

function ShareButtons({ title, slug }: { title: string; slug: string }) {
  // TODO: Update this URL to match your production domain
  const url = `https://yoursite.com/blog/${slug}`
  const encodedUrl = encodeURIComponent(url)
  const encodedTitle = encodeURIComponent(title)

  return (
    <div className="flex items-center gap-3">
      <span className="text-sm font-semibold text-gray-600">Share:</span>
      
      {/* Facebook */}
      <a
        href={`https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}`}
        target="_blank"
        rel="noopener noreferrer"
        className="p-2 rounded-full bg-blue-600 text-white hover:bg-blue-700 transition-colors"
        aria-label="Share on Facebook"
      >
        <Facebook className="w-4 h-4" />
      </a>
      
      {/* Twitter */}
      <a
        href={`https://twitter.com/intent/tweet?url=${encodedUrl}&text=${encodedTitle}`}
        target="_blank"
        rel="noopener noreferrer"
        className="p-2 rounded-full bg-sky-500 text-white hover:bg-sky-600 transition-colors"
        aria-label="Share on Twitter"
      >
        <Twitter className="w-4 h-4" />
      </a>
      
      {/* LinkedIn */}
      <a
        href={`https://www.linkedin.com/shareArticle?mini=true&url=${encodedUrl}&title=${encodedTitle}`}
        target="_blank"
        rel="noopener noreferrer"
        className="p-2 rounded-full bg-blue-700 text-white hover:bg-blue-800 transition-colors"
        aria-label="Share on LinkedIn"
      >
        <Linkedin className="w-4 h-4" />
      </a>
      
      {/* Email */}
      <a
        href={`mailto:?subject=${encodedTitle}&body=Check out this article: ${encodedUrl}`}
        className="p-2 rounded-full bg-gray-600 text-white hover:bg-gray-700 transition-colors"
        aria-label="Share via Email"
      >
        <Mail className="w-4 h-4" />
      </a>
    </div>
  )
}

// ============================================================================
// ADSENSE SLOT COMPONENT
// ============================================================================
// TODO: Replace placeholders with your actual AdSense code
// Get your publisher ID from: https://adsense.google.com

function AdSenseSlot({ slot }: { slot: 'sidebar' | 'in-content' }) {
  return (
    <div className="bg-gradient-to-br from-gray-100 to-gray-50 border-2 border-dashed border-gray-300 rounded-xl p-8 text-center">
      <p className="text-gray-500 font-semibold mb-2">Advertisement</p>
      <p className="text-sm text-gray-400">
        {slot === 'sidebar' ? '300x600 Ad Slot' : '728x90 Ad Slot'}
      </p>
      <p className="text-xs text-gray-400 mt-2">Replace with AdSense code</p>
      
      {/* ========== INSTRUCTIONS FOR ADSENSE INTEGRATION ========== */}
      {/* 
        1. Go to your AdSense dashboard
        2. Create a new ad unit (Display Ad)
        3. Copy the ad code
        4. Replace this entire div with your <ins> tag
        5. Add the AdSense script to your layout.tsx <head>
        
        Example AdSense code:
        <ins className="adsbygoogle"
             style={{ display: 'block' }}
             data-ad-client="ca-pub-XXXXXXXXXXXXXXXX"
             data-ad-slot="XXXXXXXXXX"
             data-ad-format="auto"
             data-full-width-responsive="true">
        </ins>
      */}
    </div>
  )
}

// ============================================================================
// SPONSOR CARD COMPONENT
// ============================================================================
// TODO: Customize with your actual sponsor/affiliate content

function SponsorCard() {
  return (
    <div className="bg-gradient-to-br from-blue-50 to-purple-50 border border-blue-200 rounded-2xl p-6 shadow-sm">
      <div className="flex items-center gap-3 mb-4">
        <div className="w-12 h-12 rounded-full bg-gradient-to-r from-blue-500 to-purple-500 flex items-center justify-center text-white font-bold text-lg">
          S
        </div>
        <div>
          <p className="text-xs text-gray-500 uppercase tracking-wide font-semibold">Sponsored</p>
          <p className="font-bold text-gray-800">Partner Spotlight</p>
        </div>
      </div>
      
      {/* TODO: Replace with your sponsor content */}
      <h4 className="font-bold text-lg text-gray-900 mb-2">
        Looking for a mortgage lender?
      </h4>
      <p className="text-sm text-gray-600 mb-4">
        Get pre-qualified in minutes with our trusted partner. Low rates, fast approval.
      </p>
      
      {/* TODO: Update href with your affiliate link */}
      <a 
        href="https://partner-link.com?ref=yoursite"
        target="_blank"
        rel="noopener noreferrer"
        className="block w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white font-semibold py-3 px-4 rounded-lg hover:shadow-lg transition-all text-center"
      >
        Get Started →
      </a>
      <p className="text-xs text-gray-400 mt-3 text-center">Ad • Learn more</p>
    </div>
  )
}

// ============================================================================
// NEWSLETTER SIGNUP COMPONENT
// ============================================================================
// TODO: Connect to your email service (ConvertKit, Mailchimp, etc.)

function NewsletterSignup() {
  return (
    <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6">
      <h4 className="font-bold text-gray-900 mb-2">Stay Updated</h4>
      <p className="text-sm text-gray-600 mb-4">
        Get weekly tips on first-time homebuying.
      </p>
      
      {/* TODO: Replace action URL with your email service endpoint */}
      <form className="space-y-3" action="/api/newsletter" method="POST">
        <input
          type="email"
          name="email"
          placeholder="Your email"
          required
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <button
          type="submit"
          className="w-full bg-gray-900 text-white font-semibold py-2 px-4 rounded-lg hover:bg-gray-800 transition-colors"
        >
          Subscribe
        </button>
      </form>
      <p className="text-xs text-gray-400 mt-2">No spam. Unsubscribe anytime.</p>
    </div>
  )
}

// ============================================================================
// AUTHOR CTA COMPONENT
// ============================================================================
// Links back to your main funnel

function AuthorCTA() {
  return (
    <div className="bg-gradient-to-br from-gray-900 to-gray-800 rounded-2xl shadow-lg p-6 text-white">
      <div className="w-16 h-16 rounded-full bg-gradient-to-r from-blue-500 to-purple-500 mx-auto mb-4" />
      <h4 className="font-bold text-xl text-center mb-2">Ready to Buy Your First Home?</h4>
      <p className="text-gray-300 text-sm text-center mb-4">
        Get my free mistake-proof checklist and personalized guidance.
      </p>
      
      {/* TODO: Update href to match your funnel page */}
      <Link
        href="/first-time-buyers#video"
        className="block w-full bg-gradient-to-r from-blue-500 to-purple-500 text-white font-bold py-3 px-4 rounded-lg text-center hover:shadow-xl transition-all"
      >
        Watch Free Video
      </Link>
    </div>
  )
}

// ============================================================================
// MAIN PAGE COMPONENT
// ============================================================================

export default async function BlogPostPage({ 
  params 
}: { 
  params: Promise<{ slug: string }> 
}) {
  const { slug } = await params
  const post = getPostBySlug(slug)

  // Handle 404 if post not found
  if (!post) {
    notFound()
  }

  const toc = generateTOC(post.content)
  const relatedPosts = getRelatedPosts(slug)
  const { prev, next } = getAdjacentPosts(slug)

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#FAF9F6] via-[#F8F6F3] to-[#F5F1E8]">
      
      {/* ========== HERO HEADER WITH IMAGE ========== */}
      <div className="relative w-full h-[500px] bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 overflow-hidden">
        
        {/* Header Background Image */}
        <div 
          className="absolute inset-0 bg-cover bg-center opacity-40"
          style={{ backgroundImage: `url('${post.image}')` }}
        />
        
        {/* Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-gray-900 via-gray-900/50 to-transparent" />
        
        {/* Header Content */}
        <div className="relative h-full max-w-4xl mx-auto px-6 flex flex-col justify-end pb-16">
          
          {/* Category Badge */}
          <div className="mb-4">
            <span className="inline-block px-4 py-2 bg-blue-500/20 backdrop-blur-sm border border-blue-400/30 text-blue-300 text-sm font-semibold rounded-full">
              {post.category}
            </span>
          </div>

          {/* Post Title */}
          <h1 className="text-5xl md:text-6xl font-extrabold text-white mb-6 leading-tight drop-shadow-lg">
            {post.title}
          </h1>

          {/* Meta Information */}
          <div className="flex flex-wrap items-center gap-6 text-gray-300">
            <div className="flex items-center gap-2">
              <User className="w-4 h-4" />
              <span className="font-medium">{post.author}</span>
            </div>
            <div className="flex items-center gap-2">
              <Clock className="w-4 h-4" />
              <span>{post.readTime} read</span>
            </div>
            <div className="flex items-center gap-2">
              <Calendar className="w-4 h-4" />
              <time className="font-medium">
                {new Date(post.date).toLocaleDateString('en-US', {
                  month: 'long',
                  day: 'numeric',
                  year: 'numeric',
                })}
              </time>
            </div>
          </div>
        </div>

        {/* Back Button - FIXED: Now positioned to not block category tag */}
        <Link
          href="/first-time-buyers#blog"
          className="fixed top-20 left-6 z-50 md:absolute md:top-6 md:left-6 inline-flex items-center gap-2 px-4 py-2 bg-white/10 backdrop-blur-md border border-white/20 text-white rounded-lg hover:bg-white/20 transition-all group"
        >
          <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
          <span className="font-medium">Back to Blog</span>
        </Link>
      </div>

      {/* ========== MAIN CONTENT AREA ========== */}
      <div className="max-w-7xl mx-auto px-6 py-12">
        <div className="grid lg:grid-cols-12 gap-8">
          
          {/* ========== LEFT SIDEBAR - TOC & SHARE (Desktop Only) ========== */}
          <aside className="hidden lg:block lg:col-span-3">
            <div className="sticky top-24 space-y-6">
              
              {/* Share Buttons */}
              <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6">
                <h3 className="font-bold text-gray-900 mb-4">Share this article</h3>
                <ShareButtons title={post.title} slug={slug} />
              </div>

              {/* Table of Contents */}
              {toc.length > 0 && (
                <nav className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6">
                  <h3 className="font-bold text-gray-900 mb-4">Table of Contents</h3>
                  <ul className="space-y-2">
                    {toc.map((heading, index) => (
                      <li key={index}>
                        <a
                          href={`#${heading.id}`}
                          className={`block text-sm hover:text-blue-600 transition-colors ${
                            heading.level === 2
                              ? 'font-semibold text-gray-900'
                              : 'pl-4 text-gray-600'
                          }`}
                        >
                          {heading.text}
                        </a>
                      </li>
                    ))}
                  </ul>
                </nav>
              )}
            </div>
          </aside>

          {/* ========== MAIN ARTICLE CONTENT ========== */}
          <article className="lg:col-span-6">
            <div className="bg-white rounded-3xl shadow-lg border border-gray-200 p-8 md:p-12">
              
              {/* Article Body with UPDATED Typography - LARGER SIZES */}
              <div className="prose prose-xl prose-gray max-w-none
                prose-headings:font-bold prose-headings:text-gray-900 prose-headings:tracking-tight
                prose-h1:text-5xl prose-h1:mt-0 prose-h1:mb-8 prose-h1:leading-tight
                prose-h2:text-4xl prose-h2:mt-16 prose-h2:mb-6 prose-h2:leading-tight prose-h2:border-b prose-h2:border-gray-200 prose-h2:pb-4
                prose-h3:text-3xl prose-h3:mt-12 prose-h3:mb-5
                prose-h4:text-2xl prose-h4:mt-8 prose-h4:mb-4
                prose-p:text-gray-700 prose-p:leading-relaxed prose-p:mb-8 prose-p:text-xl
                prose-a:text-blue-600 prose-a:font-medium prose-a:no-underline hover:prose-a:underline hover:prose-a:text-blue-700
                prose-strong:text-gray-900 prose-strong:font-bold prose-strong:text-xl
                prose-em:text-gray-800 prose-em:italic
                prose-ul:my-8 prose-ul:space-y-3
                prose-ol:my-8 prose-ol:space-y-3
                prose-li:text-gray-700 prose-li:leading-relaxed prose-li:text-xl prose-li:my-2
                prose-blockquote:border-l-4 prose-blockquote:border-blue-500 prose-blockquote:pl-6 prose-blockquote:italic prose-blockquote:text-gray-600 prose-blockquote:my-8
                prose-code:text-blue-600 prose-code:bg-blue-50 prose-code:px-2 prose-code:py-1 prose-code:rounded prose-code:text-base
                prose-pre:bg-gray-900 prose-pre:text-gray-100 prose-pre:p-6 prose-pre:rounded-xl prose-pre:my-8
                prose-img:rounded-2xl prose-img:shadow-lg prose-img:my-10
                prose-hr:my-12 prose-hr:border-gray-200
                [&>*:first-child]:mt-0
                [&>*:last-child]:mb-0
              ">
                {/* MDX Content Rendered Here */}
                <MDXRemote source={post.content} />
              </div>

              {/* In-Content Ad Slot */}
              <div className="my-12">
                <AdSenseSlot slot="in-content" />
              </div>

              {/* Share Buttons - Mobile Only */}
              <div className="lg:hidden mt-12 pt-8 border-t border-gray-200">
                <ShareButtons title={post.title} slug={slug} />
              </div>
            </div>

            {/* ========== NEXT/PREVIOUS POST NAVIGATION ========== */}
            <div className="mt-12 grid md:grid-cols-2 gap-6">
              
              {/* Previous Post */}
              {prev && (
                <Link
                  href={`/blog/${prev.slug}`}
                  className="group bg-white rounded-2xl shadow-sm border border-gray-200 p-6 hover:shadow-lg hover:border-blue-300 transition-all"
                >
                  <p className="text-sm font-semibold text-gray-500 mb-2">← Previous Article</p>
                  <h4 className="font-bold text-lg text-gray-900 group-hover:text-blue-600 transition-colors">
                    {prev.title}
                  </h4>
                  <p className="text-sm text-gray-600 mt-2 line-clamp-2">{prev.excerpt}</p>
                </Link>
              )}
              
              {/* Next Post */}
              {next && (
                <Link
                  href={`/blog/${next.slug}`}
                  className="group bg-white rounded-2xl shadow-sm border border-gray-200 p-6 hover:shadow-lg hover:border-blue-300 transition-all md:text-right"
                >
                  <p className="text-sm font-semibold text-gray-500 mb-2">Next Article →</p>
                  <h4 className="font-bold text-lg text-gray-900 group-hover:text-blue-600 transition-colors">
                    {next.title}
                  </h4>
                  <p className="text-sm text-gray-600 mt-2 line-clamp-2">{next.excerpt}</p>
                </Link>
              )}
            </div>

            {/* ========== RELATED POSTS SECTION ========== */}
            {relatedPosts.length > 0 && (
              <div className="mt-16">
                <h2 className="text-3xl font-bold text-gray-900 mb-8">You Might Also Like</h2>
                <div className="grid md:grid-cols-2 gap-6">
                  {relatedPosts.map(relatedPost => (
                    <Link
                      key={relatedPost.slug}
                      href={`/blog/${relatedPost.slug}`}
                      className="group bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden hover:shadow-lg hover:border-blue-300 transition-all"
                    >
                      {/* Related Post Image */}
                      <div 
                        className="h-48 bg-cover bg-center"
                        style={{ backgroundImage: `url('${relatedPost.image}')` }}
                      />
                      
                      {/* Related Post Content */}
                      <div className="p-6">
                        <h3 className="font-bold text-xl text-gray-900 mb-2 group-hover:text-blue-600 transition-colors">
                          {relatedPost.title}
                        </h3>
                        <p className="text-gray-600 text-sm line-clamp-2">{relatedPost.excerpt}</p>
                        <div className="flex items-center gap-4 mt-4 text-sm text-gray-500">
                          <span>{relatedPost.readTime} read</span>
                          <span>•</span>
                          <time>
                            {new Date(relatedPost.date).toLocaleDateString('en-US', {
                              month: 'short',
                              day: 'numeric',
                            })}
                          </time>
                        </div>
                      </div>
                    </Link>
                  ))}
                </div>
              </div>
            )}
          </article>

          {/* ========== RIGHT SIDEBAR - ADS & CTAs ========== */}
          <aside className="lg:col-span-3">
            <div className="sticky top-24 space-y-6">
              
              {/* AdSense Sidebar Slot */}
              <AdSenseSlot slot="sidebar" />

              {/* Sponsor Card */}
              <SponsorCard />

              {/* Author CTA */}
              <AuthorCTA />

              {/* Newsletter Signup */}
              <NewsletterSignup />
            </div>
          </aside>
        </div>
      </div>
    </div>
  )
}

// ============================================================================
// 📋 IMPLEMENTATION SUMMARY
// ============================================================================
// 
// FILE LOCATION: 
// /app/blog/[slug]/page.tsx
// 
// ============================================================================
// 
// 🖼️ HOW TO ATTACH IMAGES TO POSTS (IMPORTANT!)
// ============================================================================
//
// Step 1: Add images to /public/images/blog/
//   Example files:
//   - budget-design.jpg
//   - finding-the-one.jpg
//   - apartment-transformation.jpg
//   - magic-homeownership.jpg
//
// Step 2: Match image names in your MDX frontmatter
//   Open each .mdx file and make sure the `image:` field matches:
//
//   Example in first-home-design-budget-high-impact.mdx:
//   ---
//   title: "First Home Design on a Budget"
//   image: "/images/blog/budget-design.jpg"  ← MUST MATCH FILENAME
//   ---
//
//   Example in finding-the-one-dream-home.mdx:
//   ---
//   title: "How to Know When You've Found 'The One'"
//   image: "/images/blog/finding-the-one.jpg"  ← MUST MATCH FILENAME
//   ---
//
// Step 3: The code automatically reads the `image:` field and displays it!
//
// ⚠️ COMMON MISTAKES:
// ❌ Image in /public/blog/ instead of /public/images/blog/
// ❌ Typo in filename (budget-desgin.jpg vs budget-design.jpg)
// ❌ Uppercase vs lowercase (Budget-Design.jpg vs budget-design.jpg)
// ❌ Wrong extension (.png in code but .jpg file exists)
//
// ✅ CORRECT FORMAT:
// File location: /public/images/blog/budget-design.jpg
// MDX frontmatter: image: "/images/blog/budget-design.jpg"
//                         ↑ Starts with / (important!)
//
// ============================================================================
//
// TYPOGRAPHY UPDATES (Version 2.1):
//
// ✅ INCREASED SIZES:
//   - Body text: 18px → 20px (prose-xl instead of prose-lg)
//   - Paragraphs: Now text-xl with more spacing (mb-8 instead of mb-6)
//   - H2: Added border-bottom for better section separation
//   - List items: Increased to text-xl with more spacing (my-2)
//   - Better line height and tracking throughout
//
// ✅ IMPROVED FORMATTING:
//   - Headers have more bottom margin for breathing room
//   - H2s have visual separator (border-bottom)
//   - Stronger hierarchy between heading levels
//   - Links are more prominent (font-medium)
//   - Blockquotes stand out more (larger left border)
//   - Code blocks have better styling
//
// ✅ MOBILE BUTTON FIX:
//   - Back button now positioned at top-20 on mobile (doesn't block category)
//   - Changed from "absolute" to "fixed" on mobile for better UX
//   - Remains absolute on desktop (md:absolute md:top-6)
//
// ============================================================================
// 
// WHAT THIS FILE DOES:
// ✅ Reads MDX blog posts from /content/blog/first-time-buyers/
// ✅ Renders posts with LARGER, more readable typography
// ✅ Displays full-width header images (from MDX `image:` field)
// ✅ Auto-generates table of contents from H2 and H3 headings
// ✅ Shows next/previous post navigation
// ✅ Displays 3 related posts at the bottom
// ✅ Includes social share buttons (Facebook, Twitter, LinkedIn, Email)
// ✅ Adds AdSense slots (sidebar + in-content)
// ✅ Includes sponsor card for affiliate partnerships
// ✅ Newsletter signup form in sidebar
// ✅ Author CTA linking back to main funnel
// ✅ Fully responsive with FIXED mobile button position
// 
// ============================================================================
// 
// [Rest of implementation summary remains the same as previous version...]
//
// ============================================================================