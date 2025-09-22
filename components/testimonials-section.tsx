"use client"

import { Card, CardContent } from "@/components/ui/card"
import { Star, Quote } from "lucide-react"

export function TestimonialsSection() {
  const testimonials = [
    {
      name: "Sarah Johnson",
      location: "United States",
      rating: 5,
      text: "Our gorilla trekking experience with Continental Travel was absolutely magical! The guides were knowledgeable and the entire trip was perfectly organized. Rwanda exceeded all our expectations.",
      tour: "Gorilla Trekking Adventure",
    },
    {
      name: "David Chen",
      location: "Singapore",
      rating: 5,
      text: "The cultural immersion tour was incredible. We learned so much about Rwandan history and traditions. The local communities were so welcoming, and the food was amazing!",
      tour: "Cultural Heritage Tour",
    },
    {
      name: "Emma Thompson",
      location: "United Kingdom",
      rating: 5,
      text: "Lake Kivu was the perfect place to unwind after our safari. The sunset boat cruise was breathtaking, and the accommodation was top-notch. Highly recommend Continental Travel!",
      tour: "Lake Kivu Relaxation",
    },
    {
      name: "Michael Rodriguez",
      location: "Spain",
      rating: 5,
      text: "The Akagera safari was phenomenal! We saw all the Big Five and the guides' expertise made all the difference. Professional service from start to finish.",
      tour: "Akagera Safari Experience",
    },
    {
      name: "Lisa Wang",
      location: "Canada",
      rating: 5,
      text: "The canopy walk in Nyungwe was an adventure of a lifetime! Walking among the treetops was surreal. Continental Travel made everything seamless and safe.",
      tour: "Nyungwe Canopy Walk",
    },
    {
      name: "James Mitchell",
      location: "Australia",
      rating: 5,
      text: "Rwanda is truly the land of a thousand hills! Our multi-day tour covered so much ground and every detail was perfectly planned. The team went above and beyond.",
      tour: "Complete Rwanda Experience",
    },
  ]

  return (
    <section className="min-h-[70vh] lg:min-h-[80vh] bg-muted/30 py-16 lg:py-24">
      <div className="container-max section-padding">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-3xl lg:text-4xl font-bold text-foreground mb-4 text-balance">What Our Travelers Say</h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto text-pretty">
            Don't just take our word for it. Here's what our satisfied customers have to say about their Rwanda
            adventures.
          </p>
        </div>

        {/* Testimonials Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <Card
              key={index}
              className="card-shadow border-0 bg-background/80 backdrop-blur-sm hover:scale-105 transition-all duration-300"
            >
              <CardContent className="p-8">
                {/* Quote Icon */}
                <Quote className="w-8 h-8 text-primary/30 mb-4" />

                {/* Rating */}
                <div className="flex items-center space-x-1 mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                  ))}
                </div>

                {/* Testimonial Text */}
                <p className="text-muted-foreground leading-relaxed mb-6 text-sm">"{testimonial.text}"</p>

                {/* Customer Info */}
                <div className="border-t pt-4">
                  <div className="font-semibold text-foreground">{testimonial.name}</div>
                  <div className="text-sm text-muted-foreground">{testimonial.location}</div>
                  <div className="text-xs text-primary font-medium mt-1">{testimonial.tour}</div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Trust Indicators */}
        <div className="mt-16 text-center">
          <div className="flex flex-col sm:flex-row items-center justify-center space-y-4 sm:space-y-0 sm:space-x-8 text-muted-foreground">
            <div className="flex items-center space-x-2">
              <Star className="w-5 h-5 fill-yellow-400 text-yellow-400" />
              <span className="font-semibold">4.9/5 Average Rating</span>
            </div>
            <div className="hidden sm:block w-px h-6 bg-border"></div>
            <div>
              <span className="font-semibold">1,200+ Happy Customers</span>
            </div>
            <div className="hidden sm:block w-px h-6 bg-border"></div>
            <div>
              <span className="font-semibold">10+ Years Experience</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
