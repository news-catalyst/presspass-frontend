import {
  ClientAction,
  UPSERT_CLIENT,
  ClientState,
  UPSERT_CLIENTS,
  DELETE_CLIENT
} from "./types";

const initialState: ClientState = {
  clients: {},
  hydrated: false
};

export function clientReducers(
  state = initialState,
  action: ClientAction
): ClientState {
  switch (action.type) {
    case UPSERT_CLIENTS: {
      let incomingObject: ClientState = {
        clients: Object.assign({}, state.clients),
        hydrated: true
      };
      for (let client of action.clients) {
        incomingObject.clients[client.id] = client;
      }
      return Object.assign({}, state, incomingObject);
    }
    case UPSERT_CLIENT: {
      let incomingObject: ClientState = {
        clients: Object.assign({}, state.clients),
        hydrated: true
      };
      incomingObject.clients[action.client.id] = action.client;
      return Object.assign({}, state, incomingObject);
    }
    case DELETE_CLIENT: {
      let incomingObject: ClientState = {
        clients: Object.assign({}, state.clients),
        hydrated: true
      };
      delete incomingObject.clients[action.client.id];
      return Object.assign({}, state, incomingObject);
    }
    default:
      return state;
  }
}
