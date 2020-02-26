import { Client } from '../clients/types'

export const UPSERT_ENTITLEMENT = "UPSERT_ENTITLEMENT";
export const UPSERT_ENTITLEMENTS = "UPSERT_ENTITLEMENTS";
export const DELETE_ENTITLEMENT = "DELETE_ENTITLEMENT";

export interface Entitlement {
  id: number;
  name: string;
  description: string;
  client: Client;
}

export interface EntitlementState {
  entitlements: { [id: number]: Entitlement };
  hydrated: boolean;
}

export interface UpsertEntitlementAction {
  type: typeof UPSERT_ENTITLEMENT;
  entitlement: Entitlement;
}

export interface UpsertEntitlementsAction {
  type: typeof UPSERT_ENTITLEMENTS;
  entitlements: Entitlement[];
}

export interface DeleteEntitlementAction {
  type: typeof DELETE_ENTITLEMENT;
  entitlement: Entitlement;
}

export type EntitlementAction =
  | UpsertEntitlementAction
  | UpsertEntitlementsAction
  | DeleteEntitlementAction;
