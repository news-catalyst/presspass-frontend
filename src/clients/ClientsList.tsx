import React, { useEffect } from "react";
import { AppActions } from "../store";
import { ClientState, Client } from "../store/clients/types";
import { ensureClients } from "../store/clients/api";
import ClientCard from "./ClientCard";
import { Link } from "react-router-dom";
import { ArchieState } from "../store/archie/types";

interface ClientsListProps {
  actions: AppActions;
  archie: ArchieState;
  clients: ClientState;
}

const ClientsList: React.FC<ClientsListProps> = (props: ClientsListProps) => {
  useEffect(() => {
    ensureClients(props.actions, props.clients);
  }, [props.actions, props.clients]);

  return (
    <div className="clients">
      <div className="content">
        <h1 className="title is-size-1">{props.archie.copy.clients.title}</h1>
        <p className="container">{props.archie.copy.clients.description}</p>
      </div>
      <div className="columns is-multiline">
        {Object.values(props.clients.clients).map((client: Client) => (
          <div className="column is-4">
            <ClientCard client={client} />
          </div>
        ))}
      </div>
      <Link to="/clients/create" className="button is-link is-outlined">
        {props.archie.copy.buttons.create_client}
      </Link>
    </div>
  );
};

export default ClientsList;
