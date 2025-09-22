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
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { 
  Plus, 
  Search, 
  Edit, 
  Trash2, 
  MapPin, 
  Calendar, 
  Users,
  DollarSign,
  Image as ImageIcon
} from 'lucide-react'

interface Trip {
  id: string
  title: string
  description: string
  location: string
  duration: string
  maxPeople: number
  price: number
  status: 'active' | 'inactive' | 'draft'
  images: string[]
  createdAt: string
}

export default function TripsManagement() {
  const [trips, setTrips] = useState<Trip[]>([])
  const [searchTerm, setSearchTerm] = useState('')
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false)
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false)
  const [selectedTrip, setSelectedTrip] = useState<Trip | null>(null)
  const [formData, setFormData] = useState<{
    title: string
    description: string
    location: string
    duration: string
    maxPeople: string
    price: string
    status: 'active' | 'inactive' | 'draft'
    images: string[]
  }>({
    title: '',
    description: '',
    location: '',
    duration: '',
    maxPeople: '',
    price: '',
    status: 'draft',
    images: []
  })

  const filteredTrips = trips.filter(trip =>
    trip.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    trip.location.toLowerCase().includes(searchTerm.toLowerCase())
  )

  const handleCreateTrip = () => {
    // Frontend only - no actual API call
    const newTrip: Trip = {
      id: Date.now().toString(),
      title: formData.title,
      description: formData.description,
      location: formData.location,
      duration: formData.duration,
      maxPeople: parseInt(formData.maxPeople),
      price: parseFloat(formData.price),
      status: formData.status,
      images: formData.images,
      createdAt: new Date().toISOString()
    }
    setTrips([...trips, newTrip])
    setIsCreateDialogOpen(false)
    resetForm()
  }

  const handleEditTrip = () => {
    if (!selectedTrip) return
    
    const updatedTrips = trips.map(trip =>
      trip.id === selectedTrip.id
        ? {
            ...trip,
            title: formData.title,
            description: formData.description,
            location: formData.location,
            duration: formData.duration,
            maxPeople: parseInt(formData.maxPeople),
            price: parseFloat(formData.price),
            status: formData.status,
            images: formData.images
          }
        : trip
    )
    setTrips(updatedTrips)
    setIsEditDialogOpen(false)
    setSelectedTrip(null)
    resetForm()
  }

  const handleDeleteTrip = (tripId: string) => {
    setTrips(trips.filter(trip => trip.id !== tripId))
  }

  const openEditDialog = (trip: Trip) => {
    setSelectedTrip(trip)
    setFormData({
      title: trip.title,
      description: trip.description,
      location: trip.location,
      duration: trip.duration,
      maxPeople: trip.maxPeople.toString(),
      price: trip.price.toString(),
      status: trip.status,
      images: trip.images
    })
    setIsEditDialogOpen(true)
  }

  const resetForm = () => {
    setFormData({
      title: '',
      description: '',
      location: '',
      duration: '',
      maxPeople: '',
      price: '',
      status: 'draft',
      images: []
    })
  }

  const getStatusBadgeVariant = (status: string) => {
    switch (status) {
      case 'active': return 'default'
      case 'inactive': return 'secondary'
      case 'draft': return 'outline'
      default: return 'outline'
    }
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between space-y-4 sm:space-y-0">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Trips Management</h1>
          <p className="text-muted-foreground">Create and manage travel packages</p>
        </div>
        <Dialog open={isCreateDialogOpen} onOpenChange={setIsCreateDialogOpen}>
          <DialogTrigger asChild>
            <Button className="w-full sm:w-auto">
              <Plus className="h-4 w-4 mr-2" />
              Create Trip
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>Create New Trip</DialogTitle>
              <DialogDescription>
                Add a new travel package to your offerings
              </DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="title">Trip Title</Label>
                  <Input
                    id="title"
                    value={formData.title}
                    onChange={(e) => setFormData({...formData, title: e.target.value})}
                    placeholder="Enter trip title"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="location">Location</Label>
                  <Input
                    id="location"
                    value={formData.location}
                    onChange={(e) => setFormData({...formData, location: e.target.value})}
                    placeholder="Enter location"
                  />
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="description">Description</Label>
                <Textarea
                  id="description"
                  value={formData.description}
                  onChange={(e) => setFormData({...formData, description: e.target.value})}
                  placeholder="Enter trip description"
                  rows={3}
                />
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="duration">Duration</Label>
                  <Input
                    id="duration"
                    value={formData.duration}
                    onChange={(e) => setFormData({...formData, duration: e.target.value})}
                    placeholder="e.g., 3 Days"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="maxPeople">Max People</Label>
                  <Input
                    id="maxPeople"
                    type="number"
                    value={formData.maxPeople}
                    onChange={(e) => setFormData({...formData, maxPeople: e.target.value})}
                    placeholder="10"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="price">Price ($)</Label>
                  <Input
                    id="price"
                    type="number"
                    value={formData.price}
                    onChange={(e) => setFormData({...formData, price: e.target.value})}
                    placeholder="299"
                  />
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="status">Status</Label>
                <Select value={formData.status} onValueChange={(value: any) => setFormData({...formData, status: value})}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="draft">Draft</SelectItem>
                    <SelectItem value="active">Active</SelectItem>
                    <SelectItem value="inactive">Inactive</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={() => setIsCreateDialogOpen(false)}>
                Cancel
              </Button>
              <Button onClick={handleCreateTrip}>Create Trip</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>

      {/* Search and Filters */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Search & Filter</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search trips by title or location..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Trips Table */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <MapPin className="h-5 w-5" />
            <span>All Trips ({filteredTrips.length})</span>
          </CardTitle>
          <CardDescription>
            Manage your travel packages and itineraries
          </CardDescription>
        </CardHeader>
        <CardContent>
          {filteredTrips.length === 0 ? (
            <div className="text-center py-12">
              <MapPin className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
              <h3 className="text-lg font-semibold text-foreground mb-2">No trips found</h3>
              <p className="text-muted-foreground mb-4">
                {searchTerm ? 'No trips match your search criteria.' : 'Get started by creating your first trip.'}
              </p>
              {!searchTerm && (
                <Button onClick={() => setIsCreateDialogOpen(true)}>
                  <Plus className="h-4 w-4 mr-2" />
                  Create Your First Trip
                </Button>
              )}
            </div>
          ) : (
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Trip</TableHead>
                    <TableHead className="hidden sm:table-cell">Location</TableHead>
                    <TableHead className="hidden md:table-cell">Duration</TableHead>
                    <TableHead className="hidden md:table-cell">Capacity</TableHead>
                    <TableHead className="hidden lg:table-cell">Price</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredTrips.map((trip) => (
                    <TableRow key={trip.id}>
                      <TableCell>
                        <div className="space-y-1">
                          <div className="font-medium text-foreground">{trip.title}</div>
                          <div className="text-sm text-muted-foreground line-clamp-2">
                            {trip.description}
                          </div>
                          <div className="sm:hidden text-xs text-muted-foreground">
                            {trip.location} • {trip.duration} • ${trip.price}
                          </div>
                        </div>
                      </TableCell>
                      <TableCell className="hidden sm:table-cell">
                        <div className="flex items-center space-x-1">
                          <MapPin className="h-3 w-3 text-muted-foreground" />
                          <span className="text-sm">{trip.location}</span>
                        </div>
                      </TableCell>
                      <TableCell className="hidden md:table-cell">
                        <div className="flex items-center space-x-1">
                          <Calendar className="h-3 w-3 text-muted-foreground" />
                          <span className="text-sm">{trip.duration}</span>
                        </div>
                      </TableCell>
                      <TableCell className="hidden md:table-cell">
                        <div className="flex items-center space-x-1">
                          <Users className="h-3 w-3 text-muted-foreground" />
                          <span className="text-sm">{trip.maxPeople} people</span>
                        </div>
                      </TableCell>
                      <TableCell className="hidden lg:table-cell">
                        <div className="flex items-center space-x-1">
                          <DollarSign className="h-3 w-3 text-muted-foreground" />
                          <span className="text-sm font-medium">{trip.price}</span>
                        </div>
                      </TableCell>
                      <TableCell>
                        <Badge variant={getStatusBadgeVariant(trip.status)}>
                          {trip.status}
                        </Badge>
                      </TableCell>
                      <TableCell className="text-right">
                        <div className="flex items-center justify-end space-x-2">
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => openEditDialog(trip)}
                          >
                            <Edit className="h-4 w-4" />
                          </Button>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => handleDeleteTrip(trip.id)}
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

      {/* Edit Dialog */}
      <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
        <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Edit Trip</DialogTitle>
            <DialogDescription>
              Update the travel package details
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="edit-title">Trip Title</Label>
                <Input
                  id="edit-title"
                  value={formData.title}
                  onChange={(e) => setFormData({...formData, title: e.target.value})}
                  placeholder="Enter trip title"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="edit-location">Location</Label>
                <Input
                  id="edit-location"
                  value={formData.location}
                  onChange={(e) => setFormData({...formData, location: e.target.value})}
                  placeholder="Enter location"
                />
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="edit-description">Description</Label>
              <Textarea
                id="edit-description"
                value={formData.description}
                onChange={(e) => setFormData({...formData, description: e.target.value})}
                placeholder="Enter trip description"
                rows={3}
              />
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div className="space-y-2">
                <Label htmlFor="edit-duration">Duration</Label>
                <Input
                  id="edit-duration"
                  value={formData.duration}
                  onChange={(e) => setFormData({...formData, duration: e.target.value})}
                  placeholder="e.g., 3 Days"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="edit-maxPeople">Max People</Label>
                <Input
                  id="edit-maxPeople"
                  type="number"
                  value={formData.maxPeople}
                  onChange={(e) => setFormData({...formData, maxPeople: e.target.value})}
                  placeholder="10"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="edit-price">Price ($)</Label>
                <Input
                  id="edit-price"
                  type="number"
                  value={formData.price}
                  onChange={(e) => setFormData({...formData, price: e.target.value})}
                  placeholder="299"
                />
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="edit-status">Status</Label>
              <Select value={formData.status} onValueChange={(value: any) => setFormData({...formData, status: value})}>
                <SelectTrigger>
                  <SelectValue placeholder="Select status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="draft">Draft</SelectItem>
                  <SelectItem value="active">Active</SelectItem>
                  <SelectItem value="inactive">Inactive</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsEditDialogOpen(false)}>
              Cancel
            </Button>
            <Button onClick={handleEditTrip}>Update Trip</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}
