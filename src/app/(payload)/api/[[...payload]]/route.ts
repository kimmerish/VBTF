// src/app/(payload)/api/[[...payload]]/route.ts
import configPromise from '@payload-config' // шлях з tsconfig paths
import { createPayloadRequest } from '@payloadcms/next/utilities'
import { NextRequest } from 'next/server'

// runtime для Payload (йому потрібен Node)
export const runtime = 'nodejs'

// Узагальнений хендлер для всіх методів
async function handler(request: NextRequest, context: { params: { payload?: string[] } }) {
  const config = await configPromise

  // Створюємо "req" у форматі, який очікує Payload
  const req = await createPayloadRequest({
    config,
    request,
    params: context.params,
  })

  // Динамічно підтягуємо REST router з пакету (працює на всіх останніх версіях)
  const { default: rest } = await import('@payloadcms/next/dist/routes/rest/index.js')
  // якщо немає rest — див. альтернативу нижче
  return rest({ config })(req)
}

// Експортуємо той самий хендлер для всіх HTTP методів
export const GET = handler
export const POST = handler
export const PUT = handler
export const PATCH = handler
export const DELETE = handler
export const OPTIONS = handler
export const HEAD = handler
