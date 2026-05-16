import { NextResponse } from 'next/server'
import { writeClient } from '@/sanity/lib/write-client'

export async function POST(req: Request) {
  try {
    const { name, role, rating, content } = await req.json()

    if (!name || !rating || !content) {
      return NextResponse.json(
        { error: 'Faltan campos obligatorios' },
        { status: 400 }
      )
    }

    const doc = {
      _type: 'testimonial',
      name,
      role: role || 'Pasajero Verificado',
      rating,
      content,
      status: 'pending',
      date: new Date().toISOString(),
    }

    const result = await writeClient.create(doc)

    return NextResponse.json({ success: true, id: result._id })
  } catch (error) {
    console.error('Error submitting testimonial:', error)
    return NextResponse.json(
      { error: 'Error al procesar el testimonio' },
      { status: 500 }
    )
  }
}
