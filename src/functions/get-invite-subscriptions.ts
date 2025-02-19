import { redis } from '../redis/client'

interface GetInviteSubscriptionsBySubscriberIdParams {
  subscriberId: string
}

export async function getInviteSubscriptionsBySubscriberId({
  subscriberId,
}: GetInviteSubscriptionsBySubscriberIdParams) {
  const count = await redis.zscore('referral:ranking', subscriberId)

  return { count: count ? parseInt(count) : 0 }
}
