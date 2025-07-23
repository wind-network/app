'use client'

import { motion } from 'framer-motion'
import { DashboardLayout } from '@/components/DashboardLayout'
import Link from 'next/link'
import { useAuth } from '@/hooks/useAuth'

export default function DashboardPage() {
  const { getUserDisplayName } = useAuth(true)
  
  const stats = [
    { label: 'Total Storage Used', value: '2.5 GB', change: '+12%', trend: 'up' },
    { label: 'API Calls Today', value: '45.2K', change: '+8%', trend: 'up' },
    { label: 'Active Connections', value: '127', change: '-3%', trend: 'down' },
    { label: 'Monthly Cost', value: '$24.99', change: '0%', trend: 'neutral' },
  ]

  const activities = [
    { id: 1, type: 'upload', description: 'Uploaded 125 MB to Wind Space', time: '2 minutes ago' },
    { id: 2, type: 'api', description: 'API key regenerated', time: '1 hour ago' },
    { id: 3, type: 'dropspace', description: 'Shared file via DropSpace', time: '3 hours ago' },
    { id: 4, type: 'billing', description: 'Monthly invoice generated', time: '1 day ago' },
  ]

  const quickActions = [
    { name: 'Upload Files', icon: '📤', href: '/dashboard/wind-space', color: 'from-blue-500 to-cyan-500' },
    { name: 'View Analytics', icon: '📊', href: '/dashboard/wind-network', color: 'from-purple-500 to-pink-500' },
    { name: 'Share Files', icon: '🚀', href: '/dashboard/dropspace', color: 'from-orange-500 to-amber-500' },
    { name: 'Manage Billing', icon: '💳', href: '/dashboard/billing', color: 'from-green-500 to-emerald-500' },
  ]

  return (
    <DashboardLayout>
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-white mb-2">Welcome back, {getUserDisplayName()}</h1>
          <p className="text-slate-400">Here's what's happening with your Wind Network services.</p>
        </div>

        {/* Stats Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {stats.map((stat, index) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="glass rounded-xl p-6"
            >
              <p className="text-sm text-slate-400 mb-2">{stat.label}</p>
              <p className="text-2xl font-bold text-white mb-2">{stat.value}</p>
              <div className="flex items-center space-x-2">
                <span className={`text-sm ${
                  stat.trend === 'up' ? 'text-green-400' :
                  stat.trend === 'down' ? 'text-red-400' :
                  'text-slate-400'
                }`}>
                  {stat.change}
                </span>
                {stat.trend === 'up' && (
                  <svg className="w-4 h-4 text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
                  </svg>
                )}
                {stat.trend === 'down' && (
                  <svg className="w-4 h-4 text-red-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 17h8m0 0V9m0 8l-8-8-4 4-6-6" />
                  </svg>
                )}
              </div>
            </motion.div>
          ))}
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Quick Actions */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="lg:col-span-2"
          >
            <h2 className="text-xl font-semibold text-white mb-6">Quick Actions</h2>
            <div className="grid sm:grid-cols-2 gap-4">
              {quickActions.map((action) => (
                <Link key={action.name} href={action.href}>
                  <motion.div
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className="glass rounded-xl p-6 cursor-pointer group"
                  >
                    <div className="flex items-center space-x-4">
                      <div className={`w-12 h-12 rounded-xl bg-gradient-to-r ${action.color} flex items-center justify-center text-2xl`}>
                        {action.icon}
                      </div>
                      <div>
                        <h3 className="font-semibold text-white group-hover:text-blue-400 transition-colors">
                          {action.name}
                        </h3>
                      </div>
                    </div>
                  </motion.div>
                </Link>
              ))}
            </div>
          </motion.div>

          {/* Recent Activity */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.6 }}
          >
            <h2 className="text-xl font-semibold text-white mb-6">Recent Activity</h2>
            <div className="glass rounded-xl p-6 space-y-4">
              {activities.map((activity) => (
                <div key={activity.id} className="flex items-start space-x-3">
                  <div className="w-2 h-2 rounded-full bg-blue-400 mt-2"></div>
                  <div className="flex-1">
                    <p className="text-sm text-white">{activity.description}</p>
                    <p className="text-xs text-slate-400 mt-1">{activity.time}</p>
                  </div>
                </div>
              ))}
              <Link href="/dashboard/activity" className="block text-sm text-blue-400 hover:text-blue-300 mt-4">
                View all activity →
              </Link>
            </div>
          </motion.div>
        </div>

        {/* Service Status */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.8 }}
          className="mt-8"
        >
          <h2 className="text-xl font-semibold text-white mb-6">Service Status</h2>
          <div className="grid md:grid-cols-3 gap-6">
            <div className="glass rounded-xl p-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-semibold text-white">Wind Network</h3>
                <span className="flex items-center text-sm text-green-400">
                  <span className="w-2 h-2 bg-green-400 rounded-full mr-2"></span>
                  Operational
                </span>
              </div>
              <p className="text-sm text-slate-400">All indexing nodes online</p>
            </div>

            <div className="glass rounded-xl p-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-semibold text-white">Wind Space</h3>
                <span className="flex items-center text-sm text-green-400">
                  <span className="w-2 h-2 bg-green-400 rounded-full mr-2"></span>
                  Operational
                </span>
              </div>
              <p className="text-sm text-slate-400">Storage systems healthy</p>
            </div>

            <div className="glass rounded-xl p-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-semibold text-white">DropSpace</h3>
                <span className="flex items-center text-sm text-yellow-400">
                  <span className="w-2 h-2 bg-yellow-400 rounded-full mr-2"></span>
                  Beta
                </span>
              </div>
              <p className="text-sm text-slate-400">Early access available</p>
            </div>
          </div>
        </motion.div>
      </div>
    </DashboardLayout>
  )
}