import React, { useState } from 'react';
import { AppActions } from '../store';
import { Organization } from '../store/organizations/types';
import { createOrganization } from '../store/organizations/api';
import OrganizationForm from './OrganizationForm';
import { Redirect } from 'react-router';
import { UsersState } from '../store/users/types';

interface OrganizationCreatePageProps {
  actions: AppActions;
  invitations?: any;
  plans?: any;
  subscriptions?: any;
  users: UsersState;
}

export const OrganizationCreatePage: React.FC<OrganizationCreatePageProps> = (
  props: OrganizationCreatePageProps
) => {
  let organization: Organization = {
    name: '',
    private: false,
    individual: false,
    payment_failed: false,
    avatar: '',
    max_users: 0,
    slug: '',
    update_on: new Date(),
    updated_at: new Date(),
    uuid: ''
  };
  // Saved is -1 if the org is not saved, and is the id
  // of the created org if it has been created.
  let [saved, setSaved] = useState(-1);
  let [errors, setErrors] = useState({});

  const handleSubmit = (updatedOrganization: Organization) => {
    createOrganization(updatedOrganization, props.actions).then(status => {
      if (status.ok) {
        setSaved(status.body.uuid);
      } else {
        setErrors(status.body);
      }
    });
  };

  if (saved !== -1) {
    return <Redirect to={`/organizations/${saved}`} />;
  } else {
    return (
      <section className="organization-page">
        <h1 className="title is-size-1">New Organization</h1>
        <OrganizationForm
          actions={props.actions}
          errors={errors}
          invitations={props.invitations}
          onSubmit={handleSubmit}
          organization={organization}
          plans={props.plans}
          subscriptions={props.subscriptions}
          users={props.users}
        />
        <br />
      </section>
    );
  }
};
