'use client'

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { MapPin, Image, Users, Mail, TrendingUp, Calendar } from 'lucide-react'

export default function AdminDashboard() {
  const stats = [
    {
      title: 'Total Trips',
      value: '0',
      description: 'Active travel packages',
      icon: MapPin,
      color: 'text-primary',
    },
    {
      title: 'Gallery Images',
      value: '0',
      description: 'Photos in gallery',
      icon: Image,
      color: 'text-blue-600',
    },
    {
      title: 'Bookings',
      value: '0',
      description: 'Total reservations',
      icon: Users,
      color: 'text-green-600',
    },
    {
      title: 'Newsletter Subscribers',
      value: '0',
      description: 'Active subscribers',
      icon: Mail,
      color: 'text-orange-600',
    },
  ]

  const recentActivity = [
    {
      type: 'info',
      message: 'Admin dashboard initialized',
      time: 'Just now',
    },
  ]

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col space-y-2">
        <h1 className="text-3xl font-bold text-foreground">Dashboard</h1>
        <p className="text-muted-foreground">
          Welcome to Continental Travel & Tours Admin Panel
        </p>
      </div>

      {/* Stats Grid */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat) => (
          <Card key={stat.title} className="hover:shadow-md transition-shadow">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                {stat.title}
              </CardTitle>
              <stat.icon className={`h-4 w-4 ${stat.color}`} />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-foreground">{stat.value}</div>
              <p className="text-xs text-muted-foreground">{stat.description}</p>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Recent Activity and Quick Actions */}
      <div className="grid gap-6 md:grid-cols-2">
        {/* Recent Activity */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <TrendingUp className="h-5 w-5" />
              <span>Recent Activity</span>
            </CardTitle>
            <CardDescription>Latest updates and changes</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recentActivity.map((activity, index) => (
                <div key={index} className="flex items-start space-x-3">
                  <div className="flex-shrink-0">
                    <Badge variant="secondary" className="text-xs">
                      {activity.type}
                    </Badge>
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm text-foreground">{activity.message}</p>
                    <p className="text-xs text-muted-foreground">{activity.time}</p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Quick Actions */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Calendar className="h-5 w-5" />
              <span>Quick Actions</span>
            </CardTitle>
            <CardDescription>Common administrative tasks</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid gap-3">
              <div className="flex items-center justify-between p-3 rounded-lg border border-border hover:bg-muted/50 transition-colors cursor-pointer">
                <div className="flex items-center space-x-3">
                  <MapPin className="h-4 w-4 text-primary" />
                  <span className="text-sm font-medium">Create New Trip</span>
                </div>
                <Badge variant="outline">Go to Trips</Badge>
              </div>
              <div className="flex items-center justify-between p-3 rounded-lg border border-border hover:bg-muted/50 transition-colors cursor-pointer">
                <div className="flex items-center space-x-3">
                  <Image className="h-4 w-4 text-blue-600" />
                  <span className="text-sm font-medium">Upload Images</span>
                </div>
                <Badge variant="outline">Go to Gallery</Badge>
              </div>
              <div className="flex items-center justify-between p-3 rounded-lg border border-border hover:bg-muted/50 transition-colors cursor-pointer">
                <div className="flex items-center space-x-3">
                  <Users className="h-4 w-4 text-green-600" />
                  <span className="text-sm font-medium">View Bookings</span>
                </div>
                <Badge variant="outline">Go to Bookings</Badge>
              </div>
              <div className="flex items-center justify-between p-3 rounded-lg border border-border hover:bg-muted/50 transition-colors cursor-pointer">
                <div className="flex items-center space-x-3">
                  <Mail className="h-4 w-4 text-orange-600" />
                  <span className="text-sm font-medium">Newsletter</span>
                </div>
                <Badge variant="outline">Go to Newsletter</Badge>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
