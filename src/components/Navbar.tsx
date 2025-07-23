'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import Link from 'next/link'
import { useAuth } from '@/hooks/useAuth'

export function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const { authenticated, login, logout } = useAuth()

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50)
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const navItems = [
    { href: '/space', label: 'Wind Space', isPage: true },
    { href: '/dropspace', label: 'DropSpace', isPage: true },
    { href: '/docs', label: 'Documentation', isPage: true },
    { href: '/#ecosystem', label: 'Products' },
    { href: '/#features', label: 'Features' },
    { href: '/#pricing', label: 'Pricing' },
  ]

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      className={`fixed top-0 w-full z-50 transition-all duration-300 ${
        isScrolled ? 'glass py-4' : 'py-6'
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
        <Link href="/">
          <motion.div
            whileHover={{ scale: 1.05 }}
            className="flex items-center space-x-3 cursor-pointer"
          >
            <div className="w-10 h-10 rounded-xl gradient-blue flex items-center justify-center animate-glow">
              <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M3 4a1 1 0 011-1h3a1 1 0 011 1v3a1 1 0 01-1 1H4a1 1 0 01-1-1V4zm2 2V5h1v1H5zM3 13a1 1 0 011-1h3a1 1 0 011 1v3a1 1 0 01-1 1H4a1 1 0 01-1-1v-3zm2 2v-1h1v1H5zM13 4a1 1 0 011-1h3a1 1 0 011 1v3a1 1 0 01-1 1h-3a1 1 0 01-1-1V4zm2 2V5h1v1h-1z" clipRule="evenodd" />
              </svg>
            </div>
            <span className="text-2xl font-bold text-gradient">Wind Network</span>
          </motion.div>
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden lg:flex items-center space-x-8">
          {navItems.map((item) => (
            item.isPage ? (
              <Link key={item.href} href={item.href}>
                <motion.span
                  whileHover={{ y: -2 }}
                  className="text-slate-300 hover:text-white transition-colors duration-200 font-medium cursor-pointer"
                >
                  {item.label}
                </motion.span>
              </Link>
            ) : (
              <motion.a
                key={item.href}
                href={item.href}
                whileHover={{ y: -2 }}
                className="text-slate-300 hover:text-white transition-colors duration-200 font-medium"
              >
                {item.label}
              </motion.a>
            )
          ))}
        </div>

        {/* CTA Buttons */}
        <div className="hidden lg:flex items-center space-x-4">
          {authenticated ? (
            <>
              <Link href="/dashboard">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="btn-secondary"
                >
                  Dashboard
                </motion.button>
              </Link>
              <motion.button
                onClick={() => logout()}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="text-slate-300 hover:text-white"
              >
                Logout
              </motion.button>
            </>
          ) : (
            <motion.button
              onClick={() => login()}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="btn-primary"
            >
              Login
            </motion.button>
          )}
        </div>

        {/* Mobile Menu Button */}
        <button
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          className="lg:hidden p-2 text-slate-300 hover:text-white"
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            {isMobileMenuOpen ? (
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            ) : (
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            )}
          </svg>
        </button>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="lg:hidden glass-strong mt-4 mx-6 rounded-2xl p-6"
        >
          <div className="flex flex-col space-y-4">
            {navItems.map((item) => (
              item.isPage ? (
                <Link 
                  key={item.href} 
                  href={item.href}
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  <span className="block text-slate-300 hover:text-white transition-colors duration-200 font-medium py-2">
                    {item.label}
                  </span>
                </Link>
              ) : (
                <a
                  key={item.href}
                  href={item.href}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="text-slate-300 hover:text-white transition-colors duration-200 font-medium py-2"
                >
                  {item.label}
                </a>
              )
            ))}
            <div className="pt-4 border-t border-slate-600">
              {authenticated ? (
                <div className="space-y-3">
                  <Link
                    href="/dashboard"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    <span className="btn-secondary w-full text-center block">
                      Dashboard
                    </span>
                  </Link>
                  <button
                    onClick={() => {
                      logout()
                      setIsMobileMenuOpen(false)
                    }}
                    className="w-full text-center text-slate-300 hover:text-white py-2"
                  >
                    Logout
                  </button>
                </div>
              ) : (
                <button
                  onClick={() => {
                    login()
                    setIsMobileMenuOpen(false)
                  }}
                  className="btn-primary w-full text-center"
                >
                  Login
                </button>
              )}
            </div>
          </div>
        </motion.div>
      )}
    </motion.nav>
  )
}