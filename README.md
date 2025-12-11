# 🚀 VSL FUNNEL BUILDER

A custom VSL (Video Sales Letter) funnel system built for real estate lead qualification and education.

## 📋 Project Overview

**Built for:** Kerry Lee Hartly - Real Estate Professional  
**Purpose:** Automate lead qualification and education through VSL funnels  
**Tech Stack:** Next.js 15, Supabase, TypeScript, Tailwind CSS, Framer Motion  
**First Funnel:** First-Time Home Buyers  

---

## 🎨 Design System

### Color Palette: "Quiet Luxury"
- **Primary Black:** `#000000` - Premium backdrop
- **Pure White:** `#FFFFFF` - Clean contrast
- **Luxury Gold:** `#D4AF37` - Accent for trust/value
- **Luxury Blue:** `#3B82F6` - Trust and energy
- **Luxury Rose:** `#EC4899` - Warmth (female audience appeal)
- **Neutral:** `#F8F9FA` - Soft backgrounds
- **Text Gray:** `#6B7280` - Body text

### Typography
- **Font Family:** Inter (all weights)
- **Headings:** 700-800 weight (bold, modern)
- **Body:** 400-500 weight (clean, readable)

---

## 🛠️ Quick Start

### Prerequisites
- Node.js 18+ installed
- Supabase account
- Vercel account (for deployment)
- Google Tag Manager account
- Domain access (GoDaddy)

### 1. Install Dependencies

```bash
npm install
```

### 2. Set Up Supabase

