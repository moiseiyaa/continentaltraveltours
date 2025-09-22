"use client"

import { useState, useMemo } from "react"
import PageHeader from "@/components/page-header"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Slider } from "@/components/ui/slider"
import { Checkbox } from "@/components/ui/checkbox"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { MapPin, Clock, Users, Star, Filter, X } from "lucide-react"

// Tour data type
interface Tour {
  id: number
  title: string
  destination: string
  duration: number
  price: number
  rating: number
  reviews: number
  package: "Basic" | "Premium" | "Gold"
  image: string
  description: string
  highlights: string[]
  maxGuests: number
}

// Sample tour data
const tours: Tour[] = [
  {
    id: 1,
    title: "Gorilla Trekking Adventure",
    destination: "Volcanoes National Park",
    duration: 3,
    price: 1200,
    rating: 4.9,
    reviews: 156,
    package: "Premium",
    image: "/gorilla-trekking-adventure-in-volcanoes-national.jpg",
    description: "Experience the thrill of encountering mountain gorillas in their natural habitat.",
    highlights: ["Gorilla permits included", "Professional guide", "Luxury accommodation"],
    maxGuests: 8,
  },
  {
    id: 2,
    title: "Lake Kivu Relaxation",
    destination: "Lake Kivu",
    duration: 2,
    price: 450,
    rating: 4.6,
    reviews: 89,
    package: "Basic",
    image: "/beautiful-lake-kivu-sunset-with-boats.jpg",
    description: "Unwind by the beautiful shores of Lake Kivu with stunning sunset views.",
    highlights: ["Boat cruise", "Local fishing experience", "Beach relaxation"],
    maxGuests: 12,
  },
  {
    id: 3,
    title: "Nyungwe Canopy Walk",
    destination: "Nyungwe Forest",
    duration: 4,
    price: 850,
    rating: 4.7,
    reviews: 124,
    package: "Premium",
    image: "/nyungwe-forest-canopy-walkway.jpg",
    description: "Walk among the treetops in one of Africa's oldest rainforests.",
    highlights: ["Canopy walkway", "Primate tracking", "Nature walks"],
    maxGuests: 10,
  },
  {
    id: 4,
    title: "Akagera Safari Experience",
    destination: "Akagera National Park",
    duration: 5,
    price: 1800,
    rating: 4.8,
    reviews: 203,
    package: "Gold",
    image: "/akagera-national-park-elephants.jpg",
    description: "Discover Rwanda's Big Five in the stunning savanna landscapes of Akagera.",
    highlights: ["Game drives", "Boat safari", "Luxury lodge", "All meals included"],
    maxGuests: 6,
  },
  {
    id: 5,
    title: "Cultural Heritage Tour",
    destination: "Kigali & Surroundings",
    duration: 1,
    price: 180,
    rating: 4.4,
    reviews: 67,
    package: "Basic",
    image: "/traditional-rwandan-dancers-intore.jpg",
    description: "Immerse yourself in Rwandan culture and history.",
    highlights: ["Genocide Memorial", "Local markets", "Traditional dance"],
    maxGuests: 15,
  },
  {
    id: 6,
    title: "Complete Rwanda Explorer",
    destination: "Multiple Destinations",
    duration: 10,
    price: 3500,
    rating: 4.9,
    reviews: 45,
    package: "Gold",
    image: "/rwandan-coffee-plantation-hills.jpg",
    description: "The ultimate Rwanda experience covering all major attractions.",
    highlights: ["All national parks", "Luxury accommodations", "Private guide", "All activities"],
    maxGuests: 4,
  },
]

const destinations = [
  "All Destinations",
  "Volcanoes National Park",
  "Lake Kivu",
  "Nyungwe Forest",
  "Akagera National Park",
  "Kigali & Surroundings",
  "Multiple Destinations",
]
const packages = ["All Packages", "Basic", "Premium", "Gold"]

