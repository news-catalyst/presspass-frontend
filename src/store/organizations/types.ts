export const UPSERT_ORGANIZATION = 'UPSERT_ORGANIZATION';
export const UPSERT_ORGANIZATIONS = 'UPSERT_ORGANIZATIONS';
export const DELETE_ORGANIZATION = 'DELETE_ORGANIZATION';

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
  avatar?: string | File;
}

export interface OrganizationState {
  organizations: { [id: number]: Organization };
  hydrated: boolean;
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
