// src/payload.config.ts
import path from 'path'
import { fileURLToPath } from 'url'
import { buildConfig } from 'payload'
import { sqliteAdapter } from '@payloadcms/db-sqlite'
import { lexicalEditor } from '@payloadcms/richtext-lexical'

import { Users } from './collections/Users'
import { Pages } from './collections/Pages'
import { Media } from './collections/Media'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

export default buildConfig({
  serverURL: process.env.SERVER_URL ?? 'http://localhost:3000',
  secret: process.env.PAYLOAD_SECRET ?? 'change_me',

  editor: lexicalEditor(), // ← Глобальний редактор для всіх richText

  db: sqliteAdapter({
    client: {
      url: process.env.DATABASE_URI || process.env.DATABASE_URL || 'file:./vbtf.db',
    },
    push: false,
    migrationDir: path.resolve(__dirname, 'migrations'),
  }),

  routes: {
    api: '/api',
    admin: '/admin',
  },

  admin: {
    user: Users.slug,
    importMap: { baseDir: __dirname },
  },

  collections: [Users, Pages, Media],
})
