'use client'

import { useState } from 'react'
import { Navbar } from '@/components/navbar'
import PageHeader from '@/components/page-header'
import { 
  MapPin, 
  Calendar, 
  Users, 
  Star, 
  Clock,
  CheckCircle,
  Phone,
  Mail,
  User,
  CreditCard,
  Shield,
  ArrowLeft,
  Camera,
  Utensils,
  Bed,
  Car
} from 'lucide-react'

interface TripDetails {
  id: string
  title: string
  destination: string
  description: string
  price: number
  duration: string
  rating: number
  image: string
  packagePlan: string
  mostPopular: boolean
  highlights: string[]
  included: string[]
  itinerary: {
    day: number
    title: string
    description: string
    activities: string[]
    meals: string[]
    accommodation: string
  }[]
}

export default function BookingPage({ params }: { params: { tripId: string } }) {
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    travelers: 1,
    travelDate: '',
    specialRequests: '',
    emergencyContact: '',
    emergencyPhone: ''
  })

  // Mock trip data - in real app, this would be fetched based on tripId
  const trip: TripDetails = {
    id: params.tripId,
    title: 'Akagera Safari Experience',
    destination: 'Akagera National Park, Rwanda',
    description: 'Discover the Big Five in Rwanda\'s only savanna national park with game drives and boat safaris.',
    price: 680,
    duration: '3 Days',
    rating: 4.8,
    image: '/api/placeholder/800/400',
    packagePlan: 'Premium',
    mostPopular: true,
    highlights: [
      'Big Five wildlife viewing',
      'Boat safari on Lake Ihema',
      'Professional guide included',
      'Luxury safari lodge accommodation',
      'All meals and transfers included'
    ],
    included: [
      'Professional safari guide',
      'Game drives in 4WD vehicle',
      'Boat safari experience',
      'All park entrance fees',
      'Accommodation for 2 nights',
      'All meals (breakfast, lunch, dinner)',
      'Airport transfers',
      'Bottled water during activities'
    ],
    itinerary: [
      {
        day: 1,
        title: 'Arrival & Evening Game Drive',
        description: 'Arrive at Akagera National Park and check into your luxury safari lodge. After lunch, embark on your first game drive to spot elephants, buffalos, and various antelope species.',
        activities: ['Airport pickup', 'Check-in at safari lodge', 'Welcome lunch', 'Evening game drive'],
        meals: ['Lunch', 'Dinner'],
        accommodation: 'Akagera Game Lodge - Luxury Suite'
      },
      {
        day: 2,
        title: 'Full Day Safari Adventure',
        description: 'Start early with a morning game drive when animals are most active. After lunch, enjoy a boat safari on Lake Ihema to see hippos, crocodiles, and diverse bird species.',
        activities: ['Early morning game drive', 'Bush breakfast', 'Boat safari on Lake Ihema', 'Bird watching', 'Sunset photography'],
        meals: ['Breakfast', 'Bush lunch', 'Dinner'],
        accommodation: 'Akagera Game Lodge - Luxury Suite'
      },
      {
        day: 3,
        title: 'Final Game Drive & Departure',
        description: 'Enjoy a final morning game drive with chances to spot lions and leopards. After brunch, depart for Kigali with wonderful memories of your safari experience.',
        activities: ['Final game drive', 'Wildlife photography', 'Souvenir shopping', 'Departure to Kigali'],
        meals: ['Breakfast', 'Brunch'],
        accommodation: 'Check-out'
      }
    ]
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Frontend only - no actual booking submission
    console.log('Booking submitted:', formData)
    setIsSubmitted(true)
  }

  const totalPrice = trip.price * formData.travelers

  if (isSubmitted) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
        <div className="max-w-md w-full bg-white rounded-xl shadow-lg p-8 text-center">
          <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <CheckCircle className="h-8 w-8 text-green-600" />
          </div>
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Booking Request Submitted</h2>
          <p className="text-gray-600 mb-6">
            Thank you for your interest in our {trip.title}. We have received your booking request and will contact you within 24 hours to confirm your reservation and provide payment details.
          </p>
          <p className="text-sm text-gray-500 mb-6">
            Our travel specialists will review your requirements and ensure everything is perfectly arranged for your journey.
          </p>
          <button
            onClick={() => setIsSubmitted(false)}
            className="w-full px-6 py-3 bg-primary text-white rounded-lg hover:bg-primary/90 transition-colors font-medium"
          >
            Book Another Trip
          </button>
        </div>
      </div>
    )
  }

  return (
    <main>
      <Navbar />
      
      <PageHeader
        title="Book Your Adventure"
        subtitle={`Complete your booking for ${trip.title}`}
        backgroundImage="/booking-header-bg.jpg"
        breadcrumb={[
          { label: "Home", href: "/" },
          { label: "Tours", href: "/tours" },
          { label: "Book Trip", href: "#" },
        ]}
      />

      <div className="bg-gray-50 py-16 lg:py-24">
        <div className="container-max section-padding">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Trip Details - Left Side */}
          <div className="lg:col-span-2 space-y-8">
            {/* Trip Overview */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
              <div className="aspect-w-16 aspect-h-9">
                <img
                  src={trip.image}
                  alt={trip.title}
                  className="w-full h-64 object-cover"
                />
              </div>
              <div className="p-6">
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <h2 className="text-2xl font-bold text-gray-900 mb-2">{trip.title}</h2>
                    <div className="flex items-center space-x-4 text-sm text-gray-600">
                      <div className="flex items-center">
                        <MapPin className="h-4 w-4 mr-1" />
                        {trip.destination}
                      </div>
                      <div className="flex items-center">
                        <Calendar className="h-4 w-4 mr-1" />
                        {trip.duration}
                      </div>
                      <div className="flex items-center">
                        <Star className="h-4 w-4 mr-1 text-yellow-400 fill-current" />
                        {trip.rating}
                      </div>
                    </div>
                  </div>
                  {trip.mostPopular && (
                    <span className="inline-flex px-3 py-1 text-xs font-semibold rounded-full bg-orange-100 text-orange-800">
                      Most Popular
                    </span>
                  )}
                </div>
                <p className="text-gray-700 leading-relaxed">{trip.description}</p>
              </div>
            </div>

            {/* Highlights */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Trip Highlights</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {trip.highlights.map((highlight, index) => (
                  <div key={index} className="flex items-center space-x-3">
                    <CheckCircle className="h-5 w-5 text-green-600 flex-shrink-0" />
                    <span className="text-gray-700">{highlight}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* What's Included */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">What's Included</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {trip.included.map((item, index) => (
                  <div key={index} className="flex items-center space-x-3">
                    <CheckCircle className="h-4 w-4 text-primary flex-shrink-0" />
                    <span className="text-gray-700 text-sm">{item}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Day-by-Day Itinerary */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-6">Day-by-Day Itinerary</h3>
              <div className="space-y-6">
                {trip.itinerary.map((day, index) => (
                  <div key={day.day} className="relative">
                    {index !== trip.itinerary.length - 1 && (
                      <div className="absolute left-6 top-12 bottom-0 w-0.5 bg-gray-200"></div>
                    )}
                    <div className="flex space-x-4">
                      <div className="flex-shrink-0">
                        <div className="w-12 h-12 bg-primary rounded-full flex items-center justify-center text-white font-semibold">
                          {day.day}
                        </div>
                      </div>
                      <div className="flex-1 min-w-0">
                        <h4 className="text-lg font-medium text-gray-900 mb-2">{day.title}</h4>
                        <p className="text-gray-700 mb-4">{day.description}</p>
                        
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                          <div>
                            <h5 className="text-sm font-medium text-gray-900 mb-2 flex items-center">
                              <Camera className="h-4 w-4 mr-1" />
                              Activities
                            </h5>
                            <ul className="text-sm text-gray-600 space-y-1">
                              {day.activities.map((activity, idx) => (
                                <li key={idx}>• {activity}</li>
                              ))}
                            </ul>
                          </div>
                          <div>
                            <h5 className="text-sm font-medium text-gray-900 mb-2 flex items-center">
                              <Utensils className="h-4 w-4 mr-1" />
                              Meals
                            </h5>
                            <ul className="text-sm text-gray-600 space-y-1">
                              {day.meals.map((meal, idx) => (
                                <li key={idx}>• {meal}</li>
                              ))}
                            </ul>
                          </div>
                          <div>
                            <h5 className="text-sm font-medium text-gray-900 mb-2 flex items-center">
                              <Bed className="h-4 w-4 mr-1" />
                              Accommodation
                            </h5>
                            <p className="text-sm text-gray-600">{day.accommodation}</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Booking Form - Right Side (Fixed) */}
          <div className="lg:col-span-1">
            <div className="sticky top-8">
              <div className="bg-white rounded-xl shadow-lg border border-gray-200 p-6">
                <div className="mb-6">
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">Book This Trip</h3>
                  <div className="flex items-center justify-between">
                    <span className="text-2xl font-bold text-primary">${trip.price}</span>
                    <span className="text-sm text-gray-600">per person</span>
                  </div>
                </div>

                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        First Name
                      </label>
                      <input
                        type="text"
                        required
                        value={formData.firstName}
                        onChange={(e) => setFormData(prev => ({ ...prev, firstName: e.target.value }))}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary/20 focus:border-primary transition-colors"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Last Name
                      </label>
                      <input
                        type="text"
                        required
                        value={formData.lastName}
                        onChange={(e) => setFormData(prev => ({ ...prev, lastName: e.target.value }))}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary/20 focus:border-primary transition-colors"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Email Address
                    </label>
                    <input
                      type="email"
                      required
                      value={formData.email}
                      onChange={(e) => setFormData(prev => ({ ...prev, email: e.target.value }))}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary/20 focus:border-primary transition-colors"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Phone Number
                    </label>
                    <input
                      type="tel"
                      required
                      value={formData.phone}
                      onChange={(e) => setFormData(prev => ({ ...prev, phone: e.target.value }))}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary/20 focus:border-primary transition-colors"
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Travelers
                      </label>
                      <select
                        value={formData.travelers}
                        onChange={(e) => setFormData(prev => ({ ...prev, travelers: Number(e.target.value) }))}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary/20 focus:border-primary transition-colors"
                      >
                        {[1, 2, 3, 4, 5, 6, 7, 8].map(num => (
                          <option key={num} value={num}>{num} {num === 1 ? 'Person' : 'People'}</option>
                        ))}
                      </select>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Travel Date
                      </label>
                      <input
                        type="date"
                        required
                        value={formData.travelDate}
                        onChange={(e) => setFormData(prev => ({ ...prev, travelDate: e.target.value }))}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary/20 focus:border-primary transition-colors"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Emergency Contact
                    </label>
                    <input
                      type="text"
                      required
                      value={formData.emergencyContact}
                      onChange={(e) => setFormData(prev => ({ ...prev, emergencyContact: e.target.value }))}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary/20 focus:border-primary transition-colors"
                      placeholder="Full name"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Emergency Phone
                    </label>
                    <input
                      type="tel"
                      required
                      value={formData.emergencyPhone}
                      onChange={(e) => setFormData(prev => ({ ...prev, emergencyPhone: e.target.value }))}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary/20 focus:border-primary transition-colors"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Special Requests (Optional)
                    </label>
                    <textarea
                      rows={3}
                      value={formData.specialRequests}
                      onChange={(e) => setFormData(prev => ({ ...prev, specialRequests: e.target.value }))}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary/20 focus:border-primary transition-colors"
                      placeholder="Dietary requirements, accessibility needs, etc."
                    />
                  </div>

                  <div className="border-t border-gray-200 pt-4">
                    <div className="flex justify-between items-center mb-4">
                      <span className="text-sm text-gray-600">
                        {formData.travelers} × ${trip.price}
                      </span>
                      <span className="text-lg font-semibold text-gray-900">
                        ${totalPrice.toLocaleString()}
                      </span>
                    </div>
                    
                    <button
                      type="submit"
                      className="w-full px-6 py-3 bg-primary text-white rounded-lg hover:bg-primary/90 focus:ring-2 focus:ring-primary/20 transition-all duration-200 font-medium"
                    >
                      Request Booking
                    </button>
                    
                    <div className="flex items-center justify-center mt-3 text-xs text-gray-500">
                      <Shield className="h-3 w-3 mr-1" />
                      Secure booking • No payment required now
                    </div>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
        </div>
      </div>
    </main>
  )
}
