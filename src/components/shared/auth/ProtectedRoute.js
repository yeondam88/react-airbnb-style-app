import React, { Component } from "react";
import { Route, Redirect } from "react-router-dom";
import authService from "services/auth-service";

class ProtectedRoute extends Component {
  render() {
    const { component: Component, ...rest } = this.props;
    return (
      <Route
        {...rest}
        render={props =>
          authService.isAuthenticated() ? (
            <Component {...props} {...rest} />
          ) : (
            <Redirect to={{ pathname: "/login" }} />
          )
        }
      />
    );
  }
}

export default ProtectedRoute;
