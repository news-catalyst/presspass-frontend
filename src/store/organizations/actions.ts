import {
  UPSERT_ORGANIZATION,
  Organization,
  UPSERT_ORGANIZATIONS,
  DELETE_ORGANIZATION,
  DeleteOrganizationAction,
  UpsertOrganizationAction,
  UpsertOrganizationsAction
} from './types';

export function upsertOrganization(
  organization: Organization
): UpsertOrganizationAction {
  return {
    type: UPSERT_ORGANIZATION,
    organization: organization
  };
}

// This action is necessary because if one wants to
// upsert multiple organizations into the store at load time,
// calling each `upsertOrganization` individually would cause
// the 'hydrated' field to be set to `true` after the first
// upsert (but before all the data has been loaded). This
// can cause issues when there are multiple organizations,
// as a view might be waiting for `hydrated` to be `true`
// before displaying data from a particular organization. If
// `hydrated` is set to `true` too early, this can cause
// these views to fail.
export function upsertOrganizations(
  organizations: Organization[]
): UpsertOrganizationsAction {
  console.log(organizations);
  return {
    type: UPSERT_ORGANIZATIONS,
    organizations: organizations
  };
}

export function deleteOrganization(
  organization: Organization
): DeleteOrganizationAction {
  return {
    type: DELETE_ORGANIZATION,
    organization: organization
  };
}
