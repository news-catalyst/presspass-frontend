import React, { useState } from "react";
import { AppActions } from "../store";
import { Client } from "../store/clients/types";
import { createClient } from "../store/clients/api";
import ClientForm from "./ClientForm";
import { Redirect } from "react-router";

interface ClientCreatePageProps {
  actions: AppActions;
}

const ClientCreatePage = (props: ClientCreatePageProps) => {
  let client: Client = {
    name: "",
    client_type: "public",
    date_created: new Date(),
    website_url: "",
    terms_url: "",
    contact_email: "",
    reuse_consent: true,
    redirect_uris: "",
    post_logout_redirect_uris: "",
    id: 0 // Ignored by server, but must be present for all clients
  };
  // Saved is -1 if the client is not saved, and is the id
  // of the created client if it has been created.
  let [saved, setSaved] = useState(-1);
  let [errors, setErrors] = useState({});

  const handleSubmit = (updatedClient: Client) => {
    createClient(updatedClient, props.actions).then(status => {
      if (status.ok) {
        setSaved(status.body.id);
      } else {
        setErrors(status.body);
      }
    });
  };

  if (saved !== -1) {
    return <Redirect to={`/clients/${saved}`} />;
  } else {
    return (
      <section className="client-page">
        <p className="subtitle">Create OpenID Client</p>
        <h1 className="title is-size-1">New Client</h1>
        <ClientForm client={client} onSubmit={handleSubmit} errors={errors} />
        <br />
      </section>
    );
  }
};

export default ClientCreatePage;
