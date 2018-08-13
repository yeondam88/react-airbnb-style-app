import React, { Component } from "react";
import { Link, withRouter } from "react-router-dom";
import { connect } from "react-redux";
import * as actions from "actions";

class Header extends Component {
  handleLogout = () => {
    this.props.logout();
    this.props.history.push("/login");
  };

  renderAuthButtons = () => {
    const {
      auth: { isAuth }
    } = this.props;

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
    const { isAuth, username } = this.props.auth;
    return (
      <nav className="bwm-navbar" style={this.props.style || null}>
        <Link to="/" className="navbar-brand">
          BookWithMe
        </Link>
        <div id="navbarNavAltMarkup">
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
      </nav>
    );
  }
}

const mapStateToProps = state => ({
  auth: state.auth
});

const mapDispatchToProps = dispatch => {
  return {
    logout: () => dispatch(actions.logout())
  };
};

export default withRouter(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(Header)
);
