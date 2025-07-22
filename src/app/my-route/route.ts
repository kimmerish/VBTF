// src/app/my-route/route.ts

import { NextResponse } from 'next/server'
import { getPayload } from 'payload'
import payloadConfig from '@/payload.config'

export async function GET() {
  // Ініціалізуємо Payload CMS із вашою конфігурацією
  const payload = await getPayload({ config: payloadConfig })

  // Приклад: отримуємо всі документи з колекції "pages"
  const pages = await payload.find({
    collection: 'pages',
    depth: 0,
  })

  return NextResponse.json(pages)
}
