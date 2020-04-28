import {
  UPSERT_SUBSCRIPTION,
  UPSERT_SUBSCRIPTIONS,
  DELETE_SUBSCRIPTION,
  Subscription,
  UpsertSubscriptionAction,
  UpsertSubscriptionsAction,
  DeleteSubscriptionAction
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

export function deleteSubscription(
  subscription: Subscription
): DeleteSubscriptionAction {
  return {
    type: DELETE_SUBSCRIPTION,
    subscription: subscription
  };
}
