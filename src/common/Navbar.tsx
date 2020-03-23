import React from 'react';
import { Link, RouteProps } from 'react-router-dom';
import { AppActions } from '../store';
import { User } from '../store/users/types';

export interface NavbarProps extends RouteProps {
  isAuthenticated: boolean;
  loginPath: string;
  user: User | null;
  actions: AppActions;
}

const Navbar = (props: NavbarProps) => {
  const navRight = props.isAuthenticated ? (
    <div className="navbar-item has-dropdown is-hoverable">
      <a className="navbar-link" href="/">
        {props.user === null ? 'Account' : props.user.name}
      </a>

      <div className="navbar-dropdown">
        <Link className="navbar-item" to="/profile">
          Profile
        </Link>
        <Link className="navbar-item" to="/clients">
          Developers
        </Link>
        <hr className="dropdown-divider" />
        <Link className="navbar-item" to="/profile/manage">
          Manage Profile
        </Link>
        <Link className="navbar-item" to="/profile/change-password">
          Change Password
        </Link>
        <Link className="navbar-item" to="/logout">
          Log Out
        </Link>
      </div>
    </div>
  ) : (
    <div className="buttons">
      <Link className="button is-primary" to="/register">
        <strong>Sign up</strong>
      </Link>
      <Link className="button is-light" to="/login">
        Log in
      </Link>
    </div>
  );

  return (
    <nav className="navbar" role="navigation" aria-label="main navigation">
      <div className="container">
        <div className="navbar-brand">
          <Link className="navbar-item" to="/">
            <strong>PressPass</strong>
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
              Entitlements
            </a>
            <a className="navbar-item" href="/organizations">
              Organizations
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
