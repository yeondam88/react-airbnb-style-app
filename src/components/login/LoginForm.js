import React from "react";
import { Field, reduxForm } from "redux-form";
import BwmInput from "components/shared/form/BwmInput";
import BwmResErrors from "components/shared/form/BwmResErrors";
import { required, minLength4 } from "components/shared/form/validators";

const LoginForm = props => {
  const { handleSubmit, pristine, submitting, submitCb, valid, errors } = props;
  return (
    <form onSubmit={handleSubmit(submitCb)}>
      <Field
        name="email"
        type="email"
        label="Email"
        className="form-control"
        component={BwmInput}
        validate={[required, minLength4]}
      />

      <Field
        name="password"
        type="password"
        label="Password"
        className="form-control"
        component={BwmInput}
        validate={[required]}
      />

      <button
        type="submit"
        disabled={!valid || pristine || submitting}
        className="btn btn-bwm btn-form"
      >
        Login
      </button>
      <BwmResErrors errors={errors} />
    </form>
  );
};

export default reduxForm({
  form: "loginForm"
})(LoginForm);