1. Go to [supabase.com](https://supabase.com)
2. Create new project: **`vsl-funnel-system-builder`**
3. Go to SQL Editor
4. Copy/paste entire contents of `supabase-schema.sql`
5. Run the SQL
6. Go to Settings > API
7. Copy your Project URL and anon key

### 3. Configure Environment Variables

Create `.env.local` file:

```bash
cp .env.example .env.local
```

Edit `.env.local` with your credentials:

```env
NEXT_PUBLIC_SUPABASE_URL=https://xxxxx.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJxxx...
NEXT_PUBLIC_GTM_ID=GTM-XXXXXXX
NEXT_PUBLIC_SITE_URL=https://kerryleehartly.com
```

### 4. Run Development Server

```bash
npm run dev
```

Visit: `http://localhost:3000/first-time-buyers`

---

## 📁 Project Structure

```
vsl-funnel-builder/
├── app/
│   ├── first-time-buyers/      # Main funnel page
│   ├── confirmation/           # Thank you page
│   ├── api/leads/             # Lead submission API
│   ├── layout.tsx             # Root layout (GTM here)
│   └── globals.css            # Design system
├── components/
│   ├── funnel/
│   │   ├── HeroSection.tsx    # Hero with CTA
│   │   ├── VSLPlayer.tsx      # Loom video embed
│   │   └── LeadForm.tsx       # Email capture form
│   └── shared/                # Reusable components
├── lib/
│   └── supabase.ts            # Database client
├── public/                    # Static assets
├── supabase-schema.sql        # Database schema
└── .env.example               # Environment template
```

---

## 🎬 Customization Guide

### Update Video URL

Edit `/app/first-time-buyers/page.tsx`:

```tsx
<VSLPlayer
  videoUrl="https://www.loom.com/embed/YOUR_VIDEO_ID"
  headline="Your Custom Headline"
/>
```

### Change Funnel Content

Edit `/app/first-time-buyers/page.tsx`:

```tsx
<HeroSection
  headline="Your Custom Headline"
  subheadline="Your custom subheadline"
  ctaText="Your CTA Button Text"
  ctaLink="#video"
/>
```

### Customize Colors

Edit `/tailwind.config.js` in the `theme.extend.colors` section.

### Update Course URL

Edit `/app/confirmation/page.tsx`:

```tsx
<a href="https://course.kerryleehartly.com/your-course">
  Access Course Now →
</a>
```

---

## 📊 Analytics Setup

### Google Tag Manager

1. Go to [tagmanager.google.com](https://tagmanager.google.com)
2. Create container: "Kerry Lee Hartly Funnels"
3. Copy Container ID (`GTM-XXXXXXX`)
4. Add to `.env.local`
5. Install GTM in your container:
   - **Google Analytics 4**
   - **Facebook Pixel**
   - **LinkedIn Insight Tag** (optional)

### Tracked Events

The funnel automatically tracks:
- `page_view` - When someone lands on funnel
- `video_view` - When someone views VSL
- `form_submit` - When someone submits email
- `course_click` - When someone clicks course link
- `conversion` - When someone reaches confirmation page

### View Analytics

- **Google Analytics:** Real-time traffic, conversions
- **Supabase:** leads table for all captured leads
- **Vercel Analytics:** Page views, performance

---

## 🚀 Deployment to Vercel

### 1. Push to GitHub

```bash
git init
git add .
git commit -m "Initial commit: VSL Funnel Builder"
git branch -M main
git remote add origin https://github.com/YOUR_USERNAME/vsl-funnel-builder.git
git push -u origin main
```

### 2. Deploy to Vercel

1. Go to [vercel.com](https://vercel.com)
2. Click "Add New Project"
3. Import your GitHub repo
4. Add Environment Variables:
   - `NEXT_PUBLIC_SUPABASE_URL`
   - `NEXT_PUBLIC_SUPABASE_ANON_KEY`
   - `NEXT_PUBLIC_GTM_ID`
   - `NEXT_PUBLIC_SITE_URL`
5. Click "Deploy"

### 3. Configure Custom Domain

1. In Vercel project settings, go to "Domains"
2. Add: `kerryleehartly.com`
3. Copy the DNS records
4. Go to GoDaddy DNS settings
5. Add Vercel's DNS records:
   - **A Record:** `76.76.21.21`
   - **CNAME:** `cname.vercel-dns.com`
6. Wait 24-48 hours for DNS propagation

---

## 📋 Database Management

### View Leads in Supabase

1. Go to Supabase dashboard
2. Click "Table Editor"
3. Select "leads" table
4. See all captured leads with UTM data

### Export Leads to CSV

1. In Supabase Table Editor
2. Click "Download" → Export as CSV
3. Upload to Odoo or email marketing tool

### Check Lead Quality

Query to find "hot" leads:

```sql
SELECT name, email, created_at, utm_source
FROM leads
WHERE funnel_id = 'first-time-buyers'
ORDER BY created_at DESC
LIMIT 50;
```

---

## 🔄 Creating Additional Funnels

### 1. Duplicate Funnel Page

```bash
cp -r app/first-time-buyers app/luxury-listings
```

### 2. Update Content

Edit `/app/luxury-listings/page.tsx` with new:
- Headlines
- Video URL
- Copy
- funnelId

### 3. Add to Database

Run in Supabase SQL Editor:

```sql
INSERT INTO funnels (name, slug, funnel_type, status, settings) VALUES (
  'Luxury Listings',
  'luxury-listings',
  'luxury',
  'published',
  '{
    "video_url": "https://www.loom.com/embed/YOUR_VIDEO_ID",
    "course_url": "https://course.kerryleehartly.com/luxury",
    "headline": "Your Luxury Headline",
    "subheadline": "Your luxury subheadline"
  }'::jsonb
);
```

### 4. Deploy

```bash
git add .
git commit -m "Add luxury listings funnel"
git push
```

Vercel auto-deploys!

---

## 🐛 Troubleshooting

### Forms Not Submitting

**Check:**
1. `.env.local` has correct Supabase credentials
2. Supabase Row Level Security policies are enabled
3. Browser console for errors

### Analytics Not Tracking

**Check:**
1. GTM Container ID in `.env.local`
2. GTM container is published (not draft)
3. GA4 tag is configured in GTM
4. Use Google Tag Assistant Chrome extension

### Video Not Loading

**Check:**
1. Loom video is set to "Public" or "Unlisted"
2. Embed URL format: `https://www.loom.com/embed/VIDEO_ID`
3. Not using share URL (different format)

---

## 📈 Success Metrics

Track these in Google Analytics:

- **Funnel Views:** How many people visit
- **Video Completion:** % who watch full video
- **Form Conversion:** % who submit email
- **Course Clicks:** % who access course
- **UTM Performance:** Which ads/sources convert best

---

## 🎯 Roadmap (Future Phases)

### Phase 2: Multiple Funnels
- Luxury listings funnel
- Builder/new construction funnel
- Fix & flip investor funnel
- Dashboard to manage all funnels

### Phase 3: Integrations
- Zapier → Odoo automation
- Email welcome sequences
- SMS notifications
- CRM scoring

### Phase 4: Advanced Features
- A/B testing variants
- Payment processing
- Advanced analytics dashboard
- Multi-user access

---

## 💡 Tips for Success

1. **Test on mobile first** - Most leads browse on phones
2. **Keep video short** - 3-5 minutes max
3. **Update content regularly** - Keep it fresh
4. **Monitor conversion rate** - Aim for 20%+ email capture
5. **Follow up fast** - Contact hot leads within 24 hours

---

## 🆘 Need Help?

- **Supabase Docs:** [supabase.com/docs](https://supabase.com/docs)
- **Next.js Docs:** [nextjs.org/docs](https://nextjs.org/docs)
- **Vercel Docs:** [vercel.com/docs](https://vercel.com/docs)
- **GTM Docs:** [tagmanager.google.com](https://tagmanager.google.com)

---

## 📝 License

Private project for Kerry Lee Hartly. Not for redistribution.

---

**Built with ❤️ by Kerry Lee Hartly**
