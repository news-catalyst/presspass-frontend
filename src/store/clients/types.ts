export const UPSERT_CLIENT = "UPSERT_CLIENT";

export interface Client {
    id: number;
    name: string;
    owner: number;
    clientType: string;
    clientId: string;
    clientSecret: string;
    dateCreated: Date;
    websiteUrl: string;
    termsUrl: string;
    contactEmail: string;
    logo: string | null;
    reuseConsent: boolean;
    redirectUris: string;
    postLogoutRedirectUris: string;
}

export interface ClientState {
  clients: {[id: number]: Client};
}

export interface UpsertClientAction {
  type: typeof UPSERT_CLIENT;
  client: Client;
}

export type ClientAction = UpsertClientAction;
