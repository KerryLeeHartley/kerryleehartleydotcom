# VSL FUNNEL BUILDER - COMPLETE SETUP GUIDE

**Project:** vsl-funnel-system-builder  
**Version:** 1.0.0  
**Author:** Kerry Lee Hartly  
**Last Updated:** December 2024

---

## TABLE OF CONTENTS

1. Quick Start Checklist
2. Supabase Setup (5 minutes)
3. Vercel Deployment (5 minutes)
4. Domain Configuration (10 minutes)
5. Google Tag Manager Setup (5 minutes)
6. Analytics Setup (10 minutes)
7. Customizing Your Funnel (15 minutes)
8. Testing Everything (10 minutes)
9. Going Live (5 minutes)
10. Troubleshooting

**Total Setup Time: ~60 minutes**

---

## 1. QUICK START CHECKLIST

Before you begin, make sure you have:

- [ ] GitHub account
- [ ] Vercel account (sign up with GitHub at vercel.com)
- [ ] Supabase account (sign up at supabase.com)
- [ ] GoDaddy access (to update DNS)
- [ ] Google Tag Manager account
- [ ] Loom video recorded (or placeholder video)
- [ ] Code downloaded from ZIP file

---

## 2. SUPABASE SETUP

### Step 1: Create Supabase Project

1. Go to https://supabase.com
2. Click "Start your project"
3. Create new project:
   - **Name:** vsl-funnel-system-builder
   - **Database Password:** (save this somewhere safe)
   - **Region:** Choose closest to you (e.g., US East)
4. Click "Create new project"
5. Wait 2-3 minutes for project to initialize

### Step 2: Run Database Schema

1. In Supabase dashboard, click "SQL Editor" in left sidebar
2. Click "New query"
3. Open the file `supabase-schema.sql` from your download
4. Copy ALL the SQL code
5. Paste into Supabase SQL Editor
6. Click "RUN" button (bottom right)
7. You should see: "Success. No rows returned"

### Step 3: Get Your API Credentials

1. Click "Settings" (gear icon) in left sidebar
2. Click "API" under Project Settings
3. Find these two values:

**Project URL:**
```
https://xxxxxxxxxxxxx.supabase.co
```

**anon/public key:**
```
eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJl...
```

4. Save these values - you'll need them in Step 5

### Step 4: Verify Database Tables

1. Click "Table Editor" in left sidebar
2. You should see 4 tables:
   - funnels
   - pages
   - leads
   - events
3. If you see all 4, you're good! ✅

---

## 3. VERCEL DEPLOYMENT

### Step 1: Push Code to GitHub

1. Unzip the project files
2. Open Terminal/Command Prompt
3. Navigate to project folder:
   ```bash
   cd path/to/vsl-funnel-builder
   ```
4. Initialize Git:
   ```bash
   git init
   git add .
   git commit -m "Initial commit"
   git branch -M main
   ```
5. Create new GitHub repository at https://github.com/new
   - Name: vsl-funnel-builder
   - Private repository
   - Don't add README, .gitignore, or license
6. Connect and push:
   ```bash
   git remote add origin https://github.com/YOUR_USERNAME/vsl-funnel-builder.git
   git push -u origin main
   ```

### Step 2: Deploy to Vercel

1. Go to https://vercel.com
2. Click "Add New..." → "Project"
3. Import your GitHub repository (vsl-funnel-builder)
4. Configure project:
   - **Framework Preset:** Next.js
   - **Root Directory:** ./
   - **Build Command:** (leave default)
   - **Output Directory:** (leave default)

### Step 3: Add Environment Variables

In Vercel deployment screen, expand "Environment Variables" section.

Add these 3 variables:

**Variable 1:**
- Name: `NEXT_PUBLIC_SUPABASE_URL`
- Value: (paste your Supabase Project URL from Step 2)

**Variable 2:**
- Name: `NEXT_PUBLIC_SUPABASE_ANON_KEY`
- Value: (paste your Supabase anon key from Step 2)

