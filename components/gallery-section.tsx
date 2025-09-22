"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { X, ChevronLeft, ChevronRight } from "lucide-react"

export function GallerySection() {
  const [selectedImage, setSelectedImage] = useState<string | null>(null)
  const [currentSlide, setCurrentSlide] = useState(0)

  const galleryImages = [
    {
      src: "/mountain-gorillas-in-volcanoes-national-park.jpg",
      alt: "Mountain Gorillas in Volcanoes National Park",
      category: "Wildlife",
    },
    {
      src: "/nyungwe-forest-canopy-walkway.jpg",
      alt: "Nyungwe Forest Canopy Walkway",
      category: "Adventure",
    },
    {
      src: "/lake-kivu-sunset-with-fishermen.jpg",
      alt: "Lake Kivu Sunset with Fishermen",
      category: "Landscapes",
    },
    {
      src: "/traditional-rwandan-dancers-intore.jpg",
      alt: "Traditional Rwandan Dancers - Intore",
      category: "Culture",
    },
    {
      src: "/akagera-national-park-elephants.jpg",
      alt: "Elephants in Akagera National Park",
      category: "Wildlife",
    },
    {
      src: "/kigali-city-skyline-modern-buildings.jpg",
      alt: "Kigali City Skyline",
      category: "Urban",
    },
    {
      src: "/rwandan-coffee-plantation-hills.jpg",
      alt: "Coffee Plantation in Rwanda Hills",
      category: "Landscapes",
    },
    {
      src: "/local-artisan-making-traditional-crafts.jpg",
      alt: "Local Artisan Making Traditional Crafts",
      category: "Culture",
    },
    {
      src: "/golden-monkeys-volcanoes-national-park.jpg",
      alt: "Golden Monkeys in Volcanoes National Park",
      category: "Wildlife",
    },
  ]

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % galleryImages.length)
  }

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + galleryImages.length) % galleryImages.length)
  }

  return (
    <section id="gallery" className="min-h-[80vh] bg-background py-16 lg:py-24">
      <div className="container-max section-padding">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-3xl lg:text-4xl font-bold text-foreground mb-4 text-balance">Rwanda in Pictures</h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto text-pretty">
            Discover the breathtaking beauty of Rwanda through our lens. From majestic wildlife to stunning landscapes
            and vibrant culture.
          </p>
        </div>

        <div className="md:hidden mb-12">
          <div className="relative">
            {/* Slider Container */}
            <div className="overflow-hidden rounded-xl">
              <div
                className="flex transition-transform duration-300 ease-in-out"
                style={{ transform: `translateX(-${currentSlide * 100}%)` }}
              >
                {galleryImages.map((image, index) => (
                  <div
                    key={index}
                    className="w-full flex-shrink-0 relative aspect-[4/3] cursor-pointer"
                    onClick={() => setSelectedImage(image.src)}
                  >
                    <img src={image.src || "/placeholder.svg"} alt={image.alt} className="w-full h-full object-cover" />
                    {/* Overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent flex items-end">
                      <div className="p-6 text-white">
                        <div className="text-sm font-medium text-accent mb-1">{image.category}</div>
                        <div className="font-semibold">{image.alt}</div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Navigation Buttons */}
            <Button
              variant="ghost"
              size="icon"
              className="absolute left-4 top-1/2 -translate-y-1/2 bg-black/50 text-white hover:bg-black/70"
              onClick={prevSlide}
            >
              <ChevronLeft className="w-6 h-6" />
            </Button>
            <Button
              variant="ghost"
              size="icon"
              className="absolute right-4 top-1/2 -translate-y-1/2 bg-black/50 text-white hover:bg-black/70"
              onClick={nextSlide}
            >
              <ChevronRight className="w-6 h-6" />
            </Button>

            {/* Slide Indicators */}
            <div className="flex justify-center mt-4 space-x-2">
              {galleryImages.map((_, index) => (
                <button
                  key={index}
                  className={`w-2 h-2 rounded-full transition-colors ${
                    index === currentSlide ? "bg-primary" : "bg-gray-300"
                  }`}
                  onClick={() => setCurrentSlide(index)}
                />
              ))}
            </div>
          </div>
        </div>

        <div className="hidden md:grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          {galleryImages.map((image, index) => (
            <div
              key={index}
              className="group relative overflow-hidden rounded-xl card-shadow cursor-pointer aspect-[4/3]"
              onClick={() => setSelectedImage(image.src)}
            >
              {/* Image */}
              <img
                src={image.src || "/placeholder.svg"}
                alt={image.alt}
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
              />

              {/* Overlay */}
              <div className="absolute inset-0 bg-black/0 group-hover:bg-black/40 transition-all duration-300 flex items-end">
                <div className="p-6 text-white transform translate-y-full group-hover:translate-y-0 transition-transform duration-300">
                  <div className="text-sm font-medium text-accent mb-1">{image.category}</div>
                  <div className="font-semibold">{image.alt}</div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* View More CTA */}
        <div className="text-center">
          <Button variant="outline" size="lg" className="px-8 bg-transparent">
            View Full Gallery
          </Button>
        </div>
      </div>

      {/* Lightbox Modal */}
      {selectedImage && (
        <div
          className="fixed inset-0 bg-black/90 z-50 flex items-center justify-center p-4"
          onClick={() => setSelectedImage(null)}
        >
          <div className="relative max-w-4xl max-h-full">
            <img
              src={selectedImage || "/placeholder.svg"}
              alt="Gallery image"
              className="max-w-full max-h-full object-contain rounded-lg"
            />
            <Button
              variant="ghost"
              size="icon"
              className="absolute top-4 right-4 text-white hover:bg-white/20"
              onClick={() => setSelectedImage(null)}
            >
              <X className="w-6 h-6" />
            </Button>
          </div>
        </div>
      )}
    </section>
  )
}
