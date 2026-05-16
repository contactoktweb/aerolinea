'use client'

import Image from 'next/image'
import { motion } from 'framer-motion'
import { Icon } from '@iconify/react'
import { urlFor } from '@/sanity/lib/image'
import { fadeInUp, staggerContainer, slideInFromLeft, slideInFromRight } from '@/lib/animations'
import { GoldButton } from '@/components/ui/gold-button'
import { GlassCard } from '@/components/ui/glass-card'
import { SectionTitle } from '@/components/ui/section-title'
import { AnimatedCounter } from '@/components/about/animated-counter'
import { useLanguage } from '@/context/language-context'
import { getLocaleString } from '@/lib/locale-utils'

// Default fallback data
const stats = [
  { value: 15, suffix: '+', label: { es: 'Años de Experiencia', en: 'Years of Experience', fr: 'Années d\'Expérience' } },
  { value: 50, suffix: '+', label: { es: 'Destinos Globales', en: 'Global Destinations', fr: 'Destinations Mondiales' } },
  { value: 10, suffix: 'k+', label: { es: 'Vuelos Completados', en: 'Completed Flights', fr: 'Vols Terminé' } },
  { value: 100, suffix: '%', label: { es: 'Compromiso VIP', en: 'VIP Commitment', fr: 'Engagement VIP' } },
]

const values = [
  { 
    title: { es: 'Seguridad', en: 'Safety', fr: 'Sécurité' }, 
    description: { 
      es: 'Nuestra prioridad absoluta con los más altos estándares internacionales.',
      en: 'Our absolute priority with the highest international standards.',
      fr: 'Notre priorité absolue avec les normes internationales les plus élevées.'
    } 
  },
  { 
    title: { es: 'Excelencia', en: 'Excellence', fr: 'Excellence' }, 
    description: { 
      es: 'Atención al detalle en cada aspecto de su experiencia de vuelo.',
      en: 'Attention to detail in every aspect of your flight experience.',
      fr: 'Attention portée aux détails dans chaque aspect de votre expérience de vol.'
    } 
  },
  { 
    title: { es: 'Servicio Personal', en: 'Personal Service', fr: 'Service Personnel' }, 
    description: { 
      es: 'Vuelos diseñados específicamente para sus necesidades.',
      en: 'Flights designed specifically for your needs.',
      fr: 'Des vols conçus spécifiquement pour vos besoins.'
    } 
  },
  { 
    title: { es: 'Flota Premium', en: 'Premium Fleet', fr: 'Flotte Premium' }, 
    description: { 
      es: 'Aeronaves de última generación mantenidas a la perfección.',
      en: 'State-of-the-art aircraft maintained to perfection.',
      fr: 'Des avions à la pointe de la technologie, entretenus à la perfection.'
    } 
  },
]

const team = [
  { name: 'Carlos Santander', role: 'Fundador & CEO', image_local: '/images/team/ceo.jpg' },
  { name: 'Dra. Elena Ruiz', role: 'Directora de Operaciones', image_local: '/images/team/ops.jpg' },
  { name: 'Capt. Luis Mendez', role: 'Jefe de Pilotos', image_local: '/images/team/pilot.jpg' },
]

const valueIcons: Record<string, string> = {
  'Seguridad': 'ph:shield-check-light',
  'Safety': 'ph:shield-check-light',
  'Sécurité': 'ph:shield-check-light',
  'Excelencia': 'ph:medal-light',
  'Excellence': 'ph:medal-light',
  'Servicio Personal': 'ph:users-light',
  'Personal Service': 'ph:users-light',
  'Service Personnel': 'ph:users-light',
  'Flota Premium': 'ph:airplane-light',
  'Premium Fleet': 'ph:airplane-light',
  'Flotte Premium': 'ph:airplane-light',
}

