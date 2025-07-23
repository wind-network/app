'use client'

import { motion } from 'framer-motion'
import { useState } from 'react'
import { useIntersectionObserver } from '@/hooks/useIntersectionObserver'

export function TechSpecs() {
  const [ref, isVisible] = useIntersectionObserver({ threshold: 0.2 })
  const [activeTab, setActiveTab] = useState('api')

  const tabs = [
    { id: 'api', label: 'API & SDKs', icon: '🔧' },
    { id: 'performance', label: 'Performance', icon: '⚡' },
    { id: 'security', label: 'Security', icon: '🛡️' },
    { id: 'infrastructure', label: 'Infrastructure', icon: '🏗️' }
  ]

  const specs = {
    api: [
      { label: 'Solana RPC', value: 'Full Compatibility', description: 'Drop-in replacement for Solana RPC endpoints' },
      { label: 'GraphQL API', value: 'Real-time Subscriptions', description: 'Live Solana data streaming with WebSocket' },
      { label: 'TypeScript SDK', value: 'Anchor Compatible', description: 'Native support for Anchor programs' },
      { label: 'Rust SDK', value: 'Zero-copy', description: 'Direct integration with Solana programs' },
      { label: 'Rate Limits', value: '100K requests/sec', description: 'No rate limits for validators' },
      { label: 'Historical Data', value: 'Full chain history', description: 'Query any slot since genesis' }
    ],
    performance: [
      { label: 'Query Latency', value: '< 50ms P95', description: 'Lava Lakes hot storage layer' },
      { label: 'RPC Throughput', value: '100K TPS', description: 'Handle full Solana transaction volume' },
      { label: 'Compression', value: '80-95% reduction', description: 'Solana-optimized compression' },
      { label: 'Cache Hit Rate', value: '98%+', description: 'Account state caching' },
      { label: 'WebSocket Connections', value: '1M+', description: 'Real-time program subscriptions' },
      { label: 'Data Freshness', value: '< 400ms', description: 'Near real-time indexing' }
    ],
    security: [
      { label: 'Data Integrity', value: 'Cryptographic Proofs', description: 'Filecoin storage proofs' },
      { label: 'Access Control', value: 'Solana Wallet Auth', description: 'Native wallet-based authentication' },
      { label: 'Decentralization', value: 'No Single Point', description: 'Distributed across Wind Network' },
      { label: 'Verification', value: 'On-chain', description: 'Verifiable data commitments' },
      { label: 'Privacy', value: 'Zero-knowledge', description: 'Private data queries available' },
      { label: 'Availability', value: '99.99% Uptime', description: 'Multi-region redundancy' }
    ],
    infrastructure: [
      { label: 'Storage Layer', value: 'Lava Lakes on Filecoin', description: 'Hot storage for blockchain data' },
      { label: 'Durability', value: '11 9s (99.999999999%)', description: 'Filecoin&apos;s proven storage' },
      { label: 'Wind Network', value: 'Global P2P', description: 'Decentralized node network' },
      { label: 'Solana Integration', value: 'Native RPC', description: 'Direct validator connections' },
      { label: 'Data Pipeline', value: 'Real-time ETL', description: 'Sub-second data processing' },
      { label: 'Query Engine', value: 'Distributed SQL', description: 'Parallel query execution' }
    ]
  }

  const codeExamples = {
    api: `// TypeScript SDK Example
import { WindSpace } from '@wind/space-sdk'
import { Connection } from '@solana/web3.js'

// Drop-in replacement for Solana RPC
const connection = new WindSpace.Connection({
  endpoint: 'https://api.windspace.io/solana',
  apiKey: process.env.WIND_API_KEY
})

// Query historical account data
const accountHistory = await connection.getAccountHistory(
  publicKey,
  { startSlot: 150_000_000, limit: 1000 }
)

// Subscribe to program events
connection.onProgramAccountChange(
  programId,
  (accountInfo) => {
    console.log('Account updated:', accountInfo)
  },
  { commitment: 'confirmed' }
)`,
    
    performance: `// Performance Optimizations
const options = {
  // Parallel multipart uploads
  multipart: {
    threshold: 100 * 1024 * 1024, // 100MB
    partSize: 10 * 1024 * 1024,   // 10MB
    concurrency: 10
  },
  
  // Intelligent caching
  cache: {
    strategy: 'adaptive',
    ttl: 3600,
    prefetch: true
  },
  
  // Compression settings
  compression: {
    algorithm: 'zstd',
    level: 'adaptive',
    dictionary: true
  }
}`,
    
    security: `// Security Configuration
const secureClient = new WindSpace({
  apiKey: process.env.WIND_API_KEY,
  
  // Client-side encryption
  encryption: {
    algorithm: 'AES-256-GCM',
    keyDerivation: 'PBKDF2',
    keyRotation: 'weekly'
  },
  
  // Access control
  accessControl: {
    policy: 'least-privilege',
    mfa: true,
    sessionTimeout: 3600
  },
  
  // Audit logging
  audit: {
    enabled: true,
    immutable: true,
    blockchain: 'avalanche'
  }
})`,
    
    infrastructure: `// Infrastructure as Code
resource "windspace_bucket" "production" {
  name = "production-data"
  
  # Multi-region replication
  replication {
    regions = ["us-west-2", "eu-west-1", "ap-southeast-1"]
    consistency = "strong"
  }
  
  # Storage classes
  lifecycle {
    rule {
      hot_tier_days    = 7
      warm_tier_days   = 30
      cold_tier_after  = 90
    }
  }
  
  # Disaster recovery
  backup {
    schedule = "0 2 * * *"
    retention = "7y"
    cross_region = true
  }
}`
  }

  return (
    <section id="specs" ref={ref} className="py-32 relative overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 grid-pattern opacity-10"></div>
      
      <div className="relative z-10 max-w-7xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isVisible ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-5xl lg:text-6xl font-bold mb-6">
            Technical{' '}
            <span className="text-gradient">Specifications</span>
          </h2>
          <p className="text-xl text-slate-300 max-w-3xl mx-auto">
            Enterprise-grade infrastructure with developer-friendly APIs. 
            Built for scale, optimized for performance.
          </p>
        </motion.div>

        {/* Tab Navigation */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isVisible ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="flex flex-wrap justify-center gap-4 mb-12"
        >
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`px-6 py-3 rounded-2xl font-semibold transition-all duration-300 ${
                activeTab === tab.id
                  ? 'gradient-blue text-white shadow-lg scale-105'
                  : 'glass text-slate-300 hover:text-white hover:glass-strong'
              }`}
            >
              <span className="mr-2">{tab.icon}</span>
              {tab.label}
            </button>
          ))}
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Specifications */}
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            className="glass rounded-3xl p-8"
          >
            <h3 className="text-2xl font-bold mb-8 text-gradient">
              {tabs.find(t => t.id === activeTab)?.label} Specs
            </h3>
            
            <div className="space-y-6">
              {specs[activeTab as keyof typeof specs].map((spec, index) => (
                <motion.div
                  key={spec.label}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: index * 0.1 }}
                  className="border-b border-slate-700/50 pb-4 last:border-b-0"
                >
                  <div className="flex justify-between items-start mb-2">
                    <span className="font-semibold text-white">{spec.label}</span>
                    <span className="font-mono text-blue-400 text-right">{spec.value}</span>
                  </div>
                  <p className="text-slate-400 text-sm">{spec.description}</p>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Code Example */}
          <motion.div
            key={`${activeTab}-code`}
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            className="glass rounded-3xl p-8"
          >
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-2xl font-bold text-gradient">Code Example</h3>
              <div className="flex space-x-2">
                <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
                <div className="w-3 h-3 bg-green-500 rounded-full"></div>
              </div>
            </div>
            
            <div className="bg-slate-900/50 rounded-2xl p-6 overflow-x-auto">
              <pre className="text-sm text-slate-300 font-mono leading-relaxed">
                <code>{codeExamples[activeTab as keyof typeof codeExamples]}</code>
              </pre>
            </div>
            
            <div className="mt-6 flex space-x-4">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="btn-secondary text-sm"
              >
                Copy Code
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="btn-primary text-sm"
              >
                Try in Playground
              </motion.button>
            </div>
          </motion.div>
        </div>

        {/* Architecture Diagram */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={isVisible ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="mt-20 glass rounded-3xl p-12 text-center"
        >
          <h3 className="text-3xl font-bold mb-12 text-gradient">
            Architecture Overview
          </h3>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-20 h-20 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-2xl flex items-center justify-center mx-auto mb-4">
                <svg className="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 3v2m6-2v2M9 19v2m6-2v2M5 9H3m2 6H3m18-6h-2m2 6h-2M7 19h10a2 2 0 002-2V7a2 2 0 00-2-2H7a2 2 0 00-2 2v10a2 2 0 002 2zM9 9h6v6H9V9z" />
                </svg>
              </div>
              <h4 className="text-xl font-bold text-white mb-2">Hot Tier (Avalanche)</h4>
              <p className="text-slate-400">Sub-second finality for active data</p>
            </div>
            
            <div className="text-center">
              <div className="w-20 h-20 bg-gradient-to-r from-purple-500 to-pink-500 rounded-2xl flex items-center justify-center mx-auto mb-4">
                <svg className="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </div>
              <h4 className="text-xl font-bold text-white mb-2">Edge Network</h4>
              <p className="text-slate-400">Global CDN with intelligent caching</p>
            </div>
            
            <div className="text-center">
              <div className="w-20 h-20 bg-gradient-to-r from-green-500 to-emerald-500 rounded-2xl flex items-center justify-center mx-auto mb-4">
                <svg className="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 7v10c0 2.21 3.582 4 8 4s8-1.79 8-4V7M4 7c0 2.21 3.582 4 8 4s8-1.79 8-4M4 7c0-2.21 3.582-4 8-4s8 1.79 8 4" />
                </svg>
              </div>
              <h4 className="text-xl font-bold text-white mb-2">Cold Storage (Filecoin)</h4>
              <p className="text-slate-400">Cost-effective long-term storage</p>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}