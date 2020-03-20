import React, { useEffect } from 'react';
import { AppActions } from '../store';
import { Link } from 'react-router-dom';
import { Membership, MembershipState } from '../store/memberships/types';
import { ensureMembershipsForUser } from '../store/memberships/api';
import MembershipCard from '../membership/MembershipCard';
import ProfileAvatar from './ProfileAvatar';
import { UsersState } from '../store/users/types';
import LoadingPlaceholder from '../common/LoadingPlaceholder';

interface ProfilePageProps {
  actions: AppActions;
  users: UsersState;
  memberships: MembershipState;
}

export const ProfilePage: React.FC<ProfilePageProps> = (
  props: ProfilePageProps
) => {
  // load user's memberships list
  useEffect(() => {
    if (props.users.self !== null) {
      const uuid = props.users.self.uuid;
      ensureMembershipsForUser(props.actions, uuid, props.memberships);
    }
  }, [props.actions, props.memberships, props.users, props.users.self]);

  if (props.users.self == null) {
    return <LoadingPlaceholder />;
  } else {
    let name = props.users.self!.name;
    let username = props.users.self!.username;
    let email = props.users.self!.email;
    let avatar = props.users.self!.avatar;

    return (
      <div>
        <div className="section">
          <div className="card">
            <div className="card-content">
              <div className="media">
                <ProfileAvatar avatar={avatar} />
                <div className="media-content">
                  <p className="title is-4">{name}</p>
                  <p className="subtitle is-6">@{username}</p>
                </div>
              </div>

              <div className="content">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit.
              </div>
            </div>
            <footer className="card-footer">
              <Link to="/profile/change-password" className="card-footer-item">
                Change Password
              </Link>
              <Link to="/clients/create" className="card-footer-item">
                Create New Client
              </Link>
              <Link to="/organizations/create" className="card-footer-item">
                Create New Organization
              </Link>
            </footer>
          </div>
        </div>
        <div className="section">
          <div className="container">
            <h1 className="title is-size-3">Your Memberships</h1>
            <div className="columns is-multiline">
              {Object.values(props.memberships.memberships)
                .sort((a, b) =>
                  a.organization.name > b.organization.name ? 1 : -1
                )
                .map((membership: Membership) => (
                  <div className="column is-4">
                    <MembershipCard
                      key={membership.organization.uuid}
                      membership={membership}
                      actions={props.actions}
                    />
                  </div>
                ))}
            </div>
          </div>
        </div>
      </div>
    );
  }
};
