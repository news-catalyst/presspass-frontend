import React from 'react';
import ProfileAvatar from '../account/ProfileAvatar';
import { Link, RouteProps } from 'react-router-dom';
import { AppActions } from '../store';
import { User } from '../store/users/types';
import { ArchieState } from '../store/archie/types';

export interface NavbarProps extends RouteProps {
  isAuthenticated: boolean;
  loginPath: string;
  user: User | null;
  actions: AppActions;
  archie: ArchieState;
}

interface NavbarProfileHeaderProps {
  archie: ArchieState;
  user: User | null;
  homeLink: string;
}

const NavbarProfileHeader = (props: NavbarProfileHeaderProps) => {
  let avatar;
  if (props.user === null) {
    return (
      <Link to="/" className="navbar-link">
        {props.archie.copy.nav.account}
      </Link>
    )
  }

  if (props.user.avatar === null) {
    avatar = "/logo.svg"; // default to presspass logo for now
  } else {
    avatar = props.user.avatar;
  }
  return (
      <Link className="navbar-link" to={props.homeLink}>
        <div className="level">
          <div className="level-left">
            <figure className="image is-32x32 has-margin-right-5">
              <img alt="profile" src={avatar} />
            </figure>
          </div>
          <div className="level-left">
            {props.user.username}
          </div>
        </div>
      </Link>
  )
}

const Navbar = (props: NavbarProps) => {
  let homeLink = "/";
  if (props.user !== null) {
    homeLink = "/entitlements";
  }
  const navRight = props.isAuthenticated ? (
    <div className="navbar-item has-dropdown is-hoverable">
      <NavbarProfileHeader archie={props.archie} user={props.user} homeLink={homeLink} />

      <div className="navbar-dropdown">
        <Link className="navbar-item" to="/profile">
          {props.archie.copy.nav.profile}
        </Link>
        <Link className="navbar-item" to="/memberships">
          {props.archie.copy.nav.memberships}
        </Link>
        <Link className="navbar-item" to="/pitch">
          {props.archie.copy.nav.developers}
        </Link>
        <hr className="dropdown-divider" />
        <Link className="navbar-item" to="/profile/manage">
          {props.archie.copy.nav.manage_profile}
        </Link>
        <Link className="navbar-item" to="/profile/change-password">
          {props.archie.copy.nav.change_password}
        </Link>
        <Link className="navbar-item" to="/logout">
          {props.archie.copy.nav.logout}
        </Link>
      </div>
    </div>
  ) : (
    <div className="buttons">
      <Link className="button is-primary" to="/register">
        <strong>
          {props.archie.copy.nav.signup}
          </strong>
      </Link>
      <Link className="button is-light" to="/login">
          {props.archie.copy.nav.login}
      </Link>
    </div>
  );

  return (
    <nav className="navbar" role="navigation" aria-label="main navigation">
      <div className="container">
        <div className="navbar-brand">
          <Link className="navbar-item" to={homeLink}>
            <strong>{props.archie.copy.title}</strong>
          </Link>
          <a
            role="button"
            className="navbar-burger burger"
            aria-label="menu"
            aria-expanded="false"
            data-target="navbarBody"
            href="#navbarBody"
          >
            <span aria-hidden="true"></span>
            <span aria-hidden="true"></span>
            <span aria-hidden="true"></span>
          </a>
        </div>

        <div id="navbarBody" className="navbar-menu">
          <div className="navbar-start">
            <Link className="navbar-item" to="/organizations">
              {props.archie.copy.nav.organizations}
            </Link>
          </div>
          <div className="navbar-end">
            <div className="navbar-item">{navRight}</div>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
