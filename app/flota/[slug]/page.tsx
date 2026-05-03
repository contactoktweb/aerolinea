import { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { aircraftData, getAircraftBySlug } from '@/lib/aircraft-data'
import { AircraftDetail } from '@/components/fleet/aircraft-detail'

interface PageProps {
  params: Promise<{ slug: string }>
}

export async function generateStaticParams() {
  return aircraftData.map((aircraft) => ({
    slug: aircraft.slug,
  }))
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params
  const aircraft = getAircraftBySlug(slug)

  if (!aircraft) {
    return {
      title: 'Aeronave no encontrada',
    }
  }

  return {
    title: aircraft.name,
    description: aircraft.description,
  }
}

export default async function AircraftPage({ params }: PageProps) {
  const { slug } = await params
  const aircraft = getAircraftBySlug(slug)

  if (!aircraft) {
    notFound()
  }

  return <AircraftDetail aircraft={aircraft} />
}
