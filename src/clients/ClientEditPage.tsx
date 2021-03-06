import React, { useEffect, useState } from "react";
import { AppActions } from "../store";
import { ClientState, Client } from "../store/clients/types";
import { ensureClients, updateClient } from "../store/clients/api";
import LoadingPlaceholder from "../common/LoadingPlaceholder";
import ClientForm from "./ClientForm";
import { Redirect } from "react-router";
import { ArchieState } from '../store/archie/types';

interface ClientEditPageProps {
  actions: AppActions;
  archie: ArchieState;
  clients: ClientState;
  client: number;
}

const ClientEditPage: React.FC<ClientEditPageProps> = (props: ClientEditPageProps) => {
  useEffect(() => {
    ensureClients(props.actions, props.clients);
  }, [props.actions, props.clients]);

  if (props.clients.hydrated) {
    return <HydratedClientEditPage {...props} />;
  } else {
    return <LoadingPlaceholder />;
  }
};

const HydratedClientEditPage: React.FC<ClientEditPageProps> = (props: ClientEditPageProps) => {
  let client = props.clients.clients[props.client];
  let [saved, setSaved] = useState(false);
  let [errors, setErrors] = useState({});

  const handleSubmit = (updatedClient: Client) => {
    updateClient(updatedClient, props.actions).then(status => {
      if (status.ok) {
        setSaved(true);
      } else {
        setErrors(status.body);
      }
    });
  };

  if (saved) {
    return <Redirect to={`/clients/${client.id}`} />;
  } else {
    return (
      <section className="client-page">
        <p className="subtitle">{props.archie.copy.clients.edit_title}</p>
        <h1 className="title is-size-1">{client.name}</h1>
        <ClientForm client={client} onSubmit={handleSubmit} errors={errors} />
        <br />
      </section>
    );
  }
};

export default ClientEditPage;
