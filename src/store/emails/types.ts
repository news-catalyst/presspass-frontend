export const DELETE_EMAIL = 'DELETE_EMAIL';
export const UPSERT_EMAIL = 'UPSERT_EMAIL';
export const UPSERT_EMAILS = 'UPSERT_EMAILS';

export interface Email {
  email: string;
  primary?: boolean;
  verified?: boolean;
}

export interface EmailState {
  emails: Email[];
  hydrated: boolean;
}

export interface UpsertEmailAction {
  type: typeof UPSERT_EMAIL;
  email: Email;
}

export interface UpsertEmailsAction {
  type: typeof UPSERT_EMAILS;
  emails: Email[];
}

export interface DeleteEmailAction {
  type: typeof DELETE_EMAIL;
  email: Email;
}

export type EmailAction =
  | UpsertEmailAction
  | UpsertEmailsAction
  | DeleteEmailAction;
