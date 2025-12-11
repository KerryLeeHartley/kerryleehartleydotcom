import HeroSection from '@/components/funnel/HeroSection'
import VSLPlayer from '@/components/funnel/VSLPlayer'
import LeadForm from '@/components/funnel/LeadForm'
import JourneySection from '@/components/funnel/JourneySection'
import Navigation from '@/components/shared/Navigation'
import Footer from '@/components/shared/Footer'

export default function FirstTimeBuyersPage() {
  // This will eventually come from Supabase, but hardcoded for MVP
  const funnelId = 'first-time-buyers' // You'll get real UUID from database

  return (
    <>
      <Navigation />
      <main className="pt-20">
        {/* Hero Section */}
      <HeroSection
        headline="Your First Home Starts Here"
        subheadline="Everything you need. Questions answered."
        ctaText="Watch Free Video"
        ctaLink="#video"
        backgroundStyle="gradient"
      />

      {/* Journey Section */}
      <JourneySection />

      {/* VSL Section */}
      <div id="video">
        <VSLPlayer
          videoUrl="https://www.loom.com/embed/5ad645e8421c4f5b9f9bf85a9815ca3c"
          headline="Watch: Your Complete First-Time Home Buying Roadmap"
        />
      </div>

      {/* Lead Capture Form */}
      <LeadForm
        funnelId={funnelId}
        headline="Start Your Journey Today"
        subheadline="Get instant access to your personalized home buying resource. No credit card. No pressure. Just answers."
        ctaText="Get Started"
        showPhone={false}
      />

      {/* Trust Section */}
      <section className="section-dark">
        <div className="container-custom">
          <div className="text-center max-w-3xl mx-auto">
            <h2 className="heading-lg mb-6">
              Built on Trust, Powered by Experience
            </h2>
            <p className="text-body-large mb-12">
              This resource was created by a licensed realtor who's helped hundreds of first-time buyers navigate the Atlanta market. 
              No sales pitch. Just the answers you've been looking for.
            </p>

            <div className="grid md:grid-cols-3 gap-8 mt-16">
              <div className="card-dark hover:scale-105 transition-transform duration-300">
                <div className="text-luxury-gold text-4xl mb-4">100+</div>
                <h3 className="text-xl font-bold mb-2">First-Time Buyers</h3>
                <p className="text-luxury-gray text-sm">Successfully guided to homeownership</p>
              </div>
              
              <div className="card-dark hover:scale-105 transition-transform duration-300">
                <div className="text-luxury-gold text-4xl mb-4">100%</div>
                <h3 className="text-xl font-bold mb-2">Free Resource</h3>
                <p className="text-luxury-gray text-sm">No hidden fees, no credit card needed</p>
              </div>
              
              <div className="card-dark hover:scale-105 transition-transform duration-300">
                <div className="text-luxury-gold text-4xl mb-4">24/7</div>
                <h3 className="text-xl font-bold mb-2">Always Available</h3>
                <p className="text-luxury-gray text-sm">Learn at your own pace, on your schedule</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="section bg-luxury-neutral">
        <div className="container-custom">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="heading-xl mb-6">
              Your First Home Starts Here
            </h2>
            <p className="text-body-large mb-8">
              Join hundreds of Atlanta first-time buyers who started their journey with the right information and guidance.
            </p>
            <a href="#video" className="btn-primary text-lg inline-block">
              Watch the Video
            </a>
          </div>
        </div>
      </section>
    </main>
    <Footer />
    </>
  )
}
