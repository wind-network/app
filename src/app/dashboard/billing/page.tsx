'use client'

import { motion } from 'framer-motion'
import { DashboardLayout } from '@/components/DashboardLayout'
import { useState, useEffect } from 'react'
import { useSession } from 'next-auth/react'
import { CheckCircle2, AlertCircle, Clock, CreditCard } from 'lucide-react'

interface Plan {
  id: string
  name: string
  displayName: string
  description?: string
  priceMonthly: string
  priceYearly: string
  features: string[]
  limits: {
    storage: string | number
    api_calls: number
    indexing_jobs: number
  }
  isActive: boolean
}

export default function BillingPage() {
  const { data: session } = useSession()
  const [plans, setPlans] = useState<Plan[]>([])
  const [loading, setLoading] = useState(true)
  const [selectedPlan, setSelectedPlan] = useState<string>('')

  useEffect(() => {
    fetchPlans()
  }, [])

  const fetchPlans = async () => {
    try {
      const response = await fetch('/api/plans')
      const data = await response.json()
      setPlans(data)
      setLoading(false)
    } catch (error) {
      console.error('Failed to fetch plans:', error)
      // Use fallback plans when API is not available
      setPlans([
        {
          id: '1',
          name: 'early_risers',
          displayName: 'Early Risers',
          description: 'Free plan for early adopters',
          priceMonthly: '0',
          priceYearly: '0',
          features: ['Unlimited searches', 'Basic indexing (100 URLs/day)', 'Community support', 'Access to public network', 'Basic analytics'],
          limits: { storage: '10GB', api_calls: 10000, indexing_jobs: 100 },
          isActive: true
        },
        {
          id: '2',
          name: 'starter',
          displayName: 'Starter',
          description: 'Perfect for individuals and small projects',
          priceMonthly: '9.99',
          priceYearly: '99',
          features: ['Everything in Early Risers', 'Advanced indexing (1000 URLs/day)', 'Priority support', 'Custom search filters', 'Advanced analytics', 'API access'],
          limits: { storage: '100GB', api_calls: 100000, indexing_jobs: 1000 },
          isActive: true
        },
        {
          id: '3',
          name: 'professional',
          displayName: 'Professional',
          description: 'For teams and growing businesses',
          priceMonthly: '29.99',
          priceYearly: '299',
          features: ['Everything in Starter', 'Unlimited indexing', 'Dedicated support', 'Team collaboration', 'Custom integrations', 'Advanced API features', 'Priority processing'],
          limits: { storage: '1TB', api_calls: 1000000, indexing_jobs: -1 },
          isActive: true
        },
        {
          id: '4',
          name: 'enterprise',
          displayName: 'Enterprise',
          description: 'Custom solutions for large organizations',
          priceMonthly: null,
          priceYearly: null,
          features: ['Everything in Professional', 'Unlimited everything', '24/7 dedicated support', 'Custom deployment options', 'SLA guarantee', 'Advanced security features', 'Custom development'],
          limits: { storage: -1, api_calls: -1, indexing_jobs: -1 },
          isActive: true
        }
      ])
      setLoading(false)
    }
  }

  const currentPlan = session?.user?.plan

  const usage = [
    { metric: 'Storage Used', current: '2.5 GB', limit: currentPlan?.limits?.storage === -1 ? 'Unlimited' : `${currentPlan?.limits?.storage || '10GB'}`, percentage: 25 },
    { metric: 'API Calls Today', current: '45,234', limit: currentPlan?.limits?.api_calls === -1 ? 'Unlimited' : `${currentPlan?.limits?.api_calls?.toLocaleString() || '10,000'}`, percentage: 45.2 },
    { metric: 'Indexing Jobs', current: '23', limit: currentPlan?.limits?.indexing_jobs === -1 ? 'Unlimited' : `${currentPlan?.limits?.indexing_jobs || '100'}`, percentage: 23 },
    { metric: 'Active Nodes', current: '3', limit: '5', percentage: 60 },
  ]

  const invoices = [
    { id: 1, date: 'Jan 1, 2025', amount: '$0.00', status: 'Free Plan', invoice: '#INV-2025-001' },
  ]

  if (loading) {
    return (
      <DashboardLayout>
        <div className="flex items-center justify-center h-full">
          <div className="text-white">Loading plans...</div>
        </div>
      </DashboardLayout>
    )
  }

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
                <span className="text-2xl font-bold text-white">
                  {currentPlan?.displayName || 'Early Risers'}
                </span>
                <span className="px-3 py-1 bg-green-500/20 text-green-400 rounded-full text-sm">Active</span>
                {currentPlan?.name === 'early_risers' && (
                  <span className="px-3 py-1 bg-blue-500/20 text-blue-400 rounded-full text-sm flex items-center gap-1">
                    <Clock className="w-3 h-3" />
                    Early Adopter
                  </span>
                )}
              </div>
            </div>
            <div className="text-right">
              <p className="text-3xl font-bold text-white">$0</p>
              <p className="text-slate-400">forever</p>
              <p className="text-sm text-slate-500 mt-2">Thank you for being an early adopter!</p>
            </div>
          </div>

          <div className="p-4 bg-blue-500/10 border border-blue-500/30 rounded-lg mb-6">
            <div className="flex items-start space-x-3">
              <AlertCircle className="w-5 h-5 text-blue-400 mt-0.5" />
              <div>
                <p className="text-blue-400 font-medium">Payment options coming soon!</p>
                <p className="text-sm text-slate-400 mt-1">
                  Other plans and payment options will be available soon. Until then, enjoy the Early Risers plan with all its features completely free!
                </p>
              </div>
            </div>
          </div>

          <div className="flex space-x-4">
            <button className="btn-primary opacity-50 cursor-not-allowed" disabled>
              Upgrade Plan (Coming Soon)
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
            {plans.map((plan) => {
              const isCurrentPlan = currentPlan?.name === plan.name
              const isEarlyRisers = plan.name === 'early_risers'
              const price = plan.priceMonthly === '0' ? 'Free' : plan.priceMonthly === null ? 'Custom' : `$${plan.priceMonthly}`
              
              return (
                <motion.div
                  key={plan.id}
                  whileHover={{ scale: 1.02 }}
                  className={`glass rounded-2xl p-6 relative ${
                    isCurrentPlan ? 'ring-2 ring-blue-500' : ''
                  }`}
                >
                  {isEarlyRisers && (
                    <span className="absolute -top-3 left-1/2 transform -translate-x-1/2 px-3 py-1 bg-blue-500 text-white text-xs rounded-full">
                      Current Plan
                    </span>
                  )}
                  {plan.name === 'starter' && (
                    <span className="absolute -top-3 left-1/2 transform -translate-x-1/2 px-3 py-1 bg-green-500 text-white text-xs rounded-full">
                      Most Popular
                    </span>
                  )}
                  
                  <h3 className="text-lg font-semibold text-white mb-2">{plan.displayName}</h3>
                  <div className="mb-6">
                    <span className="text-3xl font-bold text-white">{price}</span>
                    {plan.priceMonthly !== null && plan.priceMonthly !== '0' && (
                      <span className="text-slate-400 text-sm ml-2">/month</span>
                    )}
                    {plan.name === 'enterprise' && (
                      <span className="text-slate-400 text-sm ml-2">contact sales</span>
                    )}
                  </div>
                  
                  {plan.description && (
                    <p className="text-sm text-slate-400 mb-4">{plan.description}</p>
                  )}
                  
                  <ul className="space-y-3 mb-6">
                    {(plan.features as string[])?.slice(0, 5).map((feature) => (
                      <li key={feature} className="flex items-start">
                        <CheckCircle2 className="w-5 h-5 text-green-400 mr-2 flex-shrink-0" />
                        <span className="text-sm text-slate-300">{feature}</span>
                      </li>
                    ))}
                  </ul>
                  
                  <button
                    onClick={() => setSelectedPlan(plan.id)}
                    className={`w-full py-3 rounded-lg font-medium transition-all duration-200 ${
                      isCurrentPlan
                        ? 'bg-slate-700 text-slate-300 cursor-default'
                        : isEarlyRisers
                        ? 'bg-blue-500 text-white'
                        : 'bg-slate-700 text-slate-400 cursor-not-allowed opacity-50'
                    }`}
                    disabled={!isEarlyRisers}
                  >
                    {isCurrentPlan ? 'Current Plan' : 
                     plan.name === 'enterprise' ? 'Coming Soon' : 
                     isEarlyRisers ? 'Your Plan' : 'Coming Soon'}
                  </button>
                </motion.div>
              )
            })}
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
                      <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-500/20 text-blue-400">
                        {invoice.status}
                      </span>
                    </td>
                    <td className="py-4">
                      <span className="text-slate-500 text-sm">N/A</span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          
          <div className="mt-6">
            <p className="text-sm text-slate-400">
              Billing history will be available once payment options are enabled.
            </p>
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
          
          <div className="flex items-center justify-center p-12 rounded-lg bg-slate-800/30 border-2 border-dashed border-slate-700">
            <div className="text-center">
              <CreditCard className="w-12 h-12 text-slate-500 mx-auto mb-4" />
              <p className="text-slate-400 mb-2">No payment method required</p>
              <p className="text-sm text-slate-500">
                Payment methods will be available when premium plans launch
              </p>
            </div>
          </div>
        </motion.div>
      </div>
    </DashboardLayout>
  )
}