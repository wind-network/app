'use client'

import { motion } from 'framer-motion'
import { useIntersectionObserver } from '@/hooks/useIntersectionObserver'

export function CTA() {
  const [ref, isVisible] = useIntersectionObserver({ threshold: 0.3 })

  return (
    <section id="get-started" ref={ref} className="py-32 relative overflow-hidden">
      {/* Background Effects */}
      <div className="absolute inset-0">
        <motion.div
          animate={{
            scale: [1, 1.2, 1],
            rotate: [0, 180, 360],
            opacity: [0.1, 0.2, 0.1]
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            ease: "linear"
          }}
          className="absolute top-0 left-0 w-full h-full bg-gradient-to-r from-blue-600/10 via-cyan-500/10 to-purple-600/10 blur-3xl"
        />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isVisible ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center"
        >
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={isVisible ? { scale: 1, opacity: 1 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="glass rounded-full py-32 px-12 max-w-5xl mx-auto relative"
          >
            <h2 className="text-5xl lg:text-7xl font-bold mb-8 leading-tight">
              Ready to Build{' '}
              <span className="text-gradient block lg:inline">
                Something Amazing?
              </span>
            </h2>
            
            <p className="text-xl lg:text-2xl text-slate-300 mb-12 max-w-3xl mx-auto leading-relaxed">
              Join thousands of developers who&apos;ve already made the switch to Wind Space. 
              Start building with the world&apos;s most efficient storage service today.
            </p>

            {/* CTAs */}
            <div className="flex flex-col sm:flex-row items-center justify-center gap-6 mb-12">
              <motion.a
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                href="/dashboard"
                className="btn-primary group text-xl px-12 py-6"
              >
                Start Building Free
                <motion.svg
                  whileHover={{ x: 5 }}
                  className="w-6 h-6 ml-3 transition-transform"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                </motion.svg>
              </motion.a>
              
              <motion.a
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                href="/docs"
                className="btn-secondary group text-xl px-12 py-6"
              >
                <svg className="w-6 h-6 mr-3" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M9 4.804A7.968 7.968 0 005.5 4c-1.255 0-2.443.29-3.5.804v10A7.969 7.969 0 015.5 14c1.669 0 3.218.51 4.5 1.385A7.962 7.962 0 0114.5 14c1.255 0 2.443.29 3.5.804v-10A7.968 7.968 0 0014.5 4c-1.669 0-3.218.51-4.5 1.385V4.804zM19 14c0 5.524-4.477 10-10 10S-1 19.524-1 14 3.477 4 9 4s10 4.476 10 10z" clipRule="evenodd" />
                </svg>
                View Documentation
              </motion.a>
            </div>

            {/* Quick Start Stats */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={isVisible ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, delay: 0.6 }}
              className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-2xl mx-auto"
            >
              <div className="text-center">
                <div className="text-2xl font-bold text-green-400 mb-1">5 min</div>
                <div className="text-slate-400 text-sm">Setup Time</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-blue-400 mb-1">1GB</div>
                <div className="text-slate-400 text-sm">Free Storage</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-purple-400 mb-1">100K</div>
                <div className="text-slate-400 text-sm">Free API Calls</div>
              </div>
            </motion.div>

            {/* Floating Elements */}
            <motion.div
              animate={{
                y: [-10, 10, -10],
                rotate: [0, 5, 0],
              }}
              transition={{
                duration: 6,
                repeat: Infinity,
                ease: "easeInOut"
              }}
              className="absolute top-12 left-12 w-12 h-12 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-xl opacity-20 blur-sm"
            />
            
            <motion.div
              animate={{
                y: [10, -10, 10],
                rotate: [0, -5, 0],
              }}
              transition={{
                duration: 5,
                repeat: Infinity,
                ease: "easeInOut",
                delay: 1
              }}
              className="absolute top-20 right-16 w-8 h-8 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full opacity-30 blur-sm"
            />
            
            <motion.div
              animate={{
                y: [-5, 15, -5],
                rotate: [0, 10, 0],
              }}
              transition={{
                duration: 7,
                repeat: Infinity,
                ease: "easeInOut",
                delay: 2
              }}
              className="absolute bottom-16 left-20 w-6 h-6 bg-gradient-to-r from-green-500 to-emerald-500 rounded-lg opacity-25 blur-sm"
            />
          </motion.div>
        </motion.div>

        {/* Trust Indicators */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={isVisible ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.8 }}
          className="mt-20 text-center"
        >
          <p className="text-slate-400 mb-8">Trusted by developers at</p>
          <div className="flex flex-wrap justify-center items-center gap-12 opacity-50">
            {/* Placeholder for company logos */}
            {['Solana Labs', 'Metaplex', 'Jupiter', 'Magic Eden', 'Phantom'].map((company, idx) => (
              <motion.div
                key={company}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={isVisible ? { opacity: 0.7, scale: 1 } : {}}
                transition={{ duration: 0.6, delay: 1 + idx * 0.1 }}
                whileHover={{ opacity: 1, scale: 1.05 }}
                className="text-slate-500 font-semibold text-lg hover:text-slate-300 transition-all duration-300 cursor-pointer"
              >
                {company}
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Developer Resources */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={isVisible ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 1 }}
          className="mt-20 grid grid-cols-1 md:grid-cols-3 gap-8"
        >
          {[
            {
              title: 'Quick Start Guide',
              description: 'Get up and running in under 5 minutes',
              icon: '🚀',
              link: '/docs'
            },
            {
              title: 'API Reference',
              description: 'Complete documentation for all endpoints',
              icon: '📚',
              link: '/docs/api-reference'
            },
            {
              title: 'SDK Examples',
              description: 'Code samples in TypeScript, Rust, and more',
              icon: '💻',
              link: '/docs/installation'
            }
          ].map((resource) => (
            <motion.a
              key={resource.title}
              href={resource.link}
              whileHover={{ scale: 1.05, y: -5 }}
              whileTap={{ scale: 0.95 }}
              className="glass rounded-2xl p-6 text-center hover:glass-strong transition-all duration-300 group"
            >
              <div className="text-4xl mb-4">{resource.icon}</div>
              <h3 className="text-xl font-semibold text-white mb-2 group-hover:text-blue-300 transition-colors">
                {resource.title}
              </h3>
              <p className="text-slate-400 group-hover:text-slate-300 transition-colors">
                {resource.description}
              </p>
            </motion.a>
          ))}
        </motion.div>
      </div>
    </section>
  )
}