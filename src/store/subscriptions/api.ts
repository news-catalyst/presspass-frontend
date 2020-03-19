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

export const fetchSubscriptionsForOrganization = (
  actions: AppActions,
  uuid: string
) =>
  cfetch(
    `${process.env.REACT_APP_SQUARELET_API_URL}/organizations/${uuid}/subscriptions/?expand=plan`,
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

export const createPaidSubscription = (
  plan: number,
  organization: string,
  token: string,
  actions: AppActions
) => {
  return (
    cfetch(
      `${process.env.REACT_APP_SQUARELET_API_URL}/organizations/${organization}/subscriptions/`,
      JSON_POST({ plan: plan, token: token })
    )
      .then(checkAuth(actions))
      .then(response =>
        validate(response, (status: ItemizedResponse) => {
          actions.upsertSubscription(status.body as Subscription);
          notify(
            `Successfully created paid subscription for organization ${organization} to plan ${plan} with token ${token}.`,
            'success'
          );
        })
      )
  );
};

export const deleteSubscription = (
  subscription: Subscription,
  organization: string,
  actions: AppActions
) =>
  cfetch(
    `${process.env.REACT_APP_SQUARELET_API_URL}/organizations/${organization}/subscriptions/${subscription.id}`,
    DELETE
  )
    .then(checkAuth(actions))
    .then(response =>
      validate(response, () => {
        actions.deleteSubscription(subscription);
        notify(
          `Successfully deleted subscription ID#${subscription.id} from organization ${organization}.`,
          'success'
        );
      })
    );
