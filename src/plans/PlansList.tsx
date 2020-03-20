import React from 'react';
import { Organization } from '../store/organizations/types';
import { Plan, PlanState } from '../store/plans/types';
import { AppActions } from '../store';
import PlanCard from '../plans/PlanCard';
import { UsersState } from '../store/users/types';

interface PlansListProps {
  actions: AppActions;
  organization: Organization;
  plans: PlanState;
  users: UsersState;
}

const PlansList: React.FC<PlansListProps> = (props: PlansListProps) => {
  let organization = props.organization;
  let plans = Object.values(props.plans.plans);

  if (plans.length === 0) {
    return (
      <div className="plans">
        <p>There are no plans available for {props.organization.name}.</p>
      </div>
    );
  }
  return (
    <div className="columns is-multiline">
      {Object.values(props.plans.plans)
        .filter(plan => !plan.subscribed)
        .sort((a, b) => (a.name > b.name ? 1 : -1))
        .map((plan: Plan) => (
          <div className="column is-4" key={plan.id}>
            <PlanCard
              actions={props.actions}
              key={plan.id}
              plan={plan}
              users={props.users}
              organization={organization.uuid}
            />
          </div>
        ))}
    </div>
  );
};
export default PlansList;
