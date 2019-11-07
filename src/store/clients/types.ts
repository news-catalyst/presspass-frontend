export const UPSERT_CLIENT = "UPSERT_CLIENT";

export interface Client {
    id: number;
    name: string;
    owner: number;
    client_type: string;
    client_id: string;
    client_secret: string;
    date_created: Date;
    website_url: string;
    terms_url: string;
    contact_email: string;
    logo: string | null;
    reuse_content: boolean;
    redirect_uris: string;
    post_logout_redirect_uris: string;
}

export interface ClientState {
  clients: {[id: number]: Client};
  hydrated: boolean;
}

export interface UpsertClientAction {
  type: typeof UPSERT_CLIENT;
  client: Client;
}

export type ClientAction = UpsertClientAction;
