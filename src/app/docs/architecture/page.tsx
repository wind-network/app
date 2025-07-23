'use client'

import { motion } from 'framer-motion'
import { Navbar } from '@/components/Navbar'
import { Footer } from '@/components/Footer'
import { DocsLayout } from '@/components/DocsLayout'
import Image from 'next/image'

export default function ArchitecturePage() {
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
                Architecture
              </h1>
              <p className="text-xl text-slate-300">
                Wind Network's architecture is designed for scalability, reliability, and performance
              </p>
            </div>

            {/* Overview */}
            <section className="mb-12">
              <p className="text-slate-300 leading-relaxed mb-6">
                Wind Network's architecture is designed for scalability, reliability, and performance. 
                The system is composed of several interconnected components that work together to 
                provide a comprehensive indexing solution.
              </p>
            </section>

            {/* Components */}
            <section className="mb-12">
              <h2 className="text-3xl font-bold mb-6 text-white">Components</h2>
              
              <div className="prose prose-invert prose-lg max-w-none">
                <p className="text-slate-300 mb-6">
                  Wind Network consists of several modular components:
                </p>

                <div className="space-y-6">
                  <motion.div
                    whileHover={{ scale: 1.01 }}
                    className="glass rounded-xl p-6"
                  >
                    <h3 className="text-xl font-semibold mb-3 text-white flex items-center">
                      <span className="text-2xl mr-3">🔌</span>
                      Geyser Plugin
                    </h3>
                    <p className="text-slate-300">
                      Connects directly to Solana validators to stream real-time data. This plugin 
                      captures blockchain events as they happen, ensuring minimal latency between 
                      on-chain activity and indexed data.
                    </p>
                  </motion.div>

                  <motion.div
                    whileHover={{ scale: 1.01 }}
                    className="glass rounded-xl p-6"
                  >
                    <h3 className="text-xl font-semibold mb-3 text-white flex items-center">
                      <span className="text-2xl mr-3">🌐</span>
                      Node Network
                    </h3>
                    <p className="text-slate-300">
                      P2P network for data propagation and redundancy. Built on libp2p gossipsub 
                      protocol, nodes communicate and share indexed data to ensure high availability 
                      and fault tolerance.
                    </p>
                  </motion.div>

                  <motion.div
                    whileHover={{ scale: 1.01 }}
                    className="glass rounded-xl p-6"
                  >
                    <h3 className="text-xl font-semibold mb-3 text-white flex items-center">
                      <span className="text-2xl mr-3">🗄️</span>
                      Indexers
                    </h3>
                    <p className="text-slate-300">
                      Specialized nodes that index and serve data via API. These nodes process 
                      raw blockchain data, apply transformations, and make it queryable through 
                      REST and WebSocket interfaces.
                    </p>
                  </motion.div>

                  <motion.div
                    whileHover={{ scale: 1.01 }}
                    className="glass rounded-xl p-6"
                  >
                    <h3 className="text-xl font-semibold mb-3 text-white flex items-center">
                      <span className="text-2xl mr-3">📦</span>
                      Client SDK
                    </h3>
                    <p className="text-slate-300">
                      Libraries for interacting with Wind Network services. Available in TypeScript, 
                      Rust, and Python, providing idiomatic interfaces for each language ecosystem.
                    </p>
                  </motion.div>
                </div>
              </div>
            </section>

            {/* Data Flow */}
            <section id="data-flow" className="mb-12">
              <h2 className="text-3xl font-bold mb-6 text-white">Data Flow</h2>
              
              <div className="glass rounded-xl p-8 mb-8">
                <div className="space-y-6">
                  <div className="flex items-start space-x-4">
                    <div className="flex-shrink-0 w-10 h-10 rounded-full bg-blue-500/20 flex items-center justify-center">
                      <span className="text-blue-400 font-semibold">1</span>
                    </div>
                    <div>
                      <h4 className="font-semibold text-white mb-2">Data Ingestion</h4>
                      <p className="text-slate-300">
                        Raw blockchain data is captured through the Geyser plugin interface from 
                        Solana validators. This includes accounts, transactions, blocks, and program events.
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start space-x-4">
                    <div className="flex-shrink-0 w-10 h-10 rounded-full bg-blue-500/20 flex items-center justify-center">
                      <span className="text-blue-400 font-semibold">2</span>
                    </div>
                    <div>
                      <h4 className="font-semibold text-white mb-2">Processing</h4>
                      <p className="text-slate-300">
                        Data is processed, filtered, and transformed according to indexing rules. 
                        This includes deserializing program data, computing derived values, and 
                        organizing data for efficient queries.
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start space-x-4">
                    <div className="flex-shrink-0 w-10 h-10 rounded-full bg-blue-500/20 flex items-center justify-center">
                      <span className="text-blue-400 font-semibold">3</span>
                    </div>
                    <div>
                      <h4 className="font-semibold text-white mb-2">Storage</h4>
                      <p className="text-slate-300">
                        Processed data is stored in the selected storage backend. Different storage 
                        engines are optimized for different access patterns and use cases.
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start space-x-4">
                    <div className="flex-shrink-0 w-10 h-10 rounded-full bg-blue-500/20 flex items-center justify-center">
                      <span className="text-blue-400 font-semibold">4</span>
                    </div>
                    <div>
                      <h4 className="font-semibold text-white mb-2">Query</h4>
                      <p className="text-slate-300">
                        Users access indexed data through the HTTP/WebSocket API or SDK. Queries 
                        are routed to the appropriate storage backend and results are returned 
                        in a standardized format.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </section>

            {/* Storage Options */}
            <section id="storage-options" className="mb-12">
              <h2 className="text-3xl font-bold mb-6 text-white">Storage Options</h2>
              
              <p className="text-slate-300 mb-8">
                Wind Network supports multiple storage backends to suit different use cases:
              </p>

              {/* RocksDB */}
              <div className="mb-8">
                <h3 className="text-2xl font-bold mb-4 text-white">RocksDB (Default)</h3>
                <div className="glass rounded-xl p-6">
                  <p className="text-slate-300 mb-4">
                    The default storage option, optimized for high-throughput write operations.
                  </p>
                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <h5 className="font-semibold text-green-400 mb-2">✓ Pros</h5>
                      <ul className="text-sm text-slate-300 space-y-1">
                        <li>• Fast writes</li>
                        <li>• Low latency reads</li>
                        <li>• Good for hot storage</li>
                        <li>• Minimal resource usage</li>
                      </ul>
                    </div>
                    <div>
                      <h5 className="font-semibold text-red-400 mb-2">✗ Cons</h5>
                      <ul className="text-sm text-slate-300 space-y-1">
                        <li>• Limited query capabilities</li>
                        <li>• No complex analytics</li>
                        <li>• Key-value access only</li>
                      </ul>
                    </div>
                  </div>
                  <div className="mt-4 p-3 bg-blue-500/10 rounded-lg">
                    <p className="text-sm text-blue-400">
                      <strong>Best for:</strong> Real-time data ingestion, recent data access, 
                      simple key-based lookups
                    </p>
                  </div>
                </div>
              </div>

              {/* Apache Parquet */}
              <div className="mb-8">
                <h3 className="text-2xl font-bold mb-4 text-white">Apache Parquet</h3>
                <div className="glass rounded-xl p-6">
                  <p className="text-slate-300 mb-4">
                    Columnar storage format optimal for analytics workloads.
                  </p>
                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <h5 className="font-semibold text-green-400 mb-2">✓ Pros</h5>
                      <ul className="text-sm text-slate-300 space-y-1">
                        <li>• Excellent compression (3-4x better than JSON)</li>
                        <li>• High query performance</li>
                        <li>• Efficient for analytics</li>
                        <li>• Great for time-series data</li>
                      </ul>
                    </div>
                    <div>
                      <h5 className="font-semibold text-red-400 mb-2">✗ Cons</h5>
                      <ul className="text-sm text-slate-300 space-y-1">
                        <li>• Append-only</li>
                        <li>• Not suited for frequent updates</li>
                        <li>• Higher write latency</li>
                      </ul>
                    </div>
                  </div>
                  <div className="mt-4 p-3 bg-blue-500/10 rounded-lg">
                    <p className="text-sm text-blue-400">
                      <strong>Best for:</strong> Analytics, cold storage, historical data, 
                      data warehouse workloads
                    </p>
                  </div>
                </div>
              </div>

              {/* PostgreSQL */}
              <div className="mb-8">
                <h3 className="text-2xl font-bold mb-4 text-white">PostgreSQL</h3>
                <div className="glass rounded-xl p-6">
                  <p className="text-slate-300 mb-4">
                    Relational database with rich query capabilities.
                  </p>
                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <h5 className="font-semibold text-green-400 mb-2">✓ Pros</h5>
                      <ul className="text-sm text-slate-300 space-y-1">
                        <li>• SQL queries</li>
                        <li>• Complex analytics</li>
                        <li>• ACID compliance</li>
                        <li>• Point-in-time recovery</li>
                      </ul>
                    </div>
                    <div>
                      <h5 className="font-semibold text-red-400 mb-2">✗ Cons</h5>
                      <ul className="text-sm text-slate-300 space-y-1">
                        <li>• Higher resource usage</li>
                        <li>• Slower writes than specialized options</li>
                        <li>• Requires maintenance</li>
                      </ul>
                    </div>
                  </div>
                  <div className="mt-4 p-3 bg-blue-500/10 rounded-lg">
                    <p className="text-sm text-blue-400">
                      <strong>Best for:</strong> Complex queries, local development, 
                      transaction analysis, regulatory compliance
                    </p>
                  </div>
                </div>
              </div>

              {/* Hot/Cold Architecture */}
              <div className="mb-8">
                <h3 className="text-2xl font-bold mb-4 text-white">Hot/Cold Storage Architecture</h3>
                <div className="glass-strong rounded-xl p-6">
                  <p className="text-slate-300 mb-6">
                    Wind Network supports a hot/cold storage architecture for optimal performance 
                    and cost efficiency:
                  </p>
                  
                  <div className="grid md:grid-cols-2 gap-6">
                    <div className="glass rounded-lg p-4">
                      <h5 className="font-semibold text-orange-400 mb-2 flex items-center">
                        <span className="text-2xl mr-2">🔥</span> Hot Storage
                      </h5>
                      <p className="text-sm text-slate-300">
                        Recent data stored in RocksDB for fast access. Typically contains 
                        the last 7-30 days of data for immediate queries.
                      </p>
                    </div>
                    
                    <div className="glass rounded-lg p-4">
                      <h5 className="font-semibold text-blue-400 mb-2 flex items-center">
                        <span className="text-2xl mr-2">❄️</span> Cold Storage
                      </h5>
                      <p className="text-sm text-slate-300">
                        Historical data archived in Parquet or PostgreSQL. Optimized for 
                        analytics and long-term retention.
                      </p>
                    </div>
                  </div>

                  <div className="mt-6 p-4 bg-green-500/10 rounded-lg">
                    <p className="text-sm text-green-400">
                      This approach provides the best of both worlds: fast write performance 
                      during data ingestion and excellent query performance for analytics on 
                      historical data.
                    </p>
                  </div>
                </div>
              </div>
            </section>

            {/* Network Topology */}
            <section className="mb-12">
              <h2 className="text-3xl font-bold mb-6 text-white">Network Topology</h2>
              
              <div className="glass rounded-xl p-8">
                <p className="text-slate-300 mb-6">
                  Wind Network operates as a decentralized peer-to-peer network with different 
                  node types serving specific functions:
                </p>

                <div className="space-y-4">
                  <div className="flex items-center space-x-4">
                    <div className="w-4 h-4 rounded-full bg-green-500"></div>
                    <p className="text-slate-300">
                      <strong className="text-white">Validator Nodes:</strong> Run Geyser plugin, 
                      stream raw blockchain data
                    </p>
                  </div>
                  
                  <div className="flex items-center space-x-4">
                    <div className="w-4 h-4 rounded-full bg-blue-500"></div>
                    <p className="text-slate-300">
                      <strong className="text-white">Indexer Nodes:</strong> Process and store data, 
                      serve API endpoints
                    </p>
                  </div>
                  
                  <div className="flex items-center space-x-4">
                    <div className="w-4 h-4 rounded-full bg-purple-500"></div>
                    <p className="text-slate-300">
                      <strong className="text-white">Relay Nodes:</strong> Facilitate data propagation, 
                      improve network connectivity
                    </p>
                  </div>
                  
                  <div className="flex items-center space-x-4">
                    <div className="w-4 h-4 rounded-full bg-orange-500"></div>
                    <p className="text-slate-300">
                      <strong className="text-white">Archive Nodes:</strong> Long-term storage, 
                      historical data queries
                    </p>
                  </div>
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