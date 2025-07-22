// src/collections/Users.ts
import type { CollectionConfig } from 'payload'

export const Users: CollectionConfig = {
  slug: 'users',
  auth: {
    tokenExpiration: 60 * 60 * 24, // 24 години
    verify: true, // верифікація email
    maxLoginAttempts: 5,
    lockTime: 60 * 1000, // 1 хв
    useAPIKey: false,
  },
  admin: {
    useAsTitle: 'email',
  },

  access: {
    create: () => true, // дозволяє гостям створити першого користувача
  },
  fields: [
    {
      name: 'name',
      type: 'text',
      required: true,
    },
    {
      name: 'role',
      type: 'select',
      options: [
        { label: 'User', value: 'user' },
        { label: 'Admin', value: 'admin' },
      ],
      defaultValue: 'user',
      required: true,
    },
  ],
}
