'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { Switch } from '@/components/ui/switch'
import { Separator } from '@/components/ui/separator'
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { 
  Settings, 
  Save, 
  Upload,
  Bell,
  Shield,
  Globe,
  Mail,
  Palette,
  Database,
  Key
} from 'lucide-react'

export default function SettingsPage() {
  const [isLoading, setIsLoading] = useState(false)
  
  // General Settings
  const [generalSettings, setGeneralSettings] = useState({
    siteName: 'Continental Travel & Tours',
    siteDescription: 'Rwanda Luxury Tours and Travel',
    contactEmail: 'info@continentaltraveltours.com',
    contactPhone: '+250 788 123 456',
    address: 'Kigali, Rwanda',
    timezone: 'Africa/Kigali',
    language: 'en',
    currency: 'USD'
  })

  // Notification Settings
  const [notificationSettings, setNotificationSettings] = useState({
    emailNotifications: true,
    bookingAlerts: true,
    newsletterUpdates: true,
    systemUpdates: false,
    marketingEmails: true
  })

  // Security Settings
  const [securitySettings, setSecuritySettings] = useState({
    twoFactorAuth: false,
    sessionTimeout: '24',
    passwordExpiry: '90',
    loginAttempts: '5'
  })

  // Email Settings
  const [emailSettings, setEmailSettings] = useState({
    smtpHost: '',
    smtpPort: '587',
    smtpUsername: '',
    smtpPassword: '',
    fromEmail: 'noreply@continentaltraveltours.com',
    fromName: 'Continental Travel & Tours'
  })

  const handleSaveSettings = async (settingsType: string) => {
    setIsLoading(true)
    
    // Frontend only - simulate API call
    setTimeout(() => {
      console.log(`Saving ${settingsType} settings`)
      setIsLoading(false)
    }, 1000)
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between space-y-4 sm:space-y-0">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Settings</h1>
          <p className="text-muted-foreground">Manage your application settings and preferences</p>
        </div>
      </div>

      {/* General Settings */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Globe className="h-5 w-5" />
            <span>General Settings</span>
          </CardTitle>
          <CardDescription>
            Basic information about your travel business
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="site-name">Site Name</Label>
              <Input
                id="site-name"
                value={generalSettings.siteName}
                onChange={(e) => setGeneralSettings({...generalSettings, siteName: e.target.value})}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="contact-email">Contact Email</Label>
              <Input
                id="contact-email"
                type="email"
                value={generalSettings.contactEmail}
                onChange={(e) => setGeneralSettings({...generalSettings, contactEmail: e.target.value})}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="contact-phone">Contact Phone</Label>
              <Input
                id="contact-phone"
                value={generalSettings.contactPhone}
                onChange={(e) => setGeneralSettings({...generalSettings, contactPhone: e.target.value})}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="timezone">Timezone</Label>
              <Select value={generalSettings.timezone} onValueChange={(value) => setGeneralSettings({...generalSettings, timezone: value})}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Africa/Kigali">Africa/Kigali</SelectItem>
                  <SelectItem value="UTC">UTC</SelectItem>
                  <SelectItem value="America/New_York">America/New_York</SelectItem>
                  <SelectItem value="Europe/London">Europe/London</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="language">Language</Label>
              <Select value={generalSettings.language} onValueChange={(value) => setGeneralSettings({...generalSettings, language: value})}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="en">English</SelectItem>
                  <SelectItem value="fr">French</SelectItem>
                  <SelectItem value="rw">Kinyarwanda</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="currency">Currency</Label>
              <Select value={generalSettings.currency} onValueChange={(value) => setGeneralSettings({...generalSettings, currency: value})}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="USD">USD - US Dollar</SelectItem>
                  <SelectItem value="EUR">EUR - Euro</SelectItem>
                  <SelectItem value="RWF">RWF - Rwandan Franc</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          <div className="space-y-2">
            <Label htmlFor="site-description">Site Description</Label>
            <Textarea
              id="site-description"
              value={generalSettings.siteDescription}
              onChange={(e) => setGeneralSettings({...generalSettings, siteDescription: e.target.value})}
              rows={3}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="address">Business Address</Label>
            <Textarea
              id="address"
              value={generalSettings.address}
              onChange={(e) => setGeneralSettings({...generalSettings, address: e.target.value})}
              rows={2}
            />
          </div>
          <Button onClick={() => handleSaveSettings('general')} disabled={isLoading}>
            <Save className="h-4 w-4 mr-2" />
            Save General Settings
          </Button>
        </CardContent>
      </Card>

      {/* Notification Settings */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Bell className="h-5 w-5" />
            <span>Notification Settings</span>
          </CardTitle>
          <CardDescription>
            Configure how you receive notifications
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label>Email Notifications</Label>
                <p className="text-sm text-muted-foreground">Receive notifications via email</p>
              </div>
              <Switch
                checked={notificationSettings.emailNotifications}
                onCheckedChange={(checked) => setNotificationSettings({...notificationSettings, emailNotifications: checked})}
              />
            </div>
            <Separator />
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label>Booking Alerts</Label>
                <p className="text-sm text-muted-foreground">Get notified when new bookings are made</p>
              </div>
              <Switch
                checked={notificationSettings.bookingAlerts}
                onCheckedChange={(checked) => setNotificationSettings({...notificationSettings, bookingAlerts: checked})}
              />
            </div>
            <Separator />
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label>Newsletter Updates</Label>
                <p className="text-sm text-muted-foreground">Notifications about newsletter activities</p>
              </div>
              <Switch
                checked={notificationSettings.newsletterUpdates}
                onCheckedChange={(checked) => setNotificationSettings({...notificationSettings, newsletterUpdates: checked})}
              />
            </div>
            <Separator />
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label>System Updates</Label>
                <p className="text-sm text-muted-foreground">Important system and security updates</p>
              </div>
              <Switch
                checked={notificationSettings.systemUpdates}
                onCheckedChange={(checked) => setNotificationSettings({...notificationSettings, systemUpdates: checked})}
              />
            </div>
            <Separator />
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label>Marketing Emails</Label>
                <p className="text-sm text-muted-foreground">Promotional and marketing communications</p>
              </div>
              <Switch
                checked={notificationSettings.marketingEmails}
                onCheckedChange={(checked) => setNotificationSettings({...notificationSettings, marketingEmails: checked})}
              />
            </div>
          </div>
          <Button onClick={() => handleSaveSettings('notifications')} disabled={isLoading}>
            <Save className="h-4 w-4 mr-2" />
            Save Notification Settings
          </Button>
        </CardContent>
      </Card>

      {/* Security Settings */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Shield className="h-5 w-5" />
            <span>Security Settings</span>
          </CardTitle>
          <CardDescription>
            Manage security and access controls
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label>Two-Factor Authentication</Label>
              <p className="text-sm text-muted-foreground">Add an extra layer of security to your account</p>
            </div>
            <Switch
              checked={securitySettings.twoFactorAuth}
              onCheckedChange={(checked) => setSecuritySettings({...securitySettings, twoFactorAuth: checked})}
            />
          </div>
          <Separator />
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="space-y-2">
              <Label htmlFor="session-timeout">Session Timeout (hours)</Label>
              <Select value={securitySettings.sessionTimeout} onValueChange={(value) => setSecuritySettings({...securitySettings, sessionTimeout: value})}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="1">1 hour</SelectItem>
                  <SelectItem value="8">8 hours</SelectItem>
                  <SelectItem value="24">24 hours</SelectItem>
                  <SelectItem value="168">1 week</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="password-expiry">Password Expiry (days)</Label>
              <Select value={securitySettings.passwordExpiry} onValueChange={(value) => setSecuritySettings({...securitySettings, passwordExpiry: value})}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="30">30 days</SelectItem>
                  <SelectItem value="60">60 days</SelectItem>
                  <SelectItem value="90">90 days</SelectItem>
                  <SelectItem value="never">Never</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="login-attempts">Max Login Attempts</Label>
              <Select value={securitySettings.loginAttempts} onValueChange={(value) => setSecuritySettings({...securitySettings, loginAttempts: value})}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="3">3 attempts</SelectItem>
                  <SelectItem value="5">5 attempts</SelectItem>
                  <SelectItem value="10">10 attempts</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          <Button onClick={() => handleSaveSettings('security')} disabled={isLoading}>
            <Save className="h-4 w-4 mr-2" />
            Save Security Settings
          </Button>
        </CardContent>
      </Card>

      {/* Email Configuration */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Mail className="h-5 w-5" />
            <span>Email Configuration</span>
          </CardTitle>
          <CardDescription>
            Configure SMTP settings for sending emails
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="smtp-host">SMTP Host</Label>
              <Input
                id="smtp-host"
                placeholder="smtp.gmail.com"
                value={emailSettings.smtpHost}
                onChange={(e) => setEmailSettings({...emailSettings, smtpHost: e.target.value})}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="smtp-port">SMTP Port</Label>
              <Input
                id="smtp-port"
                placeholder="587"
                value={emailSettings.smtpPort}
                onChange={(e) => setEmailSettings({...emailSettings, smtpPort: e.target.value})}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="smtp-username">SMTP Username</Label>
              <Input
                id="smtp-username"
                placeholder="your-email@gmail.com"
                value={emailSettings.smtpUsername}
                onChange={(e) => setEmailSettings({...emailSettings, smtpUsername: e.target.value})}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="smtp-password">SMTP Password</Label>
              <Input
                id="smtp-password"
                type="password"
                placeholder="Your app password"
                value={emailSettings.smtpPassword}
                onChange={(e) => setEmailSettings({...emailSettings, smtpPassword: e.target.value})}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="from-email">From Email</Label>
              <Input
                id="from-email"
                type="email"
                value={emailSettings.fromEmail}
                onChange={(e) => setEmailSettings({...emailSettings, fromEmail: e.target.value})}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="from-name">From Name</Label>
              <Input
                id="from-name"
                value={emailSettings.fromName}
                onChange={(e) => setEmailSettings({...emailSettings, fromName: e.target.value})}
              />
            </div>
          </div>
          <div className="flex space-x-2">
            <Button onClick={() => handleSaveSettings('email')} disabled={isLoading}>
              <Save className="h-4 w-4 mr-2" />
              Save Email Settings
            </Button>
            <Button variant="outline">
              <Mail className="h-4 w-4 mr-2" />
              Test Connection
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Backup & Export */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Database className="h-5 w-5" />
            <span>Backup & Export</span>
          </CardTitle>
          <CardDescription>
            Manage your data backups and exports
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Card className="p-4">
              <div className="space-y-2">
                <h4 className="font-medium">Export Data</h4>
                <p className="text-sm text-muted-foreground">
                  Download all your data in JSON format
                </p>
                <Button variant="outline" className="w-full">
                  <Upload className="h-4 w-4 mr-2" />
                  Export All Data
                </Button>
              </div>
            </Card>
            <Card className="p-4">
              <div className="space-y-2">
                <h4 className="font-medium">Backup Settings</h4>
                <p className="text-sm text-muted-foreground">
                  Configure automatic backups
                </p>
                <Button variant="outline" className="w-full">
                  <Settings className="h-4 w-4 mr-2" />
                  Configure Backup
                </Button>
              </div>
            </Card>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
