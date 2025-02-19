import { redis } from '../redis/client'

interface GetRankingPositionBySubscriberIdParams {
  subscriberId: string
}

export async function getRankingPositionBySubscriberId({
  subscriberId,
}: GetRankingPositionBySubscriberIdParams) {
  const rank = await redis.zrevrank('referral:ranking', subscriberId)

  if (rank === null) {
    return { position: null }
  }

  return { position: rank + 1 }
}
