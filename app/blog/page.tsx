import { Metadata } from 'next'
import { BlogContent } from '@/components/blog/blog-content'

export const metadata: Metadata = {
  title: 'Blog',
  description:
    'Últimas noticias y tendencias en aviación privada. Descubra artículos sobre viajes VIP, nuevas aeronaves y servicios exclusivos de Aerolínea Santander.',
}

export default function BlogPage() {
  return <BlogContent />
}
