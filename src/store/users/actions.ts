import { UPSERT_SELF_USER, User } from "./types";

export function upsertSelfUser(self: User) {
  return {
    type: UPSERT_SELF_USER,
    self: self,
  };
}
