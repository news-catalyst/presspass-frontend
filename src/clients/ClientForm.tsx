// Form separated from page so that it can DRY-ly be used in both
// the 'create' component and the 'edit' component.

import React, { useState } from 'react';
import { Client } from '../store/clients/types';

interface ClientFormProps {
    client: Client;
    onChange: (parameter: Client) => void;
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

    props.onChange(newClient);

    return (
        <section>
            <div className="field">
                <label className="label">Name</label>
                <div className="control">
                    <input className="input" type="text" placeholder="Your app's name..." value={name} onChange={event => setName(event.target.value)} />
                </div>
            </div>
            <div className="field">
                <label className="label">Auth Type</label>
                <div className="control">
                    <div className="select">
                        <select value={type} onChange={event => setType(event.target.value)}>
                            <option value="public">Public</option>
                            <option value="confidential">Confidential</option>
                        </select>
                    </div>
                </div>
                <p className="help">For more information about public and confidential clients, see <a href="https://auth0.com/docs/applications/concepts/app-types-confidential-public">this guide</a>.</p>
            </div>
            <div className="field">
                <label className="label">Website</label>
                <div className="control">
                    <input className="input" type="url" placeholder="Your app's website..." value={website} onChange={event => setWebsite(event.target.value)} />
                </div>
            </div>
            <div className="field">
                <label className="label">Terms of Service</label>
                <div className="control">
                    <input className="input" type="url" placeholder="A URL to your app's Terms of Service..." value={termsUrl} onChange={event => setTermsUrl(event.target.value)} />
                </div>
            </div>
            <div className="field">
                <label className="label">Contact Email</label>
                <div className="control">
                    <input className="input" type="email" placeholder="Your app's contact email..." value={contactEmail} onChange={event => setContactEmail(event.target.value)} />
                </div>
            </div>
            <div className="field">
                <label className="label">Logo</label>
                <div className="control">
                    <input className="input" type="url" placeholder="Your app's logo..." value={logo || ""} onChange={event => setLogo(event.target.value)} />
                </div>
                <p className="help">This is a link to your app's logo image.</p>
            </div>
            <div className="field">
                <label className="checkbox">
                    <input type="checkbox" checked={reuseConsent} onChange={event => setReuseConsent(event.target.checked)} />
                    Reuse consent between logins
                </label>
            </div>
            <div className="field">
                <label className="label">Redirect Links</label>
                <div className="control">
                    <textarea className="textarea" placeholder="Your app's redirect links, one per line..." value={redirectUris} onChange={event => setRedirectUris(event.target.value)}></textarea>
                </div>
                <p className="help">List of links that the app can redirect users to. One link per line.</p>
            </div>
            <div className="field">
                <label className="label">Post-Logout Redirects</label>
                <div className="control">
                    <textarea className="textarea" placeholder="Your app's logout redirect links, one per line..." value={postLogoutRedirectUris} onChange={event => setPostLogoutRedirectUris(event.target.value)}></textarea>
                </div>
                <p className="help">List of links that the app can redirect users to after they log out. One link per line.</p>
            </div>
        </section>
    )
}