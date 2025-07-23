'use client'

import { motion } from 'framer-motion'
import { Navbar } from '@/components/Navbar'
import { Footer } from '@/components/Footer'
import { DocsLayout } from '@/components/DocsLayout'
import { useState } from 'react'

export default function InstallationPage() {
  const [activeTab, setActiveTab] = useState('manual')

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
                Installation
              </h1>
              <p className="text-xl text-slate-300">
                This guide covers the installation and setup process for Wind Network
              </p>
            </div>

            {/* Prerequisites */}
            <section className="mb-12">
              <h2 className="text-3xl font-bold mb-6 text-white">Prerequisites</h2>
              
              <div className="glass rounded-xl p-6">
                <p className="text-slate-300 mb-4">
                  Before installing Wind Network, ensure you have the following prerequisites:
                </p>
                
                <div className="space-y-3">
                  <div className="flex items-center space-x-3">
                    <span className="text-green-400">✓</span>
                    <span className="text-slate-300">
                      <strong className="text-white">Rust 1.70+</strong> and Cargo
                    </span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <span className="text-green-400">✓</span>
                    <span className="text-slate-300">
                      <strong className="text-white">Node.js 16+</strong> and npm/yarn (for TypeScript examples)
                    </span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <span className="text-green-400">✓</span>
                    <span className="text-slate-300">
                      <strong className="text-white">Solana CLI tools</strong>
                    </span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <span className="text-green-400">✓</span>
                    <span className="text-slate-300">
                      <strong className="text-white">Git</strong>
                    </span>
                  </div>
                </div>
              </div>
            </section>

            {/* Quick Start */}
            <section className="mb-12">
              <h2 className="text-3xl font-bold mb-6 text-white">Quick Start</h2>
              
              {/* Installation Tabs */}
              <div className="mb-6">
                <div className="flex space-x-4 mb-6">
                  <button
                    onClick={() => setActiveTab('manual')}
                    className={`px-4 py-2 rounded-lg font-medium transition-all ${
                      activeTab === 'manual'
                        ? 'bg-blue-500 text-white'
                        : 'glass text-slate-300 hover:text-white'
                    }`}
                  >
                    Manual Installation
                  </button>
                  <button
                    onClick={() => setActiveTab('docker')}
                    className={`px-4 py-2 rounded-lg font-medium transition-all ${
                      activeTab === 'docker'
                        ? 'bg-blue-500 text-white'
                        : 'glass text-slate-300 hover:text-white'
                    }`}
                  >
                    Docker
                  </button>
                </div>

                {/* Manual Installation */}
                {activeTab === 'manual' && (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.3 }}
                  >
                    {/* Clone Repository */}
                    <div className="mb-8">
                      <h3 className="text-xl font-semibold mb-4 text-white">Clone the Repository</h3>
                      <div className="bg-slate-900 rounded-lg p-4 font-mono text-sm">
                        <code className="text-green-400">
                          git clone https://github.com/wind-network/windexer.git<br />
                          cd windexer
                        </code>
                      </div>
                    </div>

                    {/* Build Project */}
                    <div className="mb-8">
                      <h3 className="text-xl font-semibold mb-4 text-white">Build the Project</h3>
                      <div className="bg-slate-900 rounded-lg p-4 font-mono text-sm">
                        <code className="text-green-400">
                          cargo build --workspace
                        </code>
                      </div>
                    </div>

                    {/* Running wIndexer */}
                    <div className="mb-8">
                      <h3 className="text-xl font-semibold mb-4 text-white">Running wIndexer</h3>
                      
                      <div className="space-y-6">
                        <div>
                          <h4 className="font-medium mb-2 text-slate-300">
                            1. Start a Local Validator with Geyser Plugin
                          </h4>
                          <div className="bg-slate-900 rounded-lg p-4 font-mono text-sm">
                            <code className="text-green-400">
                              make run-validator-with-geyser
                            </code>
                          </div>
                        </div>

                        <div>
                          <h4 className="font-medium mb-2 text-slate-300">
                            2. Start a Node
                          </h4>
                          <p className="text-sm text-slate-400 mb-2">In a new terminal window:</p>
                          <div className="bg-slate-900 rounded-lg p-4 font-mono text-sm">
                            <code className="text-green-400">
                              make run-node-1
                            </code>
                          </div>
                        </div>

                        <div>
                          <h4 className="font-medium mb-2 text-slate-300">
                            3. Start an Indexer
                          </h4>
                          <p className="text-sm text-slate-400 mb-2">In another terminal window:</p>
                          <div className="bg-slate-900 rounded-lg p-4 font-mono text-sm">
                            <code className="text-green-400">
                              make run-indexer-1
                            </code>
                          </div>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                )}

                {/* Docker Installation */}
                {activeTab === 'docker' && (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.3 }}
                  >
                    <div className="mb-8">
                      <h3 className="text-xl font-semibold mb-4 text-white">Running with Docker</h3>
                      <p className="text-slate-300 mb-4">
                        Wind Network also provides Docker images for easy deployment:
                      </p>
                      <div className="bg-slate-900 rounded-lg p-4 font-mono text-sm">
                        <code className="text-green-400">
                          cd deployment/docker<br />
                          docker compose up -d
                        </code>
                      </div>
                    </div>
                  </motion.div>
                )}
              </div>
            </section>

            {/* Configuration */}
            <section id="configuration" className="mb-12">
              <h2 className="text-3xl font-bold mb-6 text-white">Configuration</h2>
              
              <p className="text-slate-300 mb-6">
                Example configuration with multiple storage options:
              </p>

              <div className="bg-slate-900 rounded-lg p-6 overflow-x-auto">
                <pre className="text-sm">
                  <code className="language-json text-slate-300">{`{
  "storage": {
    "storage_type": "rocksdb",     // Primary storage type (rocksdb, parquet, postgres)
    "rocksdb_path": "/path/to/rocksdb",
    "hot_cold_separation": true,   // Enable hot/cold storage separation
    "parquet": {
      "directory": "/path/to/parquet",
      "max_file_size_mb": 256,
      "compression_enabled": true,
      "partition_by_slot": true    // Create separate files by slot ranges
    },
    "postgres": {
      "connection_string": "postgres://user:password@localhost:5432/windexer",
      "create_tables": true,
      "batch_size": 1000,
      "max_connections": 10
    }
  }
}`}</code>
                </pre>
              </div>

              {/* Configuration Options */}
              <div className="mt-8 space-y-6">
                <div className="glass rounded-lg p-6">
                  <h4 className="text-lg font-semibold mb-3 text-white">Storage Configuration</h4>
                  <div className="space-y-2 text-sm">
                    <div>
                      <code className="text-blue-400">storage_type</code>
                      <span className="text-slate-300"> - Primary storage backend (rocksdb, parquet, postgres)</span>
                    </div>
                    <div>
                      <code className="text-blue-400">hot_cold_separation</code>
                      <span className="text-slate-300"> - Enable tiered storage for optimal performance</span>
                    </div>
                  </div>
                </div>

                <div className="glass rounded-lg p-6">
                  <h4 className="text-lg font-semibold mb-3 text-white">Network Configuration</h4>
                  <div className="space-y-2 text-sm">
                    <div>
                      <code className="text-blue-400">p2p_port</code>
                      <span className="text-slate-300"> - Port for P2P communication (default: 8000)</span>
                    </div>
                    <div>
                      <code className="text-blue-400">api_port</code>
                      <span className="text-slate-300"> - Port for HTTP API (default: 3000)</span>
                    </div>
                  </div>
                </div>
              </div>
            </section>

            {/* Testing Installation */}
            <section className="mb-12">
              <h2 className="text-3xl font-bold mb-6 text-white">Testing the Installation</h2>
              
              <div className="space-y-6">
                <div>
                  <h3 className="text-xl font-semibold mb-4 text-white">Generate Test Data</h3>
                  <div className="bg-slate-900 rounded-lg p-4 font-mono text-sm">
                    <code className="text-green-400">
                      cd examples/typescript<br />
                      npm install<br />
                      npm run generate-data
                    </code>
                  </div>
                </div>

                <div>
                  <h3 className="text-xl font-semibold mb-4 text-white">Query the Indexed Data</h3>
                  <div className="bg-slate-900 rounded-lg p-4 font-mono text-sm">
                    <code className="text-green-400">
                      npm run query-windexer
                    </code>
                  </div>
                </div>
              </div>
            </section>

            {/* Verification */}
            <section className="mb-12">
              <h2 className="text-3xl font-bold mb-6 text-white">Verify Installation</h2>
              
              <div className="glass rounded-xl p-6">
                <p className="text-slate-300 mb-4">
                  Check that all components are running correctly:
                </p>

                <div className="bg-slate-900 rounded-lg p-4 font-mono text-sm mb-6">
                  <code className="text-green-400">
                    curl http://localhost:3000/api/health
                  </code>
                </div>

                <p className="text-slate-300 mb-2">Expected response:</p>
                <div className="bg-slate-900 rounded-lg p-4 font-mono text-sm">
                  <code className="text-blue-400">{`{
  "status": "ok",
  "version": "1.0.0",
  "timestamp": "2024-03-21T12:00:00Z"
}`}</code>
                </div>
              </div>
            </section>

            {/* Next Steps */}
            <section className="mb-12">
              <div className="glass-strong rounded-2xl p-8">
                <h2 className="text-2xl font-bold mb-4 text-white">Next Steps</h2>
                <p className="text-slate-300 mb-6">
                  Now that you have Wind Network installed, explore these resources:
                </p>
                <div className="grid md:grid-cols-2 gap-4">
                  <a href="/docs/api" className="glass rounded-lg p-4 hover:scale-[1.02] transition-transform">
                    <h4 className="font-semibold text-white mb-1">API Reference →</h4>
                    <p className="text-sm text-slate-300">Learn about available endpoints</p>
                  </a>
                  <a href="/docs/indexing" className="glass rounded-lg p-4 hover:scale-[1.02] transition-transform">
                    <h4 className="font-semibold text-white mb-1">Indexing Guide →</h4>
                    <p className="text-sm text-slate-300">Start indexing Solana data</p>
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