export default function ToursPage() {
  const [selectedDestinations, setSelectedDestinations] = useState<string[]>([])
  const [selectedPackages, setSelectedPackages] = useState<string[]>([])
  const [priceRange, setPriceRange] = useState([0, 4000])
  const [durationRange, setDurationRange] = useState([1, 10])
  const [minRating, setMinRating] = useState(0)
  const [sortBy, setSortBy] = useState("popular")
  const [showFilters, setShowFilters] = useState(false)

  // Filter and sort tours
  const filteredTours = useMemo(() => {
    const filtered = tours.filter((tour) => {
      const destinationMatch = selectedDestinations.length === 0 || selectedDestinations.includes(tour.destination)
      const packageMatch = selectedPackages.length === 0 || selectedPackages.includes(tour.package)
      const priceMatch = tour.price >= priceRange[0] && tour.price <= priceRange[1]
      const durationMatch = tour.duration >= durationRange[0] && tour.duration <= durationRange[1]
      const ratingMatch = tour.rating >= minRating

      return destinationMatch && packageMatch && priceMatch && durationMatch && ratingMatch
    })

    // Sort tours
    switch (sortBy) {
      case "price-low":
        return filtered.sort((a, b) => a.price - b.price)
      case "price-high":
        return filtered.sort((a, b) => b.price - a.price)
      case "rating":
        return filtered.sort((a, b) => b.rating - a.rating)
      case "duration":
        return filtered.sort((a, b) => a.duration - b.duration)
      default:
        return filtered.sort((a, b) => b.reviews - a.reviews)
    }
  }, [selectedDestinations, selectedPackages, priceRange, durationRange, minRating, sortBy])

  const handleDestinationChange = (destination: string, checked: boolean) => {
    if (checked) {
      setSelectedDestinations([...selectedDestinations, destination])
    } else {
      setSelectedDestinations(selectedDestinations.filter((d) => d !== destination))
    }
  }

  const handlePackageChange = (pkg: string, checked: boolean) => {
    if (checked) {
      setSelectedPackages([...selectedPackages, pkg])
    } else {
      setSelectedPackages(selectedPackages.filter((p) => p !== pkg))
    }
  }

  const clearFilters = () => {
    setSelectedDestinations([])
    setSelectedPackages([])
    setPriceRange([0, 4000])
    setDurationRange([1, 10])
    setMinRating(0)
  }

  const getPackageColor = (pkg: string) => {
    switch (pkg) {
      case "Basic":
        return "bg-blue-100 text-blue-800"
      case "Premium":
        return "bg-purple-100 text-purple-800"
      case "Gold":
        return "bg-yellow-100 text-yellow-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  return (
    <main>
      <PageHeader
        title="Explore Our Tours"
        subtitle="Discover Rwanda's incredible destinations with our carefully crafted tour packages"
        backgroundImage="/tours-page-header-bg.jpg"
        breadcrumb={[
          { label: "Home", href: "/" },
          { label: "Tours", href: "/tours" },
        ]}
      />

      <section className="py-16 lg:py-24">
        <div className="container-max section-padding">
          <div className="flex flex-col lg:flex-row gap-8">
            {/* Mobile Filter Toggle */}
            <div className="lg:hidden">
              <Button
                onClick={() => setShowFilters(!showFilters)}
                variant="outline"
                className="w-full flex items-center justify-center space-x-2"
              >
                <Filter className="w-4 h-4" />
                <span>Filters & Sort</span>
              </Button>
            </div>

            {/* Sidebar Filters */}
            <div className={`lg:w-80 space-y-6 ${showFilters ? "block" : "hidden lg:block"}`}>
              <div className="bg-white rounded-xl p-6 shadow-sm border">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-semibold">Filters</h3>
                  <Button variant="ghost" size="sm" onClick={clearFilters}>
                    Clear All
                  </Button>
                </div>

                {/* Sort By */}
                <div className="mb-6">
                  <label className="text-sm font-medium mb-2 block">Sort By</label>
                  <Select value={sortBy} onValueChange={setSortBy}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="popular">Most Popular</SelectItem>
                      <SelectItem value="price-low">Price: Low to High</SelectItem>
                      <SelectItem value="price-high">Price: High to Low</SelectItem>
                      <SelectItem value="rating">Highest Rated</SelectItem>
                      <SelectItem value="duration">Duration</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                {/* Package Type */}
                <div className="mb-6">
                  <label className="text-sm font-medium mb-3 block">Package Type</label>
                  <div className="space-y-2">
                    {packages.slice(1).map((pkg) => (
                      <div key={pkg} className="flex items-center space-x-2">
                        <Checkbox
                          id={pkg}
                          checked={selectedPackages.includes(pkg)}
                          onCheckedChange={(checked) => handlePackageChange(pkg, checked as boolean)}
                        />
                        <label htmlFor={pkg} className="text-sm cursor-pointer">
                          {pkg}
                        </label>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Destinations */}
                <div className="mb-6">
                  <label className="text-sm font-medium mb-3 block">Destinations</label>
                  <div className="space-y-2 max-h-40 overflow-y-auto">
                    {destinations.slice(1).map((destination) => (
                      <div key={destination} className="flex items-center space-x-2">
                        <Checkbox
                          id={destination}
                          checked={selectedDestinations.includes(destination)}
                          onCheckedChange={(checked) => handleDestinationChange(destination, checked as boolean)}
                        />
                        <label htmlFor={destination} className="text-sm cursor-pointer">
                          {destination}
                        </label>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Price Range */}
                <div className="mb-6">
                  <label className="text-sm font-medium mb-3 block">
                    Price Range: ${priceRange[0]} - ${priceRange[1]}
                  </label>
                  <Slider
                    value={priceRange}
                    onValueChange={setPriceRange}
                    max={4000}
                    min={0}
                    step={50}
                    className="w-full"
                  />
                </div>

                {/* Duration */}
                <div className="mb-6">
                  <label className="text-sm font-medium mb-3 block">
                    Duration: {durationRange[0]} - {durationRange[1]} days
                  </label>
                  <Slider
                    value={durationRange}
                    onValueChange={setDurationRange}
                    max={10}
                    min={1}
                    step={1}
                    className="w-full"
                  />
                </div>

                {/* Minimum Rating */}
                <div>
                  <label className="text-sm font-medium mb-3 block">Minimum Rating: {minRating}+</label>
                  <Slider
                    value={[minRating]}
                    onValueChange={(value) => setMinRating(value[0])}
                    max={5}
                    min={0}
                    step={0.1}
                    className="w-full"
                  />
                </div>
              </div>
            </div>

            {/* Tours Grid */}
            <div className="flex-1">
              <div className="flex items-center justify-between mb-6">
                <p className="text-muted-foreground">
                  Showing {filteredTours.length} of {tours.length} tours
                </p>
                <Button variant="ghost" size="sm" className="lg:hidden" onClick={() => setShowFilters(false)}>
                  <X className="w-4 h-4" />
                </Button>
              </div>

              <div className="grid md:grid-cols-2 gap-6">
                {filteredTours.map((tour) => (
                  <Card key={tour.id} className="overflow-hidden hover:shadow-lg transition-shadow">
                    <div className="aspect-[4/3] relative overflow-hidden">
                      <img
                        src={tour.image || "/placeholder.svg"}
                        alt={tour.title}
                        className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                      />
                      <Badge className={`absolute top-4 left-4 ${getPackageColor(tour.package)}`}>{tour.package}</Badge>
                    </div>

                    <CardContent className="p-6">
                      <div className="flex items-center justify-between mb-2">
                        <h3 className="text-xl font-semibold">{tour.title}</h3>
                        <div className="flex items-center space-x-1">
                          <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                          <span className="text-sm font-medium">{tour.rating}</span>
                          <span className="text-sm text-muted-foreground">({tour.reviews})</span>
                        </div>
                      </div>

                      <div className="flex items-center space-x-4 text-sm text-muted-foreground mb-3">
                        <div className="flex items-center space-x-1">
                          <MapPin className="w-4 h-4" />
                          <span>{tour.destination}</span>
                        </div>
                        <div className="flex items-center space-x-1">
                          <Clock className="w-4 h-4" />
                          <span>{tour.duration} days</span>
                        </div>
                        <div className="flex items-center space-x-1">
                          <Users className="w-4 h-4" />
                          <span>Max {tour.maxGuests}</span>
                        </div>
                      </div>

                      <p className="text-muted-foreground mb-4 line-clamp-2">{tour.description}</p>

                      <div className="flex items-center justify-between">
                        <div>
                          <span className="text-2xl font-bold text-primary">${tour.price}</span>
                          <span className="text-sm text-muted-foreground ml-1">per person</span>
                        </div>
                        <Button>Book Now</Button>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>

              {filteredTours.length === 0 && (
                <div className="text-center py-12">
                  <p className="text-muted-foreground mb-4">No tours match your current filters.</p>
                  <Button variant="outline" onClick={clearFilters}>
                    Clear Filters
                  </Button>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>
    </main>
  )
}
