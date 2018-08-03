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

  render() {
    return (
      <nav className="bwm-navbar" style={this.props.style || null}>
        <Link to="/" className="navbar-brand">
          BookWithMe
        </Link>
        <div>
          <div className="navbar-nav ml-auto">{this.renderAuthButtons()}</div>
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
