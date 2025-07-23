'use client'

import { motion } from 'framer-motion'
import { useIntersectionObserver } from '@/hooks/useIntersectionObserver'

export function Features() {
  const [ref, isVisible] = useIntersectionObserver({ threshold: 0.2 })

  const features = [
    {
      id: 'decentralized',
      title: 'Solana-Native Indexing',
      description: 'Purpose-built for Solana data with native support for accounts, transactions, and program states.',
      icon: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
        </svg>
      ),
      gradient: 'from-blue-500 to-cyan-500',
      delay: 0
    },
    {
      id: 'performance',
      title: 'Lava Lakes Powered',
      description: 'Revolutionary hot storage layer on Filecoin delivers sub-second query times for blockchain data.',
      icon: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
        </svg>
      ),
      gradient: 'from-yellow-500 to-orange-500',
      delay: 0.1
    },
    {
      id: 'scalable',
      title: 'Infinitely Scalable',
      description: 'Handle entire Solana history and real-time data streams. Scale from DeFi apps to enterprise analytics.',
      icon: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16V4m0 0L3 8m4-4l4 4m6 0v12m0 0l4-4m-4 4l-4-4" />
        </svg>
      ),
      gradient: 'from-green-500 to-emerald-500',
      delay: 0.2
    },
    {
      id: 'developer-first',
      title: 'Developer First',
      description: 'Solana RPC-compatible APIs, TypeScript/Rust SDKs, and comprehensive developer tools.',
      icon: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
        </svg>
      ),
      gradient: 'from-purple-500 to-pink-500',
      delay: 0.3
    },
    {
      id: 'security',
      title: 'Wind Network Security',
      description: 'Decentralized verification, cryptographic proofs, and Filecoin&apos;s proven storage guarantees.',
      icon: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
        </svg>
      ),
      gradient: 'from-red-500 to-rose-500',
      delay: 0.4
    },
    {
      id: 'cost-effective',
      title: 'Cost Optimized',
      description: '92% cheaper than centralized alternatives. Free tier for Solana developers and validators.',
      icon: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1" />
        </svg>
      ),
      gradient: 'from-indigo-500 to-blue-500',
      delay: 0.5
    }
  ]

  return (
    <section id="features" ref={ref} className="py-32 relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0">
        <motion.div
          animate={{
            rotate: [0, 360],
            scale: [1, 1.2, 1],
          }}
          transition={{
            duration: 60,
            repeat: Infinity,
            ease: "linear"
          }}
          className="absolute -top-40 -right-40 w-80 h-80 rounded-full bg-gradient-to-r from-blue-600/10 to-cyan-400/10 blur-3xl"
        />
        <motion.div
          animate={{
            rotate: [360, 0],
            scale: [1, 0.8, 1],
          }}
          transition={{
            duration: 45,
            repeat: Infinity,
            ease: "linear"
          }}
          className="absolute -bottom-40 -left-40 w-96 h-96 rounded-full bg-gradient-to-r from-purple-600/10 to-pink-400/10 blur-3xl"
        />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isVisible ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-20"
        >
          <h2 className="text-5xl lg:text-6xl font-bold mb-6">
            Why Choose{' '}
            <span className="text-gradient">Wind Space</span>
          </h2>
          <p className="text-xl text-slate-300 max-w-3xl mx-auto">
            Built from the ground up for modern applications that demand 
            performance, reliability, and cost efficiency.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature) => (
            <motion.div
              key={feature.id}
              initial={{ opacity: 0, y: 40 }}
              animate={isVisible ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, delay: feature.delay }}
              className="glass rounded-3xl p-8 group hover:glass-strong transition-all duration-300 hover:scale-105"
            >
              <motion.div
                whileHover={{ scale: 1.1, rotate: 5 }}
                className={`w-16 h-16 rounded-2xl bg-gradient-to-r ${feature.gradient} flex items-center justify-center mb-6 text-white shadow-lg`}
              >
                {feature.icon}
              </motion.div>
              
              <h3 className="text-2xl font-bold mb-4 text-white">
                {feature.title}
              </h3>
              
              <p className="text-slate-300 leading-relaxed">
                {feature.description}
              </p>

              <motion.div
                className={`mt-6 h-1 bg-gradient-to-r ${feature.gradient} rounded-full scale-x-0 group-hover:scale-x-100 transition-all duration-500`}
              />
            </motion.div>
          ))}
        </div>

        {/* Technical Highlight */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={isVisible ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.8 }}
          className="mt-20 glass rounded-3xl p-12 text-center"
        >
          <div className="max-w-4xl mx-auto">
            <h3 className="text-3xl font-bold mb-8 text-gradient">
              Real-World Proven at Scale
            </h3>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="text-center">
                <div className="text-4xl font-bold text-blue-400 mb-2">4PB+</div>
                <div className="text-slate-300">Data Stored</div>
              </div>
              <div className="text-center">
                <div className="text-4xl font-bold text-green-400 mb-2">1M+</div>
                <div className="text-slate-300">API Calls Daily</div>
              </div>
              <div className="text-center">
                <div className="text-4xl font-bold text-purple-400 mb-2">99.99%</div>
                <div className="text-slate-300">Uptime SLA</div>
              </div>
            </div>
            
            <motion.div
              whileHover={{ scale: 1.05 }}
              className="mt-8 inline-flex items-center px-8 py-4 bg-gradient-to-r from-blue-600 to-cyan-600 rounded-2xl text-white font-semibold cursor-pointer"
            >
              <span>See Live Performance Dashboard</span>
              <svg className="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
              </svg>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}