export const UPSERT_PLAN = 'UPSERT_PLAN';
export const UPSERT_PLANS = 'UPSERT_PLANS';

export interface Plan {
  name: string;
  slug: string;
  minimum_users: number;
  base_price: number;
  price_per_user: number;
  for_individuals: boolean;
  for_groups: boolean;
}

export interface PlanState {
  plans: { [name: string]: Plan };
  hydrated: boolean;
}

export interface UpsertPlanAction {
  type: typeof UPSERT_PLAN;
  plan: Plan;
}

export interface UpsertPlansAction {
  type: typeof UPSERT_PLANS;
  plans: Plan[];
}

export type PlanAction = UpsertPlanAction | UpsertPlansAction;
