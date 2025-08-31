'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import { Navbar } from '@/components/Navbar'
import { Footer } from '@/components/Footer'

export default function DropSpacePage() {
  // Jupiter-themed animations
  const jupiterColors = {
    storms: ['#D4A574', '#C19660', '#8B6239', '#A0522D'],
    bands: ['#F4E4D4', '#E8D4B8', '#D4A574', '#C8986B'],
    spot: '#CD5C5C'
  }

  const features = [
    {
      title: 'Planetary Speed',
      description: 'Lightning-fast transfers between local devices. Instant sync across your personal network.',
      icon: '⚡',
      gradient: 'from-orange-400 to-amber-600',
      stats: ['< 1ms Local', '< 100ms Global', 'P2P Direct']
    },
    {
      title: 'Galactic Security',
      description: 'End-to-end encryption that even quantum computers from 2050 can\'t break. Your data, your keys.',
      icon: '🔐',
      gradient: 'from-purple-400 to-pink-600',
      stats: ['E2E Encrypted', 'Zero-Knowledge', 'Quantum Safe']
    },
    {
      title: 'Universal Access',
      description: 'Works on any device, any planet. From Earth to Mars colonies, your files follow you.',
      icon: '🌍',
      gradient: 'from-blue-400 to-cyan-600',
      stats: ['Cross-Platform', 'Offline First', 'Interplanetary']
    },
    {
      title: 'No Big Tech',
      description: 'Your data isn\'t training AI or feeding ads. Truly private, truly yours, truly decentralized.',
      icon: '🛡️',
      gradient: 'from-green-400 to-emerald-600',
      stats: ['No Tracking', 'No Ads', 'No Surveillance']
    }
  ]

  const demos = [
    { 
      title: 'Share with Nearby', 
      description: 'Drop files to anyone around you',
      visual: '📱 → 💫 → 📱'
    },
    { 
      title: 'Global Transfer', 
      description: 'Send to anyone, anywhere on Earth',
      visual: '🌍 → 🚀 → 🌏'
    },
    { 
      title: 'Time Capsule', 
      description: 'Schedule files for future delivery',
      visual: '📦 → ⏰ → 🎁'
    },
    { 
      title: 'Secure Vault', 
      description: 'Your personal encrypted storage',
      visual: '🔒 → 🏦 → 🔑'
    }
  ]

  return (
    <>
      <Navbar />
      <main className="relative overflow-hidden">
        {/* Jupiter-inspired animated background */}
      <div className="fixed inset-0 -z-10">
        <motion.div className="absolute inset-0 bg-gradient-to-b from-slate-950 via-amber-950/10 to-orange-950/20"></motion.div>
        
        {/* Jupiter's Great Red Spot */}
        <motion.div
          animate={{
            rotate: 360,
            scale: [1, 1.1, 1],
          }}
          transition={{
            rotate: { duration: 100, repeat: Infinity, ease: "linear" },
            scale: { duration: 20, repeat: Infinity, ease: "easeInOut" }
          }}
          className="absolute top-1/4 right-1/3 w-48 h-48 rounded-full bg-gradient-to-br from-red-600/20 to-orange-600/20 blur-3xl"
        />
        
        {/* Jupiter's bands */}
        {[...Array(5)].map((_, i) => (
          <motion.div
            key={i}
            animate={{
              x: [-100, 100],
              opacity: [0.1, 0.3, 0.1],
            }}
            transition={{
              duration: 20 + i * 5,
              repeat: Infinity,
              ease: "linear"
            }}
            className="absolute w-full h-32"
            style={{
              top: `${20 + i * 15}%`,
              background: `linear-gradient(90deg, transparent, ${jupiterColors.bands[i % jupiterColors.bands.length]}40, transparent)`,
              filter: 'blur(20px)'
            }}
          />
        ))}
      </div>

      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center px-4 sm:px-6">
        <div className="max-w-4xl mx-auto text-center w-full">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            {/* Badge */}
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="inline-flex items-center px-3 sm:px-4 py-2 sm:py-3 rounded-full mb-6 sm:mb-8"
              style={{
                background: 'linear-gradient(135deg, rgba(212, 165, 116, 0.2), rgba(139, 98, 57, 0.2))',
                border: '1px solid rgba(212, 165, 116, 0.3)'
              }}
            >
              <span className="w-2 h-2 bg-orange-400 rounded-full mr-3 animate-pulse"></span>
              <span className="text-xs sm:text-sm font-medium text-orange-200">
                File Sharing for the Year 2050 • Built on Wind Space
              </span>
            </motion.div>
            
            {/* Title with Jupiter gradient */}
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-4 sm:mb-6 leading-tight">
              <motion.span
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8, delay: 0.3 }}
                className="inline-block"
              >
                Drop
              </motion.span>
              <motion.span
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8, delay: 0.4 }}
                className="inline-block bg-gradient-to-r from-orange-400 via-amber-400 to-yellow-400 text-transparent bg-clip-text"
              >
                Space
              </motion.span>
            </h1>
            
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.5 }}
              className="text-sm sm:text-base lg:text-lg text-amber-100/80 mb-6 sm:mb-8 max-w-2xl mx-auto leading-relaxed px-2"
            >
              The Google Drive killer from the future. Share files at the speed of thought. 
              Encrypted, decentralized, and works across planets. No corporate overlords, 
              just pure peer-to-peer magic.
            </motion.p>

            {/* CTA Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.6 }}
              className="flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4 max-w-sm sm:max-w-none mx-auto"
            >
              <motion.a
                href="https://dropspace.wind.network"
                target="_blank"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="px-4 sm:px-6 py-2.5 sm:py-3 rounded-lg text-sm sm:text-base font-semibold text-white bg-gradient-to-r from-orange-500 to-amber-600 shadow-lg shadow-orange-500/20 flex items-center justify-center w-full sm:w-auto min-w-0"
              >
                <svg className="w-4 h-4 mr-1.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                </svg>
                <span className="truncate">Open DropSpace App</span>
                <span className="ml-1.5">🚀</span>
              </motion.a>
              
              <Link href="/dashboard/dropspace">
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="px-4 sm:px-6 py-2.5 sm:py-3 rounded-lg text-sm sm:text-base font-semibold text-orange-300 border border-orange-400/30 bg-orange-900/20 backdrop-blur flex items-center justify-center w-full sm:w-auto min-w-0"
                >
                  <svg className="w-4 h-4 mr-1.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M10.707 2.293a1 1 0 00-1.414 0l-7 7a1 1 0 001.414 1.414L4 10.414V17a1 1 0 001 1h2a1 1 0 001-1v-2a1 1 0 011-1h2a1 1 0 011 1v2a1 1 0 001 1h2a1 1 0 001-1v-6.586l.293.293a1 1 0 001.414-1.414l-7-7z" />
                  </svg>
                  <span className="truncate">Dashboard View</span>
                </motion.button>
              </Link>
            </motion.div>
            
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.8 }}
              className="text-center text-sm text-slate-400 mt-6"
            >
              DropSpace can be opened as a standalone app for the full experience
            </motion.p>
          </motion.div>

          {/* Floating devices animation */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 0.8 }}
            className="mt-12 sm:mt-16 lg:mt-20 relative h-48 sm:h-56 lg:h-64"
          >
            {['📱', '💻', '🖥️', '⌚', '🎮'].map((device, i) => (
              <motion.div
                key={i}
                animate={{
                  y: [0, -20, 0],
                  rotate: [0, 10, -10, 0],
                }}
                transition={{
                  duration: 4 + i,
                  repeat: Infinity,
                  delay: i * 0.5,
                }}
                className="absolute text-2xl sm:text-3xl lg:text-4xl"
                style={{
                  left: `${15 + i * 17.5}%`,
                  top: '50%',
                }}
              >
                {device}
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-12 sm:py-16 lg:py-24 px-4 sm:px-6">
        <div className="max-w-5xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-12 sm:mb-16"
          >
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold mb-3 sm:mb-4">
              File Sharing from the <span className="bg-gradient-to-r from-orange-400 to-amber-400 text-transparent bg-clip-text">Future</span>
            </h2>
            <p className="text-sm sm:text-base lg:text-lg text-amber-100/60 max-w-2xl mx-auto px-2">
              While others are stuck in 2025, we're building for 2050 and beyond
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
            {features.map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                whileHover={{ scale: 1.02, y: -5 }}
                className="relative p-4 sm:p-6 rounded-xl sm:rounded-2xl overflow-hidden group"
                style={{
                  background: 'linear-gradient(135deg, rgba(212, 165, 116, 0.1), rgba(139, 98, 57, 0.05))',
                  border: '1px solid rgba(212, 165, 116, 0.2)'
                }}
              >
                <motion.div
                  className={`absolute inset-0 bg-gradient-to-br ${feature.gradient} opacity-0 group-hover:opacity-10 transition-opacity duration-500`}
                />
                
                <div className="relative z-10">
                  <div className="text-3xl sm:text-4xl mb-3 sm:mb-4">{feature.icon}</div>
                  <h3 className="text-lg sm:text-xl font-bold mb-2 sm:mb-3 text-orange-100">{feature.title}</h3>
                  <p className="text-sm sm:text-base text-amber-100/70 mb-3 sm:mb-4 leading-relaxed">{feature.description}</p>
                  
                  <div className="flex flex-wrap gap-3">
                    {feature.stats.map((stat, idx) => (
                      <span 
                        key={idx} 
                        className="px-3 py-1.5 rounded-full text-xs sm:text-sm font-medium"
                        style={{
                          background: 'rgba(251, 191, 36, 0.1)',
                          color: '#FCD34D',
                          border: '1px solid rgba(251, 191, 36, 0.3)'
                        }}
                      >
                        {stat}
                      </span>
                    ))}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Interactive Features Section */}
      <section className="py-12 sm:py-16 lg:py-24 px-4 sm:px-6" style={{ background: 'rgba(217, 119, 6, 0.05)' }}>
        <div className="max-w-5xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-8 sm:mb-12"
          >
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold mb-3 sm:mb-4">
              How <span className="bg-gradient-to-r from-orange-400 to-amber-400 text-transparent bg-clip-text">DropSpace</span> Works
            </h2>
            <p className="text-sm sm:text-base lg:text-lg text-amber-100/60 max-w-2xl mx-auto px-2">
              File sharing reimagined for the modern world
            </p>
          </motion.div>

          {/* How It Works Steps */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
            {demos.map((demo, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                whileHover={{ scale: 1.02, y: -5 }}
                className="relative p-4 sm:p-6 rounded-xl sm:rounded-2xl overflow-hidden group text-center"
                style={{
                  background: 'linear-gradient(135deg, rgba(212, 165, 116, 0.1), rgba(139, 98, 57, 0.05))',
                  border: '1px solid rgba(212, 165, 116, 0.2)'
                }}
              >
                <motion.div
                  className="absolute inset-0 bg-gradient-to-br from-orange-400/10 to-amber-400/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                />
                
                <div className="relative z-10">
                  <div className="text-4xl sm:text-5xl mb-3 sm:mb-4">{demo.visual.split(' → ')[1]}</div>
                  <div className="text-sm font-medium text-orange-300/60 mb-2">Step {index + 1}</div>
                  <h3 className="text-base sm:text-lg font-bold mb-2 sm:mb-3 text-orange-100">{demo.title}</h3>
                  <p className="text-xs sm:text-sm text-amber-100/70 leading-relaxed">{demo.description}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-12 sm:py-16 lg:py-24 px-4 sm:px-6">
        <div className="max-w-3xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="p-6 sm:p-8 rounded-xl sm:rounded-2xl"
            style={{
              background: 'linear-gradient(135deg, rgba(217, 119, 6, 0.2), rgba(180, 83, 9, 0.1))',
              border: '1px solid rgba(251, 191, 36, 0.3)'
            }}
          >
            <h2 className="text-xl sm:text-2xl lg:text-3xl font-bold mb-3 sm:mb-4 text-orange-100">
              Ready to Drop into the Future?
            </h2>
            <p className="text-sm sm:text-base lg:text-lg text-amber-100/70 mb-4 sm:mb-6 px-2">
              Join millions across the galaxy who've already ditched Big Tech
            </p>
            
            <div className="flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4">
              <motion.a
                href="https://dropspace.wind.network"
                target="_blank"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="px-4 sm:px-6 py-2.5 sm:py-3 rounded-lg text-sm sm:text-base font-semibold text-white bg-gradient-to-r from-orange-500 to-amber-600 shadow-lg shadow-orange-500/20 flex items-center justify-center w-full sm:w-auto min-w-0"
              >
                <svg className="w-4 h-4 mr-1.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                </svg>
                <span className="truncate">Launch DropSpace App</span>
              </motion.a>
              
              <Link href="/dashboard/dropspace">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="px-4 sm:px-6 py-2.5 sm:py-3 rounded-lg text-sm sm:text-base font-semibold text-orange-300 border border-orange-400/30 bg-orange-900/20 w-full sm:w-auto"
                >
                  <span className="truncate">Access Dashboard</span>
                </motion.button>
              </Link>
            </div>

            <p className="mt-4 sm:mt-6 text-xs sm:text-sm text-amber-100/50">
              No credit card • No tracking • No BS • Just pure file freedom 🚀
            </p>
          </motion.div>
        </div>
      </section>
    </main>
    <Footer />
    </>
  )
}