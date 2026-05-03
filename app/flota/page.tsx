import { Metadata } from 'next'
import { FleetGallery } from '@/components/fleet/fleet-gallery'

export const metadata: Metadata = {
  title: 'Nuestra Flota',
  description:
    'Explore nuestra flota de jets privados de lujo. Desde jets ligeros hasta aeronaves de ultra largo alcance, encuentre la aeronave perfecta para su viaje.',
}

export default function FlotaPage() {
  return <FleetGallery />
}
