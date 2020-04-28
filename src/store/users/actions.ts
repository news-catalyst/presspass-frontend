import { UPSERT_SELF_USER, UPSERT_USER, User } from './types';

export function upsertSelfUser(self: User) {
  return {
    type: UPSERT_SELF_USER,
    self: self
  };
}

export function upsertUser(user: User) {
  return {
    type: UPSERT_USER,
    user: user
  };
}
