import React from "react";
import { Link, RouteProps } from "react-router-dom";
import { AppActions } from "../store";

export interface NavbarProps extends RouteProps {
    isAuthenticated: boolean;
    loginPath: string;
    actions: AppActions;
}

export default (props: NavbarProps) => {

    const logout = () => {
        props.actions.logout();
    }

    const navRight = (props.isAuthenticated) ? (
        <div className="navbar-item has-dropdown is-hoverable">
            <a className="navbar-link" href="/">
                Account
            </a>

            <div className="navbar-dropdown">
                <a className="navbar-item" onClick={logout}>
                    Log Out
                </a>
                <a className="navbar-item" href="/">
                    Manage Profile
                </a>
                <a className="navbar-item" href="/">
                    Change Password
                </a>
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
                    <a role="button" className="navbar-burger burger" aria-label="menu" aria-expanded="false"
                        data-target="navbarBasicExample">
                        <span aria-hidden="true"></span>
                        <span aria-hidden="true"></span>
                        <span aria-hidden="true"></span>
                    </a>
                </div>

                <div id="navbarBasicExample" className="navbar-menu">
                    <div className="navbar-start">
                        <a className="navbar-item">
                            Apps
                        </a>
                        <a className="navbar-item">
                            Organization
                        </a>
                    </div>
                    <div className="navbar-end">
                        <div className="navbar-item">
                            {navRight}
                        </div>
                    </div>
                </div>
            </div>
        </nav>
    )
}