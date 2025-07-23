'use client'

import { motion } from 'framer-motion'
import { Navbar } from '@/components/Navbar'
import { Footer } from '@/components/Footer'
import { DocsLayout } from '@/components/DocsLayout'
import { useState } from 'react'

export default function APIReferencePage() {
  const [activeEndpoint, setActiveEndpoint] = useState('health')

  const endpoints = [
    { id: 'health', category: 'Health & Status', name: 'Health Check' },
    { id: 'status', category: 'Health & Status', name: 'Service Status' },
    { id: 'metrics', category: 'Health & Status', name: 'Metrics' },
    { id: 'latest-block', category: 'Blocks', name: 'Latest Block' },
    { id: 'block-by-slot', category: 'Blocks', name: 'Block by Slot' },
    { id: 'transaction', category: 'Transactions', name: 'Transaction by Signature' },
    { id: 'recent-transactions', category: 'Transactions', name: 'Recent Transactions' },
    { id: 'account-info', category: 'Accounts', name: 'Account Information' },
    { id: 'account-balance', category: 'Accounts', name: 'Account Balance' },
    { id: 'account-tokens', category: 'Accounts', name: 'Account Tokens' },
    { id: 'program-accounts', category: 'Accounts', name: 'Program Accounts' },
  ]

  const groupedEndpoints = endpoints.reduce((acc, endpoint) => {
    if (!acc[endpoint.category]) {
      acc[endpoint.category] = []
    }
    acc[endpoint.category].push(endpoint)
    return acc
  }, {} as Record<string, typeof endpoints>)

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
                API Reference
              </h1>
              <p className="text-xl text-slate-300">
                Complete documentation for all available endpoints, parameters, and response formats
              </p>
            </div>

            {/* Base URL */}
            <section className="mb-12">
              <h2 className="text-3xl font-bold mb-6 text-white">Base URL</h2>
              <div className="glass rounded-xl p-6">
                <p className="text-slate-300 mb-4">
                  All API endpoints are accessible through the following base URL:
                </p>
                <div className="bg-slate-900 rounded-lg p-4 font-mono">
                  <code className="text-green-400">http://test-may-us-01.windnetwork.ai:3000/api</code>
                </div>
              </div>
            </section>

            {/* Authentication */}
            <section className="mb-12">
              <h2 className="text-3xl font-bold mb-6 text-white">Authentication</h2>
              <div className="glass rounded-xl p-6">
                <p className="text-slate-300">
                  Currently, the API does not require authentication for public endpoints. 
                  Future versions will support API key authentication for premium features.
                </p>
              </div>
            </section>

            {/* API Endpoints */}
            <section className="mb-12">
              <h2 className="text-3xl font-bold mb-6 text-white">API Endpoints</h2>
              
              <div className="grid lg:grid-cols-3 gap-8">
                {/* Endpoint List */}
                <div className="lg:col-span-1">
                  <div className="glass rounded-xl p-4 sticky top-24">
                    <h3 className="text-lg font-semibold mb-4 text-white">Endpoints</h3>
                    {Object.entries(groupedEndpoints).map(([category, items]) => (
                      <div key={category} className="mb-6">
                        <h4 className="text-sm font-medium text-slate-400 uppercase tracking-wider mb-2">
                          {category}
                        </h4>
                        <div className="space-y-1">
                          {items.map((endpoint) => (
                            <button
                              key={endpoint.id}
                              onClick={() => setActiveEndpoint(endpoint.id)}
                              className={`w-full text-left px-3 py-2 rounded-lg text-sm transition-all ${
                                activeEndpoint === endpoint.id
                                  ? 'bg-blue-500/20 text-blue-400'
                                  : 'text-slate-300 hover:text-white hover:bg-slate-800/50'
                              }`}
                            >
                              {endpoint.name}
                            </button>
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Endpoint Details */}
                <div className="lg:col-span-2">
                  {/* Health Check */}
                  {activeEndpoint === 'health' && (
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      className="glass rounded-xl p-6"
                    >
                      <h3 className="text-2xl font-bold mb-4 text-white">Health Check</h3>
                      
                      <div className="mb-6">
                        <div className="flex items-center space-x-3 mb-4">
                          <span className="px-3 py-1 bg-green-500/20 text-green-400 text-sm font-medium rounded">
                            GET
                          </span>
                          <code className="text-slate-300 font-mono">/health</code>
                        </div>
                        
                        <p className="text-slate-300 mb-4">
                          Returns the health status of the API server.
                        </p>
                      </div>

                      <div className="mb-6">
                        <h4 className="text-lg font-semibold mb-3 text-white">Response</h4>
                        <div className="bg-slate-900 rounded-lg p-4 overflow-x-auto">
                          <pre className="text-sm text-slate-300">
{`{
  "status": "ok",
  "version": "1.0.0",
  "timestamp": "2024-03-21T12:00:00Z"
}`}
                          </pre>
                        </div>
                      </div>
                    </motion.div>
                  )}

                  {/* Service Status */}
                  {activeEndpoint === 'status' && (
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      className="glass rounded-xl p-6"
                    >
                      <h3 className="text-2xl font-bold mb-4 text-white">Service Status</h3>
                      
                      <div className="mb-6">
                        <div className="flex items-center space-x-3 mb-4">
                          <span className="px-3 py-1 bg-green-500/20 text-green-400 text-sm font-medium rounded">
                            GET
                          </span>
                          <code className="text-slate-300 font-mono">/status</code>
                        </div>
                        
                        <p className="text-slate-300 mb-4">
                          Returns detailed status information about the service.
                        </p>
                      </div>

                      <div className="mb-6">
                        <h4 className="text-lg font-semibold mb-3 text-white">Response</h4>
                        <div className="bg-slate-900 rounded-lg p-4 overflow-x-auto">
                          <pre className="text-sm text-slate-300">
{`{
  "status": "running",
  "uptime": "24h",
  "version": "1.0.0",
  "node_info": {
    "node_id": "node-0",
    "node_type": "indexer",
    "peer_count": 5
  }
}`}
                          </pre>
                        </div>
                      </div>
                    </motion.div>
                  )}

                  {/* Latest Block */}
                  {activeEndpoint === 'latest-block' && (
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      className="glass rounded-xl p-6"
                    >
                      <h3 className="text-2xl font-bold mb-4 text-white">Latest Block</h3>
                      
                      <div className="mb-6">
                        <div className="flex items-center space-x-3 mb-4">
                          <span className="px-3 py-1 bg-green-500/20 text-green-400 text-sm font-medium rounded">
                            GET
                          </span>
                          <code className="text-slate-300 font-mono">/blocks/latest</code>
                        </div>
                        
                        <p className="text-slate-300 mb-4">
                          Returns information about the latest processed block.
                        </p>
                      </div>

                      <div className="mb-6">
                        <h4 className="text-lg font-semibold mb-3 text-white">Response</h4>
                        <div className="bg-slate-900 rounded-lg p-4 overflow-x-auto">
                          <pre className="text-sm text-slate-300">
{`{
  "slot": 123456789,
  "blockhash": "hash123...",
  "parent_slot": 123456788,
  "timestamp": "2024-03-21T12:00:00Z",
  "transactions": 150
}`}
                          </pre>
                        </div>
                      </div>
                    </motion.div>
                  )}

                  {/* Block by Slot */}
                  {activeEndpoint === 'block-by-slot' && (
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      className="glass rounded-xl p-6"
                    >
                      <h3 className="text-2xl font-bold mb-4 text-white">Block by Slot</h3>
                      
                      <div className="mb-6">
                        <div className="flex items-center space-x-3 mb-4">
                          <span className="px-3 py-1 bg-green-500/20 text-green-400 text-sm font-medium rounded">
                            GET
                          </span>
                          <code className="text-slate-300 font-mono">/blocks/{'{slot}'}</code>
                        </div>
                        
                        <p className="text-slate-300 mb-4">
                          Returns information about a specific block by slot number.
                        </p>
                      </div>

                      <div className="mb-6">
                        <h4 className="text-lg font-semibold mb-3 text-white">Parameters</h4>
                        <div className="glass rounded-lg p-4">
                          <div className="flex items-start space-x-3">
                            <code className="text-blue-400">slot</code>
                            <div>
                              <span className="text-xs text-slate-400">(path parameter)</span>
                              <p className="text-sm text-slate-300 mt-1">
                                The slot number to query
                              </p>
                            </div>
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  )}

                  {/* Transaction by Signature */}
                  {activeEndpoint === 'transaction' && (
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      className="glass rounded-xl p-6"
                    >
                      <h3 className="text-2xl font-bold mb-4 text-white">Transaction by Signature</h3>
                      
                      <div className="mb-6">
                        <div className="flex items-center space-x-3 mb-4">
                          <span className="px-3 py-1 bg-green-500/20 text-green-400 text-sm font-medium rounded">
                            GET
                          </span>
                          <code className="text-slate-300 font-mono">/transaction/{'{signature}'}</code>
                        </div>
                        
                        <p className="text-slate-300 mb-4">
                          Returns detailed information about a specific transaction.
                        </p>
                      </div>

                      <div className="mb-6">
                        <h4 className="text-lg font-semibold mb-3 text-white">Parameters</h4>
                        <div className="glass rounded-lg p-4">
                          <div className="flex items-start space-x-3">
                            <code className="text-blue-400">signature</code>
                            <div>
                              <span className="text-xs text-slate-400">(path parameter)</span>
                              <p className="text-sm text-slate-300 mt-1">
                                The transaction signature to query
                              </p>
                            </div>
                          </div>
                        </div>
                      </div>

                      <div className="mb-6">
                        <h4 className="text-lg font-semibold mb-3 text-white">Response</h4>
                        <div className="bg-slate-900 rounded-lg p-4 overflow-x-auto">
                          <pre className="text-sm text-slate-300">
{`{
  "signature": "sig123...",
  "slot": 123456789,
  "success": true,
  "fee": 5000,
  "accounts": ["acc1...", "acc2..."],
  "timestamp": "2024-03-21T12:00:00Z"
}`}
                          </pre>
                        </div>
                      </div>
                    </motion.div>
                  )}

                  {/* Account Information */}
                  {activeEndpoint === 'account-info' && (
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      className="glass rounded-xl p-6"
                    >
                      <h3 className="text-2xl font-bold mb-4 text-white">Account Information</h3>
                      
                      <div className="mb-6">
                        <div className="flex items-center space-x-3 mb-4">
                          <span className="px-3 py-1 bg-green-500/20 text-green-400 text-sm font-medium rounded">
                            GET
                          </span>
                          <code className="text-slate-300 font-mono">/account/{'{pubkey}'}</code>
                        </div>
                        
                        <p className="text-slate-300 mb-4">
                          Returns detailed information about a specific account.
                        </p>
                      </div>

                      <div className="mb-6">
                        <h4 className="text-lg font-semibold mb-3 text-white">Response</h4>
                        <div className="bg-slate-900 rounded-lg p-4 overflow-x-auto">
                          <pre className="text-sm text-slate-300">
{`{
  "pubkey": "pubkey123...",
  "lamports": 1000000000,
  "owner": "owner123...",
  "executable": false,
  "rent_epoch": 123
}`}
                          </pre>
                        </div>
                      </div>
                    </motion.div>
                  )}
                </div>
              </div>
            </section>

            {/* WebSocket Endpoints */}
            <section id="websocket-endpoints" className="mb-12">
              <h2 className="text-3xl font-bold mb-6 text-white">WebSocket Endpoints</h2>
              
              <div className="glass rounded-xl p-6">
                <h3 className="text-xl font-semibold mb-4 text-white">Account Updates</h3>
                
                <div className="mb-6">
                  <div className="flex items-center space-x-3 mb-4">
                    <span className="px-3 py-1 bg-purple-500/20 text-purple-400 text-sm font-medium rounded">
                      WS
                    </span>
                    <code className="text-slate-300 font-mono">/ws/accounts</code>
                  </div>
                  
                  <p className="text-slate-300 mb-4">
                    WebSocket endpoint for real-time account updates.
                  </p>
                </div>

                <div className="mb-6">
                  <h4 className="text-lg font-semibold mb-3 text-white">Message Format</h4>
                  <div className="bg-slate-900 rounded-lg p-4 overflow-x-auto">
                    <pre className="text-sm text-slate-300">
{`{
  "type": "account_update",
  "pubkey": "pubkey123...",
  "lamports": 1000000000,
  "timestamp": "2024-03-21T12:00:00Z"
}`}
                    </pre>
                  </div>
                </div>
              </div>
            </section>

            {/* Error Responses */}
            <section className="mb-12">
              <h2 className="text-3xl font-bold mb-6 text-white">Error Responses</h2>
              
              <p className="text-slate-300 mb-6">
                All endpoints may return the following error responses:
              </p>

              <div className="space-y-6">
                <div className="glass rounded-xl p-6">
                  <h3 className="text-xl font-semibold mb-3 text-red-400">400 Bad Request</h3>
                  <div className="bg-slate-900 rounded-lg p-4">
                    <pre className="text-sm text-slate-300">
{`{
  "error": "Invalid request parameters",
  "details": "Detailed error message"
}`}
                    </pre>
                  </div>
                </div>

                <div className="glass rounded-xl p-6">
                  <h3 className="text-xl font-semibold mb-3 text-red-400">404 Not Found</h3>
                  <div className="bg-slate-900 rounded-lg p-4">
                    <pre className="text-sm text-slate-300">
{`{
  "error": "Resource not found",
  "details": "The requested resource does not exist"
}`}
                    </pre>
                  </div>
                </div>

                <div className="glass rounded-xl p-6">
                  <h3 className="text-xl font-semibold mb-3 text-red-400">500 Internal Server Error</h3>
                  <div className="bg-slate-900 rounded-lg p-4">
                    <pre className="text-sm text-slate-300">
{`{
  "error": "Internal server error",
  "details": "An unexpected error occurred"
}`}
                    </pre>
                  </div>
                </div>
              </div>
            </section>

            {/* Rate Limiting */}
            <section className="mb-12">
              <h2 className="text-3xl font-bold mb-6 text-white">Rate Limiting</h2>
              
              <div className="glass rounded-xl p-6">
                <p className="text-slate-300 mb-4">
                  The API implements rate limiting to ensure fair usage. Current limits:
                </p>
                
                <ul className="space-y-2 text-slate-300 mb-6">
                  <li>• 100 requests per minute per IP address</li>
                  <li>• 1000 requests per hour per IP address</li>
                </ul>

                <p className="text-slate-300 mb-4">
                  Rate limit headers are included in all responses:
                </p>
                
                <div className="bg-slate-900 rounded-lg p-4 font-mono text-sm">
                  <code className="text-green-400">
                    X-RateLimit-Limit: 100<br />
                    X-RateLimit-Remaining: 95<br />
                    X-RateLimit-Reset: 1616323200
                  </code>
                </div>
              </div>
            </section>

            {/* SDK Examples */}
            <section id="sdk" className="mb-12">
              <h2 className="text-3xl font-bold mb-6 text-white">SDK Examples</h2>
              
              <div className="space-y-6">
                <div>
                  <h3 className="text-xl font-semibold mb-4 text-white">TypeScript Example</h3>
                  <div className="bg-slate-900 rounded-lg p-6 overflow-x-auto">
                    <pre className="text-sm">
                      <code className="language-typescript text-slate-300">{`import { WindClient } from '@windnetwork/sdk';

const client = new WindClient('http://test-may-us-01.windnetwork.ai:3000/api');

// Get latest block
const latestBlock = await client.getLatestBlock();

// Get account information
const accountInfo = await client.getAccount('pubkey123...');

// Subscribe to account updates
client.subscribeToAccounts((update) => {
  console.log('Account update:', update);
});`}</code>
                    </pre>
                  </div>
                </div>

                <div>
                  <h3 className="text-xl font-semibold mb-4 text-white">Python Example</h3>
                  <div className="bg-slate-900 rounded-lg p-6 overflow-x-auto">
                    <pre className="text-sm">
                      <code className="language-python text-slate-300">{`import requests

BASE_URL = 'http://test-may-us-01.windnetwork.ai:3000/api'

# Get latest block
response = requests.get(f'{BASE_URL}/blocks/latest')
latest_block = response.json()

# Get account information
response = requests.get(f'{BASE_URL}/account/pubkey123...')
account_info = response.json()`}</code>
                    </pre>
                  </div>
                </div>
              </div>
            </section>

            {/* Support */}
            <section className="mb-12">
              <div className="glass-strong rounded-2xl p-8">
                <h2 className="text-2xl font-bold mb-4 text-white">Support</h2>
                <p className="text-slate-300 mb-6">
                  For API support or to report issues, please contact:
                </p>
                <div className="space-y-3">
                  <div className="flex items-center space-x-3">
                    <span className="text-slate-400">📧</span>
                    <a href="mailto:vivek@windnetwork.ai" className="text-blue-400 hover:text-blue-300">
                      vivek@windnetwork.ai
                    </a>
                  </div>
                  <div className="flex items-center space-x-3">
                    <span className="text-slate-400">💬</span>
                    <a href="https://t.me/wind_network" target="_blank" rel="noopener noreferrer" className="text-blue-400 hover:text-blue-300">
                      Telegram Group (@wind_network)
                    </a>
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