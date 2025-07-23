'use client'

import { motion } from 'framer-motion'
import { DashboardLayout } from '@/components/DashboardLayout'
import { useState } from 'react'

export default function SettingsPage() {
  const [activeSection, setActiveSection] = useState('general')

  const sections = [
    { id: 'general', label: 'General', icon: '⚙️' },
    { id: 'appearance', label: 'Appearance', icon: '🎨' },
    { id: 'integrations', label: 'Integrations', icon: '🔗' },
    { id: 'advanced', label: 'Advanced', icon: '🚀' },
  ]

  return (
    <DashboardLayout>
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-white mb-2">Settings</h1>
          <p className="text-slate-400">Manage your account settings and preferences</p>
        </div>

        <div className="grid lg:grid-cols-4 gap-8">
          {/* Settings Navigation */}
          <div className="lg:col-span-1">
            <nav className="space-y-1">
              {sections.map((section) => (
                <button
                  key={section.id}
                  onClick={() => setActiveSection(section.id)}
                  className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg transition-all duration-200 ${
                    activeSection === section.id
                      ? 'bg-blue-500/20 text-blue-400 border-l-2 border-blue-400'
                      : 'text-slate-300 hover:text-white hover:bg-slate-800/50'
                  }`}
                >
                  <span className="text-xl">{section.icon}</span>
                  <span className="font-medium">{section.label}</span>
                </button>
              ))}
            </nav>
          </div>

          {/* Settings Content */}
          <div className="lg:col-span-3">
            <motion.div
              key={activeSection}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
            >
              {/* General Settings */}
              {activeSection === 'general' && (
                <div className="space-y-6">
                  <div className="glass rounded-2xl p-8">
                    <h2 className="text-xl font-semibold text-white mb-6">General Settings</h2>
                    
                    <div className="space-y-6">
                      {/* Language */}
                      <div>
                        <label className="block text-sm font-medium text-slate-300 mb-2">
                          Language
                        </label>
                        <select className="w-full px-4 py-3 rounded-lg bg-slate-800 border border-slate-700 text-white focus:outline-none focus:border-blue-500">
                          <option value="en">English</option>
                          <option value="es">Spanish</option>
                          <option value="fr">French</option>
                          <option value="de">German</option>
                          <option value="ja">Japanese</option>
                        </select>
                      </div>

                      {/* Timezone */}
                      <div>
                        <label className="block text-sm font-medium text-slate-300 mb-2">
                          Timezone
                        </label>
                        <select className="w-full px-4 py-3 rounded-lg bg-slate-800 border border-slate-700 text-white focus:outline-none focus:border-blue-500">
                          <option value="utc">UTC</option>
                          <option value="est">Eastern Time (EST)</option>
                          <option value="pst">Pacific Time (PST)</option>
                          <option value="cst">Central Time (CST)</option>
                          <option value="mst">Mountain Time (MST)</option>
                        </select>
                      </div>

                      {/* Date Format */}
                      <div>
                        <label className="block text-sm font-medium text-slate-300 mb-2">
                          Date Format
                        </label>
                        <select className="w-full px-4 py-3 rounded-lg bg-slate-800 border border-slate-700 text-white focus:outline-none focus:border-blue-500">
                          <option value="mdy">MM/DD/YYYY</option>
                          <option value="dmy">DD/MM/YYYY</option>
                          <option value="ymd">YYYY-MM-DD</option>
                        </select>
                      </div>

                      {/* Currency */}
                      <div>
                        <label className="block text-sm font-medium text-slate-300 mb-2">
                          Currency
                        </label>
                        <select className="w-full px-4 py-3 rounded-lg bg-slate-800 border border-slate-700 text-white focus:outline-none focus:border-blue-500">
                          <option value="usd">USD - US Dollar</option>
                          <option value="eur">EUR - Euro</option>
                          <option value="gbp">GBP - British Pound</option>
                          <option value="jpy">JPY - Japanese Yen</option>
                        </select>
                      </div>
                    </div>
                  </div>

                  {/* Data & Privacy */}
                  <div className="glass rounded-2xl p-8">
                    <h3 className="text-lg font-semibold text-white mb-6">Data & Privacy</h3>
                    
                    <div className="space-y-4">
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="text-white font-medium">Analytics</p>
                          <p className="text-sm text-slate-400">Help improve Wind Network with anonymous usage data</p>
                        </div>
                        <button className="relative inline-flex h-6 w-11 items-center rounded-full bg-blue-500 transition-colors">
                          <span className="translate-x-6 inline-block h-4 w-4 transform rounded-full bg-white transition-transform" />
                        </button>
                      </div>

                      <div className="flex items-center justify-between">
                        <div>
                          <p className="text-white font-medium">Marketing Emails</p>
                          <p className="text-sm text-slate-400">Receive updates about new features and offers</p>
                        </div>
                        <button className="relative inline-flex h-6 w-11 items-center rounded-full bg-slate-700 transition-colors">
                          <span className="translate-x-1 inline-block h-4 w-4 transform rounded-full bg-white transition-transform" />
                        </button>
                      </div>
                    </div>

                    <div className="mt-6 pt-6 border-t border-slate-700">
                      <button className="text-red-400 hover:text-red-300 font-medium">
                        Download my data
                      </button>
                    </div>
                  </div>
                </div>
              )}

              {/* Appearance Settings */}
              {activeSection === 'appearance' && (
                <div className="glass rounded-2xl p-8">
                  <h2 className="text-xl font-semibold text-white mb-6">Appearance Settings</h2>
                  
                  <div className="space-y-6">
                    {/* Theme */}
                    <div>
                      <label className="block text-sm font-medium text-slate-300 mb-4">
                        Theme
                      </label>
                      <div className="grid grid-cols-3 gap-4">
                        {['Light', 'Dark', 'Auto'].map((theme) => (
                          <button
                            key={theme}
                            className={`p-4 rounded-lg border-2 transition-all ${
                              theme === 'Dark'
                                ? 'border-blue-500 bg-slate-800/50'
                                : 'border-slate-700 hover:border-slate-600'
                            }`}
                          >
                            <div className={`w-full h-20 rounded-lg mb-2 ${
                              theme === 'Light' ? 'bg-slate-200' :
                              theme === 'Dark' ? 'bg-slate-900' :
                              'bg-gradient-to-br from-slate-200 to-slate-900'
                            }`}></div>
                            <p className="text-sm font-medium text-white">{theme}</p>
                          </button>
                        ))}
                      </div>
                    </div>

                    {/* Accent Color */}
                    <div>
                      <label className="block text-sm font-medium text-slate-300 mb-4">
                        Accent Color
                      </label>
                      <div className="flex space-x-3">
                        {[
                          'bg-blue-500',
                          'bg-purple-500',
                          'bg-pink-500',
                          'bg-green-500',
                          'bg-orange-500',
                          'bg-red-500',
                        ].map((color) => (
                          <button
                            key={color}
                            className={`w-10 h-10 rounded-full ${color} ${
                              color === 'bg-blue-500' ? 'ring-2 ring-white ring-offset-2 ring-offset-slate-900' : ''
                            }`}
                          />
                        ))}
                      </div>
                    </div>

                    {/* Font Size */}
                    <div>
                      <label className="block text-sm font-medium text-slate-300 mb-4">
                        Font Size
                      </label>
                      <div className="flex items-center space-x-4">
                        <button className="text-sm text-slate-400 hover:text-white">A</button>
                        <div className="flex-1 h-2 bg-slate-700 rounded-full">
                          <div className="w-1/2 h-full bg-blue-500 rounded-full"></div>
                        </div>
                        <button className="text-xl text-slate-400 hover:text-white">A</button>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* Integrations Settings */}
              {activeSection === 'integrations' && (
                <div className="space-y-6">
                  <div className="glass rounded-2xl p-8">
                    <h2 className="text-xl font-semibold text-white mb-6">Connected Integrations</h2>
                    
                    <div className="space-y-4">
                      {[
                        { name: 'GitHub', status: 'connected', icon: '🐙' },
                        { name: 'Slack', status: 'not_connected', icon: '💬' },
                        { name: 'Discord', status: 'connected', icon: '🎮' },
                        { name: 'Google Drive', status: 'not_connected', icon: '📁' },
                      ].map((integration) => (
                        <div key={integration.name} className="flex items-center justify-between p-4 rounded-lg bg-slate-800/50">
                          <div className="flex items-center space-x-3">
                            <span className="text-2xl">{integration.icon}</span>
                            <div>
                              <p className="text-white font-medium">{integration.name}</p>
                              <p className="text-sm text-slate-400">
                                {integration.status === 'connected' ? 'Connected' : 'Not connected'}
                              </p>
                            </div>
                          </div>
                          <button className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                            integration.status === 'connected'
                              ? 'bg-slate-700 text-slate-300 hover:bg-slate-600'
                              : 'bg-blue-500 text-white hover:bg-blue-600'
                          }`}>
                            {integration.status === 'connected' ? 'Disconnect' : 'Connect'}
                          </button>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="glass rounded-2xl p-8">
                    <h3 className="text-lg font-semibold text-white mb-6">Webhook Settings</h3>
                    
                    <div className="space-y-4">
                      <div>
                        <label className="block text-sm font-medium text-slate-300 mb-2">
                          Webhook URL
                        </label>
                        <input
                          type="url"
                          placeholder="https://your-domain.com/webhook"
                          className="w-full px-4 py-3 rounded-lg bg-slate-800 border border-slate-700 text-white focus:outline-none focus:border-blue-500"
                        />
                      </div>
                      
                      <div>
                        <label className="block text-sm font-medium text-slate-300 mb-2">
                          Events
                        </label>
                        <div className="space-y-2">
                          {['File uploaded', 'Storage limit reached', 'API key created', 'Payment processed'].map((event) => (
                            <label key={event} className="flex items-center space-x-3">
                              <input type="checkbox" className="rounded bg-slate-800 border-slate-700 text-blue-500" />
                              <span className="text-white">{event}</span>
                            </label>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* Advanced Settings */}
              {activeSection === 'advanced' && (
                <div className="space-y-6">
                  <div className="glass rounded-2xl p-8">
                    <h2 className="text-xl font-semibold text-white mb-6">Developer Settings</h2>
                    
                    <div className="space-y-6">
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="text-white font-medium">Debug Mode</p>
                          <p className="text-sm text-slate-400">Show detailed error messages and logs</p>
                        </div>
                        <button className="relative inline-flex h-6 w-11 items-center rounded-full bg-slate-700 transition-colors">
                          <span className="translate-x-1 inline-block h-4 w-4 transform rounded-full bg-white transition-transform" />
                        </button>
                      </div>

                      <div className="flex items-center justify-between">
                        <div>
                          <p className="text-white font-medium">Beta Features</p>
                          <p className="text-sm text-slate-400">Try new features before they're released</p>
                        </div>
                        <button className="relative inline-flex h-6 w-11 items-center rounded-full bg-blue-500 transition-colors">
                          <span className="translate-x-6 inline-block h-4 w-4 transform rounded-full bg-white transition-transform" />
                        </button>
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-slate-300 mb-2">
                          API Rate Limit
                        </label>
                        <select className="w-full px-4 py-3 rounded-lg bg-slate-800 border border-slate-700 text-white focus:outline-none focus:border-blue-500">
                          <option value="standard">Standard (1000 req/hour)</option>
                          <option value="enhanced">Enhanced (5000 req/hour)</option>
                          <option value="unlimited">Unlimited</option>
                        </select>
                      </div>
                    </div>
                  </div>

                  <div className="glass rounded-2xl p-8">
                    <h3 className="text-lg font-semibold text-white mb-6">Danger Zone</h3>
                    
                    <div className="space-y-4">
                      <div className="p-4 rounded-lg border border-red-500/20 bg-red-500/10">
                        <h4 className="text-red-400 font-medium mb-2">Delete Account</h4>
                        <p className="text-sm text-slate-400 mb-4">
                          Once you delete your account, there is no going back. Please be certain.
                        </p>
                        <button className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors">
                          Delete Account
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </motion.div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  )
}