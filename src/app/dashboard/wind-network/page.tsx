'use client'

import { motion } from 'framer-motion'
import { DashboardLayout } from '@/components/DashboardLayout'
import Link from 'next/link'

export default function WindNetworkDashboard() {
  const networkStats = [
    { label: 'Active Nodes', value: '1,247', change: '+23', trend: 'up' },
    { label: 'Total Indexed', value: '45.3M', change: '+2.1M', trend: 'up' },
    { label: 'Network Uptime', value: '99.98%', change: '+0.02%', trend: 'up' },
    { label: 'Daily Queries', value: '892K', change: '+15%', trend: 'up' },
  ]

  const nodePerformance = [
    { id: 1, name: 'Node Alpha-01', location: 'US East', status: 'online', load: 68, earnings: '$124.50' },
    { id: 2, name: 'Node Beta-02', location: 'EU West', status: 'online', load: 45, earnings: '$98.20' },
    { id: 3, name: 'Node Gamma-03', location: 'Asia Pacific', status: 'maintenance', load: 0, earnings: '$0.00' },
    { id: 4, name: 'Node Delta-04', location: 'US West', status: 'online', load: 82, earnings: '$156.80' },
  ]

  const indexingActivity = [
    { time: '10:45 AM', type: 'Token Metadata', blocks: '1,234', status: 'completed' },
    { time: '10:30 AM', type: 'Transaction History', blocks: '5,678', status: 'completed' },
    { time: '10:15 AM', type: 'Account State', blocks: '3,456', status: 'processing' },
    { time: '10:00 AM', type: 'Program Data', blocks: '2,345', status: 'completed' },
  ]

  return (
    <DashboardLayout>
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-white mb-2">Wind Network Dashboard</h1>
          <p className="text-slate-400">Monitor your indexing nodes and network performance</p>
        </div>

        {/* Network Stats */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {networkStats.map((stat, index) => (
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
                  stat.trend === 'up' ? 'text-green-400' : 'text-red-400'
                }`}>
                  {stat.change}
                </span>
                {stat.trend === 'up' && (
                  <svg className="w-4 h-4 text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
                  </svg>
                )}
              </div>
            </motion.div>
          ))}
        </div>

        {/* Node Performance */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="glass rounded-2xl p-8 mb-8"
        >
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-semibold text-white">Node Performance</h2>
            <Link href="/dashboard/wind-network/nodes" className="text-blue-400 hover:text-blue-300">
              View all nodes →
            </Link>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="text-left text-sm text-slate-400 border-b border-slate-800">
                  <th className="pb-4">Node Name</th>
                  <th className="pb-4">Location</th>
                  <th className="pb-4">Status</th>
                  <th className="pb-4">Load</th>
                  <th className="pb-4">24h Earnings</th>
                </tr>
              </thead>
              <tbody>
                {nodePerformance.map((node) => (
                  <tr key={node.id} className="border-b border-slate-800/50">
                    <td className="py-4">
                      <span className="text-white font-medium">{node.name}</span>
                    </td>
                    <td className="py-4 text-slate-300">{node.location}</td>
                    <td className="py-4">
                      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                        node.status === 'online' 
                          ? 'bg-green-500/20 text-green-400'
                          : 'bg-yellow-500/20 text-yellow-400'
                      }`}>
                        {node.status}
                      </span>
                    </td>
                    <td className="py-4">
                      <div className="flex items-center space-x-2">
                        <div className="w-24 h-2 bg-slate-700 rounded-full overflow-hidden">
                          <div 
                            className={`h-full rounded-full ${
                              node.load > 70 ? 'bg-orange-500' : 'bg-green-500'
                            }`}
                            style={{ width: `${node.load}%` }}
                          />
                        </div>
                        <span className="text-sm text-slate-400">{node.load}%</span>
                      </div>
                    </td>
                    <td className="py-4 text-green-400 font-medium">{node.earnings}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-8">
          {/* Indexing Activity */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.6 }}
            className="glass rounded-2xl p-8"
          >
            <h2 className="text-xl font-semibold text-white mb-6">Recent Indexing Activity</h2>
            <div className="space-y-4">
              {indexingActivity.map((activity, index) => (
                <div key={index} className="flex items-center justify-between p-4 rounded-lg bg-slate-800/50">
                  <div className="flex items-center space-x-4">
                    <div className={`w-2 h-2 rounded-full ${
                      activity.status === 'completed' ? 'bg-green-400' : 'bg-yellow-400 animate-pulse'
                    }`} />
                    <div>
                      <p className="text-white font-medium">{activity.type}</p>
                      <p className="text-sm text-slate-400">{activity.time} • {activity.blocks} blocks</p>
                    </div>
                  </div>
                  <span className={`text-sm ${
                    activity.status === 'completed' ? 'text-green-400' : 'text-yellow-400'
                  }`}>
                    {activity.status}
                  </span>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Network Health */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.8 }}
            className="glass rounded-2xl p-8"
          >
            <h2 className="text-xl font-semibold text-white mb-6">Network Health</h2>
            
            <div className="space-y-6">
              {/* Sync Status */}
              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-slate-300">Blockchain Sync</span>
                  <span className="text-green-400 text-sm">100%</span>
                </div>
                <div className="w-full h-2 bg-slate-700 rounded-full overflow-hidden">
                  <div className="h-full bg-green-500 rounded-full" style={{ width: '100%' }} />
                </div>
              </div>

              {/* Peer Connections */}
              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-slate-300">Peer Connections</span>
                  <span className="text-blue-400 text-sm">127 peers</span>
                </div>
                <div className="w-full h-2 bg-slate-700 rounded-full overflow-hidden">
                  <div className="h-full bg-blue-500 rounded-full" style={{ width: '85%' }} />
                </div>
              </div>

              {/* Storage Usage */}
              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-slate-300">Storage Usage</span>
                  <span className="text-orange-400 text-sm">68%</span>
                </div>
                <div className="w-full h-2 bg-slate-700 rounded-full overflow-hidden">
                  <div className="h-full bg-orange-500 rounded-full" style={{ width: '68%' }} />
                </div>
              </div>

              {/* Quick Actions */}
              <div className="pt-4 space-y-3">
                <Link href="/dashboard/wind-network/deploy" className="block">
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className="w-full btn-primary"
                  >
                    Deploy New Node
                  </motion.button>
                </Link>
                <Link href="/docs/indexing-guide" className="block">
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className="w-full px-6 py-3 rounded-lg bg-slate-800 border border-slate-700 text-white hover:bg-slate-700 transition-all duration-200"
                  >
                    View Documentation
                  </motion.button>
                </Link>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </DashboardLayout>
  )
}