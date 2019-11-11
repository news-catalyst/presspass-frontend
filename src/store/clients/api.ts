import { AppActions } from '..';
import { checkAuth, cfetch, validate, ItemizedResponse, notify, GET, PATCH, POST, DELETE } from '../../utils';
import { Client, ClientState } from './types';

const serializeClient = (client: Client) => ({
  id: client.id,
  name: client.name || "",
  client_type: client.client_type,
  website_url: client.website_url || "",
  terms_url: client.terms_url || "",
  contact_email: client.contact_email || "",
  logo: client.logo || "",
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

export const updateClient = (client: Client, actions: AppActions) => {
  let formData = new FormData();
  let packagedClient: any = serializeClient(client);
  for (let key of Object.keys(packagedClient)) {
    formData.append(key, packagedClient[key]);
  }
  return cfetch(`${process.env.REACT_APP_SQUARELET_API_URL}/clients/${client.id}/`, PATCH(formData))
    .then(checkAuth(actions))
    .then(response => validate(response, (status: ItemizedResponse) => {
      actions.upsertClient(status.body as Client);
      notify(`Successfully updated ${client.name}.`, "success");
    }));
}

export const createClient = (client: Client, actions: AppActions) => {
  let formData = new FormData();
  let packagedClient: any = serializeClient(client);
  for (let key of Object.keys(packagedClient)) {
    formData.append(key, packagedClient[key]);
  }
  return cfetch(`${process.env.REACT_APP_SQUARELET_API_URL}/clients/`, POST(formData))
    .then(checkAuth(actions))
    // Cannot call upsert client here, because IDs are assigned on the server side
    .then(response => validate(response, (status: ItemizedResponse) => {
      actions.upsertClient(status.body as Client);
      notify(`Successfully created ${client.name}.`, "success");
    }));
}

export const deleteClient = (client: Client, actions: AppActions) =>
  cfetch(`${process.env.REACT_APP_SQUARELET_API_URL}/clients/${client.id}`, DELETE)
    .then(checkAuth(actions))
    .then(response => validate(response, () => {
      actions.deleteClient(client);
      notify(`Successfully deleted ${client.name}.`, "success");
    }));