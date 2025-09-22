'use client'

import { useState } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { 
  LayoutDashboard, 
  MapPin, 
  Images, 
  Users, 
  Mail, 
  Menu,
  X,
  LogOut,
  Bell,
  Search
} from 'lucide-react'

const sidebarItems = [
  { name: 'Dashboard', href: '/admin', icon: LayoutDashboard },
  { name: 'Trips', href: '/admin/trips', icon: MapPin },
  { name: 'Gallery', href: '/admin/gallery', icon: Images },
  { name: 'Bookings', href: '/admin/bookings', icon: Users },
  { name: 'Newsletter', href: '/admin/newsletter', icon: Mail },
]

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const pathname = usePathname()

  return (
    <div className="h-screen bg-gray-50 flex overflow-hidden">
      {/* Mobile sidebar overlay */}
      {sidebarOpen && (
        <div 
          className="fixed inset-0 z-40 bg-black/50 backdrop-blur-sm lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Sidebar - Full Height */}
      <div className={`
        fixed inset-y-0 left-0 z-50 w-64 bg-white shadow-xl border-r border-gray-200
        transform transition-all duration-300 ease-in-out flex flex-col
        ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'}
        lg:translate-x-0 lg:relative lg:flex
      `}>
        {/* Sidebar Header */}
        <div className="flex items-center justify-between h-14 px-6 border-b border-gray-200 flex-shrink-0">
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
              <LayoutDashboard className="h-4 w-4 text-white" />
            </div>
            <h1 className="text-lg font-bold text-gray-900">Admin Panel</h1>
          </div>
          <button
            onClick={() => setSidebarOpen(false)}
            className="lg:hidden p-2 rounded-lg hover:bg-gray-100 transition-colors"
          >
            <X className="h-4 w-4 text-gray-500" />
          </button>
        </div>
        
        {/* Navigation - Flexible */}
        <nav className="flex-1 px-4 py-6 space-y-2 overflow-y-auto">
          {sidebarItems.map((item) => {
            const Icon = item.icon
            const isActive = pathname === item.href
            
            return (
              <Link
                key={item.name}
                href={item.href}
                className={`
                  group flex items-center px-4 py-3 text-sm font-medium rounded-xl transition-all duration-200
                  ${isActive 
                    ? 'bg-primary text-white shadow-lg shadow-primary/25' 
                    : 'text-gray-700 hover:bg-gray-100 hover:text-gray-900'
                  }
                `}
                onClick={() => setSidebarOpen(false)}
              >
                <Icon className={`h-5 w-5 mr-3 transition-colors ${
                  isActive ? 'text-white' : 'text-gray-500 group-hover:text-gray-700'
                }`} />
                {item.name}
              </Link>
            )
          })}
        </nav>

        {/* Sidebar Footer - Fixed at bottom */}
        <div className="p-4 border-t border-gray-200 flex-shrink-0">
          <button className="group flex items-center w-full px-4 py-3 text-sm font-medium text-gray-700 rounded-xl hover:bg-red-50 hover:text-red-600 transition-all duration-200">
            <LogOut className="h-5 w-5 mr-3 text-gray-500 group-hover:text-red-500 transition-colors" />
            Sign Out
          </button>
        </div>
      </div>

      {/* Main content - Full Height */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Top header - Consistent Height */}
        <header className="bg-white shadow-sm border-b border-gray-200 h-14 flex-shrink-0">
          <div className="flex items-center justify-between px-4 lg:px-6 h-full">
            <div className="flex items-center space-x-4">
              <button
                onClick={() => setSidebarOpen(true)}
                className="lg:hidden p-2 rounded-lg hover:bg-gray-100 transition-colors"
              >
                <Menu className="h-5 w-5 text-gray-600" />
              </button>
              
              {/* Breadcrumb */}
              <div className="hidden sm:flex items-center space-x-2 text-sm text-gray-600">
                <span>Admin</span>
                <span>/</span>
                <span className="text-gray-900 font-medium">
                  {pathname === '/admin' ? 'Dashboard' : (() => {
                    const lastSegment = pathname.split('/').pop()
                    return lastSegment ? lastSegment.charAt(0).toUpperCase() + lastSegment.slice(1) : 'Page'
                  })()}
                </span>
              </div>
            </div>
            
            <div className="flex items-center space-x-3">
              {/* Search - hidden on mobile */}
              <div className="hidden md:flex items-center">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                  <input
                    type="text"
                    placeholder="Quick search..."
                    className="pl-10 pr-4 py-2 w-64 text-sm bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-colors"
                  />
                </div>
              </div>
              
              {/* Notifications */}
              <button className="relative p-2 rounded-lg hover:bg-gray-100 transition-colors">
                <Bell className="h-5 w-5 text-gray-600" />
                <span className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full"></span>
              </button>
              
              {/* Admin Profile */}
              <div className="flex items-center space-x-3 pl-3 border-l border-gray-200">
                <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center">
                  <span className="text-sm font-medium text-white">A</span>
                </div>
                <div className="hidden sm:block">
                  <p className="text-sm font-medium text-gray-900">Admin</p>
                  <p className="text-xs text-gray-500">Administrator</p>
                </div>
              </div>
            </div>
          </div>
        </header>

        {/* Page content - Scrollable */}
        <main className="flex-1 overflow-y-auto p-4 sm:p-6 lg:p-8">
          <div className="max-w-7xl mx-auto">
            {children}
          </div>
        </main>
      </div>
    </div>
  )
}
