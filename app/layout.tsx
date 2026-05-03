import type { Metadata, Viewport } from 'next'
import { Bodoni_Moda, Playfair_Display } from 'next/font/google'
import { Analytics } from '@vercel/analytics/next'
import { Header } from '@/components/layout/header'
import { Footer } from '@/components/layout/footer'
import './globals.css'

const bodoni = Bodoni_Moda({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700', '800', '900'],
  variable: '--font-bodoni',
  display: 'swap',
  style: ['italic', 'normal'],
})

const playfair = Playfair_Display({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700', '800', '900'],
  variable: '--font-playfair',
  display: 'swap',
  style: ['italic', 'normal'],
})

export const metadata: Metadata = {
  title: {
    default: 'Aerolínea Santander | Vuelos Privados de Lujo',
    template: '%s | Aerolínea Santander',
  },
  description:
    'Servicios de aviación privada VIP en jets de lujo. Vuelos chárter, ambulancia aérea y carga. Experiencia 100% VIP desde Lima, Perú.',
  keywords: [
    'vuelos privados',
    'jets de lujo',
    'aviación privada',
    'vuelos charter',
    'Lima Perú',
    'VIP',
    'ambulancia aérea',
  ],
  authors: [{ name: 'Aerolínea Santander' }],
  creator: 'Aerolínea Santander',
  openGraph: {
    type: 'website',
    locale: 'es_PE',
    url: 'https://aerolineasantander.com',
    siteName: 'Aerolínea Santander',
    title: 'Aerolínea Santander | Vuelos Privados de Lujo',
    description:
      'Servicios de aviación privada VIP en jets de lujo. Experiencia 100% VIP.',
  },
}

export const viewport: Viewport = {
  themeColor: '#6B0F2A',
  width: 'device-width',
  initialScale: 1,
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html
      lang="es"
      className={`${bodoni.variable} ${playfair.variable} bg-background`}
    >
      <body className="font-sans antialiased min-h-screen flex flex-col">
        <Header />
        <main className="flex-1">{children}</main>
        <Footer />
        {process.env.NODE_ENV === 'production' && <Analytics />}
      </body>
    </html>
  )
}
