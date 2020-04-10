import React, { useEffect } from "react";
import { AppActions } from "../store";
import { ClientState } from "../store/clients/types";
import { ensureClients, deleteClient } from "../store/clients/api";
import LoadingPlaceholder from "../common/LoadingPlaceholder";
import { Redirect } from "react-router";
import ClientCard from "./ClientCard";
import { ArchieState } from '../store/archie/types';

interface ClientDeletePageProps {
  actions: AppActions;
  archie: ArchieState;
  clients: ClientState;
  client: number;
}

const ClientDeletePage: React.FC<ClientDeletePageProps> = (props: ClientDeletePageProps) => {
  useEffect(() => {
    ensureClients(props.actions, props.clients);
  }, [props.actions, props.clients]);

  if (props.clients.hydrated) {
    return <HydratedClientDeletePage {...props} />;
  } else {
    return <LoadingPlaceholder />;
  }
};

const HydratedClientDeletePage = (props: ClientDeletePageProps) => {
  let client = props.clients.clients[props.client];

  const handleSubmit = () => {
    deleteClient(client, props.actions);
  };

  if (client === undefined) {
    return <Redirect to={`/clients`} />;
  } else {
    return (
      <section className="client-page limited-width">
        <p className="subtitle">{props.archie.copy.clients.delete_title}</p>
        <h1 className="title is-size-1">{client.name}</h1>
        <ClientCard client={client} />
        <p className="has-text-danger">
          {props.archie.copy.clients.delete_confirm}
        </p>
        <br></br>
        <button className="button is-danger" onClick={handleSubmit}>
          {props.archie.copy.buttons.delete} {client.name}
        </button>
      </section>
    );
  }
};

export default ClientDeletePage;
