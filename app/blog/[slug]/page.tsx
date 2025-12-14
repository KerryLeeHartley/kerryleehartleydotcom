'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { ArrowLeft, Share2, Facebook, Twitter, Linkedin, Mail } from 'lucide-react'

// ============================================================================
// IMPROVED BLOG POST PAGE - WARM, READABLE, STYLED
// ============================================================================
// ✨ IMPROVEMENTS:
// - Warmer background (cream/beige instead of black)
// - Bigger, readable typography
// - Styled headers with proper hierarchy
// - Sticky back button on mobile
// - Table of contents sidebar (desktop)
// - Wider content area (better use of space)
// - Social share buttons
// - Related posts section
// - Proper metadata alignment

interface BlogPost {
  title: string
  category: string
  excerpt: string
  date: string
  readTime: string
  author: string
  content: string
}

const BLOG_POSTS: Record<string, BlogPost> = {
  'first-home-design-budget-high-impact': {
    title: "First Home Design on a Budget: 10 High-Impact Changes",
    category: "first-time-buyers",
    excerpt: "Transform your first home into a dream space without breaking the bank.",
    date: "December 10, 2024",
    readTime: "7 min",
    author: "Kerry Lee Hartley",
    content: `
# First Home Design on a Budget: 10 High-Impact Changes

Congratulations! You've got the keys to your first home. Now comes the fun part—making it *yours*.

The good news? You don't need a designer budget to create a space you'll love coming home to. These 10 high-impact changes will transform your house into your dream home, most for under $50 each.

## 1. Paint One Accent Wall

**Cost: $40-80**

**The Impact:** Instant personality without overwhelming the space.

Choose one wall in your living room or bedroom and go bold. Deep emerald green, warm terracotta, or moody navy blue can completely transform a room's vibe.

**Pro Tip:** Paint the wall behind your bed or sofa. It creates a natural focal point and makes the room feel intentionally designed.

## 2. Swap Out All Door Hardware

**Cost: $3-8 per handle**

**The Impact:** This tiny change feels like a full renovation.

Replace builder-grade brass or chrome handles with modern matte black, brushed gold, or sleek silver hardware throughout your home.

**Budget Breakdown:**
- 10 interior doors × $5 per handle = $50
- Takes 30 minutes total
- Looks like you spent thousands

## 3. Update Light Fixtures

**Cost: $30-100 each**

**The Impact:** Lighting is jewelry for your home.

Replace the basic builder fixtures with statement pieces: pendant lights over kitchen island, chandelier in dining area, modern flush mount in bedrooms.

**Where to Find Deals:** Wayfair (always on sale), Facebook Marketplace (gently used designer pieces), Target's Project 62 line.

## 4. Add Peel-and-Stick Backsplash

**Cost: $25-50**

**The Impact:** Instant kitchen upgrade, zero commitment.

Peel-and-stick tiles have come a LONG way. They look real, stick well, and you can take them with you when you move.

**Best Styles:** White subway tile (classic), Marble hexagon (upscale), Moroccan pattern (bold).

## 5. Install Floating Shelves

**Cost: $20-40 per shelf**

**The Impact:** Storage + style in one.

Replace clunky bookcases with sleek floating shelves. Perfect for kitchen (mugs, cookbooks, plants), bathroom (towels, pretty bottles), living room (books, candles, photos).

**Styling Secret:** Group items in odd numbers (3 or 5) and vary heights for a designer look.

## 6. Upgrade Your Shower Curtain

**Cost: $25-50**

**The Impact:** Your bathroom goes from dorm room to boutique hotel.

Ditch the plastic liner-only look. A fabric shower curtain in a bold pattern or luxe solid color completely transforms your bathroom.

**Bonus:** Add a curved shower rod ($20) to make your shower feel twice as big.

## 7. Frame Your Art

**Cost: $10-30 per frame**

**The Impact:** Bare walls → gallery vibes.

You don't need expensive art. Print your own photos, free art from museums (many offer downloads), or botanical prints from Etsy.

**Layout Tip:** Create a gallery wall with 5-7 frames of varying sizes. Use painter's tape to plan the layout before hammering.

## 8. Add Plants (Lots of Them)

**Cost: $10-20 per plant**

**The Impact:** Life, literally.

Plants make any space feel more expensive and inviting. Start with these low-maintenance winners: Pothos (trails beautifully, hard to kill), Snake plant (modern, needs water once a month), Fiddle leaf fig (statement piece for corners).

**Shopping Hack:** Buy small plants from Trader Joe's ($5-15) and let them grow into your space.

## 9. Upgrade Cabinet Pulls

**Cost: $2-5 each**

**The Impact:** Kitchen facelift for $50.

If you can't afford new cabinets, change the hardware. Swap outdated pulls for brass cup pulls (vintage charm), leather pulls (Scandinavian chic), or matte black bars (modern farmhouse).

## 10. Layer Your Lighting

**Cost: $40-100**

**The Impact:** Your home feels warm and lived-in.

Overhead lighting alone is harsh. Add table lamps (thrift stores = $10-20), floor lamp in dark corners ($40-60), and string lights or LED strips ($15-30).

**Designer Secret:** Aim for 3 light sources per room. It creates depth and mood.

## The Total Investment

If you did ALL 10 changes: Low end ~$350, High end ~$650.

But here's the secret: **You don't need to do them all at once.** Pick 2-3 that excite you most. Live with them. Then add more when you're ready.

## Your First Home Deserves This

Remember: This is YOUR space. Not your landlord's. Not your parents'. **Yours.**

You can paint the walls. Drill holes. Swap hardware. Make it beautiful in whatever way speaks to you.

Every change—no matter how small—is you putting your stamp on this place. And that's what makes a house feel like home.
    `
  },
  'finding-the-one-dream-home': {
    title: "How to Know When You've Found 'The One' (Your Dream Home)",
    category: "first-time-buyers",
    excerpt: "Forget the checklist. Here's how to know when you've found the house that's meant to be yours.",
    date: "December 8, 2024",
    readTime: "4 min",
    author: "Kerry Lee Hartley",
    content: `# How to Know When You've Found "The One" (Your Dream Home)

You walk through the front door, and something shifts. Your real estate agent is talking about square footage and the upgraded HVAC system, but you're not really listening. You're imagining your coffee mug on that kitchen counter. Your dog napping in that patch of sunlight. Holiday dinner around that table.

**You just know.**

## The Checklist vs. The Feeling

Sure, you came prepared with your list: 3 bedrooms, updated kitchen, good school district, walkable neighborhood.

But here's what no one tells you about finding your first home: **The house that checks every box might feel like nothing. And the house that's missing half your must-haves might feel like everything.**

## 7 Signs You've Found "The One"

### 1. You Stop Comparing

When you find *your* house, comparisons fall away. You're not thinking about the granite countertops in House #4 or the bigger backyard in House #7. You're just... home.

### 2. You Can See Your Life There

You're already mentally decorating. Planning where furniture will go. Imagining Sunday mornings. Your brain starts building memories in this space before you've even made an offer.

### 3. You Feel Calm (Not Excited)

Finding your home isn't always a heart-racing, jump-up-and-down moment. Sometimes it's quieter. It's the feeling of *finally*. Like finding the puzzle piece that fits perfectly.

### 4. The Flaws Don't Bother You

When it's *your* house, imperfections become projects, not problems. "The bathroom tile is outdated." → "Ooh, I could do peel-and-stick tiles there!"

### 5. You're Scared to Love It

You catch yourself thinking: "Don't get too attached. What if someone else gets it?" That fear? That's how you know it matters.

### 6. Your People Feel It Too

Watch their face when you walk in. If your partner, parent, or best friend gets that look—you know the one—pay attention.

### 7. You Can't Stop Thinking About It

You've looked at 15 houses. You barely remember most of them. But this one? You remember the way the afternoon light hit the living room floor. The reading nook in the corner. **You're already in love.**

## But What About the Logical Stuff?

Here's the thing: **Both matter.** Your gut feeling AND the numbers need to align.

A house can feel perfect and still be the wrong choice if you can't afford it comfortably, the inspection reveals major issues, or it's in the wrong location for your life.

The magic happens when the numbers work, the inspection is clean, the location fits your lifestyle, **AND it feels like home.**`
  },
  'apartment-to-home-transformation': {
    title: "From Apartment to Home: Your Transformation Story",
    category: "first-time-buyers",
    excerpt: "More than just moving boxes and changing addresses—this is the emotional journey from renter to homeowner.",
    date: "December 6, 2024",
    readTime: "5 min",
    author: "Kerry Lee Hartley",
    content: `# From Apartment to Home: Your Transformation Story

There's a moment—usually happens in month two or three—when it hits you. You're standing in your kitchen, maybe making coffee on a Tuesday morning, and you suddenly realize: **This is mine.**

Not "mine for as long as the lease lasts." Not "mine unless the landlord decides to sell." **Just... mine.**

That's when the transformation truly begins.`
  },
  'magic-of-homeownership': {
    title: "The Magic of Homeownership: What No One Tells You",
    category: "first-time-buyers",
    excerpt: "Beyond the investment and the equity—these are the small, magical moments of owning your first home.",
    date: "December 4, 2024",
    readTime: "3 min",
    author: "Kerry Lee Hartley",
    content: `# The Magic of Homeownership: What No One Tells You

Everyone talks about building equity. The investment. The tax benefits. The stability. **All true. All important.**

But no one tells you about the magic.`
  }
}

