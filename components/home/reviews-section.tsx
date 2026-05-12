'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Icon } from '@iconify/react'
import { SectionTitle } from '@/components/ui/section-title'

interface Review {
  id: number
  name: string
  role: string
  rating: number
  comment: string
  date: string
  avatar: string
}

const initialReviews: Review[] = [
  {
    id: 1,
    name: 'Carlos Mendoza',
    role: 'CEO, TechCorp Latam',
    rating: 5,
    comment:
      'Una experiencia absolutamente excepcional. El nivel de detalle y atención al cliente superó todas mis expectativas. Sin duda, la mejor aerolínea privada con la que he volado.',
    date: 'Marzo 2025',
    avatar: 'CM',
  },
  {
    id: 2,
    name: 'Valentina Ríos',
    role: 'Directora de Operaciones',
    rating: 5,
    comment:
      'Puntualidad impecable y un servicio de primer nivel. El vuelo fue completamente silencioso y el personal a bordo anticipó cada necesidad. Recomiendo totalmente.',
    date: 'Febrero 2025',
    avatar: 'VR',
  },
  {
    id: 3,
    name: 'Andrés Castellanos',
    role: 'Empresario',
    rating: 4,
    comment:
      'Muy buena experiencia general. El proceso de reserva fue ágil y la aeronave estaba en perfectas condiciones. Volveré a utilizar sus servicios sin dudarlo.',
    date: 'Enero 2025',
    avatar: 'AC',
  },
]

function StarRating({
  value,
  onChange,
  readOnly = false,
}: {
  value: number
  onChange?: (v: number) => void
  readOnly?: boolean
}) {
  const [hovered, setHovered] = useState(0)
  return (
    <div className="flex gap-1">
      {[1, 2, 3, 4, 5].map((star) => (
        <button
          key={star}
          type="button"
          disabled={readOnly}
          onClick={() => onChange?.(star)}
          onMouseEnter={() => !readOnly && setHovered(star)}
          onMouseLeave={() => !readOnly && setHovered(0)}
          className={readOnly ? 'cursor-default' : 'cursor-pointer'}
        >
          <Icon
            icon={(hovered || value) >= star ? 'ph:star-fill' : 'ph:star-light'}
            className={`w-5 h-5 transition-colors duration-150 ${
              (hovered || value) >= star ? 'text-champagne' : 'text-burgundy/20'
            }`}
          />
        </button>
      ))}
    </div>
  )
}

