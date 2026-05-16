'use client'

import { motion } from 'framer-motion'
import Image from 'next/image'
import Link from 'next/link'
import { Icon } from '@iconify/react'
import { SectionTitle } from '@/components/ui/section-title'
import { GlassCard } from '@/components/ui/glass-card'
import { fadeInUp, staggerContainer } from '@/lib/animations'
import { useLanguage } from '@/context/language-context'
import { getLocaleString } from '@/lib/locale-utils'
import { urlFor } from '@/sanity/lib/image'

export function BlogContent({ initialPosts }: { initialPosts?: any[] }) {
  const { language, t } = useLanguage()
  const displayArticles = initialPosts && initialPosts.length > 0 ? initialPosts : []
  const featuredArticle = displayArticles.find((a) => a.featured) || displayArticles[0]
  const regularArticles = displayArticles.filter((a) => a !== featuredArticle)

  if (!displayArticles.length) return null

  return (
    <article className="pt-48 lg:pt-56 pb-24 lg:pb-32 bg-white">
      <div className="container mx-auto px-4 lg:px-8">
        <SectionTitle
          subtitle={t('blog.subtitle')}
          title={t('blog.title')}
          description={t('blog.description')}
          theme="light"
        />

        {/* Featured Article */}
        {featuredArticle && (
          <motion.div
            initial="hidden"
            animate="visible"
            variants={fadeInUp}
            className="mb-12"
          >
            <Link href={`/blog/${featuredArticle.slug}`} className="block group">
            <div className="bg-white rounded-2xl overflow-hidden border border-burgundy/5 shadow-[0_20px_50px_rgba(74,14,14,0.08)] hover:shadow-[0_30px_70px_rgba(74,14,14,0.12)] transition-all duration-500">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-0">
                  <div className="relative aspect-[16/10] lg:aspect-auto">
                      <Image
                        src={featuredArticle.image ? urlFor(featuredArticle.image).url() : '/images/placeholder.jpg'}
                        alt={getLocaleString(featuredArticle.title, language)}
                        fill
                        className="object-cover transition-transform duration-700 group-hover:scale-105"
                      />
                    </div>
                    <div className="p-8 lg:p-12 flex flex-col justify-center">
                      <div className="flex items-center gap-4 mb-4">
                        <span className="px-3 py-1.5 rounded-full text-[10px] font-bold uppercase tracking-wider bg-champagne text-background">
                          {t('blog.featured')}
                        </span>
                        <span className="px-3 py-1.5 rounded-full text-[10px] font-bold uppercase tracking-wider bg-burgundy/5 text-burgundy/70">
                          {featuredArticle.category}
                        </span>
                      </div>
                      <h2 className="font-serif text-2xl lg:text-3xl text-champagne mb-4 group-hover:text-champagne/80 transition-colors">
                        {getLocaleString(featuredArticle.title, language)}
                      </h2>
                      <p className="text-burgundy/70 font-medium leading-relaxed mb-6">
                        {getLocaleString(featuredArticle.excerpt, language)}
                      </p>
                      <div className="flex items-center gap-6 text-sm text-burgundy/50 font-bold">
                        <span className="flex items-center gap-2">
                          <Icon icon="ph:calendar-blank-light" className="w-4 h-4" />
                          {featuredArticle.date}
                        </span>
                        <span className="flex items-center gap-2">
                          <Icon icon="ph:clock-light" className="w-4 h-4" />
                          {featuredArticle.readTime}
                        </span>
                      </div>
                    </div>
                </div>
            </div>
            </Link>
          </motion.div>
        )}

        {/* Articles Grid */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={staggerContainer}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          {regularArticles.map((article, index) => (
            <motion.div key={article._id || index} variants={fadeInUp}>
              <Link href={`/blog/${article.slug}`} className="block h-full group">
                <div className="h-full flex flex-col bg-white rounded-2xl p-8 border border-burgundy/5 shadow-[0_20px_50px_rgba(74,14,14,0.08)] hover:shadow-[0_30px_70px_rgba(74,14,14,0.12)] transition-all duration-500">
                  <div className="relative aspect-[16/10] rounded-lg overflow-hidden mb-6 -mx-6 -mt-6">
                    <Image
                      src={article.image ? urlFor(article.image).url() : '/images/placeholder.jpg'}
                      alt={getLocaleString(article.title, language)}
                      fill
                      className="object-cover transition-transform duration-700 group-hover:scale-105"
                    />
                    <div className="absolute top-4 left-4">
                      <span className="px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider bg-champagne text-background shadow-lg">
                        {article.category}
                      </span>
                    </div>
                  </div>

                  <h3 className="font-serif text-xl text-champagne mb-3 group-hover:text-champagne/80 transition-colors">
                    {getLocaleString(article.title, language)}
                  </h3>
                  <p className="text-burgundy/60 text-sm font-medium leading-relaxed flex-1 mb-4">
                    {getLocaleString(article.excerpt, language)}
                  </p>

                  <div className="flex items-center justify-between pt-4 border-t border-burgundy/10">
                    <div className="flex items-center gap-4 text-xs text-burgundy/50 font-bold">
                      <span className="flex items-center gap-1">
                        <Icon icon="ph:calendar-blank-light" className="w-3 h-3" />
                        {article.date}
                      </span>
                      <span className="flex items-center gap-1">
                        <Icon icon="ph:clock-light" className="w-3 h-3" />
                        {article.readTime}
                      </span>
                    </div>
                    <Icon icon="ph:arrow-right-light" className="w-4 h-4 text-burgundy opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all" />
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </article>
  )
}
