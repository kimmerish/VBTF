// src/payload.config.ts
import type { Config } from 'payload'
import path from 'path'
import { Users } from './collections/Users'
import { resolve } from 'path'
import nodemailer from 'nodemailer'

const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST || 'smtp.gmail.com',
  port: Number(process.env.SMTP_PORT) || 587,
  secure: false,
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS,
  },
})

const config: Config = {
  serverURL: 'http://localhost:3000',
  admin: {
    user: Users.slug,
  },
  collections: [Users],
  email: {
    fromName: 'Mc UA',
    fromAddress: 'noreply@mc-ua.co',
    transport: transporter,
  },
  typescript: {
    outputFile: path.resolve(__dirname, '../payload-types.ts'),
  },
  graphQL: {
    disable: false,
  },
  db: {
    adapter: 'sqlite',
    url: path.resolve(__dirname, '../vbtf.db'), // або './vbtf.db'
  },
}

export default config
