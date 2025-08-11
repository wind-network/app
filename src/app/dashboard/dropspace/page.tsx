'use client'

import { motion } from 'framer-motion'
import { DashboardLayout } from '@/components/DashboardLayout'
import { useState, useRef, useEffect } from 'react'
import Link from 'next/link'
import { DropSpaceService, type SharedFile, type StorageStats } from '@/services/dropspace'

export default function DropSpaceDashboard() {
  const [uploadProgress, setUploadProgress] = useState(0)
  const [isDragging, setIsDragging] = useState(false)
  const [recentShares, setRecentShares] = useState<SharedFile[]>([])
  const [storageStats, setStorageStats] = useState<StorageStats>({
    used: 0,
    total: 10,
    uploads: 0,
    downloads: 0,
    activeLinks: 0,
  })
  const [p2pPeers, setP2pPeers] = useState(0)
  const [isLoading, setIsLoading] = useState(true)
  const [uploadingFile, setUploadingFile] = useState<string | null>(null)
  const fileInputRef = useRef<HTMLInputElement>(null)
  
  const jupiterColors = {
    storms: ['#D4A574', '#C19660', '#8B6239', '#A0522D'],
    bands: ['#F4E4D4', '#E8D4B8', '#D4A574', '#C8986B'],
    spot: '#CD5C5C'
  }

  useEffect(() => {
    loadData()
    const interval = setInterval(loadData, 30000) // Refresh every 30 seconds
    return () => clearInterval(interval)
  }, [])

  const loadData = async () => {
    try {
      const [shares, stats, p2p] = await Promise.all([
        DropSpaceService.getRecentShares(),
        DropSpaceService.getStorageStats(),
        DropSpaceService.getP2PStats()
      ])
      
      setRecentShares(shares)
      setStorageStats(stats)
      setP2pPeers(p2p.peersOnline)
    } catch (error) {
      console.error('Failed to load dashboard data:', error)
    } finally {
      setIsLoading(false)
    }
  }

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault()
    setIsDragging(true)
  }

  const handleDragLeave = () => {
    setIsDragging(false)
  }

  const handleDrop = async (e: React.DragEvent) => {
    e.preventDefault()
    setIsDragging(false)
    const files = Array.from(e.dataTransfer.files)
    if (files.length > 0) {
      await handleFileUpload(files[0])
    }
  }

  const handleFileUpload = async (file: File) => {
    setUploadingFile(file.name)
    setUploadProgress(0)
    
    try {
      const response = await DropSpaceService.uploadFile(file, (progress) => {
        setUploadProgress(progress)
      })
      
      console.log('Upload successful:', response)
      await loadData() // Refresh the shares list
      
      setUploadingFile(null)
      setUploadProgress(0)
    } catch (error) {
      console.error('Upload failed:', error)
      setUploadingFile(null)
      setUploadProgress(0)
    }
  }

  const handleCopyLink = async (shareId: string) => {
    try {
      const link = await DropSpaceService.copyShareLink(shareId)
      console.log('Link copied:', link)
    } catch (error) {
      console.error('Failed to copy link:', error)
    }
  }

  const handleDeleteShare = async (shareId: string) => {
    try {
      await DropSpaceService.deleteShare(shareId)
      await loadData() // Refresh the list
    } catch (error) {
      console.error('Failed to delete share:', error)
    }
  }

  return (
    <DashboardLayout>
      <div className="max-w-7xl mx-auto">
        {/* Header with Jupiter theme */}
        <div className="mb-8 relative">
          <motion.div
            animate={{
              rotate: 360,
            }}
            transition={{
              duration: 200,
              repeat: Infinity,
              ease: "linear"
            }}
            className="absolute -top-20 -right-20 w-40 h-40 rounded-full opacity-10"
            style={{
              background: `radial-gradient(circle, ${jupiterColors.spot}, ${jupiterColors.storms[0]})`,
            }}
          />
          
          <h1 className="text-3xl font-bold text-white mb-2">DropSpace</h1>
          <p className="text-slate-400">File sharing for 2050 - Cross-planet ready, no Big Tech required</p>
          
          <div className="mt-4 flex items-center space-x-4">
            <Link 
              href="https://dropspace.wind.network" 
              target="_blank"
              className="btn-secondary flex items-center space-x-2"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
              </svg>
              <span>Open DropSpace App</span>
            </Link>
            
            <button className="text-slate-400 hover:text-white flex items-center space-x-2">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m9.632 4.316C18.114 15.062 18 15.518 18 16c0 .482.114.938.316 1.342m0-2.684a3 3 0 110 2.684M12 9a3 3 0 100-6 3 3 0 000 6z" />
              </svg>
              <span>Share Settings</span>
            </button>
          </div>
        </div>

        {/* Quick Stats */}
        <div className="grid md:grid-cols-5 gap-6 mb-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="glass rounded-xl p-6"
          >
            <p className="text-sm text-slate-400 mb-2">Storage Used</p>
            <p className="text-2xl font-bold text-white">{storageStats.used} GB</p>
            <p className="text-xs text-slate-400">of {storageStats.total} GB</p>
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="glass rounded-xl p-6"
          >
            <p className="text-sm text-slate-400 mb-2">Total Uploads</p>
            <p className="text-2xl font-bold text-white">{storageStats.uploads}</p>
            <p className="text-xs text-green-400">+12 this week</p>
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="glass rounded-xl p-6"
          >
            <p className="text-sm text-slate-400 mb-2">Total Downloads</p>
            <p className="text-2xl font-bold text-white">{storageStats.downloads}</p>
            <p className="text-xs text-blue-400">+89 this week</p>
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="glass rounded-xl p-6"
          >
            <p className="text-sm text-slate-400 mb-2">Active Links</p>
            <p className="text-2xl font-bold text-white">{storageStats.activeLinks}</p>
            <p className="text-xs text-orange-400">3 expiring soon</p>
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="glass rounded-xl p-6"
          >
            <p className="text-sm text-slate-400 mb-2">P2P Peers</p>
            <p className="text-2xl font-bold text-white">{p2pPeers.toLocaleString()}</p>
            <p className="text-xs text-green-400">Online</p>
          </motion.div>
        </div>

        {/* Upload Section with Jupiter theme */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="glass rounded-2xl p-8 mb-8 relative overflow-hidden"
        >
          {/* Jupiter bands background */}
          <div className="absolute inset-0 opacity-5">
            {jupiterColors.bands.map((color, i) => (
              <motion.div
                key={i}
                animate={{
                  x: [0, -100, 0],
                }}
                transition={{
                  duration: 20 + i * 5,
                  repeat: Infinity,
                  ease: "linear"
                }}
                className="absolute w-full"
                style={{
                  height: '25%',
                  top: `${i * 25}%`,
                  background: `linear-gradient(90deg, transparent, ${color}, transparent)`,
                }}
              />
            ))}
          </div>
          
          <div className="relative z-10">
            <h2 className="text-xl font-semibold text-white mb-6">Quick Share</h2>
            
            <div
              onDragOver={handleDragOver}
              onDragLeave={handleDragLeave}
              onDrop={handleDrop}
              onClick={() => fileInputRef.current?.click()}
              className={`border-2 border-dashed rounded-xl p-12 text-center cursor-pointer transition-all duration-300 ${
                isDragging 
                  ? 'border-orange-500 bg-orange-500/10' 
                  : 'border-slate-700 hover:border-orange-400 hover:bg-slate-800/50'
              }`}
            >
              <input
                ref={fileInputRef}
                type="file"
                multiple
                className="hidden"
                onChange={async (e) => {
                  const files = Array.from(e.target.files || [])
                  if (files.length > 0) {
                    await handleFileUpload(files[0])
                  }
                }}
              />
              
              <motion.div
                animate={{
                  y: [0, -10, 0],
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
              >
                <svg className="w-16 h-16 text-orange-400 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
                </svg>
              </motion.div>
              
              <p className="text-white font-medium mb-2">
                {isDragging ? 'Drop your files here' : 'Drop files here or click to upload'}
              </p>
              <p className="text-sm text-slate-400">
                Encrypted end-to-end • Max 5GB per file • Cross-planet compatible
              </p>
            </div>

            {uploadingFile && (
              <div className="mt-6">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm text-slate-300">Uploading {uploadingFile}...</span>
                  <span className="text-sm text-slate-400">{uploadProgress}%</span>
                </div>
                <div className="w-full h-2 bg-slate-700 rounded-full overflow-hidden">
                  <motion.div 
                    initial={{ width: 0 }}
                    animate={{ width: `${uploadProgress}%` }}
                    className="h-full bg-gradient-to-r from-orange-500 to-amber-500 rounded-full"
                  />
                </div>
              </div>
            )}
          </div>
        </motion.div>

        {/* Recent Shares */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7 }}
          className="glass rounded-2xl p-8"
        >
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-semibold text-white">Recent Shares</h2>
            <button className="text-blue-400 hover:text-blue-300">
              View all →
            </button>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="text-left text-sm text-slate-400 border-b border-slate-800">
                  <th className="pb-4">File Name</th>
                  <th className="pb-4">Size</th>
                  <th className="pb-4">Shared</th>
                  <th className="pb-4">Expires</th>
                  <th className="pb-4">Downloads</th>
                  <th className="pb-4">Actions</th>
                </tr>
              </thead>
              <tbody>
                {isLoading ? (
                  <tr>
                    <td colSpan={6} className="py-8 text-center text-slate-400">
                      Loading shares...
                    </td>
                  </tr>
                ) : recentShares.length === 0 ? (
                  <tr>
                    <td colSpan={6} className="py-8 text-center text-slate-400">
                      No shared files yet. Upload a file to get started!
                    </td>
                  </tr>
                ) : (
                  recentShares.map((share) => (
                    <tr key={share.id} className="border-b border-slate-800/50">
                      <td className="py-4">
                        <div className="flex items-center space-x-3">
                          <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-orange-500/20 to-amber-500/20 flex items-center justify-center">
                            <svg className="w-5 h-5 text-orange-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                            </svg>
                          </div>
                          <span className="text-white font-medium">{share.name}</span>
                        </div>
                      </td>
                      <td className="py-4 text-slate-300">{share.size}</td>
                      <td className="py-4 text-slate-300">{share.shared}</td>
                      <td className="py-4">
                        <span className={`text-sm ${
                          share.expires === 'Never' ? 'text-green-400' :
                          share.expires === 'Expired' ? 'text-red-400' :
                          'text-yellow-400'
                        }`}>
                          {share.expires}
                        </span>
                      </td>
                      <td className="py-4 text-slate-300">{share.downloads}</td>
                      <td className="py-4">
                        <div className="flex items-center space-x-2">
                          <button 
                            onClick={() => handleCopyLink(share.id)}
                            className="p-1 text-slate-400 hover:text-white" 
                            title="Copy link"
                          >
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
                            </svg>
                          </button>
                          <button className="p-1 text-slate-400 hover:text-white" title="Share settings">
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m9.632 4.316C18.114 15.062 18 15.518 18 16c0 .482.114.938.316 1.342m0-2.684a3 3 0 110 2.684M12 9a3 3 0 100-6 3 3 0 000 6z" />
                            </svg>
                          </button>
                          <button 
                            onClick={() => handleDeleteShare(share.id)}
                            className="p-1 text-slate-400 hover:text-red-400" 
                            title="Delete"
                          >
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                            </svg>
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </motion.div>

        {/* Features Grid */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.9 }}
          className="grid md:grid-cols-3 gap-6 mt-8"
        >
          <div className="glass rounded-xl p-6">
            <div className="w-12 h-12 rounded-xl bg-gradient-to-r from-orange-500 to-amber-500 flex items-center justify-center mb-4">
              <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
              </svg>
            </div>
            <h3 className="text-lg font-semibold text-white mb-2">End-to-End Encryption</h3>
            <p className="text-sm text-slate-400">Your files are encrypted before they leave your device. Not even we can see them.</p>
          </div>

          <div className="glass rounded-xl p-6">
            <div className="w-12 h-12 rounded-xl bg-gradient-to-r from-purple-500 to-pink-500 flex items-center justify-center mb-4">
              <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9" />
              </svg>
            </div>
            <h3 className="text-lg font-semibold text-white mb-2">Cross-Planet Ready</h3>
            <p className="text-sm text-slate-400">Built for the multi-planetary future. Works on Earth, Mars, and beyond.</p>
          </div>

          <div className="glass rounded-xl p-6">
            <div className="w-12 h-12 rounded-xl bg-gradient-to-r from-green-500 to-emerald-500 flex items-center justify-center mb-4">
              <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
              </svg>
            </div>
            <h3 className="text-lg font-semibold text-white mb-2">Lightning Fast</h3>
            <p className="text-sm text-slate-400">P2P transfers mean your files move at the speed of your connection.</p>
          </div>
        </motion.div>
      </div>
    </DashboardLayout>
  )
}