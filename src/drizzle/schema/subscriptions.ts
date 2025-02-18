import { text, timestamp } from 'drizzle-orm/pg-core'
import { uuid } from 'drizzle-orm/pg-core'
import { pgTable } from 'drizzle-orm/pg-core'

export const subscriptions = pgTable('subscriptions', {
  id: uuid().primaryKey().defaultRandom(),
  name: text().notNull(),
  email: text().notNull().unique(),
  createdAt: timestamp('created_at').notNull().defaultNow(),
})
