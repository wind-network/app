/**
 * Simple class name combiner (alternative to clsx + tailwind-merge)
 */
export function cn(...classes: (string | undefined | null | false)[]): string {
    return classes.filter(Boolean).join(' ')
  }
  
  /**
   * Formats numbers with appropriate suffixes (K, M, B, T)
   */
  export function formatNumber(num: number, decimals: number = 1): string {
    if (num === 0) return '0'
    
    const k = 1000
    const sizes = ['', 'K', 'M', 'B', 'T']
    const i = Math.floor(Math.log(Math.abs(num)) / Math.log(k))
    
    if (i === 0) return num.toString()
    
    const formattedNum = (num / Math.pow(k, i)).toFixed(decimals)
    return `${formattedNum}${sizes[i]}`
  }
  
  /**
   * Formats file sizes in bytes to human readable format
   */
  export function formatBytes(bytes: number, decimals: number = 2): string {
    if (bytes === 0) return '0 Bytes'
    
    const k = 1024
    const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB', 'PB']
    const i = Math.floor(Math.log(bytes) / Math.log(k))
    
    return `${parseFloat((bytes / Math.pow(k, i)).toFixed(decimals))} ${sizes[i]}`
  }
  
  /**
   * Formats currency values
   */
  export function formatCurrency(
    amount: number,
    currency: string = 'USD',
    locale: string = 'en-US'
  ): string {
    return new Intl.NumberFormat(locale, {
      style: 'currency',
      currency,
      minimumFractionDigits: 0,
      maximumFractionDigits: 2
    }).format(amount)
  }
  
  /**
   * Formats percentages
   */
  export function formatPercentage(value: number, decimals: number = 1): string {
    return `${value.toFixed(decimals)}%`
  }
  
  /**
   * Debounce function to limit the rate of function calls
   */
  export function debounce<T extends (...args: unknown[]) => unknown>(
    func: T,
    wait: number
  ): (...args: Parameters<T>) => void {
    let timeout: NodeJS.Timeout
    
    return (...args: Parameters<T>) => {
      clearTimeout(timeout)
      timeout = setTimeout(() => func(...args), wait)
    }
  }
  
  /**
   * Throttle function to limit function calls to once per specified time
   */
  export function throttle<T extends (...args: unknown[]) => unknown>(
    func: T,
    limit: number
  ): (...args: Parameters<T>) => void {
    let inThrottle: boolean
    
    return (...args: Parameters<T>) => {
      if (!inThrottle) {
        func(...args)
        inThrottle = true
        setTimeout(() => (inThrottle = false), limit)
      }
    }
  }
  
  /**
   * Generates a random ID string
   */
  export function generateId(length: number = 8): string {
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'
    let result = ''
    
    for (let i = 0; i < length; i++) {
      result += chars.charAt(Math.floor(Math.random() * chars.length))
    }
    
    return result
  }
  
  /**
   * Validates email addresses using regex
   */
  export function isValidEmail(email: string): boolean {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    return emailRegex.test(email)
  }
  
  /**
   * Validates URL format
   */
  export function isValidUrl(url: string): boolean {
    try {
      new URL(url)
      return true
    } catch {
      return false
    }
  }
  
  /**
   * Capitalizes the first letter of a string
   */
  export function capitalize(str: string): string {
    return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase()
  }
  
  /**
   * Converts string to slug format
   */
  export function slugify(str: string): string {
    return str
      .toLowerCase()
      .trim()
      .replace(/[^\w\s-]/g, '')
      .replace(/[\s_-]+/g, '-')
      .replace(/^-+|-+$/g, '')
  }
  
  /**
   * Truncates text to specified length with ellipsis
   */
  export function truncate(text: string, length: number): string {
    if (text.length <= length) return text
    return text.slice(0, length).trim() + '...'
  }
  
  /**
   * Deep clones an object
   */
  export function deepClone<T>(obj: T): T {
    if (obj === null || typeof obj !== 'object') return obj
    if (obj instanceof Date) return new Date(obj.getTime()) as unknown as T
    if (obj instanceof Array) return obj.map(item => deepClone(item)) as unknown as T
    if (typeof obj === 'object') {
      const clonedObj = {} as { [key: string]: unknown }
      for (const key in obj) {
        if (obj.hasOwnProperty(key)) {
          clonedObj[key] = deepClone(obj[key])
        }
      }
      return clonedObj as T
    }
    return obj
  }
  
  /**
   * Removes empty values from an object
   */
  export function removeEmpty(obj: Record<string, unknown>): Record<string, unknown> {
    return Object.fromEntries(
      Object.entries(obj).filter(([, value]) => 
        value !== null && value !== undefined && value !== ''
      )
    )
  }
  
  /**
   * Gets a random item from an array
   */
  export function getRandomItem<T>(array: T[]): T {
    return array[Math.floor(Math.random() * array.length)]
  }
  
  /**
   * Shuffles an array using Fisher-Yates algorithm
   */
  export function shuffleArray<T>(array: T[]): T[] {
    const shuffled = [...array]
    for (let i = shuffled.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1))
      ;[shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]]
    }
    return shuffled
  }
  
  /**
   * Calculates the reading time for text
   */
  export function calculateReadingTime(text: string, wordsPerMinute: number = 200): number {
    const words = text.trim().split(/\s+/).length
    return Math.ceil(words / wordsPerMinute)
  }
  
  /**
   * Formats relative time (e.g., "2 minutes ago")
   */
  export function formatRelativeTime(date: Date): string {
    const now = new Date()
    const diffInSeconds = Math.floor((now.getTime() - date.getTime()) / 1000)
    
    const intervals = {
      year: 31536000,
      month: 2592000,
      week: 604800,
      day: 86400,
      hour: 3600,
      minute: 60,
      second: 1
    }
    
    for (const [unit, seconds] of Object.entries(intervals)) {
      const interval = Math.floor(diffInSeconds / seconds)
      if (interval >= 1) {
        return `${interval} ${unit}${interval > 1 ? 's' : ''} ago`
      }
    }
    
    return 'just now'
  }
  
  /**
   * Copies text to clipboard
   */
  export async function copyToClipboard(text: string): Promise<boolean> {
    try {
      await navigator.clipboard.writeText(text)
      return true
    } catch {
      // Fallback for older browsers
      const textArea = document.createElement('textarea')
      textArea.value = text
      textArea.style.position = 'fixed'
      textArea.style.left = '-999999px'
      textArea.style.top = '-999999px'
      document.body.appendChild(textArea)
      textArea.focus()
      textArea.select()
      
      try {
        document.execCommand('copy')
        textArea.remove()
        return true
      } catch {
        textArea.remove()
        return false
      }
    }
  }
  
  /**
   * Smooth scroll to element
   */
  export function scrollToElement(elementId: string, offset: number = 0): void {
    const element = document.getElementById(elementId)
    if (element) {
      const y = element.getBoundingClientRect().top + window.pageYOffset - offset
      window.scrollTo({ top: y, behavior: 'smooth' })
    }
  }
  
  /**
   * Checks if user prefers dark mode
   */
  export function prefersDarkMode(): boolean {
    return window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches
  }
  
  /**
   * Gets device type based on screen width
   */
  export function getDeviceType(): 'mobile' | 'tablet' | 'desktop' {
    if (typeof window === 'undefined') return 'desktop'
    
    const width = window.innerWidth
    if (width < 768) return 'mobile'
    if (width < 1024) return 'tablet'
    return 'desktop'
  }
  
  /**
   * Formats date to local string
   */
  export function formatDate(
    date: Date,
    options: Intl.DateTimeFormatOptions = {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    }
  ): string {
    return date.toLocaleDateString('en-US', options)
  }
  
  /**
   * Checks if code is running on client side
   */
  export const isClient = typeof window !== 'undefined'
  
  /**
   * Safely runs code only on client side
   */
  export function clientOnly<T>(fn: () => T, fallback?: T): T | undefined {
    return isClient ? fn() : fallback
  }