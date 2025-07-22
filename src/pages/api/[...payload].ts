// src/pages/api/[...payload].ts

import { createPayloadHandler } from '@payloadcms/next/api'
import type { NextApiRequest, NextApiResponse } from 'next'
import config from '@/payload.config'

export const config = {
  api: {
    bodyParser: false, // Payload сам обробляє потік запиту
  },
}

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  return createPayloadHandler({ config })(req, res)
}
