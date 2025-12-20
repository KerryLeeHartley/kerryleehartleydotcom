// Dynamic application page with custom navigation and hobbies
import { notFound } from 'next/navigation'
import Image from 'next/image'
import LoomVideoHero from '@/components/apply/LoomVideoHero'
import InteractiveResume from '@/components/apply/InteractiveResume'
import ProjectShowcase from '@/components/apply/ProjectShowcase'
import CalendlyCTA from '@/components/apply/CalendlyCTA'

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
// CUSTOM NAVIGATION - Apply Pages Only
// ============================================================================
function ApplyNavigation() {
  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-black/95 backdrop-blur-sm border-b border-white/10">
      <div className="max-w-7xl mx-auto px-6 lg:px-8 py-4 flex items-center justify-between">
        {/* Static Signature Logo - No Link */}
        <div className="relative w-32 h-12">
          <Image
            src="/BlackTransparent.png"
            alt="Kerry Lee Hartley"
            fill
            className="object-contain brightness-0 invert"
            priority
          />
        </div>

        {/* Book Call Button */}
        <a
          href="https://calendly.com/thekerryleehartley/chat"
          target="_blank"
          rel="noopener noreferrer"
          className="px-6 py-3 bg-white text-black font-semibold rounded-full hover:bg-gray-200 transition-colors text-sm md:text-base"
        >
          Book a Call
        </a>
      </div>
    </nav>
  )
}

// ============================================================================
// HOBBIES SECTION
// ============================================================================
interface HobbyCardProps {
  title: string
  image: string
  description: string
}

function HobbyCard({ title, image, description }: HobbyCardProps) {
  return (
    <div className="group relative overflow-hidden rounded-xl bg-zinc-900 border border-white/10">
      <div className="relative h-[500px]">
        <Image
          src={image}
          alt={title}
          fill
          className="object-cover object-top grayscale group-hover:grayscale-0 group-hover:scale-105 transition-all duration-500"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/60 to-transparent" />
        <div className="absolute bottom-0 left-0 right-0 p-6">
          <h3 className="text-2xl font-bold text-white mb-2 tracking-tight">{title}</h3>
          <p className="text-gray-300 text-sm leading-relaxed">{description}</p>
        </div>
      </div>
    </div>
  )
}

function HobbiesSection() {
  const hobbies = [
    {
      title: "Fishing",
      image: "/images/5DE1655C-1AB3-48BC-AE44-75F358EA605D.png",
      description: "Finding peace and strategy on the open water"
    },
    {
      title: "Golfing",
      image: "/images/IMG_1840.png",
      description: "Precision, patience, and the pursuit of excellence"
    },
    {
      title: "Running",
      image: "/images/IMG_7384.png",
      description: "Building endurance, one mile at a time"
    }
  ]

  return (
    <section className="py-24 bg-zinc-950">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-4 tracking-tight">
            Beyond the Boardroom
          </h2>
          <p className="text-gray-400 text-lg">
            Work hard. Play harder.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {hobbies.map((hobby, index) => (
            <HobbyCard key={index} {...hobby} />
          ))}
        </div>
      </div>
    </section>
  )
}

// ============================================================================
// MAIN PAGE COMPONENT
// ============================================================================
interface PageProps {
  params: Promise<{
    company: string
  }>
}

export default async function ApplyPage({ params }: PageProps) {
  const { company } = await params
  const appData = applications[company]

  // 404 if company not found
  if (!appData) {
    notFound()
  }

  return (
    <>
      {/* Custom Navigation - Static Logo + Book Call */}
      <ApplyNavigation />
      
      <main className="pt-20 bg-black">
        
        {/* Loom Video Hero */}
        <LoomVideoHero
          videoUrl={appData.videoUrl}
          headline={appData.heroHeadline}
          subtext={appData.heroSubtext}
          company={appData.company}
        />

        {/* Interactive Resume Timeline */}
        <InteractiveResume
          experience={appData.experience}
          skills={appData.skills}
          keyWins={appData.keyWins}
        />

        {/* Projects Showcase */}
        <ProjectShowcase
          projects={appData.projects}
        />

        {/* Hobbies Section */}
        <HobbiesSection />

        {/* Calendly CTA + Downloads (serves as footer) */}
        <CalendlyCTA
          contact={appData.contact}
          downloads={appData.downloads}
          company={appData.company}
        />

      </main>
      
      {/* No MainFooter - CalendlyCTA serves as footer */}
    </>
  )
}

// ============================================================================
// METADATA & STATIC GENERATION
// ============================================================================

// Generate metadata for SEO
export async function generateMetadata({ params }: PageProps) {
  const { company } = await params
  const appData = applications[company]

  if (!appData) {
    return {
      title: 'Application Not Found'
    }
  }

  return {
    title: `Kerry Hartley - ${appData.role} at ${appData.company}`,
    description: appData.heroSubtext,
  }
}

// Generate static paths for known companies
export async function generateStaticParams() {
  return Object.keys(applications).map((company) => ({
    company,
  }))
}