import {
  UPSERT_PLAN,
  Plan,
  UPSERT_PLANS,
  UpsertPlanAction,
  UpsertPlansAction
} from './types';

export function upsertPlan(plan: Plan): UpsertPlanAction {
  return {
    type: UPSERT_PLAN,
    plan: plan
  };
}

// This action is necessary because if one wants to
// upsert multiple plans into the store at load time,
// calling each `upsertPlan` individually would cause
// the 'hydrated' field to be set to `true` after the first
// upsert (but before all the data has been loaded). This
// can cause issues when there are multiple plans,
// as a view might be waiting for `hydrated` to be `true`
// before displaying data from a particular plan. If
// `hydrated` is set to `true` too early, this can cause
// these views to fail.
export function upsertPlans(plans: Plan[]): UpsertPlansAction {
  return {
    type: UPSERT_PLANS,
    plans: plans
  };
}
