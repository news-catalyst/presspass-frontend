import { PlanAction, UPSERT_PLAN, PlanState, UPSERT_PLANS } from './types';

const initialState: PlanState = {
  plans: {},
  hydrated: false
};

export function planReducers(
  state = initialState,
  action: PlanAction
): PlanState {
  switch (action.type) {
    case UPSERT_PLANS: {
      let incomingObject: PlanState = {
        plans: Object.assign({}, state.plans),
        hydrated: true
      };
      for (let plan of action.plans) {
        incomingObject.plans[plan.id] = plan;
      }
      return Object.assign({}, state, incomingObject);
    }
    case UPSERT_PLAN: {
      let incomingObject: PlanState = {
        plans: Object.assign({}, state.plans),
        hydrated: true
      };
      incomingObject.plans[action.plan.id] = action.plan;
      return Object.assign({}, state, incomingObject);
    }
    default:
      return state;
  }
}
