// Animation types
export interface AnimationVariants {
    hidden: {
      opacity: number
      y?: number
      x?: number
      scale?: number
    }
    visible: {
      opacity: number
      y?: number
      x?: number
      scale?: number
      transition?: {
        duration?: number
        delay?: number
        ease?: string
      }
    }
  }
  
  // Component props
  export interface SectionProps {
    className?: string
    children?: React.ReactNode
  }
  
  export interface FeatureItem {
    id: string
    title: string
    description: string
    icon: React.ReactNode
    gradient: string
    delay: number
  }
  
  export interface StatItem {
    id: string
    value: number
    suffix: string
    label: string
    description: string
    icon: string
    color: string
  }
  
  export interface PricingPlan {
    id: string
    name: string
    description: string
    price: {
      monthly: number | string
      yearly: number | string
    }
    popular: boolean
    features: string[]
    limits: string
    cta: string
    gradient: string
  }
  
  export interface TechSpec {
    label: string
    value: string
    description: string
  }
  
  export interface FooterSection {
    title: string
    links: {
      name: string
      href: string
    }[]
  }
  
  export interface SocialLink {
    name: string
    href: string
    icon: React.ReactNode
  }
  
  // Navigation types
  export interface NavItem {
    href: string
    label: string
  }
  
  // Intersection Observer types
  export interface UseIntersectionObserverOptions {
    threshold?: number
    root?: Element | null
    rootMargin?: string
  }
  
  // Framer Motion types
  export interface MotionProps {
    initial?: Record<string, unknown>
    animate?: Record<string, unknown>
    exit?: Record<string, unknown>
    transition?: Record<string, unknown>
    variants?: Record<string, unknown>
    whileHover?: Record<string, unknown>
    whileTap?: Record<string, unknown>
    whileInView?: Record<string, unknown>
  }
  
  // API Response types (for future use)
  export interface ApiResponse<T = unknown> {
    success: boolean
    data?: T
    error?: string
    message?: string
  }
  
  export interface NewsletterSubscription {
    email: string
  }
  
  export interface ContactForm {
    name: string
    email: string
    company?: string
    message: string
    subject: string
  }
  
  // SEO types
  export interface SEOData {
    title: string
    description: string
    keywords: string[]
    image?: string
    url?: string
    type?: 'website' | 'article'
    siteName?: string
  }
  
  // Configuration types
  export interface SiteConfig {
    name: string
    description: string
    url: string
    ogImage: string
    links: {
      twitter: string
      github: string
      discord: string
      linkedin: string
    }
  }
  
  // Theme types
  export interface ThemeColors {
    primary: string
    secondary: string
    accent: string
    background: string
    foreground: string
    muted: string
  }
  
  // Performance types
  export interface PerformanceMetrics {
    fcp: number // First Contentful Paint
    lcp: number // Largest Contentful Paint
    fid: number // First Input Delay
    cls: number // Cumulative Layout Shift
    ttfb: number // Time to First Byte
  }
  
  // Error types
  export interface AppError {
    message: string
    code?: string | number
    stack?: string
    timestamp: Date
  }
  
  // Loading states
  export type LoadingState = 'idle' | 'loading' | 'success' | 'error'
  
  // Generic utility types
  export type Nullable<T> = T | null
  export type Optional<T> = T | undefined
  export type DeepPartial<T> = {
    [P in keyof T]?: T[P] extends object ? DeepPartial<T[P]> : T[P]
  }
  
  // Component size variants
  export type Size = 'sm' | 'md' | 'lg' | 'xl'
  export type Variant = 'primary' | 'secondary' | 'outline' | 'ghost'
  
  // Responsive breakpoints
  export type Breakpoint = 'sm' | 'md' | 'lg' | 'xl' | '2xl'