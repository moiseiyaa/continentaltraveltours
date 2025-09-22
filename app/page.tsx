import { Navbar } from "@/components/navbar"
import { HeroSection } from "@/components/hero-section"
import AboutSection from "@/components/about-section"
import { FeaturedTours } from "@/components/featured-tours"
import { ExperiencesSection } from "@/components/experiences-section"
import { GallerySection } from "@/components/gallery-section"
import { TestimonialsSection } from "@/components/testimonials-section"
import { CTABanner } from "@/components/cta-banner"
import { Footer } from "@/components/footer"

export default function Home() {
  return (
    <main className="min-h-screen">
      <Navbar />
      <HeroSection />
      <AboutSection />
      <FeaturedTours />
      <ExperiencesSection />
      <GallerySection />
      <TestimonialsSection />
      <CTABanner />
      <Footer />
    </main>
  )
}
