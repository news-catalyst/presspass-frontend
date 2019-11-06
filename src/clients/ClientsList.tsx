import React, { useEffect } from 'react';
import { AppActions } from '../store';
import { ClientState, Client } from '../store/clients/types';
import { fetchClients } from '../store/clients/api';

interface ClientsListProps {
  actions: AppActions;
  clients: ClientState
}

const ClientsList = (props: ClientsListProps) => {
  useEffect(() => {
    fetchClients(props.actions);
  }, [props.actions])

  return (
    <div className="clients">
      {Object.values(props.clients.clients).map((client: Client) => (
        <p>{client.id}</p>
      ))}
    </div>
  )
}

export default ClientsList;
