// next.config.mjs
import path from 'path'
import { createRequire } from 'module'
import { withPayload } from '@payloadcms/next/withPayload'

const require = createRequire(import.meta.url)
// Шлях до пакета, щоб зібрати alias нижче (якщо він вам потрібен)
const payloadNextEntry = require.resolve('@payloadcms/next/withPayload')

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  experimental: {
    reactCompiler: false, // рекомендує Payload
  },
  webpack: (config) => {
    // Ваш extensionAlias
    config.resolve.extensionAlias = {
      '.cjs': ['.cts', '.cjs'],
      '.mjs': ['.mts', '.mjs'],
      '.js': ['.ts', '.tsx', '.js', '.jsx'],
    }

    // Якщо потрібен alias для clientFiles Payload (можна вилучити, якщо без нього працює)
    config.resolve.alias = {
      ...config.resolve.alias,
      '@payloadcms/next/dist/clientFiles': path.join(
        path.dirname(payloadNextEntry),
        'dist/clientFiles',
      ),
    }

    return config
  },
}

export default withPayload(nextConfig)
