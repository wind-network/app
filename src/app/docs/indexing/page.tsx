'use client'

import { motion } from 'framer-motion'
import { Navbar } from '@/components/Navbar'
import { Footer } from '@/components/Footer'
import { DocsLayout } from '@/components/DocsLayout'

export default function IndexingGuidePage() {
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
                Indexing & Retrieving Data
              </h1>
              <p className="text-xl text-slate-300">
                Learn how to index Solana blockchain data and retrieve it efficiently using Wind Network
              </p>
            </div>

            {/* Introduction */}
            <section className="mb-12">
              <p className="text-slate-300 leading-relaxed">
                This guide demonstrates how to index Solana blockchain data and retrieve it efficiently 
                using the wIndexer network. Our decentralized indexing solution makes it simple to access 
                blockchain data without relying on centralized RPC providers.
              </p>
            </section>

            {/* Prerequisites */}
            <section className="mb-12">
              <h2 className="text-3xl font-bold mb-6 text-white">Prerequisites</h2>
              
              <div className="glass rounded-xl p-6">
                <ul className="space-y-3 text-slate-300">
                  <li className="flex items-start space-x-3">
                    <span className="text-green-400 mt-1">✓</span>
                    <span>Basic knowledge of Solana blockchain</span>
                  </li>
                  <li className="flex items-start space-x-3">
                    <span className="text-green-400 mt-1">✓</span>
                    <span>Node.js environment (for SDK examples)</span>
                  </li>
                  <li className="flex items-start space-x-3">
                    <span className="text-green-400 mt-1">✓</span>
                    <span>Access to wIndexer network at test-may-us-01.windnetwork.ai</span>
                  </li>
                </ul>
              </div>
            </section>

            {/* Using the REST API */}
            <section className="mb-12">
              <h2 className="text-3xl font-bold mb-6 text-white">Using the REST API</h2>
              
              {/* Checking Network Status */}
              <div className="mb-8">
                <h3 className="text-xl font-semibold mb-4 text-white">Checking the Network Status</h3>
                <p className="text-slate-300 mb-4">
                  Before indexing or retrieving data, ensure the wIndexer network is operational:
                </p>
                <div className="bg-slate-900 rounded-lg p-4 font-mono text-sm mb-4">
                  <code className="text-green-400">
                    curl http://test-may-us-01.windnetwork.ai/api/health
                  </code>
                </div>
                
                <p className="text-slate-300 mb-2">Expected response:</p>
                <div className="bg-slate-900 rounded-lg p-4 font-mono text-sm">
                  <code className="text-blue-400">{`{
  "status": "ok",
  "uptime": 12345,
  "version": "0.1.0"
}`}</code>
                </div>
              </div>

              {/* Indexing Transactions */}
              <div className="mb-8">
                <h3 className="text-xl font-semibold mb-4 text-white">Indexing Transactions</h3>
                <p className="text-slate-300 mb-4">
                  When you submit transactions to the Solana network, Wind Network automatically 
                  indexes them. For example, after submitting a transaction, you can track its 
                  indexing status:
                </p>
                <div className="bg-slate-900 rounded-lg p-4 font-mono text-sm">
                  <code className="text-green-400">
                    # Replace with your transaction signature<br />
                    export SIGNATURE="your_transaction_signature"<br />
                    <br />
                    # Check if the transaction has been indexed<br />
                    curl http://test-may-us-01.windnetwork.ai/indexer1/api/transaction/$SIGNATURE
                  </code>
                </div>
              </div>

              {/* Retrieving Indexed Data */}
              <div className="mb-8">
                <h3 className="text-xl font-semibold mb-4 text-white">Retrieving Indexed Data</h3>
                <p className="text-slate-300 mb-4">
                  Once data is indexed, you can retrieve it through various endpoints:
                </p>

                <div className="space-y-6">
                  {/* Recent Blocks */}
                  <div className="glass rounded-lg p-6">
                    <h4 className="font-semibold text-white mb-3">Recent Blocks</h4>
                    <div className="bg-slate-900 rounded-lg p-4 font-mono text-sm">
                      <code className="text-green-400">
                        curl http://test-may-us-01.windnetwork.ai/indexer1/api/blocks/recent
                      </code>
                    </div>
                  </div>

                  {/* Account Information */}
                  <div className="glass rounded-lg p-6">
                    <h4 className="font-semibold text-white mb-3">Account Information</h4>
                    <div className="bg-slate-900 rounded-lg p-4 font-mono text-sm">
                      <code className="text-green-400">
                        # Replace with the account public key<br />
                        export ACCOUNT="account_public_key"<br />
                        <br />
                        curl http://test-may-us-01.windnetwork.ai/indexer1/api/account/$ACCOUNT
                      </code>
                    </div>
                  </div>

                  {/* Program Accounts */}
                  <div className="glass rounded-lg p-6">
                    <h4 className="font-semibold text-white mb-3">Program Accounts</h4>
                    <div className="bg-slate-900 rounded-lg p-4 font-mono text-sm">
                      <code className="text-green-400">
                        # Replace with program ID<br />
                        export PROGRAM_ID="program_id"<br />
                        <br />
                        curl http://test-may-us-01.windnetwork.ai/indexer1/api/program/$PROGRAM_ID/accounts
                      </code>
                    </div>
                  </div>
                </div>
              </div>
            </section>

            {/* Advanced Indexing */}
            <section className="mb-12">
              <h2 className="text-3xl font-bold mb-6 text-white">Advanced Indexing Patterns</h2>
              
              <div className="space-y-8">
                {/* Real-time Indexing */}
                <div className="glass rounded-xl p-6">
                  <h3 className="text-xl font-semibold mb-4 text-white">Real-time Indexing</h3>
                  <p className="text-slate-300 mb-4">
                    Use WebSocket connections to receive real-time updates as data is indexed:
                  </p>
                  <div className="bg-slate-900 rounded-lg p-6 overflow-x-auto">
                    <pre className="text-sm">
                      <code className="language-javascript text-slate-300">{`const ws = new WebSocket('ws://test-may-us-01.windnetwork.ai/ws/accounts');

ws.on('message', (data) => {
  const update = JSON.parse(data);
  console.log('Account updated:', update);
});

// Subscribe to specific accounts
ws.send(JSON.stringify({
  type: 'subscribe',
  accounts: ['account1...', 'account2...']
}));`}</code>
                    </pre>
                  </div>
                </div>

                {/* Batch Queries */}
                <div className="glass rounded-xl p-6">
                  <h3 className="text-xl font-semibold mb-4 text-white">Batch Queries</h3>
                  <p className="text-slate-300 mb-4">
                    Optimize performance by batching multiple queries:
                  </p>
                  <div className="bg-slate-900 rounded-lg p-6 overflow-x-auto">
                    <pre className="text-sm">
                      <code className="language-javascript text-slate-300">{`import { WindClient } from '@windnetwork/sdk';

const client = new WindClient('http://test-may-us-01.windnetwork.ai:3000/api');

// Batch account queries
const accounts = [
  'account1...',
  'account2...',
  'account3...'
];

const results = await client.getAccountsBatch(accounts);`}</code>
                    </pre>
                  </div>
                </div>

                {/* Historical Data */}
                <div className="glass rounded-xl p-6">
                  <h3 className="text-xl font-semibold mb-4 text-white">Historical Data Queries</h3>
                  <p className="text-slate-300 mb-4">
                    Query historical data using slot ranges:
                  </p>
                  <div className="bg-slate-900 rounded-lg p-6 overflow-x-auto">
                    <pre className="text-sm">
                      <code className="language-javascript text-slate-300">{`// Get account history between specific slots
const history = await client.getAccountHistory('account_pubkey', {
  startSlot: 150000000,
  endSlot: 151000000
});

// Get transactions in a time range
const transactions = await client.getTransactions({
  startTime: '2024-01-01T00:00:00Z',
  endTime: '2024-01-02T00:00:00Z',
  program: 'program_id'
});`}</code>
                    </pre>
                  </div>
                </div>
              </div>
            </section>

            {/* Best Practices */}
            <section className="mb-12">
              <h2 className="text-3xl font-bold mb-6 text-white">Best Practices</h2>
              
              <div className="glass-strong rounded-xl p-8">
                <div className="space-y-6">
                  <div className="flex items-start space-x-4">
                    <div className="flex-shrink-0 w-10 h-10 rounded-full bg-blue-500/20 flex items-center justify-center">
                      <span className="text-blue-400 font-semibold">1</span>
                    </div>
                    <div>
                      <h4 className="font-semibold text-white mb-2">Use Appropriate Storage Backend</h4>
                      <p className="text-slate-300">
                        Choose RocksDB for real-time queries, Parquet for analytics, 
                        and PostgreSQL for complex queries.
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start space-x-4">
                    <div className="flex-shrink-0 w-10 h-10 rounded-full bg-blue-500/20 flex items-center justify-center">
                      <span className="text-blue-400 font-semibold">2</span>
                    </div>
                    <div>
                      <h4 className="font-semibold text-white mb-2">Implement Caching</h4>
                      <p className="text-slate-300">
                        Cache frequently accessed data to reduce API calls and improve 
                        application performance.
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start space-x-4">
                    <div className="flex-shrink-0 w-10 h-10 rounded-full bg-blue-500/20 flex items-center justify-center">
                      <span className="text-blue-400 font-semibold">3</span>
                    </div>
                    <div>
                      <h4 className="font-semibold text-white mb-2">Handle Rate Limits</h4>
                      <p className="text-slate-300">
                        Implement exponential backoff and respect rate limit headers 
                        to ensure reliable access.
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start space-x-4">
                    <div className="flex-shrink-0 w-10 h-10 rounded-full bg-blue-500/20 flex items-center justify-center">
                      <span className="text-blue-400 font-semibold">4</span>
                    </div>
                    <div>
                      <h4 className="font-semibold text-white mb-2">Use WebSocket for Real-time Data</h4>
                      <p className="text-slate-300">
                        Instead of polling, use WebSocket connections for real-time 
                        updates to reduce latency and server load.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </section>

            {/* Example Application */}
            <section className="mb-12">
              <h2 className="text-3xl font-bold mb-6 text-white">Example: Token Balance Tracker</h2>
              
              <p className="text-slate-300 mb-6">
                Here's a complete example of a token balance tracker using Wind Network:
              </p>

              <div className="bg-slate-900 rounded-lg p-6 overflow-x-auto">
                <pre className="text-sm">
                  <code className="language-javascript text-slate-300">{`import { WindClient } from '@windnetwork/sdk';
import { Connection, PublicKey } from '@solana/web3.js';

class TokenBalanceTracker {
  constructor() {
    this.client = new WindClient('http://test-may-us-01.windnetwork.ai:3000/api');
    this.subscriptions = new Map();
  }

  async trackWallet(walletAddress) {
    // Get initial token balances
    const tokens = await this.client.getAccountTokens(walletAddress);
    console.log('Initial tokens:', tokens);

    // Subscribe to real-time updates
    const ws = this.client.subscribeToAccount(walletAddress, (update) => {
      console.log('Balance update:', update);
      this.handleBalanceUpdate(walletAddress, update);
    });

    this.subscriptions.set(walletAddress, ws);
  }

  handleBalanceUpdate(wallet, update) {
    // Process balance updates
    if (update.type === 'token_balance_change') {
      console.log(\`Token \${update.mint} balance changed to \${update.amount}\`);
      // Update UI or trigger notifications
    }
  }

  async getHistoricalBalances(wallet, days = 7) {
    const endTime = new Date();
    const startTime = new Date(endTime - days * 24 * 60 * 60 * 1000);

    return await this.client.getAccountHistory(wallet, {
      startTime: startTime.toISOString(),
      endTime: endTime.toISOString(),
      dataType: 'token_balances'
    });
  }

  stopTracking(wallet) {
    const ws = this.subscriptions.get(wallet);
    if (ws) {
      ws.close();
      this.subscriptions.delete(wallet);
    }
  }
}

// Usage
const tracker = new TokenBalanceTracker();
await tracker.trackWallet('YourWalletAddress...');`}</code>
                </pre>
              </div>
            </section>

            {/* Troubleshooting */}
            <section className="mb-12">
              <h2 className="text-3xl font-bold mb-6 text-white">Troubleshooting</h2>
              
              <div className="space-y-6">
                <div className="glass rounded-lg p-6">
                  <h4 className="font-semibold text-white mb-3">Data Not Appearing</h4>
                  <p className="text-slate-300">
                    If indexed data doesn't appear immediately, check:
                  </p>
                  <ul className="mt-3 space-y-2 text-sm text-slate-300">
                    <li>• Network status using the health endpoint</li>
                    <li>• Transaction confirmation on Solana explorer</li>
                    <li>• Allow 1-2 seconds for indexing to complete</li>
                  </ul>
                </div>

                <div className="glass rounded-lg p-6">
                  <h4 className="font-semibold text-white mb-3">Rate Limit Errors</h4>
                  <p className="text-slate-300">
                    If you encounter rate limit errors:
                  </p>
                  <ul className="mt-3 space-y-2 text-sm text-slate-300">
                    <li>• Implement exponential backoff</li>
                    <li>• Cache responses when possible</li>
                    <li>• Use batch queries instead of individual requests</li>
                  </ul>
                </div>

                <div className="glass rounded-lg p-6">
                  <h4 className="font-semibold text-white mb-3">WebSocket Connection Issues</h4>
                  <p className="text-slate-300">
                    For WebSocket connection problems:
                  </p>
                  <ul className="mt-3 space-y-2 text-sm text-slate-300">
                    <li>• Check firewall settings</li>
                    <li>• Implement reconnection logic</li>
                    <li>• Monitor connection health with ping/pong</li>
                  </ul>
                </div>
              </div>
            </section>

            {/* Next Steps */}
            <section className="mb-12">
              <div className="glass-strong rounded-2xl p-8 text-center">
                <h2 className="text-2xl font-bold mb-4 text-white">Ready to Build?</h2>
                <p className="text-slate-300 mb-6">
                  Start building with Wind Network's powerful indexing capabilities
                </p>
                <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                  <a
                    href="https://github.com/wind-network/windexer/tree/main/examples"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn-primary"
                  >
                    View Examples
                  </a>
                  <a
                    href="https://t.me/wind_network"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn-secondary"
                  >
                    Join Community
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