'use client'

import Link from 'next/link'
import Image from 'next/image'
import { motion } from 'framer-motion'
import { Icon } from '@iconify/react'
import { fadeInUp, staggerContainer } from '@/lib/animations'

const quickLinks = [
  { href: '/', label: 'Inicio' },
  { href: '/nosotros', label: 'Nosotros' },
  { href: '/flota', label: 'Nuestra Flota' },
  { href: '/blog', label: 'Noticias' },
  { href: '/reserva', label: 'Reservar' },
]

const services = [
  'Vuelos Privados',
  'Vuelos Charter',
  'Ambulancia Aerea',
  'Carga Aerea',
  'Eventos Especiales',
]

const contactInfo = [
  {
    icon: 'ph:phone-light',
    title: 'Telefono',
    value: '+51 1 444 5555',
    href: 'tel:+5114445555',
    subtitle: 'Linea directa VIP',
  },
  {
    icon: 'ph:envelope-light',
    title: 'Email',
    value: 'vip@aerolineasantander.com',
    href: 'mailto:vip@aerolineasantander.com',
    subtitle: 'Respuesta rapida',
  },
  {
    icon: 'ph:map-pin-light',
    title: 'Ubicacion',
    value: 'Aeropuerto Jorge Chavez',
    href: '#',
    subtitle: 'Terminal de Aviacion Ejecutiva',
  },
  {
    icon: 'ph:clock-light',
    title: 'Horario',
    value: '24/7',
    href: '#',
    subtitle: 'Disponibilidad permanente',
  },
]

export function Footer() {
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
              Atencion Premium
            </motion.span>
            <motion.h2
              variants={fadeInUp}
              className="font-serif text-3xl lg:text-4xl text-pearl mb-3"
            >
              Centro de Atencion VIP 24h
            </motion.h2>
            <motion.p
              variants={fadeInUp}
              className="text-muted-foreground max-w-2xl mx-auto"
            >
              Nuestro equipo de expertos esta disponible las 24 horas del dia,
              los 7 dias de la semana, para atender todas sus necesidades de
              vuelo.
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
                className="group glass-card rounded-2xl p-6 text-center border border-transparent hover:border-champagne/20 transition-all duration-300"
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
                src="/logo.png" 
                alt="Aerolíneas Santander" 
                width={280} 
                height={80} 
                className="h-20 w-auto object-contain brightness-0 invert transition-transform duration-500 group-hover:scale-105"
              />
            </Link>
            <p className="text-muted-foreground text-sm leading-relaxed mb-6">
              Líderes en aviación ejecutiva desde 2008. 
              Experiencia premium en cada vuelo con los más altos estándares de seguridad.
            </p>
            <div className="flex items-center gap-4">
              {[
                { icon: 'ph:facebook-logo-light', href: 'https://facebook.com', label: 'Facebook' },
                { icon: 'ph:instagram-logo-light', href: 'https://instagram.com', label: 'Instagram' },
                { icon: 'ph:linkedin-logo-light', href: 'https://linkedin.com', label: 'LinkedIn' },
              ].map((social) => (
                <motion.a
                  key={social.label}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={{ y: -5, scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  className="w-12 h-12 rounded-xl bg-champagne/10 border border-champagne/20 flex items-center justify-center text-champagne hover:bg-champagne hover:text-background transition-all duration-300 shadow-lg shadow-champagne/5"
                  aria-label={social.label}
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
              Enlaces Rapidos
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
              Nuestros Servicios
            </h4>
            <ul className="space-y-3">
              {services.map((service) => (
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
              © {new Date().getFullYear()} Aerolíneas Santander. Todos los
              derechos reservados.
            </p>
            <Link 
              href="https://www.kytcode.lat" 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-sm text-muted-foreground hover:text-pearl transition-colors flex items-center gap-1"
            >
              Desarrollado por K&T <span className="text-white">🤍</span>
            </Link>
          </div>
        </div>
      </div>
    </footer>
  )
}
