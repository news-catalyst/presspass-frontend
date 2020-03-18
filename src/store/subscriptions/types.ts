import { Organization } from '../organizations/types';
import { Plan } from '../plans/types';

export const UPSERT_SUBSCRIPTION = 'UPSERT_SUBSCRIPTION';
export const UPSERT_SUBSCRIPTIONS = 'UPSERT_SUBSCRIPTIONS';
export const DELETE_SUBSCRIPTION = 'DELETE_SUBSCRIPTION';

export interface Subscription {
  id: string;
  organization: string;
  plan: Plan;
}

export interface SubscriptionState {
  subscriptions: { [id: number]: Subscription };
  organization: string;
  hydrated: boolean;
}

export interface UpsertSubscriptionAction {
  type: typeof UPSERT_SUBSCRIPTION;
  subscription: Subscription;
  organization: string;
}

export interface UpsertSubscriptionsAction {
  type: typeof UPSERT_SUBSCRIPTIONS;
  subscriptions: Subscription[];
  organization: string;
}

export interface DeleteSubscriptionAction {
  type: typeof DELETE_SUBSCRIPTION;
  subscription: Subscription;
}

export type SubscriptionAction =
  | UpsertSubscriptionAction
  | UpsertSubscriptionsAction
  | DeleteSubscriptionAction;
