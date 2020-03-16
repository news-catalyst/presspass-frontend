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

// This action is necessary because if one wants to
// upsert multiple subscriptions into the store at load time,
// calling each `upsertSubscription` individually would cause
// the 'hydrated' field to be set to `true` after the first
// upsert (but before all the data has been loaded). This
// can cause issues when there are multiple subscriptions,
// as a view might be waiting for `hydrated` to be `true`
// before displaying data from a particular subscription. If
// `hydrated` is set to `true` too early, this can cause
// these views to fail.
export function upsertSubscriptions(
  uuid: string,
  subscriptions: Subscription[]
): UpsertSubscriptionsAction {
  //ensure each subscription has a user id
  Object.values(subscriptions).map((subscription: Subscription) => {
    subscription.user = uuid;
  });
  return {
    type: UPSERT_SUBSCRIPTIONS,
    subscriptions: subscriptions
  };
}