export function AboutContent({ data }: { data?: any }) {
  const { language, t } = useLanguage()
  const displayStats = data?.stats || stats
  const displayValues = data?.values || values
  const displayTeam = data?.team || team

  const heroImage = data?.hero?.image ? urlFor(data.hero.image).url() : "/images/about-hero.jpg"
  const legacyImage = data?.legacy?.image ? urlFor(data.legacy.image).url() : "/images/about-legacy.jpg"

  return (
    <article>
      {/* Hero Section */}
      <section className="relative pt-48 lg:pt-56 pb-24 lg:pb-32 overflow-hidden">
        <div className="absolute inset-0">
          <Image
            src={heroImage}
            alt={getLocaleString(data?.hero?.title, language) || "Historia de Aerolíneas Santander"}
            fill
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-b from-background/90 via-background/70 to-background" />
        </div>

        <div className="relative z-10 container mx-auto px-4 lg:px-8">
          <motion.div
            initial="hidden"
            animate="visible"
            variants={staggerContainer}
            className="max-w-3xl mx-auto text-center"
          >
            <motion.span
              variants={fadeInUp}
              className="inline-block text-champagne text-sm font-medium tracking-[0.2em] uppercase mb-4"
            >
              {getLocaleString(data?.hero?.subtitle, language) || t('about.hero.fallback_subtitle')}
            </motion.span>
            <motion.h1
              variants={fadeInUp}
              className="font-serif text-4xl md:text-5xl lg:text-6xl text-pearl mb-6"
            >
              {getLocaleString(data?.hero?.title, language) || t('about.hero.fallback_title')}
            </motion.h1>
            <motion.p
              variants={fadeInUp}
              className="text-lg text-pearl/80 leading-relaxed"
            >
              {getLocaleString(data?.hero?.description, language) || t('about.hero.fallback_desc')}
            </motion.p>
          </motion.div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-20 lg:py-28 bg-white border-y border-burgundy/5">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12">
            {displayStats.map((stat: any, index: number) => (
              <AnimatedCounter
                key={stat.label}
                end={stat.value}
                suffix={stat.suffix}
                label={getLocaleString(stat.label, language)}
                duration={2 + index * 0.3}
              />
            ))}
          </div>
        </div>
      </section>

      {/* Legacy Section */}
      <section className="py-20 lg:py-28 bg-white">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={slideInFromLeft}
            >
              <span className="text-champagne text-sm font-medium tracking-[0.2em] uppercase mb-4 block">
                {getLocaleString(data?.legacy?.subtitle, language) || t('about.legacy.subtitle')}
              </span>
              <h2 className="font-serif text-3xl lg:text-4xl text-background mb-6">
                {getLocaleString(data?.legacy?.title, language) || t('about.legacy.title')}
              </h2>
              <div className="space-y-4 text-background/70 font-medium leading-relaxed whitespace-pre-line">
                {getLocaleString(data?.legacy?.description, language) || t('hero.desc')}
              </div>
              <div className="mt-8">
                <GoldButton href="/reserva">{t('hero.cta')}</GoldButton>
              </div>
            </motion.div>

            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={slideInFromRight}
              className="relative"
            >
              <div className="relative aspect-[4/5] rounded-2xl overflow-hidden">
                <Image
                  src={legacyImage}
                  alt={getLocaleString(data?.legacy?.title, language) || "Legado de Aerolíneas Santander"}
                  fill
                  className="object-cover"
                />
              </div>
              <div className="absolute -bottom-6 -right-6 w-48 h-48 bg-champagne/10 rounded-2xl -z-10" />
            </motion.div>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-20 lg:py-28 bg-white text-background">
        <div className="container mx-auto px-4 lg:px-8">
          <SectionTitle
            subtitle={t('about.values.subtitle')}
            title={t('about.values.title')}
            description={t('about.values.description')}
            theme="light"
          />

          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={staggerContainer}
            className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8"
          >
            {displayValues.map((value: any) => (
              <motion.div key={value.title} variants={fadeInUp}>
                <div className="h-full rounded-2xl p-8 bg-burgundy/5 border border-burgundy/10 hover:border-burgundy/20 transition-all duration-300">
                  <div className="flex items-start gap-4">
                    <div className="w-14 h-14 rounded-xl bg-background/10 flex items-center justify-center shrink-0">
                      <Icon 
                        icon={valueIcons[value.title] || 'ph:star-light'} 
                        className="w-6 h-6 text-background" 
                      />
                    </div>
                    <div>
                      <h3 className="font-serif text-xl text-background font-bold mb-2">
                        {getLocaleString(value.title, language)}
                      </h3>
                      <p className="text-background/80 font-medium leading-relaxed">
                        {getLocaleString(value.description, language)}
                      </p>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-20 lg:py-28 bg-white">
        <div className="container mx-auto px-4 lg:px-8">
          <SectionTitle
            subtitle={t('about.team.subtitle')}
            title={t('about.team.title')}
            description={t('about.team.description')}
            theme="light"
          />

          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={staggerContainer}
            className="grid grid-cols-1 md:grid-cols-3 gap-8"
          >
            {displayTeam.map((member: any) => (
              <motion.div key={member.name} variants={fadeInUp}>
                <GlassCard className="text-center">
                  <div className="relative w-32 h-32 mx-auto mb-6 rounded-full overflow-hidden">
                    <Image
                      src={member.image ? urlFor(member.image).url() : member.image_local || "/images/team/ceo.jpg"}
                      alt={member.name}
                      fill
                      className="object-cover"
                    />
                  </div>
                  <h3 className="font-serif text-xl text-background mb-1">
                    {member.name}
                  </h3>
                  <p className="text-burgundy text-sm">{getLocaleString(member.role, language)}</p>
                </GlassCard>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 lg:py-28 bg-white border-t border-burgundy/5">
        <div className="container mx-auto px-4 lg:px-8">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeInUp}
            className="text-center max-w-2xl mx-auto"
          >
            <h2 className="font-serif text-3xl lg:text-4xl text-background mb-6">
              {t('about.cta.title')}
            </h2>
            <p className="text-background/70 font-medium mb-8">
              {t('about.cta.description')}
            </p>
            <GoldButton href="/reserva" size="lg">
              {t('about.cta.button')}
            </GoldButton>
          </motion.div>
        </div>
      </section>
    </article>
  )
}
