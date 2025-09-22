"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu"
import { Menu, X, Phone, ChevronDown } from "lucide-react"

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false)

  const destinations = [
    { name: "Volcanoes National Park", href: "#volcanoes" },
    { name: "Nyungwe Forest", href: "#nyungwe" },
    { name: "Lake Kivu", href: "#kivu" },
    { name: "Akagera National Park", href: "#akagera" },
    { name: "Kigali City Tours", href: "#kigali" },
  ]

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-md border-b border-border">
      <div className="container-max section-padding">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex items-center space-x-2">
            <div className="w-10 h-10 bg-primary rounded-lg flex items-center justify-center">
              <span className="text-primary-foreground font-bold text-lg">CT</span>
            </div>
            <div className="hidden sm:block">
              <a href="/">
                <h1 className="font-bold text-lg text-foreground">Continental Travel</h1>
                <p className="text-xs text-muted-foreground -mt-1">& Tours</p>
              </a>
            </div>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center space-x-8">
            <NavigationMenu>
              <NavigationMenuList>
                <NavigationMenuItem>
                  <NavigationMenuLink href="/about" className="text-foreground font-medium">
                    About
                  </NavigationMenuLink>
                </NavigationMenuItem>

                <NavigationMenuItem>
                  <NavigationMenuTrigger className="text-foreground">Destinations</NavigationMenuTrigger>
                  <NavigationMenuContent>
                    <div className="w-64 p-4">
                      <div className="grid gap-2">
                        {destinations.map((destination) => (
                          <NavigationMenuLink
                            key={destination.name}
                            href={destination.href}
                            className="block p-2 rounded-md"
                          >
                            <span className="font-medium text-foreground">{destination.name}</span>
                          </NavigationMenuLink>
                        ))}
                      </div>
                    </div>
                  </NavigationMenuContent>
                </NavigationMenuItem>

                <NavigationMenuItem>
                  <NavigationMenuLink href="/tours" className="text-foreground font-medium">
                    Tours
                  </NavigationMenuLink>
                </NavigationMenuItem>

                <NavigationMenuItem>
                  <NavigationMenuLink href="/gallery" className="text-foreground font-medium">
                    Gallery
                  </NavigationMenuLink>
                </NavigationMenuItem>

                <NavigationMenuItem>
                  <NavigationMenuLink href="/contact" className="text-foreground font-medium">
                    Contact
                  </NavigationMenuLink>
                </NavigationMenuItem>
              </NavigationMenuList>
            </NavigationMenu>
          </div>

          {/* Contact CTA & Mobile Menu */}
          <div className="flex items-center space-x-4">
            <Button
              variant="outline"
              size="sm"
              className="hidden md:flex items-center space-x-2 bg-transparent hover:bg-primary hover:text-primary-foreground hover:border-primary transition-all duration-300 hover:scale-105"
            >
              <Phone className="w-4 h-4" />
              <span>+250 788 123 456</span>
            </Button>

            <Button className="hidden md:inline-flex hover:bg-primary/90 hover:scale-105 transition-all duration-300">
              Plan Your Trip
            </Button>

            {/* Mobile menu button */}
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="lg:hidden p-2 rounded-md hover:bg-secondary transition-colors"
            >
              {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isOpen && (
          <div className="lg:hidden py-4 border-t border-border">
            <div className="flex flex-col space-y-4">
              <a href="/about" className="text-foreground font-medium">
                About
              </a>

              <div className="space-y-2">
                <div className="flex items-center space-x-2 text-foreground font-medium">
                  <span>Destinations</span>
                  <ChevronDown className="w-4 h-4" />
                </div>
                <div className="pl-4 space-y-2">
                  {destinations.map((destination) => (
                    <a key={destination.name} href={destination.href} className="block text-muted-foreground">
                      {destination.name}
                    </a>
                  ))}
                </div>
              </div>

              <a href="/tours" className="text-foreground font-medium">
                Tours
              </a>
              <a href="/gallery" className="text-foreground font-medium">
                Gallery
              </a>
              <a href="/contact" className="text-foreground font-medium">
                Contact
              </a>

              <div className="pt-4 space-y-3">
                <Button
                  variant="outline"
                  size="sm"
                  className="w-full justify-center bg-transparent hover:bg-primary hover:text-primary-foreground hover:border-primary transition-all duration-300 hover:scale-105"
                >
                  <Phone className="w-4 h-4 mr-2" />
                  +250 788 123 456
                </Button>
                <Button className="w-full hover:bg-primary/90 hover:scale-105 transition-all duration-300">
                  Plan Your Trip
                </Button>
              </div>
            </div>
          </div>
        )}
      </div>
    </nav>
  )
}
