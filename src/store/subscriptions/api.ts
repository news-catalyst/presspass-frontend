import { AppActions } from '..';
import {
  checkAuth,
  cfetch,
  validate,
  ItemizedResponse,
  notify,
  GET,
  JSON_POST,
  DELETE
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
  plan: number,
  organization: string,
  actions: AppActions
) => {
  return (
    cfetch(
      `${process.env.REACT_APP_SQUARELET_API_URL}/organizations/${organization}/subscriptions/`,
      JSON_POST({ plan: plan })
    )
      .then(checkAuth(actions))
      // Cannot call upsert subscription here, because IDs are assigned on the server side
      .then(response =>
        validate(response, (status: ItemizedResponse) => {
          actions.upsertSubscription(status.body as Subscription);
          notify(
            `Successfully created subscription for organization ${organization} to plan ${plan}.`,
            'success'
          );
        })
      )
  );
};

export const deleteSubscription = (
  subscription: Subscription,
  actions: AppActions
) =>
  cfetch(
    `${process.env.REACT_APP_SQUARELET_API_URL}/organizations/${subscription.organization.uuid}/subscriptions/${subscription.id}`,
    DELETE
  )
    .then(checkAuth(actions))
    .then(response =>
      validate(response, () => {
        actions.deleteSubscription(subscription);
        notify(
          `Successfully deleted ${subscription.id} from organization ${subscription.organization.name}.`,
          'success'
        );
      })
    );
