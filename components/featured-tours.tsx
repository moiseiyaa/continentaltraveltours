"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Clock, MapPin, Star, Users } from "lucide-react"

export function FeaturedTours() {
  const tours = [
    {
      id: 1,
      title: "Gorilla Trekking Adventure",
      description:
        "Experience the magic of meeting mountain gorillas in their natural habitat at Volcanoes National Park.",
      image: "/placeholder.svg?key=gorilla-trek",
      price: "$1,200",
      duration: "3 Days",
      location: "Volcanoes National Park",
      rating: 4.9,
      groupSize: "8 people max",
      featured: true,
    },
    {
      id: 2,
      title: "Nyungwe Canopy Walk",
      description:
        "Walk among the treetops on Africa's only canopy walkway and discover diverse wildlife in ancient rainforest.",
      image: "/placeholder.svg?key=canopy-walk",
      price: "$450",
      duration: "2 Days",
      location: "Nyungwe Forest",
      rating: 4.8,
      groupSize: "12 people max",
    },
    {
      id: 3,
      title: "Lake Kivu Relaxation",
      description: "Unwind by Rwanda's largest lake with water activities, island hopping, and stunning sunset views.",
      image: "/placeholder.svg?key=lake-kivu",
      price: "$320",
      duration: "2 Days",
      location: "Lake Kivu",
      rating: 4.7,
      groupSize: "15 people max",
    },
    {
      id: 4,
      title: "Akagera Safari Experience",
      description: "Discover the Big Five in Rwanda's only savanna park with game drives and boat safaris.",
      image: "/placeholder.svg?key=akagera-safari",
      price: "$680",
      duration: "3 Days",
      location: "Akagera National Park",
      rating: 4.8,
      groupSize: "10 people max",
    },
    {
      id: 5,
      title: "Cultural Heritage Tour",
      description:
        "Immerse yourself in Rwandan culture with traditional dance, crafts, and authentic village experiences.",
      image: "/placeholder.svg?key=cultural-tour",
      price: "$280",
      duration: "1 Day",
      location: "Various Villages",
      rating: 4.6,
      groupSize: "20 people max",
    },
    {
      id: 6,
      title: "Kigali City Discovery",
      description: "Explore Rwanda's capital with genocide memorial visits, local markets, and modern city highlights.",
      image: "/placeholder.svg?key=kigali-city",
      price: "$150",
      duration: "1 Day",
      location: "Kigali City",
      rating: 4.5,
      groupSize: "25 people max",
    },
  ]

  return (
    <section id="tours" className="min-h-screen bg-background py-16 lg:py-24">
      <div className="container-max section-padding">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-3xl lg:text-4xl font-bold text-foreground mb-4 text-balance">Our Popular Tours</h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto text-pretty">
            Discover Rwanda's incredible diversity through our carefully crafted tour experiences, each designed to
            create unforgettable memories.
          </p>
        </div>

        {/* Tours Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
          {tours.map((tour) => (
            <Card
              key={tour.id}
              className={`group overflow-hidden card-shadow hover:scale-105 transition-all duration-300 ${tour.featured ? "ring-2 ring-primary/20" : ""}`}
            >
              <div className="relative">
                {/* Tour Image */}
                <div className="aspect-[4/3] overflow-hidden">
                  <img
                    src={tour.image || "/placeholder.svg"}
                    alt={tour.title}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                </div>

                {/* Featured Badge */}
                {tour.featured && (
                  <div className="absolute top-4 left-4 bg-accent text-accent-foreground px-3 py-1 rounded-full text-sm font-medium">
                    Most Popular
                  </div>
                )}

                {/* Rating Badge */}
                <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm px-2 py-1 rounded-full flex items-center space-x-1">
                  <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                  <span className="text-sm font-medium">{tour.rating}</span>
                </div>
              </div>

              <CardContent className="p-6">
                {/* Tour Title */}
                <h3 className="text-xl font-bold text-foreground mb-2 group-hover:text-primary transition-colors">
                  {tour.title}
                </h3>

                {/* Tour Description */}
                <p className="text-muted-foreground mb-4 text-sm leading-relaxed">{tour.description}</p>

                {/* Tour Details */}
                <div className="space-y-2 mb-6">
                  <div className="flex items-center space-x-2 text-sm text-muted-foreground">
                    <MapPin className="w-4 h-4 text-primary" />
                    <span>{tour.location}</span>
                  </div>
                  <div className="flex items-center space-x-2 text-sm text-muted-foreground">
                    <Clock className="w-4 h-4 text-primary" />
                    <span>{tour.duration}</span>
                  </div>
                  <div className="flex items-center space-x-2 text-sm text-muted-foreground">
                    <Users className="w-4 h-4 text-primary" />
                    <span>{tour.groupSize}</span>
                  </div>
                </div>

                {/* Price and CTA */}
                <div className="flex items-center justify-between">
                  <div>
                    <span className="text-2xl font-bold text-primary">{tour.price}</span>
                    <span className="text-sm text-muted-foreground ml-1">per person</span>
                  </div>
                  <Button className="bg-primary hover:bg-primary/90">Book Now</Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* View All Tours CTA */}
        <div className="text-center">
          <Button variant="outline" size="lg" className="px-8 bg-transparent">
            View All Tours
          </Button>
        </div>
      </div>
    </section>
  )
}
