import { redis } from '../redis/client'

interface GetInviteClicksBySubscriberIdParams {
  subscriberId: string
}

export async function getInviteClicksBySubscriberId({
  subscriberId,
}: GetInviteClicksBySubscriberIdParams) {
  const count = await redis.hget('referral:access-count', subscriberId)

  return { count: count ? parseInt(count) : 0 }
}
