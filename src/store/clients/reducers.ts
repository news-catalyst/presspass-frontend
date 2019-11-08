import { ClientAction, UPSERT_CLIENT, ClientState } from "./types";

const initialState: ClientState = {
  clients: {},
  hydrated: false,
}

export function clientReducers(state = initialState, action: ClientAction): ClientState {
  switch (action.type) {
    case UPSERT_CLIENT:
      {
        let incomingObject: ClientState = {
          clients: Object.assign({}, state.clients),
          hydrated: true,
        };
        incomingObject.clients[action.client.id] = action.client;
        return Object.assign({}, state, incomingObject);
      }
    default: return state
  }
}
