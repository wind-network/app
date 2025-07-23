'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import Link from 'next/link'
import { usePathname } from 'next/navigation'

interface DocSection {
  title: string
  href: string
  children?: DocSection[]
}

const docSections: DocSection[] = [
  {
    title: 'Getting Started',
    href: '/docs',
    children: [
      { title: 'Overview', href: '/docs' },
      { title: 'Quick Start', href: '/docs/quickstart' },
    ]
  },
  {
    title: 'Core Concepts',
    href: '/docs/architecture',
    children: [
      { title: 'Architecture', href: '/docs/architecture' },
      { title: 'Data Flow', href: '/docs/architecture#data-flow' },
      { title: 'Storage Options', href: '/docs/architecture#storage-options' },
    ]
  },
  {
    title: 'Guides',
    href: '/docs/installation',
    children: [
      { title: 'Installation', href: '/docs/installation' },
      { title: 'Configuration', href: '/docs/installation#configuration' },
      { title: 'Indexing Data', href: '/docs/indexing' },
    ]
  },
  {
    title: 'API Reference',
    href: '/docs/api',
    children: [
      { title: 'REST API', href: '/docs/api' },
      { title: 'WebSocket API', href: '/docs/api#websocket-endpoints' },
      { title: 'SDK Reference', href: '/docs/api#sdk' },
    ]
  },
  {
    title: 'Advanced',
    href: '/docs/advanced',
    children: [
      { title: 'Jito MEV Integration', href: '/docs/advanced/jito' },
      { title: 'Running a Node', href: '/docs/advanced/node' },
      { title: 'Performance Tuning', href: '/docs/advanced/performance' },
    ]
  }
]

export function DocsLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname()
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [expandedSections, setExpandedSections] = useState<string[]>(['Getting Started'])

  const toggleSection = (title: string) => {
    setExpandedSections(prev => 
      prev.includes(title) 
        ? prev.filter(t => t !== title)
        : [...prev, title]
    )
  }

  const isActive = (href: string) => {
    if (href === '/docs' && pathname === '/docs') return true
    if (href !== '/docs' && pathname?.startsWith(href)) return true
    return false
  }

  return (
    <div className="min-h-screen flex">
      {/* Sidebar */}
      <aside className={`fixed lg:sticky top-20 left-0 z-40 w-64 h-[calc(100vh-5rem)] overflow-y-auto transition-transform duration-300 ${
        mobileMenuOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'
      }`}>
        <nav className="p-6 bg-slate-900/50 backdrop-blur-xl h-full border-r border-slate-800">
          {/* Mobile close button */}
          <button
            onClick={() => setMobileMenuOpen(false)}
            className="lg:hidden absolute top-4 right-4 p-2 text-slate-400 hover:text-white"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>

          <div className="space-y-6">
            {docSections.map((section) => (
              <div key={section.href}>
                <button
                  onClick={() => toggleSection(section.title)}
                  className="flex items-center justify-between w-full text-left"
                >
                  <h3 className="text-sm font-semibold text-slate-300 uppercase tracking-wider">
                    {section.title}
                  </h3>
                  {section.children && (
                    <motion.svg
                      animate={{ rotate: expandedSections.includes(section.title) ? 90 : 0 }}
                      className="w-4 h-4 text-slate-400"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </motion.svg>
                  )}
                </button>
                
                {section.children && expandedSections.includes(section.title) && (
                  <motion.ul
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    exit={{ opacity: 0, height: 0 }}
                    className="mt-2 space-y-1"
                  >
                    {section.children.map((child) => (
                      <li key={child.href}>
                        <Link
                          href={child.href}
                          onClick={() => setMobileMenuOpen(false)}
                          className={`block px-3 py-2 text-sm rounded-lg transition-all duration-200 ${
                            isActive(child.href)
                              ? 'bg-blue-500/20 text-blue-400 border-l-2 border-blue-400'
                              : 'text-slate-400 hover:text-white hover:bg-slate-800/50'
                          }`}
                        >
                          {child.title}
                        </Link>
                      </li>
                    ))}
                  </motion.ul>
                )}
              </div>
            ))}
          </div>

          {/* Resources */}
          <div className="mt-12 pt-8 border-t border-slate-800">
            <h3 className="text-sm font-semibold text-slate-300 uppercase tracking-wider mb-4">
              Resources
            </h3>
            <ul className="space-y-2">
              <li>
                <a
                  href="https://github.com/wind-network/windexer"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center text-sm text-slate-400 hover:text-white transition-colors"
                >
                  <svg className="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
                  </svg>
                  GitHub
                </a>
              </li>
              <li>
                <a
                  href="https://t.me/wind_network"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center text-sm text-slate-400 hover:text-white transition-colors"
                >
                  <svg className="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M11.944 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 12 0a12 12 0 0 0-.056 0zm4.962 7.224c.1-.002.321.023.465.14a.506.506 0 0 1 .171.325c.016.093.036.306.02.472-.18 1.898-.962 6.502-1.36 8.627-.168.9-.499 1.201-.82 1.23-.696.065-1.225-.46-1.9-.902-1.056-.693-1.653-1.124-2.678-1.8-1.185-.78-.417-1.21.258-1.91.177-.184 3.247-2.977 3.307-3.23.007-.032.014-.15-.056-.212s-.174-.041-.249-.024c-.106.024-1.793 1.14-5.061 3.345-.48.33-.913.49-1.302.48-.428-.008-1.252-.241-1.865-.44-.752-.245-1.349-.374-1.297-.789.027-.216.325-.437.893-.663 3.498-1.524 5.83-2.529 6.998-3.014 3.332-1.386 4.025-1.627 4.476-1.635z"/>
                  </svg>
                  Telegram
                </a>
              </li>
              <li>
                <a
                  href="mailto:vivek@windnetwork.ai"
                  className="flex items-center text-sm text-slate-400 hover:text-white transition-colors"
                >
                  <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                  Support
                </a>
              </li>
            </ul>
          </div>
        </nav>
      </aside>

      {/* Mobile menu button */}
      <button
        onClick={() => setMobileMenuOpen(true)}
        className="lg:hidden fixed bottom-6 right-6 z-50 p-4 bg-blue-500 text-white rounded-full shadow-lg"
      >
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
        </svg>
      </button>

      {/* Main content */}
      <main className="flex-1 lg:ml-0">
        <div className="max-w-4xl mx-auto px-6 py-12">
          {children}
        </div>
      </main>
    </div>
  )
}