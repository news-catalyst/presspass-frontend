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
  organization: string,
  subscription: Subscription
): UpsertSubscriptionAction {
  return {
    type: UPSERT_SUBSCRIPTION,
    subscription: subscription,
    organization: organization
  };
}

export function upsertSubscriptions(
  organization: string,
  subscriptions: Subscription[]
): UpsertSubscriptionsAction {
  return {
    type: UPSERT_SUBSCRIPTIONS,
    subscriptions: subscriptions,
    organization: organization
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
