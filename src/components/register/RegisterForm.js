import React from "react";
import { Field, reduxForm } from "redux-form";
import BwmInput from "components/shared/form/BwmInput";
import BwmResErrors from "components/shared/form/BwmResErrors";

const RegisterForm = props => {
  const { handleSubmit, pristine, submitting, submitCb, valid, errors } = props;
  return (
    <form onSubmit={handleSubmit(submitCb)}>
      <Field
        name="username"
        type="text"
        label="Username"
        className="form-control"
        component={BwmInput}
      />

      <Field
        name="email"
        type="email"
        label="Email"
        className="form-control"
        component={BwmInput}
      />

      <Field
        name="password"
        type="password"
        label="Password"
        className="form-control"
        component={BwmInput}
      />

      <Field
        name="passwordConfirmation"
        type="password"
        label="Password Confirmation"
        className="form-control"
        component={BwmInput}
      />

      <button
        type="submit"
        disabled={!valid || pristine || submitting}
        className="btn btn-bwm btn-form"
      >
        Register
      </button>
      <BwmResErrors errors={errors} />
    </form>
  );
};

const validate = values => {
  const errors = {};

  if (values.username && values.username.length < 4) {
    errors.username = "Username min length is 4 characters!";
  }

  if (!values.email) {
    errors.email = "Please enter email! Email is required.";
  }

  if (!values.passwordConfirmation) {
    errors.passwordConfirmation = "Please enter password confirmation!";
  }

  if (values.password !== values.passwordConfirmation) {
    errors.password = "Password must be the same.";
  }

  return errors;
};

export default reduxForm({
  form: "registerForm",
  validate
})(RegisterForm);
