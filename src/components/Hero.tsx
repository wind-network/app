'use client'

import { motion } from 'framer-motion'
import { useEffect, useState, Suspense } from 'react'
import dynamic from 'next/dynamic'

// Dynamically import Globe to avoid SSR issues
const Globe = dynamic(() => import('./Globe').then(mod => ({ default: mod.Globe })), {
  ssr: false,
  loading: () => (
    <div className="absolute inset-0 flex items-center justify-center">
      <div className="text-blue-400">Loading globe...</div>
    </div>
  )
})

export function Hero() {
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) return null

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Globe Background */}
      <div className="absolute inset-0 opacity-50">
        <Suspense fallback={<div />}>
          <Globe />
        </Suspense>
      </div>
      
      {/* Overlay gradient for better text readability */}
      <div className="absolute inset-0 bg-gradient-to-b from-slate-950/50 via-slate-950/30 to-slate-950/50 pointer-events-none"></div>
      
      {/* Background Elements */}
      <div className="absolute inset-0 grid-pattern opacity-10"></div>
      
      {/* Animated Background Shapes - now more subtle */}
      <div className="absolute inset-0">
        <motion.div
          animate={{
            scale: [1, 1.2, 1],
            rotate: [0, 180, 360],
          }}
          transition={{
            duration: 30,
            repeat: Infinity,
            ease: "linear"
          }}
          className="absolute top-1/4 left-1/4 w-32 h-32 rounded-full bg-gradient-to-r from-blue-600/10 to-cyan-400/10 blur-xl"
        />
        <motion.div
          animate={{
            scale: [1, 0.8, 1],
            rotate: [360, 180, 0],
          }}
          transition={{
            duration: 25,
            repeat: Infinity,
            ease: "linear"
          }}
          className="absolute top-3/4 right-1/4 w-48 h-48 rounded-full bg-gradient-to-r from-cyan-400/10 to-blue-600/10 blur-xl"
        />
        <motion.div
          animate={{
            y: [-20, 20, -20],
            x: [-10, 10, -10],
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            ease: "easeInOut"
          }}
          className="absolute top-1/2 right-1/3 w-24 h-24 rounded-xl bg-gradient-to-r from-blue-500/30 to-cyan-500/30 blur-lg"
        />
      </div>

      {/* Main Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-6 text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="mb-8"
        >
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="inline-flex items-center px-6 py-3 rounded-full glass mb-6"
          >
            <span className="w-2 h-2 bg-green-400 rounded-full mr-3 animate-pulse"></span>
            <span className="text-sm font-medium text-slate-300">
              Powered by Lava Lakes on Filecoin • Built for Solana
            </span>
          </motion.div>
          
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="text-6xl lg:text-8xl font-bold mb-6 leading-tight"
          >
            Access Solana{' '}
            <span className="text-gradient block lg:inline">
            Data faster and cheaper
            </span>
          </motion.h1>
          
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.5 }}
            className="text-xl lg:text-2xl text-slate-300 mb-12 max-w-4xl mx-auto leading-relaxed"
          >
            Wind Network&apos;s Wind Space brings enterprise-grade indexing and storage to Solana. 
            Built on our revolutionary Lava Lakes infrastructure on Filecoin,
            <span className="text-blue-400 font-semibold"> 92% cheaper</span> than centralized solutions with
            <span className="text-cyan-400 font-semibold"> sub-second</span> query times.
          </motion.p>
        </motion.div>

        {/* CTA Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.7 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-6 mb-16"
        >
          <motion.a
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            href="/dashboard"
            className="btn-primary group"
          >
            Get Started Free
            <motion.svg
              whileHover={{ x: 5 }}
              className="w-5 h-5 ml-2 transition-transform"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
            </motion.svg>
          </motion.a>
          
          <motion.a
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            href="/docs"
            className="btn-secondary group"
          >
            <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M9 4.804A7.968 7.968 0 005.5 4c-1.255 0-2.443.29-3.5.804v10A7.969 7.969 0 015.5 14c1.669 0 3.218.51 4.5 1.385A7.962 7.962 0 0114.5 14c1.255 0 2.443.29 3.5.804v-10A7.968 7.968 0 0014.5 4c-1.669 0-3.218.51-4.5 1.385V4.804zM19 14c0 5.524-4.477 10-10 10S-1 19.524-1 14 3.477 4 9 4s10 4.476 10 10z" clipRule="evenodd" />
            </svg>
            View Documentation
          </motion.a>
        </motion.div>

        {/* Stats Preview */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.9 }}
          className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto"
        >
          {[
            { value: '92%', label: 'Cost Reduction', suffix: '' },
            { value: '300', label: 'Query Latency', suffix: 'ms' },
            { value: '99.99%', label: 'Uptime SLA', suffix: '' },
          ].map((stat, index) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, delay: 1 + index * 0.1 }}
              className="glass rounded-2xl p-6 text-center"
            >
              <div className="text-3xl lg:text-4xl font-bold text-gradient mb-2">
                {stat.value}{stat.suffix}
              </div>
              <div className="text-slate-400 font-medium">{stat.label}</div>
            </motion.div>
          ))}
        </motion.div>
      </div>

      {/* Floating Elements */}
      <motion.div
        className="absolute top-20 left-10 w-6 h-6 rounded-full bg-blue-500/50 animate-float"
        animate={{
          y: [0, -20, 0],
          opacity: [0.5, 1, 0.5],
        }}
        transition={{
          duration: 4,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      />
      <motion.div
        className="absolute top-40 right-20 w-4 h-4 rounded-full bg-cyan-400/50 animate-float-delayed"
        animate={{
          y: [0, -15, 0],
          opacity: [0.3, 0.8, 0.3],
        }}
        transition={{
          duration: 3,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 1
        }}
      />
      <motion.div
        className="absolute bottom-40 left-20 w-8 h-8 rounded-square bg-blue-400/30 animate-float"
        animate={{
          rotate: [0, 180, 360],
          scale: [1, 1.2, 1],
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
          ease: "linear"
        }}
      />
    </section>
  )
}