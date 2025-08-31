import type { Metadata } from 'next'
import { Inter, JetBrains_Mono } from 'next/font/google'
import { PrivyProvider } from '@/components/providers/PrivyProvider'
import { SessionProvider } from '@/providers/SessionProvider'
import './globals.css'

const inter = Inter({ 
  subsets: ['latin'],
  variable: '--font-inter'
})

const jetbrainsMono = JetBrains_Mono({ 
  subsets: ['latin'],
  variable: '--font-mono'
})

export const metadata: Metadata = {
  title: 'Wind Space - Making Solana Data Accessible to All',
  description: 'Wind Network\'s enterprise-grade indexing and storage for Solana. Built on Lava Lakes infrastructure on Filecoin. 92% cheaper with sub-second query times.',
  keywords: 'Solana indexing, Solana RPC, blockchain storage, Wind Network, Lava Lakes, Filecoin storage, Solana data, blockchain indexing',
  authors: [{ name: 'Wind Network' }],
  viewport: 'width=device-width, initial-scale=1',
  themeColor: '#1e40af',
  icons: {
    icon: '/logo.png',
    shortcut: '/logo.png',
    apple: '/logo.png',
  },
  openGraph: {
    title: 'Wind Space - Making Solana Data Accessible to All',
    description: 'Enterprise-grade indexing and storage for Solana. Powered by Lava Lakes on Filecoin.',
    type: 'website',
    siteName: 'Wind Space by Wind Network',
    images: ['/logo.png'],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Wind Space - Making Solana Data Accessible to All',
    description: 'Enterprise-grade indexing and storage for Solana. Powered by Lava Lakes on Filecoin.',
    images: ['/logo.png'],
  }
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className={`${inter.variable} ${jetbrainsMono.variable}`}>
      <body className="font-sans antialiased bg-slate-950 text-white overflow-x-hidden min-h-screen w-full">
        <div className="noise-overlay"></div>
        <SessionProvider>
          <PrivyProvider>
            {children}
          </PrivyProvider>
        </SessionProvider>
      </body>
    </html>
  )
}