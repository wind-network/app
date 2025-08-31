'use client'

import { motion } from 'framer-motion'
import { DashboardLayout } from '@/components/DashboardLayout'
import { useState, useEffect, useRef } from 'react'
import { useSession } from 'next-auth/react'
import { Camera, Mail, MapPin, Globe, Github, Twitter, Linkedin, Shield, Key, Bell, Loader2 } from 'lucide-react'

export default function ProfilePage() {
  const [activeTab, setActiveTab] = useState('general')
  const { data: session, update } = useSession()
  const [loading, setLoading] = useState(false)
  const [uploadingAvatar, setUploadingAvatar] = useState(false)
  const [profileData, setProfileData] = useState({
    name: '',
    username: '',
    bio: '',
    location: '',
    website: '',
    socialLinks: {
      github: '',
      twitter: '',
      linkedin: '',
    }
  })
  const fileInputRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    if (session?.user) {
      setProfileData({
        name: session.user.name || '',
        username: session.user.username || '',
        bio: session.user.bio || '',
        location: session.user.location || '',
        website: session.user.website || '',
        socialLinks: {
          github: session.user.socialLinks?.github || '',
          twitter: session.user.socialLinks?.twitter || '',
          linkedin: session.user.socialLinks?.linkedin || '',
        }
      })
    }
  }, [session])

  const handleAvatarUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return

    setUploadingAvatar(true)
    const formData = new FormData()
    formData.append('avatar', file)

    try {
      const response = await fetch('/api/user/upload-avatar', {
        method: 'POST',
        body: formData,
      })

      if (response.ok) {
        const data = await response.json()
        await update() // Refresh session data
        alert('Avatar uploaded successfully!')
      } else {
        alert('Failed to upload avatar')
      }
    } catch (error) {
      console.error('Avatar upload error:', error)
      alert('Failed to upload avatar')
    } finally {
      setUploadingAvatar(false)
    }
  }

  const handleProfileUpdate = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)

    try {
      const response = await fetch('/api/user/profile', {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(profileData),
      })

      if (response.ok) {
        await update() // Refresh session data
        alert('Profile updated successfully!')
      } else {
        alert('Failed to update profile')
      }
    } catch (error) {
      console.error('Profile update error:', error)
      alert('Failed to update profile')
    } finally {
      setLoading(false)
    }
  }

  const memberSince = session?.user?.createdAt 
    ? new Date(session.user.createdAt).toLocaleDateString('en-US', { month: 'long', year: 'numeric' })
    : new Date().toLocaleDateString('en-US', { month: 'long', year: 'numeric' })

  return (
    <DashboardLayout>
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-white mb-2">Profile Settings</h1>
          <p className="text-slate-400">Manage your account information and preferences</p>
        </div>

        {/* Profile Card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="glass rounded-2xl p-8 mb-8"
        >
          <div className="flex flex-col md:flex-row items-center md:items-start space-y-6 md:space-y-0 md:space-x-8">
            {/* Avatar */}
            <div className="relative">
              {session?.user?.image ? (
                <div className="w-32 h-32 rounded-full bg-gradient-to-r from-blue-500 to-cyan-500 p-1">
                  <img 
                    src={session.user.image} 
                    alt="Profile" 
                    className="w-full h-full rounded-full object-cover bg-slate-900" 
                  />
                </div>
              ) : (
                <div className="w-32 h-32 rounded-full bg-gradient-to-r from-blue-500 to-cyan-500 p-1">
                  <div className="w-full h-full rounded-full bg-slate-900 flex items-center justify-center text-4xl font-bold text-white">
                    {session?.user?.name?.charAt(0)?.toUpperCase() || session?.user?.email?.charAt(0)?.toUpperCase() || 'U'}
                  </div>
                </div>
              )}
              <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                onChange={handleAvatarUpload}
                className="hidden"
              />
              <button 
                onClick={() => fileInputRef.current?.click()}
                disabled={uploadingAvatar}
                className="absolute bottom-0 right-0 p-2 bg-blue-500 rounded-full text-white hover:bg-blue-600 transition-colors disabled:opacity-50"
              >
                {uploadingAvatar ? (
                  <Loader2 className="w-5 h-5 animate-spin" />
                ) : (
                  <Camera className="w-5 h-5" />
                )}
              </button>
            </div>

            {/* Info */}
            <div className="flex-1 text-center md:text-left">
              <h2 className="text-2xl font-bold text-white mb-2">
                {session?.user?.name || session?.user?.email?.split('@')[0] || 'Anonymous User'}
              </h2>
              <p className="text-slate-400 mb-4">{session?.user?.email || 'No email provided'}</p>
              <div className="flex flex-wrap justify-center md:justify-start gap-4 text-sm">
                <div className="flex items-center gap-1">
                  <span className="text-slate-400">Member since:</span>
                  <span className="text-white">{memberSince}</span>
                </div>
                <div className="flex items-center gap-1">
                  <span className="text-slate-400">Plan:</span>
                  <span className="text-blue-400">{session?.user?.plan?.displayName || 'Early Risers'}</span>
                </div>
                <div className="flex items-center gap-1">
                  <span className="text-slate-400">Status:</span>
                  <span className="text-green-400">{session?.user?.subscriptionStatus || 'Active'}</span>
                </div>
              </div>
              {session?.user?.location && (
                <div className="flex items-center gap-2 mt-3 text-sm text-slate-400">
                  <MapPin className="w-4 h-4" />
                  <span>{session.user.location}</span>
                </div>
              )}
              {session?.user?.website && (
                <div className="flex items-center gap-2 mt-2 text-sm">
                  <Globe className="w-4 h-4 text-slate-400" />
                  <a href={session.user.website} target="_blank" rel="noopener noreferrer" className="text-blue-400 hover:text-blue-300">
                    {session.user.website}
                  </a>
                </div>
              )}
            </div>
          </div>
        </motion.div>

        {/* Tabs */}
        <div className="flex space-x-1 mb-8 glass rounded-xl p-1">
          {['general', 'security', 'api', 'notifications'].map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`flex-1 px-4 py-2 rounded-lg font-medium transition-all duration-200 ${
                activeTab === tab
                  ? 'bg-blue-500 text-white'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              {tab === 'api' ? 'API' : tab.charAt(0).toUpperCase() + tab.slice(1)}
            </button>
          ))}
        </div>

        {/* Tab Content */}
        <motion.div
          key={activeTab}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
        >
          {/* General Tab */}
          {activeTab === 'general' && (
            <div className="glass rounded-2xl p-8">
              <h3 className="text-xl font-semibold text-white mb-6">General Information</h3>
              <form onSubmit={handleProfileUpdate} className="space-y-6">
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-slate-300 mb-2">
                      Display Name
                    </label>
                    <input
                      type="text"
                      value={profileData.name}
                      onChange={(e) => setProfileData({...profileData, name: e.target.value})}
                      className="w-full px-4 py-3 rounded-lg bg-slate-800 border border-slate-700 text-white focus:outline-none focus:border-blue-500"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-slate-300 mb-2">
                      Username
                    </label>
                    <input
                      type="text"
                      value={profileData.username}
                      onChange={(e) => setProfileData({...profileData, username: e.target.value})}
                      placeholder="@username"
                      className="w-full px-4 py-3 rounded-lg bg-slate-800 border border-slate-700 text-white focus:outline-none focus:border-blue-500"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-slate-300 mb-2">
                    Email Address
                  </label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-slate-500" />
                    <input
                      type="email"
                      value={session?.user?.email || ''}
                      disabled
                      className="w-full pl-10 pr-4 py-3 rounded-lg bg-slate-800 border border-slate-700 text-white focus:outline-none focus:border-blue-500 disabled:opacity-50"
                    />
                  </div>
                </div>

                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-slate-300 mb-2">
                      Location
                    </label>
                    <div className="relative">
                      <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-slate-500" />
                      <input
                        type="text"
                        value={profileData.location}
                        onChange={(e) => setProfileData({...profileData, location: e.target.value})}
                        placeholder="City, Country"
                        className="w-full pl-10 pr-4 py-3 rounded-lg bg-slate-800 border border-slate-700 text-white focus:outline-none focus:border-blue-500"
                      />
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-slate-300 mb-2">
                      Website
                    </label>
                    <div className="relative">
                      <Globe className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-slate-500" />
                      <input
                        type="url"
                        value={profileData.website}
                        onChange={(e) => setProfileData({...profileData, website: e.target.value})}
                        placeholder="https://example.com"
                        className="w-full pl-10 pr-4 py-3 rounded-lg bg-slate-800 border border-slate-700 text-white focus:outline-none focus:border-blue-500"
                      />
                    </div>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-slate-300 mb-2">
                    Bio
                  </label>
                  <textarea
                    rows={4}
                    value={profileData.bio}
                    onChange={(e) => setProfileData({...profileData, bio: e.target.value})}
                    placeholder="Tell us about yourself..."
                    className="w-full px-4 py-3 rounded-lg bg-slate-800 border border-slate-700 text-white focus:outline-none focus:border-blue-500"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-slate-300 mb-4">
                    Social Links
                  </label>
                  <div className="space-y-4">
                    <div className="relative">
                      <Github className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-slate-500" />
                      <input
                        type="text"
                        value={profileData.socialLinks.github}
                        onChange={(e) => setProfileData({
                          ...profileData, 
                          socialLinks: {...profileData.socialLinks, github: e.target.value}
                        })}
                        placeholder="github.com/username"
                        className="w-full pl-10 pr-4 py-3 rounded-lg bg-slate-800 border border-slate-700 text-white focus:outline-none focus:border-blue-500"
                      />
                    </div>
                    <div className="relative">
                      <Twitter className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-slate-500" />
                      <input
                        type="text"
                        value={profileData.socialLinks.twitter}
                        onChange={(e) => setProfileData({
                          ...profileData, 
                          socialLinks: {...profileData.socialLinks, twitter: e.target.value}
                        })}
                        placeholder="twitter.com/username"
                        className="w-full pl-10 pr-4 py-3 rounded-lg bg-slate-800 border border-slate-700 text-white focus:outline-none focus:border-blue-500"
                      />
                    </div>
                    <div className="relative">
                      <Linkedin className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-slate-500" />
                      <input
                        type="text"
                        value={profileData.socialLinks.linkedin}
                        onChange={(e) => setProfileData({
                          ...profileData, 
                          socialLinks: {...profileData.socialLinks, linkedin: e.target.value}
                        })}
                        placeholder="linkedin.com/in/username"
                        className="w-full pl-10 pr-4 py-3 rounded-lg bg-slate-800 border border-slate-700 text-white focus:outline-none focus:border-blue-500"
                      />
                    </div>
                  </div>
                </div>

                <div className="flex justify-end">
                  <button
                    type="submit"
                    disabled={loading}
                    className="btn-primary flex items-center gap-2 disabled:opacity-50"
                  >
                    {loading && <Loader2 className="w-4 h-4 animate-spin" />}
                    Save Changes
                  </button>
                </div>
              </form>
            </div>
          )}

          {/* Security Tab */}
          {activeTab === 'security' && (
            <div className="glass rounded-2xl p-8 space-y-8">
              <div>
                <h3 className="text-xl font-semibold text-white mb-6">Security Settings</h3>
                
                <div className="space-y-6">
                  <div className="p-4 rounded-lg bg-slate-800/50">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <Shield className="w-5 h-5 text-blue-400" />
                        <div>
                          <p className="text-white font-medium">Authentication Provider</p>
                          <p className="text-sm text-slate-400">
                            Currently using: {session?.user?.authProvider || 'Email'}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="p-4 rounded-lg bg-slate-800/50">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <Key className="w-5 h-5 text-green-400" />
                        <div>
                          <p className="text-white font-medium">Two-Factor Authentication</p>
                          <p className="text-sm text-slate-400">Add an extra layer of security</p>
                        </div>
                      </div>
                      <button className="px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors">
                        Enable 2FA
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* API Tab */}
          {activeTab === 'api' && (
            <div className="glass rounded-2xl p-8">
              <h3 className="text-xl font-semibold text-white mb-6">API Keys</h3>
              
              <div className="p-6 rounded-lg bg-slate-800/30 border-2 border-dashed border-slate-700 text-center">
                <Key className="w-12 h-12 text-slate-500 mx-auto mb-4" />
                <p className="text-slate-400 mb-2">API key management coming soon</p>
                <p className="text-sm text-slate-500">
                  You'll be able to generate and manage API keys for programmatic access
                </p>
              </div>
            </div>
          )}

          {/* Notifications Tab */}
          {activeTab === 'notifications' && (
            <div className="glass rounded-2xl p-8">
              <h3 className="text-xl font-semibold text-white mb-6">Notification Preferences</h3>
              
              <div className="space-y-6">
                {[
                  { name: 'Email Notifications', description: 'Receive updates via email', icon: Mail },
                  { name: 'Usage Alerts', description: 'Get notified when reaching usage limits', icon: Bell },
                  { name: 'Product Updates', description: 'New features and improvements', icon: Bell },
                  { name: 'Security Alerts', description: 'Important security notifications', icon: Shield },
                ].map((item) => (
                  <div key={item.name} className="flex items-center justify-between p-4 rounded-lg bg-slate-800/30">
                    <div className="flex items-center gap-3">
                      <item.icon className="w-5 h-5 text-slate-400" />
                      <div>
                        <p className="text-white font-medium">{item.name}</p>
                        <p className="text-sm text-slate-400">{item.description}</p>
                      </div>
                    </div>
                    <button className="relative inline-flex h-6 w-11 items-center rounded-full bg-slate-700 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2">
                      <span className="translate-x-1 inline-block h-4 w-4 transform rounded-full bg-white transition-transform" />
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}
        </motion.div>
      </div>
    </DashboardLayout>
  )
}