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
import ManageButton from '../membership/ManageButton';

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
  let userIsMember = props.organization.uuid in props.memberships.memberships;
  if (userIsMember) {
    return (
      <nav className="level is-mobile">
        <div className="level-left">
          <span className="tag is-info">{props.archie.copy.tags.member}</span>
        </div>
      </nav>
    );
  }
  if (userIsMember) {
    let membership = props.memberships.memberships[props.organization.uuid];
    let userIsAdmin = membership.admin;
    if (userIsAdmin) {
      return (
        <div>
          <nav className="level is-mobile">
            <div className="level-left">
              <span className="tag is-success">{props.archie.copy.tags.admin}</span>
            </div>
            <ManageButton archie={props.archie} membership={membership} />
          </nav>
        </div>
      );
    }
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
          <span className="tag is-success">{props.archie.copy.tags.requested}</span>
        </div>
      </nav>
    );
  }
  return (
    <nav className="level is-mobile">
      <div className="level-left">
        <button
          onClick={onRequestClick}
          className="level-item button pp-primary"
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
