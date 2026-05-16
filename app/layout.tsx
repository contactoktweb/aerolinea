import type { Metadata, Viewport } from 'next'
import { Cinzel, Montserrat } from 'next/font/google'
import { Analytics } from '@vercel/analytics/next'
import { Header } from '@/components/layout/header'
import { Footer } from '@/components/layout/footer'
import { LanguageProvider } from '@/context/language-context'
import './globals.css'

import { client } from '@/sanity/lib/client'
import { SETTINGS_QUERY } from '@/sanity/lib/queries'
import { urlFor } from '@/sanity/lib/image'

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

const BASE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://aerolineasantander.com'

const SITE_KEYWORDS = [
  // Core service keywords
  'vuelos privados',
  'jets privados',
  'aviación ejecutiva',
  'vuelos charter',
  'jet privado',
  'aeronave privada',
  // Service types
  'ambulancia aérea',
  'vuelo médico',
  'transporte VIP',
  'vuelo corporativo',
  'logística aérea',
  'vuelo humanitario',
  // Geographic
  'vuelos privados Peru',
  'aviación ejecutiva Latinoamerica',
  'jet privado Colombia',
  'vuelo charter Ecuador',
  'vuelo privado Chile',
  // Brand
  'Aerolíneas Santander',
  'jets de lujo',
  'exclusividad aérea',
  'aviación de lujo',
]

export async function generateMetadata(): Promise<Metadata> {
  const settings = await client.fetch(SETTINGS_QUERY)
  const siteTitleEs = settings?.title?.es || settings?.title || 'Aerolíneas Santander'
  const siteTitleEn = settings?.title?.en || siteTitleEs
  const siteTitleFr = settings?.title?.fr || siteTitleEs

  const siteTitle = siteTitleEs
  const faviconUrl = settings?.favicon ? urlFor(settings.favicon).width(512).height(512).url() : null
  const appleIconUrl = settings?.appleIcon
    ? urlFor(settings.appleIcon).width(180).height(180).url()
    : faviconUrl
  const ogImageUrl = settings?.ogImage
    ? urlFor(settings.ogImage).width(1200).height(630).url()
    : faviconUrl

  return {
    metadataBase: new URL(BASE_URL),
    title: {
      default: `${siteTitle} | Vuelos Privados de Lujo`,
      template: `%s | ${siteTitle}`,
    },
    description:
      'Aerolíneas Santander: líderes en aviación ejecutiva y vuelos privados. Ofrecemos jets de lujo, ambulancias aéreas, vuelos corporativos y logística crítica en toda Latinoamérica y el mundo. Reserve su vuelo privado hoy.',
    keywords: SITE_KEYWORDS,
    authors: [{ name: siteTitle, url: BASE_URL }],
    creator: siteTitle,
    publisher: siteTitle,
    category: 'Aviación Ejecutiva',
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        'max-video-preview': -1,
        'max-image-preview': 'large',
        'max-snippet': -1,
      },
    },
    alternates: {
      canonical: BASE_URL,
      languages: {
        'es': BASE_URL,
        'en': `${BASE_URL}?lang=en`,
        'fr': `${BASE_URL}?lang=fr`,
        'es-PE': `${BASE_URL}`,
        'es-CO': `${BASE_URL}`,
        'es-MX': `${BASE_URL}`,
      },
    },
    openGraph: {
      type: 'website',
      locale: 'es_ES',
      alternateLocale: ['es_PE', 'es_CO', 'es_MX', 'es_AR', 'es_CL'],
      url: BASE_URL,
      siteName: siteTitle,
      title: `${siteTitle} | Vuelos Privados de Lujo`,
      description:
        'Líderes en aviación ejecutiva. Jets privados, ambulancias aéreas y transporte VIP en toda Latinoamérica. Confort, seguridad y exclusividad sin límites.',
      images: ogImageUrl
        ? [
            {
              url: ogImageUrl,
              width: 1200,
              height: 630,
              alt: `${siteTitle} - Aviación Ejecutiva de Lujo`,
              type: 'image/jpeg',
            },
          ]
        : [],
    },
    twitter: {
      card: 'summary_large_image',
      title: `${siteTitle} | Vuelos Privados de Lujo`,
      description:
        'Líderes en aviación ejecutiva. Jets privados, ambulancias aéreas y transporte VIP en Latinoamérica.',
      images: ogImageUrl ? [ogImageUrl] : [],
    },
    icons: {
      icon: [
        { url: faviconUrl || '/favicon.png', type: 'image/png' },
        { url: faviconUrl || '/icon.svg', type: 'image/svg+xml' },
      ],
      shortcut: faviconUrl || '/favicon.png',
      apple: appleIconUrl || '/apple-icon.png',
      other: [
        {
          rel: 'icon',
          type: 'image/png',
          sizes: '32x32',
          url: faviconUrl || '/favicon.png',
        },
        {
          rel: 'icon',
          type: 'image/png',
          sizes: '16x16',
          url: faviconUrl || '/favicon.png',
        },
      ],
    },
    verification: {
      google: process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION,
    },
  }
}

export const viewport: Viewport = {
  themeColor: '#4A0E0E',
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
}

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  const settings = await client.fetch(SETTINGS_QUERY)

  return (
    <html
      lang="es"
      className={`${cinzel.variable} ${montserrat.variable} bg-background`}
    >
      <head>
        {/* Structured Data: Organization */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              '@context': 'https://schema.org',
              '@type': 'AirlineOrganization',
              name: settings?.title || 'Aerolíneas Santander',
              url: BASE_URL,
              logo: settings?.logo ? urlFor(settings.logo).url() : `${BASE_URL}/logo.png`,
              description:
                'Líderes en aviación ejecutiva privada en Latinoamérica. Jets de lujo, ambulancias aéreas, vuelos corporativos y logística crítica.',
              contactPoint: {
                '@type': 'ContactPoint',
                telephone: settings?.phone || '',
                contactType: 'customer service',
                areaServed: 'Latinoamerica',
                availableLanguage: 'Spanish',
              },
              sameAs: [
                settings?.socialLinks?.instagram || '',
                settings?.socialLinks?.facebook || '',
                settings?.socialLinks?.linkedin || '',
              ].filter(Boolean),
              areaServed: {
                '@type': 'GeoCircle',
                name: 'Latinoamérica y mundial',
              },
            }),
          }}
        />
      </head>
      <body className="font-sans antialiased min-h-screen flex flex-col">
        <LanguageProvider>
          <Header settings={settings} />
          <main className="flex-1">{children}</main>
          <Footer settings={settings} />
        </LanguageProvider>
        {process.env.NODE_ENV === 'production' && <Analytics />}
      </body>
    </html>
  )
}
