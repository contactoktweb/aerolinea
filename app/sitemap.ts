import { MetadataRoute } from 'next'
import { client } from '@/sanity/lib/client'
import { FLEET_QUERY } from '@/sanity/lib/queries'
import { aircraftData } from '@/lib/aircraft-data'

// Key markets for quotation page SEO
const TARGET_COUNTRIES = [
  { name: 'Peru', slug: 'peru' },
  { name: 'Colombia', slug: 'colombia' },
  { name: 'Chile', slug: 'chile' },
  { name: 'Argentina', slug: 'argentina' },
  { name: 'Mexico', slug: 'mexico' },
  { name: 'Brasil', slug: 'brasil' },
  { name: 'Ecuador', slug: 'ecuador' },
  { name: 'Venezuela', slug: 'venezuela' },
  { name: 'Bolivia', slug: 'bolivia' },
  { name: 'Panama', slug: 'panama' },
  { name: 'Costa Rica', slug: 'costa-rica' },
  { name: 'Guatemala', slug: 'guatemala' },
  { name: 'Paraguay', slug: 'paraguay' },
  { name: 'Uruguay', slug: 'uruguay' },
  { name: 'Honduras', slug: 'honduras' },
  { name: 'El Salvador', slug: 'el-salvador' },
  { name: 'Republica Dominicana', slug: 'republica-dominicana' },
  { name: 'Estados Unidos', slug: 'estados-unidos' },
  { name: 'España', slug: 'espana' },
  { name: 'Canada', slug: 'canada' },
]

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://aerolineasantander.com'
  const now = new Date()

  // Static pages
  const staticPages: MetadataRoute.Sitemap = [
    {
      url: baseUrl,
      lastModified: now,
      changeFrequency: 'weekly',
      priority: 1.0,
    },
    {
      url: `${baseUrl}/nosotros`,
      lastModified: now,
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    {
      url: `${baseUrl}/flota`,
      lastModified: now,
      changeFrequency: 'weekly',
      priority: 0.9,
    },
    {
      url: `${baseUrl}/reserva`,
      lastModified: now,
      changeFrequency: 'weekly',
      priority: 0.95,
    },
    {
      url: `${baseUrl}/blog`,
      lastModified: now,
      changeFrequency: 'daily',
      priority: 0.7,
    },
  ]

  // Dynamic aircraft pages from Sanity
  let fleetSlugs: string[] = []
  try {
    const fleetData = await client.fetch(FLEET_QUERY)
    if (fleetData?.length > 0) {
      fleetSlugs = fleetData.map((a: any) => a.slug)
    }
  } catch {
    // Fallback to static data
    fleetSlugs = aircraftData.map((a) => a.slug)
  }

  const aircraftPages: MetadataRoute.Sitemap = fleetSlugs.map((slug) => ({
    url: `${baseUrl}/flota/${slug}`,
    lastModified: now,
    changeFrequency: 'monthly' as const,
    priority: 0.8,
  }))

  // Country-specific quotation landing pages (for international SEO)
  const countryPages: MetadataRoute.Sitemap = TARGET_COUNTRIES.map((country) => ({
    url: `${baseUrl}/reserva/${country.slug}-reserva-de-vuelo-privado`,
    lastModified: now,
    changeFrequency: 'monthly' as const,
    priority: 0.85,
  }))

  return [...staticPages, ...aircraftPages, ...countryPages]
}
