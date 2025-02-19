import { eq } from 'drizzle-orm'
import { db } from '../drizzle/client'
import { subscriptions } from '../drizzle/schema/subscriptions'
import { redis } from '../redis/client'

export async function getRanking() {
  const result = await redis.zrevrange('referral:ranking', 0, 2, 'WITHSCORES')

  const ranking: {
    id: string
    name: string
    score: number
  }[] = []

  for (let i = 0; i < result.length; i += 2) {
    const subscriber = await db
      .select()
      .from(subscriptions)
      .where(eq(subscriptions.id, result[i]))

    ranking.push({
      id: result[i],
      name: subscriber[0].name,
      score: Number(result[i + 1]),
    })
  }

  return { ranking }
}
