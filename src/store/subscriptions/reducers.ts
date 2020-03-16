import {
  SubscriptionAction,
  UPSERT_SUBSCRIPTION,
  SubscriptionState,
  UPSERT_SUBSCRIPTIONS,
  DELETE_SUBSCRIPTION
} from './types';

const initialState: SubscriptionState = {
  subscriptions: {},
  hydrated: false
};

export function subscriptionReducers(
  state = initialState,
  action: SubscriptionAction
): SubscriptionState {
  switch (action.type) {
    case UPSERT_SUBSCRIPTIONS: {
      let incomingObject: SubscriptionState = {
        subscriptions: Object.assign({}, state.subscriptions),
        hydrated: true
      };
      for (let subscription of action.subscriptions) {
        incomingObject.subscriptions[subscription.id] = subscription;
      }
      return Object.assign({}, state, incomingObject);
    }
    case UPSERT_SUBSCRIPTION: {
      let incomingObject: SubscriptionState = {
        subscriptions: Object.assign({}, state.subscriptions),
        hydrated: true
      };
      incomingObject.subscriptions[action.subscription.id] =
        action.subscription;
      return Object.assign({}, state, incomingObject);
    }
    case DELETE_SUBSCRIPTION: {
      let incomingObject: SubscriptionState = {
        subscriptions: Object.assign({}, state.subscriptions),
        hydrated: true
      };
      delete incomingObject.subscriptions[action.subscription.id];
      return Object.assign({}, state, incomingObject);
    }
    default:
      return state;
  }
}
