// src/payload.config.ts
import path from 'path'
import { fileURLToPath } from 'url'
import { buildConfig } from 'payload'
import { sqliteAdapter } from '@payloadcms/db-sqlite'
import { lexicalEditor } from '@payloadcms/richtext-lexical'
import { emailAdapter } from '@payloadcms/email-nodemailer'

import { buildConfig } from 'payload/config'
import path from 'path'
import { Users } from './src/collections/Users'
import { Media } from './src/collections/Media'
import { Pages } from './src/collections/Pages'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

export default buildConfig({
  serverURL: process.env.SERVER_URL || 'http://localhost:3000',
  secret: process.env.PAYLOAD_SECRET || 'changeme',

  editor: lexicalEditor(),

  db: {
    adapter: sqliteAdapter({
      // ✅ Шлях до бази даних SQLite
      filePath: path.resolve(__dirname, '../vbtf.db'),
    }),
  },

  email: {
    fromName: 'Mc UA',
    fromAddress: 'noreply@mc-ua.co',
    adapter: emailAdapter({
      transportOptions: {
        host: process.env.SMTP_HOST || 'smtp.gmail.com',
        port: Number(process.env.SMTP_PORT) || 587,
        secure: false,
        auth: {
          user: process.env.SMTP_USER || '',
          pass: process.env.SMTP_PASS || '',
        },
      },
    }),
  },

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
