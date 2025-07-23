'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import { Navbar } from '@/components/Navbar'
import { Footer } from '@/components/Footer'
import { DocsLayout } from '@/components/DocsLayout'

export default function DocsPage() {
  return (
    <>
      <Navbar />
      <div className="pt-20">
        <DocsLayout>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            {/* Header */}
            <div className="mb-12">
              <h1 className="text-5xl font-bold mb-4 text-gradient">
                Wind Network Documentation
              </h1>
              <p className="text-xl text-slate-300">
                A Decentralized Autonomous Incentivized Indexing Layer for Solana
              </p>
            </div>

            {/* Introduction */}
            <section className="mb-12">
              <div className="prose prose-invert prose-lg max-w-none">
                <p className="text-slate-300 leading-relaxed">
                  Wind Network is a new decentralized indexing system built for the high-speed Solana blockchain. 
                  It shifts data indexing away from a central point to a network of incentivized participants. 
                  By using the Interplanetary Data Machine (IPDM) and the libp2p gossipsub network, Wind Network 
                  aims to create a robust and open-source infrastructure capable of handling Solana's demanding data flow.
                </p>
                
                <p className="text-slate-300 leading-relaxed mt-4">
                  The system combines peer-to-peer networking, efficient data processing, and economic rewards 
                  to provide reliable, scalable, and decentralized data indexing with high performance, low latency, 
                  and strong data consistency and availability.
                </p>
              </div>
            </section>

            {/* What is Wind Network */}
            <section className="mb-12">
              <h2 className="text-3xl font-bold mb-6 text-white">Introduction to Wind Network</h2>
              
              <div className="glass rounded-2xl p-8 mb-8">
                <p className="text-slate-300 leading-relaxed">
                  Wind Network is a high-performance, distributed indexing solution for the Solana blockchain. 
                  It enables developers to efficiently index, query, and monitor blockchain data through a 
                  decentralized peer-to-peer network of indexing nodes.
                </p>
              </div>

              <h3 className="text-2xl font-bold mb-4 text-white">Overview</h3>
              <p className="text-slate-300 leading-relaxed mb-8">
                Wind Network provides a robust infrastructure for indexing Solana blockchain data in a 
                decentralized manner. Built with a focus on performance and reliability, it offers an 
                alternative to centralized indexing solutions.
              </p>
            </section>

            {/* Key Features */}
            <section className="mb-12">
              <h2 className="text-3xl font-bold mb-6 text-white">Key Features</h2>
              
              <div className="grid md:grid-cols-2 gap-6">
                <motion.div
                  whileHover={{ scale: 1.02 }}
                  className="glass rounded-xl p-6"
                >
                  <div className="text-2xl mb-3">⚡</div>
                  <h4 className="text-lg font-semibold mb-2 text-white">Real-time Data Indexing</h4>
                  <p className="text-slate-300 text-sm">
                    Direct integration via Solana's Geyser plugin interface for instant data capture
                  </p>
                </motion.div>

                <motion.div
                  whileHover={{ scale: 1.02 }}
                  className="glass rounded-xl p-6"
                >
                  <div className="text-2xl mb-3">🌐</div>
                  <h4 className="text-lg font-semibold mb-2 text-white">Distributed P2P Architecture</h4>
                  <p className="text-slate-300 text-sm">
                    High availability and scalability through decentralized node network
                  </p>
                </motion.div>

                <motion.div
                  whileHover={{ scale: 1.02 }}
                  className="glass rounded-xl p-6"
                >
                  <div className="text-2xl mb-3">🔌</div>
                  <h4 className="text-lg font-semibold mb-2 text-white">HTTP & WebSocket API</h4>
                  <p className="text-slate-300 text-sm">
                    Flexible APIs for querying indexed data and real-time subscriptions
                  </p>
                </motion.div>

                <motion.div
                  whileHover={{ scale: 1.02 }}
                  className="glass rounded-xl p-6"
                >
                  <div className="text-2xl mb-3">📦</div>
                  <h4 className="text-lg font-semibold mb-2 text-white">TypeScript SDK</h4>
                  <p className="text-slate-300 text-sm">
                    Seamless integration with web applications through native TypeScript support
                  </p>
                </motion.div>

                <motion.div
                  whileHover={{ scale: 1.02 }}
                  className="glass rounded-xl p-6"
                >
                  <div className="text-2xl mb-3">💾</div>
                  <h4 className="text-lg font-semibold mb-2 text-white">Performant Storage</h4>
                  <p className="text-slate-300 text-sm">
                    Multiple storage backends optimized for different use cases
                  </p>
                </motion.div>

                <motion.div
                  whileHover={{ scale: 1.02 }}
                  className="glass rounded-xl p-6"
                >
                  <div className="text-2xl mb-3">💎</div>
                  <h4 className="text-lg font-semibold mb-2 text-white">Jito MEV Integration</h4>
                  <p className="text-slate-300 text-sm">
                    Built-in support for tip routing and restaking capabilities
                  </p>
                </motion.div>
              </div>
            </section>

            {/* Why Wind Network */}
            <section className="mb-12">
              <h2 className="text-3xl font-bold mb-6 text-white">Why Wind Network?</h2>
              
              <div className="prose prose-invert prose-lg max-w-none">
                <p className="text-slate-300 leading-relaxed mb-6">
                  Traditional blockchain indexers often rely on centralized infrastructure, creating potential 
                  points of failure and limiting the resilience of applications built on top of them. 
                  Wind Network's distributed approach addresses these limitations by:
                </p>

                <div className="space-y-4">
                  <div className="flex items-start space-x-4">
                    <div className="flex-shrink-0 w-8 h-8 rounded-full bg-blue-500/20 flex items-center justify-center">
                      <span className="text-blue-400">✓</span>
                    </div>
                    <div>
                      <h4 className="font-semibold text-white mb-1">Enhanced Reliability</h4>
                      <p className="text-slate-300">
                        Decentralized network of nodes ensures no single point of failure
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start space-x-4">
                    <div className="flex-shrink-0 w-8 h-8 rounded-full bg-blue-500/20 flex items-center justify-center">
                      <span className="text-blue-400">✓</span>
                    </div>
                    <div>
                      <h4 className="font-semibold text-white mb-1">Improved Data Availability</h4>
                      <p className="text-slate-300">
                        Redundant storage across multiple nodes guarantees data persistence
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start space-x-4">
                    <div className="flex-shrink-0 w-8 h-8 rounded-full bg-blue-500/20 flex items-center justify-center">
                      <span className="text-blue-400">✓</span>
                    </div>
                    <div>
                      <h4 className="font-semibold text-white mb-1">Increased Query Performance</h4>
                      <p className="text-slate-300">
                        Distributed processing enables parallel query execution and caching
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start space-x-4">
                    <div className="flex-shrink-0 w-8 h-8 rounded-full bg-blue-500/20 flex items-center justify-center">
                      <span className="text-blue-400">✓</span>
                    </div>
                    <div>
                      <h4 className="font-semibold text-white mb-1">Community-Driven Services</h4>
                      <p className="text-slate-300">
                        Open participation model enables anyone to contribute to the network
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </section>

            {/* Quick Links */}
            <section className="mb-12">
              <h2 className="text-3xl font-bold mb-6 text-white">Quick Links</h2>
              
              <div className="grid md:grid-cols-2 gap-6">
                <Link href="/docs/installation">
                  <motion.div
                    whileHover={{ scale: 1.02, y: -2 }}
                    className="glass rounded-xl p-6 cursor-pointer group"
                  >
                    <h3 className="text-xl font-semibold mb-2 text-white group-hover:text-blue-400 transition-colors">
                      Installation Guide →
                    </h3>
                    <p className="text-slate-300">
                      Get started with Wind Network in minutes
                    </p>
                  </motion.div>
                </Link>

                <Link href="/docs/architecture">
                  <motion.div
                    whileHover={{ scale: 1.02, y: -2 }}
                    className="glass rounded-xl p-6 cursor-pointer group"
                  >
                    <h3 className="text-xl font-semibold mb-2 text-white group-hover:text-blue-400 transition-colors">
                      Architecture Overview →
                    </h3>
                    <p className="text-slate-300">
                      Understand how Wind Network works under the hood
                    </p>
                  </motion.div>
                </Link>

                <Link href="/docs/api">
                  <motion.div
                    whileHover={{ scale: 1.02, y: -2 }}
                    className="glass rounded-xl p-6 cursor-pointer group"
                  >
                    <h3 className="text-xl font-semibold mb-2 text-white group-hover:text-blue-400 transition-colors">
                      API Reference →
                    </h3>
                    <p className="text-slate-300">
                      Complete API documentation and examples
                    </p>
                  </motion.div>
                </Link>

                <Link href="/docs/indexing">
                  <motion.div
                    whileHover={{ scale: 1.02, y: -2 }}
                    className="glass rounded-xl p-6 cursor-pointer group"
                  >
                    <h3 className="text-xl font-semibold mb-2 text-white group-hover:text-blue-400 transition-colors">
                      Indexing Guide →
                    </h3>
                    <p className="text-slate-300">
                      Learn how to index and retrieve Solana data
                    </p>
                  </motion.div>
                </Link>
              </div>
            </section>

            {/* Get Started */}
            <section className="mb-12">
              <div className="glass-strong rounded-2xl p-8 text-center">
                <h2 className="text-2xl font-bold mb-4 text-white">Ready to Get Started?</h2>
                <p className="text-slate-300 mb-6">
                  Join the Wind Network community and start building decentralized indexing solutions
                </p>
                <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                  <Link href="/docs/quickstart">
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      className="btn-primary"
                    >
                      Quick Start Guide
                    </motion.button>
                  </Link>
                  <a
                    href="https://github.com/wind-network/windexer"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      className="btn-secondary"
                    >
                      View on GitHub
                    </motion.button>
                  </a>
                </div>
              </div>
            </section>
          </motion.div>
        </DocsLayout>
      </div>
      <Footer />
    </>
  )
}