export function ReviewsSection() {
  const [reviews, setReviews] = useState<Review[]>(initialReviews)
  const [showForm, setShowForm] = useState(false)
  const [submitted, setSubmitted] = useState(false)
  const [form, setForm] = useState({ name: '', role: '', rating: 0, comment: '' })
  const [errors, setErrors] = useState<Record<string, string>>({})

  const validate = () => {
    const e: Record<string, string> = {}
    if (!form.name.trim()) e.name = 'El nombre es requerido'
    if (form.rating === 0) e.rating = 'Selecciona una calificación'
    if (!form.comment.trim()) e.comment = 'Escribe tu reseña'
    setErrors(e)
    return Object.keys(e).length === 0
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!validate()) return
    const newReview: Review = {
      id: Date.now(),
      name: form.name.trim(),
      role: form.role.trim() || 'Pasajero Verificado',
      rating: form.rating,
      comment: form.comment.trim(),
      date: new Date().toLocaleDateString('es-ES', { month: 'long', year: 'numeric' }),
      avatar: form.name.trim().slice(0, 2).toUpperCase(),
    }
    setReviews((prev) => [newReview, ...prev])
    setForm({ name: '', role: '', rating: 0, comment: '' })
    setErrors({})
    setSubmitted(true)
    setShowForm(false)
    setTimeout(() => setSubmitted(false), 4000)
  }

  const avgRating = reviews.reduce((s, r) => s + r.rating, 0) / reviews.length

  return (
    <section className="bg-white py-24 lg:py-32" aria-labelledby="reviews-heading">
      <div className="container mx-auto px-4 lg:px-8">
        <SectionTitle
          tag="Testimonios"
          title="Lo que dicen nuestros pasajeros"
          description="Cada vuelo es una historia de excelencia. Descubra las experiencias de quienes han confiado en nosotros."
          centered
        />

        {/* Stats bar */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="flex flex-col sm:flex-row items-center justify-center gap-8 mt-10 mb-16 p-8 rounded-2xl bg-burgundy/5 border border-burgundy/10 shadow-[0_8px_30px_rgba(74,14,14,0.06)]"
        >
          <div className="text-center">
            <p className="font-mono text-5xl font-bold text-champagne leading-none">
              {avgRating.toFixed(1)}
            </p>
            <div className="flex justify-center mt-2 mb-1">
              <StarRating value={Math.round(avgRating)} readOnly />
            </div>
            <p className="text-sm text-burgundy/60 font-medium">Calificación promedio</p>
          </div>
          <div className="hidden sm:block w-px h-16 bg-burgundy/10" />
          <div className="text-center">
            <p className="font-mono text-5xl font-bold text-champagne leading-none">{reviews.length}</p>
            <p className="text-sm text-burgundy/60 font-medium mt-3">Reseñas verificadas</p>
          </div>
          <div className="hidden sm:block w-px h-16 bg-burgundy/10" />
          <div className="text-center">
            <p className="font-mono text-5xl font-bold text-champagne leading-none">98%</p>
            <p className="text-sm text-burgundy/60 font-medium mt-3">Pasajeros satisfechos</p>
          </div>
        </motion.div>

        {/* Review Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-14">
          <AnimatePresence>
            {reviews.map((review, i) => (
              <motion.article
                key={review.id}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ delay: i * 0.07, duration: 0.5 }}
                viewport={{ once: true }}
                className="bg-white rounded-2xl p-8 flex flex-col gap-5 shadow-[0_20px_50px_rgba(74,14,14,0.08)] border border-burgundy/5 hover:shadow-[0_24px_60px_rgba(74,14,14,0.14)] transition-shadow duration-300"
              >
                {/* Stars + date */}
                <div className="flex items-center justify-between">
                  <StarRating value={review.rating} readOnly />
                  <span className="text-xs text-burgundy/40 font-bold uppercase tracking-wider">
                    {review.date}
                  </span>
                </div>

                {/* Comment */}
                <blockquote className="text-burgundy/70 text-sm leading-relaxed flex-1 font-medium italic">
                  &ldquo;{review.comment}&rdquo;
                </blockquote>

                {/* Author */}
                <div className="flex items-center gap-4 pt-4 border-t border-burgundy/8">
                  <div className="w-11 h-11 rounded-full bg-gradient-to-br from-champagne/80 to-champagne flex items-center justify-center shrink-0 shadow-sm">
                    <span className="text-background font-bold text-sm">{review.avatar}</span>
                  </div>
                  <div>
                    <p className="font-serif text-champagne font-bold text-sm">{review.name}</p>
                    <p className="text-xs text-burgundy/50 font-medium">{review.role}</p>
                  </div>
                </div>
              </motion.article>
            ))}
          </AnimatePresence>
        </div>

        {/* CTA + success toast */}
        <div className="flex flex-col items-center gap-4">
          <AnimatePresence>
            {submitted && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 10 }}
                className="flex items-center gap-3 px-6 py-3 rounded-full bg-champagne/10 border border-champagne/30 text-champagne font-bold text-sm"
              >
                <Icon icon="ph:check-circle-fill" className="w-5 h-5" />
                ¡Gracias! Tu reseña fue publicada exitosamente.
              </motion.div>
            )}
          </AnimatePresence>

          <motion.button
            whileHover={{ scale: 1.04 }}
            whileTap={{ scale: 0.97 }}
            onClick={() => setShowForm((v) => !v)}
            className="flex items-center gap-3 bg-burgundy text-white px-10 py-4 rounded-none text-sm uppercase tracking-[0.2em] font-bold hover:bg-burgundy/90 transition-all duration-300 shadow-[0_8px_30px_rgba(74,14,14,0.25)]"
          >
            <Icon icon={showForm ? 'ph:x-light' : 'ph:pencil-simple-line-light'} className="w-5 h-5" />
            {showForm ? 'Cancelar' : 'Dejar mi reseña'}
          </motion.button>
        </div>

        {/* Review Form */}
        <AnimatePresence>
          {showForm && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
              className="overflow-hidden mt-12"
            >
              <form
                onSubmit={handleSubmit}
                className="max-w-2xl mx-auto bg-white rounded-2xl p-8 lg:p-12 shadow-[0_20px_60px_rgba(74,14,14,0.1)] border border-burgundy/10"
                aria-label="Formulario de reseña"
              >
                <h3 className="font-serif text-2xl text-champagne mb-1">Tu experiencia importa</h3>
                <p className="text-burgundy/60 text-sm font-medium mb-8">
                  Comparte cómo fue tu vuelo con nosotros.
                </p>

                <div className="space-y-6">
                  {/* Nombre */}
                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-burgundy/60 mb-2">
                      Nombre completo *
                    </label>
                    <input
                      type="text"
                      id="review-name"
                      value={form.name}
                      onChange={(e) => setForm({ ...form, name: e.target.value })}
                      placeholder="Tu nombre"
                      className="w-full px-4 py-3.5 rounded-xl bg-burgundy/5 border border-burgundy/10 text-burgundy placeholder:text-burgundy/30 focus:outline-none focus:ring-2 focus:ring-burgundy/30 transition"
                    />
                    {errors.name && (
                      <p className="text-red-500 text-xs mt-1 font-medium">{errors.name}</p>
                    )}
                  </div>

                  {/* Cargo / Empresa */}
                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-burgundy/60 mb-2">
                      Cargo o empresa <span className="font-normal normal-case text-burgundy/40">(opcional)</span>
                    </label>
                    <input
                      type="text"
                      id="review-role"
                      value={form.role}
                      onChange={(e) => setForm({ ...form, role: e.target.value })}
                      placeholder="Ej. CEO, Empresario…"
                      className="w-full px-4 py-3.5 rounded-xl bg-burgundy/5 border border-burgundy/10 text-burgundy placeholder:text-burgundy/30 focus:outline-none focus:ring-2 focus:ring-burgundy/30 transition"
                    />
                  </div>

                  {/* Calificación */}
                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-burgundy/60 mb-3">
                      Calificación *
                    </label>
                    <StarRating value={form.rating} onChange={(v) => setForm({ ...form, rating: v })} />
                    {errors.rating && (
                      <p className="text-red-500 text-xs mt-1 font-medium">{errors.rating}</p>
                    )}
                  </div>

                  {/* Comentario */}
                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-burgundy/60 mb-2">
                      Tu reseña *
                    </label>
                    <textarea
                      id="review-comment"
                      value={form.comment}
                      onChange={(e) => setForm({ ...form, comment: e.target.value })}
                      placeholder="Cuéntanos sobre tu experiencia de vuelo…"
                      rows={4}
                      className="w-full px-4 py-3.5 rounded-xl bg-burgundy/5 border border-burgundy/10 text-burgundy placeholder:text-burgundy/30 focus:outline-none focus:ring-2 focus:ring-burgundy/30 transition resize-none"
                    />
                    {errors.comment && (
                      <p className="text-red-500 text-xs mt-1 font-medium">{errors.comment}</p>
                    )}
                  </div>

                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    type="submit"
                    className="w-full flex items-center justify-center gap-3 bg-champagne text-background font-bold py-4 rounded-none uppercase tracking-[0.2em] text-sm hover:bg-champagne/90 transition-all duration-300 shadow-[0_8px_30px_rgba(212,196,131,0.3)]"
                  >
                    <Icon icon="ph:paper-plane-right-light" className="w-5 h-5" />
                    Publicar reseña
                  </motion.button>
                </div>
              </form>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  )
}
