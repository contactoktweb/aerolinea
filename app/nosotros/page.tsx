import { Metadata } from 'next'
import { AboutContent } from '@/components/about/about-content'

export const metadata: Metadata = {
  title: 'Nosotros',
  description:
    'Conozca la historia de Aerolínea Santander. Más de 25 años de excelencia en aviación privada, brindando servicios VIP de clase mundial desde Lima, Perú.',
}

export default function NosotrosPage() {
  return <AboutContent />
}
