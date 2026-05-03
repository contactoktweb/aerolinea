import { Hero } from '@/components/home/hero'
import { ServicesGrid } from '@/components/home/services-grid'
import { ClientsCarousel } from '@/components/home/clients-carousel'

export default function HomePage() {
  return (
    <>
      <Hero />
      <ServicesGrid />
      <ClientsCarousel />
    </>
  )
}
