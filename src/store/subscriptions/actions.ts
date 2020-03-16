import {
  UPSERT_SUBSCRIPTION,
  UPSERT_SUBSCRIPTIONS,
  Subscription,
  UpsertSubscriptionAction,
  UpsertSubscriptionsAction
} from './types';

export function upsertSubscription(
  subscription: Subscription
): UpsertSubscriptionAction {
  return {
    type: UPSERT_SUBSCRIPTION,
    subscription: subscription
  };
}

export function upsertSubscriptions(
  subscriptions: Subscription[]
): UpsertSubscriptionsAction {
  return {
    type: UPSERT_SUBSCRIPTIONS,
    subscriptions: subscriptions
  };
}
