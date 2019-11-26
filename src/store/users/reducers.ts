import { UsersAction, UPSERT_SELF_USER, UsersState } from "./types";

const initialState: UsersState = {
  self: null
};

export function usersReducers(
  state = initialState,
  action: UsersAction
): UsersState {
  switch (action.type) {
    case UPSERT_SELF_USER: {
      return Object.assign({}, state, { self: action.self });
    }
    default:
      return state;
  }
}
