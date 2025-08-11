'use client'

import { motion } from 'framer-motion'
import { useState } from 'react'
import Link from 'next/link'
import { Navbar } from '@/components/Navbar'
import { Footer } from '@/components/Footer'

export default function DropSpacePage() {
  const [activeDemo, setActiveDemo] = useState(0)
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
      <section className="relative min-h-screen flex items-center justify-center px-6">
        <div className="max-w-7xl mx-auto text-center">
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
              className="inline-flex items-center px-6 py-3 rounded-full mb-8"
              style={{
                background: 'linear-gradient(135deg, rgba(212, 165, 116, 0.2), rgba(139, 98, 57, 0.2))',
                border: '1px solid rgba(212, 165, 116, 0.3)'
              }}
            >
              <span className="w-2 h-2 bg-orange-400 rounded-full mr-3 animate-pulse"></span>
              <span className="text-sm font-medium text-orange-200">
                File Sharing for the Year 2050 • Built on Wind Space
              </span>
            </motion.div>
            
            {/* Title with Jupiter gradient */}
            <h1 className="text-6xl lg:text-8xl font-bold mb-6 leading-tight">
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
              className="text-xl lg:text-2xl text-amber-100/80 mb-12 max-w-4xl mx-auto leading-relaxed"
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
              className="flex flex-col sm:flex-row items-center justify-center gap-6"
            >
              <motion.a
                href="https://dropspace.wind.network"
                target="_blank"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="px-8 py-4 rounded-2xl font-semibold text-white bg-gradient-to-r from-orange-500 to-amber-600 shadow-2xl shadow-orange-500/20 flex items-center"
              >
                <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                </svg>
                Open DropSpace App
                <span className="ml-2">🚀</span>
              </motion.a>
              
              <Link href="/dashboard/dropspace">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="px-8 py-4 rounded-2xl font-semibold text-orange-300 border border-orange-400/30 bg-orange-900/20 backdrop-blur flex items-center"
                >
                  <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M10.707 2.293a1 1 0 00-1.414 0l-7 7a1 1 0 001.414 1.414L4 10.414V17a1 1 0 001 1h2a1 1 0 001-1v-2a1 1 0 011-1h2a1 1 0 011 1v2a1 1 0 001 1h2a1 1 0 001-1v-6.586l.293.293a1 1 0 001.414-1.414l-7-7z" />
                  </svg>
                  Dashboard View
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
            className="mt-20 relative h-64"
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
                className="absolute text-4xl"
                style={{
                  left: `${20 + i * 15}%`,
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
      <section className="py-32 px-6">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-20"
          >
            <h2 className="text-5xl font-bold mb-6">
              File Sharing from the <span className="bg-gradient-to-r from-orange-400 to-amber-400 text-transparent bg-clip-text">Future</span>
            </h2>
            <p className="text-xl text-amber-100/60 max-w-3xl mx-auto">
              While others are stuck in 2025, we're building for 2050 and beyond
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-8">
            {features.map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                whileHover={{ scale: 1.02, y: -5 }}
                className="relative p-8 rounded-3xl overflow-hidden group"
                style={{
                  background: 'linear-gradient(135deg, rgba(212, 165, 116, 0.1), rgba(139, 98, 57, 0.05))',
                  border: '1px solid rgba(212, 165, 116, 0.2)'
                }}
              >
                <motion.div
                  className={`absolute inset-0 bg-gradient-to-br ${feature.gradient} opacity-0 group-hover:opacity-10 transition-opacity duration-500`}
                />
                
                <div className="relative z-10">
                  <div className="text-5xl mb-6">{feature.icon}</div>
                  <h3 className="text-2xl font-bold mb-4 text-orange-100">{feature.title}</h3>
                  <p className="text-amber-100/70 mb-6 leading-relaxed">{feature.description}</p>
                  
                  <div className="flex flex-wrap gap-3">
                    {feature.stats.map((stat, idx) => (
                      <span 
                        key={idx} 
                        className="px-4 py-2 rounded-full text-sm font-medium"
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

      {/* Demo Section */}
      <section className="py-32 px-6" style={{ background: 'rgba(217, 119, 6, 0.05)' }}>
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-20"
          >
            <h2 className="text-5xl font-bold mb-6">
              See the <span className="bg-gradient-to-r from-orange-400 to-amber-400 text-transparent bg-clip-text">Magic</span>
            </h2>
            <p className="text-xl text-amber-100/60 max-w-3xl mx-auto">
              Drop files like you're living in the future
            </p>
          </motion.div>

          {/* Interactive Demo Area */}
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Demo Selector */}
            <div className="space-y-4">
              {demos.map((demo, index) => (
                <motion.button
                  key={index}
                  whileHover={{ x: 10 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => setActiveDemo(index)}
                  className={`w-full p-6 rounded-2xl text-left transition-all duration-300 ${
                    activeDemo === index 
                      ? 'bg-gradient-to-r from-orange-500/20 to-amber-500/20 border-orange-400' 
                      : 'bg-orange-900/10 border-orange-800/30 hover:bg-orange-900/20'
                  } border`}
                >
                  <h3 className="text-xl font-bold text-orange-100 mb-2">{demo.title}</h3>
                  <p className="text-amber-100/60">{demo.description}</p>
                  <div className="text-2xl mt-4">{demo.visual}</div>
                </motion.button>
              ))}
            </div>

            {/* Demo Visualization */}
            <motion.div
              key={activeDemo}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5 }}
              className="relative h-96 rounded-3xl overflow-hidden"
              style={{
                background: 'linear-gradient(135deg, rgba(217, 119, 6, 0.1), rgba(245, 158, 11, 0.05))',
                border: '1px solid rgba(251, 191, 36, 0.2)'
              }}
            >
              <div className="absolute inset-0 flex items-center justify-center">
                <motion.div
                  animate={{
                    scale: [1, 1.2, 1],
                    rotate: [0, 180, 360],
                  }}
                  transition={{
                    duration: 3,
                    repeat: Infinity,
                    ease: "easeInOut"
                  }}
                  className="text-8xl"
                >
                  {demos[activeDemo].visual.split(' → ')[1]}
                </motion.div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-32 px-6">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="p-12 rounded-3xl"
            style={{
              background: 'linear-gradient(135deg, rgba(217, 119, 6, 0.2), rgba(180, 83, 9, 0.1))',
              border: '1px solid rgba(251, 191, 36, 0.3)'
            }}
          >
            <h2 className="text-4xl font-bold mb-6 text-orange-100">
              Ready to Drop into the Future?
            </h2>
            <p className="text-xl text-amber-100/70 mb-8">
              Join millions across the galaxy who've already ditched Big Tech
            </p>
            
            <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
              <motion.a
                href="https://dropspace.wind.network"
                target="_blank"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="px-8 py-4 rounded-2xl font-semibold text-white bg-gradient-to-r from-orange-500 to-amber-600 shadow-2xl shadow-orange-500/20 flex items-center"
              >
                <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                </svg>
                Launch DropSpace App
              </motion.a>
              
              <Link href="/dashboard/dropspace">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="px-8 py-4 rounded-2xl font-semibold text-orange-300 border border-orange-400/30 bg-orange-900/20"
                >
                  Access Dashboard
                </motion.button>
              </Link>
            </div>

            <p className="mt-8 text-sm text-amber-100/50">
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