import { AppActions } from '..';
import { checkAuth, cfetch, validate } from '../../utils';
import { Client, ClientState } from './types';

const REQ_BASE: RequestInit = {
  headers: {
    'Content-Type': 'application/json',
  },
  credentials: 'include'
};

const GET = Object.assign({}, REQ_BASE, { method: 'GET' });
const POST = (body: any): RequestInit => ({
  ...REQ_BASE,
  method: 'POST',
  body: body
});
const PATCH = (body: any): RequestInit => ({
  ...REQ_BASE,
  method: 'PATCH',
  body: body
});

const serializeClient = (client: Client) => JSON.stringify({
  id: client.id,
  name: client.name || "",
  client_type: client.client_type,
  website_url: client.website_url || "",
  terms_url: client.terms_url || "",
  contact_email: client.contact_email || "",
  // logo: client.logo || "", // TODO: pair on file uploading
  reuse_consent: client.reuse_consent,
  redirect_uris: client.redirect_uris || "",
  post_logout_redirect_uris: client.post_logout_redirect_uris || "",
  // Explicitly setting each field is necessary here, because
  // not all of the fields in client are write-available, and
  // including them in the request would result in a 400 response.
})

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
  cfetch(`${process.env.REACT_APP_SQUARELET_API_URL}/clients/${client.id}/`, PATCH(serializeClient(client)))
    .then(checkAuth(actions))
    .then(response => validate(response, () => actions.upsertClient(client)));

export const createClient = (client: Client, actions: AppActions) =>
  cfetch(`${process.env.REACT_APP_SQUARELET_API_URL}/clients/`, POST(serializeClient(client)))
    .then(checkAuth(actions))
    // Cannot call upsert client here, because IDs are assigned on the server side
    .then(response => validate(response, () => {}))
    .then(status => {
      if (status.ok) {
        actions.upsertClient(status.body)
      }
      return status;
    });
