import type { Metadata, Viewport } from 'next'
import { Cinzel, Montserrat } from 'next/font/google'
import { Analytics } from '@vercel/analytics/next'
import { Header } from '@/components/layout/header'
import { Footer } from '@/components/layout/footer'
import './globals.css'

const cinzel = Cinzel({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  variable: '--font-cinzel',
  display: 'swap',
})

const montserrat = Montserrat({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700'],
  variable: '--font-montserrat',
  display: 'swap',
})

export const metadata: Metadata = {
  title: {
    default: 'Aerolíneas Santander | Vuelos Privados de Lujo',
    template: '%s | Aerolíneas Santander',
  },
  description:
    'Aerolíneas Santander. Elevando la experiencia de vuelo a través del diseño y la distinción. Líderes en aviación ejecutiva, experiencias de lujo y logística crítica.',
  keywords: [
    'vuelos privados',
    'jets de lujo',
    'aviación ejecutiva',
    'vuelos charter',
    'logística de alta fidelidad',
    'exclusividad',
    'prestigio',
    'celeridad'
  ],
  authors: [{ name: 'Aerolíneas Santander' }],
  creator: 'Aerolíneas Santander',
  openGraph: {
    type: 'website',
    locale: 'es_PE',
    url: 'https://aerolineasantander.com',
    siteName: 'Aerolíneas Santander',
    title: 'Aerolíneas Santander | Vuelos Privados de Lujo',
    description:
      'Elevando la experiencia de vuelo a través del diseño y la distinción.',
  },
  icons: {
    icon: '/favicon.png',
    shortcut: '/favicon.png',
    apple: '/favicon.png',
  },
}

export const viewport: Viewport = {
  themeColor: '#4A0E0E',
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
      className={`${cinzel.variable} ${montserrat.variable} bg-background`}
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
