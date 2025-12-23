// Dynamic application page with custom navigation and event tracking
// Fixed for Next.js 15 async params

import { notFound } from 'next/navigation'
import Image from 'next/image'
import VideoHero from '@/components/apply/VideoHero'
import InteractiveResume from '@/components/apply/InteractiveResume'
import ProjectShowcase from '@/components/apply/ProjectShowcase'
import CalendlyCTA from '@/components/apply/CalendlyCTA'
import ScrollTracker from '@/components/apply/ScrollTracker'
import HobbiesSection from '@/components/apply/HobbiesSection'

// Import application data
import airbnbData from '@/data/applications/airbnb.json'

// Map of available applications
const applications: Record<string, any> = {
  'airbnb': airbnbData,
  // Add more as you create them:
  // 'salesforce': salesforceData,
  // 'stripe': stripeData,
}

// ============================================================================
// CUSTOM NAVIGATION - Client Component
// ============================================================================
import ApplyNavigation from '@/components/apply/ApplyNavigation'

// ============================================================================
// MAIN PAGE COMPONENT - Fixed for Next.js 15
// ============================================================================
export default async function ApplyPage({ 
  params 
}: { 
  params: Promise<{ company: string }> 
}) {
  // Await params in Next.js 15
  const { company } = await params
  const appData = applications[company]
  
  if (!appData) {
    notFound()
  }

  return (
    <>
      {/* Custom Navigation */}
      <ApplyNavigation company={appData.company} />

      {/* Main Content */}
      <main className="pt-20 bg-black">
        {/* Video Hero */}
        <VideoHero
          videoUrl={appData.videoUrl}
          headline={appData.heroHeadline}
          subtext={appData.heroSubtext}
          company={appData.company}
          jobPostingUrl={appData.jobPostingUrl}
          additionalRoles={appData.additionalRoles}
        />

        {/* Interactive Resume */}
        <InteractiveResume
          experience={appData.experience}
          skills={appData.skills}
          keyWins={appData.keyWins}
        />

        {/* Project Showcase */}
        <ProjectShowcase projects={appData.projects} />

        {/* Hobbies Section */}
        <HobbiesSection />

        {/* Calendly CTA */}
        <CalendlyCTA
          contact={appData.contact}
          downloads={appData.downloads}
          company={appData.company}
        />
        
        {/* Scroll Tracking */}
        <ScrollTracker company={appData.company} />
      </main>
    </>
  )
}