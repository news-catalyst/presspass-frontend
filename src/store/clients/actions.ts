import {
  UPSERT_CLIENT,
  Client,
  UPSERT_CLIENTS,
  DELETE_CLIENT,
  DeleteClientAction,
  UpsertClientAction,
  UpsertClientsAction
} from "./types";

export function upsertClient(client: Client): UpsertClientAction {
  return {
    type: UPSERT_CLIENT,
    client: client
  };
}

// This action is necessary because if one wants to
// upsert multiple clients into the store at load time,
// calling each `upsertClient` individually would cause
// the 'hydrated' field to be set to `true` after the first
// upsert (but before all the data has been loaded). This
// can cause issues when there are multiple clients,
// as a view might be waiting for `hydrated` to be `true`
// before displaying data from a particular client. If
// `hydrated` is set to `true` too early, this can cause
// these views to fail.
export function upsertClients(clients: Client[]): UpsertClientsAction {
  return {
    type: UPSERT_CLIENTS,
    clients: clients
  };
}

export function deleteClient(client: Client): DeleteClientAction {
  return {
    type: DELETE_CLIENT,
    client: client
  };
}
