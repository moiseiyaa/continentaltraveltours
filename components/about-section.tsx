"use client"

import { CheckCircle, Users, Award, Globe } from "lucide-react"

export default function AboutSection() {
  const highlights = [
    { icon: Users, text: "Expert Local Guides" },
    { icon: Award, text: "15+ Years Experience" },
    { icon: Globe, text: "Sustainable Tourism" },
    { icon: CheckCircle, text: "100% Safety Record" },
  ]

  return (
    <section id="about" className="min-h-[75vh] bg-secondary/30 py-16 lg:py-24">
      <div className="container-max section-padding">
        <div className="lg:hidden mb-8">
          <h2 className="text-3xl font-bold text-foreground mb-4 text-balance">
            Discover the Heart of Africa with
            <span className="text-primary block">Continental Travel & Tours</span>
          </h2>
        </div>

        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Left: Image Collage */}
          <div className="relative">
            <div className="grid grid-cols-2 gap-4 h-[500px] lg:h-[600px]">
              {/* Main large image */}
              <div className="col-span-2 row-span-2 relative overflow-hidden rounded-xl">
                <img
                  src="/mountain-gorillas-in-rwanda-volcanoes-national-par.jpg"
                  alt="Mountain Gorillas in Rwanda"
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
              </div>

              {/* Small images */}
              <div className="relative overflow-hidden rounded-xl">
                <img
                  src="/traditional-rwandan-dancers-in-colorful-costumes.jpg"
                  alt="Rwandan Culture"
                  className="w-full h-full object-cover"
                />
              </div>

              <div className="relative overflow-hidden rounded-xl">
                <img
                  src="/beautiful-lake-kivu-sunset-with-boats.jpg"
                  alt="Lake Kivu"
                  className="w-full h-full object-cover"
                />
              </div>
            </div>

            {/* Floating stats card */}
            <div className="absolute -bottom-6 -right-6 bg-white p-6 rounded-xl card-shadow">
              <div className="text-center">
                <div className="text-3xl font-bold text-primary">1,200+</div>
                <div className="text-sm text-muted-foreground">Happy Travelers</div>
              </div>
            </div>
          </div>

          {/* Right: Text Content */}
          <div className="space-y-8">
            <div>
              <h2 className="hidden lg:block text-3xl lg:text-4xl font-bold text-foreground mb-4 text-balance">
                Discover the Heart of Africa with
                <span className="text-primary block">Continental Travel & Tours</span>
              </h2>
              <p className="text-lg text-muted-foreground text-pretty leading-relaxed">
                Based in the vibrant city of Kigali, we are Rwanda's premier travel company, specializing in authentic
                East African adventures that connect you with the region's incredible wildlife, rich culture, and
                breathtaking landscapes.
              </p>
            </div>

            <div className="space-y-6">
              <h3 className="text-xl font-semibold text-foreground">Why Rwanda?</h3>
              <p className="text-muted-foreground leading-relaxed">
                Rwanda, the "Land of a Thousand Hills," offers unparalleled experiences from mountain gorilla trekking
                in Volcanoes National Park to serene moments by Lake Kivu. Our country's remarkable transformation,
                commitment to conservation, and warm hospitality make it the perfect gateway to East Africa.
              </p>

              {/* Highlights */}
              <div className="grid grid-cols-2 gap-4">
                {highlights.map((highlight, index) => (
                  <div key={index} className="flex items-center space-x-3">
                    <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center">
                      <highlight.icon className="w-5 h-5 text-primary" />
                    </div>
                    <span className="text-foreground font-medium">{highlight.text}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="pt-4">
              <p className="text-muted-foreground leading-relaxed">
                From luxury safari lodges to authentic cultural encounters, we craft personalized journeys that respect
                local communities and preserve the natural beauty that makes Rwanda truly special.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
