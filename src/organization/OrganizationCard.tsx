import React, { useState } from 'react';
import { format } from 'date-fns';
import { Link } from 'react-router-dom';
import LoadingPlaceholder from '../common/LoadingPlaceholder';
import { AppActions } from '../store';
import { ArchieState } from '../store/archie/types';
import { Invitation, InvitationState } from '../store/invitations/types';
import { MembershipState } from '../store/memberships/types';
import { Organization } from '../store/organizations/types';
import { requestInvitation } from '../store/invitations/api';

interface OrganizationCardProps {
  actions: AppActions;
  archie: ArchieState;
  invitations: InvitationState;
  memberships: MembershipState;
  organization: Organization;
}

const OrganizationCardNav: React.FC<OrganizationCardProps> = (
  props: OrganizationCardProps
) => {
  let [requested, setRequested] = useState(false);
  let [errors, setErrors] = useState({});

  if (!props.memberships.hydrated) {
    return <LoadingPlaceholder />;
  }

  if (props.organization.individual) {
    return null;
  }

  let userIsMember = props.organization.uuid in props.memberships.memberships;
  if (userIsMember) {
    let membership = props.memberships.memberships[props.organization.uuid];
    let userIsAdmin = membership.admin;
    if (userIsAdmin) {
      return (
        <div>
          <p>
            <Link
              to={'/organizations/' + props.organization.uuid + '/manage'}
              className="button is-small is-link"
            >
              {props.archie.copy.buttons.manage}
            </Link>
          </p>
        </div>
      );
    } else {
      return (
        <nav className="level is-mobile">
          <div className="level-left">
            <span className="tag is-info">{props.archie.copy.tags.member}</span>
          </div>
        </nav>
      );
    }
  }
  // don't show join buttons for individual organizations
  if (props.organization.individual) {
    return null;
  }
  let userRequestedMembership =
    props.organization.uuid in props.invitations.invitations &&
    props.invitations.invitations[props.organization.uuid].find(
      (invite: Invitation) => invite.request
    );
  if (userRequestedMembership || requested) {
    return (
      <nav className="level is-mobile">
        <div className="level-left">
          <span className="tag is-light">{props.archie.copy.tags.requested}</span>
        </div>
      </nav>
    );
  }

  const onRequestClick = () => {
    requestInvitation(props.organization.uuid, props.actions).then(status => {
      if (status.ok) {
        setRequested(true);
        setErrors({});
      } else {
        setErrors(status.body);
      }
    });
  };
  return (
    <nav className="level is-mobile">
      <div className="level-left">
        <button
          onClick={onRequestClick}
          className="level-item button pp-primary is-small"
          aria-label="request"
        >
          {props.archie.copy.buttons.request}
        </button>
      </div>
    </nav>
  );
};
const OrganizationCard: React.FC<OrganizationCardProps> = (
  props: OrganizationCardProps
) => {
  let organization = props.organization;
  let avatar = '';
  if (typeof organization.avatar === 'string') {
    avatar = organization.avatar;
  }
  // DEMO set a default organizational avatar - TODO pick a better image, usage rights
  if (organization.avatar === null || organization.avatar === '') {
    avatar = '/organization_avatar.png';
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
            <img src={avatar} alt="Organization avatar" />
          </figure>
        </div>
        <div className="media-content">
          <div className="content">
            <Link to={'/organizations/' + organization.uuid}>
              <h5 className="title is-size-5">{organization.name}</h5>
            </Link>
          </div>
        </div>
        <div className="media-right">
          <OrganizationCardNav
            actions={props.actions}
            archie={props.archie}
            invitations={props.invitations}
            memberships={props.memberships}
            organization={organization}
          />
        </div>
      </article>
    </div>
  );
};

export default OrganizationCard;
