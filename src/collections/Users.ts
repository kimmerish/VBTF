// src/collections/Users.ts
import type { CollectionConfig } from 'payload'

export const Users: CollectionConfig = {
  slug: 'users',
  auth: {
    tokenExpiration: 60 * 60 * 24, // токен дійсний 24 години
    verify: true, // вимагати підтвердження email
    maxLoginAttempts: 5,
    lockTime: 60 * 1000, // блокувати на 1 хвилину після невдалих спроб
  },
  admin: {
    useAsTitle: 'email', // показувати email у списку юзерів
  },
  fields: [
    { name: 'name', type: 'text', required: true },
    { name: 'role', type: 'text', required: true, defaultValue: 'user' },
    // Поля email і password створюються автоматично завдяки auth
  ],
}