**Variable 3:**
- Name: `NEXT_PUBLIC_GTM_ID`
- Value: (leave blank for now, we'll add this in Step 5)

**Variable 4:**
- Name: `NEXT_PUBLIC_SITE_URL`
- Value: `https://kerryleehartly.com`

### Step 4: Deploy

1. Click "Deploy"
2. Wait 2-3 minutes for build to complete
3. You'll see "Congratulations!" when done
4. Click "Visit" to see your funnel live
5. You'll get a URL like: `https://vsl-funnel-builder-xxxxx.vercel.app`

---

## 4. DOMAIN CONFIGURATION

### Step 1: Add Custom Domain in Vercel

1. In Vercel project dashboard, click "Settings"
2. Click "Domains" in left sidebar
3. Enter your domain: `kerryleehartly.com`
4. Click "Add"
5. Vercel will show you DNS records to add

### Step 2: Update DNS in GoDaddy

1. Log in to GoDaddy
2. Go to "My Products"
3. Click "DNS" next to kerryleehartly.com
4. Add these records (provided by Vercel):

**Record 1: A Record**
- Type: A
- Name: @
- Value: (IP address from Vercel)
- TTL: 1 hour

**Record 2: CNAME Record**
- Type: CNAME
- Name: www
- Value: cname.vercel-dns.com
- TTL: 1 hour

5. Click "Save"
6. Wait 10-60 minutes for DNS propagation

### Step 3: Verify Domain

1. Go back to Vercel → Settings → Domains
2. Wait for "Valid Configuration" checkmark ✅
3. Once verified, your funnel is live at kerryleehartly.com!

---

## 5. GOOGLE TAG MANAGER SETUP

### Step 1: Create GTM Container

1. Go to https://tagmanager.google.com
2. Click "Create Account"
3. Fill in:
   - **Account Name:** Kerry Lee Hartly
   - **Country:** United States
   - **Container Name:** Kerry Lee Hartly Funnels
   - **Target Platform:** Web
4. Click "Create"
5. Accept Terms of Service
6. **COPY YOUR CONTAINER ID** (looks like: GTM-XXXXXXX)

### Step 2: Add GTM ID to Vercel

1. Go to Vercel project dashboard
2. Click "Settings" → "Environment Variables"
3. Find `NEXT_PUBLIC_GTM_ID`
4. Click "Edit"
5. Paste your Container ID: `GTM-XXXXXXX`
6. Click "Save"
7. Click "Redeploy" in Vercel to apply changes

### Step 3: Verify GTM Installation

1. Go to your live site: kerryleehartly.com/first-time-buyers
2. Right-click → "Inspect" → "Console" tab
3. Type: `dataLayer`
4. You should see an array with data ✅

---

## 6. ANALYTICS SETUP

### Step 1: Set Up Google Analytics 4

1. Go to https://analytics.google.com
2. Click "Admin" (bottom left)
3. Click "Create Property"
4. Fill in:
   - **Property name:** Kerry Lee Hartly Funnels
   - **Time zone:** Your time zone
   - **Currency:** USD
5. Click "Next" → "Create"
6. **COPY YOUR MEASUREMENT ID** (looks like: G-XXXXXXXXX)

### Step 2: Add GA4 Tag in GTM

1. Go back to Google Tag Manager
2. Click "Tags" → "New"
3. Click "Tag Configuration" → "Google Analytics: GA4 Configuration"
4. Paste your Measurement ID: `G-XXXXXXXXX`
5. Click "Triggering" → Select "All Pages"
6. Name tag: "GA4 - All Pages"
7. Click "Save"
8. Click "Submit" → "Publish"

### Step 3: Set Up Facebook Pixel

1. Go to https://business.facebook.com
2. Click "Events Manager"
3. Click "Connect Data Sources" → "Web" → "Meta Pixel"
4. Name your pixel: "Kerry Lee Hartly Funnel"
5. **COPY YOUR PIXEL ID** (looks like: 1234567890)
6. In GTM, create new tag:
   - Tag Type: Custom HTML
   - Paste Facebook Pixel code (from Facebook)
   - Trigger: All Pages
   - Save and Publish

### Step 4: Test Analytics

1. Go to your live funnel
2. Scroll down, fill out form
3. Check Google Analytics → Realtime → See yourself ✅
4. Check Facebook Events Manager → See test event ✅

---

## 7. CUSTOMIZING YOUR FUNNEL

### Step 1: Update Video URL

1. Record your Loom video
2. Copy share link (e.g., `https://www.loom.com/share/abc123xyz`)
3. Open project in VS Code
4. Open: `app/first-time-buyers/page.tsx`
5. Find line 88:
   ```tsx
   videoUrl="https://www.loom.com/share/YOUR_VIDEO_ID_HERE"
   ```
6. Replace with your Loom URL
7. Save file

### Step 2: Update Course URL

1. Get your Odoo course URL
2. In same file, find line 47:
   ```tsx
   course_url: 'https://course.kerryleehartly.com/first-time-buyers'
   ```
3. Replace with your actual course URL
4. Save file

### Step 3: Update Headlines

Edit these lines in `app/first-time-buyers/page.tsx`:

**Line 138 - Hero Headline:**
```tsx
headline="Your Custom Headline Here"
```

**Line 139 - Hero Subheadline:**
```tsx
subheadline="Your custom subheadline here..."
```

**Line 146 - VSL Headline:**
```tsx
headline="Your Video Section Headline"
```

**Line 147 - VSL Description:**
```tsx
description="Your video description..."
```

### Step 4: Add Your Canva Images

1. Export image from Canva as PNG (high quality)
2. Name it: `hero-background.png`
3. Place in: `public/images/` folder
4. Add to Hero component:
   ```tsx
   <Hero
     backgroundImage="/images/hero-background.png"
     ...
   />
   ```

### Step 5: Deploy Changes

```bash
git add .
git commit -m "Updated copy and video URL"
git push
```

Vercel will auto-deploy in 2-3 minutes!

---

## 8. TESTING EVERYTHING

### Checklist

Go through your funnel and test:

- [ ] Page loads on desktop
- [ ] Page loads on mobile
- [ ] Video plays (Loom embed works)
- [ ] Form accepts email and name
- [ ] Form submission shows success
- [ ] Confirmation page shows
- [ ] Course link works
- [ ] Analytics shows in Google Analytics
- [ ] Event shows in GTM Preview mode
- [ ] Lead appears in Supabase (Table Editor → leads)

### How to Test Form Submission

1. Go to your live funnel
2. Fill out form with test email
3. Submit form
4. Should redirect to confirmation page
5. Check Supabase:
   - Go to Table Editor → leads
   - See your test lead ✅

---

## 9. GOING LIVE

### Pre-Launch Checklist

- [ ] Video is final version (not placeholder)
- [ ] All copy is proofread
- [ ] Images are optimized (<500KB each)
- [ ] Course URL is correct
- [ ] Analytics is tracking
- [ ] Form submissions work
- [ ] Mobile responsive (test on phone)
- [ ] Confirmation email works (if set up)

### Launch!

1. Share URL: `kerryleehartly.com/first-time-buyers`
2. Test on multiple devices
3. Monitor Supabase for leads
4. Check Google Analytics daily

### Post-Launch

**First 24 Hours:**
- Check analytics every few hours
- Verify form submissions are saving
- Test on different browsers

**First Week:**
- Export leads from Supabase
- Upload to Odoo manually
- Track conversion rate

**Ongoing:**
- A/B test different headlines
- Try different video scripts
- Optimize based on data

---

## 10. TROUBLESHOOTING

### "Supabase client error"

**Problem:** Form won't submit, console shows Supabase error

**Solution:**
1. Check `.env.local` file exists
2. Verify Supabase URL and Key are correct
3. Redeploy in Vercel
4. Clear browser cache

### "Video won't play"

**Problem:** Loom video doesn't show

**Solution:**
1. Verify Loom URL is correct (should have `/share/` or `/embed/`)
2. Check video privacy settings in Loom
3. Try different video URL format

### "GTM not tracking"

**Problem:** Events not showing in Google Analytics

**Solution:**
1. Use GTM Preview mode to debug
2. Check Container ID is correct
3. Verify GA4 tag is published in GTM
4. Wait 24-48 hours for data to appear

### "Domain not working"

**Problem:** kerryleehartly.com shows error

**Solution:**
1. Wait 30-60 minutes for DNS propagation
2. Verify DNS records in GoDaddy match Vercel's
3. Try incognito/private browsing
4. Clear DNS cache: `ipconfig /flushdns` (Windows) or `sudo dscacheutil -flushcache` (Mac)

### "Form not submitting"

**Problem:** Submit button does nothing

**Solution:**
1. Check browser console for errors
2. Verify funnel_id and page_id are generated
3. Check Supabase RLS policies
4. Test with incognito mode

---

## NEED HELP?

### Resources

- Supabase Docs: https://supabase.com/docs
- Vercel Docs: https://vercel.com/docs
- Next.js Docs: https://nextjs.org/docs
- GTM Docs: https://support.google.com/tagmanager

### Contact

Email: support@kerryleehartly.com

---

## NEXT STEPS

Once your first funnel is live and working:

1. **Create second funnel** (luxury-listings)
2. **Set up email automation** (Odoo or Mailchimp)
3. **Add Zapier integration** (auto-sync leads to Odoo)
4. **Build analytics dashboard** (aggregate data in Supabase)
5. **A/B test variations** (different headlines, videos)

---

**Congratulations! Your VSL funnel is live! 🎉**
