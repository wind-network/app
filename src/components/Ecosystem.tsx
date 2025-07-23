'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import { useIntersectionObserver } from '@/hooks/useIntersectionObserver'

export function Ecosystem() {
  const [ref, isVisible] = useIntersectionObserver({ threshold: 0.2 })

  const products = [
    {
      name: 'Wind Network',
      description: 'Decentralized indexing infrastructure for Solana',
      icon: '🌐',
      link: '/docs',
      gradient: 'from-blue-500 to-cyan-500',
      features: ['Real-time indexing', 'P2P Network', 'High availability']
    },
    {
      name: 'Wind Space',
      description: 'Enterprise-grade storage platform powered by Lava Lakes',
      icon: '💾',
      link: '/space',
      gradient: 'from-purple-500 to-pink-500',
      features: ['11 9s durability', '92% cheaper', 'Solana-native']
    },
    {
      name: 'DropSpace',
      description: 'File sharing for 2050 - no Big Tech, just freedom',
      icon: '🚀',
      link: '/dropspace',
      gradient: 'from-orange-500 to-amber-500',
      features: ['E2E encryption', 'P2P transfers', 'Cross-planet ready']
    }
  ]

  return (
    <section id="ecosystem" ref={ref} className="py-32 px-6 relative overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950"></div>
        <motion.div
          animate={{
            rotate: 360,
          }}
          transition={{
            duration: 100,
            repeat: Infinity,
            ease: "linear"
          }}
          className="absolute -top-1/2 -right-1/2 w-[150%] h-[150%] opacity-10"
          style={{
            background: 'radial-gradient(circle, transparent 40%, #3b82f6 45%, transparent 50%)',
          }}
        />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isVisible ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-20"
        >
          <h2 className="text-5xl font-bold mb-6">
            The Wind Network <span className="text-gradient">Ecosystem</span>
          </h2>
          <p className="text-xl text-slate-300 max-w-3xl mx-auto">
            A complete suite of decentralized infrastructure products working together 
            to make world data accessible to all
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-3 gap-8">
          {products.map((product, index) => (
            <motion.div
              key={product.name}
              initial={{ opacity: 0, y: 30 }}
              animate={isVisible ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: index * 0.2 }}
            >
              <Link href={product.link}>
                <motion.div
                  whileHover={{ y: -10, scale: 1.02 }}
                  className="relative h-full p-8 rounded-3xl glass overflow-hidden group cursor-pointer"
                >
                  {/* Gradient overlay */}
                  <div className={`absolute inset-0 bg-gradient-to-br ${product.gradient} opacity-0 group-hover:opacity-10 transition-opacity duration-500`}></div>
                  
                  {/* Content */}
                  <div className="relative z-10">
                    <div className="text-5xl mb-6">{product.icon}</div>
                    <h3 className="text-2xl font-bold mb-3 text-white group-hover:text-gradient transition-all duration-300">
                      {product.name}
                    </h3>
                    <p className="text-slate-300 mb-6">
                      {product.description}
                    </p>
                    
                    <div className="space-y-2 mb-6">
                      {product.features.map((feature, idx) => (
                        <div key={idx} className="flex items-center space-x-2">
                          <span className="w-5 h-5 rounded-full bg-gradient-to-r from-blue-500 to-cyan-500 flex items-center justify-center">
                            <span className="text-white text-xs">✓</span>
                          </span>
                          <span className="text-sm text-slate-300">{feature}</span>
                        </div>
                      ))}
                    </div>
                    
                    <div className="flex items-center text-blue-400 group-hover:text-blue-300 transition-colors">
                      <span className="font-medium">Learn more</span>
                      <svg className="w-5 h-5 ml-2 group-hover:translate-x-2 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                      </svg>
                    </div>
                  </div>
                </motion.div>
              </Link>
            </motion.div>
          ))}
        </div>

        {/* Integration diagram */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={isVisible ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="mt-20 text-center"
        >
          <div className="glass-strong rounded-3xl p-12 max-w-4xl mx-auto">
            <h3 className="text-2xl font-bold mb-6 text-white">
              Seamlessly Integrated
            </h3>
            <p className="text-lg text-slate-300 mb-8">
              All products work together through a unified dashboard, shared infrastructure, 
              and single billing system. Start with one, scale with all.
            </p>
            <Link href="/dashboard">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="btn-primary"
              >
                Access Dashboard
                <svg className="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                </svg>
              </motion.button>
            </Link>
          </div>
        </motion.div>
      </div>
    </section>
  )
}