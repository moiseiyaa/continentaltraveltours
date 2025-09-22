"use client"

import type React from "react"

import { useState } from "react"
import PageHeader from "@/components/page-header"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { MapPin, Phone, Mail, Clock, Send, MessageCircle } from "lucide-react"

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    subject: "",
    tourInterest: "",
    message: "",
    travelDate: "",
    groupSize: "",
  })

  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleInputChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    // Simulate form submission
    await new Promise((resolve) => setTimeout(resolve, 2000))

    // Reset form
    setFormData({
      name: "",
      email: "",
      phone: "",
      subject: "",
      tourInterest: "",
      message: "",
      travelDate: "",
      groupSize: "",
    })

    setIsSubmitting(false)
    alert("Thank you for your message! We'll get back to you within 24 hours.")
  }

  return (
    <main>
      <PageHeader
        title="Contact Us"
        subtitle="Ready to start your Rwanda adventure? Get in touch with our travel experts"
        backgroundImage="/contact-page-header-bg.jpg"
        breadcrumb={[
          { label: "Home", href: "/" },
          { label: "Contact", href: "/contact" },
        ]}
      />

      <section className="py-16 lg:py-24">
        <div className="container-max section-padding">
          <div className="grid lg:grid-cols-3 gap-12">
            {/* Contact Information */}
            <div className="lg:col-span-1 space-y-8">
              <div>
                <h2 className="text-2xl font-bold text-foreground mb-6">Get in Touch</h2>
                <p className="text-muted-foreground mb-8">
                  We're here to help you plan the perfect Rwanda experience. Contact us through any of the methods
                  below.
                </p>
              </div>

              {/* Contact Cards */}
              <div className="space-y-4">
                <Card>
                  <CardContent className="p-6">
                    <div className="flex items-start space-x-4">
                      <div className="bg-primary/10 p-3 rounded-lg">
                        <MapPin className="w-6 h-6 text-primary" />
                      </div>
                      <div>
                        <h3 className="font-semibold mb-1">Office Address</h3>
                        <p className="text-muted-foreground text-sm">
                          KG 123 St, Kigali
                          <br />
                          Gasabo District, Rwanda
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardContent className="p-6">
                    <div className="flex items-start space-x-4">
                      <div className="bg-primary/10 p-3 rounded-lg">
                        <Phone className="w-6 h-6 text-primary" />
                      </div>
                      <div>
                        <h3 className="font-semibold mb-1">Phone Numbers</h3>
                        <p className="text-muted-foreground text-sm">
                          +250 788 123 456
                          <br />
                          +250 722 987 654
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardContent className="p-6">
                    <div className="flex items-start space-x-4">
                      <div className="bg-primary/10 p-3 rounded-lg">
                        <Mail className="w-6 h-6 text-primary" />
                      </div>
                      <div>
                        <h3 className="font-semibold mb-1">Email Addresses</h3>
                        <p className="text-muted-foreground text-sm">
                          info@continentalrwanda.com
                          <br />
                          bookings@continentalrwanda.com
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardContent className="p-6">
                    <div className="flex items-start space-x-4">
                      <div className="bg-primary/10 p-3 rounded-lg">
                        <Clock className="w-6 h-6 text-primary" />
                      </div>
                      <div>
                        <h3 className="font-semibold mb-1">Business Hours</h3>
                        <p className="text-muted-foreground text-sm">
                          Monday - Friday: 8:00 AM - 6:00 PM
                          <br />
                          Saturday: 9:00 AM - 4:00 PM
                          <br />
                          Sunday: Closed
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>

              {/* Emergency Contact */}
              <Card className="bg-primary/5 border-primary/20">
                <CardContent className="p-6">
                  <div className="flex items-start space-x-4">
                    <div className="bg-primary/20 p-3 rounded-lg">
                      <MessageCircle className="w-6 h-6 text-primary" />
                    </div>
                    <div>
                      <h3 className="font-semibold mb-1 text-primary">24/7 Emergency Support</h3>
                      <p className="text-sm text-muted-foreground mb-2">For travelers currently on tour</p>
                      <p className="font-medium">+250 788 999 888</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Contact Form */}
            <div className="lg:col-span-2">
              <Card>
                <CardContent className="p-8">
                  <div className="mb-8">
                    <h2 className="text-2xl font-bold text-foreground mb-2">Send us a Message</h2>
                    <p className="text-muted-foreground">
                      Fill out the form below and we'll get back to you within 24 hours.
                    </p>
                  </div>

                  <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="grid md:grid-cols-2 gap-6">
                      <div>
                        <label htmlFor="name" className="block text-sm font-medium mb-2">
                          Full Name *
                        </label>
                        <Input
                          id="name"
                          type="text"
                          required
                          value={formData.name}
                          onChange={(e) => handleInputChange("name", e.target.value)}
                          placeholder="Your full name"
                        />
                      </div>
                      <div>
                        <label htmlFor="email" className="block text-sm font-medium mb-2">
                          Email Address *
                        </label>
                        <Input
                          id="email"
                          type="email"
                          required
                          value={formData.email}
                          onChange={(e) => handleInputChange("email", e.target.value)}
                          placeholder="your.email@example.com"
                        />
                      </div>
                    </div>

                    <div className="grid md:grid-cols-2 gap-6">
                      <div>
                        <label htmlFor="phone" className="block text-sm font-medium mb-2">
                          Phone Number
                        </label>
                        <Input
                          id="phone"
                          type="tel"
                          value={formData.phone}
                          onChange={(e) => handleInputChange("phone", e.target.value)}
                          placeholder="+250 788 123 456"
                        />
                      </div>
                      <div>
                        <label htmlFor="subject" className="block text-sm font-medium mb-2">
                          Subject *
                        </label>
                        <Select value={formData.subject} onValueChange={(value) => handleInputChange("subject", value)}>
                          <SelectTrigger>
                            <SelectValue placeholder="Select a subject" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="general">General Inquiry</SelectItem>
                            <SelectItem value="booking">Tour Booking</SelectItem>
                            <SelectItem value="custom">Custom Tour Request</SelectItem>
                            <SelectItem value="group">Group Booking</SelectItem>
                            <SelectItem value="support">Customer Support</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>

                    <div className="grid md:grid-cols-2 gap-6">
                      <div>
                        <label htmlFor="tourInterest" className="block text-sm font-medium mb-2">
                          Tour Interest
                        </label>
                        <Select
                          value={formData.tourInterest}
                          onValueChange={(value) => handleInputChange("tourInterest", value)}
                        >
                          <SelectTrigger>
                            <SelectValue placeholder="Select tour type" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="gorilla">Gorilla Trekking</SelectItem>
                            <SelectItem value="safari">Safari Tours</SelectItem>
                            <SelectItem value="cultural">Cultural Tours</SelectItem>
                            <SelectItem value="adventure">Adventure Tours</SelectItem>
                            <SelectItem value="relaxation">Relaxation Tours</SelectItem>
                            <SelectItem value="custom">Custom Package</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      <div>
                        <label htmlFor="travelDate" className="block text-sm font-medium mb-2">
                          Preferred Travel Date
                        </label>
                        <Input
                          id="travelDate"
                          type="date"
                          value={formData.travelDate}
                          onChange={(e) => handleInputChange("travelDate", e.target.value)}
                        />
                      </div>
                    </div>

                    <div>
                      <label htmlFor="groupSize" className="block text-sm font-medium mb-2">
                        Group Size
                      </label>
                      <Select
                        value={formData.groupSize}
                        onValueChange={(value) => handleInputChange("groupSize", value)}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Select group size" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="1">Solo Traveler</SelectItem>
                          <SelectItem value="2">2 People</SelectItem>
                          <SelectItem value="3-5">3-5 People</SelectItem>
                          <SelectItem value="6-10">6-10 People</SelectItem>
                          <SelectItem value="10+">More than 10 People</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div>
                      <label htmlFor="message" className="block text-sm font-medium mb-2">
                        Message *
                      </label>
                      <Textarea
                        id="message"
                        required
                        rows={6}
                        value={formData.message}
                        onChange={(e) => handleInputChange("message", e.target.value)}
                        placeholder="Tell us about your travel plans, special requirements, or any questions you have..."
                      />
                    </div>

                    <Button type="submit" size="lg" className="w-full md:w-auto px-8" disabled={isSubmitting}>
                      {isSubmitting ? (
                        <>
                          <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2" />
                          Sending...
                        </>
                      ) : (
                        <>
                          <Send className="w-4 h-4 mr-2" />
                          Send Message
                        </>
                      )}
                    </Button>
                  </form>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* Map Section */}
      <section className="bg-muted/30 py-16">
        <div className="container-max section-padding">
          <div className="text-center mb-8">
            <h2 className="text-2xl font-bold text-foreground mb-2">Find Us</h2>
            <p className="text-muted-foreground">Visit our office in the heart of Kigali</p>
          </div>

          <div className="bg-muted rounded-xl h-96 flex items-center justify-center">
            <div className="text-center">
              <MapPin className="w-12 h-12 text-primary mx-auto mb-4" />
              <p className="text-muted-foreground">Interactive map would be integrated here</p>
              <p className="text-sm text-muted-foreground mt-2">KG 123 St, Gasabo District, Kigali, Rwanda</p>
            </div>
          </div>
        </div>
      </section>
    </main>
  )
}
