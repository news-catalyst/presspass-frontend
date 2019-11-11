// Form separated from page so that it can DRY-ly be used in both
// the 'create' component and the 'edit' component.

import React, { useState, SyntheticEvent } from "react";
import { Client } from "../store/clients/types";
import { Field } from "../common/field";

interface ClientFormProps {
  client: Client;
  onSubmit: (parameter: Client) => void;
  errors: any;
}

export default (props: ClientFormProps) => {
  let client = props.client;

  let [name, setName] = useState(client.name);
  let [type, setType] = useState(client.client_type);
  let [website, setWebsite] = useState(client.website_url);
  let [termsUrl, setTermsUrl] = useState(client.terms_url);
  let [contactEmail, setContactEmail] = useState(client.contact_email);
  let [logo, setLogo] = useState<File | undefined>(undefined);
  let [reuseConsent, setReuseConsent] = useState(client.reuse_consent);
  let [redirectUris, setRedirectUris] = useState(client.redirect_uris);
  let [postLogoutRedirectUris, setPostLogoutRedirectUris] = useState(
    client.post_logout_redirect_uris
  );

  let newClient: Client = {
    ...client,
    name: name,
    client_type: type,
    website_url: website,
    terms_url: termsUrl,
    contact_email: contactEmail,
    logo: logo,
    reuse_consent: reuseConsent,
    redirect_uris: redirectUris,
    post_logout_redirect_uris: postLogoutRedirectUris
  };

  let errors = props.errors;

  const handleSubmit = (event: SyntheticEvent) => {
    event.preventDefault();
    props.onSubmit(newClient);
  };

  return (
    <form onSubmit={handleSubmit} className="limited-width">
      <Field label="Name" errors={errors.name}>
        <input
          className={errors.name ? "input is-danger" : "input"}
          type="text"
          placeholder="Your app's name..."
          value={name}
          onChange={event => setName(event.target.value)}
        />
      </Field>
      <Field
        label="Auth Type"
        errors={errors.client_type}
        help="Confidential clients can keep information private (e.g. a server); public clients cannot (e.g. SPA web app)."
      >
        <div className={errors.client_type ? "select is-danger" : "select"}>
          <select value={type} onChange={event => setType(event.target.value)}>
            <option value="public">Public</option>
            <option value="confidential">Confidential</option>
          </select>
        </div>
      </Field>
      <Field label="Website" errors={errors.website_url}>
        <input
          className={errors.website_url ? "input is-danger" : "input"}
          type="url"
          placeholder="Your app's website..."
          value={website}
          onChange={event => setWebsite(event.target.value)}
        />
      </Field>
      <Field label="Terms of Service" errors={errors.terms_url}>
        <input
          className={errors.terms_url ? "input is-danger" : "input"}
          type="url"
          placeholder="A URL to your app's Terms of Service..."
          value={termsUrl}
          onChange={event => setTermsUrl(event.target.value)}
        />
      </Field>
      <Field label="Contact Email" errors={errors.contact_email}>
        <input
          className={errors.contact_email ? "input is-danger" : "input"}
          type="email"
          placeholder="Your app's contact email..."
          value={contactEmail}
          onChange={event => setContactEmail(event.target.value)}
        />
      </Field>
      <Field
        label="Logo"
        errors={errors.logo}
        help="If you do not upload a file, the current logo will be kept."
      >
        <input
          className={errors.logo ? "input is-danger" : "input"}
          type="file"
          placeholder="Your app's logo..."
          onChange={event =>
            setLogo(
              event.target.files === null ? undefined : event.target.files[0]
            )
          }
        />
      </Field>
      <Field errors={errors.reuse_consent}>
        <label
          className={errors.reuse_consent ? "checkbox is-danger" : "checkbox"}
        >
          <input
            type="checkbox"
            checked={reuseConsent}
            onChange={event => setReuseConsent(event.target.checked)}
          />
          Reuse consent between logins
        </label>
      </Field>
      <Field
        label="Redirect Links"
        errors={errors.redirect_uris}
        help="List of links that the app can redirect users to. One link per line."
      >
        <textarea
          className={errors.redirect_uris ? "textarea is-danger" : "textarea"}
          placeholder="Your app's redirect links, one per line..."
          value={redirectUris}
          onChange={event => setRedirectUris(event.target.value || "")}
        ></textarea>
      </Field>
      <Field
        label="Post-Logout Redirects"
        errors={errors.post_logout_redirect_uris}
        help="List of links that the app can redirect users to after they log out. One link per line."
      >
        <textarea
          className={
            errors.post_logout_redirect_uris ? "textarea is-danger" : "textarea"
          }
          placeholder="Your app's logout redirect links, one per line..."
          value={postLogoutRedirectUris}
          onChange={event =>
            setPostLogoutRedirectUris(event.target.value || "")
          }
        ></textarea>
      </Field>
      <br />
      <button type="submit" className="button is-link">
        Save
      </button>
    </form>
  );
};
