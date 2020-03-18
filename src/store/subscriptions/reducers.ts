import {
  SubscriptionAction,
  UPSERT_SUBSCRIPTION,
  SubscriptionState,
  UPSERT_SUBSCRIPTIONS,
  DELETE_SUBSCRIPTION
} from './types';

const initialState: SubscriptionState = {
  subscriptions: {},
  organization: '',
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
        organization: state.organization,
        hydrated: true
      };
      for (let subscription of action.subscriptions) {
        // use a composite key for the sub ID
        let subscriptionId = `${subscription.plan.id}-${action.organization}`;
        subscription.id = subscriptionId;
        // assigning the org ID here makes it easier to work with this data elsewhere
        // - it's not included by the API
        subscription.organization = action.organization;
        incomingObject.subscriptions[subscriptionId] = subscription;
      }
      return Object.assign({}, state, incomingObject);
    }
    case UPSERT_SUBSCRIPTION: {
      let incomingObject: SubscriptionState = {
        subscriptions: Object.assign({}, state.subscriptions),
        organization: state.organization,
        hydrated: true
      };
      // use a composite key for the sub ID based on the plan & org
      let subscriptionId = `${action.subscription.plan.id}-${action.organization}`;
      let subscription = action.subscription;
      subscription.id = subscriptionId;
      // assigning the org ID here makes it easier to work with this data elsewhere
      // - it's not included by the API
      subscription.organization = action.organization;
      incomingObject.subscriptions[subscriptionId] = subscription;
      return Object.assign({}, state, incomingObject);
    }
    case DELETE_SUBSCRIPTION: {
      let incomingObject: SubscriptionState = {
        subscriptions: Object.assign({}, state.subscriptions),
        organization: 'foo',
        hydrated: true
      };
      let subscriptionId = `${action.subscription.plan.id}-${action.subscription.organization}`;
      delete incomingObject.subscriptions[subscriptionId];
      return Object.assign({}, state, incomingObject);
    }
    default:
      return state;
  }
}
