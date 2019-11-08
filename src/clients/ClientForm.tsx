// Form separated from page so that it can DRY-ly be used in both
// the 'create' component and the 'edit' component.

import React, { useState, SyntheticEvent } from 'react';
import { Client } from '../store/clients/types';

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
    let [logo, setLogo] = useState(client.logo);
    let [reuseConsent, setReuseConsent] = useState(client.reuse_consent);
    let [redirectUris, setRedirectUris] = useState(client.redirect_uris);
    let [postLogoutRedirectUris, setPostLogoutRedirectUris] = useState(client.post_logout_redirect_uris);

    // TODO: Add validation

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
        post_logout_redirect_uris: postLogoutRedirectUris,
    }

    let errors = props.errors;

    const handleSubmit = (event: SyntheticEvent) => {
        event.preventDefault();
        props.onSubmit(newClient);
    }

    return (
        <form onSubmit={handleSubmit} className="limited-width">
            <div className="field">
                <label className="label">Name</label>
                <div className="control">
                    <input className={errors.name ? "input is-danger" : "input"} type="text" placeholder="Your app's name..." value={name} onChange={event => setName(event.target.value)} />
                </div>
                <p className="help is-danger">{errors.name}</p>
            </div>
            <div className="field">
                <label className="label">Auth Type</label>
                <div className="control">
                    <div className={errors.client_type ? "select is-danger" : "select"}>
                        <select value={type} onChange={event => setType(event.target.value)}>
                            <option value="public">Public</option>
                            <option value="confidential">Confidential</option>
                        </select>
                    </div>
                </div>
                <p className="help is-danger">{errors.client_type}</p>
                <p className="help">For more information about public and confidential clients, see <a href="https://auth0.com/docs/applications/concepts/app-types-confidential-public">this guide</a>.</p>
            </div>
            <div className="field">
                <label className="label">Website</label>
                <div className="control">
                    <input className={errors.website_url ? "input is-danger" : "input"} type="url" placeholder="Your app's website..." value={website} onChange={event => setWebsite(event.target.value)} />
                </div>
                <p className="help is-danger">{errors.website_url}</p>
            </div>
            <div className="field">
                <label className="label">Terms of Service</label>
                <div className="control">
                    <input className={errors.terms_url ? "input is-danger" : "input"} type="url" placeholder="A URL to your app's Terms of Service..." value={termsUrl} onChange={event => setTermsUrl(event.target.value)} />
                </div>
                <p className="help is-danger">{errors.terms_url}</p>
            </div>
            <div className="field">
                <label className="label">Contact Email</label>
                <div className="control">
                    <input className={errors.contact_email ? "input is-danger" : "input"} type="email" placeholder="Your app's contact email..." value={contactEmail} onChange={event => setContactEmail(event.target.value)} />
                </div>
                <p className="help is-danger">{errors.contact_email}</p>
            </div>
            <div className="field">
                <label className="label">Logo</label>
                <div className="control">
                    <input className={errors.logo ? "input is-danger" : "input"} type="url" placeholder="Your app's logo..." value={logo || ""} onChange={event => setLogo(event.target.value)} />
                </div>
                <p className="help is-danger">{errors.logo}</p>
                <p className="help">This is an unimplemented file upload. TODO.</p>
            </div>
            <div className="field">
                <label className={errors.reuse_consent ? "checkbox is-danger" : "checkbox"}>
                    <input type="checkbox" checked={reuseConsent} onChange={event => setReuseConsent(event.target.checked)} />
                    Reuse consent between logins
                </label>
                <p className="help is-danger">{errors.reuse_consent}</p>
            </div>
            <div className="field">
                <label className="label">Redirect Links</label>
                <div className="control">
                    <textarea className={errors.redirect_uris ? "textarea is-danger" : "textarea"} placeholder="Your app's redirect links, one per line..." value={redirectUris} onChange={event => setRedirectUris(event.target.value || "")}></textarea>
                </div>
                <p className="help is-danger">{errors.redirect_uris}</p>
                <p className="help">List of links that the app can redirect users to. One link per line.</p>
            </div>
            <div className="field">
                <label className="label">Post-Logout Redirects</label>
                <div className="control">
                    <textarea className={errors.post_logout_redirect_uris ? "textarea is-danger" : "textarea"} placeholder="Your app's logout redirect links, one per line..." value={postLogoutRedirectUris} onChange={event => setPostLogoutRedirectUris(event.target.value || "")}></textarea>
                </div>
                <p className="help is-danger">{errors.post_logout_redirect_uris}</p>
                <p className="help">List of links that the app can redirect users to after they log out. One link per line.</p>
            </div>
            <br />
            <button type="submit" className="button is-link">Save</button>
        </form>
    )
}