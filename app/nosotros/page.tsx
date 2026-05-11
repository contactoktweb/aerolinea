import { Metadata } from 'next'
import { AboutContent } from '@/components/about/about-content'

export const metadata: Metadata = {
  title: 'Nosotros',
  description:
    'Conozca la historia de Aerolíneas Santander. Casi dos décadas de excelencia en aviación privada, brindando servicios VIP de clase mundial.',
}

export default function NosotrosPage() {
  return <AboutContent />
}
