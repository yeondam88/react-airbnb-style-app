import React, { Component } from "react";
import LoginForm from "./LoginForm";
import { Redirect } from "react-router-dom";
import { login } from "actions";
import { connect } from "react-redux";

class Login extends Component {
  loginUser = userData => {
    this.props.login(userData);
  };

  render() {
    const { isAuth, errors } = this.props.auth;

    return (
      <section id="login">
        <div className="bwm-form">
          <div className="row">
            <div className="col-md-5">
              <h1>Login</h1>
              <LoginForm submitCb={this.loginUser} errros={errors} />
            </div>
            <div className="col-md-6 ml-auto">
              <div className="image-container">
                <h2 className="catchphrase">
                  Hundreds of awesome places in reach of few clicks.
                </h2>
                <img src="" alt="" />
              </div>
            </div>
          </div>
        </div>
      </section>
    );
  }
}

const mapStateToProps = state => ({
  auth: state.auth
});

export default connect(
  mapStateToProps,
  { login }
)(Login);
