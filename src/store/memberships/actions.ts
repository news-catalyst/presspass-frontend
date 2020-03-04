import {
  UPSERT_MEMBERSHIP,
  UPSERT_MEMBERSHIPS,
  Membership,
  DELETE_MEMBERSHIP,
  DeleteMembershipAction,
  UpsertMembershipAction,
  UpsertMembershipsAction
} from './types';

export function upsertMembership(
  membership: Membership
): UpsertMembershipAction {
  return {
    type: UPSERT_MEMBERSHIP,
    membership: membership
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
export function upsertMemberships(
  uuid: string,
  memberships: Membership[]
): UpsertMembershipsAction {
  //ensure each membership has a user id
  Object.values(memberships).map((membership: Membership) => {
    membership.user = uuid;
  });
  return {
    type: UPSERT_MEMBERSHIPS,
    memberships: memberships
  };
}

export function deleteMembership(
  membership: Membership
): DeleteMembershipAction {
  return {
    type: DELETE_MEMBERSHIP,
    membership: membership
  };
}
