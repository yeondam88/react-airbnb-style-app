import React, { Component } from "react";
import { Route, Redirect } from "react-router-dom";
import authService from "services/auth-service";

class LoggedInRoute extends Component {
  render() {
    const { component: Component, ...rest } = this.props;
    return (
      <Route
        {...rest}
        render={props =>
          authService.isAuthenticated() ? (
            <Redirect to={{ pathname: "/rentals" }} />
          ) : (
            <Component {...props} {...rest} />
          )
        }
      />
    );
  }
}

export default LoggedInRoute;
