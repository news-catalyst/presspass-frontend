import React, { useEffect } from 'react';
import { AppActions } from '../store';
import { ClientState } from '../store/clients/types';
import { ensureClients, deleteClient } from '../store/clients/api';
import { LoadingPlaceholder } from '../common/loading';
import { Redirect } from 'react-router';
import ClientCard from './ClientCard';

interface ClientDeletePageProps {
  actions: AppActions;
  clients: ClientState;
  client: number;
}

const ClientDeletePage = (props: ClientDeletePageProps) => {
  useEffect(() => {
    ensureClients(props.actions, props.clients);
  }, [props.actions, props.clients]);

  if (props.clients.hydrated) {
    return <HydratedClientDeletePage {...props} />;
  } else {
    return <LoadingPlaceholder />;
  }
}

const HydratedClientDeletePage = (props: ClientDeletePageProps) => {
  let client = props.clients.clients[props.client];

  const handleSubmit = () => {
    deleteClient(client, props.actions);
  };

  if (client === undefined) {
    return <Redirect to={`/clients`} />
  } else {
    return (
      <section className="client-page limited-width">
        <p className="subtitle">Delete OpenID Client</p>
        <h1 className="title is-size-1">{client.name}</h1>
        <ClientCard client={client} />
        <p className="has-text-danger">Are you sure you would like to permanently delete this client? This action cannot be undone.</p>
        <br></br>
        <button className="button is-danger" onClick={handleSubmit}>Delete {client.name}</button>
      </section>
    )
  }
}

export default ClientDeletePage;
