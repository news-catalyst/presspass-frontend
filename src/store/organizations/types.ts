export const UPSERT_ORGANIZATION = 'UPSERT_ORGANIZATION';
export const UPSERT_ORGANIZATIONS = 'UPSERT_ORGANIZATIONS';
export const DELETE_ORGANIZATION = 'DELETE_ORGANIZATION';
export const UPSERT_INVITATION = 'UPSERT_INVITATION';
export const UPSERT_MEMBERSHIP = 'UPSERT_MEMBERSHIP';

export interface Organization {
  uuid: string;
  name: string;
  slug: string;
  plan: string;
  max_users: number;
  individual: boolean;
  private: boolean;
  update_on: Date;
  updated_at: Date;
  payment_failed: boolean;
  avatar: string;
}

export interface OrganizationState {
  organizations: { [id: number]: Organization };
  hydrated: boolean;
}

export interface Invitation {
  organization: number;
  email: string;
  user: number;
  request: boolean;
  created_at: Date;
  accepted_at: Date;
  rejected_at: Date;
}

export interface UpsertOrganizationAction {
  type: typeof UPSERT_ORGANIZATION;
  organization: Organization;
}

export interface UpsertOrganizationsAction {
  type: typeof UPSERT_ORGANIZATIONS;
  organizations: Organization[];
}

export interface DeleteOrganizationAction {
  type: typeof DELETE_ORGANIZATION;
  organization: Organization;
}

export type OrganizationAction =
  | UpsertOrganizationAction
  | UpsertOrganizationsAction
  | DeleteOrganizationAction;
