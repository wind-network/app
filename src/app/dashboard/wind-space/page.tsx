'use client'

import { motion } from 'framer-motion'
import { DashboardLayout } from '@/components/DashboardLayout'
import { useState } from 'react'

export default function WindSpaceDashboard() {
  const [uploadProgress] = useState(0)
  
  const storageStats = [
    { label: 'Total Storage', value: '10 GB', used: '2.5 GB', percentage: 25 },
    { label: 'Hot Storage', value: '2 GB', used: '1.8 GB', percentage: 90 },
    { label: 'Cold Storage', value: '8 GB', used: '0.7 GB', percentage: 8.75 },
    { label: 'Bandwidth Used', value: '45.2 GB', limit: '100 GB', percentage: 45.2 },
  ]

  const recentFiles = [
    { id: 1, name: 'project-backup.zip', size: '125 MB', type: 'Archive', modified: '2 hours ago', status: 'hot' },
    { id: 2, name: 'dataset-2024.csv', size: '45 MB', type: 'Data', modified: '1 day ago', status: 'cold' },
    { id: 3, name: 'app-logs.txt', size: '12 MB', type: 'Text', modified: '3 days ago', status: 'hot' },
    { id: 4, name: 'media-assets.tar', size: '890 MB', type: 'Archive', modified: '1 week ago', status: 'cold' },
    { id: 5, name: 'config-backup.json', size: '2 MB', type: 'Config', modified: '2 weeks ago', status: 'cold' },
  ]

  const fileTypeDistribution = [
    { type: 'Documents', size: '450 MB', color: 'from-blue-500 to-blue-600' },
    { type: 'Images', size: '780 MB', color: 'from-purple-500 to-purple-600' },
    { type: 'Videos', size: '1.2 GB', color: 'from-pink-500 to-pink-600' },
    { type: 'Archives', size: '320 MB', color: 'from-orange-500 to-orange-600' },
    { type: 'Other', size: '150 MB', color: 'from-slate-500 to-slate-600' },
  ]

  return (
    <DashboardLayout>
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-white mb-2">Wind Space Storage</h1>
          <p className="text-slate-400">Manage your decentralized storage powered by Lava Lakes</p>
        </div>

        {/* Storage Overview */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {storageStats.map((stat, index) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="glass rounded-xl p-6"
            >
              <p className="text-sm text-slate-400 mb-2">{stat.label}</p>
              <p className="text-2xl font-bold text-white mb-1">{stat.used || stat.value}</p>
              <p className="text-sm text-slate-400 mb-3">of {stat.limit || stat.value}</p>
              <div className="w-full h-2 bg-slate-700 rounded-full overflow-hidden">
                <div 
                  className={`h-full rounded-full transition-all duration-500 ${
                    stat.percentage > 80 ? 'bg-orange-500' : 
                    stat.percentage > 60 ? 'bg-yellow-500' : 
                    'bg-green-500'
                  }`}
                  style={{ width: `${stat.percentage}%` }}
                />
              </div>
            </motion.div>
          ))}
        </div>

        <div className="grid lg:grid-cols-3 gap-8 mb-8">
          {/* Upload Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="lg:col-span-2"
          >
            <div className="glass rounded-2xl p-8">
              <h2 className="text-xl font-semibold text-white mb-6">Upload Files</h2>
              
              <div className="border-2 border-dashed border-slate-700 rounded-xl p-8 text-center hover:border-blue-500 transition-colors cursor-pointer">
                <svg className="w-12 h-12 text-slate-400 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
                </svg>
                <p className="text-white font-medium mb-2">Drop files here or click to upload</p>
                <p className="text-sm text-slate-400">Maximum file size: 5GB</p>
              </div>

              {uploadProgress > 0 && (
                <div className="mt-6">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm text-slate-300">Uploading file.zip</span>
                    <span className="text-sm text-slate-400">{uploadProgress}%</span>
                  </div>
                  <div className="w-full h-2 bg-slate-700 rounded-full overflow-hidden">
                    <div 
                      className="h-full bg-blue-500 rounded-full transition-all duration-300"
                      style={{ width: `${uploadProgress}%` }}
                    />
                  </div>
                </div>
              )}

              <div className="mt-6 flex items-center space-x-4">
                <button className="btn-primary">
                  Upload to Hot Storage
                </button>
                <button className="px-6 py-3 rounded-lg bg-slate-800 border border-slate-700 text-white hover:bg-slate-700 transition-all duration-200">
                  Upload to Cold Storage
                </button>
              </div>
            </div>
          </motion.div>

          {/* File Type Distribution */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.6 }}
          >
            <div className="glass rounded-2xl p-8">
              <h2 className="text-xl font-semibold text-white mb-6">Storage by Type</h2>
              
              <div className="space-y-4">
                {fileTypeDistribution.map((item) => (
                  <div key={item.type}>
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm text-slate-300">{item.type}</span>
                      <span className="text-sm text-slate-400">{item.size}</span>
                    </div>
                    <div className="w-full h-3 bg-slate-700 rounded-full overflow-hidden">
                      <div 
                        className={`h-full bg-gradient-to-r ${item.color} rounded-full`}
                        style={{ width: `${Math.random() * 60 + 20}%` }}
                      />
                    </div>
                  </div>
                ))}
              </div>

              <div className="mt-6 pt-6 border-t border-slate-700">
                <button className="text-blue-400 hover:text-blue-300 text-sm">
                  View detailed analytics →
                </button>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Recent Files */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.8 }}
          className="glass rounded-2xl p-8"
        >
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-semibold text-white">Recent Files</h2>
            <button className="text-blue-400 hover:text-blue-300">
              View all files →
            </button>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="text-left text-sm text-slate-400 border-b border-slate-800">
                  <th className="pb-4">Name</th>
                  <th className="pb-4">Size</th>
                  <th className="pb-4">Type</th>
                  <th className="pb-4">Modified</th>
                  <th className="pb-4">Storage</th>
                  <th className="pb-4">Actions</th>
                </tr>
              </thead>
              <tbody>
                {recentFiles.map((file) => (
                  <tr key={file.id} className="border-b border-slate-800/50">
                    <td className="py-4">
                      <div className="flex items-center space-x-3">
                        <div className="w-10 h-10 rounded-lg bg-slate-800 flex items-center justify-center">
                          <svg className="w-5 h-5 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                          </svg>
                        </div>
                        <span className="text-white font-medium">{file.name}</span>
                      </div>
                    </td>
                    <td className="py-4 text-slate-300">{file.size}</td>
                    <td className="py-4 text-slate-300">{file.type}</td>
                    <td className="py-4 text-slate-300">{file.modified}</td>
                    <td className="py-4">
                      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                        file.status === 'hot' 
                          ? 'bg-orange-500/20 text-orange-400'
                          : 'bg-blue-500/20 text-blue-400'
                      }`}>
                        {file.status === 'hot' ? 'Hot' : 'Cold'}
                      </span>
                    </td>
                    <td className="py-4">
                      <div className="flex items-center space-x-2">
                        <button className="p-1 text-slate-400 hover:text-white">
                          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                          </svg>
                        </button>
                        <button className="p-1 text-slate-400 hover:text-white">
                          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m9.632 4.316C18.114 15.062 18 15.518 18 16c0 .482.114.938.316 1.342m0-2.684a3 3 0 110 2.684M12 9a3 3 0 100-6 3 3 0 000 6z" />
                          </svg>
                        </button>
                        <button className="p-1 text-slate-400 hover:text-red-400">
                          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                          </svg>
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </motion.div>
      </div>
    </DashboardLayout>
  )
}