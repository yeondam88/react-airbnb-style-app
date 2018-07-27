import React from "react";
import { Field, reduxForm } from "redux-form";

const RegisterForm = props => {
  const { handleSubmit, pristine, reset, submitting, submitCb } = props;
  return (
    <form onSubmit={handleSubmit(submitCb)}>
      <div>
        <label>Username</label>
        <div>
          <Field
            name="firstName"
            component="input"
            type="text"
            placeholder="Username"
            className="form-control"
          />
        </div>
      </div>
      <div>
        <label>Email</label>
        <div>
          <Field
            name="email"
            component="input"
            type="email"
            placeholder="Email"
            className="form-control"
          />
        </div>
      </div>
      <div>
        <label>Password</label>
        <div>
          <Field
            name="password"
            component="input"
            type="password"
            placeholder="Password"
            className="form-control"
          />
        </div>
      </div>
      <div>
        <label>Confirmation Password</label>
        <div>
          <Field
            name="passwordConfirmation"
            component="input"
            type="password"
            className="form-control"
            placeholder="Confirmation Password"
          />
        </div>
      </div>
      <div>
        <button
          type="submit"
          disabled={pristine || submitting}
          className="btn btn-bwm btn-form"
        >
          Submit
        </button>
      </div>
    </form>
  );
};

export default reduxForm({
  form: "registerForm"
})(RegisterForm);
