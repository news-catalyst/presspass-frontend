import { Organization } from '../organizations/types';

export const DELETE_INVITATION = 'DELETE_INVITATION';
export const UPSERT_INVITATION = 'UPSERT_INVITATION';
export const UPSERT_INVITATIONS = 'UPSERT_INVITATIONS';

export interface Invitation {
  uuid: number;
  organization: Organization;
  user: number;
  email: string;
  request: boolean;
  created_at: Date;
  accepted_at: Date;
  rejected_at: Date;
  accept: boolean;
  reject: boolean;
}

export interface InvitationState {
  invitations: { [id: string]: Invitation[] };
  hydrated: boolean;
}

export interface UpsertInvitationAction {
  type: typeof UPSERT_INVITATION;
  invitation: Invitation;
  organization_id: string;
}

export interface UpsertInvitationsAction {
  type: typeof UPSERT_INVITATIONS;
  invitations: Invitation[];
}

export interface DeleteInvitationAction {
  type: typeof DELETE_INVITATION;
  invitation: Invitation;
}

export type InvitationAction =
  | UpsertInvitationAction
  | UpsertInvitationsAction
  | DeleteInvitationAction;
