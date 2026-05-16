import { NextResponse } from 'next/server'
import { writeClient } from '@/sanity/lib/write-client'

export async function POST(req: Request) {
  try {
    const data = await req.json()

    const doc = {
      _type: 'quotation',
      name: data.name,
      email: data.email,
      phone: data.phone,
      origin: data.origin,
      destination: data.destination,
      date: data.date,
      passengers: parseInt(data.passengers) || 1,
      tripType: data.tripType,
      status: 'new',
      notes: data.notes || '',
    }

    const result = await writeClient.create(doc)

    return NextResponse.json({ success: true, id: result._id })
  } catch (error) {
    console.error('Error submitting quotation:', error)
    return NextResponse.json(
      { error: 'Error al procesar la cotización' },
      { status: 500 }
    )
  }
}
