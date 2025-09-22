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
  Users,
  Calendar,
  MapPin,
  Phone,
  Mail,
  DollarSign,
  Clock,
  CheckCircle,
  XCircle,
  AlertCircle
} from 'lucide-react'

interface Booking {
  id: string
  customerName: string
  customerEmail: string
  customerPhone: string
  tripTitle: string
  tripLocation: string
  bookingDate: string
  travelDate: string
  numberOfPeople: number
  totalAmount: number
  status: 'pending' | 'confirmed' | 'cancelled' | 'completed'
  paymentStatus: 'pending' | 'paid' | 'refunded'
  specialRequests?: string
  createdAt: string
}

export default function BookingsManagement() {
  const [bookings, setBookings] = useState<Booking[]>([])
  const [searchTerm, setSearchTerm] = useState('')
  const [statusFilter, setStatusFilter] = useState('all')
  const [paymentFilter, setPaymentFilter] = useState('all')
  const [selectedBooking, setSelectedBooking] = useState<Booking | null>(null)
  const [isViewDialogOpen, setIsViewDialogOpen] = useState(false)

  const filteredBookings = bookings.filter(booking => {
    const matchesSearch = booking.customerName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         booking.customerEmail.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         booking.tripTitle.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         booking.tripLocation.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesStatus = statusFilter === 'all' || booking.status === statusFilter
    const matchesPayment = paymentFilter === 'all' || booking.paymentStatus === paymentFilter
    return matchesSearch && matchesStatus && matchesPayment
  })

  const updateBookingStatus = (bookingId: string, newStatus: Booking['status']) => {
    setBookings(bookings.map(booking =>
      booking.id === bookingId ? { ...booking, status: newStatus } : booking
    ))
  }

  const updatePaymentStatus = (bookingId: string, newPaymentStatus: Booking['paymentStatus']) => {
    setBookings(bookings.map(booking =>
      booking.id === bookingId ? { ...booking, paymentStatus: newPaymentStatus } : booking
    ))
  }

  const openViewDialog = (booking: Booking) => {
    setSelectedBooking(booking)
    setIsViewDialogOpen(true)
  }

  const getStatusBadgeVariant = (status: string) => {
    switch (status) {
      case 'confirmed': return 'default'
      case 'completed': return 'default'
      case 'pending': return 'secondary'
      case 'cancelled': return 'destructive'
      default: return 'outline'
    }
  }

  const getPaymentBadgeVariant = (status: string) => {
    switch (status) {
      case 'paid': return 'default'
      case 'pending': return 'secondary'
      case 'refunded': return 'outline'
      default: return 'outline'
    }
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'confirmed': return <CheckCircle className="h-3 w-3" />
      case 'completed': return <CheckCircle className="h-3 w-3" />
      case 'pending': return <Clock className="h-3 w-3" />
      case 'cancelled': return <XCircle className="h-3 w-3" />
      default: return <AlertCircle className="h-3 w-3" />
    }
  }

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD'
    }).format(amount)
  }

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    })
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between space-y-4 sm:space-y-0">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Bookings Management</h1>
          <p className="text-muted-foreground">Manage customer reservations and bookings</p>
        </div>
        <div className="flex items-center space-x-2">
          <Badge variant="outline" className="text-sm">
            Total: {filteredBookings.length}
          </Badge>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Total Bookings
            </CardTitle>
            <Users className="h-4 w-4 text-primary" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-foreground">{bookings.length}</div>
            <p className="text-xs text-muted-foreground">All time bookings</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Pending
            </CardTitle>
            <Clock className="h-4 w-4 text-orange-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-foreground">
              {bookings.filter(b => b.status === 'pending').length}
            </div>
            <p className="text-xs text-muted-foreground">Awaiting confirmation</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Confirmed
            </CardTitle>
            <CheckCircle className="h-4 w-4 text-green-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-foreground">
              {bookings.filter(b => b.status === 'confirmed').length}
            </div>
            <p className="text-xs text-muted-foreground">Ready to travel</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Revenue
            </CardTitle>
            <DollarSign className="h-4 w-4 text-green-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-foreground">
              {formatCurrency(bookings.reduce((sum, b) => sum + b.totalAmount, 0))}
            </div>
            <p className="text-xs text-muted-foreground">Total bookings value</p>
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
                placeholder="Search by customer name, email, trip, or location..."
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
                  <SelectItem value="pending">Pending</SelectItem>
                  <SelectItem value="confirmed">Confirmed</SelectItem>
                  <SelectItem value="completed">Completed</SelectItem>
                  <SelectItem value="cancelled">Cancelled</SelectItem>
                </SelectContent>
              </Select>
              <Select value={paymentFilter} onValueChange={setPaymentFilter}>
                <SelectTrigger className="w-full sm:w-[150px]">
                  <DollarSign className="h-4 w-4 mr-2" />
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Payments</SelectItem>
                  <SelectItem value="pending">Payment Pending</SelectItem>
                  <SelectItem value="paid">Paid</SelectItem>
                  <SelectItem value="refunded">Refunded</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Bookings Table */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Users className="h-5 w-5" />
            <span>All Bookings ({filteredBookings.length})</span>
          </CardTitle>
          <CardDescription>
            Manage customer reservations and travel bookings
          </CardDescription>
        </CardHeader>
        <CardContent>
          {filteredBookings.length === 0 ? (
            <div className="text-center py-12">
              <Users className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
              <h3 className="text-lg font-semibold text-foreground mb-2">No bookings found</h3>
              <p className="text-muted-foreground mb-4">
                {searchTerm || statusFilter !== 'all' || paymentFilter !== 'all'
                  ? 'No bookings match your search criteria.'
                  : 'No bookings have been made yet.'}
              </p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Customer</TableHead>
                    <TableHead className="hidden sm:table-cell">Trip</TableHead>
                    <TableHead className="hidden md:table-cell">Travel Date</TableHead>
                    <TableHead className="hidden lg:table-cell">People</TableHead>
                    <TableHead className="hidden lg:table-cell">Amount</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead className="hidden md:table-cell">Payment</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredBookings.map((booking) => (
                    <TableRow key={booking.id}>
                      <TableCell>
                        <div className="space-y-1">
                          <div className="font-medium text-foreground">{booking.customerName}</div>
                          <div className="text-sm text-muted-foreground">{booking.customerEmail}</div>
                          <div className="sm:hidden text-xs text-muted-foreground">
                            {booking.tripTitle} • {formatDate(booking.travelDate)}
                          </div>
                        </div>
                      </TableCell>
                      <TableCell className="hidden sm:table-cell">
                        <div className="space-y-1">
                          <div className="font-medium text-sm">{booking.tripTitle}</div>
                          <div className="flex items-center space-x-1 text-xs text-muted-foreground">
                            <MapPin className="h-3 w-3" />
                            <span>{booking.tripLocation}</span>
                          </div>
                        </div>
                      </TableCell>
                      <TableCell className="hidden md:table-cell">
                        <div className="flex items-center space-x-1 text-sm">
                          <Calendar className="h-3 w-3 text-muted-foreground" />
                          <span>{formatDate(booking.travelDate)}</span>
                        </div>
                      </TableCell>
                      <TableCell className="hidden lg:table-cell">
                        <div className="flex items-center space-x-1 text-sm">
                          <Users className="h-3 w-3 text-muted-foreground" />
                          <span>{booking.numberOfPeople}</span>
                        </div>
                      </TableCell>
                      <TableCell className="hidden lg:table-cell">
                        <div className="font-medium text-sm">
                          {formatCurrency(booking.totalAmount)}
                        </div>
                      </TableCell>
                      <TableCell>
                        <Badge variant={getStatusBadgeVariant(booking.status)} className="text-xs">
                          <div className="flex items-center space-x-1">
                            {getStatusIcon(booking.status)}
                            <span>{booking.status}</span>
                          </div>
                        </Badge>
                      </TableCell>
                      <TableCell className="hidden md:table-cell">
                        <Badge variant={getPaymentBadgeVariant(booking.paymentStatus)} className="text-xs">
                          {booking.paymentStatus}
                        </Badge>
                      </TableCell>
                      <TableCell className="text-right">
                        <div className="flex items-center justify-end space-x-2">
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => openViewDialog(booking)}
                          >
                            <Eye className="h-4 w-4" />
                          </Button>
                          <Select
                            value={booking.status}
                            onValueChange={(value: any) => updateBookingStatus(booking.id, value)}
                          >
                            <SelectTrigger className="w-[100px] h-8">
                              <SelectValue />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="pending">Pending</SelectItem>
                              <SelectItem value="confirmed">Confirmed</SelectItem>
                              <SelectItem value="completed">Completed</SelectItem>
                              <SelectItem value="cancelled">Cancelled</SelectItem>
                            </SelectContent>
                          </Select>
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

      {/* View Booking Dialog */}
      <Dialog open={isViewDialogOpen} onOpenChange={setIsViewDialogOpen}>
        <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Booking Details</DialogTitle>
            <DialogDescription>
              Complete information about this booking
            </DialogDescription>
          </DialogHeader>
          {selectedBooking && (
            <div className="space-y-6 py-4">
              {/* Customer Information */}
              <div className="space-y-3">
                <h3 className="text-lg font-semibold text-foreground">Customer Information</h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <div className="flex items-center space-x-2">
                      <Users className="h-4 w-4 text-muted-foreground" />
                      <span className="text-sm font-medium">Name</span>
                    </div>
                    <p className="text-sm text-foreground pl-6">{selectedBooking.customerName}</p>
                  </div>
                  <div className="space-y-2">
                    <div className="flex items-center space-x-2">
                      <Mail className="h-4 w-4 text-muted-foreground" />
                      <span className="text-sm font-medium">Email</span>
                    </div>
                    <p className="text-sm text-foreground pl-6">{selectedBooking.customerEmail}</p>
                  </div>
                  <div className="space-y-2">
                    <div className="flex items-center space-x-2">
                      <Phone className="h-4 w-4 text-muted-foreground" />
                      <span className="text-sm font-medium">Phone</span>
                    </div>
                    <p className="text-sm text-foreground pl-6">{selectedBooking.customerPhone}</p>
                  </div>
                  <div className="space-y-2">
                    <div className="flex items-center space-x-2">
                      <Users className="h-4 w-4 text-muted-foreground" />
                      <span className="text-sm font-medium">Number of People</span>
                    </div>
                    <p className="text-sm text-foreground pl-6">{selectedBooking.numberOfPeople}</p>
                  </div>
                </div>
              </div>

              {/* Trip Information */}
              <div className="space-y-3">
                <h3 className="text-lg font-semibold text-foreground">Trip Information</h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <div className="flex items-center space-x-2">
                      <MapPin className="h-4 w-4 text-muted-foreground" />
                      <span className="text-sm font-medium">Trip</span>
                    </div>
                    <p className="text-sm text-foreground pl-6">{selectedBooking.tripTitle}</p>
                  </div>
                  <div className="space-y-2">
                    <div className="flex items-center space-x-2">
                      <MapPin className="h-4 w-4 text-muted-foreground" />
                      <span className="text-sm font-medium">Location</span>
                    </div>
                    <p className="text-sm text-foreground pl-6">{selectedBooking.tripLocation}</p>
                  </div>
                  <div className="space-y-2">
                    <div className="flex items-center space-x-2">
                      <Calendar className="h-4 w-4 text-muted-foreground" />
                      <span className="text-sm font-medium">Travel Date</span>
                    </div>
                    <p className="text-sm text-foreground pl-6">{formatDate(selectedBooking.travelDate)}</p>
                  </div>
                  <div className="space-y-2">
                    <div className="flex items-center space-x-2">
                      <DollarSign className="h-4 w-4 text-muted-foreground" />
                      <span className="text-sm font-medium">Total Amount</span>
                    </div>
                    <p className="text-sm text-foreground pl-6 font-semibold">
                      {formatCurrency(selectedBooking.totalAmount)}
                    </p>
                  </div>
                </div>
              </div>

              {/* Booking Status */}
              <div className="space-y-3">
                <h3 className="text-lg font-semibold text-foreground">Status Information</h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <span className="text-sm font-medium">Booking Status</span>
                    <div className="pl-0">
                      <Badge variant={getStatusBadgeVariant(selectedBooking.status)}>
                        <div className="flex items-center space-x-1">
                          {getStatusIcon(selectedBooking.status)}
                          <span>{selectedBooking.status}</span>
                        </div>
                      </Badge>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <span className="text-sm font-medium">Payment Status</span>
                    <div className="pl-0">
                      <Badge variant={getPaymentBadgeVariant(selectedBooking.paymentStatus)}>
                        {selectedBooking.paymentStatus}
                      </Badge>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <span className="text-sm font-medium">Booking Date</span>
                    <p className="text-sm text-foreground">{formatDate(selectedBooking.bookingDate)}</p>
                  </div>
                  <div className="space-y-2">
                    <span className="text-sm font-medium">Created</span>
                    <p className="text-sm text-foreground">{formatDate(selectedBooking.createdAt)}</p>
                  </div>
                </div>
              </div>

              {/* Special Requests */}
              {selectedBooking.specialRequests && (
                <div className="space-y-3">
                  <h3 className="text-lg font-semibold text-foreground">Special Requests</h3>
                  <p className="text-sm text-foreground bg-muted p-3 rounded-lg">
                    {selectedBooking.specialRequests}
                  </p>
                </div>
              )}

              {/* Quick Actions */}
              <div className="space-y-3">
                <h3 className="text-lg font-semibold text-foreground">Quick Actions</h3>
                <div className="flex flex-wrap gap-2">
                  <Select
                    value={selectedBooking.status}
                    onValueChange={(value: any) => {
                      updateBookingStatus(selectedBooking.id, value)
                      setSelectedBooking({...selectedBooking, status: value})
                    }}
                  >
                    <SelectTrigger className="w-[140px]">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="pending">Pending</SelectItem>
                      <SelectItem value="confirmed">Confirmed</SelectItem>
                      <SelectItem value="completed">Completed</SelectItem>
                      <SelectItem value="cancelled">Cancelled</SelectItem>
                    </SelectContent>
                  </Select>
                  <Select
                    value={selectedBooking.paymentStatus}
                    onValueChange={(value: any) => {
                      updatePaymentStatus(selectedBooking.id, value)
                      setSelectedBooking({...selectedBooking, paymentStatus: value})
                    }}
                  >
                    <SelectTrigger className="w-[140px]">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="pending">Payment Pending</SelectItem>
                      <SelectItem value="paid">Paid</SelectItem>
                      <SelectItem value="refunded">Refunded</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  )
}
