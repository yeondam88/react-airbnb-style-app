import React, { Component } from "react";
import { Link, withRouter } from "react-router-dom";
import { elastic as Menu } from "react-burger-menu";
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
      <Link key="loginLink" to="/login" className="nav-item nav-link">
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

  renderMobileMenu = isAuth => {
    if (isAuth) {
      return (
        <React.Fragment>
          <Link to="/rentals/new" className="menu-item">
            <i className="fal fa-hotel" />
            Create Rental
          </Link>
          <Link to="/rentals/manage" className="menu-item">
            <i className="fal fa-cog" />
            Manage Rentals
          </Link>
          <Link to="/bookings/manage" className="menu-item">
            <i className="fal fa-cog" />
            Manage Bookings
          </Link>
          <a onClick={this.handleLogout} className="menu-item">
            <i className="fal fa-sign-out-alt" />
            Log out
          </a>
        </React.Fragment>
      );
    }

    return (
      <React.Fragment>
        <Link to="/login" className="menu-item">
          <i className="fal fa-sign-in-alt" />
          Login
        </Link>
        <Link to="/register" className="menu-item">
          <i className="fal fa-hand-peace" />
          Register
        </Link>
      </React.Fragment>
    );
  };

  render() {
    const { isAuth, username } = this.props.auth;
    return (
      <nav className="bwm-navbar" style={this.props.style || null}>
        <Link to="/" className="navbar-brand">
          BookWithMe
        </Link>
        <div id="navbarNavAltMarkup" className="d-none d-lg-block">
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
        <div className="d-lg-none d-md-none">
          <Menu right styles={styles}>
            {this.renderMobileMenu(isAuth)}
          </Menu>
        </div>
      </nav>
    );
  }
}

const styles = {
  bmBurgerButton: {
    position: "fixed",
    width: "36px",
    height: "30px",
    right: "36px",
    top: "36px"
  },
  bmBurgerBars: {
    background: "#373a47"
  },
  bmCrossButton: {
    height: "24px",
    width: "24px"
  },
  bmCross: {
    background: "#bdc3c7"
  },
  bmMenu: {
    background: "#373a47",
    padding: "2.5em 1.5em 0",
    fontSize: "1.15em"
  },
  bmMorphShape: {
    fill: "#373a47"
  },
  bmItemList: {
    color: "#b8b7ad",
    padding: "0.8em"
  },
  bmItem: {
    display: "block",
    fontSize: "2em",
    color: "white"
  },
  bmOverlay: {
    background: "rgba(0, 0, 0, 0.3)"
  }
};

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