export default function BlogPost({ params }: { params: Promise<{ slug: string }> }) {
  const [post, setPost] = useState<BlogPost | null>(null)
  const [loading, setLoading] = useState(true)
  const [slug, setSlug] = useState<string>('')
  const [activeSection, setActiveSection] = useState<string>('')

  useEffect(() => {
    params.then((resolvedParams) => {
      setSlug(resolvedParams.slug)
      const foundPost = BLOG_POSTS[resolvedParams.slug]
      setPost(foundPost || null)
      setLoading(false)
    })
  }, [])

  // Extract headers for table of contents
  const getTableOfContents = (content: string) => {
    const headers = content.match(/^##\s+(.+)$/gm) || []
    return headers.map(h => h.replace('## ', '').trim())
  }

  if (loading) {
    return (
      <main className="min-h-screen bg-gradient-to-br from-[#FAF9F6] to-[#F5F1E8] flex items-center justify-center">
        <div className="text-2xl text-gray-800">Loading...</div>
      </main>
    )
  }

  if (!post) {
    return (
      <main className="min-h-screen bg-gradient-to-br from-[#FAF9F6] to-[#F5F1E8] flex items-center justify-center flex-col gap-4">
        <div className="text-2xl text-gray-800">Blog post not found</div>
        <Link href="/first-time-buyers" className="text-[#B8860B] hover:underline">
          Return to landing page
        </Link>
      </main>
    )
  }

  const tableOfContents = getTableOfContents(post.content)

  return (
    <main className="min-h-screen bg-gradient-to-br from-[#FAF9F6] to-[#F5F1E8]">
      {/* Sticky Back Button (Mobile) */}
      <div className="lg:hidden sticky top-0 z-50 bg-white/95 backdrop-blur-sm border-b border-gray-200 px-6 py-4">
        <Link 
          href="/first-time-buyers#blog"
          className="inline-flex items-center gap-2 text-gray-700 hover:text-[#B8860B] transition-colors font-medium"
        >
          <ArrowLeft className="w-5 h-5" />
          Back to Articles
        </Link>
      </div>

      {/* Main Content Container */}
      <div className="max-w-7xl mx-auto px-6 py-12 lg:py-20">
        <div className="grid lg:grid-cols-12 gap-12">
          
          {/* Table of Contents Sidebar (Desktop Only) */}
          <aside className="hidden lg:block lg:col-span-3">
            <div className="sticky top-24">
              {/* Back Button (Desktop) */}
              <Link 
                href="/first-time-buyers#blog"
                className="inline-flex items-center gap-2 text-gray-700 hover:text-[#B8860B] transition-colors font-medium mb-8"
              >
                <ArrowLeft className="w-5 h-5" />
                Back to Articles
              </Link>

              {/* Table of Contents */}
              <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
                <h3 className="font-bold text-gray-900 mb-4 text-sm uppercase tracking-wide">
                  In This Article
                </h3>
                <nav className="space-y-2">
                  {tableOfContents.map((header, index) => (
                    <a
                      key={index}
                      href={`#section-${index}`}
                      className="block text-sm text-gray-600 hover:text-[#B8860B] transition-colors py-1"
                    >
                      {header}
                    </a>
                  ))}
                </nav>
              </div>

              {/* Social Share (Desktop) */}
              <div className="mt-6 bg-white rounded-xl p-6 shadow-sm border border-gray-200">
                <h3 className="font-bold text-gray-900 mb-4 text-sm uppercase tracking-wide">
                  Share Article
                </h3>
                <div className="flex flex-col gap-2">
                  <button className="flex items-center gap-2 text-sm text-gray-600 hover:text-[#1877F2] transition-colors">
                    <Facebook className="w-4 h-4" />
                    Facebook
                  </button>
                  <button className="flex items-center gap-2 text-sm text-gray-600 hover:text-[#1DA1F2] transition-colors">
                    <Twitter className="w-4 h-4" />
                    Twitter
                  </button>
                  <button className="flex items-center gap-2 text-sm text-gray-600 hover:text-[#0A66C2] transition-colors">
                    <Linkedin className="w-4 h-4" />
                    LinkedIn
                  </button>
                  <button className="flex items-center gap-2 text-sm text-gray-600 hover:text-[#B8860B] transition-colors">
                    <Mail className="w-4 h-4" />
                    Email
                  </button>
                </div>
              </div>
            </div>
          </aside>

          {/* Article Content */}
          <article className="lg:col-span-9">
            {/* Header */}
            <header className="mb-12">
              <h1 className="text-4xl lg:text-5xl xl:text-6xl font-bold mb-6 leading-tight text-gray-900">
                {post.title}
              </h1>
              
              {/* Metadata - Better Aligned */}
              <div className="flex flex-wrap items-center gap-x-4 gap-y-2 text-gray-600">
                <span className="font-medium">{post.author}</span>
                <span className="text-gray-400">•</span>
                <time className="text-gray-600">{post.date}</time>
                <span className="text-gray-400">•</span>
                <span className="text-gray-600">{post.readTime} read</span>
              </div>
            </header>

            {/* Content - Improved Typography */}
            <div className="prose prose-lg max-w-none
              prose-headings:text-gray-900 prose-headings:font-bold prose-headings:tracking-tight
              prose-h1:text-4xl prose-h1:mb-6 prose-h1:leading-tight
              prose-h2:text-3xl prose-h2:mt-12 prose-h2:mb-4 prose-h2:pb-2 prose-h2:border-b prose-h2:border-gray-200
              prose-h3:text-2xl prose-h3:mt-8 prose-h3:mb-3 prose-h3:text-[#B8860B]
              prose-p:text-gray-700 prose-p:leading-relaxed prose-p:text-lg prose-p:mb-6
              prose-strong:text-gray-900 prose-strong:font-semibold
              prose-ul:text-gray-700 prose-ul:my-6 prose-ul:text-lg
              prose-li:my-2 prose-li:leading-relaxed
              prose-a:text-[#B8860B] prose-a:no-underline hover:prose-a:underline
              prose-blockquote:border-l-4 prose-blockquote:border-[#B8860B] prose-blockquote:pl-4 prose-blockquote:italic"
            >
              {post.content.split('\n').map((line, index) => {
                const trimmed = line.trim()
                
                // H2 Headers with anchor
                if (trimmed.startsWith('## ')) {
                  const text = trimmed.replace('## ', '')
                  const sectionIndex = tableOfContents.indexOf(text)
                  return (
                    <h2 key={index} id={`section-${sectionIndex}`}>
                      {text}
                    </h2>
                  )
                }
                // H3 Headers
                if (trimmed.startsWith('### ')) {
                  return <h3 key={index}>{trimmed.replace('### ', '')}</h3>
                }
                // H1 Headers
                if (trimmed.startsWith('# ')) {
                  return <h1 key={index}>{trimmed.replace('# ', '')}</h1>
                }
                // Bold text
                if (trimmed.includes('**')) {
                  const parts = trimmed.split('**')
                  return (
                    <p key={index}>
                      {parts.map((part, i) => 
                        i % 2 === 0 ? part : <strong key={i}>{part}</strong>
                      )}
                    </p>
                  )
                }
                // Bullet points
                if (trimmed.startsWith('- ')) {
                  return <li key={index}>{trimmed.replace('- ', '')}</li>
                }
                // Regular paragraph
                if (trimmed) {
                  return <p key={index}>{trimmed}</p>
                }
                // Empty line
                return <br key={index} />
              })}
            </div>

            {/* Social Share (Mobile) */}
            <div className="lg:hidden mt-12 p-6 bg-white rounded-xl shadow-sm border border-gray-200">
              <h3 className="font-bold text-gray-900 mb-4">Share this article</h3>
              <div className="flex gap-4">
                <button className="p-3 bg-[#1877F2] text-white rounded-lg hover:bg-[#166FE5] transition">
                  <Facebook className="w-5 h-5" />
                </button>
                <button className="p-3 bg-[#1DA1F2] text-white rounded-lg hover:bg-[#1A91DA] transition">
                  <Twitter className="w-5 h-5" />
                </button>
                <button className="p-3 bg-[#0A66C2] text-white rounded-lg hover:bg-[#095196] transition">
                  <Linkedin className="w-5 h-5" />
                </button>
                <button className="p-3 bg-[#B8860B] text-white rounded-lg hover:bg-[#9A7209] transition">
                  <Mail className="w-5 h-5" />
                </button>
              </div>
            </div>

            {/* CTA to Quiz */}
            <div className="mt-16 p-8 lg:p-12 bg-gradient-to-br from-[#FFD54F] to-[#FFAB91] rounded-2xl text-center shadow-lg">
              <h3 className="text-2xl lg:text-3xl font-bold mb-4 text-gray-900">
                Ready to Start Your Home Buying Journey?
              </h3>
              <p className="text-gray-800 mb-6 text-lg max-w-2xl mx-auto">
                Take our 60-second quiz to make sure you're not making any costly buyer mistakes.
              </p>
              <Link 
                href="/first-time-buyers#quiz"
                className="inline-block px-8 py-4 bg-gray-900 text-white font-bold rounded-full hover:bg-gray-800 transition-all hover:scale-105 shadow-xl"
              >
                Take the Quiz
              </Link>
            </div>

            {/* Related Posts */}
            <div className="mt-16">
              <h3 className="text-2xl font-bold mb-6 text-gray-900">More Articles You'll Love</h3>
              <div className="grid md:grid-cols-3 gap-6">
                {Object.entries(BLOG_POSTS)
                  .filter(([key]) => key !== slug)
                  .slice(0, 3)
                  .map(([key, relatedPost]) => (
                    <Link 
                      key={key}
                      href={`/blog/${key}`}
                      className="group bg-white rounded-xl p-6 shadow-sm border border-gray-200 hover:shadow-md transition-all"
                    >
                      <h4 className="font-bold text-gray-900 mb-2 group-hover:text-[#B8860B] transition-colors">
                        {relatedPost.title}
                      </h4>
                      <p className="text-sm text-gray-600 mb-3 line-clamp-2">
                        {relatedPost.excerpt}
                      </p>
                      <span className="text-sm text-[#B8860B] font-medium">
                        Read more →
                      </span>
                    </Link>
                  ))}
              </div>
            </div>
          </article>
        </div>
      </div>
    </main>
  )
}