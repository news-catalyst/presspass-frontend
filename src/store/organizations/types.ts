export const UPSERT_ORGANIZATION = "UPSERT_ORGANIZATION";
export const UPSERT_INVITATION = "UPSERT_INVITATION";
export const UPSERT_MEMBERSHIP = "UPSERT_MEMBERSHIP";

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

export interface Invitation {
  organization: number;
  email: string;
  user: number;
  request: boolean;
  created_at: Date;
  accepted_at: Date;
  rejected_at: Date;
}

export interface Membership {
  user: number;
  admin: boolean;
}
