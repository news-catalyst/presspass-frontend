import React, { useEffect } from 'react';
import { AppActions } from '../store';
import { ClientState, Client } from '../store/clients/types';
import { ensureClients } from '../store/clients/api';
import ClientCard from './ClientCard';
import { Link } from 'react-router-dom';

interface ClientsListProps {
  actions: AppActions;
  clients: ClientState;
}

const ClientsList = (props: ClientsListProps) => {
  useEffect(() => {
    ensureClients(props.actions, props.clients);
  }, [props.actions, props.clients]);

  return (
    <div className="clients">
      <h1 className="title is-size-1">Clients</h1>
      <div className="columns is-multiline">
        {Object.values(props.clients.clients).map((client: Client) => (
          <div className="column is-4">
            <ClientCard client={client} />
          </div>
        ))}
      </div>
      <Link to="/clients/create" className="button is-link is-outlined">+ Create New Client</Link>
    </div>
  )
}

export default ClientsList;
