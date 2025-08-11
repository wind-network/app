'use client'

import { motion } from 'framer-motion'
import { DashboardLayout } from '@/components/DashboardLayout'
import { useState } from 'react'

export default function BillingPage() {
  const [, setSelectedPlan] = useState('developer')

  const plans = [
    {
      id: 'free',
      name: 'Free Tier',
      price: '$0',
      period: 'forever',
      features: [
        '100 MB storage',
        '1,000 API calls/day',
        'Basic indexing',
        'Community support',
      ],
      current: false,
    },
    {
      id: 'developer',
      name: 'Developer',
      price: '$24.99',
      period: 'per month',
      features: [
        '10 GB storage',
        '100,000 API calls/day',
        'Advanced indexing',
        'Priority support',
        'Custom endpoints',
      ],
      current: true,
      popular: true,
    },
    {
      id: 'team',
      name: 'Team',
      price: '$99.99',
      period: 'per month',
      features: [
        '100 GB storage',
        'Unlimited API calls',
        'Real-time indexing',
        'Dedicated support',
        'Team collaboration',
        'SLA guarantee',
      ],
      current: false,
    },
    {
      id: 'enterprise',
      name: 'Enterprise',
      price: 'Custom',
      period: 'contact sales',
      features: [
        'Unlimited storage',
        'Unlimited API calls',
        'Custom infrastructure',
        'White-glove support',
        'Custom contracts',
        'On-premise option',
      ],
      current: false,
    },
  ]

  const invoices = [
    { id: 1, date: 'Jan 1, 2025', amount: '$24.99', status: 'paid', invoice: '#INV-2025-001' },
    { id: 2, date: 'Dec 1, 2024', amount: '$24.99', status: 'paid', invoice: '#INV-2024-012' },
    { id: 3, date: 'Nov 1, 2024', amount: '$24.99', status: 'paid', invoice: '#INV-2024-011' },
    { id: 4, date: 'Oct 1, 2024', amount: '$24.99', status: 'paid', invoice: '#INV-2024-010' },
  ]

  const usage = [
    { metric: 'Storage Used', current: '2.5 GB', limit: '10 GB', percentage: 25 },
    { metric: 'API Calls Today', current: '45,234', limit: '100,000', percentage: 45.2 },
    { metric: 'Bandwidth Used', current: '12.5 GB', limit: '50 GB', percentage: 25 },
    { metric: 'Active Nodes', current: '3', limit: '5', percentage: 60 },
  ]

  return (
    <DashboardLayout>
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-white mb-2">Billing & Usage</h1>
          <p className="text-slate-400">Manage your subscription and monitor usage</p>
        </div>

        {/* Current Plan Overview */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="glass rounded-2xl p-8 mb-8"
        >
          <div className="flex items-center justify-between mb-6">
            <div>
              <h2 className="text-xl font-semibold text-white mb-2">Current Plan</h2>
              <div className="flex items-center space-x-3">
                <span className="text-2xl font-bold text-white">Developer Plan</span>
                <span className="px-3 py-1 bg-green-500/20 text-green-400 rounded-full text-sm">Active</span>
              </div>
            </div>
            <div className="text-right">
              <p className="text-3xl font-bold text-white">$24.99</p>
              <p className="text-slate-400">per month</p>
              <p className="text-sm text-slate-400 mt-2">Next billing: Feb 1, 2025</p>
            </div>
          </div>

          <div className="flex space-x-4">
            <button className="btn-primary">Upgrade Plan</button>
            <button className="px-6 py-3 rounded-lg bg-slate-800 border border-slate-700 text-white hover:bg-slate-700 transition-all duration-200">
              Cancel Subscription
            </button>
          </div>
        </motion.div>

        {/* Usage Overview */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="glass rounded-2xl p-8 mb-8"
        >
          <h2 className="text-xl font-semibold text-white mb-6">Current Usage</h2>
          
          <div className="grid md:grid-cols-2 gap-6">
            {usage.map((item) => (
              <div key={item.metric}>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-slate-300">{item.metric}</span>
                  <span className="text-sm text-slate-400">{item.current} / {item.limit}</span>
                </div>
                <div className="w-full h-3 bg-slate-700 rounded-full overflow-hidden">
                  <div 
                    className={`h-full rounded-full transition-all duration-500 ${
                      item.percentage > 80 ? 'bg-red-500' :
                      item.percentage > 60 ? 'bg-orange-500' :
                      'bg-green-500'
                    }`}
                    style={{ width: `${item.percentage}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Available Plans */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="mb-8"
        >
          <h2 className="text-xl font-semibold text-white mb-6">Available Plans</h2>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {plans.map((plan) => (
              <motion.div
                key={plan.id}
                whileHover={{ scale: 1.02 }}
                className={`glass rounded-2xl p-6 relative ${
                  plan.current ? 'ring-2 ring-blue-500' : ''
                }`}
              >
                {plan.popular && (
                  <span className="absolute -top-3 left-1/2 transform -translate-x-1/2 px-3 py-1 bg-blue-500 text-white text-xs rounded-full">
                    Most Popular
                  </span>
                )}
                
                <h3 className="text-lg font-semibold text-white mb-2">{plan.name}</h3>
                <div className="mb-6">
                  <span className="text-3xl font-bold text-white">{plan.price}</span>
                  <span className="text-slate-400 text-sm ml-2">/{plan.period}</span>
                </div>
                
                <ul className="space-y-3 mb-6">
                  {plan.features.map((feature) => (
                    <li key={feature} className="flex items-start">
                      <svg className="w-5 h-5 text-green-400 mr-2 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                      <span className="text-sm text-slate-300">{feature}</span>
                    </li>
                  ))}
                </ul>
                
                <button
                  onClick={() => setSelectedPlan(plan.id)}
                  className={`w-full py-3 rounded-lg font-medium transition-all duration-200 ${
                    plan.current
                      ? 'bg-slate-700 text-slate-300 cursor-default'
                      : 'bg-blue-500 text-white hover:bg-blue-600'
                  }`}
                  disabled={plan.current}
                >
                  {plan.current ? 'Current Plan' : plan.id === 'enterprise' ? 'Contact Sales' : 'Select Plan'}
                </button>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Billing History */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="glass rounded-2xl p-8"
        >
          <h2 className="text-xl font-semibold text-white mb-6">Billing History</h2>
          
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="text-left text-sm text-slate-400 border-b border-slate-800">
                  <th className="pb-4">Date</th>
                  <th className="pb-4">Invoice</th>
                  <th className="pb-4">Amount</th>
                  <th className="pb-4">Status</th>
                  <th className="pb-4">Actions</th>
                </tr>
              </thead>
              <tbody>
                {invoices.map((invoice) => (
                  <tr key={invoice.id} className="border-b border-slate-800/50">
                    <td className="py-4 text-white">{invoice.date}</td>
                    <td className="py-4 text-slate-300">{invoice.invoice}</td>
                    <td className="py-4 text-white font-medium">{invoice.amount}</td>
                    <td className="py-4">
                      <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-500/20 text-green-400">
                        {invoice.status}
                      </span>
                    </td>
                    <td className="py-4">
                      <button className="text-blue-400 hover:text-blue-300 text-sm">
                        Download PDF
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          
          <div className="mt-6 flex items-center justify-between">
            <button className="text-blue-400 hover:text-blue-300">
              View all invoices →
            </button>
            <div className="flex items-center space-x-4">
              <button className="p-2 text-slate-400 hover:text-white">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                </svg>
              </button>
              <span className="text-sm text-slate-400">Page 1 of 3</span>
              <button className="p-2 text-slate-400 hover:text-white">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </button>
            </div>
          </div>
        </motion.div>

        {/* Payment Method */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="glass rounded-2xl p-8 mt-8"
        >
          <h2 className="text-xl font-semibold text-white mb-6">Payment Method</h2>
          
          <div className="flex items-center justify-between p-4 rounded-lg bg-slate-800/50">
            <div className="flex items-center space-x-4">
              <div className="w-16 h-10 bg-gradient-to-r from-blue-600 to-blue-800 rounded-md flex items-center justify-center">
                <span className="text-white font-bold text-xs">VISA</span>
              </div>
              <div>
                <p className="text-white font-medium">•••• •••• •••• 4242</p>
                <p className="text-sm text-slate-400">Expires 12/2025</p>
              </div>
            </div>
            <button className="px-4 py-2 bg-slate-700 text-white rounded-lg hover:bg-slate-600 transition-colors">
              Update
            </button>
          </div>
          
          <button className="mt-4 text-blue-400 hover:text-blue-300 text-sm">
            Add payment method →
          </button>
        </motion.div>
      </div>
    </DashboardLayout>
  )
}