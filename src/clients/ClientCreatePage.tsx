import React, { useState } from 'react';
import { AppActions } from '../store';
import { Client } from '../store/clients/types';
import { createClient } from '../store/clients/api';
import ClientForm from './ClientForm';
import { Redirect } from 'react-router';

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
  let [saved, setSaved] = useState(false);
  let [errors, setErrors] = useState({});

  const handleSubmit = (updatedClient: Client) => {
    createClient(updatedClient, props.actions).then(status => {
      if (status.ok) {
        setSaved(true);
      } else {
        setErrors(status.errors);
      }
    });
  };

  if (saved) {
    return <Redirect to={`/clients`} />
    // Eventually, we will want to redirect them to the client's page itself
  } else {
    return (
      <section className="client-page">
        <p className="subtitle">Create OpenID Client</p>
        <h1 className="title is-size-1">New Client</h1>
          <ClientForm client={client} onSubmit={handleSubmit} errors={errors} />
          <br />
      </section>
    )
  }
}

export default ClientCreatePage;
