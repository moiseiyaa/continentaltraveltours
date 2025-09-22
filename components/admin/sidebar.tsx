'use client'

import { useState } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { cn } from '@/lib/utils'
import { Button } from '@/components/ui/button'
import { ScrollArea } from '@/components/ui/scroll-area'
import { 
  LayoutDashboard, 
  MapPin, 
  Image, 
  Users, 
  Mail, 
  Settings,
  Menu,
  X,
  LogOut
} from 'lucide-react'

const sidebarItems = [
  {
    title: 'Dashboard',
    href: '/admin',
    icon: LayoutDashboard,
  },
  {
    title: 'Trips Management',
    href: '/admin/trips',
    icon: MapPin,
  },
  {
    title: 'Gallery',
    href: '/admin/gallery',
    icon: Image,
  },
  {
    title: 'Bookings',
    href: '/admin/bookings',
    icon: Users,
  },
  {
    title: 'Newsletter',
    href: '/admin/newsletter',
    icon: Mail,
  },
  {
    title: 'Settings',
    href: '/admin/settings',
    icon: Settings,
  },
]

export function Sidebar() {
  const [isCollapsed, setIsCollapsed] = useState(false)
  const pathname = usePathname()

  return (
    <>
      {/* Mobile overlay */}
      {!isCollapsed && (
        <div 
          className="fixed inset-0 z-40 bg-black/50 lg:hidden"
          onClick={() => setIsCollapsed(true)}
        />
      )}
      
      {/* Sidebar */}
      <div className={cn(
        "fixed left-0 top-0 z-50 h-full bg-card border-r border-border transition-all duration-300 lg:relative lg:z-auto",
        isCollapsed ? "-translate-x-full lg:w-16" : "w-64 lg:w-64"
      )}>
        <div className="flex h-full flex-col">
          {/* Header */}
          <div className="flex h-16 items-center justify-between px-4 border-b border-border">
            <div className={cn("flex items-center space-x-2", isCollapsed && "lg:justify-center")}>
              <div className="h-8 w-8 rounded-lg bg-primary flex items-center justify-center">
                <MapPin className="h-5 w-5 text-primary-foreground" />
              </div>
              {!isCollapsed && (
                <span className="font-semibold text-foreground">Admin Panel</span>
              )}
            </div>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setIsCollapsed(!isCollapsed)}
              className="lg:hidden"
            >
              <X className="h-4 w-4" />
            </Button>
          </div>

          {/* Navigation */}
          <ScrollArea className="flex-1 px-3 py-4">
            <nav className="space-y-2">
              {sidebarItems.map((item) => {
                const isActive = pathname === item.href
                return (
                  <Link key={item.href} href={item.href}>
                    <Button
                      variant={isActive ? "secondary" : "ghost"}
                      className={cn(
                        "w-full justify-start h-10",
                        isActive && "bg-secondary text-secondary-foreground",
                        isCollapsed && "lg:justify-center lg:px-2"
                      )}
                    >
                      <item.icon className={cn("h-4 w-4", !isCollapsed && "mr-2")} />
                      {!isCollapsed && <span>{item.title}</span>}
                    </Button>
                  </Link>
                )
              })}
            </nav>
          </ScrollArea>

          {/* Footer */}
          <div className="border-t border-border p-3">
            <Button
              variant="ghost"
              className={cn(
                "w-full justify-start h-10 text-destructive hover:text-destructive hover:bg-destructive/10",
                isCollapsed && "lg:justify-center lg:px-2"
              )}
            >
              <LogOut className={cn("h-4 w-4", !isCollapsed && "mr-2")} />
              {!isCollapsed && <span>Logout</span>}
            </Button>
          </div>
        </div>
      </div>

      {/* Mobile menu button */}
      <Button
        variant="outline"
        size="sm"
        onClick={() => setIsCollapsed(false)}
        className="fixed top-4 left-4 z-40 lg:hidden"
      >
        <Menu className="h-4 w-4" />
      </Button>
    </>
  )
}
