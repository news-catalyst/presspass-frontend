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
      <p>Client information here...</p>
    </section>
  )
}

export default ClientPage;
