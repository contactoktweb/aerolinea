'use client'

import Link from 'next/link'
import Image from 'next/image'
import { usePathname } from 'next/navigation'
import { motion } from 'framer-motion'
import { Icon } from '@iconify/react'
import { fadeInUp, staggerContainer } from '@/lib/animations'
import { urlFor } from '@/sanity/lib/image'
import { useLanguage } from '@/context/language-context'
import { getLocaleString } from '@/lib/locale-utils'

const getQuickLinks = (t: any) => [
  { href: '/', label: t('nav.home') },
  { href: '/nosotros', label: t('nav.about') },
  { href: '/flota', label: t('nav.fleet') },
  { href: '/blog', label: t('nav.blog') },
  { href: '/reserva', label: t('nav.reserve') },
]

const getServicesList = (t: any) => [
  t('footer.services.private'),
  t('footer.services.charter'),
  t('footer.services.ambulance'),
  t('footer.services.cargo'),
  t('footer.services.events'),
]

export function Footer({ settings }: { settings?: any }) {
  const { language, t } = useLanguage()
  const pathname = usePathname()
  const isAdmin = pathname?.startsWith('/admin')

  if (isAdmin) return null

  const quickLinks = getQuickLinks(t)
  const servicesList = getServicesList(t)

  const contactInfo = [
    {
      icon: 'ph:phone-light',
      title: t('footer.contact.phone'),
      value: settings?.phone || '+51 1 444 5555',
      href: settings?.phone ? `tel:${settings.phone.replace(/\s/g, '')}` : 'tel:+5114445555',
      subtitle: t('footer.contact.phone_sub'),
    },
    {
      icon: 'ph:envelope-light',
      title: t('footer.contact.email'),
      value: settings?.email || 'vip@aerolineasantander.com',
      href: settings?.email ? `mailto:${settings.email}` : 'mailto:vip@aerolineasantander.com',
      subtitle: t('footer.contact.email_sub'),
    },
    {
      icon: 'ph:map-pin-light',
      title: t('footer.contact.address'),
      value: settings?.address || 'Aeropuerto Jorge Chavez',
      href: '#',
      subtitle: t('footer.contact.address_sub'),
    },
    {
      icon: 'ph:clock-light',
      title: t('footer.contact.hours'),
      value: '24/7',
      href: '#',
      subtitle: t('footer.contact.hours_sub'),
    },
  ]

  const socialLinks = settings?.socialLinks || [
    { icon: 'ph:facebook-logo-light', url: 'https://facebook.com', platform: 'Facebook' },
    { icon: 'ph:instagram-logo-light', url: 'https://instagram.com', platform: 'Instagram' },
    { icon: 'ph:linkedin-logo-light', url: 'https://linkedin.com', platform: 'LinkedIn' },
  ]

  const logoFooterUrl = settings?.logoFooter ? urlFor(settings.logoFooter).url() : settings?.logo ? urlFor(settings.logo).url() : '/logo.png'

  return (
    <footer className="bg-background border-t border-pearl/5">
      {/* VIP Contact Section */}
      <div className="border-b border-pearl/5">
        <div className="container mx-auto px-4 lg:px-8 py-16 lg:py-20">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={staggerContainer}
            className="text-center mb-12"
          >
            <motion.span
              variants={fadeInUp}
              className="inline-block px-4 py-1.5 rounded-full bg-champagne/10 text-champagne text-xs uppercase tracking-widest mb-4"
            >
              {t('footer.badge')}
            </motion.span>
            <motion.h2
              variants={fadeInUp}
              className="font-serif text-3xl lg:text-4xl text-pearl mb-3"
            >
              {t('footer.title')}
            </motion.h2>
            <motion.p
              variants={fadeInUp}
              className="text-muted-foreground max-w-2xl mx-auto"
            >
              {t('footer.desc')}
            </motion.p>
          </motion.div>

          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={staggerContainer}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
          >
            {contactInfo.map((item, index) => (
              <motion.a
                key={item.title}
                href={item.href}
                variants={fadeInUp}
                custom={index}
                whileHover={{ y: -5, scale: 1.02 }}
                className="group bg-burgundy-light/40 backdrop-blur-md shadow-[0_8px_30px_rgb(0,0,0,0.12)] rounded-2xl p-6 text-center border border-white/5 hover:border-champagne/30 hover:bg-burgundy-light/60 transition-all duration-300"
              >
                <div className="w-14 h-14 mx-auto mb-4 rounded-xl bg-champagne/10 flex items-center justify-center group-hover:bg-champagne/20 group-hover:scale-110 transition-all duration-300">
                  <Icon icon={item.icon} className="w-6 h-6 text-champagne" />
                </div>
                <h3 className="font-medium text-pearl mb-2 group-hover:text-champagne transition-colors">
                  {item.title}
                </h3>
                <p className="text-champagne text-lg mb-1">{item.value}</p>
                <p className="text-sm text-muted-foreground">{item.subtitle}</p>
              </motion.a>
            ))}
          </motion.div>
        </div>
      </div>

      {/* Main Footer */}
      <div className="container mx-auto px-4 lg:px-8 py-16 lg:py-20">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12 lg:gap-8">
          {/* Brand */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="lg:col-span-1"
          >
            <Link href="/" className="flex items-center mb-6 group">
              <Image 
                src={logoFooterUrl} 
                alt={settings?.title || "Logo"} 
                width={400} 
                height={120} 
                className="h-32 w-auto object-contain transition-transform duration-500 group-hover:scale-105"
              />
            </Link>
            <p className="text-muted-foreground text-sm leading-relaxed mb-6">
              {getLocaleString(settings?.title, language) || 'Aerolíneas Santander'}: {t('footer.brand_desc')}
            </p>
            <div className="flex items-center gap-4">
              {socialLinks.map((social: any) => (
                <motion.a
                  key={social.platform}
                  href={social.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={{ y: -5, scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  className="w-12 h-12 rounded-xl bg-champagne/10 border border-champagne/20 flex items-center justify-center text-champagne hover:bg-champagne hover:text-background transition-all duration-300 shadow-lg shadow-champagne/5"
                  aria-label={social.platform}
                >
                  <Icon icon={social.icon} className="w-6 h-6" />
                </motion.a>
              ))}
            </div>
          </motion.div>

          {/* Quick Links */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
          >
            <h4 className="font-serif text-lg text-pearl mb-6 flex items-center gap-2">
              <span className="w-8 h-px bg-champagne/50" />
              {t('footer.links_title')}
            </h4>
            <ul className="space-y-3">
              {quickLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="group flex items-center gap-2 text-muted-foreground hover:text-champagne transition-colors text-sm"
                  >
                    <Icon icon="ph:caret-right-light" className="w-3 h-3 opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all" />
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Services */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
          >
            <h4 className="font-serif text-lg text-pearl mb-6 flex items-center gap-2">
              <span className="w-8 h-px bg-champagne/50" />
              {t('footer.services_title')}
            </h4>
            <ul className="space-y-3">
              {servicesList.map((service) => (
                <li key={service}>
                  <span className="flex items-center gap-2 text-muted-foreground text-sm">
                    <span className="w-1.5 h-1.5 rounded-full bg-champagne/50" />
                    {service}
                  </span>
                </li>
              ))}
            </ul>
          </motion.div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-pearl/5 bg-background">
        <div className="container mx-auto px-4 lg:px-8 py-6">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <p className="text-sm text-muted-foreground">
              © {new Date().getFullYear()}. {t('footer.rights')}.
            </p>
            <Link 
              href="https://www.kytcode.lat" 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-sm text-muted-foreground hover:text-pearl transition-colors flex items-center gap-1.5 group"
            >
              {t('footer.branding')} <Icon icon="ph:heart-fill" className="text-white group-hover:scale-110 transition-transform duration-300 w-4 h-4" />
            </Link>
          </div>
        </div>
      </div>
    </footer>
  )
}
