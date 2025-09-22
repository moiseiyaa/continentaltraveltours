import PageHeader from "@/components/page-header"
import AboutSection from "@/components/about-section"

export default function AboutPage() {
  return (
    <main>
      <PageHeader
        title="About Continental Travel & Tours"
        subtitle="Discover Rwanda and East Africa with local expertise and personalized service"
        backgroundImage="/about-page-header-bg.jpg"
        breadcrumb={[
          { label: "Home", href: "/" },
          { label: "About", href: "/about" },
        ]}
      />

      <div className="py-16 lg:py-24">
        <AboutSection />
      </div>

      {/* Additional About Content */}
      <section className="bg-muted/30 py-16 lg:py-24">
        <div className="container-max section-padding">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
            <div>
              <h2 className="text-3xl lg:text-4xl font-bold text-foreground mb-6">Our Story</h2>
              <div className="space-y-4 text-muted-foreground leading-relaxed">
                <p>
                  Founded in 2015, Continental Travel & Tours emerged from a passion for showcasing the incredible
                  beauty and rich culture of Rwanda and East Africa. Our founders, born and raised in Kigali, recognized
                  the need for authentic, locally-guided travel experiences that go beyond typical tourist attractions.
                </p>
                <p>
                  Over the years, we've grown from a small local operation to one of Rwanda's most trusted travel
                  companies, while maintaining our commitment to personalized service and sustainable tourism practices
                  that benefit local communities.
                </p>
                <p>
                  Today, we're proud to have facilitated unforgettable journeys for over 1,200 travelers from around the
                  world, each leaving with a deeper appreciation for the Land of a Thousand Hills.
                </p>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="bg-white rounded-xl p-6 text-center shadow-sm">
                <div className="text-3xl font-bold text-primary mb-2">8+</div>
                <div className="text-sm text-muted-foreground">Years Experience</div>
              </div>
              <div className="bg-white rounded-xl p-6 text-center shadow-sm">
                <div className="text-3xl font-bold text-primary mb-2">1,200+</div>
                <div className="text-sm text-muted-foreground">Happy Travelers</div>
              </div>
              <div className="bg-white rounded-xl p-6 text-center shadow-sm">
                <div className="text-3xl font-bold text-primary mb-2">50+</div>
                <div className="text-sm text-muted-foreground">Tour Packages</div>
              </div>
              <div className="bg-white rounded-xl p-6 text-center shadow-sm">
                <div className="text-3xl font-bold text-primary mb-2">15+</div>
                <div className="text-sm text-muted-foreground">Destinations</div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  )
}
