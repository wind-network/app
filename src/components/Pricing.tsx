'use client'

import { motion } from 'framer-motion'
import { useState, Fragment } from 'react'
import { useIntersectionObserver } from '@/hooks/useIntersectionObserver'

export function Pricing() {
  const [ref, isVisible] = useIntersectionObserver({ threshold: 0.2 })
  const [billingPeriod, setBillingPeriod] = useState<'monthly' | 'yearly'>('monthly')

  const plans = [
    {
      id: 'developer',
      name: 'Validator',
      description: 'For Solana validators',
      price: { monthly: 0, yearly: 0 },
      popular: false,
      features: [
        'Unlimited RPC calls',
        'Historical data access',
        'Priority indexing',
        'WebSocket subscriptions',
        'Community support',
        'Basic analytics'
      ],
      limits: 'Free for active validators',
      cta: 'Start Free',
      gradient: 'from-slate-600 to-slate-500'
    },
    {
      id: 'growth',
      name: 'Developer',
      description: 'For Solana developers',
      price: { monthly: 49, yearly: 490 },
      popular: true,
      features: [
        '10M RPC calls/month',
        'Account history queries',
        'Transaction indexing',
        'GraphQL API',
        'Program event streams',
        'Advanced analytics',
        'Email support',
        'Custom endpoints'
      ],
      limits: '10M RPC calls • Pay-as-you-go after',
      cta: 'Start 14-day Trial',
      gradient: 'from-blue-600 to-cyan-600'
    },
    {
      id: 'scale',
      name: 'Scale',
      description: 'For DeFi and NFT platforms',
      price: { monthly: 299, yearly: 2990 },
      popular: false,
      features: [
        '100M RPC calls/month',
        'Sub-50ms latency',
        'Priority support',
        'Custom indexing',
        'Private endpoints',
        '99.99% SLA',
        'Dedicated account manager',
        'Multi-region deployment'
      ],
      limits: '100M RPC calls • Custom rates after',
      cta: 'Contact Sales',
      gradient: 'from-purple-600 to-pink-600'
    },
    {
      id: 'enterprise',
      name: 'Enterprise',
      description: 'For mission-critical workloads',
      price: { monthly: 'Custom', yearly: 'Custom' },
      popular: false,
      features: [
        'Unlimited storage',
        'Unlimited API calls',
        'Dedicated infrastructure',
        'White-label options',
        'Custom SLAs',
        '24/7 phone support',
        'On-premise deployment',
        'Custom compliance'
      ],
      limits: 'Custom pricing based on usage',
      cta: 'Contact Sales',
      gradient: 'from-emerald-600 to-green-600'
    }
  ]

  const comparisonFeatures = [
    {
      category: 'Storage & Bandwidth',
      features: [
        { name: 'RPC Calls', dev: 'Unlimited*', growth: '10M/month', scale: '100M/month', enterprise: 'Unlimited' },
        { name: 'Historical Data', dev: 'Full chain', growth: 'Full chain', scale: 'Full chain', enterprise: 'Full chain' },
        { name: 'Query Latency', dev: '< 100ms', growth: '< 75ms', scale: '< 50ms', enterprise: '< 25ms' },
      ]
    },
    {
      category: 'Features',
      features: [
        { name: 'Solana RPC API', dev: '✓', growth: '✓', scale: '✓', enterprise: '✓' },
        { name: 'GraphQL API', dev: '✓', growth: '✓', scale: '✓', enterprise: '✓' },
        { name: 'WebSocket Streams', dev: '✓', growth: '✓', scale: '✓', enterprise: '✓' },
        { name: 'Custom Indexing', dev: '✗', growth: '✗', scale: '✓', enterprise: '✓' },
        { name: 'Private Endpoints', dev: '✗', growth: '✗', scale: '✓', enterprise: '✓' },
      ]
    },
    {
      category: 'Support',
      features: [
        { name: 'Community Support', dev: '✓', growth: '✓', scale: '✓', enterprise: '✓' },
        { name: 'Email Support', dev: '✗', growth: '✓', scale: '✓', enterprise: '✓' },
        { name: 'Priority Support', dev: '✗', growth: '✗', scale: '✓', enterprise: '✓' },
        { name: 'Phone Support', dev: '✗', growth: '✗', scale: '✗', enterprise: '✓' },
        { name: 'SLA', dev: '✗', growth: '✗', scale: '99.9%', enterprise: '99.99%' },
      ]
    }
  ]

  return (
    <section id="pricing" ref={ref} className="py-32 relative overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 gradient-blue-subtle opacity-20"></div>
      
      <div className="relative z-10 max-w-7xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isVisible ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-5xl lg:text-6xl font-bold mb-6">
            Simple, Transparent{' '}
            <span className="text-gradient">Pricing</span>
          </h2>
          <p className="text-xl text-slate-300 max-w-3xl mx-auto mb-12">
            No hidden fees, no egress charges, no bullshit. 
            Pay only for what you use with transparent pricing.
          </p>

          {/* Billing Toggle */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={isVisible ? { opacity: 1, scale: 1 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="inline-flex items-center glass rounded-2xl p-2"
          >
            <button
              onClick={() => setBillingPeriod('monthly')}
              className={`px-6 py-3 rounded-xl font-semibold transition-all duration-300 ${
                billingPeriod === 'monthly'
                  ? 'gradient-blue text-white shadow-lg'
                  : 'text-slate-300 hover:text-white'
              }`}
            >
              Monthly
            </button>
            <button
              onClick={() => setBillingPeriod('yearly')}
              className={`px-6 py-3 rounded-xl font-semibold transition-all duration-300 relative ${
                billingPeriod === 'yearly'
                  ? 'gradient-blue text-white shadow-lg'
                  : 'text-slate-300 hover:text-white'
              }`}
            >
              Yearly
              <span className="absolute -top-2 -right-2 bg-green-500 text-white text-xs px-2 py-1 rounded-full">
                Save 15%
              </span>
            </button>
          </motion.div>
        </motion.div>

        {/* Pricing Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-20">
          {plans.map((plan, index) => (
            <motion.div
              key={plan.id}
              initial={{ opacity: 0, y: 40 }}
              animate={isVisible ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className={`relative glass rounded-3xl p-8 ${
                plan.popular ? 'ring-2 ring-blue-500 scale-105' : ''
              } hover:glass-strong transition-all duration-300`}
            >
              {plan.popular && (
                <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                  <span className="bg-gradient-to-r from-blue-500 to-cyan-500 text-white px-6 py-2 rounded-full text-sm font-semibold">
                    Most Popular
                  </span>
                </div>
              )}

              <div className="text-center mb-8">
                <h3 className="text-2xl font-bold text-white mb-2">{plan.name}</h3>
                <p className="text-slate-400 mb-6">{plan.description}</p>
                
                <div className="mb-4">
                  {typeof plan.price[billingPeriod] === 'number' ? (
                    <>
                      <span className="text-4xl font-bold text-gradient">
                        ${plan.price[billingPeriod]}
                      </span>
                      <span className="text-slate-400">/{billingPeriod === 'monthly' ? 'month' : 'year'}</span>
                    </>
                  ) : (
                    <span className="text-4xl font-bold text-gradient">
                      {plan.price[billingPeriod]}
                    </span>
                  )}
                </div>
                
                <p className="text-sm text-slate-400">{plan.limits}</p>
              </div>

              <div className="space-y-4 mb-8">
                {plan.features.map((feature, idx) => (
                  <div key={idx} className="flex items-center">
                    <svg className="w-5 h-5 text-green-400 mr-3 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    <span className="text-slate-300 text-sm">{feature}</span>
                  </div>
                ))}
              </div>

              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className={`w-full py-4 rounded-2xl font-semibold transition-all duration-300 ${
                  plan.popular
                    ? 'btn-primary'
                    : 'btn-secondary'
                }`}
              >
                {plan.cta}
              </motion.button>
            </motion.div>
          ))}
        </div>

        {/* Comparison Table */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={isVisible ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="glass rounded-3xl p-8 overflow-x-auto"
        >
          <h3 className="text-3xl font-bold text-center mb-12 text-gradient">
            Feature Comparison
          </h3>
          
          <div className="min-w-full">
            <table className="w-full">
              <thead>
                <tr className="border-b border-slate-700">
                  <th className="text-left py-4 px-6 text-slate-300 font-semibold">Features</th>
                  <th className="text-center py-4 px-6 text-slate-300 font-semibold">Developer</th>
                  <th className="text-center py-4 px-6 text-blue-400 font-semibold">Growth</th>
                  <th className="text-center py-4 px-6 text-slate-300 font-semibold">Scale</th>
                  <th className="text-center py-4 px-6 text-slate-300 font-semibold">Enterprise</th>
                </tr>
              </thead>
              <tbody>
                {comparisonFeatures.map((category) => (
                  <Fragment key={category.category}>
                    <tr>
                      <td colSpan={5} className="py-6 px-6">
                        <h4 className="text-lg font-semibold text-white">{category.category}</h4>
                      </td>
                    </tr>
                    {category.features.map((feature) => (
                      <tr key={feature.name} className="border-b border-slate-700/50">
                        <td className="py-3 px-6 text-slate-300">{feature.name}</td>
                        <td className="py-3 px-6 text-center text-slate-400">{feature.dev}</td>
                        <td className="py-3 px-6 text-center text-blue-400 font-semibold">{feature.growth}</td>
                        <td className="py-3 px-6 text-center text-slate-400">{feature.scale}</td>
                        <td className="py-3 px-6 text-center text-slate-400">{feature.enterprise}</td>
                      </tr>
                    ))}
                  </Fragment>
                ))}
              </tbody>
            </table>
          </div>
        </motion.div>

        {/* FAQ Section */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={isVisible ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.8 }}
          className="mt-20 text-center"
        >
          <h3 className="text-3xl font-bold mb-8 text-gradient">
            Frequently Asked Questions
          </h3>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-6xl mx-auto">
            {[
              {
                q: "What happens when I exceed my plan limits?",
                a: "You'll be charged for additional usage at competitive rates. No service interruption, just pay for what you use."
              },
              {
                q: "Can I change plans anytime?",
                a: "Yes, upgrade or downgrade anytime. Changes take effect immediately with prorated billing."
              },
              {
                q: "Do you offer custom enterprise pricing?",
                a: "Yes, we offer custom pricing for enterprise customers with specific requirements and volume discounts."
              },
              {
                q: "What about data transfer costs?",
                a: "All data transfer is free. No egress fees, no bandwidth charges. Upload and download as much as you need."
              }
            ].map((faq, idx) => (
              <div key={idx} className="glass rounded-2xl p-6 text-left">
                <h4 className="text-lg font-semibold text-white mb-3">{faq.q}</h4>
                <p className="text-slate-300">{faq.a}</p>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  )
}