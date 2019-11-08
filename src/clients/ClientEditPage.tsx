import React, { useEffect, useState } from 'react';
import { AppActions } from '../store';
import { ClientState, Client } from '../store/clients/types';
import { ensureClients, updateClient } from '../store/clients/api';
import { LoadingPlaceholder } from '../common/loading';
import ClientForm from './ClientForm';
import { Redirect } from 'react-router';

interface ClientEditPageProps {
  actions: AppActions;
  clients: ClientState;
  client: number;
}

const ClientEditPage = (props: ClientEditPageProps) => {
  useEffect(() => {
    ensureClients(props.actions, props.clients);
  }, [props.actions, props.clients]);

  if (props.clients.hydrated) {
    return <HydratedClientEditPage {...props} />;
  } else {
    return <LoadingPlaceholder />;
  }
}

const HydratedClientEditPage = (props: ClientEditPageProps) => {
  let client = props.clients.clients[props.client];
  let [saved, setSaved] = useState(false);

  const handleSubmit = (updatedClient: Client) => {
    updateClient(updatedClient, props.actions);
    setSaved(true);
  };

  if (saved) {
    return <Redirect to={`/clients/${client.id}`} />
  } else {
    return (
      <section className="client-page">
        <p className="subtitle">Edit OpenID Client</p>
        <h1 className="title is-size-1">{client.name}</h1>
          <ClientForm client={client} onSubmit={handleSubmit} />
          <br />
      </section>
    )
  }
}

export default ClientEditPage;
