import { AppActions } from '..';
import {
  checkAuth,
  cfetch,
  validate,
  ItemizedResponse,
  notify,
  GET,
  JSON_POST
} from '../../utils';
import { Subscription, SubscriptionState } from './types';

const serializeSubscription = (subscription: Subscription) => ({
  plan: subscription.plan,
  organization: subscription.organization
  // Explicitly setting each field is necessary here, because
  // not all of the fields in subscription are write-available, and
  // including them in the request would result in a 400 response.
});

export const fetchSubscriptionsForOrganization = (
  actions: AppActions,
  uuid: string
) =>
  cfetch(
    `${process.env.REACT_APP_SQUARELET_API_URL}/organizations/${uuid}/subscriptions/`,
    GET
  )
    .then(checkAuth(actions))
    .then(response => response.json())
    .then(data => Promise.all([actions.upsertSubscriptions(data.results)]))
    .catch(error => {
      console.error(
        'API Error fetchSubscriptionsForOrganization',
        error,
        error.code
      );
    });

export const ensureSubscriptionsForOrganization = (
  actions: AppActions,
  uuid: string,
  subscriptions: SubscriptionState
) => {
  if (!subscriptions.hydrated) {
    return fetchSubscriptionsForOrganization(actions, uuid);
  }
};

export const createSubscription = (
  subscription: Subscription,
  actions: AppActions
) => {
  let formData = new FormData();
  let packagedSubscription: any = serializeSubscription(subscription);
  for (let key of Object.keys(packagedSubscription)) {
    formData.append(key, packagedSubscription[key]);
  }
  return (
    cfetch(
      `${process.env.REACT_APP_SQUARELET_API_URL}/organizations/${subscription.organization}/subscriptions/`,
      JSON_POST(formData)
    )
      .then(checkAuth(actions))
      // Cannot call upsert subscription here, because IDs are assigned on the server side
      .then(response =>
        validate(response, (status: ItemizedResponse) => {
          actions.upsertSubscription(status.body as Subscription);
          notify(
            `Successfully created subscription for organization ${subscription.organization} to plan ${subscription.plan}.`,
            'success'
          );
        })
      )
  );
};
