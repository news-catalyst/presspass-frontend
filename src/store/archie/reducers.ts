import {
  ArchieAction,
  UPSERT_ARCHIE,
  ArchieState
} from "./types";

const initialState: ArchieState = {
  copy: {},
  hydrated: false
};

export function archieReducers(
  state = initialState,
  action: ArchieAction
): ArchieState {
  switch(action.type) {
    case UPSERT_ARCHIE: {
      let incomingObject: ArchieState = {
        copy: Object.assign({}, action.archie),
        hydrated: true,
      };
      return Object.assign({}, state, incomingObject);
    }
    default:
      return state;
  }
}
