import { AppActions } from '..';
import {
  checkAuth,
  cfetch,
  validate,
  ItemizedResponse,
  notify,
  GET,
  PATCH,
  POST,
  DELETE
} from '../../utils';
import { Entitlement, EntitlementState } from './types';

const serializeEntitlement = (entitlement: Entitlement) => ({
  id: entitlement.id,
  name: entitlement.name || '',
  description: entitlement.description || ''
  // Explicitly setting each field is necessary here, because
  // not all of the fields in entitlement are write-available, and
  // including them in the request would result in a 400 response.
});

export const fetchEntitlements = (actions: AppActions) =>
  cfetch(
    `${process.env.REACT_APP_SQUARELET_API_URL}/entitlements/?expand=client&subscribed=true`,
    GET
  )
    .then(checkAuth(actions))
    .then(response => response.json())
    .then(data => Promise.all([actions.upsertEntitlements(data.results)]))
    .catch(error => {
      console.error('API Error fetchEntitlements', error, error.code);
    });

export const ensureEntitlements = (
  actions: AppActions,
  entitlements: EntitlementState
) => {
  if (!entitlements.hydrated) {
    return fetchEntitlements(actions);
  }
};

export const updateEntitlement = (
  entitlement: Entitlement,
  actions: AppActions
) => {
  let formData = new FormData();
  let packagedEntitlement: any = serializeEntitlement(entitlement);
  for (let key of Object.keys(packagedEntitlement)) {
    formData.append(key, packagedEntitlement[key]);
  }
  return cfetch(
    `${process.env.REACT_APP_SQUARELET_API_URL}/entitlements/${entitlement.id}/`,
    PATCH(formData)
  )
    .then(checkAuth(actions))
    .then(response =>
      validate(response, (status: ItemizedResponse) => {
        actions.upsertEntitlement(status.body as Entitlement);
        notify(`Successfully updated ${entitlement.name}.`, 'success');
      })
    );
};

export const createEntitlement = (
  entitlement: Entitlement,
  actions: AppActions
) => {
  let formData = new FormData();
  let packagedEntitlement: any = serializeEntitlement(entitlement);
  for (let key of Object.keys(packagedEntitlement)) {
    formData.append(key, packagedEntitlement[key]);
  }
  return (
    cfetch(
      `${process.env.REACT_APP_SQUARELET_API_URL}/entitlements/`,
      POST(formData)
    )
      .then(checkAuth(actions))
      // Cannot call upsert entitlement here, because IDs are assigned on the server side
      .then(response =>
        validate(response, (status: ItemizedResponse) => {
          actions.upsertEntitlement(status.body as Entitlement);
          notify(`Successfully created ${entitlement.name}.`, 'success');
        })
      )
  );
};

export const deleteEntitlement = (
  entitlement: Entitlement,
  actions: AppActions
) =>
  cfetch(
    `${process.env.REACT_APP_SQUARELET_API_URL}/entitlements/${entitlement.id}`,
    DELETE
  )
    .then(checkAuth(actions))
    .then(response =>
      validate(response, () => {
        actions.deleteEntitlement(entitlement);
        notify(`Successfully deleted ${entitlement.name}.`, 'success');
      })
    );
