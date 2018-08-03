import React, { Component } from "react";
import RegisterForm from "./RegisterForm";
import HeaderWithSearch from 'components/shared/HeaderWithSearch';
import { Redirect } from "react-router-dom";
import { register } from "actions";

class Register extends Component {
  state = {
    errors: [],
    redirect: false
  };

  registerUser = userData => {
    register(userData).then(
      registered => this.setState({ redirect: true }),
      errors => this.setState({ errors })
    );
  };

  render() {
    const { errors, redirect } = this.state;

    if (redirect) {
      return (
        <Redirect
          to={{ pathname: "/login", state: { successRegister: true } }}
        />
      );
    }

    return (
      <React.Fragment>
        <HeaderWithSearch />
        <div className="container" style={{ marginTop: "80px" }}>
        <section id="register">
          <div className="bwm-form">
            <div className="row">
              <div className="col-md-5">
                <h1>Register</h1>
                <RegisterForm submitCb={this.registerUser} errors={errors} />
              </div>
              <div className="col-md-6 ml-auto">
                <div className="image-container">
                  <h2 className="catchphrase">
                    As our member you have access to most awesome places in the
                    world.
                  </h2>
                  <img
                    src={process.env.PUBLIC_URL + "/img/register-image.jpg"}
                    alt="Register banner"
                  />
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
      </React.Fragment>
      
    );
  }
}

export default Register;
