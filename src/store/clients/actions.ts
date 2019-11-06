import { UPSERT_CLIENT, Client } from './types';

export function upsertClient(client: Client) {
  return {
    type: UPSERT_CLIENT,
    client: client,
  };
}
