import React, { Component } from "react";
import { Link, withRouter } from "react-router-dom";
import { connect } from "react-redux";
import { logout } from "actions";

import RentalSearchInput from "components/rental/RentalSearchInput";

class HeaderWithSearch extends Component {
  handleLogout = () => {
    this.props.logout();
    this.props.history.push("/login");
  };

  renderAuthButtons = isAuth => {
    if (isAuth) {
      return (
        <a className="nav-item nav-link clickable" onClick={this.handleLogout}>
          Logout
        </a>
      );
    }
    return [
      <Link key="loginLink" to="/login" className="nav-item nav-link active">
        Login <span className="sr-only">(current)</span>
      </Link>,
      <Link key="registerLink" to="/register" className="nav-item nav-link">
        Register
      </Link>
    ];
  };

  renderOwnerSection = isAuth => {
    if (isAuth) {
      return (
        <div className="nav-item dropdown">
          <a
            id="navbarDropdownMenuLink"
            data-toggle="dropdown"
            className="nav-link nav-item dropdown-toggle clickable"
          >
            Owner Section
          </a>
          <div className="dropdown-menu">
            <Link to="/rentals/new" className="dropdown-item">
              Create Rental
            </Link>
            <Link to="/rentals/manage" className="dropdown-item">
              Manage Rentals
            </Link>
            <Link to="/bookings/manage" className="dropdown-item">
              Manage Bookings
            </Link>
          </div>
        </div>
      );
    }
  };

  render() {
    const { username, isAuth } = this.props.auth;
    return (
      <nav
        className="navbar navbar-dark navbar-expand-lg"
        style={{ background: "black" }}
      >
        <div className="container">
          <Link to="/" className="navbar-brand">
            BookWithMe
          </Link>
          <RentalSearchInput />
          <button
            className="navbar-toggler"
            type="button"
            data-toggle="collapse"
            data-target="#navbarTogglerDemo03"
            aria-controls="navbarTogglerDemo03"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon" />
          </button>
          <div className="collapse navbar-collapse" id="navbarNavAltMarkup">
            <div className="navbar-nav ml-auto">
              {isAuth && (
                <a key="registerLink" className="nav-item nav-link">
                  {username}
                </a>
              )}
              {this.renderOwnerSection(isAuth)}
              {this.renderAuthButtons(isAuth)}
            </div>
          </div>
        </div>
      </nav>
    );
  }
}

const mapStateToProps = state => ({
  auth: state.auth
});

export default withRouter(
  connect(
    mapStateToProps,
    { logout }
  )(HeaderWithSearch)
);
