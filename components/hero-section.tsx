"use client"

import { Button } from "@/components/ui/button"
import { Star, Play } from "lucide-react"

export function HeroSection() {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background Image */}
      <div className="absolute inset-0 z-0">
        <img src="/breathtaking-rwanda-landscape-with-mountains-and-l.jpg" alt="Beautiful Rwanda landscape" className="w-full h-full object-cover" />
        <div className="absolute inset-0 bg-black/40" />
      </div>

      {/* Content */}
      <div className="relative z-10 container-max section-padding text-center text-white">
        <div className="max-w-4xl mx-auto">
          {/* Main Headline */}
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold mb-6 text-balance">
            Discover Rwanda & East Africa
            <span className="block text-chart-2">in Comfort</span>
          </h1>

          {/* Sub-headline */}
          <p className="text-lg md:text-xl lg:text-2xl mb-8 text-white/90 max-w-2xl mx-auto text-pretty">
            Experience authentic adventures with local expertise, premium comfort, and unforgettable memories in the
            heart of Africa
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-12">
            <Button size="lg" className="text-lg px-8 py-4 bg-primary hover:bg-primary/90">
              View Our Packages  
            </Button>
            
          </div>

          {/* Social Proof */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 text-white/80">
            <div className="flex items-center space-x-1">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="w-5 h-5 fill-accent text-accent" />
              ))}
            </div>
            <span className="text-lg font-medium">Trusted by 1,200+ travelers</span>
          </div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-10">
        
      </div>
    </section>
  )
}
