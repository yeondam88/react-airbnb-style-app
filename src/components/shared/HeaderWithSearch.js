import React, { Component } from "react";
import { Link, withRouter } from "react-router-dom";
import { connect } from "react-redux";

import RentalSearchInput from "components/rental/RentalSearchInput";

class HeaderWithSearch extends Component {
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

  render() {
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
            <div className="navbar-nav ml-auto">{this.renderAuthButtons()}</div>
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
    null
  )(HeaderWithSearch)
);
