'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Badge } from '@/components/ui/badge'
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
  Image as ImageIcon,
  Upload,
  Grid,
  List,
  Filter,
  Tag
} from 'lucide-react'

interface GalleryImage {
  id: string
  title: string
  description: string
  url: string
  category: string
  tags: string[]
  uploadedAt: string
  size: number
  dimensions: {
    width: number
    height: number
  }
}

export default function GalleryManagement() {
  const [images, setImages] = useState<GalleryImage[]>([])
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedCategory, setSelectedCategory] = useState('all')
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid')
  const [isUploadDialogOpen, setIsUploadDialogOpen] = useState(false)
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false)
  const [selectedImage, setSelectedImage] = useState<GalleryImage | null>(null)
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    category: '',
    tags: '',
    file: null as File | null
  })

  const categories = ['all', 'wildlife', 'landscapes', 'culture', 'activities', 'accommodation']

  const filteredImages = images.filter(image => {
    const matchesSearch = image.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         image.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         image.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()))
    const matchesCategory = selectedCategory === 'all' || image.category === selectedCategory
    return matchesSearch && matchesCategory
  })

  const handleUploadImage = () => {
    if (!formData.file) return

    // Frontend only - simulate file upload
    const newImage: GalleryImage = {
      id: Date.now().toString(),
      title: formData.title,
      description: formData.description,
      url: URL.createObjectURL(formData.file), // Temporary URL for demo
      category: formData.category,
      tags: formData.tags.split(',').map(tag => tag.trim()).filter(Boolean),
      uploadedAt: new Date().toISOString(),
      size: formData.file.size,
      dimensions: {
        width: 1920, // Mock dimensions
        height: 1080
      }
    }
    setImages([...images, newImage])
    setIsUploadDialogOpen(false)
    resetForm()
  }

  const handleEditImage = () => {
    if (!selectedImage) return
    
    const updatedImages = images.map(image =>
      image.id === selectedImage.id
        ? {
            ...image,
            title: formData.title,
            description: formData.description,
            category: formData.category,
            tags: formData.tags.split(',').map(tag => tag.trim()).filter(Boolean)
          }
        : image
    )
    setImages(updatedImages)
    setIsEditDialogOpen(false)
    setSelectedImage(null)
    resetForm()
  }

  const handleDeleteImage = (imageId: string) => {
    setImages(images.filter(image => image.id !== imageId))
  }

  const openEditDialog = (image: GalleryImage) => {
    setSelectedImage(image)
    setFormData({
      title: image.title,
      description: image.description,
      category: image.category,
      tags: image.tags.join(', '),
      file: null
    })
    setIsEditDialogOpen(true)
  }

  const resetForm = () => {
    setFormData({
      title: '',
      description: '',
      category: '',
      tags: '',
      file: null
    })
  }

  const formatFileSize = (bytes: number) => {
    if (bytes === 0) return '0 Bytes'
    const k = 1024
    const sizes = ['Bytes', 'KB', 'MB', 'GB']
    const i = Math.floor(Math.log(bytes) / Math.log(k))
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i]
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between space-y-4 sm:space-y-0">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Gallery Management</h1>
          <p className="text-muted-foreground">Upload and organize your travel photos</p>
        </div>
        <Dialog open={isUploadDialogOpen} onOpenChange={setIsUploadDialogOpen}>
          <DialogTrigger asChild>
            <Button className="w-full sm:w-auto">
              <Upload className="h-4 w-4 mr-2" />
              Upload Images
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-2xl">
            <DialogHeader>
              <DialogTitle>Upload New Images</DialogTitle>
              <DialogDescription>
                Add new photos to your gallery
              </DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="space-y-2">
                <Label htmlFor="file">Select Image</Label>
                <Input
                  id="file"
                  type="file"
                  accept="image/*"
                  onChange={(e) => setFormData({...formData, file: e.target.files?.[0] || null})}
                />
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="title">Image Title</Label>
                  <Input
                    id="title"
                    value={formData.title}
                    onChange={(e) => setFormData({...formData, title: e.target.value})}
                    placeholder="Enter image title"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="category">Category</Label>
                  <Select value={formData.category} onValueChange={(value) => setFormData({...formData, category: value})}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select category" />
                    </SelectTrigger>
                    <SelectContent>
                      {categories.filter(cat => cat !== 'all').map((category) => (
                        <SelectItem key={category} value={category}>
                          {category.charAt(0).toUpperCase() + category.slice(1)}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="description">Description</Label>
                <Textarea
                  id="description"
                  value={formData.description}
                  onChange={(e) => setFormData({...formData, description: e.target.value})}
                  placeholder="Enter image description"
                  rows={3}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="tags">Tags (comma-separated)</Label>
                <Input
                  id="tags"
                  value={formData.tags}
                  onChange={(e) => setFormData({...formData, tags: e.target.value})}
                  placeholder="e.g., safari, wildlife, gorilla"
                />
              </div>
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={() => setIsUploadDialogOpen(false)}>
                Cancel
              </Button>
              <Button onClick={handleUploadImage} disabled={!formData.file}>
                Upload Image
              </Button>
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
          <div className="flex flex-col lg:flex-row gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search images by title, description, or tags..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            <div className="flex flex-col sm:flex-row gap-2">
              <Select value={selectedCategory} onValueChange={setSelectedCategory}>
                <SelectTrigger className="w-full sm:w-[180px]">
                  <Filter className="h-4 w-4 mr-2" />
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {categories.map((category) => (
                    <SelectItem key={category} value={category}>
                      {category === 'all' ? 'All Categories' : category.charAt(0).toUpperCase() + category.slice(1)}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <div className="flex rounded-md border border-input">
                <Button
                  variant={viewMode === 'grid' ? 'default' : 'ghost'}
                  size="sm"
                  onClick={() => setViewMode('grid')}
                  className="rounded-r-none"
                >
                  <Grid className="h-4 w-4" />
                </Button>
                <Button
                  variant={viewMode === 'list' ? 'default' : 'ghost'}
                  size="sm"
                  onClick={() => setViewMode('list')}
                  className="rounded-l-none"
                >
                  <List className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Gallery */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <ImageIcon className="h-5 w-5" />
            <span>Gallery ({filteredImages.length})</span>
          </CardTitle>
          <CardDescription>
            Manage your travel photography collection
          </CardDescription>
        </CardHeader>
        <CardContent>
          {filteredImages.length === 0 ? (
            <div className="text-center py-12">
              <ImageIcon className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
              <h3 className="text-lg font-semibold text-foreground mb-2">No images found</h3>
              <p className="text-muted-foreground mb-4">
                {searchTerm || selectedCategory !== 'all' 
                  ? 'No images match your search criteria.' 
                  : 'Get started by uploading your first image.'}
              </p>
              {!searchTerm && selectedCategory === 'all' && (
                <Button onClick={() => setIsUploadDialogOpen(true)}>
                  <Upload className="h-4 w-4 mr-2" />
                  Upload Your First Image
                </Button>
              )}
            </div>
          ) : (
            <div className={viewMode === 'grid' 
              ? "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4" 
              : "space-y-4"
            }>
              {filteredImages.map((image) => (
                <div key={image.id} className={viewMode === 'grid' 
                  ? "group relative bg-card border border-border rounded-lg overflow-hidden hover:shadow-md transition-shadow"
                  : "flex items-center space-x-4 p-4 bg-card border border-border rounded-lg hover:shadow-md transition-shadow"
                }>
                  {viewMode === 'grid' ? (
                    <>
                      <div className="aspect-square bg-muted flex items-center justify-center">
                        <ImageIcon className="h-8 w-8 text-muted-foreground" />
                      </div>
                      <div className="p-4">
                        <h3 className="font-medium text-foreground mb-1 line-clamp-1">{image.title}</h3>
                        <p className="text-sm text-muted-foreground mb-2 line-clamp-2">{image.description}</p>
                        <div className="flex items-center justify-between mb-2">
                          <Badge variant="secondary" className="text-xs">
                            {image.category}
                          </Badge>
                          <span className="text-xs text-muted-foreground">
                            {formatFileSize(image.size)}
                          </span>
                        </div>
                        <div className="flex flex-wrap gap-1 mb-3">
                          {image.tags.slice(0, 2).map((tag) => (
                            <Badge key={tag} variant="outline" className="text-xs">
                              {tag}
                            </Badge>
                          ))}
                          {image.tags.length > 2 && (
                            <Badge variant="outline" className="text-xs">
                              +{image.tags.length - 2}
                            </Badge>
                          )}
                        </div>
                        <div className="flex items-center justify-between">
                          <span className="text-xs text-muted-foreground">
                            {new Date(image.uploadedAt).toLocaleDateString()}
                          </span>
                          <div className="flex items-center space-x-1">
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => openEditDialog(image)}
                            >
                              <Edit className="h-3 w-3" />
                            </Button>
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => handleDeleteImage(image.id)}
                              className="text-destructive hover:text-destructive"
                            >
                              <Trash2 className="h-3 w-3" />
                            </Button>
                          </div>
                        </div>
                      </div>
                    </>
                  ) : (
                    <>
                      <div className="flex-shrink-0 w-16 h-16 bg-muted rounded-lg flex items-center justify-center">
                        <ImageIcon className="h-6 w-6 text-muted-foreground" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <h3 className="font-medium text-foreground mb-1">{image.title}</h3>
                        <p className="text-sm text-muted-foreground mb-2 line-clamp-1">{image.description}</p>
                        <div className="flex items-center space-x-4 text-xs text-muted-foreground">
                          <span>{image.category}</span>
                          <span>{formatFileSize(image.size)}</span>
                          <span>{image.dimensions.width}x{image.dimensions.height}</span>
                          <span>{new Date(image.uploadedAt).toLocaleDateString()}</span>
                        </div>
                        <div className="flex flex-wrap gap-1 mt-2">
                          {image.tags.map((tag) => (
                            <Badge key={tag} variant="outline" className="text-xs">
                              {tag}
                            </Badge>
                          ))}
                        </div>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => openEditDialog(image)}
                        >
                          <Edit className="h-4 w-4" />
                        </Button>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => handleDeleteImage(image.id)}
                          className="text-destructive hover:text-destructive"
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </>
                  )}
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>

      {/* Edit Dialog */}
      <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>Edit Image</DialogTitle>
            <DialogDescription>
              Update image details and metadata
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="edit-title">Image Title</Label>
                <Input
                  id="edit-title"
                  value={formData.title}
                  onChange={(e) => setFormData({...formData, title: e.target.value})}
                  placeholder="Enter image title"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="edit-category">Category</Label>
                <Select value={formData.category} onValueChange={(value) => setFormData({...formData, category: value})}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select category" />
                  </SelectTrigger>
                  <SelectContent>
                    {categories.filter(cat => cat !== 'all').map((category) => (
                      <SelectItem key={category} value={category}>
                        {category.charAt(0).toUpperCase() + category.slice(1)}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="edit-description">Description</Label>
              <Textarea
                id="edit-description"
                value={formData.description}
                onChange={(e) => setFormData({...formData, description: e.target.value})}
                placeholder="Enter image description"
                rows={3}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="edit-tags">Tags (comma-separated)</Label>
              <Input
                id="edit-tags"
                value={formData.tags}
                onChange={(e) => setFormData({...formData, tags: e.target.value})}
                placeholder="e.g., safari, wildlife, gorilla"
              />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsEditDialogOpen(false)}>
              Cancel
            </Button>
            <Button onClick={handleEditImage}>Update Image</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}
