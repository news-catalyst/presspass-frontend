import React from 'react';
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

const Navbar = (props: NavbarProps) => {
  const navRight = props.isAuthenticated ? (
    <div className="navbar-item has-dropdown is-hoverable">
      <a className="navbar-link" href="/">
        {props.user === null ? props.archie.copy.nav.account : props.user.name}
      </a>

      <div className="navbar-dropdown">
        <Link className="navbar-item" to="/profile">
          {props.archie.copy.nav.profile}
        </Link>
        <Link className="navbar-item" to="/memberships">
          {props.archie.copy.nav.memberships}
        </Link>
        <Link className="navbar-item" to="/clients">
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
          <Link className="navbar-item" to="/">
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
            <a className="navbar-item" href="/entitlements">
              {props.archie.copy.nav.entitlements}
            </a>
            <a className="navbar-item" href="/organizations">
              {props.archie.copy.nav.organizations}
            </a>
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
