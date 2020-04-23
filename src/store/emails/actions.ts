import {
  UPSERT_EMAIL,
  UPSERT_EMAILS,
  Email,
  DELETE_EMAIL,
  DeleteEmailAction,
  UpsertEmailAction,
  UpsertEmailsAction
} from './types';

export function upsertEmail(email: Email): UpsertEmailAction {
  return {
    type: UPSERT_EMAIL,
    email: email,
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
export function upsertEmails(
  emails: Email[],
): UpsertEmailsAction {
  return {
    type: UPSERT_EMAILS,
    emails: emails,
  };
}

export function deleteEmail(
  email: Email
): DeleteEmailAction {
  return {
    type: DELETE_EMAIL,
    email: email
  };
}
