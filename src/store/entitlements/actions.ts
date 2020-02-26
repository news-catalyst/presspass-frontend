import {
  UPSERT_ENTITLEMENT,
  Entitlement,
  UPSERT_ENTITLEMENTS,
  DELETE_ENTITLEMENT,
  DeleteEntitlementAction,
  UpsertEntitlementAction,
  UpsertEntitlementsAction
} from "./types";

export function upsertEntitlement(entitlement: Entitlement): UpsertEntitlementAction {
  return {
    type: UPSERT_ENTITLEMENT,
    entitlement: entitlement
  };
}

// This action is necessary because if one wants to
// upsert multiple entitlements into the store at load time,
// calling each `upsertEntitlement` individually would cause
// the 'hydrated' field to be set to `true` after the first
// upsert (but before all the data has been loaded). This
// can cause issues when there are multiple entitlements,
// as a view might be waiting for `hydrated` to be `true`
// before displaying data from a particular entitlement. If
// `hydrated` is set to `true` too early, this can cause
// these views to fail.
export function upsertEntitlements(entitlements: Entitlement[]): UpsertEntitlementsAction {
  return {
    type: UPSERT_ENTITLEMENTS,
    entitlements: entitlements
  };
}

export function deleteEntitlement(entitlement: Entitlement): DeleteEntitlementAction {
  return {
    type: DELETE_ENTITLEMENT,
    entitlement: entitlement
  };
}
