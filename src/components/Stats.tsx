'use client'

import { motion } from 'framer-motion'
import { useEffect, useState } from 'react'
import { useIntersectionObserver } from '@/hooks/useIntersectionObserver'

interface CountUpProps {
  end: number
  duration?: number
  suffix?: string
  prefix?: string
}

function CountUp({ end, duration = 2000, suffix = '', prefix = '' }: CountUpProps) {
  const [count, setCount] = useState(0)
  const [started] = useState(false)

  useEffect(() => {
    if (!started) return

    let startTime: number
    const animate = (timestamp: number) => {
      if (!startTime) startTime = timestamp
      const progress = Math.min((timestamp - startTime) / duration, 1)
      
      const easeOutQuart = 1 - Math.pow(1 - progress, 4)
      setCount(Math.floor(easeOutQuart * end))
      
      if (progress < 1) {
        requestAnimationFrame(animate)
      }
    }
    
    requestAnimationFrame(animate)
  }, [started, end, duration])

  return (
    <span>
      {prefix}{count.toLocaleString()}{suffix}
    </span>
  )
}

export function Stats() {
  const [ref, isVisible] = useIntersectionObserver({ threshold: 0.3 })
  const [animationStarted, setAnimationStarted] = useState(false)

  useEffect(() => {
    if (isVisible && !animationStarted) {
      setAnimationStarted(true)
    }
  }, [isVisible, animationStarted])

  const stats = [
    {
      id: 'cost-savings',
      value: 92,
      suffix: '%',
      label: 'Cost Reduction vs AWS S3',
      description: 'Save thousands on storage costs',
      icon: '💰',
      color: 'from-green-400 to-emerald-600'
    },
    {
      id: 'performance',
      value: 5,
      suffix: 'x',
      label: 'Faster Query Performance',
      description: '300ms vs 1,500ms average latency',
      icon: '⚡',
      color: 'from-yellow-400 to-orange-600'
    },
    {
      id: 'uptime',
      value: 99.99,
      suffix: '%',
      label: 'Uptime Guarantee',
      description: 'Enterprise-grade reliability',
      icon: '🛡️',
      color: 'from-blue-400 to-blue-600'
    },
    {
      id: 'data-processed',
      value: 4,
      suffix: 'PB',
      label: 'Data Processed Daily',
      description: 'Proven at massive scale',
      icon: '📊',
      color: 'from-purple-400 to-purple-600'
    }
  ]

  return (
    <section ref={ref} className="py-32 relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 gradient-blue-subtle opacity-30"></div>
      <div className="absolute inset-0">
        <motion.div
          animate={{
            scale: [1, 1.1, 1],
            opacity: [0.3, 0.1, 0.3],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: "easeInOut"
          }}
          className="absolute top-0 left-1/4 w-96 h-96 rounded-full bg-blue-500/10 blur-3xl"
        />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isVisible ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-20"
        >
          <h2 className="text-5xl lg:text-6xl font-bold mb-6">
            Built for{' '}
            <span className="text-gradient">Real Performance</span>
          </h2>
          <p className="text-xl text-slate-300 max-w-3xl mx-auto">
            No bullshit marketing metrics. These are real numbers from production workloads 
            serving millions of requests daily.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {stats.map((stat, index) => (
            <motion.div
              key={stat.id}
              initial={{ opacity: 0, y: 40, scale: 0.9 }}
              animate={isVisible ? { opacity: 1, y: 0, scale: 1 } : {}}
              transition={{ duration: 0.8, delay: index * 0.1 }}
              className="glass rounded-3xl p-8 text-center group hover:glass-strong transition-all duration-300"
            >
              <motion.div
                whileHover={{ scale: 1.1, rotate: 10 }}
                className="text-4xl mb-4"
              >
                {stat.icon}
              </motion.div>
              
              <div className={`text-4xl lg:text-5xl font-bold mb-3 bg-gradient-to-r ${stat.color} bg-clip-text text-transparent`}>
                {animationStarted ? (
                  <CountUp 
                    end={stat.value} 
                    suffix={stat.suffix}
                    duration={2000 + index * 200}
                  />
                ) : (
                  `${stat.value}${stat.suffix}`
                )}
              </div>
              
              <h3 className="text-lg font-semibold text-white mb-2">
                {stat.label}
              </h3>
              
              <p className="text-slate-400 text-sm leading-relaxed">
                {stat.description}
              </p>

              <motion.div
                className={`mt-4 h-1 bg-gradient-to-r ${stat.color} rounded-full scale-x-0 group-hover:scale-x-100 transition-all duration-500`}
              />
            </motion.div>
          ))}
        </div>

        {/* Comparison Chart Preview */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={isVisible ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="mt-20 glass rounded-3xl p-8 text-center"
        >
          <h3 className="text-2xl font-bold mb-8 text-gradient">
            Cost Comparison: 20TB Storage (6 Months)
          </h3>
          
          <div className="flex items-end justify-center space-x-12 h-40">
            <div className="flex flex-col items-center">
              <motion.div
                initial={{ height: 0 }}
                animate={isVisible ? { height: '100%' } : {}}
                transition={{ duration: 1.5, delay: 1 }}
                className="w-16 bg-gradient-to-t from-green-500 to-green-400 rounded-t-lg flex items-end justify-center pb-2"
                style={{ maxHeight: '60px' }}
              >
                <span className="text-xs font-bold text-white">$213</span>
              </motion.div>
              <span className="mt-2 font-semibold text-green-400">Wind Space</span>
            </div>
            
            <div className="flex flex-col items-center">
              <motion.div
                initial={{ height: 0 }}
                animate={isVisible ? { height: '100%' } : {}}
                transition={{ duration: 1.5, delay: 1.2 }}
                className="w-16 bg-gradient-to-t from-red-500 to-red-400 rounded-t-lg flex items-start justify-center pt-2"
                style={{ height: '160px' }}
              >
                <span className="text-xs font-bold text-white">$2,760</span>
              </motion.div>
              <span className="mt-2 font-semibold text-red-400">AWS S3</span>
            </div>
          </div>
          
          <motion.p
            initial={{ opacity: 0 }}
            animate={isVisible ? { opacity: 1 } : {}}
            transition={{ delay: 2 }}
            className="mt-6 text-lg font-semibold text-green-400"
          >
            92% Cheaper • 5x Faster Performance
          </motion.p>
        </motion.div>
      </div>
    </section>
  )
}