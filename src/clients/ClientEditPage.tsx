import React, { useEffect, useState } from 'react';
import { AppActions } from '../store';
import { ClientState, Client } from '../store/clients/types';
import { ensureClients } from '../store/clients/api';
import { LoadingPlaceholder } from '../common/loading';
import { Link } from 'react-router-dom';
import ClientForm from './ClientForm';

interface ClientPageProps {
  actions: AppActions;
  clients: ClientState;
  client: number;
}

const ClientPage = (props: ClientPageProps) => {
  useEffect(() => {
    ensureClients(props.actions, props.clients);
  }, [props.actions, props.clients]);

  if (props.clients.hydrated) {
    return <HydratedClientPage {...props} />;
  } else {
    return <LoadingPlaceholder />;
  }
}

const HydratedClientPage = (props: ClientPageProps) => {
  let client = props.clients.clients[props.client];

  const handleSubmit = (updatedClient: Client) => {
    console.log("Form submit!");
    console.log(updatedClient);
  };

  return (
    <section className="client-page">
      <p className="subtitle">Edit OpenID Client</p>
      <h1 className="title is-size-1">{client.name}</h1>
        <ClientForm client={client} onSubmit={handleSubmit} />
        <br />
    </section>
  )
}

export default ClientPage;
