import { AppActions } from '..';
import { checkAuth, cfetch, GET } from '../../utils';
import { Plan, PlanState } from './types';

const serializePlan = (plan: Plan) => ({
  name: plan.name || '',
  slug: plan.slug,
  minimum_users: plan.minimum_users,
  for_individuals: plan.for_individuals,
  for_groups: plan.for_groups,
  base_price: plan.base_price,
  price_per_user: plan.price_per_user
  // Explicitly setting each field is necessary here, because
  // not all of the fields in plan are write-available, and
  // including them in the request would result in a 400 response.
});

export const fetchPlans = (actions: AppActions) =>
  cfetch(`${process.env.REACT_APP_SQUARELET_API_URL}/plans/`, GET)
    .then(checkAuth(actions))
    .then(response => response.json())
    .then(data => Promise.all([actions.upsertPlans(data.results)]))
    .catch(error => {
      console.log(actions);
      console.error('API Error fetchPlans', error, error.code);
    });

export const ensurePlans = (actions: AppActions, plans: PlanState) => {
  if (!plans.hydrated) {
    return fetchPlans(actions);
  }
};
