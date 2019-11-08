import React, { useEffect } from 'react';
import { AppActions } from '../store';
import { ClientState } from '../store/clients/types';
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
  }, [props.actions, props.clients])

  if (!props.clients.hydrated) {
    return <LoadingPlaceholder />;
  }

  let client = props.clients.clients[props.client];

  return (
    <section className="client-page">
      <p className="subtitle">Edit OpenID Client</p>
      <h1 className="title is-size-1">{client.name}</h1>
      <form className="limited-width box">
        <ClientForm client={client} onChange={console.log} />
        <br />
        <button className="button is-link is-outlined">Save</button>
      </form>
    </section>
  )
}

export default ClientPage;
