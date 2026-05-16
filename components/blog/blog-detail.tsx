'use client'

import { motion } from 'framer-motion'
import Image from 'next/image'
import Link from 'next/link'
import { Icon } from '@iconify/react'
import { GlassCard } from '@/components/ui/glass-card'
import { fadeInUp } from '@/lib/animations'
import { useLanguage } from '@/context/language-context'
import { getLocaleString, getLocaleArray } from '@/lib/locale-utils'
import { PortableText } from '@portabletext/react'
import { urlFor } from '@/sanity/lib/image'

interface BlogDetailProps {
  article: any
}

export function BlogDetail({ article }: BlogDetailProps) {
  const { language, t } = useLanguage()

  const title = getLocaleString(article.title, language)
  const excerpt = getLocaleString(article.excerpt, language)
  const body = getLocaleArray(article.body, language)

  return (
    <article className="pt-32 pb-24 lg:pb-32 bg-burgundy-black min-h-screen">
      <div className="container mx-auto px-4 lg:px-8 max-w-4xl">
        {/* Breadcrumbs */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="mb-8"
        >
          <Link
            href="/blog"
            className="inline-flex items-center gap-2 text-pearl/50 hover:text-champagne transition-colors group"
          >
            <Icon icon="ph:arrow-left-light" className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
            <span className="text-sm font-medium tracking-wide">{t('blog.back')}</span>
          </Link>
        </motion.div>

        {/* Header Info */}
        <header className="mb-12">
          <motion.div
            initial="hidden"
            animate="visible"
            variants={fadeInUp}
            className="space-y-6"
          >
            <span className="px-4 py-1.5 rounded-full text-xs font-medium bg-champagne/10 text-champagne border border-champagne/20 uppercase tracking-[0.2em]">
              {article.category}
            </span>
            <h1 className="font-serif text-4xl md:text-5xl lg:text-6xl text-pearl leading-tight">
              {title}
            </h1>
            <div className="flex items-center gap-8 text-pearl/40 border-t border-pearl/10 pt-6">
              <div className="flex items-center gap-2">
                <Icon icon="ph:calendar-blank-light" className="w-5 h-5 text-champagne" />
                <span className="text-sm">{article.date}</span>
              </div>
              <div className="flex items-center gap-2">
                <Icon icon="ph:clock-light" className="w-5 h-5 text-champagne" />
                <span className="text-sm">{t('blog.read_prefix')} {article.readTime}</span>
              </div>
            </div>
          </motion.div>
        </header>

        {/* Hero Image */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8 }}
          className="relative aspect-[21/9] rounded-2xl overflow-hidden mb-16 shadow-2xl"
        >
          <Image
            src={article.image ? urlFor(article.image).url() : '/images/placeholder.jpg'}
            alt={title}
            fill
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-t from-burgundy-black/60 to-transparent" />
        </motion.div>

        {/* Content */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          <motion.div
            initial="hidden"
            animate="visible"
            variants={fadeInUp}
            className="lg:col-span-8"
          >
            <div 
              className="prose prose-invert prose-pearl max-w-none 
                prose-headings:font-serif prose-headings:text-pearl
                prose-h2:text-3xl prose-h2:mt-12 prose-h2:mb-6
                prose-p:text-pearl/70 prose-p:text-lg prose-p:leading-relaxed prose-p:mb-6
                prose-blockquote:border-champagne prose-blockquote:bg-champagne/5 prose-blockquote:p-8 prose-blockquote:rounded-r-xl prose-blockquote:italic
                prose-strong:text-champagne
                "
            >
              {body && body.length > 0 ? (
                <PortableText value={body} />
              ) : (
                <div dangerouslySetInnerHTML={{ __html: article.content }} />
              )}
            </div>
          </motion.div>

          {/* Sidebar / Recommendations */}
          <aside className="lg:col-span-4 space-y-8">
            <GlassCard className="p-6 sticky top-32">
              <h3 className="font-serif text-xl text-pearl mb-6 border-b border-pearl/10 pb-4">
                Compartir Artículo
              </h3>
              <div className="flex gap-4">
                {['facebook', 'twitter', 'linkedin', 'whatsapp'].map((social) => (
                  <button
                    key={social}
                    className="w-10 h-10 rounded-full bg-pearl/5 flex items-center justify-center text-pearl/50 hover:bg-champagne hover:text-background transition-all duration-300"
                  >
                    <Icon icon={`ph:${social}-logo-light`} className="w-5 h-5" />
                  </button>
                ))}
              </div>

              <div className="mt-12 pt-8 border-t border-pearl/10">
                <h3 className="font-serif text-xl text-pearl mb-6">
                  ¿Interesado en volar?
                </h3>
                <p className="text-pearl/60 text-sm mb-6 leading-relaxed">
                  Permítanos organizar su próxima experiencia de vuelo con la máxima exclusividad y confort.
                </p>
                <Link
                  href="/reserva"
                  className="block w-full py-4 text-center bg-champagne text-background text-sm font-semibold uppercase tracking-widest hover:bg-champagne-light transition-colors"
                >
                  Solicitar Cotización
                </Link>
              </div>
            </GlassCard>
          </aside>
        </div>
      </div>
    </article>
  )
}
