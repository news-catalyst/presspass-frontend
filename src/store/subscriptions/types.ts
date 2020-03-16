import { Organization } from '../organizations/types';
import { Plan } from '../plans/types';

export const UPSERT_SUBSCRIPTION = 'UPSERT_SUBSCRIPTION';
export const UPSERT_SUBSCRIPTIONS = 'UPSERT_SUBSCRIPTIONS';

export interface Subscription {
  user: string;
  organization: Organization;
  plan: Plan;
}

export interface SubscriptionState {
  subscriptions: { [id: number]: Subscription };
  hydrated: boolean;
}

export interface UpsertSubscriptionAction {
  type: typeof UPSERT_SUBSCRIPTION;
  subscription: Subscription;
}

export interface UpsertSubscriptionsAction {
  type: typeof UPSERT_SUBSCRIPTIONS;
  subscriptions: Subscription[];
}

export type SubscriptionAction =
  | UpsertSubscriptionAction
  | UpsertSubscriptionsAction;
