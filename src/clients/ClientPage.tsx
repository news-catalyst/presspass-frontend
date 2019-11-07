import React, { useEffect } from 'react';
import { AppActions } from '../store';
import { ClientState, Client } from '../store/clients/types';
import { fetchClients, ensureClients } from '../store/clients/api';
import ClientCard from './ClientCard';
import { LoadingPlaceholder } from '../common/loading';

interface ClientPageProps {
  actions: AppActions;
  clients: ClientState;
  client: number;
}

const ClientPage = (props: ClientPageProps) => {
  useEffect(() => {
    ensureClients(props.actions, props.clients);
  }, [props.actions])

  if(!props.clients.hydrated) {
    return <LoadingPlaceholder/>;
  }

  let client = props.clients.clients[props.client];

  return (
    <section className="client-page">
      <p className="subtitle">OpenID Client</p>
      <h1 className="title is-size-1">{client.name}</h1>
      <table className="table">
        <tr>
          <td className="has-text-weight-bold">
            Name
          </td>
          <td>
            {client.name}
          </td>
        </tr>
        <tr>
          <td className="has-text-weight-bold">
            OpenID Client Type
          </td>
          <td>
            {client.client_type}
          </td>
        </tr>
        <tr>
          <td className="has-text-weight-bold">
            OpenID Client ID
          </td>
          <td>
            {client.client_id}
          </td>
        </tr>
        <tr>
          <td className="has-text-weight-bold">
            OpenID Client Secret
          </td>
          <td>
            {client.client_secret}
          </td>
        </tr>
        <tr>
          <td className="has-text-weight-bold">
            Created
          </td>
          <td>
            {client.date_created}
          </td>
        </tr>
        <tr>
          <td className="has-text-weight-bold">
            Website URL
          </td>
          <td>
            {client.website_url}
          </td>
        </tr>
        <tr>
          <td className="has-text-weight-bold">
            Contact Email
          </td>
          <td>
            {client.contact_email}
          </td>
        </tr>
        <tr>
          <td className="has-text-weight-bold">
            Logo
          </td>
          <td>
            {client.logo}
          </td>
        </tr>
        <tr>
          <td className="has-text-weight-bold">
            Reuse Content
          </td>
          <td>
            {client.reuse_content}
          </td>
        </tr>
        <tr>
          <td className="has-text-weight-bold">
            Redirect URIs
          </td>
          <td>
            {client.redirect_uris}
          </td>
        </tr>
        <tr>
          <td className="has-text-weight-bold">
            Post Logout Redirect URIs
          </td>
          <td>
            {client.post_logout_redirect_uris}
          </td>
        </tr>
      </table>
    </section>
  )
}

export default ClientPage;
