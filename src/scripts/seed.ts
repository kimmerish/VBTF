// src/scripts/seed.ts
import 'dotenv/config'
import { getPayload } from 'payload'
import config from '../payload.config'

// Допоміжна upsert-функція
async function upsert<T>(
  payload: Awaited<ReturnType<typeof getPayload>>,
  collection: string,
  where: any,
  data: T,
) {
  const found = await payload.find({ collection, where, limit: 1 })
  if (found.total) {
    return payload.update({ collection, id: found.docs[0].id, data })
  }
  return payload.create({ collection, data })
}

export default async function seed() {
  const payload = await getPayload({ config })

  // 1) Адмін
  await upsert(
    payload,
    'users',
    { email: { equals: 'admin@example.com' } },
    {
      email: 'admin@example.com',
      password: 'Admin123!',
      name: 'Admin',
      role: 'admin',
      _verified: true,
    },
  )

  // 2) Домашня сторінка
  await upsert(
    payload,
    'pages',
    { slug: { equals: 'home' } },
    {
      slug: 'home',
      title: 'Home',
      status: 'published',
      content: {
        intro: 'Welcome to V BTF!',
        blocks: [],
      },
    },
  )

  // 3) (Опційно) Додати медіа, якщо є файл
  // Можеш покласти зображення у /seed-assets/example.jpg
  /*
  import path from 'path'
  const imgPath = path.resolve(process.cwd(), 'seed-assets', 'example.jpg')
  try {
    await payload.create({
      collection: 'media',
      data: { altText: 'Example image' },
      filePath: imgPath,
    })
  } catch {}
  */

  console.log('✅ Seed finished')
}
