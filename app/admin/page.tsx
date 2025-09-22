'use client'

import { 
  Users, 
  MapPin, 
  Mail, 
  DollarSign,
  TrendingUp,
  Calendar,
  Eye,
  BarChart3
} from 'lucide-react'

export default function AdminDashboard() {
  // Mock data for dashboard - no actual backend calls
  const stats = {
    totalTrips: 0,
    totalBookings: 0,
    totalRevenue: 0,
    newsletterSubscribers: 0,
    monthlyGrowth: 0,
    pendingBookings: 0
  }

  const recentBookings = []
  const recentSubscribers = []

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Dashboard</h1>
        <p className="text-gray-600">Welcome to your admin dashboard</p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-white p-6 rounded-lg shadow">
          <div className="flex items-center">
            <div className="p-2 bg-blue-100 rounded-lg">
              <MapPin className="h-6 w-6 text-blue-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Total Trips</p>
              <p className="text-2xl font-semibold text-gray-900">{stats.totalTrips}</p>
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow">
          <div className="flex items-center">
            <div className="p-2 bg-green-100 rounded-lg">
              <Users className="h-6 w-6 text-green-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Total Bookings</p>
              <p className="text-2xl font-semibold text-gray-900">{stats.totalBookings}</p>
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow">
          <div className="flex items-center">
            <div className="p-2 bg-primary/10 rounded-lg">
              <DollarSign className="h-6 w-6 text-primary" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Total Revenue</p>
              <p className="text-2xl font-semibold text-gray-900">${stats.totalRevenue.toLocaleString()}</p>
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow">
          <div className="flex items-center">
            <div className="p-2 bg-orange-100 rounded-lg">
              <Mail className="h-6 w-6 text-orange-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Newsletter Subscribers</p>
              <p className="text-2xl font-semibold text-gray-900">{stats.newsletterSubscribers}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Charts and Analytics */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white p-6 rounded-lg shadow">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-medium text-gray-900">Monthly Revenue</h3>
            <TrendingUp className="h-5 w-5 text-primary" />
          </div>
          <div className="h-64 flex items-center justify-center bg-gray-50 rounded-lg">
            <div className="text-center">
              <BarChart3 className="h-12 w-12 mx-auto text-gray-400 mb-2" />
              <p className="text-gray-500">Revenue chart will appear here</p>
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-medium text-gray-900">Booking Trends</h3>
            <Calendar className="h-5 w-5 text-primary" />
          </div>
          <div className="h-64 flex items-center justify-center bg-gray-50 rounded-lg">
            <div className="text-center">
              <BarChart3 className="h-12 w-12 mx-auto text-gray-400 mb-2" />
              <p className="text-gray-500">Booking trends chart will appear here</p>
            </div>
          </div>
        </div>
      </div>

      {/* Recent Activity */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white rounded-lg shadow">
          <div className="p-6 border-b border-gray-200">
            <h3 className="text-lg font-medium text-gray-900">Recent Bookings</h3>
          </div>
          <div className="p-6">
            {recentBookings.length === 0 ? (
              <div className="text-center py-8">
                <Users className="h-12 w-12 mx-auto text-gray-400 mb-2" />
                <p className="text-gray-500">No recent bookings</p>
              </div>
            ) : (
              <div className="space-y-4">
                {recentBookings.map((booking: any) => (
                  <div key={booking.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                    <div>
                      <p className="text-sm font-medium text-gray-900">{booking.customerName}</p>
                      <p className="text-sm text-gray-500">{booking.tripTitle}</p>
                    </div>
                    <div className="text-right">
                      <p className="text-sm font-medium text-gray-900">${booking.amount}</p>
                      <p className="text-sm text-gray-500">{booking.date}</p>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        <div className="bg-white rounded-lg shadow">
          <div className="p-6 border-b border-gray-200">
            <h3 className="text-lg font-medium text-gray-900">Recent Subscribers</h3>
          </div>
          <div className="p-6">
            {recentSubscribers.length === 0 ? (
              <div className="text-center py-8">
                <Mail className="h-12 w-12 mx-auto text-gray-400 mb-2" />
                <p className="text-gray-500">No recent subscribers</p>
              </div>
            ) : (
              <div className="space-y-4">
                {recentSubscribers.map((subscriber: any) => (
                  <div key={subscriber.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                    <div>
                      <p className="text-sm font-medium text-gray-900">{subscriber.email}</p>
                      <p className="text-sm text-gray-500">{subscriber.source}</p>
                    </div>
                    <div className="text-right">
                      <p className="text-sm text-gray-500">{subscriber.date}</p>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="bg-white p-6 rounded-lg shadow">
        <h3 className="text-lg font-medium text-gray-900 mb-4">Quick Actions</h3>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <a
            href="/admin/trips"
            className="flex items-center p-4 bg-primary/5 rounded-lg hover:bg-primary/10 transition-colors"
          >
            <MapPin className="h-6 w-6 text-primary mr-3" />
            <div>
              <p className="text-sm font-medium text-gray-900">Add New Trip</p>
              <p className="text-sm text-gray-500">Create a new travel package</p>
            </div>
          </a>

          <a
            href="/admin/gallery"
            className="flex items-center p-4 bg-blue-50 rounded-lg hover:bg-blue-100 transition-colors"
          >
            <Eye className="h-6 w-6 text-blue-600 mr-3" />
            <div>
              <p className="text-sm font-medium text-gray-900">Upload Images</p>
              <p className="text-sm text-gray-500">Add to gallery</p>
            </div>
          </a>

          <a
            href="/admin/bookings"
            className="flex items-center p-4 bg-green-50 rounded-lg hover:bg-green-100 transition-colors"
          >
            <Users className="h-6 w-6 text-green-600 mr-3" />
            <div>
              <p className="text-sm font-medium text-gray-900">View Bookings</p>
              <p className="text-sm text-gray-500">Manage reservations</p>
            </div>
          </a>

          <a
            href="/admin/newsletter"
            className="flex items-center p-4 bg-orange-50 rounded-lg hover:bg-orange-100 transition-colors"
          >
            <Mail className="h-6 w-6 text-orange-600 mr-3" />
            <div>
              <p className="text-sm font-medium text-gray-900">Send Newsletter</p>
              <p className="text-sm text-gray-500">Email subscribers</p>
            </div>
          </a>
        </div>
      </div>
    </div>
  )
}
