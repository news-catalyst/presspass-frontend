import {
  UsersAction,
  UPSERT_USER,
  UPSERT_SELF_USER,
  UsersState
} from './types';

const initialState: UsersState = {
  self: null,
  user: null
};

export function usersReducers(
  state = initialState,
  action: UsersAction
): UsersState {
  switch (action.type) {
    case UPSERT_SELF_USER: {
      return Object.assign({}, state, { self: action.self });
    }
    case UPSERT_USER: {
      return Object.assign({}, state, { user: action.user });
    }
    default:
      return state;
  }
}
