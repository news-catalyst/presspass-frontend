import { AppActions } from '..';
import { checkAuth, cfetch } from '../../utils';
import { Client, ClientState } from './types';

const HEADERS = {
  headers: {
    'Content-Type': 'application/json',
  },
};

const GET = Object.assign({}, HEADERS, { method: 'GET', credentials: 'include' });
const POST = Object.assign({}, HEADERS, { method: 'POST', credentials: 'include' });
const PATCH = Object.assign({}, HEADERS, { method: 'PATCH', credentials: 'include' });

export const fetchClients = (actions: AppActions) =>
  cfetch(`${process.env.REACT_APP_SQUARELET_API_URL}/clients/`, GET)
    .then(checkAuth(actions))
    .then(response => response.json())
    .then(data => Promise.all([
      actions.upsertClients(data.results)
    ])).catch((error) => {
      console.error('API Error fetchClients', error, error.code);
    });

export const ensureClients = (actions: AppActions, clients: ClientState) => {
  if (!clients.hydrated) {
    return fetchClients(actions);
  }
}

export const updateClient = (client: Client, actions: AppActions) =>
  cfetch(`${process.env.REACT_APP_SQUARELET_API_URL}/clients/${client.id}/`, Object.assign({},
    PATCH, {
      body: JSON.stringify({
        // One potential optimization here would be to diff the old and new clients
        // and only include the fields that differ; after all, this is a PATCH
        // request.
        id: client.id,
        name: client.name || "",
        client_type: client.client_type,
        website_url: client.website_url || "",
        terms_url: client.terms_url || "",
        contact_email: client.contact_email || "",
        // logo: client.logo || "",
        reuse_consent: client.reuse_consent,
        redirect_uris: client.redirect_uris || "",
        post_logout_redirect_uris: client.post_logout_redirect_uris || "",
        // Explicitly setting each field is necessary here, because
        // not all of the fields in client are write-available, and
        // including them in the request would result in a 400 response.
      })
  }))
  .then(checkAuth(actions))
  // Here is potentially where returning some kind of validation data would happen
  // (Here or in a catch.)
  .then(() => actions.upsertClient(client));
