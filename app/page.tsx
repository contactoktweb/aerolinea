import { Hero } from '@/components/home/hero'
import { ServicesGrid } from '@/components/home/services-grid'
import { ClientsCarousel } from '@/components/home/clients-carousel'
import { ReviewsSection } from '@/components/home/reviews-section'

export default function HomePage() {
  return (
    <>
      <Hero />
      <ServicesGrid />
      <ClientsCarousel />
      <ReviewsSection />
    </>
  )
}
