import { ClientAction, UPSERT_CLIENT, ClientState } from "./types";

const initialState: ClientState = {
  clients: {}
}

export function authReducers(state = initialState, action: ClientAction): ClientState {
  switch (action.type) {
    case UPSERT_CLIENT:
      {
        let incomingObject: ClientState = {
          clients: {}
        };
        incomingObject.clients[action.client.id] = action.client;
        return Object.assign({}, state, incomingObject);
      }
    default: return state
  }
}
