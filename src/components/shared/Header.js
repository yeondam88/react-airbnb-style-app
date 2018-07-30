import React, { Component } from "react";
import { Link, withRouter } from "react-router-dom";
import { connect } from "react-redux";

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
      <nav className="navbar navbar-dark navbar-expand-lg">
        <div className="container">
          <Link to="/" className="navbar-brand">
            BookWithMe
          </Link>
          <form action="" className="form-inline my-2 my-lg-0">
            <input
              type="search"
              className="form-control mr-sm-2 bwm-search"
              placeholder="Try 'New York'"
              aria-label="Search"
            />
            <button
              className="btn btn-outline-success my-2 my-sm-0 btn-bwm-search"
              type="submit"
            >
              Search
            </button>
          </form>
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
  )(Header)
);
