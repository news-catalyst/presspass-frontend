export const DELETE_MEMBERSHIP = 'DELETE_MEMBERSHIP';
export const UPSERT_MEMBERSHIP = 'UPSERT_MEMBERSHIP';
export const UPSERT_MEMBERSHIPS = 'UPSERT_MEMBERSHIPS';

export interface Membership {
  user: number;
  organization: number;
  admin: boolean;
}

export interface MembershipState {
  memberships: { [id: number]: Membership };
  hydrated: boolean;
}

export interface UpsertMembershipAction {
  type: typeof UPSERT_MEMBERSHIP;
  membership: Membership;
}

export interface UpsertMembershipsAction {
  type: typeof UPSERT_MEMBERSHIPS;
  memberships: Membership[];
}

export interface DeleteMembershipAction {
  type: typeof DELETE_MEMBERSHIP;
  membership: Membership;
}

export type MembershipAction =
  | UpsertMembershipAction
  | UpsertMembershipsAction
  | DeleteMembershipAction;
