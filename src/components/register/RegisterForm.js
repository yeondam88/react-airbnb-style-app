import React from "react";
import { Field, reduxForm } from "redux-form";

const RegisterForm = props => {
  const { handleSubmit, pristine, reset, submitting } = props;
  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label>First Name</label>
        <div>
          <Field
            name="firstName"
            component="input"
            type="text"
            placeholder="First Name"
            className="form-control"
          />
        </div>
      </div>
      <div>
        <label>Last Name</label>
        <div>
          <Field
            name="lastName"
            component="input"
            type="text"
            placeholder="Last Name"
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
        <button
          type="submit"
          disabled={pristine || submitting}
          className="btn btn-success"
        >
          Submit
        </button>
        <button
          type="button"
          disabled={pristine || submitting}
          onClick={reset}
          className="btn btn-outline-warning"
        >
          Clear Values
        </button>
      </div>
    </form>
  );
};

export default reduxForm({
  form: "registerForm"
})(RegisterForm);
