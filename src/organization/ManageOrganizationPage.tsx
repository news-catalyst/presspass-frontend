import React, { useEffect, useState } from 'react';
import { AppActions } from '../store';
import { OrganizationState, Organization } from '../store/organizations/types';
import { PlanState, Plan } from '../store/plans/types';
import {
  ensureOrganizations,
  updateOrganization
} from '../store/organizations/api';
import LoadingPlaceholder from '../common/LoadingPlaceholder';
import { AppProps } from '../store';
import { Link, Redirect } from 'react-router-dom';
import { ensurePlansForOrganization } from '../store/plans/api';
import OrganizationForm from './OrganizationForm';
import { ensureSubscriptionsForOrganization } from '../store/subscriptions/api';
import { SubscriptionState, Subscription } from '../store/subscriptions/types';
import { UsersState } from '../store/users/types';

interface ManageOrganizationPageProps extends AppProps {
  actions: AppActions;
  organization: string;
  organizations: OrganizationState;
  plans: PlanState;
  subscriptions: SubscriptionState;
  users: UsersState;
}

export const ManageOrganizationPage = (props: ManageOrganizationPageProps) => {
  useEffect(() => {
    async function fetchData() {
      const organizations = await ensureOrganizations(
        props.actions,
        props.organizations
      );

      const plans = await ensurePlansForOrganization(
        props.actions,
        props.organization,
        props.plans
      );
      const subscriptions = await ensureSubscriptionsForOrganization(
        props.actions,
        props.organization,
        props.subscriptions
      );
    }
    fetchData();
  }, []);

  let [saved, setSaved] = useState(false);
  let [errors, setErrors] = useState({});

  if (
    !props.organizations.hydrated ||
    !props.plans.hydrated ||
    !props.subscriptions.hydrated
  ) {
    return <LoadingPlaceholder />;
  }

  let organization = props.organizations.organizations[props.organization];

  const handleSubmit = (updatedOrganization: Organization) => {
    updateOrganization(updatedOrganization, props.actions).then(status => {
      if (status.ok) {
        setSaved(true);
      } else {
        setErrors(status.body);
      }
    });
  };

  if (saved) {
    return <Redirect to={`/profile`} />;
  } else {
    return (
      <section className="organization-page">
        <p className="subtitle">Manage PressPass News Organization</p>
        <h1 className="title is-size-1">{organization.name}</h1>
        <OrganizationForm
          actions={props.actions}
          errors={errors}
          onSubmit={handleSubmit}
          organization={organization}
          plans={props.plans}
          subscriptions={props.subscriptions}
          users={props.users}
        />
        <p>
          Manage organization page (id {organization.uuid}) (
          <Link to=".">view</Link>)
        </p>
      </section>
    );
  }
};
