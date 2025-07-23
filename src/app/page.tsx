import { Hero } from '@/components/Hero'
import { Features } from '@/components/Features'
import { Stats } from '@/components/Stats'
import { Ecosystem } from '@/components/Ecosystem'
import { Pricing } from '@/components/Pricing'
import { TechSpecs } from '@/components/TechSpecs'
import { CTA } from '@/components/CTA'
import { Footer } from '@/components/Footer'
import { Navbar } from '@/components/Navbar'

export default function Home() {
  return (
    <main className="relative">
      <Navbar />
      <Hero />
      <Stats />
      <Ecosystem />
      <Features />
      <TechSpecs />
      <Pricing />
      <CTA />
      <Footer />
    </main>
  )
}