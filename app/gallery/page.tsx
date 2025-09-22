"use client"

import { useState } from "react"
import PageHeader from "@/components/page-header"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { X, ChevronLeft, ChevronRight } from "lucide-react"

export default function GalleryPage() {
  const [selectedImage, setSelectedImage] = useState<string | null>(null)
  const [selectedCategory, setSelectedCategory] = useState<string>("All")
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
    {
      src: "/beautiful-lake-kivu-sunset-with-boats.jpg",
      alt: "Beautiful Lake Kivu Sunset with Boats",
      category: "Landscapes",
    },
    {
      src: "/gorilla-trekking-adventure-in-volcanoes-national.jpg",
      alt: "Gorilla Trekking Adventure",
      category: "Adventure",
    },
    {
      src: "/kigali-genocide-memorial-centre.jpg",
      alt: "Kigali Genocide Memorial Centre",
      category: "Culture",
    },
  ]

  const categories = ["All", "Wildlife", "Landscapes", "Culture", "Adventure", "Urban"]

  const filteredImages =
    selectedCategory === "All" ? galleryImages : galleryImages.filter((img) => img.category === selectedCategory)

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % filteredImages.length)
  }

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + filteredImages.length) % filteredImages.length)
  }

  return (
    <main>
      <PageHeader
        title="Photo Gallery"
        subtitle="Experience Rwanda's beauty through our curated collection of stunning photographs"
        backgroundImage="/gallery-page-header-bg.jpg"
        breadcrumb={[
          { label: "Home", href: "/" },
          { label: "Gallery", href: "/gallery" },
        ]}
      />

      <section className="py-16 lg:py-24">
        <div className="container-max section-padding">
          {/* Category Filter */}
          <div className="flex flex-wrap justify-center gap-3 mb-12">
            {categories.map((category) => (
              <Button
                key={category}
                variant={selectedCategory === category ? "default" : "outline"}
                onClick={() => {
                  setSelectedCategory(category)
                  setCurrentSlide(0)
                }}
                className="rounded-full"
              >
                {category}
              </Button>
            ))}
          </div>

          {/* Mobile Slider */}
          <div className="md:hidden mb-12">
            <div className="relative">
              <div className="overflow-hidden rounded-xl">
                <div
                  className="flex transition-transform duration-300 ease-in-out"
                  style={{ transform: `translateX(-${currentSlide * 100}%)` }}
                >
                  {filteredImages.map((image, index) => (
                    <div
                      key={index}
                      className="w-full flex-shrink-0 relative aspect-[4/3] cursor-pointer"
                      onClick={() => setSelectedImage(image.src)}
                    >
                      <img
                        src={image.src || "/placeholder.svg"}
                        alt={image.alt}
                        className="w-full h-full object-cover"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent flex items-end">
                        <div className="p-6 text-white">
                          <Badge variant="secondary" className="mb-2">
                            {image.category}
                          </Badge>
                          <div className="font-semibold">{image.alt}</div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {filteredImages.length > 1 && (
                <>
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

                  <div className="flex justify-center mt-4 space-x-2">
                    {filteredImages.map((_, index) => (
                      <button
                        key={index}
                        className={`w-2 h-2 rounded-full transition-colors ${
                          index === currentSlide ? "bg-primary" : "bg-gray-300"
                        }`}
                        onClick={() => setCurrentSlide(index)}
                      />
                    ))}
                  </div>
                </>
              )}
            </div>
          </div>

          {/* Desktop Grid */}
          <div className="hidden md:grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredImages.map((image, index) => (
              <div
                key={index}
                className="group relative overflow-hidden rounded-xl cursor-pointer aspect-[4/3] bg-muted"
                onClick={() => setSelectedImage(image.src)}
              >
                <img
                  src={image.src || "/placeholder.svg"}
                  alt={image.alt}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                />

                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/40 transition-all duration-300 flex items-end">
                  <div className="p-4 text-white transform translate-y-full group-hover:translate-y-0 transition-transform duration-300">
                    <Badge variant="secondary" className="mb-2 text-xs">
                      {image.category}
                    </Badge>
                    <div className="font-medium text-sm">{image.alt}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {filteredImages.length === 0 && (
            <div className="text-center py-12">
              <p className="text-muted-foreground">No images found for this category.</p>
            </div>
          )}
        </div>
      </section>

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
    </main>
  )
}
