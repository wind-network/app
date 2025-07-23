'use client'

import { motion } from 'framer-motion'
import { DashboardLayout } from '@/components/DashboardLayout'
import { useState } from 'react'
import { useAuth } from '@/hooks/useAuth'

export default function ProfilePage() {
  const [activeTab, setActiveTab] = useState('general')
  const { user, getUserDisplayName, getUserEmail, getUserAvatar } = useAuth(true)

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
              {getUserAvatar() ? (
                <div className="w-32 h-32 rounded-full bg-gradient-to-r from-blue-500 to-cyan-500 p-1">
                  <img src={getUserAvatar()!} alt="Profile" className="w-full h-full rounded-full object-cover" />
                </div>
              ) : (
                <div className="w-32 h-32 rounded-full bg-gradient-to-r from-blue-500 to-cyan-500 p-1">
                  <div className="w-full h-full rounded-full bg-slate-900 flex items-center justify-center text-4xl font-bold text-white">
                    {getUserDisplayName()?.charAt(0)?.toUpperCase() || 'U'}
                  </div>
                </div>
              )}
              <button className="absolute bottom-0 right-0 p-2 bg-blue-500 rounded-full text-white hover:bg-blue-600 transition-colors">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 13a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
              </button>
            </div>

            {/* Info */}
            <div className="flex-1 text-center md:text-left">
              <h2 className="text-2xl font-bold text-white mb-2">{getUserDisplayName()}</h2>
              <p className="text-slate-400 mb-4">{getUserEmail() || 'No email provided'}</p>
              <div className="flex flex-wrap justify-center md:justify-start gap-4 text-sm">
                <div>
                  <span className="text-slate-400">Member since:</span>
                  <span className="text-white ml-2">{new Date().toLocaleDateString('en-US', { month: 'long', year: 'numeric' })}</span>
                </div>
                <div>
                  <span className="text-slate-400">Plan:</span>
                  <span className="text-blue-400 ml-2">Developer</span>
                </div>
                <div>
                  <span className="text-slate-400">Auth method:</span>
                  <span className="text-green-400 ml-2">
                    {user?.wallet ? 'Wallet' : user?.email ? 'Email' : user?.google ? 'Google' : user?.github ? 'GitHub' : 'Unknown'}
                  </span>
                </div>
              </div>
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
              {tab.charAt(0).toUpperCase() + tab.slice(1)}
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
              <form className="space-y-6">
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-slate-300 mb-2">
                      Display Name
                    </label>
                    <input
                      type="text"
                      defaultValue={getUserDisplayName()}
                      className="w-full px-4 py-3 rounded-lg bg-slate-800 border border-slate-700 text-white focus:outline-none focus:border-blue-500"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-slate-300 mb-2">
                      Wallet Address
                    </label>
                    <input
                      type="text"
                      defaultValue={user?.wallet?.address || ''}
                      placeholder="Connect wallet to see address"
                      disabled={!user?.wallet}
                      className="w-full px-4 py-3 rounded-lg bg-slate-800 border border-slate-700 text-white focus:outline-none focus:border-blue-500 disabled:opacity-50"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-slate-300 mb-2">
                    Email Address
                  </label>
                  <input
                    type="email"
                    defaultValue={getUserEmail()}
                    placeholder="No email address"
                    disabled={!getUserEmail()}
                    className="w-full px-4 py-3 rounded-lg bg-slate-800 border border-slate-700 text-white focus:outline-none focus:border-blue-500 disabled:opacity-50"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-slate-300 mb-2">
                    Organization
                  </label>
                  <input
                    type="text"
                    placeholder="Your organization name"
                    className="w-full px-4 py-3 rounded-lg bg-slate-800 border border-slate-700 text-white focus:outline-none focus:border-blue-500"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-slate-300 mb-2">
                    Bio
                  </label>
                  <textarea
                    rows={4}
                    placeholder="Tell us about yourself..."
                    className="w-full px-4 py-3 rounded-lg bg-slate-800 border border-slate-700 text-white focus:outline-none focus:border-blue-500"
                  />
                </div>

                <div className="flex justify-end">
                  <button
                    type="submit"
                    className="btn-primary"
                  >
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
                
                {/* Change Password */}
                <div className="mb-8">
                  <h4 className="text-lg font-medium text-white mb-4">Change Password</h4>
                  <form className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-slate-300 mb-2">
                        Current Password
                      </label>
                      <input
                        type="password"
                        className="w-full px-4 py-3 rounded-lg bg-slate-800 border border-slate-700 text-white focus:outline-none focus:border-blue-500"
                      />
                    </div>
                    <div className="grid md:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-slate-300 mb-2">
                          New Password
                        </label>
                        <input
                          type="password"
                          className="w-full px-4 py-3 rounded-lg bg-slate-800 border border-slate-700 text-white focus:outline-none focus:border-blue-500"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-slate-300 mb-2">
                          Confirm Password
                        </label>
                        <input
                          type="password"
                          className="w-full px-4 py-3 rounded-lg bg-slate-800 border border-slate-700 text-white focus:outline-none focus:border-blue-500"
                        />
                      </div>
                    </div>
                    <button type="submit" className="btn-primary">
                      Update Password
                    </button>
                  </form>
                </div>

                {/* Two-Factor Authentication */}
                <div>
                  <h4 className="text-lg font-medium text-white mb-4">Two-Factor Authentication</h4>
                  <div className="flex items-center justify-between p-4 rounded-lg bg-slate-800/50">
                    <div>
                      <p className="text-white">2FA Status</p>
                      <p className="text-sm text-slate-400">Add an extra layer of security to your account</p>
                    </div>
                    <button className="px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors">
                      Enable 2FA
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* API Tab */}
          {activeTab === 'api' && (
            <div className="glass rounded-2xl p-8">
              <h3 className="text-xl font-semibold text-white mb-6">API Keys</h3>
              
              <div className="space-y-4 mb-6">
                <div className="p-4 rounded-lg bg-slate-800/50">
                  <div className="flex items-center justify-between mb-2">
                    <div>
                      <p className="text-white font-medium">Production API Key</p>
                      <p className="text-sm text-slate-400">Created on Jan 15, 2024</p>
                    </div>
                    <div className="flex items-center space-x-2">
                      <button className="p-2 text-slate-400 hover:text-white">
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                        </svg>
                      </button>
                      <button className="p-2 text-red-400 hover:text-red-300">
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                        </svg>
                      </button>
                    </div>
                  </div>
                  <code className="text-xs text-slate-500">sk_live_********************************</code>
                </div>
              </div>

              <button className="btn-primary">
                Generate New API Key
              </button>
            </div>
          )}

          {/* Notifications Tab */}
          {activeTab === 'notifications' && (
            <div className="glass rounded-2xl p-8">
              <h3 className="text-xl font-semibold text-white mb-6">Notification Preferences</h3>
              
              <div className="space-y-6">
                {[
                  { name: 'Email Notifications', description: 'Receive updates via email' },
                  { name: 'Usage Alerts', description: 'Get notified when reaching usage limits' },
                  { name: 'Product Updates', description: 'New features and improvements' },
                  { name: 'Security Alerts', description: 'Important security notifications' },
                ].map((item) => (
                  <div key={item.name} className="flex items-center justify-between">
                    <div>
                      <p className="text-white font-medium">{item.name}</p>
                      <p className="text-sm text-slate-400">{item.description}</p>
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