'use client'

import { motion } from 'framer-motion'
import { useState } from 'react'
import { Navbar } from '@/components/Navbar'
import { Footer } from '@/components/Footer'

export default function SpacePage() {
  const [activeFeature, setActiveFeature] = useState(0)

  const features = [
    {
      title: 'Enterprise-Grade Infrastructure',
      description: 'Built on Lava Lakes with 11 9s durability, multi-region redundancy, and cryptographic storage proofs.',
      icon: '🏗️',
      stats: ['99.999999999% Durability', 'Multi-Region', 'Zero Downtime']
    },
    {
      title: 'Solana-Native Integration',
      description: 'Deep integration with Solana ecosystem. Store program data, NFT metadata, and DeFi analytics.',
      icon: '⚡',
      stats: ['Native RPC', 'Anchor Support', 'Program State Storage']
    },
    {
      title: 'Developer Experience',
      description: 'Drop-in replacement for centralized solutions. TypeScript, Rust, Python SDKs with comprehensive docs.',
      icon: '🚀',
      stats: ['5 min Integration', 'All Major SDKs', 'Real-time Support']
    },
    {
      title: 'Cost Efficiency',
      description: '92% cheaper than AWS S3. No egress fees. Pay only for what you use with transparent pricing.',
      icon: '💎',
      stats: ['$0.005/GB Storage', 'Free Egress', 'No Hidden Fees']
    }
  ]

  const useCases = [
    { 
      title: 'DeFi Protocols', 
      description: 'Store historical trading data, user analytics, and protocol states',
      gradient: 'from-blue-500 to-cyan-500'
    },
    { 
      title: 'NFT Platforms', 
      description: 'Decentralized metadata storage with IPFS compatibility',
      gradient: 'from-purple-500 to-pink-500'
    },
    { 
      title: 'DAOs & Governance', 
      description: 'Immutable proposal storage and voting history',
      gradient: 'from-green-500 to-emerald-500'
    },
    { 
      title: 'Gaming & Metaverse', 
      description: 'Asset storage, game states, and player data',
      gradient: 'from-orange-500 to-red-500'
    },
    { 
      title: 'Data Analytics', 
      description: 'Store and query massive blockchain datasets',
      gradient: 'from-indigo-500 to-blue-500'
    },
    { 
      title: 'Enterprise Archives', 
      description: 'Compliant, immutable document storage',
      gradient: 'from-slate-500 to-slate-700'
    }
  ]

  return (
    <>
      <Navbar />
      <main className="relative">
        {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 grid-pattern opacity-10"></div>
        
        {/* Animated Background */}
        <div className="absolute inset-0">
          <motion.div
            animate={{
              scale: [1, 1.2, 1],
              rotate: [0, 90, 0],
            }}
            transition={{
              duration: 20,
              repeat: Infinity,
              ease: "linear"
            }}
            className="absolute top-1/4 right-1/4 w-96 h-96 rounded-full bg-gradient-to-r from-blue-600/20 to-cyan-400/20 blur-3xl"
          />
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-6 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <div className="inline-flex items-center px-6 py-3 rounded-full glass mb-8">
              <span className="w-2 h-2 bg-blue-400 rounded-full mr-3 animate-pulse"></span>
              <span className="text-sm font-medium text-slate-300">
                Enterprise Storage Platform by Wind Network
              </span>
            </div>
            
            <h1 className="text-6xl lg:text-8xl font-bold mb-6 leading-tight">
              Wind Space
              <span className="text-gradient block mt-2">
                Enterprise Storage
              </span>
            </h1>
            
            <p className="text-xl lg:text-2xl text-slate-300 mb-12 max-w-4xl mx-auto leading-relaxed">
              The foundation for building robust, scalable applications. 
              Decentralized storage infrastructure that matches enterprise requirements 
              with blockchain guarantees.
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
              <motion.a
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                href="#contact"
                className="btn-primary group"
              >
                Schedule Demo
                <svg className="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </motion.a>
              
              <motion.a
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                href="#docs"
                className="btn-secondary"
              >
                View Documentation
              </motion.a>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Features Grid */}
      <section className="py-32 px-6">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-20"
          >
            <h2 className="text-5xl font-bold mb-6">
              Built for <span className="text-gradient">Enterprise Scale</span>
            </h2>
            <p className="text-xl text-slate-300 max-w-3xl mx-auto">
              Every feature designed with enterprise requirements in mind. 
              Security, compliance, and performance without compromise.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-8">
            {features.map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                onMouseEnter={() => setActiveFeature(index)}
                className={`relative p-8 rounded-3xl glass overflow-hidden group cursor-pointer transition-all duration-300 ${
                  activeFeature === index ? 'glass-strong scale-105' : ''
                }`}
              >
                <div className="absolute inset-0 gradient-blue opacity-0 group-hover:opacity-10 transition-opacity duration-300"></div>
                
                <div className="relative z-10">
                  <div className="text-5xl mb-6">{feature.icon}</div>
                  <h3 className="text-2xl font-bold mb-4 text-white">{feature.title}</h3>
                  <p className="text-slate-300 mb-6 leading-relaxed">{feature.description}</p>
                  
                  <div className="flex flex-wrap gap-3">
                    {feature.stats.map((stat, idx) => (
                      <span key={idx} className="px-4 py-2 rounded-full bg-blue-500/10 text-blue-400 text-sm font-medium">
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

      {/* Use Cases */}
      <section className="py-32 px-6 bg-slate-900/50">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-20"
          >
            <h2 className="text-5xl font-bold mb-6">
              Powering the <span className="text-gradient">Future of Web3</span>
            </h2>
            <p className="text-xl text-slate-300 max-w-3xl mx-auto">
              From DeFi to Gaming, Wind Space powers the most demanding Web3 applications
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {useCases.map((useCase, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                whileHover={{ y: -10, scale: 1.02 }}
                className="relative p-8 rounded-2xl glass overflow-hidden group"
              >
                <div className={`absolute inset-0 bg-gradient-to-br ${useCase.gradient} opacity-0 group-hover:opacity-20 transition-opacity duration-300`}></div>
                
                <h3 className="text-xl font-bold mb-3 text-white relative z-10">{useCase.title}</h3>
                <p className="text-slate-300 relative z-10">{useCase.description}</p>
              </motion.div>
            ))}
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
            className="glass rounded-3xl p-12"
          >
            <h2 className="text-4xl font-bold mb-6">
              Ready to Build the Future?
            </h2>
            <p className="text-xl text-slate-300 mb-8">
              Join leading protocols and enterprises already building on Wind Space
            </p>
            
            <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
              <motion.a
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                href="#start"
                className="btn-primary"
              >
                Start Building
              </motion.a>
              
              <motion.a
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                href="#contact"
                className="btn-secondary"
              >
                Talk to Sales
              </motion.a>
            </div>
          </motion.div>
        </div>
      </section>
    </main>
    <Footer />
    </>
  )
}