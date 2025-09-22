'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Badge } from '@/components/ui/badge'
import { 
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { 
  Search, 
  Eye, 
  Filter,
  Mail,
  Calendar,
  Users,
  Download,
  Trash2,
  CheckCircle,
  XCircle,
  UserPlus,
  Send
} from 'lucide-react'

interface Subscriber {
  id: string
  email: string
  name?: string
  status: 'active' | 'unsubscribed' | 'bounced'
  source: 'website' | 'manual' | 'import'
  subscribedAt: string
  lastEmailSent?: string
  emailsSent: number
  location?: string
  interests?: string[]
}

export default function NewsletterManagement() {
  const [subscribers, setSubscribers] = useState<Subscriber[]>([])
  const [searchTerm, setSearchTerm] = useState('')
  const [statusFilter, setStatusFilter] = useState('all')
  const [sourceFilter, setSourceFilter] = useState('all')
  const [selectedSubscriber, setSelectedSubscriber] = useState<Subscriber | null>(null)
  const [isViewDialogOpen, setIsViewDialogOpen] = useState(false)

  const filteredSubscribers = subscribers.filter(subscriber => {
    const matchesSearch = subscriber.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         (subscriber.name && subscriber.name.toLowerCase().includes(searchTerm.toLowerCase())) ||
                         (subscriber.location && subscriber.location.toLowerCase().includes(searchTerm.toLowerCase()))
    const matchesStatus = statusFilter === 'all' || subscriber.status === statusFilter
    const matchesSource = sourceFilter === 'all' || subscriber.source === sourceFilter
    return matchesSearch && matchesStatus && matchesSource
  })

  const updateSubscriberStatus = (subscriberId: string, newStatus: Subscriber['status']) => {
    setSubscribers(subscribers.map(subscriber =>
      subscriber.id === subscriberId ? { ...subscriber, status: newStatus } : subscriber
    ))
  }

  const deleteSubscriber = (subscriberId: string) => {
    setSubscribers(subscribers.filter(subscriber => subscriber.id !== subscriberId))
  }

  const openViewDialog = (subscriber: Subscriber) => {
    setSelectedSubscriber(subscriber)
    setIsViewDialogOpen(true)
  }

  const getStatusBadgeVariant = (status: string) => {
    switch (status) {
      case 'active': return 'default'
      case 'unsubscribed': return 'secondary'
      case 'bounced': return 'destructive'
      default: return 'outline'
    }
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'active': return <CheckCircle className="h-3 w-3" />
      case 'unsubscribed': return <XCircle className="h-3 w-3" />
      case 'bounced': return <XCircle className="h-3 w-3" />
      default: return <CheckCircle className="h-3 w-3" />
    }
  }

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    })
  }

  const exportSubscribers = () => {
    // Frontend only - simulate export
    const csvContent = [
      ['Email', 'Name', 'Status', 'Source', 'Subscribed Date', 'Location'].join(','),
      ...filteredSubscribers.map(sub => [
        sub.email,
        sub.name || '',
        sub.status,
        sub.source,
        formatDate(sub.subscribedAt),
        sub.location || ''
      ].join(','))
    ].join('\n')

    const blob = new Blob([csvContent], { type: 'text/csv' })
    const url = window.URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = 'newsletter-subscribers.csv'
    a.click()
    window.URL.revokeObjectURL(url)
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between space-y-4 sm:space-y-0">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Newsletter Management</h1>
          <p className="text-muted-foreground">Manage your email subscribers and campaigns</p>
        </div>
        <div className="flex items-center space-x-2">
          <Button variant="outline" onClick={exportSubscribers}>
            <Download className="h-4 w-4 mr-2" />
            Export
          </Button>
          <Button>
            <Send className="h-4 w-4 mr-2" />
            Send Campaign
          </Button>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Total Subscribers
            </CardTitle>
            <Users className="h-4 w-4 text-primary" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-foreground">{subscribers.length}</div>
            <p className="text-xs text-muted-foreground">All subscribers</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Active
            </CardTitle>
            <CheckCircle className="h-4 w-4 text-green-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-foreground">
              {subscribers.filter(s => s.status === 'active').length}
            </div>
            <p className="text-xs text-muted-foreground">Receiving emails</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Unsubscribed
            </CardTitle>
            <XCircle className="h-4 w-4 text-orange-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-foreground">
              {subscribers.filter(s => s.status === 'unsubscribed').length}
            </div>
            <p className="text-xs text-muted-foreground">Opted out</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Growth Rate
            </CardTitle>
            <UserPlus className="h-4 w-4 text-blue-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-foreground">+0%</div>
            <p className="text-xs text-muted-foreground">This month</p>
          </CardContent>
        </Card>
      </div>

      {/* Search and Filters */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Search & Filter</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col lg:flex-row gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search by email, name, or location..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            <div className="flex flex-col sm:flex-row gap-2">
              <Select value={statusFilter} onValueChange={setStatusFilter}>
                <SelectTrigger className="w-full sm:w-[150px]">
                  <Filter className="h-4 w-4 mr-2" />
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Status</SelectItem>
                  <SelectItem value="active">Active</SelectItem>
                  <SelectItem value="unsubscribed">Unsubscribed</SelectItem>
                  <SelectItem value="bounced">Bounced</SelectItem>
                </SelectContent>
              </Select>
              <Select value={sourceFilter} onValueChange={setSourceFilter}>
                <SelectTrigger className="w-full sm:w-[150px]">
                  <UserPlus className="h-4 w-4 mr-2" />
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Sources</SelectItem>
                  <SelectItem value="website">Website</SelectItem>
                  <SelectItem value="manual">Manual</SelectItem>
                  <SelectItem value="import">Import</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Subscribers Table */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Mail className="h-5 w-5" />
            <span>All Subscribers ({filteredSubscribers.length})</span>
          </CardTitle>
          <CardDescription>
            Manage your newsletter subscriber list
          </CardDescription>
        </CardHeader>
        <CardContent>
          {filteredSubscribers.length === 0 ? (
            <div className="text-center py-12">
              <Mail className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
              <h3 className="text-lg font-semibold text-foreground mb-2">No subscribers found</h3>
              <p className="text-muted-foreground mb-4">
                {searchTerm || statusFilter !== 'all' || sourceFilter !== 'all'
                  ? 'No subscribers match your search criteria.'
                  : 'No newsletter subscribers yet.'}
              </p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Subscriber</TableHead>
                    <TableHead className="hidden sm:table-cell">Source</TableHead>
                    <TableHead className="hidden md:table-cell">Subscribed</TableHead>
                    <TableHead className="hidden lg:table-cell">Emails Sent</TableHead>
                    <TableHead className="hidden lg:table-cell">Last Email</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredSubscribers.map((subscriber) => (
                    <TableRow key={subscriber.id}>
                      <TableCell>
                        <div className="space-y-1">
                          <div className="font-medium text-foreground">{subscriber.email}</div>
                          {subscriber.name && (
                            <div className="text-sm text-muted-foreground">{subscriber.name}</div>
                          )}
                          {subscriber.location && (
                            <div className="text-xs text-muted-foreground">{subscriber.location}</div>
                          )}
                          <div className="sm:hidden text-xs text-muted-foreground">
                            {subscriber.source} • {formatDate(subscriber.subscribedAt)}
                          </div>
                        </div>
                      </TableCell>
                      <TableCell className="hidden sm:table-cell">
                        <Badge variant="outline" className="text-xs">
                          {subscriber.source}
                        </Badge>
                      </TableCell>
                      <TableCell className="hidden md:table-cell">
                        <div className="flex items-center space-x-1 text-sm">
                          <Calendar className="h-3 w-3 text-muted-foreground" />
                          <span>{formatDate(subscriber.subscribedAt)}</span>
                        </div>
                      </TableCell>
                      <TableCell className="hidden lg:table-cell">
                        <div className="text-sm font-medium">
                          {subscriber.emailsSent}
                        </div>
                      </TableCell>
                      <TableCell className="hidden lg:table-cell">
                        <div className="text-sm text-muted-foreground">
                          {subscriber.lastEmailSent ? formatDate(subscriber.lastEmailSent) : 'Never'}
                        </div>
                      </TableCell>
                      <TableCell>
                        <Badge variant={getStatusBadgeVariant(subscriber.status)} className="text-xs">
                          <div className="flex items-center space-x-1">
                            {getStatusIcon(subscriber.status)}
                            <span>{subscriber.status}</span>
                          </div>
                        </Badge>
                      </TableCell>
                      <TableCell className="text-right">
                        <div className="flex items-center justify-end space-x-2">
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => openViewDialog(subscriber)}
                          >
                            <Eye className="h-4 w-4" />
                          </Button>
                          <Select
                            value={subscriber.status}
                            onValueChange={(value: any) => updateSubscriberStatus(subscriber.id, value)}
                          >
                            <SelectTrigger className="w-[100px] h-8">
                              <SelectValue />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="active">Active</SelectItem>
                              <SelectItem value="unsubscribed">Unsubscribed</SelectItem>
                              <SelectItem value="bounced">Bounced</SelectItem>
                            </SelectContent>
                          </Select>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => deleteSubscriber(subscriber.id)}
                            className="text-destructive hover:text-destructive"
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          )}
        </CardContent>
      </Card>

      {/* View Subscriber Dialog */}
      <Dialog open={isViewDialogOpen} onOpenChange={setIsViewDialogOpen}>
        <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Subscriber Details</DialogTitle>
            <DialogDescription>
              Complete information about this subscriber
            </DialogDescription>
          </DialogHeader>
          {selectedSubscriber && (
            <div className="space-y-6 py-4">
              {/* Basic Information */}
              <div className="space-y-3">
                <h3 className="text-lg font-semibold text-foreground">Basic Information</h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <div className="flex items-center space-x-2">
                      <Mail className="h-4 w-4 text-muted-foreground" />
                      <span className="text-sm font-medium">Email</span>
                    </div>
                    <p className="text-sm text-foreground pl-6">{selectedSubscriber.email}</p>
                  </div>
                  {selectedSubscriber.name && (
                    <div className="space-y-2">
                      <div className="flex items-center space-x-2">
                        <Users className="h-4 w-4 text-muted-foreground" />
                        <span className="text-sm font-medium">Name</span>
                      </div>
                      <p className="text-sm text-foreground pl-6">{selectedSubscriber.name}</p>
                    </div>
                  )}
                  {selectedSubscriber.location && (
                    <div className="space-y-2">
                      <div className="flex items-center space-x-2">
                        <Users className="h-4 w-4 text-muted-foreground" />
                        <span className="text-sm font-medium">Location</span>
                      </div>
                      <p className="text-sm text-foreground pl-6">{selectedSubscriber.location}</p>
                    </div>
                  )}
                  <div className="space-y-2">
                    <div className="flex items-center space-x-2">
                      <UserPlus className="h-4 w-4 text-muted-foreground" />
                      <span className="text-sm font-medium">Source</span>
                    </div>
                    <div className="pl-6">
                      <Badge variant="outline">{selectedSubscriber.source}</Badge>
                    </div>
                  </div>
                </div>
              </div>

              {/* Subscription Status */}
              <div className="space-y-3">
                <h3 className="text-lg font-semibold text-foreground">Subscription Status</h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <span className="text-sm font-medium">Status</span>
                    <div className="pl-0">
                      <Badge variant={getStatusBadgeVariant(selectedSubscriber.status)}>
                        <div className="flex items-center space-x-1">
                          {getStatusIcon(selectedSubscriber.status)}
                          <span>{selectedSubscriber.status}</span>
                        </div>
                      </Badge>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <span className="text-sm font-medium">Subscribed Date</span>
                    <p className="text-sm text-foreground">{formatDate(selectedSubscriber.subscribedAt)}</p>
                  </div>
                </div>
              </div>

              {/* Email Statistics */}
              <div className="space-y-3">
                <h3 className="text-lg font-semibold text-foreground">Email Statistics</h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <span className="text-sm font-medium">Total Emails Sent</span>
                    <p className="text-sm text-foreground font-semibold">{selectedSubscriber.emailsSent}</p>
                  </div>
                  <div className="space-y-2">
                    <span className="text-sm font-medium">Last Email Sent</span>
                    <p className="text-sm text-foreground">
                      {selectedSubscriber.lastEmailSent ? formatDate(selectedSubscriber.lastEmailSent) : 'Never'}
                    </p>
                  </div>
                </div>
              </div>

              {/* Interests */}
              {selectedSubscriber.interests && selectedSubscriber.interests.length > 0 && (
                <div className="space-y-3">
                  <h3 className="text-lg font-semibold text-foreground">Interests</h3>
                  <div className="flex flex-wrap gap-2">
                    {selectedSubscriber.interests.map((interest, index) => (
                      <Badge key={index} variant="secondary">
                        {interest}
                      </Badge>
                    ))}
                  </div>
                </div>
              )}

              {/* Quick Actions */}
              <div className="space-y-3">
                <h3 className="text-lg font-semibold text-foreground">Quick Actions</h3>
                <div className="flex flex-wrap gap-2">
                  <Select
                    value={selectedSubscriber.status}
                    onValueChange={(value: any) => {
                      updateSubscriberStatus(selectedSubscriber.id, value)
                      setSelectedSubscriber({...selectedSubscriber, status: value})
                    }}
                  >
                    <SelectTrigger className="w-[140px]">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="active">Active</SelectItem>
                      <SelectItem value="unsubscribed">Unsubscribed</SelectItem>
                      <SelectItem value="bounced">Bounced</SelectItem>
                    </SelectContent>
                  </Select>
                  <Button variant="outline" size="sm">
                    <Send className="h-4 w-4 mr-2" />
                    Send Test Email
                  </Button>
                  <Button 
                    variant="outline" 
                    size="sm"
                    onClick={() => {
                      deleteSubscriber(selectedSubscriber.id)
                      setIsViewDialogOpen(false)
                    }}
                    className="text-destructive hover:text-destructive"
                  >
                    <Trash2 className="h-4 w-4 mr-2" />
                    Delete
                  </Button>
                </div>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  )
}
