import React from 'react';
import { format } from 'date-fns';

import { Organization } from '../store/organizations/types';
import { Link } from 'react-router-dom';

interface OrganizationCardProps {
  organization: Organization;
}

const OrganizationCard: React.FC<OrganizationCardProps> = (
  props: OrganizationCardProps
) => {
  let organization = props.organization;
  let avatar;
  if (typeof organization.avatar === 'string') {
    avatar = organization.avatar;
    // avatar = URL.createObjectURL(organization.avatar);
  }
  var formattedDate = format(
    new Date(organization.updated_at),
    'd MMM yyyy H:mma'
  );

  return (
    <div className="box">
      <article className="media">
        <div className="media-left">
          <figure className="image is-64x64">
            <img src={avatar} />
          </figure>
        </div>
        <div className="media-content">
          <div className="content">
            <Link to={'/organizations/' + organization.uuid}>
              <h5 className="title is-size-5">{organization.name}</h5>
            </Link>
            <p>
              This is a {organization.private ? 'private' : 'public'}{' '}
              organization with a max user count of{' '}
              <code>{organization.max_users}</code>.
              <br />
              <strong>Updated:</strong> {formattedDate}
              <br />
              <small className="has-text-grey">{organization.uuid}</small>
            </p>
          </div>
        </div>
      </article>
    </div>
  );
};

export default OrganizationCard;
