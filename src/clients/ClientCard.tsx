import React from "react";
import { Client } from "../store/clients/types";
import { Link } from "react-router-dom";

interface ClientCardProps {
  client: Client;
}

const ClientCard = (props: ClientCardProps) => {
  let client = props.client;
  return (
    <Link className="box" to={"/clients/" + client.id}>
      <h5 className="title is-size-5">{client.name}</h5>
      <div className="field is-grouped is-grouped-multiline">
        <div className="control">
          <div className="tags has-addons">
            <span className="tag is-dark">Auth Type</span>
            <span className="tag is-info">{client.client_type}</span>
          </div>
        </div>

        <div className="control">
          <div className="tags has-addons">
            <span className="tag is-dark">Client ID</span>
            <span className="tag is-primary">{client.client_id}</span>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default ClientCard;
