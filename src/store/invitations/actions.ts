import {
  UPSERT_INVITATION,
  UPSERT_INVITATIONS,
  Invitation,
  DELETE_INVITATION,
  DeleteInvitationAction,
  UpsertInvitationAction,
  UpsertInvitationsAction
} from './types';

export function upsertInvitation(
  invitation: Invitation,
  organization_id: string
): UpsertInvitationAction {
  return {
    type: UPSERT_INVITATION,
    invitation: invitation,
    organization_id: organization_id
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
export function upsertInvitations(
  invitations: Invitation[]
): UpsertInvitationsAction {
  return {
    type: UPSERT_INVITATIONS,
    invitations: invitations
  };
}

export function deleteInvitation(
  invitation: Invitation
): DeleteInvitationAction {
  return {
    type: DELETE_INVITATION,
    invitation: invitation
  };
}
