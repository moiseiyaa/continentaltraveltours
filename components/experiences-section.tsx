"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Award, Heart, Shield, Users, MapPin, Clock } from "lucide-react"

export function ExperiencesSection() {
  const experiences = [
    {
      icon: Award,
      title: "Expert Local Guides",
      description:
        "Our certified guides have deep knowledge of Rwanda's history, culture, and wildlife, ensuring authentic and educational experiences.",
    },
    {
      icon: Shield,
      title: "Safety First",
      description:
        "Your safety is our priority. We maintain the highest safety standards and provide comprehensive insurance coverage for all tours.",
    },
    {
      icon: Heart,
      title: "Sustainable Tourism",
      description:
        "We're committed to responsible tourism that benefits local communities and protects Rwanda's natural heritage for future generations.",
    },
    {
      icon: Users,
      title: "Small Group Sizes",
      description:
        "Intimate group experiences with maximum 25 people ensure personalized attention and minimal environmental impact.",
    },
    {
      icon: MapPin,
      title: "Unique Access",
      description:
        "Exclusive access to remote locations and special experiences that most tourists never get to see or experience.",
    },
    {
      icon: Clock,
      title: "24/7 Support",
      description: "Round-the-clock support throughout your journey, from initial booking to your safe return home.",
    },
  ]

  return (
    <section className="min-h-[60vh] lg:min-h-[70vh] bg-muted/30 py-16 lg:py-24">
      <div className="container-max section-padding">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-3xl lg:text-4xl font-bold text-foreground mb-4 text-balance">
            Why Choose Continental Travel & Tours?
          </h2>
          <p className="text-lg text-muted-foreground max-w-3xl mx-auto text-pretty">
            With over a decade of experience in Rwanda tourism, we deliver exceptional adventures that create lasting
            memories while supporting local communities.
          </p>
        </div>

        {/* Experiences Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
          {experiences.map((experience, index) => {
            const IconComponent = experience.icon
            return (
              <Card
                key={index}
                className="group card-shadow hover:scale-105 transition-all duration-300 border-0 bg-background/80 backdrop-blur-sm"
              >
                <CardContent className="p-8 text-center">
                  {/* Icon */}
                  <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-6 group-hover:bg-primary/20 transition-colors">
                    <IconComponent className="w-8 h-8 text-primary" />
                  </div>

                  {/* Title */}
                  <h3 className="text-xl font-bold text-foreground mb-4 group-hover:text-primary transition-colors">
                    {experience.title}
                  </h3>

                  {/* Description */}
                  <p className="text-muted-foreground leading-relaxed text-sm">{experience.description}</p>
                </CardContent>
              </Card>
            )
          })}
        </div>

        {/* Partners Logos Sliding Loop */}
        <div className="bg-primary/5 rounded-2xl p-8 lg:p-12 overflow-hidden">
          <div className="text-center mb-8">
            <h3 className="text-xl font-semibold text-foreground mb-2">Trusted Partners</h3>
            <p className="text-muted-foreground">
              Working with leading organizations to deliver exceptional experiences
            </p>
          </div>

          {/* Partners Logos Sliding Loop */}
          <div className="relative">
            <div className="flex animate-slide-loop">
              {/* First set of logos */}
              <div className="flex items-center justify-center min-w-[200px] px-8">
                <img
                  src="/rwanda-development-board-logo.jpg"
                  alt="Rwanda Development Board"
                  className="h-12 w-auto opacity-70 hover:opacity-100 transition-opacity grayscale hover:grayscale-0"
                />
              </div>
              <div className="flex items-center justify-center min-w-[200px] px-8">
                <img
                  src="/volcanoes-national-park-logo.jpg"
                  alt="Volcanoes National Park"
                  className="h-12 w-auto opacity-70 hover:opacity-100 transition-opacity grayscale hover:grayscale-0"
                />
              </div>
              <div className="flex items-center justify-center min-w-[200px] px-8">
                <img
                  src="/akagera-national-park-logo.jpg"
                  alt="Akagera National Park"
                  className="h-12 w-auto opacity-70 hover:opacity-100 transition-opacity grayscale hover:grayscale-0"
                />
              </div>
              <div className="flex items-center justify-center min-w-[200px] px-8">
                <img
                  src="/nyungwe-forest-national-park-logo.jpg"
                  alt="Nyungwe Forest"
                  className="h-12 w-auto opacity-70 hover:opacity-100 transition-opacity grayscale hover:grayscale-0"
                />
              </div>
              <div className="flex items-center justify-center min-w-[200px] px-8">
                <img
                  src="/visit-rwanda-tourism-logo.jpg"
                  alt="Visit Rwanda"
                  className="h-12 w-auto opacity-70 hover:opacity-100 transition-opacity grayscale hover:grayscale-0"
                />
              </div>
              <div className="flex items-center justify-center min-w-[200px] px-8">
                <img
                  src="/east-african-community-logo.jpg"
                  alt="East African Community"
                  className="h-12 w-auto opacity-70 hover:opacity-100 transition-opacity grayscale hover:grayscale-0"
                />
              </div>

              {/* Duplicate set for seamless loop */}
              <div className="flex items-center justify-center min-w-[200px] px-8">
                <img
                  src="/rwanda-development-board-logo.jpg"
                  alt="Rwanda Development Board"
                  className="h-12 w-auto opacity-70 hover:opacity-100 transition-opacity grayscale hover:grayscale-0"
                />
              </div>
              <div className="flex items-center justify-center min-w-[200px] px-8">
                <img
                  src="/volcanoes-national-park-logo.jpg"
                  alt="Volcanoes National Park"
                  className="h-12 w-auto opacity-70 hover:opacity-100 transition-opacity grayscale hover:grayscale-0"
                />
              </div>
              <div className="flex items-center justify-center min-w-[200px] px-8">
                <img
                  src="/akagera-national-park-logo.jpg"
                  alt="Akagera National Park"
                  className="h-12 w-auto opacity-70 hover:opacity-100 transition-opacity grayscale hover:grayscale-0"
                />
              </div>
              <div className="flex items-center justify-center min-w-[200px] px-8">
                <img
                  src="/nyungwe-forest-national-park-logo.jpg"
                  alt="Nyungwe Forest"
                  className="h-12 w-auto opacity-70 hover:opacity-100 transition-opacity grayscale hover:grayscale-0"
                />
              </div>
              <div className="flex items-center justify-center min-w-[200px] px-8">
                <img
                  src="/visit-rwanda-tourism-logo.jpg"
                  alt="Visit Rwanda"
                  className="h-12 w-auto opacity-70 hover:opacity-100 transition-opacity grayscale hover:grayscale-0"
                />
              </div>
              <div className="flex items-center justify-center min-w-[200px] px-8">
                <img
                  src="/east-african-community-logo.jpg"
                  alt="East African Community"
                  className="h-12 w-auto opacity-70 hover:opacity-100 transition-opacity grayscale hover:grayscale-0"
                />
              </div>
            </div>
          </div>
        </div>

        {/* CTA Section */}
        <div className="text-center mt-12">
          <h3 className="text-2xl font-bold text-foreground mb-4">Ready to Start Your Adventure?</h3>
          <p className="text-muted-foreground mb-6 max-w-2xl mx-auto">
            Join thousands of satisfied travelers who have discovered the magic of Rwanda with us.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" className="bg-primary hover:bg-primary/90 px-8">
              Plan Your Trip
            </Button>
            <Button variant="outline" size="lg" className="px-8 bg-transparent">
              {"Talk with the Expact"}
            </Button>
          </div>
        </div>
      </div>
    </section>
  )
}
