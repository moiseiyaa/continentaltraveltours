"use client"

import { Button } from "@/components/ui/button"
import { MapPin, Phone, Mail, Facebook, Twitter, Instagram, Youtube } from "lucide-react"

export function Footer() {
  return (
    <footer className="min-h-[30vh] lg:min-h-[40vh] bg-foreground text-background py-16">
      <div className="container-max section-padding">
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
          {/* Company Info */}
          <div className="lg:col-span-2">
            <h3 className="text-2xl font-bold mb-4">Continental Travel & Tours</h3>
            <p className="text-background/80 mb-6 leading-relaxed">
              Your trusted partner for authentic Rwanda experiences. We specialize in creating unforgettable journeys
              that showcase the best of Rwanda's wildlife, culture, and natural beauty.
            </p>
            <div className="space-y-2 text-sm">
              <div className="flex items-center space-x-2">
                <MapPin className="w-4 h-4 text-primary" />
                <span>Kigali, Rwanda - East Africa</span>
              </div>
              <div className="flex items-center space-x-2">
                <Phone className="w-4 h-4 text-primary" />
                <span>+250 788 123 456</span>
              </div>
              <div className="flex items-center space-x-2">
                <Mail className="w-4 h-4 text-primary" />
                <span>info@continentaltours.rw</span>
              </div>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-lg font-semibold mb-4">Quick Links</h4>
            <ul className="space-y-2 text-sm text-background/80">
              <li>
                <a href="/about" className="hover:text-primary transition-colors">
                  About Us
                </a>
              </li>
              <li>
                <a href="/tours" className="hover:text-primary transition-colors">
                  Our Tours
                </a>
              </li>
              <li>
                <a href="/gallery" className="hover:text-primary transition-colors">
                  Gallery
                </a>
              </li>
              <li>
                <a href="/contact" className="hover:text-primary transition-colors">
                  Contact
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-primary transition-colors">
                  Blog
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-primary transition-colors">
                  Reviews
                </a>
              </li>
            </ul>
          </div>

          {/* Popular Tours */}
          <div>
            <h4 className="text-lg font-semibold mb-4">Popular Tours</h4>
            <ul className="space-y-2 text-sm text-background/80">
              <li>
                <a href="#" className="hover:text-primary transition-colors">
                  Gorilla Trekking
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-primary transition-colors">
                  Akagera Safari
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-primary transition-colors">
                  Nyungwe Canopy Walk
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-primary transition-colors">
                  Lake Kivu Tours
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-primary transition-colors">
                  Cultural Experiences
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-primary transition-colors">
                  Kigali City Tours
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Social Media & Newsletter */}
        <div className="border-t border-background/20 pt-8 mb-8">
          <div className="flex flex-col md:flex-row items-center justify-between space-y-4 md:space-y-0">
            <div>
              <h4 className="text-lg font-semibold mb-2">Follow Our Adventures</h4>
              <div className="flex space-x-4">
                <Button
                  size="icon"
                  variant="ghost"
                  className="text-background hover:text-primary hover:bg-background/10"
                >
                  <Facebook className="w-5 h-5" />
                </Button>
                <Button
                  size="icon"
                  variant="ghost"
                  className="text-background hover:text-primary hover:bg-background/10"
                >
                  <Instagram className="w-5 h-5" />
                </Button>
                <Button
                  size="icon"
                  variant="ghost"
                  className="text-background hover:text-primary hover:bg-background/10"
                >
                  <Twitter className="w-5 h-5" />
                </Button>
                <Button
                  size="icon"
                  variant="ghost"
                  className="text-background hover:text-primary hover:bg-background/10"
                >
                  <Youtube className="w-5 h-5" />
                </Button>
              </div>
            </div>
            <div className="text-center md:text-right">
              <h4 className="text-lg font-semibold mb-2">Stay Updated</h4>
              <p className="text-sm text-background/80 mb-2">Get travel tips and exclusive offers</p>
              <div className="flex space-x-2">
                <input
                  type="email"
                  placeholder="Your email"
                  className="px-3 py-2 rounded bg-background/10 border border-background/20 text-background placeholder:text-background/60 text-sm"
                />
                <Button size="sm" className="bg-primary hover:bg-primary/90">
                  Subscribe
                </Button>
              </div>
            </div>
          </div>
        </div>

        {/* Copyright */}
        <div className="border-t border-background/20 pt-8 text-center text-sm text-background/60">
          <p>© 2025 Continental Travel &amp; Tours. All rights reserved. | Privacy Policy | Terms of Service</p>
        </div>
      </div>
    </footer>
  )
}
