// Form separated from page so that it can DRY-ly be used in both
// the 'create' component and the 'edit' component.

import React, { useState, SyntheticEvent } from 'react';
import { Organization } from '../store/organizations/types';
import Field from '../common/Field';

interface OrganizationFormProps {
  organization: Organization;
  onSubmit: (parameter: Organization) => void;
  errors: any;
}

const OrganizationForm: React.FC<OrganizationFormProps> = (
  props: OrganizationFormProps
) => {
  let organization = props.organization;

  let [name, setName] = useState(organization.name);
  let [plan, setPlan] = useState(organization.plan);
  let [privateOrg, setPrivateOrg] = useState(organization.private);
  let [avatar, setAvatar] = useState<File | undefined>(undefined);

  let newOrganization: Organization = {
    ...organization,
    name: name,
    plan: plan,
    private: privateOrg,
    avatar: avatar
  };

  let errors = props.errors;

  const handleSubmit = (event: SyntheticEvent) => {
    event.preventDefault();
    props.onSubmit(newOrganization);
  };

  return (
    <form onSubmit={handleSubmit} className="limited-width">
      <Field label="Name" errors={errors.name}>
        <input
          className={errors.name ? 'input is-danger' : 'input'}
          type="text"
          placeholder="Your organization's name..."
          value={name}
          onChange={event => setName(event.target.value)}
        />
      </Field>
      <Field
        label="Avatar"
        errors={errors.avatar}
        help="If you do not upload a file, the current photo will be kept."
      >
        <input
          className={errors.avatar ? 'input is-danger' : 'input'}
          type="file"
          placeholder="Your organization's logo..."
          onChange={event =>
            setAvatar(
              event.target.files === null ? undefined : event.target.files[0]
            )
          }
        />
      </Field>
      <Field errors={errors.private}>
        <label className={errors.private ? 'checkbox is-danger' : 'checkbox'}>
          <input
            type="checkbox"
            checked={privateOrg}
            onChange={event => setPrivateOrg(event.target.checked)}
          />
          This organization's information and membership is not made public
        </label>
      </Field>
      <br />
      <button type="submit" className="button is-link">
        Save
      </button>
    </form>
  );
};

export default OrganizationForm;
