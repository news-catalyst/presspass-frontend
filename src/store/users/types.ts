export const UPSERT_SELF_USER = 'UPSERT_SELF_USER';

export interface User {
  name: string;
  email: string;
  email_failed: boolean;
  avatar: string;
  username: string;
  created_at: Date;
  updated_at: Date;
  use_autologin: boolean;
  uuid: string;
  can_change_username: boolean;
}

export interface UsersState {
  self: User | null;
}

export interface UpsertSelfUserAction {
  type: typeof UPSERT_SELF_USER;
  self: User;
}

export type UsersAction = UpsertSelfUserAction;
