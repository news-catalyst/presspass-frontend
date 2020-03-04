import React from 'react';
import { Organization } from '../store/organizations/types';
import { Link } from 'react-router-dom';

interface OrganizationCardProps {
  organization: Organization;
}

const OrganizationCard: React.FC<OrganizationCardProps> = (
  props: OrganizationCardProps
) => {
  let organization = props.organization;
  return (
    <Link className="box" to={'/organizations/' + organization.uuid}>
      <h5 className="title is-size-5">{organization.name}</h5>
      <div className="field is-grouped is-grouped-multiline">
        <div className="control">
          <dl>
            <dt>ID:</dt>
            <dd>{organization.uuid}</dd>

            <dt>Private?</dt>
            <dd>{organization.private}</dd>

            <dt>Plan:</dt>
            <dd>{organization.plan}</dd>

            <dt>Max users:</dt>
            <dd>{organization.max_users}</dd>

            <dt>Updated at:</dt>
            <dd>{organization.updated_at}</dd>
          </dl>
        </div>
      </div>
    </Link>
  );
};

export default OrganizationCard;
