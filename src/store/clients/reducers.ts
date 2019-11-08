import { ClientAction, UPSERT_CLIENT, ClientState, UPSERT_CLIENTS } from "./types";

const initialState: ClientState = {
  clients: {},
  hydrated: false,
}

export function clientReducers(state = initialState, action: ClientAction): ClientState {
  switch (action.type) {
    case UPSERT_CLIENTS:
      {
        let incomingObject: ClientState = {
          clients: Object.assign({}, state.clients),
          hydrated: true,
        };
        for (let client of action.clients) {
          incomingObject.clients[client.id] = client;
        }
        return Object.assign({}, state, incomingObject);
      }
    case UPSERT_CLIENT:
      {
        let incomingObject: ClientState = {
          clients: Object.assign({}, state.clients),
          hydrated: true,
        };
        console.log(action.client);
        incomingObject.clients[action.client.id] = action.client;
        return Object.assign({}, state, incomingObject);
      }
    default: return state
  }
}
